import { altFor } from '@/lib/cms'
import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { MatchQuizFromUrl } from '@/components/MatchQuiz'
import { TOTAL_AGENCIES } from '@/lib/areas'

export const metadata: Metadata = { title: 'Get matched with local care agencies', robots: { index: false, follow: false } }

const OUT = /^([A-Z]{1,2}[0-9][A-Z0-9]?)/

export default async function GetMatched({ searchParams }: { searchParams: { postcode?: string } }) {
  const district = OUT.exec((searchParams.postcode ?? '').trim().toUpperCase())?.[1]
  return (
    <section className="match-page"><div className="in">
      <div className="match-main">
        <div className="match-head">
          <p className="eyebrow">Free matching{district ? ` · ${district}` : ''}</p>
          <h1>{district ? `Let’s find care at home near ${district}` : 'Let’s find care at home near you'}</h1>
          <p className="lede">A few quick questions about the care needed. Then we’ll match you with a CQC-registered agency that covers the area and offers the right care.</p>
          <ul className="trust-chips"><li>About 2 minutes</li><li>Free for families</li><li>No obligation</li><li>No medical questions</li></ul>
        </div>
        <Suspense fallback={<div className="quiz">Loading…</div>}><MatchQuizFromUrl /></Suspense>
        <p className="small muted">Your details are only shared with the one local agency we match you with, and only once you agree on the last step. Read our <Link href="/privacy">privacy notice</Link>.</p>
      </div>

      <aside className="match-side" aria-label="What happens next">
        <figure className="match-photo">
          <Image src="/images/hero-home.jpg" alt={await altFor('/images/hero-home.jpg', 'A smiling carer holding hands with an older woman in her living room')} width={1800} height={1092} sizes="(max-width: 1000px) 100vw, 400px" />
          <figcaption className="hattie-note">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/hello-hattie-mark.svg" alt="" />
            <div><p>“Answer a few questions and I’ll do the ring-round for you.”</p><small>Hattie</small></div>
          </figcaption>
        </figure>
        <div className="side-card">
          <p className="eyebrow">What happens next</p>
          <ol className="side-steps">
            <li>We check which registered agencies cover the postcode and offer the care you need, and pick the best match</li>
            <li>That agency, and only that agency, is sent your details and calls you to talk it through</li>
            <li>Most arrange a visit, then give you a written quote</li>
            <li>You decide whether to go ahead. There’s nothing to pay us</li>
          </ol>
        </div>
        <div className="side-card dark">
          <p className="eyebrow">Only registered agencies</p>
          <p>We only match agencies registered with the Care Quality Commission, from {TOTAL_AGENCIES.toLocaleString('en-GB')} home care agencies on the register in England.</p>
          <Link href="/how-it-works">How matching works →</Link>
        </div>
      </aside>
    </div></section>
  )
}
