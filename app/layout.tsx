import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Newsreader } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileBar } from '@/components/Blocks'
import { BRAND } from '@/lib/site'
import { Attribution } from '@/components/Attribution'
import { Analytics } from '@/components/Analytics'
import { CONSENT_DEFAULT } from '@/lib/analytics'

const atkinson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-atkinson', display: 'swap' })
const newsreader = Newsreader({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-newsreader', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: { default: `${BRAND.name}: find home care near you`, template: `%s | ${BRAND.name}` },
  description: 'Free matching with CQC-registered home care, live-in care and overnight care agencies near you.',
  openGraph: { siteName: BRAND.name, type: 'website', locale: 'en_GB' },
  // Until launch every page is noindex; flip NEXT_PUBLIC_SITE_LIVE=true on the real domain.
  robots: BRAND.live ? { index: true, follow: true } : { index: false, follow: false },
}
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FBF7F0' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${atkinson.variable} ${newsreader.variable}`}>
      {BRAND.live && <head><script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT }} /></head>}
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Attribution />
        {BRAND.live && <Analytics />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization', '@id': `${BRAND.url}/#org`, name: BRAND.name, url: BRAND.url,
              logo: { '@type': 'ImageObject', url: `${BRAND.url}/brand/hello-hattie-mark-512.png`, width: 512, height: 512 }, email: BRAND.email,
              contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: BRAND.email, areaServed: 'GB', availableLanguage: 'en-GB' },
              founder: { '@id': `${BRAND.url}/about#len-burgess` },
              description: 'A free service that matches families in England with a CQC-registered home care agency near them.',
              parentOrganization: { '@type': 'Organization', name: 'TRG Digital Ltd', url: 'https://www.trgdigital.co.uk' },
              address: { '@type': 'PostalAddress', streetAddress: 'Suite Ra01, 195-197 Wood Street', addressLocality: 'London', postalCode: 'E17 3NU', addressCountry: 'GB' },
              areaServed: { '@type': 'Country', name: 'England' },
            },
            { '@type': 'WebSite', '@id': `${BRAND.url}/#site`, name: BRAND.name, url: BRAND.url, inLanguage: 'en-GB', publisher: { '@id': `${BRAND.url}/#org` } },
          ],
        }) }} />
      </body>
    </html>
  )
}
