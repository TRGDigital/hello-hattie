import type { Metadata } from 'next'
import WhichCare from '@/components/tools/WhichCare'
import { ToolShell } from '@/components/tools/ToolShell'

export const metadata: Metadata = {
  title: 'Which type of care at home is right?',
  description: 'Answer five quick questions about the help needed and the home, and see which type of care at home may suit best.',
  alternates: { canonical: '/tools/which-care-is-right' },
}

export default function WhichCarePage() {
  return (
    <ToolShell href="/tools/which-care-is-right" title="Which type of care is right?"
      intro="Five quick questions about how much help is needed and how the home is set up. At the end, we suggest a good place to start and explain why."
      chips={['5 questions', 'No health questions', 'Nothing saved or sent']}
      steps={['Say how much help is needed', 'Tell us about nights and who lives at home', 'Check whether there is room for a carer to stay', 'See a suggested type of care and why']}
      tool={<WhichCare />}
      explainTitle="How this works"
      explain={<>
        <p>The questions are about arrangements, not health. We look at how often help is needed, whether it is needed at night, who else is at home, and whether there is room for a carer to stay.</p>
        <p>From your answers we suggest one of five options: companionship or hourly care, visiting home care, overnight care, live-in care, or respite care at home.</p>
        <p>It is a starting point only. An agency will always assess needs before care begins.</p>
      </>}
      sources={[{ label: 'NHS, Homecare', url: 'https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/homecare/' }]}
      faqs={[
        { q: 'Why don’t you ask about health conditions?', a: 'The right type of care mostly depends on how much help is needed and when. Health needs are best talked through with the agency and the person’s GP or care team.' },
        { q: 'What if more than one type of care fits?', a: 'That is common. Many families mix types, for example daytime visits with some overnight care. An agency can help you plan the right mix.' },
        { q: 'Why does live-in care need a spare room?', a: 'A live-in carer stays in the home, so they need their own room to sleep and take breaks.' },
      ]}
    />
  )
}
