import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  if (!BRAND.live) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/get-matched', '/thank-you'] }], sitemap: `${BRAND.url}/sitemap.xml` }
}
