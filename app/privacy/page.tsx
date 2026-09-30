import type { Metadata } from 'next'
import { BRAND } from '@/lib/site'
import { PageHero } from '@/components/Blocks'

export const metadata: Metadata = { title: 'Privacy notice', alternates: { canonical: '/privacy' } }

export default function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Privacy' }]} title="Privacy notice" intro="Draft for legal review. This notice explains what we collect when you use our matching service and what we do with it." />
      <section className="section"><div className="in"><div className="prose">
        <h2>Who we are</h2>
        <p>{BRAND.name} is a trading name of TRG Digital Ltd, a company registered in England and Wales (company number 11731704), Suite Ra01, 195-197 Wood Street, London, England, E17 3NU. We are the controller of the information you give us.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Your name, phone number, email address and the postcode where care is needed</li>
          <li>Your answers about the care arrangements: who it’s for, the type and amount of care, the kind of help, when it’s needed and how it’s likely to be paid for</li>
          <li>How you found us, such as the advert you clicked, and basic technical details about your visit</li>
        </ul>
        <p>We don’t ask about medical conditions, and please don’t send us health information.</p>
        <h2>What we do with it</h2>
        <p>With your agreement, we pass your details and answers to up to 3 home care agencies registered with the Care Quality Commission that cover your postcode, so they can contact you about care. Each agency then handles your information under its own privacy notice. If you ticked the box for guides, we’ll also email you occasional guides, and you can unsubscribe at any time.</p>
        <h2>Postcode look-ups</h2>
        <p>When you use the service area tool on our home page, we look up the location of your postcode district (the first half of your postcode, such as WR14) using postcodes.io, a free postcode service. We don’t send the full postcode, and we don’t store the look-up.</p>
        <h2>Changing your mind</h2>
        <p>You can withdraw your agreement at any time by emailing {BRAND.email}. We’ll stop sharing your details and tell the agencies we introduced you to.</p>
        <h2>How long we keep it</h2>
        <p>We keep enquiry details for 12 months, then delete them.</p>
        <h2>Your rights</h2>
        <p>You can ask for a copy of your information, ask us to correct or delete it, or object to how we use it, by emailing {BRAND.email}. You can also complain to the Information Commissioner’s Office at ico.org.uk.</p>
      </div></div></section>
    </>
  )
}
