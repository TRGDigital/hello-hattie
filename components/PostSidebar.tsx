/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { PostcodeStart } from '@/components/PostcodeStart'
import { TRUST } from '@/lib/site'

const TOOLS = [
  { href: '/tools/care-cost-calculator', name: 'Care cost calculator', line: 'Estimate a weekly cost', icon: 'M4 3h16v18H4zM8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M16 11v6' },
  { href: '/tools/which-care-is-right', name: 'Which care is right?', line: 'Five quick questions', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14M12 17.5v.01' },
  { href: '/tools/funding-checker', name: 'Funding checker', line: 'See what help may apply', icon: 'M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3z' },
]


/** Sticky sidebar beside blog posts and guides: start the search and the free tools. */
export function PostSidebar() {
  return (
    <aside className="post-side" aria-label="Find care and free tools">
      <div className="side-card search">
        <h3><img src="/brand/hello-hattie-mark.svg" alt="" width={32} height={32} />Ready to start your search?</h3>
        <p>Tell us where care is needed and we’ll put you in touch with CQC-registered agencies near you.</p>
        <PostcodeStart label="Postcode where care is needed" />
        <ul className="side-trust">{TRUST.slice(0, 3).map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="side-card">
        <p className="eyebrow">Free tools</p>
        <h3>Plan the cost and the care</h3>
        <ul className="side-tools">
          {TOOLS.map((t) => (
            <li key={t.href}><Link href={t.href}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={t.icon} /></svg>
              <span><b>{t.name}</b><small>{t.line}</small></span>
            </Link></li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
