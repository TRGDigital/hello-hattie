import type { Metadata } from 'next'
import Link from 'next/link'
import CostCalculator from '@/components/tools/CostCalculator'
import { ToolShell } from '@/components/tools/ToolShell'
import { FIGURES, gbp } from '@/lib/figures'

export const metadata: Metadata = {
  title: 'Home care cost calculator',
  description: 'Estimate the weekly, four-weekly and yearly cost of visiting home care. Free, quick, and your answers stay on your device.',
  alternates: { canonical: '/tools/care-cost-calculator' },
}

const hca = gbp(FIGURES.hcaMinimumHourly.value)

export default function CostCalculatorPage() {
  return (
    <ToolShell href="/tools/care-cost-calculator" title="Home care cost calculator" service="visiting"
      intro="Work out roughly what visiting care could cost each week, every four weeks and over a year. Change the numbers to match the care you have in mind."
      chips={['Takes a minute', 'Nothing saved or sent', 'England rates']}
      steps={['Put in an hourly rate, or keep the starting rate', 'Choose how long each visit lasts', 'Choose visits a day and days a week', 'Read the weekly, four-weekly and yearly cost']}
      tool={<CostCalculator />}
      explainTitle="How we work it out"
      explain={<>
        <p>We multiply the hourly rate by the hours per visit, the visits per day and the days per week. That gives the weekly cost. Four-weekly is the weekly cost times four, and yearly is the weekly cost times 52.</p>
        <p>The starting rate is {hca} an hour, the {FIGURES.hcaMinimumHourly.label}. {FIGURES.hcaMinimumHourly.note}</p>
        <p>If an agency has given you a quote, put their rate in instead. Live-in care is usually priced by the week, so read our <Link href="/costs/live-in-care-cost">live-in care cost guide</Link> for that.</p>
      </>}
      sources={[FIGURES.hcaMinimumHourly]}
      faqs={[
        { q: 'Why do short visits cost more per hour?', a: 'Carers still need to travel between homes, and that time has to be paid. Many agencies charge a higher hourly rate for visits of 30 or 45 minutes to cover this.' },
        { q: `Why does the calculator start at ${hca} an hour?`, a: `This is the Homecare Association minimum price for ${FIGURES.hcaMinimumHourly.short}. It is the least an agency needs to charge to pay carers properly and run safely. Private prices are usually higher.` },
        { q: 'Can I use this for live-in care?', a: 'No. Live-in care is usually priced by the week rather than by the hour. Our live-in care cost page explains how it is charged.' },
        { q: 'Will I get an exact price?', a: 'Not from this tool. An agency will visit or call to assess what is needed, then give you a quote.' },
      ]}
    />
  )
}
