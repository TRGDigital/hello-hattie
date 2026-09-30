'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FIGURES, gbp } from '@/lib/figures'

const HOURS = [0.5, 0.75, 1, 1.5, 2, 3, 4]
const hoursLabel = (h: number) => {
  if (h === 0.5) return '30 minutes'
  if (h === 0.75) return '45 minutes'
  if (h === 1) return '1 hour'
  return `${h} hours`
}

export default function CostCalculator() {
  const [rate, setRate] = useState(String(FIGURES.hcaMinimumHourly.value))
  const [hours, setHours] = useState(1)
  const [visits, setVisits] = useState(1)
  const [days, setDays] = useState(7)

  const r = Number(rate)
  const valid = rate.trim() !== '' && Number.isFinite(r) && r > 0
  const hoursPerWeek = hours * visits * days
  const weekly = valid ? r * hoursPerWeek : 0
  const fourWeekly = weekly * 4
  const yearly = weekly * 52

  return (
    <div className="tool calc">
      <div className="calc-fields">
      <div className="field span-2">
        <label htmlFor="cc-rate">Hourly rate (£)</label>
        <input
          id="cc-rate"
          type="number"
          inputMode="decimal"
          min={0}
          step={0.01}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          aria-describedby="cc-rate-hint"
        />
        <p id="cc-rate-hint" className="hint">
          {gbp(FIGURES.hcaMinimumHourly.value)} is the Homecare Association minimum price for 2025 to 2026. Private agency prices are usually higher, so enter a quote if you have one.
        </p>
      </div>

      <div className="field">
        <label htmlFor="cc-hours">Hours per visit</label>
        <select id="cc-hours" value={hours} onChange={(e) => setHours(Number(e.target.value))}>
          {HOURS.map((h) => <option key={h} value={h}>{hoursLabel(h)}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cc-visits">Visits per day</label>
        <select id="cc-visits" value={visits} onChange={(e) => setVisits(Number(e.target.value))}>
          {[1, 2, 3, 4].map((v) => <option key={v} value={v}>{v} {v === 1 ? 'visit' : 'visits'}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="cc-days">Days per week</label>
        <select id="cc-days" value={days} onChange={(e) => setDays(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d} {d === 1 ? 'day' : 'days'}</option>)}
        </select>
      </div>

      </div>

      <div className="calc-result" aria-live="polite">
        {valid ? (
          <>
            <p className="label">Estimated weekly cost</p>
            <p className="big">{gbp(weekly)}</p>
            <dl className="calc-split">
              <div><dt>Every four weeks</dt><dd>{gbp(fourWeekly)}</dd></div>
              <div><dt>Over a year</dt><dd>{gbp(yearly)}</dd></div>
              <div><dt>Hours each week</dt><dd>{hoursPerWeek.toLocaleString('en-GB', { maximumFractionDigits: 2 })}</dd></div>
            </dl>
          </>
        ) : (
          <p className="error">Enter an hourly rate above £0 to see an estimate.</p>
        )}
      </div>

      <p className="small muted">
        Short visits often cost more per hour. This is an estimate. Agencies will give you a quote after an assessment.
      </p>
      <p className="small muted">
        Live-in care is usually priced by the week, so this calculator does not cover it. Read about <Link href="/costs/live-in-care-cost">live-in care costs</Link>.
      </p>
      <p className="source">
        Source: <a href={FIGURES.hcaMinimumHourly.url} target="_blank" rel="noopener noreferrer">{FIGURES.hcaMinimumHourly.label}</a>
      </p>
    </div>
  )
}
