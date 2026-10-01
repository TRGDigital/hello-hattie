'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { fullNameProblem, nameProblem, NAME_MESSAGE } from '@/lib/name-check'
import { attribution, CONSENT_TEXT, CONSENT_VERSION, postJson, submitLead } from '@/lib/leads'

// The matching quiz. It asks about arrangements only (type and amount of care, kind of help,
// timing, funding), never about conditions or health. The lead is saved on the last step.
type Answers = {
  postcode: string
  care_for: string
  service: string
  hours: string
  help: string[]
  urgency: string
  funding: string
  first: string
  last: string
  phone: string
  email: string
  best_time: string
  contact_consent: boolean
  marketing_consent: boolean
  address: string
  uprn: string
}
type Addr = { line: string; town: string; postcode: string; uprn: string | null }
type PhoneState = { status: 'valid' | 'invalid' | 'unchecked'; type?: string; needsCode?: boolean } | null
type EmailState = { status: string; suggestion?: string } | null

const PC = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/
const SERVICES = ['visiting', 'live_in', 'overnight', 'not_sure']
const HOURS: [string, string, number | null][] = [
  ['under7', 'Up to 7 hours a week, for example an hour a day', 5],
  ['7to14', '7 to 14 hours a week', 10],
  ['14to28', '14 to 28 hours a week', 21],
  ['over28', 'More than 28 hours a week', 35],
  ['not_sure', 'Not sure yet', null],
]

function Choice({ name, value, current, onPick, children }: { name: string; value: string; current: string; onPick: (v: string) => void; children: React.ReactNode }) {
  return (
    <label className="option">
      <input type="radio" name={name} value={value} checked={current === value} onChange={() => onPick(value)} />
      <span>{children}</span>
    </label>
  )
}

/** Used on /get-matched (reads ?postcode= and ?service=) and embedded in page heroes, where
 *  `service` and `place` come from the page instead. */
/** /get-matched: takes the postcode and service from the address (?postcode=&service=). */
export function MatchQuizFromUrl() {
  const params = useSearchParams()
  return <MatchQuiz service={params.get('service') ?? undefined} postcode={params.get('postcode') ?? undefined} />
}

/** postcodeLast (PPC landing pages): the ad already targets an area, so the form opens on the first
 *  care question, skips the care-type question when the page sets it, and asks for the postcode on
 *  the address step at the end, with the contact details. */
export function MatchQuiz({ service, place, postcode, embedded = false, postcodeLast = false }: { service?: string; place?: string; postcode?: string; embedded?: boolean; postcodeLast?: boolean }) {
  const router = useRouter()
  const idem = useRef(typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()))
  const wanted = service ?? ''
  const startService = SERVICES.includes(wanted) ? wanted : ''
  const [a, setA] = useState<Answers>({
    postcode: embedded ? '' : (postcode || '').toUpperCase(), care_for: '', service: startService, hours: '', help: [],
    urgency: '', funding: '', first: '', last: '', phone: '', email: '', best_time: '', contact_consent: false, marketing_consent: false, address: '', uprn: '',
  })
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((x) => ({ ...x, [k]: v }))

  // Live-in and overnight care are not booked by the hour, so the hours question is skipped for them.
  const steps = useMemo(() => {
    let s = ['postcode', 'care_for', 'service', 'hours', 'help', 'urgency', 'funding', 'address', 'contact']
    if (postcodeLast) s = s.filter((x) => x !== 'postcode' && !(x === 'service' && startService))
    return a.service === 'live_in' || a.service === 'overnight' ? s.filter((x) => x !== 'hours') : s
  }, [a.service, postcodeLast, startService])
  const [i, setI] = useState(!postcodeLast && PC.test(a.postcode.trim()) ? 1 : 0)
  const step = steps[Math.min(i, steps.length - 1)]
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  // Address picker for the postcode, fetched when the address step opens.
  const [addrs, setAddrs] = useState<{ pc: string; status: string; list: Addr[] } | null>(null)
  const [manual, setManual] = useState(false)
  const [manualLine, setManualLine] = useState('')
  const [manualTown, setManualTown] = useState('')
  // Instant checks and the text code for mobiles.
  const [phoneState, setPhoneState] = useState<PhoneState>(null)
  const [emailState, setEmailState] = useState<EmailState>(null)
  const [codeStage, setCodeStage] = useState(false)
  const [code, setCode] = useState('')
  const [phoneToken, setPhoneToken] = useState('')
  const [challenge, setChallenge] = useState('')
  const checked = useRef<{ phone?: string; email?: string }>({})
  // Offensive or made-up names are cleared as soon as the family leaves the box, with a note why.
  const [nameErr, setNameErr] = useState<{ first?: string; last?: string }>({})
  function checkName(part: 'first' | 'last') {
    const v = a[part]
    if (!v.trim()) return
    const pr = nameProblem(v)
    if (pr === 'offensive' || pr === 'fake') set(part, '')
    setNameErr((x) => ({ ...x, [part]: pr ? NAME_MESSAGE[pr](part === 'first' ? 'first name' : 'last name') : '' }))
  }

  useEffect(() => {
    if (step !== 'address') return
    const pc = a.postcode.trim().toUpperCase().replace(/\s+/g, ' ')
    if (!PC.test(pc)) return
    if (addrs?.pc === pc) return
    setAddrs({ pc, status: 'loading', list: [] })
    fetch(`/api/address?postcode=${encodeURIComponent(pc)}`).then((r) => r.json()).then((b) => {
      setAddrs({ pc, status: b.status ?? 'unavailable', list: b.addresses ?? [] })
      if (b.status !== 'ok') setManual(true)
    }).catch(() => { setAddrs({ pc, status: 'unavailable', list: [] }); setManual(true) })
  }, [step, a.postcode, addrs?.pc])

  async function runChecks(which: 'phone' | 'email' | 'both') {
    const body: Record<string, string> = {}
    if (which !== 'email' && a.phone.trim() && checked.current.phone !== a.phone) body.phone = a.phone
    if (which !== 'phone' && a.email.trim() && checked.current.email !== a.email) body.email = a.email
    if (!Object.keys(body).length) return { phone: phoneState, email: emailState }
    try {
      const r = await postJson<{ phone: PhoneState; email: EmailState }>('/api/check', body)
      if (body.phone) { checked.current.phone = body.phone; setPhoneState(r.phone); setPhoneToken('') }
      if (body.email) { checked.current.email = body.email; setEmailState(r.email) }
      return { phone: body.phone ? r.phone : phoneState, email: body.email ? r.email : emailState }
    } catch { return { phone: phoneState, email: emailState } }
  }

  const valid = (): string => {
    if (step === 'postcode' && !PC.test(a.postcode.trim().toUpperCase().replace(/\s+/g, ' '))) return 'Please enter a full UK postcode, for example WR14 1AB.'
    if (step === 'care_for' && !a.care_for) return 'Please choose who the care is for.'
    if (step === 'service' && !a.service) return 'Please choose the type of care, or Not sure yet.'
    if (step === 'hours' && !a.hours) return 'Please choose roughly how much help is needed.'
    if (step === 'urgency' && !a.urgency) return 'Please choose when care is needed.'
    if (step === 'funding' && !a.funding) return 'Please choose how care is likely to be paid for.'
    if (step === 'address') {
      if (!PC.test(a.postcode.trim().toUpperCase().replace(/\s+/g, ' '))) return 'Please enter the full postcode where care is needed, for example WR14 1AB.'
      if (!manual && !a.address) return 'Please choose the address where care is needed, or enter it yourself.'
      if (manual && (manualLine.trim().length < 3 || manualTown.trim().length < 2)) return 'Please enter the first line of the address and the town.'
    }
    if (step === 'contact') {
      const np = nameProblem(a.first); if (np) return NAME_MESSAGE[np]('first name')
      const lp = nameProblem(a.last); if (lp) return NAME_MESSAGE[lp]('last name')
      const fp = fullNameProblem(a.first, a.last); if (fp) return NAME_MESSAGE[fp]('name')
      if (!/^(\+44|0)[0-9]{9,10}$/.test(a.phone.replace(/[^0-9+]/g, ''))) return 'Please enter a UK phone number so the agency can call you.'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email.trim())) return 'Please enter a valid email address.'
      if (!a.contact_consent) return 'Please tick the box to agree to local agencies contacting you.'
    }
    return ''
  }

  async function next() {
    const e = valid()
    if (e) { setErr(e); return }
    setErr('')
    if (step === 'address' && manual) { set('address', `${manualLine.trim()}, ${manualTown.trim()}, ${a.postcode.trim().toUpperCase()}`); set('uprn', '') }
    if (step !== 'contact') { setI((n) => n + 1); return }
    setBusy(true)
    const chk = await runChecks('both')
    if (chk.phone?.status === 'invalid') { setErr('Please check the phone number. It doesn’t look like a working UK number.'); setBusy(false); return }
    if (chk.email?.status === 'undeliverable') { setErr('Please check the email address. It doesn’t look like it can receive email.'); setBusy(false); return }
    if (chk.phone?.needsCode && !phoneToken) {
      if (!codeStage) {
        const sent = await postJson<{ ok: boolean; challenge?: string; error?: string }>('/api/otp', { action: 'send', phone: a.phone }).catch(() => ({ ok: false, error: '' } as { ok: boolean; challenge?: string; error?: string }))
        if (sent.ok) { setChallenge(sent.challenge ?? ''); setCodeStage(true); setBusy(false); return }
        // A text that can't be sent never loses the enquiry: it goes through, marked unverified.
      } else {
        const v = await postJson<{ ok: boolean; token?: string; error?: string }>('/api/otp', { action: 'check', phone: a.phone, code, challenge }).catch(() => ({ ok: false, error: 'Please try again.' } as { ok: boolean; token?: string; error?: string }))
        if (!v.ok || !v.token) { setErr(v.error || 'That code isn’t right.'); setBusy(false); return }
        setPhoneToken(v.token)
        return submit(v.token)
      }
    }
    return submit(phoneToken)
  }

  async function submit(token: string) {
    setBusy(true)
    try {
      const hours = HOURS.find((h) => h[0] === a.hours)?.[2] ?? null
      const saved = await submitLead({
        name: `${a.first.trim()} ${a.last.trim()}`, first_name: a.first.trim(), last_name: a.last.trim(), email: a.email, phone: a.phone, postcode: a.postcode, care_for: a.care_for, service: a.service,
        hours_per_week: hours, funding: a.funding, urgency: a.urgency, contact_consent: a.contact_consent,
        marketing_consent: a.marketing_consent, consent_version: CONSENT_VERSION, idempotency_key: idem.current,
        user_agent: navigator.userAgent, ...attribution(),
        answers: { help: a.help, hours_band: a.hours, best_time: a.best_time, consent_text: CONSENT_TEXT },
        address: a.address, uprn: a.uprn, phone_token: token,
      })
      // For the thank-you page greeting (this tab only), and a dataLayer event for ad conversion tracking.
      try {
        sessionStorage.setItem('hh_done', JSON.stringify({ first: a.first.trim(), district: a.postcode.trim().toUpperCase().split(' ')[0], verified: !!saved?.verified, best: a.best_time, service: a.service }))
        const w = window as unknown as { dataLayer?: unknown[] }
        ;(w.dataLayer = w.dataLayer || []).push({ event: 'lead_submitted', service: a.service, verified: !!saved?.verified })
        ;(window as unknown as { gtag?: (...x: unknown[]) => void }).gtag?.('event', 'generate_lead', { service: a.service, verified: !!saved?.verified, form: postcodeLast ? 'landing' : 'site' })
      } catch {}
      router.push(`/thank-you?service=${a.service}`)
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Something went wrong. Please try again.')
      setBusy(false)
    }
  }

  // On a new step, bring the top of the form back into view if the family had scrolled down, so they
  // start reading at the question. Not on first load.
  const formRef = useRef<HTMLFormElement>(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    const f = formRef.current
    if (f && f.getBoundingClientRect().top < 80) f.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }, [i, codeStage])

  const pct = Math.round(((i + 1) / steps.length) * 100)
  return (
    <form ref={formRef} className="quiz" onSubmit={(e) => { e.preventDefault(); next() }} noValidate>
      <div>
        <p className="small muted">Step {i + 1} of {steps.length}</p>
        <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progress"><i style={{ width: `${pct}%` }} /></div>
      </div>

      {step === 'postcode' && (
        <div className="field">
          <h2><label htmlFor="q-postcode">{place ? `Where in ${place} is care needed?` : 'Where is care needed?'}</label></h2>
          <span className="hint">The postcode of the person who needs care.</span>
          <input id="q-postcode" type="text" autoComplete="postal-code" placeholder="e.g. WR14 1AB" value={a.postcode}
            onChange={(e) => set('postcode', e.target.value.toUpperCase())} style={{ textTransform: 'uppercase' }} />
        </div>
      )}

      {step === 'care_for' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>Who is the care for?</h2></legend>
          {[['parent', 'My mum or dad'], ['partner', 'My partner'], ['me', 'Me'], ['other', 'Someone else']].map(([v, l]) =>
            <Choice key={v} name="care_for" value={v} current={a.care_for} onPick={(x) => set('care_for', x)}>{l}</Choice>)}
        </fieldset>
      )}

      {step === 'service' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>What kind of care are you looking for?</h2></legend>
          <Choice name="service" value="visiting" current={a.service} onPick={(x) => set('service', x)}><b>Visiting care</b><br /><span className="small muted">Carers visit at set times, from short calls to several hours</span></Choice>
          <Choice name="service" value="live_in" current={a.service} onPick={(x) => set('service', x)}><b>Live-in care</b><br /><span className="small muted">A carer lives in the home and is there day and night</span></Choice>
          <Choice name="service" value="overnight" current={a.service} onPick={(x) => set('service', x)}><b>Overnight care</b><br /><span className="small muted">A carer stays the night, awake or sleeping</span></Choice>
          <Choice name="service" value="not_sure" current={a.service} onPick={(x) => set('service', x)}><b>Not sure yet</b><br /><span className="small muted">The agencies can help you work it out</span></Choice>
        </fieldset>
      )}

      {step === 'hours' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>Roughly how much help is needed?</h2></legend>
          {HOURS.map(([v, l]) => <Choice key={v} name="hours" value={v} current={a.hours} onPick={(x) => set('hours', x)}>{l}</Choice>)}
        </fieldset>
      )}

      {step === 'help' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>What kind of help? Choose any that apply</h2></legend>
          {[['personal_care', 'Personal care, such as washing and dressing'], ['meals', 'Meals and drinks'], ['home', 'Help around the home'], ['company', 'Company and conversation'], ['out', 'Getting out and about'], ['overnight', 'Someone there overnight']].map(([v, l]) => (
            <label className="option" key={v}>
              <input type="checkbox" checked={a.help.includes(v)} onChange={(e) => set('help', e.target.checked ? [...a.help, v] : a.help.filter((h) => h !== v))} />
              <span>{l}</span>
            </label>
          ))}
          <p className="small muted">You can skip this question.</p>
        </fieldset>
      )}

      {step === 'urgency' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>When is care needed?</h2></legend>
          {[['urgent', 'As soon as possible, within 2 weeks'], ['month', 'Within the next month'], ['researching', 'I’m just looking into options']].map(([v, l]) =>
            <Choice key={v} name="urgency" value={v} current={a.urgency} onPick={(x) => set('urgency', x)}>{l}</Choice>)}
        </fieldset>
      )}

      {step === 'funding' && (
        <fieldset className="options" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend><h2>How is care likely to be paid for?</h2></legend>
          {[['private', 'Privately, from savings or income'], ['council', 'The council will pay some or all of it'], ['nhs', 'The NHS will pay'], ['not_sure', 'Not sure yet']].map(([v, l]) =>
            <Choice key={v} name="funding" value={v} current={a.funding} onPick={(x) => set('funding', x)}>{l}</Choice>)}
          <p className="small muted">Our <a href="/tools/funding-checker" target="_blank" rel="noopener">funding checker</a> can help if you’re not sure.</p>
        </fieldset>
      )}

      {step === 'address' && (
        <div style={{ display: 'grid', gap: 14 }}>
          <h2><label htmlFor={postcodeLast ? 'q-pc2' : 'q-addr'}>What’s the address where care is needed?</label></h2>
          {postcodeLast ? (
            <div className="field">
              <span className="hint">Start with the postcode, then choose the address. So the agency knows exactly where to visit.</span>
              <input id="q-pc2" type="text" autoComplete="postal-code" placeholder="Postcode, e.g. WR14 1AB" value={a.postcode}
                onChange={(e) => { set('postcode', e.target.value.toUpperCase()); set('address', ''); set('uprn', ''); setManual(false); setErr('') }} style={{ textTransform: 'uppercase', maxWidth: 260 }} />
            </div>
          ) : (
            <span className="hint">So the agency knows exactly where to visit. {a.postcode.toUpperCase()} <button type="button" className="linkish" onClick={() => { setI(0); setAddrs(null) }}>Change postcode</button></span>
          )}
          {!manual && addrs?.status === 'loading' && <p className="muted">Finding addresses…</p>}
          {!manual && addrs?.status === 'ok' && (
            <select id="q-addr" value={a.uprn || a.address} onChange={(e) => {
              const x = addrs.list.find((l) => (l.uprn ?? l.line) === e.target.value)
              set('address', x ? `${x.line}, ${x.town}, ${x.postcode}` : ''); set('uprn', x?.uprn ?? '')
              setErr('')
            }}>
              <option value="">Choose the address ({addrs.list.length} found)</option>
              {addrs.list.map((l) => <option key={l.uprn ?? l.line} value={l.uprn ?? l.line}>{l.line}</option>)}
            </select>
          )}
          {manual && PC.test(a.postcode.trim().toUpperCase().replace(/\s+/g, ' ')) && (
            <>
              {addrs?.status === 'not_found' && <p className="small muted">We couldn’t find that postcode in the address list. Please type the address.</p>}
              <div className="field"><label htmlFor="q-line">House number and street</label><input id="q-line" type="text" autoComplete="address-line1" value={manualLine} onChange={(e) => { setManualLine(e.target.value); setErr('') }} /></div>
              <div className="field"><label htmlFor="q-town">Town or city</label><input id="q-town" type="text" autoComplete="address-level2" value={manualTown} onChange={(e) => setManualTown(e.target.value)} /></div>
            </>
          )}
          {!manual && addrs?.status === 'ok' && <button type="button" className="linkish" onClick={() => { setManual(true); set('address', ''); set('uprn', '') }}>I can’t find the address in the list</button>}
          <p className="small muted">We only share the address with the one agency we match you with.</p>
        </div>
      )}

      {step === 'contact' && codeStage && (
        <div style={{ display: 'grid', gap: 14 }}>
          <h2><label htmlFor="q-code">Enter the code we’ve just texted you</label></h2>
          <span className="hint">We sent a 6-digit code to {a.phone}. This confirms the agency has the right number to call.</span>
          <input id="q-code" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} style={{ fontSize: '1.5em', letterSpacing: '.3em', maxWidth: 220 }} />
          <p className="small muted">
            <button type="button" className="linkish" onClick={async () => { setErr(''); const r = await postJson<{ ok: boolean; challenge?: string; error?: string }>('/api/otp', { action: 'send', phone: a.phone }); if (!r.ok) setErr(r.error || 'Please try again.'); else { setChallenge(r.challenge ?? ''); setCode('') } }}>Send a new code</button>
            {' · '}
            <button type="button" className="linkish" onClick={() => { setCodeStage(false); setCode(''); setErr('') }}>Change the number</button>
          </p>
        </div>
      )}

      {step === 'contact' && !codeStage && (
        <div style={{ display: 'grid', gap: 16 }}>
          <h2>Where should the agency contact you?</h2>
          <div className="name-row">
            <div className="field"><label htmlFor="q-first">First name</label><input id="q-first" type="text" autoComplete="given-name" value={a.first} onChange={(e) => { set('first', e.target.value); setNameErr((x) => ({ ...x, first: '' })) }} onBlur={() => checkName('first')} aria-describedby="q-first-note" />
              {nameErr.first && <span id="q-first-note" className="check-note bad">{nameErr.first}</span>}</div>
            <div className="field"><label htmlFor="q-last">Last name</label><input id="q-last" type="text" autoComplete="family-name" value={a.last} onChange={(e) => { set('last', e.target.value); setNameErr((x) => ({ ...x, last: '' })) }} onBlur={() => checkName('last')} aria-describedby="q-last-note" />
              {nameErr.last && <span id="q-last-note" className="check-note bad">{nameErr.last}</span>}</div>
          </div>
          <div className="field"><label htmlFor="q-phone">Phone number</label><input id="q-phone" type="tel" autoComplete="tel" value={a.phone} onChange={(e) => { set('phone', e.target.value); setPhoneState(null) }} onBlur={() => runChecks('phone')} aria-describedby="q-phone-note" />
            <span id="q-phone-note" className={`check-note ${phoneState?.status === 'invalid' ? 'bad' : phoneState ? 'good' : ''}`}>
              {phoneState?.status === 'invalid' ? 'That doesn’t look like a working UK number. Please check it.' : phoneState?.needsCode ? '✓ Mobile number. We’ll text you a code to confirm it.' : phoneState?.type === 'landline' ? '✓ Landline number' : phoneState ? '✓ Looks good' : 'A mobile is best. We’ll text a code to confirm it.'}
            </span></div>
          <div className="field"><label htmlFor="q-email">Email address</label><input id="q-email" type="email" autoComplete="email" value={a.email} onChange={(e) => { set('email', e.target.value); setEmailState(null) }} onBlur={() => runChecks('email')} aria-describedby="q-email-note" />
            {emailState && <span id="q-email-note" className={`check-note ${emailState.status === 'undeliverable' ? 'bad' : 'good'}`}>
              {emailState.status === 'undeliverable' ? 'That email address doesn’t look like it can receive email.' : '✓ Looks good'}
              {emailState.suggestion && <> Did you mean <button type="button" className="linkish" onClick={() => { set('email', emailState.suggestion!); setEmailState(null) }}>{emailState.suggestion}</button>?</>}
            </span>}</div>
          <div className="field"><label htmlFor="q-time">Best time to call (optional)</label>
            <select id="q-time" value={a.best_time} onChange={(e) => set('best_time', e.target.value)}>
              <option value="">Any time</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option>
            </select></div>
          <label className="check"><input type="checkbox" checked={a.contact_consent} onChange={(e) => set('contact_consent', e.target.checked)} /><span>{CONSENT_TEXT}</span></label>
          <label className="check"><input type="checkbox" checked={a.marketing_consent} onChange={(e) => set('marketing_consent', e.target.checked)} /><span className="muted">Send me occasional guides about arranging care. Optional, and you can unsubscribe at any time.</span></label>
          <p className="small muted">We’ll only share your details with the agency we match you with. See our <a href="/privacy" target="_blank" rel="noopener">privacy notice</a>.</p>
        </div>
      )}

      {err && <p className="error" role="alert">{err}</p>}
      <div className="quiz-nav">
        {i > 0 ? <button type="button" className="btn ghost" onClick={() => { setErr(''); if (codeStage) { setCodeStage(false); return } setI((n) => n - 1) }}>Back</button> : <span />}
        <button type="submit" className="btn" disabled={busy || (step === 'address' && !manual && addrs?.status === 'loading')}>{step === 'contact' ? (busy ? 'Checking…' : codeStage ? 'Confirm and send' : 'Find my match') : 'Next'}</button>
      </div>
    </form>
  )
}
