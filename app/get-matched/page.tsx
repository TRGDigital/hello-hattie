import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MatchQuiz } from '@/components/MatchQuiz'
import { Trust } from '@/components/Blocks'

export const metadata: Metadata = { title: 'Get matched with local care agencies', robots: { index: false, follow: false } }

export default function GetMatched() {
  return (
    <section className="section"><div className="in" style={{ justifyItems: 'start' }}>
      <div style={{ display: 'grid', gap: 10, maxWidth: 640 }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>Find care at home near you</h1>
        <p className="muted">A few quick questions, then up to 3 CQC-registered agencies that cover your area will be in touch. Free, with no obligation.</p>
        <Trust />
      </div>
      <Suspense fallback={<div className="quiz">Loading…</div>}><MatchQuiz /></Suspense>
    </div></section>
  )
}
