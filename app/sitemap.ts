import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'
import { SERVICES } from '@/content/services'
import { ARTICLES, articlePath } from '@/content/articles'
import { AREAS, AREAS_GENERATED, REGIONS } from '@/lib/areas'

// Every indexable page. Area pages carry the date the CQC register was last pulled, articles
// their own updated date, everything else the build date.
export default function sitemap(): MetadataRoute.Sitemap {
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
    ...areaSvc.flatMap((s) => AREAS.map((a) => page(`/${s.slug}/${a.regionSlug}/${a.slug}`, 0.5, areasAt))),
    ...['/privacy', '/terms'].map((p) => page(p, 0.2)),
  ]
}
