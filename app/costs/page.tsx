import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES } from '@/content/articles'
import { FIGURES, gbp } from '@/lib/figures'
import { CtaBand, PageHero } from '@/components/Blocks'

export const metadata: Metadata = { title: 'Care at home costs', description: 'What home care and live-in care cost, what affects the price, and help with paying.', alternates: { canonical: '/costs' } }

export default function Costs() {
  const costs = ARTICLES.filter((a) => a.kind === 'cost')
  return (
    <>
      <PageHero crumbs={[{ label: 'Costs' }]} title="What does care at home cost?" intro="Prices depend on where you live, the type of care and the hours. These guides explain what affects the price and where help with paying can come from." />
      <section className="section"><div className="in">
        <div className="grid-3">{costs.map((a) => <Link className="card" key={a.slug} href={`/costs/${a.slug}`}><h3>{a.title}</h3><p>{a.summary}</p><b className="more">Read more</b></Link>)}</div>
        <div className="panel hi">
          <h2>A useful starting point</h2>
          <p>The Homecare Association calculates that agencies in England need at least {gbp(FIGURES.hcaMinimumHourly.value)} an hour to provide safe care and pay carers the National Living Wage. Private prices are usually higher. <a href={FIGURES.hcaMinimumHourly.url} target="_blank" rel="noopener">Source</a></p>
          <p><Link href="/tools/care-cost-calculator">Estimate your costs with the calculator</Link></p>
        </div>
      </div></section>
      <CtaBand />
    </>
  )
}
