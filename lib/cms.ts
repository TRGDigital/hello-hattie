import 'server-only'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { ARTICLES as STATIC_ARTICLES } from '@/content/articles'
import { SERVICE_IMAGES } from '@/content/service-images'
import type { Article } from '@/content/types'

// Content the admin can change: articles, per-page SEO and image alt text. Read from the TRG platform
// database (tables hh_*), cached under the 'cms' tag. Saving in /admin clears the tag, so changes show
// within a minute without a redeploy. If the database can't be reached, the site falls back to the
// articles in content/*.ts, so it never goes blank.
const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'
const TTL = 3600

export type ArticleRow = {
  kind: Article['kind']; slug: string; title: string; meta_title: string; meta_description: string; summary: string
  category: string | null; image_src: string | null; image_brief: string | null
  sections: Article['sections']; faqs: Article['faqs']; sources: NonNullable<Article['sources']>
  status: 'draft' | 'published'; published_at: string | null; updated_at: string
}

async function rest<T>(path: string): Promise<T> {
  const r = await fetch(`${DB}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, cache: 'no-store', signal: AbortSignal.timeout(8000) })
  if (!r.ok) throw new Error(`cms ${r.status}`)
  return r.json()
}

export function rowToArticle(r: ArticleRow, alts: Record<string, string> = {}): Article {
  const src = r.image_src || undefined
  return {
    kind: r.kind, slug: r.slug, title: r.title, metaTitle: r.meta_title || r.title, metaDescription: r.meta_description || r.summary,
    summary: r.summary, category: r.category || undefined, updated: (r.updated_at || r.published_at || '').slice(0, 10),
    image: src || r.image_brief ? { src, brief: (src && alts[src]) || r.image_brief || r.title } : undefined,
    sections: r.sections ?? [], faqs: r.faqs ?? [], sources: r.sources ?? [],
  }
}

export const getAlts = unstable_cache(async (): Promise<Record<string, string>> => {
  try {
    const rows = await rest<{ src: string; alt: string }[]>('hh_image_alts?select=src,alt')
    return Object.fromEntries(rows.map((x) => [x.src, x.alt]))
  } catch { return {} }
}, ['hh-alts'], { tags: ['cms'], revalidate: TTL })

/** Every published article, newest first. Falls back to the built-in articles if the database fails. */
export const getArticles = unstable_cache(async (): Promise<Article[]> => {
  try {
    const [rows, alts] = await Promise.all([
      rest<ArticleRow[]>('hh_articles?select=*&status=eq.published&order=published_at.desc.nullslast'),
      getAlts(),
    ])
    return rows.length ? rows.map((r) => rowToArticle(r, alts)) : STATIC_ARTICLES
  } catch { return STATIC_ARTICLES }
}, ['hh-articles'], { tags: ['cms'], revalidate: TTL })

/** One article. In preview mode (from the admin) drafts are included and nothing is cached. */
export async function getArticle(kind: Article['kind'], slug: string): Promise<Article | undefined> {
  if (draftMode().isEnabled) {
    const { adminRpc } = await import('@/lib/admin-db')
    const row = await adminRpc<ArticleRow | null>('article_get', { slug }).catch(() => null)
    if (row && row.kind === kind) return rowToArticle(row, await getAlts())
  }
  return (await getArticles()).find((a) => a.kind === kind && a.slug === slug)
}

type Seo = { title: string | null; description: string | null }
export const getSeo = unstable_cache(async (): Promise<Record<string, Seo>> => {
  try {
    const rows = await rest<({ path: string } & Seo)[]>('hh_page_seo?select=path,title,description')
    return Object.fromEntries(rows.map((x) => [x.path, { title: x.title, description: x.description }]))
  } catch { return {} }
}, ['hh-seo'], { tags: ['cms'], revalidate: TTL })

/** A page's metadata with any title or description set in the admin laid over the page's own. */
export async function withSeo(path: string, base: Metadata): Promise<Metadata> {
  const o = (await getSeo())[path]
  if (!o || (!o.title && !o.description)) return base
  return {
    ...base,
    ...(o.title ? { title: { absolute: o.title } } : {}),
    ...(o.description ? { description: o.description } : {}),
    openGraph: { ...(base.openGraph ?? {}), ...(o.title ? { title: o.title } : {}), ...(o.description ? { description: o.description } : {}) },
  }
}

/** Alt text for a photo: the admin's version if one is set, otherwise the default. */
export async function altFor(src: string, fallback: string) {
  return (await getAlts())[src] || fallback
}

/** The care-type photos with any alt text changed in the admin. */
export async function getServiceImages() {
  const alts = await getAlts()
  return Object.fromEntries(Object.entries(SERVICE_IMAGES).map(([k, v]) => [k, {
    main: { ...v.main, brief: (v.main.src && alts[v.main.src]) || v.main.brief },
    side: { ...v.side, brief: (v.side.src && alts[v.side.src]) || v.side.brief },
  }])) as typeof SERVICE_IMAGES
}

// ---------- area page intros ----------
export type IntroRow = { path: string; service: string; region: string; area: string; status: 'draft' | 'published' | 'rejected'; intro: string; drafted_by: string | null; drafted_at: string; published_at: string | null; note: string | null }

/** Published area intros by page path. A page with one is indexable and in the sitemap. */
export const getIntros = unstable_cache(async (): Promise<Record<string, { intro: string; published_at: string }>> => {
  try {
    const rows = await rest<{ path: string; intro: string; published_at: string }[]>('hh_area_intros?select=path,intro,published_at&status=eq.published')
    return Object.fromEntries(rows.map((x) => [x.path, { intro: x.intro, published_at: x.published_at }]))
  } catch { return {} }
}, ['hh-intros'], { tags: ['cms'], revalidate: TTL })

/** The intro to show on a page: the published one, or in preview mode the draft too. */
export async function getIntro(path: string): Promise<{ intro: string; published: boolean } | null> {
  if (draftMode().isEnabled) {
    const { adminRpc } = await import('@/lib/admin-db')
    const row = (await adminRpc<IntroRow[]>('intros_list').catch(() => [])).find((x) => x.path === path && x.status !== 'rejected')
    if (row) return { intro: row.intro, published: row.status === 'published' }
  }
  const p = (await getIntros())[path]
  return p ? { intro: p.intro, published: true } : null
}
