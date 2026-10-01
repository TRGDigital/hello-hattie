import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac, randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

// Admin login: email and password (scrypt-hashed in hh_admins), then a signed session cookie.
// The cookie is "email.expiry.signature"; the middleware checks it on every /admin request and
// every server action checks it again with requireAdmin().
const scrypt = promisify(_scrypt) as (pw: string, salt: string, len: number) => Promise<Buffer>
export const COOKIE = 'hh_admin'
const DAYS = 14

export async function hashPassword(pw: string) {
  const salt = randomBytes(16).toString('hex')
  return `scrypt:${salt}:${(await scrypt(pw, salt, 64)).toString('hex')}`
}
export async function checkPassword(pw: string, stored: string) {
  const [, salt, hex] = stored.split(':')
  if (!salt || !hex) return false
  const got = await scrypt(pw, salt, 64), want = Buffer.from(hex, 'hex')
  return got.length === want.length && timingSafeEqual(got, want)
}

const sign = (s: string) => createHmac('sha256', process.env.HH_SESSION_SECRET || '').update(s).digest('hex')
export function makeSession(email: string) {
  const exp = Date.now() + DAYS * 864e5
  return `${Buffer.from(email).toString('base64url')}.${exp}.${sign(`${email}|${exp}`)}`
}
export function readSession(value: string | undefined): string | null {
  if (!value || !process.env.HH_SESSION_SECRET) return null
  const [b, exp, sig] = value.split('.')
  if (!b || !exp || !sig) return null
  const email = Buffer.from(b, 'base64url').toString()
  const want = sign(`${email}|${exp}`)
  if (Number(exp) < Date.now() || sig.length !== want.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return null
  return email
}

export function currentAdmin() { return readSession(cookies().get(COOKIE)?.value) }
export function requireAdmin() {
  const email = currentAdmin()
  if (!email) redirect('/admin/login')
  return email
}
export const sessionCookie = (value: string) => ({ name: COOKIE, value, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: DAYS * 86400 })
