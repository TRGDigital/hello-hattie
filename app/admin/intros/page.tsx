import { requireAdmin } from '@/lib/admin-auth'
import { adminRpc } from '@/lib/admin-db'
import type { IntroRow } from '@/lib/cms'
import { allIntroPages } from '@/lib/intro-brief'
import { IntroQueue } from '@/components/admin/IntroQueue'

export default async function IntrosAdmin() {
  requireAdmin()
  const rows = await adminRpc<IntroRow[]>('intros_list').catch(() => [] as IntroRow[])
  const pages = allIntroPages()
  const name = Object.fromEntries(pages.map((p) => [p.path, `${p.serviceName} in ${p.areaName}`]))
  const items = rows.map((r) => ({ ...r, title: name[r.path] ?? r.path }))
  const notStarted = pages.filter((p) => !rows.some((r) => r.path === p.path)).length
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Area intros</h1></header>
      <p className="muted adm-intro">Opening paragraphs for the council area pages, drafted each week by the routine. Edit if needed, then publish. Publishing releases the page: it becomes indexable and goes into the sitemap. Reject sends it back to be redrafted next week. {notStarted} of {pages.length} pages have no draft yet.</p>
      <IntroQueue rows={items} />
    </div>
  )
}
