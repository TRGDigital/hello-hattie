import Link from 'next/link'
import { BRAND, NAV } from '@/lib/site'
import { MatchLink } from '@/components/MatchLink'

export function Header() {
  return (
    <header className="site-head">
      <div className="in">
        <Link className="logo" href="/" aria-label={`${BRAND.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hello-hattie-logo.svg" alt="" width={175} height={58} />
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        {BRAND.phone
          ? <div className="phone-line">{BRAND.phone}<span>{BRAND.hours}</span></div>
          : null}
        <MatchLink className="btn head-cta">Get matched</MatchLink>
      </div>
    </header>
  )
}
