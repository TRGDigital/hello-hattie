'use client'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'

const PC = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/

/** The postcode box that starts the matching quiz. It carries the service in, if the page has one. */
export function PostcodeStart({ label = 'Where is care needed?', service }: { label?: string; service?: string }) {
  const id = useId()
  const router = useRouter()
  const [pc, setPc] = useState('')
  const [err, setErr] = useState('')
  return (
    <form className="pc" onSubmit={(e) => {
      e.preventDefault()
      const v = pc.trim().toUpperCase().replace(/\s+/g, ' ')
      if (!PC.test(v)) { setErr('Please enter a full UK postcode, for example WR14 1AB.'); return }
      const q = new URLSearchParams({ postcode: v, ...(service ? { service } : {}) })
      router.push(`/get-matched?${q}`)
    }}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" name="postcode" autoComplete="postal-code" placeholder="Your postcode, e.g. WR14 1AB"
        value={pc} onChange={(e) => { setPc(e.target.value); setErr('') }} aria-describedby={err ? `${id}-err` : undefined} />
      <button className="btn" type="submit">Get matched</button>
      {err && <p className="error" id={`${id}-err`} role="alert">{err}</p>}
    </form>
  )
}
