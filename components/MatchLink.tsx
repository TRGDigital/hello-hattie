'use client'
import Link from 'next/link'
import type { ReactNode } from 'react'

/** A "Get matched" link. When the page has the matching form in its hero (#match), it scrolls
 *  there and puts the cursor in the first box instead of leaving the page. */
export function MatchLink({ href = '/get-matched', className = 'btn', children }: { href?: string; className?: string; children: ReactNode }) {
  return (
    <Link className={className} href={href} onClick={(e) => {
      const form = document.getElementById('match')
      if (!form) return
      e.preventDefault()
      form.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
      window.setTimeout(() => {
        // If the smooth scroll didn't run (some browsers skip it), jump there instead.
        if (Math.abs(form.getBoundingClientRect().top) > 200) form.scrollIntoView({ block: 'start' })
        form.querySelector<HTMLInputElement>('input, button')?.focus({ preventScroll: true })
      }, 700)
    }}>{children}</Link>
  )
}
