/** @type {import('next').NextConfig} */
// Photos, brand files, badges and downloads rarely change, so browsers and Vercel keep them for
// 30 days (and may serve a stale copy for a day while refreshing). If a file is REPLACED under the
// same name, rename it (e.g. hero-home-2.jpg) so visitors get the new one straight away.
const LONG = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }]
export default {
  reactStrictMode: true,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'], deviceSizes: [390, 640, 828, 1080, 1440, 1920], minimumCacheTTL: 2592000 },
  async headers() {
    return ['/images/:path*', '/brand/:path*', '/badges/:path*', '/downloads/:path*', '/data/:path*', '/icon.svg', '/apple-icon.png', '/favicon.ico']
      .map((source) => ({ source, headers: LONG }))
  },
}
