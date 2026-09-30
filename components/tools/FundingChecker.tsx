'use client'

import { useState } from 'react'
import { FIGURES, gbp } from '@/lib/figures'

type Savings = 'under' | 'between' | 'over' | 'unsure'
type Help = 'day' | 'night' | 'both' | 'neither'

const { upper, lower } = FIGURES.capitalLimits
const up = gbp(upper, 0)
const low = gbp(lower, 0)

const SAVINGS: { value: Savings; label: string }[] = [
  { value: 'under', label: `Under ${low}` },
  { value: 'between', label: `${low} to ${up}` },
  { value: 'over', label: `Over ${up}` },
  { value: 'unsure', label: 'Not sure' },
]

const HELP: { value: Help; label: string }[] = [
  { value: 'day', label: 'During the day' },
  { value: 'night', label: 'At night' },
  { value: 'both', label: 'Both day and night' },
  { value: 'neither', label: 'Neither of these' },
]

function Radio<T extends string>({ name, value, current, label, onPick }: { name: string; value: T; current: T | null; label: string; onPick: (v: T) => void }) {
  return (
    <label className="option">
      <input type="radio" name={name} value={value} checked={current === value} onChange={() => onPick(value)} />
      <span>{label}</span>
    </label>
  )
}

function Source({ label, url }: { label: string; url: string }) {
  return <p className="source">Source: <a href={url} target="_blank" rel="noopener noreferrer">{label}</a></p>
}

export default function FundingChecker() {
  const [savings, setSavings] = useState<Savings | null>(null)
  const [pension, setPension] = useState<'yes' | 'no' | null>(null)
  const [help, setHelp] = useState<Help | null>(null)

  return (
    <div className="tool">
      <p className="small muted">For England only. Your answers stay on this device and are not saved or sent anywhere.</p>

      <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        <legend className="legend" style={{ padding: 0, marginBottom: 12 }}>
          1. Roughly how much is in savings and investments, not counting the home they live in?
        </legend>
        <div className="options">
          {SAVINGS.map((o) => <Radio key={o.value} name="fc-savings" value={o.value} current={savings} label={o.label} onPick={setSavings} />)}
        </div>
      </fieldset>

      <div className="result" aria-live="polite">
        {!savings && <p className="muted">Choose an answer above to see what it may mean.</p>}
        {savings === 'over' && (
          <>
            <h3>You will usually pay the full cost yourself</h3>
            <p>With savings over {up}, you will usually pay the full cost of care yourself. This is called self-funding.</p>
            <p>The council must still assess care needs if you ask, and can help you plan and arrange care.</p>
          </>
        )}
        {savings === 'between' && (
          <>
            <h3>The council may help, and you contribute</h3>
            <p>With savings between {low} and {up}, the council may help with the cost and you pay a contribution.</p>
            <p>{FIGURES.capitalLimits.tariff}</p>
          </>
        )}
        {savings === 'under' && (
          <>
            <h3>The council may meet more of the cost</h3>
            <p>With savings under {low}, the council may meet more of the cost of care. What you pay depends on your income.</p>
          </>
        )}
        {savings === 'unsure' && (
          <>
            <h3>It depends on savings and income</h3>
            <p>Over {up} in savings, you will usually pay the full cost yourself. Between {low} and {up}, the council may help and you contribute. Under {low}, the council may meet more of the cost, depending on income.</p>
            <p>{FIGURES.capitalLimits.tariff}</p>
          </>
        )}
        {savings && (
          <>
            <p>{FIGURES.homeNotCounted.text}</p>
            <Source label={FIGURES.capitalLimits.label} url={FIGURES.capitalLimits.url} />
            <Source label={FIGURES.homeNotCounted.label} url={FIGURES.homeNotCounted.url} />
          </>
        )}
      </div>

      <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: 0, width: '100%' }} />

      <div style={{ display: 'grid', gap: 6 }}>
        <h3>Attendance Allowance (optional)</h3>
        <p className="small muted">A benefit that helps with the extra costs of needing care. Answer two questions to see if it may apply.</p>
      </div>

      <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12 }}>
        <legend className="legend" style={{ padding: 0, marginBottom: 12 }}>2. Are they State Pension age or over?</legend>
        <div className="options">
          <Radio name="fc-pension" value="yes" current={pension} label="Yes" onPick={setPension} />
          <Radio name="fc-pension" value="no" current={pension} label="No" onPick={setPension} />
        </div>
      </fieldset>

      {pension === 'yes' && (
        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid', gap: 12 }}>
          <legend className="legend" style={{ padding: 0, marginBottom: 12 }}>3. Do they need help or supervision during the day, at night, or both?</legend>
          <div className="options">
            {HELP.map((o) => <Radio key={o.value} name="fc-help" value={o.value} current={help} label={o.label} onPick={setHelp} />)}
          </div>
        </fieldset>
      )}

      <div className="result" aria-live="polite">
        {!pension && <p className="muted">Answer the questions above to see if Attendance Allowance may apply.</p>}
        {pension === 'no' && (
          <p>Attendance Allowance is for people of State Pension age or over. Under that age, they may be able to claim Personal Independence Payment instead.</p>
        )}
        {pension === 'yes' && !help && <p className="muted">Now choose when help is needed.</p>}
        {pension === 'yes' && help === 'neither' && (
          <p>Attendance Allowance is for people who need help or supervision because of an illness or disability. If that changes, it is worth checking again.</p>
        )}
        {pension === 'yes' && (help === 'day' || help === 'night') && (
          <>
            <p className="muted">Likely weekly rate</p>
            <p className="big">{gbp(FIGURES.attendanceAllowance.lower)}</p>
            <p>This is the lower rate, for help during the day or at night.</p>
          </>
        )}
        {pension === 'yes' && help === 'both' && (
          <>
            <p className="muted">Likely weekly rate</p>
            <p className="big">{gbp(FIGURES.attendanceAllowance.higher)}</p>
            <p>This is the higher rate, for help during the day and at night.</p>
          </>
        )}
        {pension === 'yes' && help && help !== 'neither' && (
          <>
            <p>Attendance Allowance is not means tested, so savings and income do not affect it. It is claimed from the Department for Work and Pensions (DWP).</p>
            <Source label={FIGURES.attendanceAllowance.label} url={FIGURES.attendanceAllowance.url} />
          </>
        )}
      </div>

      <p className="small muted">
        This is a guide, not financial advice. The council’s own assessment of needs and finances decides what help is available.
      </p>
    </div>
  )
}
