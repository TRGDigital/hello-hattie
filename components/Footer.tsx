import Link from 'next/link'
import { BRAND } from '@/lib/site'
import { SERVICES } from '@/content/services'
import { CookieSettingsLink } from '@/components/Analytics'

// Accreditations held by TRG Digital Ltd, which runs Hello Hattie. Each links to the body that
// issued it, so a visitor can check the claim. Only add a badge we actually hold. The CPD mark is
// deliberately left off: it certifies CareStream's training, not this service.
const BADGES = [
  { src: '/badges/gbc-accredited.png', w: 112, h: 120, alt: 'Good Business Charter accredited', href: 'https://www.goodbusinesscharter.com/' },
  { src: '/badges/ico-registered.png', w: 119, h: 120, alt: "Registered with the Information Commissioner's Office", href: 'https://ico.org.uk/ESDWebPages/Entry/ZC221613' },
  // Crown Copyright mark, Level 1 Committed: never recolour, redraw or swap levels.
  { src: '/badges/disability-confident-committed.png', w: 249, h: 120, alt: 'Disability Confident Committed', href: 'https://www.gov.uk/government/collections/disability-confident-campaign' },
  // Our own statement, not a third-party certificate, so it links to where we explain it. Keep last.
  { src: '/badges/gdpr-compliant.png', w: 286, h: 120, alt: 'GDPR compliant', href: '/privacy', self: true },
]

export function Footer() {
  return (
    <>
      <section className="accred" aria-label="Accreditations and registrations"><div className="in">
        <p className="accred-lead">Accreditations and compliance</p>
        <ul className="accred-row">
          {BADGES.map((b) => (
            <li key={b.src}>
              <a href={b.href} {...(b.self ? {} : { target: '_blank', rel: 'noopener noreferrer' })} title={b.alt}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" className={b.w > 200 ? 'wide' : undefined} />
              </a>
            </li>
          ))}
        </ul>
        <p className="accred-note">ICO registration ZC221613</p>
      </div></section>

      <footer className="site-foot">
        <div className="in">
          <div className="foot-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/hello-hattie-logo.svg" alt={BRAND.name} width={216} height={50} />
            <p>Free matching with CQC-registered home care agencies across England. Built by people who have worked in care.</p>
            <address>Suite Ra01, 195-197 Wood Street,<br />London, E17 3NU</address>
            <p><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
          </div>
          <div><h3>Types of care</h3><ul>
            {SERVICES.map((x) => <li key={x.slug}><Link href={`/${x.slug}`}>{x.name}</Link></li>)}
          </ul></div>
          <div><h3>Help and advice</h3><ul>
            <li><Link href="/costs">Care costs</Link></li>
            <li><Link href="/tools">Tools</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/areas">Areas we cover</Link></li>
          </ul></div>
          <div><h3>About</h3><ul>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/for-agencies">For care agencies</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><CookieSettingsLink /></li>
          </ul></div>
        </div>
        <div className="fineprint"><div className="in">
          <div className="fine-legal">
            <p>© {new Date().getFullYear()} TRG Digital Ltd · Company 11731704 · Registered in England · ICO registered: ZC221613</p>
            <p>Hello Hattie is a service of TRG Digital Ltd. We are a free matching service, not a care provider: we do not employ carers or provide care, and the agency a family chooses is responsible for the care it provides. CQC ratings and reports belong to the Care Quality Commission.</p>
          </div>
          <p className="built-by">This site was built by <a href="https://www.trgdigital.co.uk" target="_blank" rel="noopener">TRG Digital</a>, a specialist care sector marketing agency</p>
        </div></div>
      </footer>
    </>
  )
}
