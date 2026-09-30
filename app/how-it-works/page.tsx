import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaBand, Faqs, Crumbs, Trust } from '@/components/Blocks'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { PostcodeStart } from '@/components/PostcodeStart'
import { RadiusDemo } from '@/components/RadiusDemo'
import { TOTAL_AGENCIES } from '@/lib/areas'
import { HONEST } from '@/lib/site'

export const metadata: Metadata = { title: 'How it works', description: 'How our free matching works: a few questions, then up to 3 CQC-registered agencies near you get in touch.', alternates: { canonical: '/how-it-works' } }

const STEPS = [
  {
    n: '01', eyebrow: 'Step 1 · About 2 minutes', title: 'You tell us what’s needed',
    image: { src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home, arranging care for her mum' },
    text: 'Answer a few short questions: where care is needed, the type of care, roughly how many hours and how soon. You can do it for yourself or for someone you look after.',
    ticks: ['We never ask about medical conditions', 'No account or password to set up', 'Your details only go to agencies once you agree'],
  },
  {
    n: '02', eyebrow: 'Step 2 · Our checks', title: 'We check which local agencies fit',
    image: { src: '/images/agency-desk.jpg', brief: 'A care manager smiling on a headset at her desk' },
    text: 'We look for agencies that can genuinely help, rather than whoever pays most. Each one has to pass the same four checks.',
    ticks: ['Registered with the Care Quality Commission', 'Covers the postcode where care is needed', 'Offers the type of care you asked for', 'Can take on new clients'],
  },
  {
    n: '03', eyebrow: 'Step 3 · Agencies call you', title: 'Up to 3 agencies get in touch',
    image: { src: '/images/svc-24h.jpg', brief: 'Two care staff with a clipboard talking with an older woman in her kitchen' },
    text: 'Each agency calls to talk things through. Most will arrange a visit to assess what’s needed, then give you a written quote and a care plan.',
    ticks: ['Never more than 3 agencies', 'Ask them the questions that matter to you', 'Take your time, there’s no deadline'],
  },
  {
    n: '04', eyebrow: 'Step 4 · When you’re ready', title: 'You choose, or choose none',
    image: { src: '/images/why-kitchen.jpg', brief: 'A family and their carer chatting over tea around the kitchen table' },
    text: 'Compare what each agency offers, what it costs and how they made you feel. You agree the care directly with the agency you pick.',
    ticks: ['No obligation to choose any of them', 'Nothing to pay us, ever', 'Tell us if you’d like an agency to stop contacting you'],
  },
]

export default function HowItWorks() {
  return (
    <>
      <section className="section costs-hero"><div className="in">
        <div className="costs-hero-grid">
          <div className="costs-hero-copy">
            <Crumbs items={[{ label: 'How it works' }]} />
            <p className="eyebrow">How it works</p>
            <h1>One short conversation instead of a ring-round</h1>
            <p className="lede">Tell us once what’s needed and we’ll put you in touch with up to 3 CQC-registered home care agencies that cover your area. Free for families, with no obligation.</p>
            <PostcodeStart />
            <Trust />
          </div>
          <figure className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-home.jpg" alt="A smiling carer holding hands with an older woman in her living room" width={1800} height={1092} />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div>
                <p>“You tell me once. I’ll find the registered agencies that cover your street.”</p>
                <small>From {TOTAL_AGENCIES.toLocaleString('en-GB')} agencies on the CQC register</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <h2>Four steps, start to finish</h2>
          <p className="muted">From the moment you get in touch to choosing an agency.</p>
        </div>
        <ol className="step-strip">
          {STEPS.map((s) => <li key={s.n}><span className="num">{s.n}</span><b>{s.title}</b><small>{s.eyebrow.split(' · ')[1]}</small></li>)}
        </ol>
      </div></section>

      <section className="section"><div className="in tool-rows">
        {STEPS.map((s, i) => (
          <StoryPanel key={s.n} flip={i % 2 === 1} eyebrow={s.eyebrow} title={s.title} image={s.image} ticks={s.ticks}>
            <p>{s.text}</p>
          </StoryPanel>
        ))}
      </div></section>

      <section className="section band"><div className="in">
        <RadiusDemo />
      </div></section>

      <section className="section"><div className="in" style={{ display: 'grid', gap: 20 }}>
        <DarkFeature eyebrow="Being open with you" title="How we’re paid, and what we share"
          pills={['Free for families', 'Agencies pay per introduction', 'Up to 3 agencies only', 'No medical questions']}
          image={{ src: '/images/family-phone.jpg', brief: 'A smiling woman on the phone at home' }}>
          <p>{HONEST}</p>
          <p>With your agreement, we pass your contact details and your answers about the care needed to up to 3 local agencies, so they can contact you. Nothing else is shared. Read our <Link href="/privacy">privacy notice</Link>.</p>
        </DarkFeature>
      </div></section>

      <Faqs band faqs={[
        { q: 'How do you choose which agencies to match?', a: 'We match agencies that are registered with the CQC, cover your postcode, offer the type of care you asked for and can take on new clients.' },
        { q: 'How quickly will agencies get in touch?', a: 'Agencies are sent your details as soon as you finish, so they can call you quickly. If care is needed urgently, say so in the questions so they know to prioritise it.' },
        { q: 'Can I ask you to stop an agency contacting me?', a: 'Yes. Email us and we’ll tell the agencies not to contact you again.' },
        { q: 'Do the agencies know each other are in touch?', a: 'They know you may be speaking to more than one agency. That helps you compare fairly.' },
        { q: 'Are you a care agency?', a: 'No. We’re a matching service. We don’t employ carers or provide care. The agency you choose provides the care and agrees the details with you.' },
      ]} />
      <CtaBand />
    </>
  )
}
