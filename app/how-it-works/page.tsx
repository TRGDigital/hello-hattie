import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand, Faqs, PageHero } from '@/components/Blocks'
import { HONEST } from '@/lib/site'

export const metadata: Metadata = { title: 'How it works', description: 'How our free matching works: a few questions, then up to 3 CQC-registered agencies near you get in touch.', alternates: { canonical: '/how-it-works' } }

export default function HowItWorks() {
  return (
    <>
      <PageHero crumbs={[{ label: 'How it works' }]} title="How our free matching works" intro="We help you find CQC-registered home care agencies that cover your area, so you can compare them without phoning round." />
      <section className="section"><div className="in">
        <ol className="steps">
          <li><h3>You answer a few questions</h3><p>Where care is needed, the type of care, roughly how much help and when. We don’t ask about medical conditions.</p></li>
          <li><h3>We match local agencies</h3><p>We look for up to 3 agencies registered with the Care Quality Commission that cover your postcode and offer that type of care.</p></li>
          <li><h3>The agencies contact you</h3><p>Each one talks it through with you, may arrange an assessment and gives you a quote. You choose, or choose none.</p></li>
        </ol>
      </div></section>
      <section className="section band"><div className="in">
        <div className="grid-2">
          <div className="panel line"><h2>How we’re paid</h2><p>{HONEST}</p></div>
          <div className="panel line"><h2>What we share</h2><p>With your agreement, we pass your contact details and your answers about the care needed to up to 3 local agencies, so they can contact you. Read our <Link href="/privacy">privacy notice</Link>.</p></div>
        </div>
      </div></section>
      <Faqs faqs={[
        { q: 'How do you choose which agencies to match?', a: 'We match agencies that are registered with the CQC, cover your postcode, offer the type of care you asked for and can take on new clients.' },
        { q: 'Can I ask you to stop an agency contacting me?', a: 'Yes. Email us and we’ll tell the agencies not to contact you again.' },
        { q: 'Do the agencies know each other are in touch?', a: 'They know you may be speaking to more than one agency. That helps you compare fairly.' },
      ]} />
      <CtaBand />
    </>
  )
}
