'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '../actions'

function Submit() { const { pending } = useFormStatus(); return <button className="btn" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button> }

export default function Login() {
  const [state, action] = useFormState(login, {})
  return (
    <div className="adm-login">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/hello-hattie-logo.svg" alt="Hello Hattie" width={200} height={46} />
      <h1>Admin sign in</h1>
      <form action={action} className="adm-card">
        <label className="field">Email<input name="email" type="email" autoComplete="username" required /></label>
        <label className="field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
        {state?.error && <p className="error" role="alert">{state.error}</p>}
        <Submit />
      </form>
    </div>
  )
}
