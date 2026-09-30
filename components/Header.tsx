import Link from 'next/link'
import { BRAND, NAV } from '@/lib/site'

export function Header() {
  return (
    <header className="site-head">
      <div className="in">
        <Link className="logo" href="/" aria-label={`${BRAND.name} home`}>
          <i aria-hidden="true" />
          <span><b>{BRAND.name}</b><small>{BRAND.tagline}</small></span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        {BRAND.phone
          ? <div className="phone-line">{BRAND.phone}<span>{BRAND.hours}</span></div>
          : null}
        <Link className="btn head-cta" href="/get-matched">Get matched</Link>
      </div>
    </header>
  )
}
