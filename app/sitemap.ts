import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'
import { SERVICES } from '@/content/services'
import { articlePath } from '@/content/articles'
import { getArticles, getIntros } from '@/lib/cms'
import { AREAS, AREAS_GENERATED, REGIONS } from '@/lib/areas'
import { isIndexedArea } from '@/lib/area-facts'

// Every indexable page. Area pages carry the date the CQC register was last pulled, articles
// their own updated date, everything else the build date. Area pages outside the current
// indexing wave (lib/area-facts.ts) are noindex and left out until their intro is published in
// /admin/intros, which releases them.
export const revalidate = 3600
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [ARTICLES, INTROS] = await Promise.all([getArticles(), getIntros()])
  const u = (p: string) => `${BRAND.url}${p}`
  const built = new Date()
  const areasAt = new Date(AREAS_GENERATED)
  const page = (p: string, priority: number, lastModified = built) => ({ url: u(p), lastModified, priority })
  const areaSvc = SERVICES.filter((s) => s.areaPages)
  return [
    page('/', 1),
    ...['/types-of-care', '/how-it-works', '/costs', '/areas'].map((p) => page(p, 0.9)),
    ...SERVICES.map((s) => page(`/${s.slug}`, 0.9)),
    ...['/tools', '/tools/care-cost-calculator', '/tools/which-care-is-right', '/tools/funding-checker', '/guides', '/blog', '/for-agencies', '/about'].map((p) => page(p, 0.7)),
    ...ARTICLES.map((a) => page(articlePath(a), 0.7, new Date(a.updated))),
    ...areaSvc.flatMap((s) => REGIONS.map((r) => page(`/${s.slug}/${r.slug}`, 0.6, areasAt))),
    ...areaSvc.flatMap((s) => AREAS.map((a) => {
      const p = `/${s.slug}/${a.regionSlug}/${a.slug}`, intro = INTROS[p]
      if (!intro && !isIndexedArea(a.slug)) return null
      return page(p, 0.5, intro ? new Date(intro.published_at) : areasAt)
    }).filter((x) => x !== null)),
    ...['/privacy', '/terms', '/cookies'].map((p) => page(p, 0.2)),
  ]
}
