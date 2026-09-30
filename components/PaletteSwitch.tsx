'use client'
import { useEffect, useState } from 'react'

/** Preview only: flip between the current and the warm palette to compare. Remembered per browser. */
export function PaletteSwitch() {
  const [p, setP] = useState<'current' | 'warm'>('current')
  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem('hh-palette') } catch {}
    if (saved === 'warm') setP('warm')
  }, [])
  useEffect(() => {
    if (p === 'warm') document.documentElement.setAttribute('data-palette', 'warm')
    else document.documentElement.removeAttribute('data-palette')
    try { localStorage.setItem('hh-palette', p) } catch {}
  }, [p])
  return (
    <div className="palette-switch" role="group" aria-label="Compare colours">
      <span>Compare colours</span>
      <button type="button" aria-pressed={p === 'current'} onClick={() => setP('current')}>Current</button>
      <button type="button" aria-pressed={p === 'warm'} onClick={() => setP('warm')}>Warm</button>
    </div>
  )
}
