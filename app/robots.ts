import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'

// Before launch everything is blocked. After launch: crawl everything except the form flow, the
// paid landing pages (noindex anyway, and AdsBot ignores the * group so Google Ads can still check
// them) and the admin. AI crawlers are welcome: llms.txt points them at the useful pages.
export default function robots(): MetadataRoute.Robots {
  if (!BRAND.live) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/get-matched', '/thank-you', '/go/', '/admin', '/api/'] }],
    sitemap: `${BRAND.url}/sitemap.xml`,
    host: BRAND.url,
  }
}
