import type { Metadata } from 'next'
import { PageHero, Faqs, CtaBand } from '@/components/Blocks'
import CostCalculator from '@/components/tools/CostCalculator'
import { FIGURES, gbp } from '@/lib/figures'

export const metadata: Metadata = {
  title: 'Home care cost calculator',
  description: 'Estimate the weekly, four-weekly and yearly cost of visiting home care. Free, quick, and your answers stay on your device.',
  alternates: { canonical: '/tools/care-cost-calculator' },
}

const hca = gbp(FIGURES.hcaMinimumHourly.value)

export default function CostCalculatorPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/tools', label: 'Tools' }, { label: 'Care cost calculator' }]}
        title="Home care cost calculator"
        intro="Work out roughly what visiting care could cost each week, every four weeks and over a year. Change the numbers to match what you need."
      />
      <section className="section"><div className="in">
        <CostCalculator />
      </div></section>
      <section className="section band"><div className="in">
        <div className="prose">
          <h2>How we work it out</h2>
          <p>We multiply the hourly rate by the hours per visit, the visits per day and the days per week. That gives the weekly cost. Four-weekly is the weekly cost times four. Yearly is the weekly cost times 52.</p>
          <p>The starting rate is {hca} an hour. This is the {FIGURES.hcaMinimumHourly.label}. {FIGURES.hcaMinimumHourly.note}</p>
          <p>If an agency has given you a quote, put their rate in instead. Nothing you enter is saved or sent anywhere.</p>
          <p className="source">Source: <a href={FIGURES.hcaMinimumHourly.url} target="_blank" rel="noopener noreferrer">{FIGURES.hcaMinimumHourly.label}</a></p>
        </div>
      </div></section>
      <Faqs faqs={[
        { q: 'Why do short visits cost more per hour?', a: 'Carers still need to travel between homes, and that time has to be paid. Many agencies charge a higher hourly rate for visits of 30 or 45 minutes to cover this.' },
        { q: `Why does the calculator start at ${hca} an hour?`, a: 'This is the Homecare Association minimum price for 2025 to 2026. It is the least an agency needs to charge to pay carers properly and run safely. Private prices are usually higher.' },
        { q: 'Can I use this for live-in care?', a: 'No. Live-in care is usually priced by the week rather than by the hour. Our live-in care cost page explains how it is charged.' },
        { q: 'Will I get an exact price?', a: 'Not from this tool. An agency will visit or call to assess what is needed, then give you a quote.' },
      ]} />
      <CtaBand service="visiting" />
    </>
  )
}
