import type { Metadata } from 'next'
import Link from 'next/link'
import { currentAdmin } from '@/lib/admin-auth'
import { logout } from './actions'

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const NAV = [['/admin', 'Dashboard'], ['/admin/articles', 'Articles'], ['/admin/seo', 'Page SEO'], ['/admin/images', 'Images'], ['/admin/account', 'Account']]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = currentAdmin()
  if (!email) return <div className="adm adm-bare">{children}</div>
  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/hello-hattie-logo.svg" alt="Hello Hattie" width={150} height={35} />
          <span>Admin</span>
        </Link>
        <nav>{NAV.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener">View the site ↗</a>
          <a href="https://www.trgdigital.co.uk/admin/hello-hattie" target="_blank" rel="noopener">Enquiries and agencies ↗</a>
          <small>{email}</small>
          <form action={logout}><button className="linkish">Log out</button></form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  )
}
