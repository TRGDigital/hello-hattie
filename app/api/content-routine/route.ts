import { NextResponse } from 'next/server'
import { adminRpc } from '@/lib/admin-db'
import type { IntroRow } from '@/lib/cms'
import { INTRO_RULES, allIntroPages, checkIntro, introPage } from '@/lib/intro-brief'
import { sendEmail } from '@/lib/email'
import { BRAND } from '@/lib/site'

// Used by the weekly Claude Code routine that drafts area page intros, the same pattern as
// CareAssura's /api/content-routine. Bearer HH_ROUTINE_TOKEN. The token can only read the queue
// and brief, save drafts and send the review reminder: it can never publish.
//   GET  ?action=queue&limit=10   next pages without an intro, with their facts
//   GET  ?action=brief            the writing rules
//   GET  ?action=status           counts
//   POST {action:'save', path, intro, drafted_by?}
//   POST {action:'notify', drafted?}   emails the review reminder
export const dynamic = 'force-dynamic'
const REVIEWER = 'lenny@trgdigital.co.uk'

function authorised(req: Request) {
  const t = process.env.HH_ROUTINE_TOKEN
  return !!t && req.headers.get('authorization') === `Bearer ${t}`
}
const rows = () => adminRpc<IntroRow[]>('intros_list')
async function counts() {
  const r = await rows(), pages = allIntroPages()
  const by = (s: IntroRow['status']) => r.filter((x) => x.status === s).length
  return { pages: pages.length, drafts: by('draft'), published: by('published'), rejected: by('rejected'), notStarted: pages.filter((p) => !r.some((x) => x.path === p.path)).length }
}

export async function GET(req: Request) {
  if (!authorised(req)) return NextResponse.json({ error: 'Not allowed' }, { status: 401 })
  const u = new URL(req.url), action = u.searchParams.get('action')
  if (action === 'brief') return NextResponse.json({ rules: INTRO_RULES })
  if (action === 'status') return NextResponse.json(await counts())
  if (action === 'queue') {
    const limit = Math.min(50, Math.max(1, Number(u.searchParams.get('limit')) || 10))
    const done = new Set((await rows()).filter((x) => x.status !== 'rejected').map((x) => x.path))
    const queue = allIntroPages().filter((p) => !done.has(p.path)).slice(0, limit)
    return NextResponse.json({ rules: INTRO_RULES, pages: queue })
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

export async function POST(req: Request) {
  if (!authorised(req)) return NextResponse.json({ error: 'Not allowed' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  if (b.action === 'save') {
    const page = introPage(String(b.path ?? ''))
    if (!page) return NextResponse.json({ error: 'Unknown page' }, { status: 400 })
    const intro = String(b.intro ?? '').replace(/\r/g, '').trim()
    const problems = checkIntro(intro, page)
    if (problems.length) return NextResponse.json({ error: 'Draft not saved', problems }, { status: 422 })
    await adminRpc('intro_draft', { path: page.path, service: page.service, region: page.region, area: page.area, intro, drafted_by: String(b.drafted_by ?? 'routine').slice(0, 60) })
    return NextResponse.json({ ok: true, path: page.path })
  }
  if (b.action === 'notify') {
    const c = await counts()
    if (!c.drafts) return NextResponse.json({ ok: true, sent: false, reason: 'Nothing waiting for review', ...c })
    const link = `${BRAND.url}/admin/intros`
    const drafted = Number(b.drafted) || 0
    const lead = drafted ? `${drafted} new area page intro${drafted === 1 ? ' has' : 's have'} been drafted this week.` : 'Area page intros are waiting for you.'
    const text = `${lead}\n\n${c.drafts} waiting for review. Publishing an intro releases that page: it becomes indexable and goes into the sitemap.\n\nReview them: ${link}\n\nSo far: ${c.published} published, ${c.notStarted} pages not started.`
    const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1d2a24;max-width:560px">
<p><b>${lead}</b></p><p>${c.drafts} waiting for review. Publishing an intro releases that page: it becomes indexable and goes into the sitemap.</p>
<p><a href="${link}" style="display:inline-block;background:#1E5A41;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Review and publish</a></p>
<p style="color:#5b6b63;font-size:13px">So far: ${c.published} published, ${c.notStarted} pages not started.</p></div>`
    await sendEmail({ to: REVIEWER, subject: `Hello Hattie: ${c.drafts} area intro${c.drafts === 1 ? '' : 's'} ready to review`, html, text })
    return NextResponse.json({ ok: true, sent: true, ...c })
  }
  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
