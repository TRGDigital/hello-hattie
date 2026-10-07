'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { put } from '@vercel/blob'
import { adminRpc } from '@/lib/admin-db'
import { checkPassword, hashPassword, makeSession, requireAdmin, sessionCookie, COOKIE } from '@/lib/admin-auth'
import type { ArticleRow } from '@/lib/cms'

// Everything the admin can change. Each action checks the session first, and every save clears
// the 'cms' cache so the public site picks up the change on the next visit.
const refresh = () => { revalidateTag('cms'); revalidatePath('/', 'layout') }

// ---------- login ----------
const attempts = new Map<string, number[]>()
export async function login(_: unknown, fd: FormData): Promise<{ error?: string }> {
  const ip = (headers().get('x-forwarded-for') ?? '').split(',')[0].trim() || 'x'
  const now = Date.now(), list = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60e3)
  if (list.length >= 8) return { error: 'Too many attempts. Please wait 15 minutes.' }
  attempts.set(ip, [...list, now])
  const email = String(fd.get('email') ?? '').trim().toLowerCase(), pw = String(fd.get('password') ?? '')
  const row = await adminRpc<{ email: string; pw_hash: string } | null>('admin_get', { email }).catch(() => null)
  const ok = row ? await checkPassword(pw, row.pw_hash) : (await hashPassword(pw), false) // same work either way
  if (!ok) return { error: 'That email and password don’t match.' }
  await adminRpc('admin_login', { email })
  cookies().set(sessionCookie(makeSession(email)))
  redirect('/admin')
}
export async function logout() { cookies().delete(COOKIE); redirect('/admin/login') }

export async function changePassword(_: unknown, fd: FormData): Promise<{ error?: string; ok?: boolean }> {
  const email = requireAdmin()
  const current = String(fd.get('current') ?? ''), next = String(fd.get('next') ?? ''), again = String(fd.get('again') ?? '')
  const row = await adminRpc<{ pw_hash: string } | null>('admin_get', { email })
  if (!row || !(await checkPassword(current, row.pw_hash))) return { error: 'Your current password isn’t right.' }
  if (next.length < 12) return { error: 'Please use at least 12 characters.' }
  if (next !== again) return { error: 'The new passwords don’t match.' }
  await adminRpc('admin_set_password', { email, pw_hash: await hashPassword(next) })
  return { ok: true }
}

// ---------- articles ----------
export type ArticleInput = Omit<ArticleRow, 'updated_at' | 'published_at'> & { old_slug?: string }
export async function saveArticle(a: ArticleInput): Promise<{ error?: string; slug?: string }> {
  requireAdmin()
  const slug = a.slug.trim().toLowerCase()
  if (!a.title.trim()) return { error: 'Please add a title.' }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { error: 'The web address can only use lower-case letters, numbers and single hyphens.' }
  if (!['blog', 'guide', 'cost'].includes(a.kind)) return { error: 'Please choose a type.' }
  const clean = {
    ...a, slug, title: a.title.trim(), summary: a.summary.trim(), meta_title: a.meta_title.trim(), meta_description: a.meta_description.trim(),
    sections: a.sections.map((s) => ({ heading: s.heading.trim(), paragraphs: s.paragraphs.map((p) => p.trim()).filter(Boolean), ...(s.bullets?.filter((b) => b.trim()).length ? { bullets: s.bullets.map((b) => b.trim()).filter(Boolean) } : {}) })).filter((s) => s.heading || s.paragraphs.length),
    faqs: a.faqs.map((f) => ({ q: f.q.trim(), a: f.a.trim() })).filter((f) => f.q && f.a),
    sources: a.sources.map((s) => ({ label: s.label.trim(), url: s.url.trim() })).filter((s) => s.label && /^https?:\/\//.test(s.url)),
  }
  try { await adminRpc('article_save', { a: clean, old_slug: a.old_slug ?? '' }) } catch (e) {
    const m = e instanceof Error ? e.message : ''
    return { error: /duplicate|unique/i.test(m) ? 'Another article already uses that web address.' : m || 'Could not save.' }
  }
  refresh()
  return { slug }
}
export async function deleteArticle(slug: string) {
  requireAdmin()
  await adminRpc('article_delete', { slug })
  refresh()
  redirect('/admin/articles')
}

// ---------- SEO ----------
export async function saveSeo(path: string, title: string, description: string): Promise<{ error?: string }> {
  requireAdmin()
  if (!path.startsWith('/')) return { error: 'Bad page address.' }
  await adminRpc('seo_save', { path, title: title.trim(), description: description.trim() })
  refresh()
  return {}
}
/** The live page's current title and description, so the editor can show what it's replacing. */
export async function fetchPageMeta(path: string): Promise<{ title: string; description: string }> {
  requireAdmin()
  const host = headers().get('host') ?? 'www.hellohattie.co.uk'
  const proto = host.startsWith('localhost') ? 'http' : 'https'
  try {
    const html = await (await fetch(`${proto}://${host}${path}`, { cache: 'no-store' })).text()
    const dec = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return { title: dec(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? ''), description: dec(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '') }
  } catch { return { title: '', description: '' } }
}

// ---------- images ----------
export async function saveAlt(src: string, alt: string): Promise<{ error?: string }> {
  requireAdmin()
  if (alt.trim().length < 3) return { error: 'Please describe the photo in a few words.' }
  await adminRpc('alt_save', { src, alt: alt.trim() })
  refresh()
  return {}
}
export async function uploadImage(fd: FormData): Promise<{ error?: string; src?: string }> {
  requireAdmin()
  const file = fd.get('file'), alt = String(fd.get('alt') ?? '').trim()
  if (!(file instanceof File) || !file.size) return { error: 'Please choose a photo.' }
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return { error: 'Please upload a JPG, PNG or WebP photo.' }
  if (file.size > 8 * 1024 * 1024) return { error: 'Please use a photo under 8MB.' }
  if (alt.length < 3) return { error: 'Please add alt text describing the photo.' }
  const name = file.name.toLowerCase().replace(/\.[a-z]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'photo'
  const blob = await put(`uploads/${name}.${file.type.split('/')[1].replace('jpeg', 'jpg')}`, file, { access: 'public', addRandomSuffix: true, contentType: file.type })
  await adminRpc('alt_save', { src: blob.url, alt, uploaded: true, width: fd.get('width') ?? '', height: fd.get('height') ?? '' })
  refresh()
  return { src: blob.url }
}

// ---------- area page intros ----------
// Publishing an intro releases its page: indexable and in the sitemap (see app/sitemap.ts).
export async function saveIntro(path: string, intro: string): Promise<{ error?: string; problems?: string[] }> {
  requireAdmin()
  const { introPage, checkIntro } = await import('@/lib/intro-brief')
  const page = introPage(path)
  if (!page) return { error: 'Unknown page.' }
  const problems = checkIntro(intro, page)
  await adminRpc('intro_save', { path, intro: intro.replace(/\r/g, '').trim() })
  refresh()
  return problems.length ? { problems } : {}
}
export async function setIntroStatus(paths: string[], status: 'draft' | 'published' | 'rejected', note = ''): Promise<{ error?: string }> {
  requireAdmin()
  for (const path of paths) await adminRpc('intro_status', { path, status, note })
  refresh()
  revalidatePath('/sitemap.xml')
  return {}
}
