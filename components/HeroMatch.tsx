import { Suspense } from 'react'
import { MatchQuiz } from '@/components/MatchQuiz'

/** The matching form, sitting in the right-hand column of a page hero. */
export function HeroMatch({ title, service, place }: { title: string; service?: string; place?: string }) {
  return (
    <div className="hero-match" id="match">
      <p className="hero-match-title">{title}</p>
      <Suspense fallback={<div className="quiz" aria-busy="true" />}>
        <MatchQuiz service={service} place={place} embedded />
      </Suspense>
    </div>
  )
}
