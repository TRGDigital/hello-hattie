import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'
import { SERVICES } from '@/content/services'
import { ARTICLES } from '@/content/articles'
import { AREAS, REGIONS } from '@/lib/areas'

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${BRAND.url}${p}`
  const fixed = ['/', '/types-of-care', '/costs', '/tools', '/tools/care-cost-calculator', '/tools/which-care-is-right', '/tools/funding-checker', '/guides', '/areas', '/how-it-works', '/about', '/for-agencies', '/privacy', '/terms']
  const areaSvc = SERVICES.filter((s) => s.areaPages)
  return [
    ...fixed.map((p) => ({ url: u(p) })),
    ...SERVICES.map((s) => ({ url: u(`/${s.slug}`) })),
    ...ARTICLES.map((a) => ({ url: u(`/${a.kind === 'cost' ? 'costs' : 'guides'}/${a.slug}`) })),
    ...areaSvc.flatMap((s) => REGIONS.map((r) => ({ url: u(`/${s.slug}/${r.slug}`) }))),
    ...areaSvc.flatMap((s) => AREAS.map((a) => ({ url: u(`/${s.slug}/${a.regionSlug}/${a.slug}`) }))),
  ]
}
