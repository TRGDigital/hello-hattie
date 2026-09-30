'use client'
import { useState } from 'react'
import { submitAgency } from '@/lib/leads'
import { fullNameProblem } from '@/lib/name-check'

export function AgencyForm() {
  const [f, setF] = useState({ company: '', name: '', email: '', phone: '', message: '' })
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const [err, setErr] = useState('')
  const set = (k: keyof typeof f, v: string) => setF((x) => ({ ...x, [k]: v }))
  if (state === 'done') return <div className="panel line" role="status"><h2>Thank you</h2><p>We’ll be in touch about joining. It helps to have your CQC location ID and the postcodes you cover to hand.</p></div>
  return (
    <form className="tool" noValidate onSubmit={async (e) => {
      e.preventDefault(); setErr('')
      const bad = !f.company.trim() ? 'Please enter your agency name.'
        : fullNameProblem(f.name.trim().split(/\s+/)[0] ?? '', f.name.trim().split(/\s+/).slice(1).join(' ')) ? 'Please enter your full name, first and last.'
        : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim()) ? 'Please enter a valid email address.'
        : !/^(\+44|0)[0-9]{9,10}$/.test(f.phone.replace(/[^0-9+]/g, '')) ? 'Please enter a UK phone number.' : ''
      if (bad) { setErr(bad); return }
      setState('busy')
      try { await submitAgency(f); setState('done') } catch (x) { setErr(x instanceof Error ? x.message : 'Something went wrong.'); setState('idle') }
    }}>
      <div className="field"><label htmlFor="ag-company">Agency name</label><input id="ag-company" type="text" autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} /></div>
      <div className="field"><label htmlFor="ag-name">Your name</label><input id="ag-name" type="text" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} /></div>
      <div className="field"><label htmlFor="ag-email">Email</label><input id="ag-email" type="email" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} /></div>
      <div className="field"><label htmlFor="ag-phone">Phone</label><input id="ag-phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} /></div>
      <div className="field"><label htmlFor="ag-msg">Areas you cover and types of care (optional)</label><textarea id="ag-msg" rows={4} value={f.message} onChange={(e) => set('message', e.target.value)} /></div>
      {err && <p className="error" role="alert">{err}</p>}
      <div><button className="btn" type="submit" disabled={state === 'busy'}>{state === 'busy' ? 'Sending…' : 'Ask about joining'}</button></div>
    </form>
  )
}
