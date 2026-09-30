import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ThanksGreeting } from '@/components/ThanksGreeting'
import { ArticleCard } from '@/components/ArticleCard'
import { articleBySlug } from '@/content/articles'
import { BRAND } from '@/lib/site'

export const metadata: Metadata = { title: 'Thank you', robots: { index: false, follow: false } }

const READS = [['blog', 'questions-to-ask-a-home-care-agency'], ['blog', 'what-happens-at-a-home-care-assessment'], ['cost', 'home-care-cost-per-hour']] as const

export default function ThankYou() {
  const reads = READS.map(([k, s]) => articleBySlug(k, s)).filter(Boolean)
  return (
    <>
      <section className="thanks-hero"><div className="in">
        <div className="thanks-copy">
          <span className="thanks-tick" aria-hidden="true" />
          <ThanksGreeting />
        </div>
        <figure className="hero-photo">
          <Image src="/images/hattie-phone.jpg" alt="A woman smiling on the phone at home" width={900} height={900} priority sizes="(max-width: 900px) 100vw, 520px" />
          <figcaption className="hattie-note">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/hello-hattie-mark.svg" alt="" />
            <div><p>“Keep your phone nearby. The call may come from a number you don’t recognise.”</p><small>Hattie</small></div>
          </figcaption>
        </figure>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}><h2>What happens next</h2></div>
        <div className="work three">
          <div className="card"><span className="num">01</span><h3>The agency calls you</h3><p>They’ll ask about the help needed and your routines, and answer your questions. Have a pen handy.</p></div>
          <div className="card"><span className="num">02</span><h3>They arrange an assessment</h3><p>Usually a visit to the home to understand what’s needed, before they give you a written quote.</p></div>
          <div className="card"><span className="num">03</span><h3>You decide</h3><p>Think about the quote and how the agency made you feel. You can say no at any point, with nothing to pay us.</p></div>
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="story">
          <div className="story-copy">
            <p className="eyebrow">Get ready for the call</p>
            <h2>Five questions worth asking</h2>
            <ul className="checklist">
              <li>Can you cover the visit times we need, including weekends?</li>
              <li>Will it be the same small group of carers most of the time?</li>
              <li>How do you introduce a new carer before they start?</li>
              <li>What happens if a carer is running late or can’t come?</li>
              <li>Can we have every rate in writing, including bank holidays?</li>
            </ul>
            <p><Link className="btn ghost" href="/blog/questions-to-ask-a-home-care-agency">Read the full article</Link></p>
          </div>
          <div className="thanks-side">
          <a className="guide-dl" href="/downloads/hello-hattie-home-care-call-guide.pdf" download>
            <Image src="/downloads/call-guide-cover.jpg" alt="Cover of the Hello Hattie home care call guide" width={420} height={594} sizes="140px" />
            <span className="guide-dl-copy">
              <span className="eyebrow">Free download</span>
              <b>Your home care call guide</b>
              <span>20 questions to ask with why each matters, what to have ready, a page for your notes, what happens at the assessment, warning signs, and free advice lines.</span>
              <span className="btn hi">Download the PDF</span>
              <small>7 pages · PDF · print it or keep it on your phone</small>
            </span>
          </a>
          <div className="side-card">
            <p className="eyebrow">Useful while you wait</p>
            <ul className="side-links">
              <li><Link href="/tools/care-cost-calculator">Work out a weekly cost</Link></li>
              <li><Link href="/tools/funding-checker">Check what help with paying may apply</Link></li>
              <li><Link href="/guides/choosing-a-home-care-agency">How to choose a home care agency</Link></li>
              <li><Link href="/types-of-care">Compare types of care at home</Link></li>
            </ul>
          </div>
          </div>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Helpful reading</h2><Link href="/blog">All articles</Link></div>
        <div className="post-grid">{reads.map((a) => <ArticleCard key={a!.slug} a={a!} />)}</div>
      </div></section>

      <section className="section"><div className="in">
        <div className="panel line thanks-change">
          <h2>Changed your mind?</h2>
          <p>That’s fine. Email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> and we’ll tell the agency not to contact you. We won’t pass your details to anyone else.</p>
        </div>
      </div></section>
    </>
  )
}
