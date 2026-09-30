import Link from 'next/link'
import { PostcodeStart } from '@/components/PostcodeStart'
import { CtaBand, Faqs, Trust } from '@/components/Blocks'
import { RadiusDemo } from '@/components/RadiusDemo'
import { Slot } from '@/components/Slot'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { ARTICLES } from '@/content/articles'
import { ArticleCard } from '@/components/ArticleCard'
import { AREAS, AREAS_GENERATED, RATINGS, REGIONS, TOTAL_AGENCIES } from '@/lib/areas'
import { PROMISE } from '@/lib/site'

// The five types of care shown with thumbnails. Each links to its own page.
const CARE = [
  { slug: 'home-care', name: 'Visiting care', line: 'Help at the times of day it’s needed most.', link: 'Visiting home care', brief: 'A carer sharing breakfast with an older man in his kitchen', img: '/images/care-visiting.jpg' },
  { slug: 'live-in-care', name: 'Live-in care', line: 'A carer who lives in, for support day and night.', link: 'Live-in care', brief: 'A live-in carer and an older woman planting flowers together in her garden', img: '/images/care-live-in.jpg' },
  { slug: 'overnight-care', name: 'Overnight care', line: 'Someone there through the night, awake or asleep.', link: 'Overnight care', brief: 'A carer bringing an older man a cup of tea in the evening', img: '/images/care-overnight.jpg' },
  { slug: 'dementia-care-at-home', name: 'Dementia care at home', line: 'Familiar faces, familiar routines, at home.', link: 'Dementia care at home', brief: 'A carer and an older woman looking through a photo album together', img: '/images/care-dementia.jpg' },
  { slug: 'respite-care-at-home', name: 'Respite care', line: 'Cover at home so a family carer can rest.', link: 'Respite care at home', brief: 'A daughter relaxing with a cup of tea while her father chats with his carer', img: '/images/care-respite.jpg' },
]

export default function Home() {
  const guides = ARTICLES.filter((a) => a.kind === 'guide').slice(0, 2)
  const costGuide = ARTICLES.find((a) => a.kind === 'cost')
  const posts = ARTICLES.filter((a) => a.kind === 'blog').slice(0, 3)
  return (
    <>
      <section className="hero"><div className="in">
        <div className="copy">
          <p className="eyebrow">Home care matching across England</p>
          <h1>Find trusted care at home, near you</h1>
          <p className="lede">{PROMISE}</p>
          <PostcodeStart />
          <Trust />
        </div>
        <figure className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-home.jpg" alt="A smiling carer holding hands with an older woman in her living room" width={1800} height={1092} fetchPriority="high" />
          <figcaption className="hattie-note">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/hello-hattie-mark.svg" alt="" />
            <div>
              <p>“Hello, I’m Hattie. Tell me where care is needed and I’ll find registered agencies near you.”</p>
              <small>Free for families, with no obligation</small>
            </div>
          </figcaption>
        </figure>
      </div></section>

      <section className="section" style={{ paddingTop: 12 }}><div className="in">
        <div className="paths">
          <Link className="path" href="/get-matched">
            <div>
              <span className="eyebrow">For families</span>
              <h2>I’m looking for care</h2>
              <p>Visiting care, live-in care, overnight and dementia care, from agencies near you.</p>
              <span className="go">Get matched, it’s free →</span>
            </div>
            <Slot className="round" brief="A smiling woman on the phone at home" src="/images/family-phone.jpg" />
          </Link>
          <Link className="path dark" href="/for-agencies">
            <div>
              <span className="eyebrow">For care agencies</span>
              <h2>I’d like more local enquiries</h2>
              <p>Enquiries from families in the postcodes you cover. Pay per enquiry, no contract.</p>
              <span className="go">How it works for agencies →</span>
            </div>
            <Slot className="round" brief="A care manager on a headset at her desk" src="/images/agency-manager.jpg" />
          </Link>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <h2>Care at home, whatever’s needed</h2>
          <p className="muted">From a hand getting up in the morning to someone there day and night, the right help at home makes staying there possible. Choose a type of care to find out more.</p>
        </div>
        <div className="care-cards">
          {CARE.map((c) => (
            <Link className="care-card" key={c.slug} href={`/${c.slug}`}>
              <Slot brief={c.brief} src={c.img} />
              <div className="body"><h3>{c.name}</h3><p>{c.line}</p><span className="go">{c.link} →</span></div>
            </Link>
          ))}
        </div>
        <p><Link href="/types-of-care">See all types of care</Link></p>
      </div></section>

      <section className="section"><div className="in">
        <div className="grid-2" style={{ alignItems: 'center', gap: 'clamp(24px, 4vw, 56px)' }}>
          <div className="prose">
            <p className="eyebrow">Why Hello Hattie</p>
            <h2>One conversation instead of a ring-round</h2>
            <p>Finding a care agency usually means searching, phoning round and telling the same story again and again, often while a parent is waiting to come home from hospital. With Hello Hattie you tell us once, and the right local agencies come to you.</p>
            <ul className="checklist">
              <li>Only agencies registered with the Care Quality Commission, the regulator for care in England</li>
              <li>Agencies that cover your postcode, so carers are local</li>
              <li>Agencies that offer the type of care you need and can take on new clients</li>
              <li>Free for families, with no obligation to choose any of them</li>
            </ul>
            <p><Link className="btn" href="/how-it-works">How matching works</Link></p>
          </div>
          <Slot className="big wide" brief="A family and their carer chatting over tea around the kitchen table" src="/images/why-kitchen.jpg" />
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <h2>How we work</h2>
          <p className="muted">What happens from the moment you get in touch.</p>
        </div>
        <div className="work">
          <div className="card"><span className="num">01</span><h3>You tell us</h3><p>Where care is needed, the kind of help, roughly how many hours and when. It takes about 2 minutes, and we never ask about medical conditions.</p></div>
          <div className="card"><span className="num">02</span><h3>We check</h3><p>We look for agencies registered with the CQC that cover your postcode, offer that type of care and can take on new clients.</p></div>
          <div className="card"><span className="num">03</span><h3>Agencies call you</h3><p>Up to 3 agencies get in touch to talk it through. Most will arrange an assessment before giving you a written quote.</p></div>
          <div className="card"><span className="num">04</span><h3>You choose</h3><p>Compare what each one offers and how they made you feel. Choose one, or none. There’s no obligation and nothing to pay us.</p></div>
        </div>
      </div></section>

      <section className="section"><div className="in">
        <RadiusDemo />
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
            <p className="small muted">“Not yet rated” agencies are usually newer and waiting for their first inspection. You can read any agency’s latest report on the CQC website.</p>
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

      <section className="section"><div className="in" style={{ display: 'grid', gap: 'clamp(40px, 6vw, 72px)' }}>
        <StoryPanel eyebrow="Who is Hattie?" title="A friendly name for a free matching service"
          image={{ src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home, arranging care for her mum' }}
          ticks={[
            'Run by TRG Digital, a UK company that has worked with care providers for many years',
            'Built by people who have worked in UK care homes and nursing homes',
            'We only introduce you to CQC-registered agencies that cover your postcode',
            'Free for families. Agencies pay us, and we’re open about that',
          ]}
          cta={{ href: '/about', label: 'About Hello Hattie' }}>
          <p>Hattie isn’t a care agency, and she isn’t one person. She’s the name we gave our matching service, because finding care should feel like talking to someone who knows the way. We started it after seeing how hard it is for families to find a good agency in a hurry, and how often good local agencies are hard to find.</p>
        </StoryPanel>

        <DarkFeature eyebrow="For care agencies" title="Enquiries from families in the postcodes you cover"
          pills={['Pay per enquiry', 'A monthly cap you set', 'Your postcodes only', 'No contract', 'Bad details credited']}
          cta={{ href: '/for-agencies', label: 'How it works for agencies' }}
          image={{ src: '/images/agency-desk.jpg', brief: 'A care manager smiling on a headset at her desk' }}>
          <p>Tell us the postcode districts you cover and the care you offer. When a family nearby is looking, their enquiry comes straight to you by email and text, with the type of care, hours, start date and funding, so you can call them back quickly.</p>
        </DarkFeature>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Helpful resources</h2><span><Link href="/tools">All tools</Link> · <Link href="/guides">All guides</Link></span></div>
        <div className="res">
          <Link className="card" href="/tools/care-cost-calculator"><span className="kind">Tool</span><h3>Care cost calculator</h3><p>Estimate the weekly and yearly cost of visiting care.</p><b className="more">Work it out</b></Link>
          <Link className="card" href="/tools/which-care-is-right"><span className="kind">Tool</span><h3>Which care is right?</h3><p>A few questions to see which type of care may suit.</p><b className="more">Find out</b></Link>
          <Link className="card" href="/tools/funding-checker"><span className="kind">Tool</span><h3>Funding checker</h3><p>See if the council may help and whether Attendance Allowance could apply.</p><b className="more">Check now</b></Link>
          {costGuide && <Link className="card" href={`/costs/${costGuide.slug}`}><span className="kind">Cost guide</span><h3>{costGuide.title}</h3><p>{costGuide.summary}</p><b className="more">Read the guide</b></Link>}
          {guides.map((g) => (
            <Link className="card" key={g.slug} href={`/guides/${g.slug}`}><span className="kind">Guide</span><h3>{g.title}</h3><p>{g.summary}</p><b className="more">Read the guide</b></Link>
          ))}
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="head-row"><h2>Areas we cover</h2><Link href="/areas">All {AREAS.length} areas</Link></div>
        <p className="muted" style={{ maxWidth: '65ch' }}>We match families with CQC-registered home care agencies in every region of England, from {TOTAL_AGENCIES.toLocaleString('en-GB')} agencies on the register. Choose your region to find your council area.</p>
        <ul className="chips">
          {REGIONS.map((r) => <li key={r.slug}><Link href={`/areas#${r.slug}`}>{r.name}</Link></li>)}
        </ul>
      </div></section>

      <Faqs band faqs={[
        { q: 'Is it really free?', a: 'Yes. Families never pay us anything. Care agencies pay us when we introduce them to a family.' },
        { q: 'Who will contact me?', a: 'Up to 3 CQC-registered home care agencies that cover your postcode. They’ll call to talk through what you need and how they could help.' },
        { q: 'Do I have to choose one of the agencies?', a: 'No. There’s no obligation. You can compare what they offer, ask questions and take your time.' },
        { q: 'Are you a care agency?', a: 'No. We’re a matching service. We don’t employ carers or provide care. The agency you choose provides the care and agrees the details with you.' },
        { q: 'Which areas do you cover?', a: 'We match families with agencies across England. Care agencies in England are registered and inspected by the Care Quality Commission.' },
      ]} />

      <section className="section"><div className="in">
        <div className="head-row"><div style={{ display: 'grid', gap: 6 }}><p className="eyebrow">From the blog</p><h2>Advice for families arranging care</h2></div><Link href="/blog">All articles</Link></div>
        <div className="post-grid">{posts.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </div></section>

      <CtaBand />
    </>
  )
}
