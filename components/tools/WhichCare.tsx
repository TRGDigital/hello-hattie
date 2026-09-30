'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

type Key = 'help' | 'night' | 'alone' | 'carerBreak' | 'room'
type Question = { key: Key; q: string; hint?: string; options: { value: string; label: string }[] }

const QUESTIONS: Question[] = [
  {
    key: 'help',
    q: 'How much help is needed?',
    options: [
      { value: 'little', label: 'A little help a few times a week' },
      { value: 'daily', label: 'Help every day' },
      { value: 'dayEvening', label: 'Help through the day and evening' },
      { value: 'allTime', label: 'Someone there day and night' },
    ],
  },
  {
    key: 'night',
    q: 'Is help needed at night?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'sometimes', label: 'Sometimes' },
      { value: 'most', label: 'Most nights' },
    ],
  },
  {
    key: 'alone',
    q: 'Does the person live alone?',
    options: [
      { value: 'yes', label: 'Yes, they live alone' },
      { value: 'no', label: 'No, they live with someone' },
    ],
  },
  {
    key: 'carerBreak',
    q: 'Is a family member providing care now who needs a break?',
    options: [
      { value: 'yes', label: 'Yes, they need a break' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    key: 'room',
    q: 'Is there a spare bedroom a carer could use?',
    hint: 'A live-in carer needs their own room to sleep and rest.',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'unsure', label: 'Not sure' },
    ],
  },
]

type Rec = { name: string; why: string; href: string; service: 'visiting' | 'overnight' | 'live_in' }

function recommend(a: Partial<Record<Key, string>>): Rec {
  const room = a.room === 'yes'
  if (a.help === 'allTime' || (a.night === 'most' && a.help === 'dayEvening')) {
    if (room) {
      return {
        name: 'Live-in care',
        why: 'You said someone needs to be there most of the time, and there is a spare room. A live-in carer stays in the home, so help is close by through the day and at night.',
        href: '/live-in-care',
        service: 'live_in',
      }
    }
    return {
      name: 'Overnight care',
      why: 'You said help is needed around the clock, but there may not be a spare room for a live-in carer. Overnight care, alongside visits in the day, can cover the nights without a carer moving in.',
      href: '/overnight-care',
      service: 'overnight',
    }
  }
  if (a.night === 'most' || a.night === 'sometimes') {
    return {
      name: 'Overnight care',
      why: 'You said help is needed at night. An overnight carer can stay awake or sleep in the home, so someone is there if they are needed.',
      href: '/overnight-care',
      service: 'overnight',
    }
  }
  if (a.carerBreak === 'yes') {
    return {
      name: 'Respite care at home',
      why: 'You said a family member is caring now and needs a break. Respite care means a carer steps in at home for a while, so your loved one keeps their routine while the family carer rests.',
      href: '/respite-care-at-home',
      service: a.help === 'dayEvening' && room ? 'live_in' : 'visiting',
    }
  }
  if (a.help === 'little') {
    return {
      name: 'Companionship or hourly care',
      why: 'You said a little help a few times a week is enough. Short, regular visits can help with company, shopping, errands and light jobs around the home.',
      href: '/companionship-care',
      service: 'visiting',
    }
  }
  return {
    name: 'Visiting home care',
    why: a.help === 'dayEvening'
      ? 'You said help is needed through the day and evening, but not at night. Several visits a day can cover mornings, lunch, tea and bedtime.'
      : 'You said help is needed every day. Visiting carers can call once or more each day at set times to help with everyday tasks.',
    href: '/home-care',
    service: 'visiting',
  }
}

export default function WhichCare() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Record<Key, string>>>({})
  const headingRef = useRef<HTMLHeadingElement>(null)

  const done = step >= QUESTIONS.length
  const current = QUESTIONS[step]
  const pct = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100)

  const go = (n: number) => {
    setStep(n)
    requestAnimationFrame(() => headingRef.current?.focus())
  }
  const restart = () => { setAnswers({}); go(0) }

  const rec = done ? recommend(answers) : null

  return (
    <div className="quiz">
      <div className="progress" role="progressbar" aria-label="Progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <i style={{ width: `${pct}%` }} />
      </div>

      <div aria-live="polite" style={{ display: 'grid', gap: 20 }}>
        {!done && current && (
          <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 14 }}>
            <legend className="legend" style={{ padding: 0, marginBottom: 12 }}>
              <span className="small muted" style={{ display: 'block', fontWeight: 400 }}>Question {step + 1} of {QUESTIONS.length}</span>
              <h2 ref={headingRef} tabIndex={-1} style={{ fontSize: '1.5rem' }}>{current.q}</h2>
            </legend>
            {current.hint && <p className="small muted">{current.hint}</p>}
            <div className="options">
              {current.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className="option"
                  aria-pressed={answers[current.key] === o.value}
                  onClick={() => setAnswers((a) => ({ ...a, [current.key]: o.value }))}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {rec && (
          <div className="result">
            <p className="muted">A good place to start</p>
            <h2 ref={headingRef} tabIndex={-1} className="big">{rec.name}</h2>
            <p>{rec.why}</p>
            <p className="small muted">This is a guide based on your answers, not an assessment. An agency will talk it through with you before care starts.</p>
            <p><Link href={rec.href}>Read more about {rec.name.toLowerCase()}</Link></p>
            <div className="quiz-nav">
              <Link className="btn" href={`/get-matched?service=${rec.service}`}>Find an agency near you</Link>
              <button type="button" className="btn ghost" onClick={restart}>Start again</button>
            </div>
          </div>
        )}
      </div>

      {!done && (
        <div className="quiz-nav">
          <button type="button" className="btn ghost" onClick={() => go(step - 1)} disabled={step === 0}>Back</button>
          <button type="button" className="btn" onClick={() => go(step + 1)} disabled={!current || !answers[current.key]}>
            {step === QUESTIONS.length - 1 ? 'See the result' : 'Next'}
          </button>
        </div>
      )}
    </div>
  )
}
