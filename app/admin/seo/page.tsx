import { requireAdmin } from '@/lib/admin-auth'
import { getSeo } from '@/lib/cms'
import sitemap from '@/app/sitemap'
import { SeoTable } from '@/components/admin/SeoTable'

export default async function SeoAdmin() {
  requireAdmin()
  const [map, seo] = await Promise.all([sitemap(), getSeo()])
  const group = (p: string) => /^\/(blog|guides|costs)\//.test(p) ? 'Articles' : /^\/tools/.test(p) ? 'Tools'
    : p.split('/').length === 4 ? 'Council areas' : p.split('/').length === 3 && !/^\/(blog|guides|costs|tools)/.test(p) ? 'Regions' : 'Main pages'
  const rows = map.map((m) => {
    const path = new URL(m.url).pathname || '/'
    return { path, group: group(path), title: seo[path]?.title ?? '', description: seo[path]?.description ?? '' }
  })
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Page SEO</h1></header>
      <p className="muted adm-intro">Set a custom title and meta description for any page. Leave both blank to use the page’s own. Article titles and descriptions can also be set in the article editor.</p>
      <SeoTable rows={rows} />
    </div>
  )
}
