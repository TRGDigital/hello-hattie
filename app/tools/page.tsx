import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, CtaBand } from '@/components/Blocks'

export const metadata: Metadata = {
  title: 'Free tools for planning care at home',
  description: 'Free, simple tools to estimate home care costs, see which type of care may suit, and check what funding help may be available in England.',
  alternates: { canonical: '/tools' },
}

const TOOLS = [
  { href: '/tools/care-cost-calculator', title: 'Care cost calculator', text: 'Estimate the weekly, four-weekly and yearly cost of visiting care.' },
  { href: '/tools/which-care-is-right', title: 'Which type of care is right?', text: 'Answer five quick questions to see which kind of care at home may suit.' },
  { href: '/tools/funding-checker', title: 'Funding checker', text: 'See if the council or Attendance Allowance may help with the cost in England.' },
]

export default function ToolsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Tools' }]}
        title="Free tools for planning care at home"
        intro="Simple tools to help you think through costs, types of care and funding. Your answers stay on your device and are never saved."
      />
      <section className="section"><div className="in">
        <div className="grid-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="card">
              <h2 style={{ fontSize: '1.3rem' }}>{t.title}</h2>
              <p>{t.text}</p>
              <b className="more">Use the tool</b>
            </Link>
          ))}
        </div>
      </div></section>
      <CtaBand />
    </>
  )
}
