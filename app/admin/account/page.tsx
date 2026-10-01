'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { changePassword } from '../actions'

function Submit() { const { pending } = useFormStatus(); return <button className="btn" disabled={pending}>{pending ? 'Saving…' : 'Change password'}</button> }

export default function Account() {
  const [state, action] = useFormState(changePassword, {})
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Account</h1></header>
      <form action={action} className="adm-card adm-narrow">
        <h2>Change your password</h2>
        <label className="field">Current password<input name="current" type="password" autoComplete="current-password" required /></label>
        <label className="field">New password<input name="next" type="password" autoComplete="new-password" minLength={12} required /></label>
        <label className="field">New password again<input name="again" type="password" autoComplete="new-password" minLength={12} required /></label>
        {state?.error && <p className="error" role="alert">{state.error}</p>}
        {state?.ok && <p className="adm-ok">Password changed.</p>}
        <Submit />
      </form>
    </div>
  )
}
