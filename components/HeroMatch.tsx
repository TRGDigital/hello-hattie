import { MatchQuiz } from '@/components/MatchQuiz'

/** The matching form, sitting in the right-hand column of a page hero. */
export function HeroMatch({ title, service, place, postcodeLast = false }: { title: string; service?: string; place?: string; postcodeLast?: boolean }) {
  return (
    <div className="hero-match" id="match">
      <p className="hero-match-title">{title}</p>
      <MatchQuiz service={service} place={place} embedded postcodeLast={postcodeLast} />
    </div>
  )
}
