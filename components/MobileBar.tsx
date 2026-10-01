'use client'
import { useEffect, useState } from 'react'
import { MatchLink } from '@/components/MatchLink'
import { BRAND } from '@/lib/site'

/** The phone's bottom "Get matched" bar. It hides while a form is on screen, so it never sits on top
 *  of the form's own Back and Next buttons. */
export function MobileBar() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll('form.quiz, .tool, #match'))
    if (!forms.length || !('IntersectionObserver' in window)) return
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)
      setHidden(seen.size > 0)
    })
    forms.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])
  return (
    <div className={`mbar${hidden ? ' mbar-hidden' : ''}`} aria-hidden={hidden || undefined}>
      <MatchLink>Get matched</MatchLink>
      {BRAND.phone && <span className="btn ghost">Call {BRAND.phone}</span>}
    </div>
  )
}
