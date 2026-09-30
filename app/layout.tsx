import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible, Newsreader } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileBar } from '@/components/Blocks'
import { BRAND } from '@/lib/site'
import { Attribution } from '@/components/Attribution'
import { PaletteSwitch } from '@/components/PaletteSwitch'

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
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#F4F6F1' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${atkinson.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <Attribution />
        {!BRAND.live && <PaletteSwitch />}
      </body>
    </html>
  )
}
