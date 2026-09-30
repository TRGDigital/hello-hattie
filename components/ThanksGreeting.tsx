'use client'
import { useEffect, useState } from 'react'

type Done = { first?: string; district?: string; verified?: boolean; best?: string }
const BEST: Record<string, string> = { morning: 'in the morning', afternoon: 'in the afternoon', evening: 'in the evening' }

/** The personal parts of the thank-you page, from what the form left in this tab. */
export function ThanksGreeting() {
  const [d, setD] = useState<Done>({})
  useEffect(() => { try { setD(JSON.parse(sessionStorage.getItem('hh_done') || '{}')) } catch {} }, [])
  return (
    <>
      <h1>Thank you{d.first ? `, ${d.first}` : ''}. Your details are on their way.</h1>
      <p className="lede">We’ve matched you with a CQC-registered home care agency that covers {d.district ? <b>{d.district}</b> : 'your area'}. They’ll be in touch by phone{d.best && BEST[d.best] ? `, ${BEST[d.best]} as you asked` : ''}, to talk through the care and answer your questions.</p>
      <ul className="done-ticks">
        {d.verified && <li>Mobile number confirmed</li>}
        <li>Sent to one agency only, never a list</li>
        <li>Free, with no obligation to go ahead</li>
      </ul>
    </>
  )
}
