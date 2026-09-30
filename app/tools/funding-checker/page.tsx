import type { Metadata } from 'next'
import FundingChecker from '@/components/tools/FundingChecker'
import { ToolShell } from '@/components/tools/ToolShell'
import { FIGURES, gbp } from '@/lib/figures'

export const metadata: Metadata = {
  title: 'Care funding checker for England',
  description: 'See if the council may help pay for care at home in England, and whether Attendance Allowance may apply. A free guide, not financial advice.',
  alternates: { canonical: '/tools/funding-checker' },
}

const up = gbp(FIGURES.capitalLimits.upper, 0)
const low = gbp(FIGURES.capitalLimits.lower, 0)

export default function FundingCheckerPage() {
  return (
    <ToolShell href="/tools/funding-checker" title="Care funding checker"
      intro="A quick guide to whether the council may help pay for care at home in England, and whether Attendance Allowance may apply."
      chips={['England only', 'Takes 2 minutes', 'Nothing saved or sent']}
      steps={['Choose roughly how much is in savings', 'See whether the council may help', 'Answer two questions about Attendance Allowance', 'See whether it may apply, and at which rate']}
      tool={<FundingChecker />}
      explainTitle="How this works"
      explain={<>
        <p>In England, councils use savings limits to decide who pays for care. The upper limit is {up} and the lower limit is {low}. {FIGURES.capitalLimits.tariff}</p>
        <p>{FIGURES.homeNotCounted.text}</p>
        <p>Attendance Allowance is a separate benefit for people of State Pension age or over who need help or supervision. It is not means tested. The council’s own assessment decides what help is available.</p>
      </>}
      sources={[FIGURES.capitalLimits, FIGURES.homeNotCounted, FIGURES.attendanceAllowance]}
      faqs={[
        { q: 'Is my home counted if care is at home?', a: 'No. If care is needed so someone can stay living at home, the council’s financial assessment does not include the value of the home they live in.' },
        { q: `What if savings are over ${up}?`, a: 'You will usually pay the full cost of care yourself. You can still ask the council for a needs assessment, and they can help you plan care.' },
        { q: 'Does Attendance Allowance depend on savings?', a: 'No. It is not means tested, so savings and income do not affect it. It is claimed from the Department for Work and Pensions.' },
        { q: 'How do I get a council assessment?', a: 'Contact the adult social care team at your local council and ask for a needs assessment. If they can help, they will also do a financial assessment.' },
      ]}
    />
  )
}
