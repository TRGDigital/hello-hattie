import Image from 'next/image'
import type { Metadata } from 'next'
import { AgencyForm } from '@/components/AgencyForm'
import { Crumbs, Faqs } from '@/components/Blocks'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { TOTAL_AGENCIES } from '@/lib/areas'

export const metadata: Metadata = { title: 'For care agencies', description: 'Receive enquiries from local families looking for home care and live-in care. Pay per enquiry, no contract.', alternates: { canonical: '/for-agencies' } }

// A made-up example so agencies can see what an enquiry contains. No real family's details.
function EnquiryMock() {
  return (
    <div className="mock enquiry-mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>New enquiry · example</span></div>
      <div className="mock-body">
        <div className="mock-rec"><small>Type of care</small><b>Visiting home care</b></div>
        <dl className="enq">
          <div><dt>Postcode area</dt><dd>WR14</dd></div>
          <div><dt>Care is for</dt><dd>Mum or dad</dd></div>
          <div><dt>Hours</dt><dd>14 to 28 a week</dd></div>
          <div><dt>Start</dt><dd>As soon as possible</dd></div>
          <div><dt>Funding</dt><dd>Privately</dd></div>
          <div><dt>Best time</dt><dd>Mornings</dd></div>
        </dl>
        <div className="mock-rec alt"><small>Consent</small><b>Agreed to be contacted by a local agency</b></div>
      </div>
    </div>
  )
}

const STEPS = [
  { n: '01', t: 'Tell us your patch', d: 'Choose the postcode districts you cover and the types of care you offer: visiting, live-in, overnight and more.' },
  { n: '02', t: 'Families tell us what’s needed', d: 'Families answer a few short questions about the care, the hours, how soon and how it will be paid for.' },
  { n: '03', t: 'The enquiry comes to you alone', d: 'Each enquiry goes to one agency only. It arrives by email and text as soon as a family finishes, so you can call while they’re ready to talk.' },
  { n: '04', t: 'You call, assess and quote', d: 'Talk it through, arrange your assessment and give your quote. The family agrees the care directly with you.' },
]

export default function ForAgencies() {
  return (
    <>
      <section className="section costs-hero agency-hero"><div className="in">
        <div className="costs-hero-grid">
          <div className="costs-hero-copy">
            <Crumbs items={[{ label: 'For care agencies' }]} />
            <p className="eyebrow">For CQC-registered care agencies</p>
            <h1>Enquiries from local families, in the postcodes you cover</h1>
            <p className="lede">Families come to Hello Hattie when they need care at home. When one is looking in your area for the care you offer, their enquiry comes straight to you, and only to you. Every enquiry is exclusive.</p>
            <p className="btn-row"><a className="btn" href="#join">Ask about joining</a><a className="btn ghost" href="#how">How it works</a></p>
            <ul className="trust-chips"><li>Exclusive enquiries</li><li>Pay per enquiry</li><li>No contract</li><li>A monthly cap you set</li></ul>
          </div>
          <div className="agency-visual">
            <Image src="/images/agency-desk.jpg" alt="A care manager smiling on a headset at her desk" width={1000} height={750} priority sizes="(max-width: 900px) 100vw, 640px" />
            <EnquiryMock />
          </div>
        </div>
      </div></section>

      <section className="section band" id="how"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <p className="eyebrow">How it works</p>
          <h2>From a family’s question to your phone call</h2>
        </div>
        <div className="work">
          {STEPS.map((s) => <div className="card" key={s.n}><span className="num">{s.n}</span><h3>{s.t}</h3><p>{s.d}</p></div>)}
        </div>
      </div></section>

      <section className="section"><div className="in tool-rows">
        <StoryPanel eyebrow="Enquiries worth calling back" title="Everything you need to prioritise, before you pick up the phone"
          visual={<EnquiryMock />}
          ticks={[
            'The type of care, the hours and how soon it’s needed',
            'How the care will be paid for: privately, by the council, by the NHS or not sure yet',
            'Only postcodes inside the area you told us you cover',
            'Contact details checked for format, with the family’s agreement to be contacted',
            'Exclusive to you, never sent to another agency',
          ]}>
          <p>Every enquiry comes from a family who has told us what they need and agreed to hear from local agencies. We never ask families about medical conditions, so you have the conversation that matters on the first call.</p>
        </StoryPanel>

        <StoryPanel flip eyebrow="Who we work with" title="Registered agencies that want steady, local work"
          image={{ src: '/images/svc-visiting-side.jpg', brief: 'A care worker arriving at an older woman’s front door, both smiling' }}
          ticks={[
            'Registered with the Care Quality Commission',
            'Visiting care, live-in, overnight, dementia, respite and more',
            'Small independents and larger providers alike',
            'Any region of England',
          ]}>
          <p>There are {TOTAL_AGENCIES.toLocaleString('en-GB')} home care agencies on the CQC register in England. Families find it hard to tell them apart, and good local agencies are often hard to find online. We send families to the agencies that cover their street.</p>
        </StoryPanel>
      </div></section>

      <section className="section"><div className="in">
        <DarkFeature eyebrow="Simple, fair terms" title="Pay for the enquiries you receive, nothing else"
          pills={['Exclusive to you', 'Pay per enquiry', 'A monthly cap you set', 'No contract', 'Bad details credited']}
          image={{ src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home, arranging care for her mum' }}>
          <p>Every enquiry is exclusive: we never sell the same family to another agency, so you’re not racing competitors to the phone. You pay per enquiry you receive, and set a monthly cap so you never spend more than you planned. If an enquiry has bad details, such as a wrong number, you can return it for a credit.</p>
          <p>We’ll talk you through pricing for your area when you get in touch.</p>
        </DarkFeature>
      </div></section>

      <section className="section band" id="join"><div className="in">
        <div className="join-grid">
          <div className="prose">
            <p className="eyebrow">Join Hello Hattie</p>
            <h2>Ask about joining</h2>
            <p>Tell us a little about your agency and we’ll be in touch to talk about your area, the care you offer and pricing.</p>
            <ul className="checklist">
              <li>Have your CQC location ID to hand</li>
              <li>List the postcode districts you cover</li>
              <li>Tell us the types of care you can take on now</li>
            </ul>
          </div>
          <AgencyForm />
        </div>
      </div></section>

      <Faqs title="Questions agencies ask" faqs={[
        { q: 'How do families find Hello Hattie?', a: 'Through our website, search engines and online advertising. Families use our guides and free tools, then ask to be matched with agencies near them.' },
        { q: 'Do families know an agency will contact them?', a: 'Yes. On the last step, every family agrees to their details being passed to CQC-registered agencies that cover their area, so they can be contacted about care.' },
        { q: 'Are enquiries shared with other agencies?', a: 'No. Every enquiry is exclusive. Each family’s enquiry is sent to one agency only, and never sold again.' },
        { q: 'How much does an enquiry cost?', a: 'It depends on your area and the types of care you offer. Get in touch and we’ll talk you through it. You always set a monthly cap.' },
        { q: 'What counts as bad details?', a: 'Contact details that are wrong or unreachable, such as a wrong phone number. You can return those for a credit.' },
        { q: 'Is there a contract?', a: 'No. You pay per enquiry you receive, with a monthly cap you set.' },
      ]} />
    </>
  )
}
