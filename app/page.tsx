import Link from 'next/link'
import { PostcodeStart } from '@/components/PostcodeStart'
import { CtaBand, Faqs, PhotoSlot, Trust } from '@/components/Blocks'
import { SERVICES } from '@/content/services'
import { ARTICLES } from '@/content/articles'
import { AREAS, AREAS_GENERATED, RATINGS, REGIONS, TOTAL_AGENCIES } from '@/lib/areas'
import { RadiusDemo } from '@/components/RadiusDemo'
import { HONEST, PROMISE } from '@/lib/site'

const MAIN = ['live-in-care', 'home-care', 'overnight-care', 'dementia-care-at-home', 'respite-care-at-home', 'companionship-care']

export default function Home() {
  const main = MAIN.map((s) => SERVICES.find((x) => x.slug === s)!).filter(Boolean)
  const guides = ARTICLES.filter((a) => a.kind === 'guide').slice(0, 3)
  return (
    <>
      <section className="hero"><div className="in">
        <div className="copy">
          <h1>Find trusted care at home, near you</h1>
          <p className="lede">{PROMISE}</p>
          <PostcodeStart />
          <Trust />
        </div>
        <PhotoSlot />
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="in">
        <div className="stats">
          <div className="stat"><b>{TOTAL_AGENCIES.toLocaleString('en-GB')}</b><span>CQC-registered home care agencies on the register in England</span></div>
          <div className="stat"><b>{AREAS.length}</b><span>council areas covered, from Cornwall to Northumberland</span></div>
          <div className="stat"><b>Up to 3</b><span>local agencies matched to your postcode, free for families</span></div>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <h2>How it works</h2>
        <ol className="steps">
          <li><h3>Tell us about the care needed</h3><p>A few simple questions about the help, the hours and where. It takes about 2 minutes.</p></li>
          <li><h3>We find local agencies</h3><p>We match you with up to 3 CQC-registered agencies that cover your area and offer the care you need.</p></li>
          <li><h3>They call you to talk it through</h3><p>Compare what each one offers and choose the agency that feels right. There’s no obligation.</p></li>
        </ol>
        <p><Link href="/how-it-works">More about how matching works</Link></p>
      </div></section>

      <section className="section"><div className="in">
        <div style={{ display: 'grid', gap: 28 }}>
          <div className="prose">
            <h2>How service areas work</h2>
            <p>Every home care agency covers an area around its office. It’s usually set by how far its carers can travel between visits, often a few miles in a town and further in the countryside.</p>
            <p>That’s why the postcode matters. We only match you with agencies whose service area includes the address where care is needed, so the carers are local, arrive on time and spend their time with you rather than on the road.</p>
            <p>Try it: enter a postcode and choose a distance to see how many registered agencies are based nearby.</p>
          </div>
          <RadiusDemo />
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Registered home care providers in England</h2><span className="small muted">CQC register, {new Date(AREAS_GENERATED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
        <div className="grid-2">
          <div style={{ display: 'grid', gap: 14 }}>
            <h3>{TOTAL_AGENCIES.toLocaleString('en-GB')} agencies, by CQC rating</h3>
            <div className="bars">
              {([['Outstanding', RATINGS.outstanding], ['Good', RATINGS.good], ['Requires improvement', RATINGS.requiresImprovement], ['Inadequate', RATINGS.inadequate], ['Not yet rated', RATINGS.notRated]] as [string, number][]).map(([l, n]) => (
                <div className="bar" key={l}><span>{l}</span><span className="track"><i className={`fill${l === 'Not yet rated' ? ' hi' : ''}`} style={{ width: `${(n / TOTAL_AGENCIES) * 100}%` }} /></span><b>{n.toLocaleString('en-GB')}</b></div>
              ))}
            </div>
            <p className="small muted">“Not yet rated” agencies are usually newer and waiting for their first inspection. We only match you with registered agencies, and you can read any agency’s latest report on the CQC website.</p>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <h3>By region</h3>
            <div className="bars">
              {[...REGIONS].sort((a, b) => b.total - a.total).map((r) => (
                <div className="bar" key={r.slug}><span><Link href={`/areas#${r.slug}`}>{r.name}</Link></span><span className="track"><i className="fill" style={{ width: `${(r.total / REGIONS.reduce((m, x) => Math.max(m, x.total), 0)) * 100}%` }} /></span><b>{r.total.toLocaleString('en-GB')}</b></div>
              ))}
            </div>
          </div>
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="head-row"><h2>Types of care at home</h2><Link href="/types-of-care">See all types of care</Link></div>
        <div className="grid-3">
          {main.map((s) => (
            <Link className="card" key={s.slug} href={`/${s.slug}`}><h3>{s.name}</h3><p>{s.short}</p><b className="more">Find out more</b></Link>
          ))}
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="grid-2">
          <div className="prose">
            <h2>What we look for in a match</h2>
            <ul className="checklist">
              <li>Registered with the Care Quality Commission, the regulator for care in England</li>
              <li>Covers your postcode, so carers are local and travel less</li>
              <li>Offers the type of care you’ve asked for, from short visits to live-in</li>
              <li>Able to take on new clients now</li>
            </ul>
            <p className="muted">You can check any agency’s latest inspection rating on the CQC website before you decide.</p>
          </div>
          <PhotoSlot caption="Photo: a family talking with a carer at the kitchen table" />
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="grid-2">
          <div className="panel hi">
            <h2>What does care at home cost?</h2>
            <p>Prices depend on where you live, the hours and the type of care. Our cost guides explain what affects the price, and our calculator helps you estimate a weekly budget.</p>
            <p><Link href="/costs">See care costs</Link> · <Link href="/tools/care-cost-calculator">Use the calculator</Link></p>
          </div>
          <div className="panel line">
            <h2>How we’re paid</h2>
            <p>{HONEST}</p>
            <p><Link href="/how-it-works">How matching works</Link></p>
          </div>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Free tools to help you plan</h2><Link href="/tools">All tools</Link></div>
        <div className="grid-3">
          <Link className="card" href="/tools/care-cost-calculator"><h3>Care cost calculator</h3><p>Estimate the weekly and yearly cost of visiting care.</p><b className="more">Work it out</b></Link>
          <Link className="card" href="/tools/which-care-is-right"><h3>Which care is right?</h3><p>Answer a few questions to see which type of care may suit.</p><b className="more">Find out</b></Link>
          <Link className="card" href="/tools/funding-checker"><h3>Funding checker</h3><p>See whether the council may help and if Attendance Allowance could apply.</p><b className="more">Check now</b></Link>
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="head-row"><h2>Guides for families</h2><Link href="/guides">All guides</Link></div>
        <div className="grid-3">
          {guides.map((g) => (
            <Link className="card" key={g.slug} href={`/guides/${g.slug}`}><h3>{g.title}</h3><p>{g.summary}</p><b className="more">Read the guide</b></Link>
          ))}
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Care at home across England</h2><Link href="/areas">All areas</Link></div>
        <ul className="chips">
          {REGIONS.map((r) => <li key={r.slug}><Link href={`/areas#${r.slug}`}>{r.name}</Link></li>)}
        </ul>
      </div></section>

      <Faqs faqs={[
        { q: 'Is it really free?', a: 'Yes. Families never pay us anything. Care agencies pay us when we introduce them to a family, and that never changes the price they charge you.' },
        { q: 'Who will contact me?', a: 'Up to 3 CQC-registered home care agencies that cover your postcode. They’ll call to talk through what you need and how they could help.' },
        { q: 'Do I have to choose one of the agencies?', a: 'No. There’s no obligation. You can compare what they offer, ask questions and take your time.' },
        { q: 'Are you a care agency?', a: 'No. We’re a matching service. We don’t employ carers or provide care. The agency you choose provides the care and agrees the details with you.' },
        { q: 'Which areas do you cover?', a: 'We match families with agencies across England. Care agencies in England are registered and inspected by the Care Quality Commission.' },
      ]} />

      <CtaBand />
    </>
  )
}
