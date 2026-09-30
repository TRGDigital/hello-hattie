/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'], deviceSizes: [390, 640, 828, 1080, 1440, 1920], minimumCacheTTL: 31536000 },
}
