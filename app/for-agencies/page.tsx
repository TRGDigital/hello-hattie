import type { Metadata } from 'next'
import { AgencyForm } from '@/components/AgencyForm'
import { PageHero } from '@/components/Blocks'

export const metadata: Metadata = { title: 'For care agencies', description: 'Receive enquiries from local families looking for home care and live-in care. Pay per enquiry, no contract.', alternates: { canonical: '/for-agencies' } }

export default function ForAgencies() {
  return (
    <>
      <PageHero crumbs={[{ label: 'For care agencies' }]} title="Enquiries from local families, for CQC-registered agencies" intro="Families tell us where care is needed, the type of care, the hours, when they need it and how it will be paid for. We pass each enquiry to up to 3 agencies that cover the postcode." />
      <section className="section"><div className="in">
        <div className="grid-2">
          <div className="prose">
            <h2>How it works for agencies</h2>
            <ul className="checklist">
              <li>You choose the postcode districts you cover and the types of care you offer</li>
              <li>Enquiries arrive by email and text as soon as a family finishes</li>
              <li>Each enquiry shows the type of care, hours, start date and funding, so you can prioritise</li>
              <li>You pay per enquiry you receive, with a monthly cap you set</li>
              <li>Bad details, such as a wrong number, can be returned for a credit</li>
            </ul>
            <p className="muted">We only work with agencies registered with the Care Quality Commission.</p>
          </div>
          <AgencyForm />
        </div>
      </div></section>
    </>
  )
}
