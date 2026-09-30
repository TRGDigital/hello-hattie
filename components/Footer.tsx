import Link from 'next/link'
import { BRAND, HONEST } from '@/lib/site'
import { TOTAL_AGENCIES } from '@/lib/areas'

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="in">
        <div style={{ display: 'grid', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hello-hattie-logo.svg" alt={BRAND.name} width={173} height={40} />
          <p>{HONEST}</p>
          <p>We match families with CQC-registered home care agencies across England, from {TOTAL_AGENCIES.toLocaleString('en-GB')} on the CQC register.</p>
        </div>
        <div><h3>Types of care</h3><ul>
          <li><Link href="/live-in-care">Live-in care</Link></li>
          <li><Link href="/home-care">Visiting home care</Link></li>
          <li><Link href="/overnight-care">Overnight care</Link></li>
          <li><Link href="/dementia-care-at-home">Dementia care at home</Link></li>
          <li><Link href="/types-of-care">All types of care</Link></li>
        </ul></div>
        <div><h3>Help and advice</h3><ul>
          <li><Link href="/costs">Care costs</Link></li>
          <li><Link href="/tools">Tools</Link></li>
          <li><Link href="/guides">Guides</Link></li>
          <li><Link href="/areas">Areas we cover</Link></li>
        </ul></div>
        <div><h3>About</h3><ul>
          <li><Link href="/how-it-works">How it works</Link></li>
          <li><Link href="/about">About us</Link></li>
          <li><Link href="/for-agencies">For care agencies</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
        </ul></div>
      </div>
      <div className="fineprint"><div className="in">© {new Date().getFullYear()} {BRAND.name}. A free matching service, not a care provider.</div></div>
    </footer>
  )
}
