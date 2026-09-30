'use client'
import { useMemo, useState } from 'react'

// Service area demo. Enter a postcode, pick a distance, and see how many CQC-registered home care
// agencies are based within it. Only the postcode district (e.g. WR14) is looked up, via postcodes.io.
// Agency locations are anonymous, rounded coordinates: no names, nothing stored.
type Pt = [number, number, number] // lat*1000, lng*1000, rating (4 outstanding, 3 good, 2 RI, 1 inadequate, 0 not rated)
const RADII = [5, 10, 15, 20]
const PC = /^([A-Z]{1,2}[0-9][A-Z0-9]?) ?[0-9][A-Z]{2}$/
const OUT = /^[A-Z]{1,2}[0-9][A-Z0-9]?$/

const miles = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const r = Math.PI / 180, dLat = (bLat - aLat) * r, dLng = (bLng - aLng) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(dLng / 2) ** 2
  return 3958.8 * 2 * Math.asin(Math.sqrt(h))
}

let pointsCache: Pt[] | null = null
async function loadPoints(): Promise<Pt[]> {
  if (pointsCache) return pointsCache
  const r = await fetch('/data/agency-points.json')
  pointsCache = (await r.json()) as Pt[]
  return pointsCache
}

export function RadiusDemo() {
  const [input, setInput] = useState('WR14 1AB')
  const [radius, setRadius] = useState(10)
  const [centre, setCentre] = useState<{ district: string; lat: number; lng: number } | null>(null)
  const [pts, setPts] = useState<Pt[] | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function look(e?: React.FormEvent) {
    e?.preventDefault()
    const v = input.trim().toUpperCase().replace(/\s+/g, ' ')
    const district = PC.exec(v)?.[1] ?? (OUT.test(v) ? v : '')
    if (!district) { setErr('Enter a postcode, for example WR14 1AB.'); return }
    setErr(''); setBusy(true)
    try {
      const [res, p] = await Promise.all([fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(district)}`), loadPoints()])
      const body = await res.json()
      if (!res.ok || !body?.result) throw new Error('We couldn’t find that postcode. Please check it and try again.')
      setCentre({ district, lat: body.result.latitude, lng: body.result.longitude })
      setPts(p)
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Something went wrong. Please try again.')
    }
    setBusy(false)
  }

  const near = useMemo(() => {
    if (!centre || !pts) return null
    const view = 20 * 1.15 // the picture always shows 23 miles either side, so the circle visibly grows
    const within: { x: number; y: number; d: number; r: number }[] = []
    const kx = Math.cos((centre.lat * Math.PI) / 180) * 69.17, ky = 69.05
    for (const [la, ln, rt] of pts) {
      const lat = la / 1000, lng = ln / 1000
      const dx = (lng - centre.lng) * kx, dy = (lat - centre.lat) * ky
      if (Math.abs(dx) > view || Math.abs(dy) > view) continue
      within.push({ x: dx, y: dy, d: miles(centre.lat, centre.lng, lat, lng), r: rt })
    }
    const inside = within.filter((p) => p.d <= radius)
    return { view, within, count: inside.length, goodPlus: inside.filter((p) => p.r >= 3).length }
  }, [centre, pts, radius])

  const S = 320, scale = near ? S / 2 / near.view : 1
  return (
    <div className="radius">
      <form className="pc" onSubmit={look}>
        <label htmlFor="rd-pc">Try it with any postcode</label>
        <input id="rd-pc" type="text" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="postal-code" />
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Looking…' : 'Show agencies near here'}</button>
        {err && <p className="error" role="alert">{err}</p>}
      </form>

      <fieldset className="radius-pick">
        <legend>How far can carers travel?</legend>
        {RADII.map((r) => (
          <button key={r} type="button" className={`chip-btn${r === radius ? ' on' : ''}`} aria-pressed={r === radius} onClick={() => setRadius(r)}>{r} miles</button>
        ))}
      </fieldset>

      <div className="radius-out">
        <svg viewBox={`${-S / 2} ${-S / 2} ${S} ${S}`} role="img" aria-label={near ? `${near.count} agencies within ${radius} miles of ${centre?.district}` : 'Map will appear here'} className="radius-map">
          <rect x={-S / 2} y={-S / 2} width={S} height={S} rx="16" className="rm-bg" />
          {near && <>
            <circle r={radius * scale} className="rm-area" />
            {near.within.map((p, i) => <circle key={i} cx={p.x * scale} cy={-p.y * scale} r={p.d <= radius ? 2.6 : 1.8} className={p.d <= radius ? 'rm-in' : 'rm-out'} />)}
            <circle r="6" className="rm-home" />
          </>}
          {!near && <text textAnchor="middle" y="5" className="rm-hint">Enter a postcode to see the map</text>}
        </svg>
        <div className="result" aria-live="polite">
          {near ? <>
            <span className="big">{near.count.toLocaleString('en-GB')}</span>
            <p>CQC-registered home care agencies are based within {radius} miles of {centre!.district}.</p>
            <p className="muted">{near.goodPlus.toLocaleString('en-GB')} of them are rated Good or Outstanding. Each dot is an agency; we never show names here.</p>
            <a className="btn" href={`/get-matched?postcode=${encodeURIComponent(input.trim().toUpperCase())}`}>Get matched with up to 3</a>
          </> : <p>Enter a postcode and we’ll show how many registered agencies are nearby.</p>}
        </div>
      </div>
      <p className="source">Agency locations from the CQC register via CareAssura. Distances are measured from the centre of the postcode district. An agency based nearby may not cover your street, so we always confirm coverage before matching.</p>
    </div>
  )
}
