import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES } from '@/content/articles'
import { FIGURES, gbp } from '@/lib/figures'
import { Crumbs, CtaBand, Faqs } from '@/components/Blocks'
import { ArticleCard } from '@/components/ArticleCard'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { CalcMock } from '@/components/tools/Mockups'

export const metadata: Metadata = { title: 'Care at home costs', description: 'What home care and live-in care cost, what affects the price, and help with paying.', alternates: { canonical: '/costs' } }

const F = FIGURES
const FACTS = [
  { value: gbp(F.hcaMinimumHourly.value), unit: 'an hour', label: `The Homecare Association minimum price for home care in England, ${F.hcaMinimumHourly.short}.`.slice(0, -1) + '. Private prices are usually higher.', src: F.hcaMinimumHourly },
  { value: gbp(F.capitalLimits.upper, 0), unit: 'upper limit', label: 'Over this in savings, you will usually pay the full cost of care yourself.', src: F.capitalLimits },
  { value: gbp(F.capitalLimits.lower, 0), unit: 'lower limit', label: 'Under this, the council may meet more of the cost, depending on income.', src: F.capitalLimits },
  { value: gbp(F.attendanceAllowance.higher), unit: 'a week', label: `Attendance Allowance at the higher rate (${gbp(F.attendanceAllowance.lower)} at the lower rate). Not means tested.`, src: F.attendanceAllowance },
]

const FACTORS = [
  { t: 'Where you live', d: 'Prices tend to be higher where wages and living costs are higher, and in rural areas where carers travel further.' },
  { t: 'Time of day', d: 'Early mornings, evenings and nights can cost more than daytime visits.' },
  { t: 'Weekends and bank holidays', d: 'Many agencies charge a higher rate on these days, so ask for every rate in writing.' },
  { t: 'Visit length', d: 'Short visits usually cost more per hour, because travel between visits still has to be paid.' },
  { t: 'Travel and mileage', d: 'Some agencies include travel in the rate. Others add mileage for shopping trips and errands.' },
  { t: 'The type of care', d: 'More complex needs, or visits that need two carers, cost more than companionship or help with meals.' },
]

const CHARGED = [
  { t: 'Visiting care', how: 'By the hour', d: 'You pay for the time carers spend with you, often with a minimum visit length.', href: '/home-care' },
  { t: 'Overnight care', how: 'By the night', d: 'Usually a set price per night, with waking nights costing more than sleeping nights.', href: '/overnight-care' },
  { t: 'Live-in care', how: 'By the week', d: 'A weekly price for a carer who lives in, depending on the level of need.', href: '/live-in-care' },
]

export default function Costs() {
  const costs = ARTICLES.filter((a) => a.kind === 'cost')
  return (
    <>
      <section className="section costs-hero"><div className="in">
        <div className="costs-hero-grid">
          <div className="costs-hero-copy">
            <Crumbs items={[{ label: 'Costs' }]} />
            <p className="eyebrow">Costs and funding</p>
            <h1>What does care at home cost?</h1>
            <p className="lede">Prices depend on where you live, the type of care and the hours. Here is what shapes the price, the figures worth knowing, and where help with paying can come from.</p>
            <p className="btn-row"><Link className="btn" href="/tools/care-cost-calculator">Work out a cost</Link><Link className="btn ghost" href="/tools/funding-checker">Check funding help</Link></p>
          </div>
          <figure className="hero-photo">
            <Image src="/images/why-kitchen.jpg" alt="A family and their carer chatting over tea around the kitchen table" width={1400} height={702} priority sizes="(max-width: 900px) 100vw, 640px" />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div>
                <p>“Always ask for every rate in writing: weekdays, evenings, weekends and bank holidays.”</p>
                <small>Hattie’s tip for comparing quotes</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '62ch' }}>
          <h2>The numbers worth knowing</h2>
          <p className="muted">Published figures for England. We check them when they change each year.</p>
        </div>
        <div className="facts">
          {FACTS.map((f) => (
            <div className="fact" key={f.value + f.unit}>
              <p className="fact-num"><b>{f.value}</b> <span>{f.unit}</span></p>
              <p>{f.label}</p>
              <a className="source" href={f.src.url} target="_blank" rel="noopener noreferrer">Source</a>
            </div>
          ))}
        </div>
        <p className="small muted">{F.homeNotCounted.text} <a href={F.homeNotCounted.url} target="_blank" rel="noopener noreferrer">Source</a></p>
      </div></section>

      <section className="section"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '62ch' }}>
          <h2>How care at home is usually charged</h2>
          <p className="muted">Each type of care is priced in its own way, which is why quotes can be hard to compare.</p>
        </div>
        <div className="work three">
          {CHARGED.map((c) => (
            <Link className="card" key={c.t} href={c.href}><span className="num">{c.how}</span><h3>{c.t}</h3><p>{c.d}</p><b className="more">About {c.t.toLowerCase()} →</b></Link>
          ))}
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '62ch' }}>
          <h2>What affects the price</h2>
          <p className="muted">Agencies set their own prices. These are the things that make the biggest difference.</p>
        </div>
        <ul className="helps factors">{FACTORS.map((f) => <li key={f.t}><b>{f.t}</b><span>{f.d}</span></li>)}</ul>
      </div></section>

      <section className="section"><div className="in">
        <DarkFeature eyebrow="Free tool" title="Work out a weekly cost in a minute"
          pills={['Hourly rate', 'Visit length', 'Visits a day', 'Days a week']}
          cta={{ href: '/tools/care-cost-calculator', label: 'Open the calculator' }}
          aside={<div className="df-mock"><CalcMock /></div>}>
          <p>Put in the hours you have in mind, or a quote from an agency, and see the weekly, four-weekly and yearly cost. Nothing you enter is saved.</p>
        </DarkFeature>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Cost guides</h2><Link href="/blog">All articles</Link></div>
        <div className="post-grid">{costs.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </div></section>

      <section className="section"><div className="in">
        <StoryPanel eyebrow="Help with paying" title="You may not have to pay for everything yourself"
          image={{ src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home, arranging care for her mum' }}
          ticks={[
            'The council can assess care needs, and then finances, to see if it will help',
            'The value of the home is not counted when care is at home',
            'Attendance Allowance is not means tested, so savings do not affect it',
            'If needs are mainly health needs, the NHS may pay through NHS Continuing Healthcare',
          ]}
          cta={{ href: '/tools/funding-checker', label: 'Check what help may apply' }}>
          <p>Many families pay for some or all of their care, but help is often available. Our guide to paying for care explains each option, and the funding checker shows what may apply in a couple of minutes.</p>
        </StoryPanel>
      </div></section>

      <Faqs band faqs={[
        { q: 'Is there a typical hourly price for home care?', a: 'No. Agencies set their own prices, which vary by area, time of day and visit length. The Homecare Association minimum price is a useful floor, and private prices are usually higher.' },
        { q: 'Why is live-in care priced by the week?', a: 'A live-in carer stays in the home, so agencies price the whole week rather than each hour. The price depends on how much help is needed, including at night.' },
        { q: 'Does the council pay for home care?', a: 'It may. The council carries out a needs assessment and, if you are eligible, a financial assessment. With savings under the upper limit, the council may contribute.' },
        { q: 'Do families pay Hello Hattie anything?', a: 'No. Our matching service is free for families. Care agencies pay us when we introduce them to a family.' },
      ]} />
      <CtaBand />
    </>
  )
}
