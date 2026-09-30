'use client'
import { useEffect, useMemo, useRef, useState } from 'react'

// Service area demo. Enter a postcode, pick a distance, and see how many CQC-registered home care
// agencies are based within it, on a map of nearby towns. Agencies are counted, never drawn or named.
// Only the postcode district (e.g. WR14) is looked up, via postcodes.io.
type Pt = [number, number, number] // lat*1000, lng*1000, rating (4 outstanding, 3 good, 2 RI, 1 inadequate, 0 not rated)
type Town = [string, number, number, number] // name, lat*1000, lng*1000, providers listed (used to rank labels)
const RADII = [5, 10, 15, 20]
const VIEW = 25 // miles from the centre to the map edge, fixed so the circle visibly grows
const S = 560 // map size in SVG units
const PC = /^([A-Z]{1,2}[0-9][A-Z0-9]?) ?[0-9][A-Z]{2}$/
const OUT = /^[A-Z]{1,2}[0-9][A-Z0-9]?$/

const miles = (aLat: number, aLng: number, bLat: number, bLng: number) => {
  const r = Math.PI / 180, dLat = (bLat - aLat) * r, dLng = (bLng - aLng) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(dLng / 2) ** 2
  return 3958.8 * 2 * Math.asin(Math.sqrt(h))
}

const cache: { pts?: Pt[]; towns?: Town[] } = {}
async function loadData() {
  if (!cache.pts || !cache.towns) {
    const [p, t] = await Promise.all([fetch('/data/agency-points.json').then((r) => r.json()), fetch('/data/towns.json').then((r) => r.json())])
    cache.pts = p; cache.towns = t
  }
  return cache as { pts: Pt[]; towns: Town[] }
}

export function RadiusDemo() {
  const [input, setInput] = useState('WR14 1AB')
  const [radius, setRadius] = useState(10)
  const [centre, setCentre] = useState<{ district: string; lat: number; lng: number } | null>(null)
  const [data, setData] = useState<{ pts: Pt[]; towns: Town[] } | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const panel = useRef<HTMLDivElement>(null)

  // Show the example area as soon as the section comes into view, so it never sits empty,
  // and only then download the map data.
  useEffect(() => {
    const el = panel.current
    if (!el || !('IntersectionObserver' in window)) { look(); return }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); look() } }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function look(e?: React.FormEvent) {
    e?.preventDefault()
    const v = input.trim().toUpperCase().replace(/\s+/g, ' ')
    const district = PC.exec(v)?.[1] ?? (OUT.test(v) ? v : '')
    if (!district) { setErr('Enter a postcode, for example WR14 1AB.'); return }
    setErr(''); setBusy(true)
    try {
      const [res, d] = await Promise.all([fetch(`https://api.postcodes.io/outcodes/${encodeURIComponent(district)}`), loadData()])
      const body = await res.json()
      if (!res.ok || !body?.result) throw new Error('We couldn’t find that postcode. Please check it and try again.')
      setCentre({ district, lat: body.result.latitude, lng: body.result.longitude })
      setData(d)
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Something went wrong. Please try again.')
    }
    setBusy(false)
  }

  const map = useMemo(() => {
    if (!centre || !data) return null
    const kx = Math.cos((centre.lat * Math.PI) / 180) * 69.17, ky = 69.05
    const scale = S / 2 / VIEW
    const toXY = (lat: number, lng: number) => ({ x: (lng - centre.lng) * kx * scale, y: -(lat - centre.lat) * ky * scale })

    let count = 0, goodPlus = 0
    for (const [la, ln, rt] of data.pts) {
      if (miles(centre.lat, centre.lng, la / 1000, ln / 1000) <= radius) { count++; if (rt >= 3) goodPlus++ }
    }

    // Label the biggest towns in view first, skipping any that would overlap one already placed
    // or the postcode marker. Every town in view gets a small dot either way.
    const ring = radius * scale
    const boxes: { x0: number; y0: number; x1: number; y1: number }[] = [
      { x0: -34, y0: -30, x1: 170, y1: 18 }, // the postcode pin and its label
      { x0: -44, y0: -ring - 26, x1: 44, y1: -ring + 4 }, // the "10 miles" label on the ring
    ]
    const dots: { x: number; y: number }[] = []
    const labels: { x: number; y: number; name: string; big: boolean; end: boolean }[] = []
    for (const [name, la, ln, n] of data.towns) {
      const { x, y } = toXY(la / 1000, ln / 1000)
      if (Math.abs(x) > S / 2 - 8 || Math.abs(y) > S / 2 - 8) continue
      if (Math.hypot(x, y) < 10) continue
      dots.push({ x, y })
      if (labels.length >= 16) continue
      const big = n >= 60
      const w = name.length * (big ? 7.6 : 6.8) + 10, h = big ? 18 : 16
      const flip = x + w > S / 2 - 6 // near the right edge, put the label on the left of its dot
      const b = flip ? { x0: x - w, y0: y - h / 2, x1: x - 4, y1: y + h / 2 } : { x0: x + 4, y0: y - h / 2, x1: x + w, y1: y + h / 2 }
      if (b.y0 < -S / 2 + 4 || b.y1 > S / 2 - 30) continue
      if (boxes.some((o) => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue
      boxes.push(b)
      labels.push({ x: flip ? x - 7 : x + 7, y, name, big, end: flip })
    }
    // Name the place under the pin: the nearest town within 4 miles, if any.
    let home = ''
    let best = 4
    for (const [name, la, ln] of data.towns) {
      const d = miles(centre.lat, centre.lng, la / 1000, ln / 1000)
      if (d < best) { best = d; home = name }
    }
    return { scale, count, goodPlus, dots, labels, home }
  }, [centre, data, radius])

  const r = map ? radius * map.scale : 0
  return (
    <div className="radius-panel" ref={panel}>
      <div className="radius-copy">
        <h2>How service areas work</h2>
        <p>Every home care agency covers an area around its office, usually set by how far its carers can travel between visits. That’s often a few miles in a town and further in the countryside.</p>
        <p>That’s why the postcode matters. We only match you with agencies whose area includes the address where care is needed, so carers are local, arrive on time and spend their time with you rather than on the road.</p>

        <form className="pc" onSubmit={look}>
          <label htmlFor="rd-pc">Try it with any postcode</label>
          <input id="rd-pc" type="text" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="postal-code" />
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Looking…' : 'Show my area'}</button>
          {err && <p className="error" role="alert">{err}</p>}
        </form>

        <fieldset className="radius-pick">
          <legend>How far can carers travel?</legend>
          {RADII.map((m) => (
            <button key={m} type="button" className={`chip-btn${m === radius ? ' on' : ''}`} aria-pressed={m === radius} onClick={() => setRadius(m)}>{m} miles</button>
          ))}
        </fieldset>

        <div className="radius-result" aria-live="polite">
          {map ? <>
            <p><span className="big">{map.count.toLocaleString('en-GB')}</span> CQC-registered home care agencies are based within {radius} miles of {centre!.district}, and {map.goodPlus.toLocaleString('en-GB')} of them are rated Good or Outstanding.</p>
            <a className="btn" href={`/get-matched?postcode=${encodeURIComponent(input.trim().toUpperCase())}`}>Get matched with up to 3</a>
          </> : <p className="muted">Enter a postcode to see your area and how many registered agencies are nearby.</p>}
        </div>
      </div>

      <figure className="radius-figure">
        <svg viewBox={`${-S / 2} ${-S / 2} ${S} ${S}`} role="img" className="radius-map"
          aria-label={map ? `Map of the area within ${radius} miles of ${centre?.district}, with ${map.count} agencies based inside it` : 'Map will appear here'}>
          <rect x={-S / 2} y={-S / 2} width={S} height={S} rx="20" className="rm-bg" />
          {[-2, -1, 1, 2].map((i) => <g key={i} className="rm-grid"><line x1={i * S / 5} x2={i * S / 5} y1={-S / 2} y2={S / 2} /><line y1={i * S / 5} y2={i * S / 5} x1={-S / 2} x2={S / 2} /></g>)}
          {map && <>
            <circle r={r} className="rm-area" />
            {map.dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2.4" className="rm-town" />)}
            {map.labels.map((l) => (
              <text key={l.name + l.x} x={l.x} y={l.y + 4} textAnchor={l.end ? 'end' : 'start'} className={l.big ? 'rm-label big' : 'rm-label'}>{l.name}</text>
            ))}
            <text x={0} y={-r - 8} textAnchor="middle" className="rm-ring">{radius} miles</text>
            <circle r="9" className="rm-home" />
            <text x={14} y={5} className="rm-pin">{centre!.district}{map.home ? `, ${map.home}` : ''}</text>
            <g className="rm-scale" transform={`translate(${-S / 2 + 20} ${S / 2 - 18})`}>
              <line x1="0" x2={5 * map.scale} y1="0" y2="0" /><line x1="0" x2="0" y1="-5" y2="5" /><line x1={5 * map.scale} x2={5 * map.scale} y1="-5" y2="5" />
              <text x={5 * map.scale + 8} y="4">5 miles</text>
            </g>
          </>}
          {!map && <text textAnchor="middle" y="5" className="rm-hint">{busy ? 'Loading your area…' : 'Enter a postcode to see your area'}</text>}
        </svg>
        <figcaption className="source">Towns placed from CareAssura’s listings. Agency locations from the CQC register. Distances are measured from the centre of the postcode district. An agency based nearby may not cover your street, so we always confirm coverage before matching.</figcaption>
      </figure>
    </div>
  )
}
