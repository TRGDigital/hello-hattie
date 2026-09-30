import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

// Server-only checks for the matching form: address lookup, phone and email validation (Ideal
// Postcodes), text-code verification (Twilio Verify) and signing the lead so the database accepts it.
// Every provider call fails OPEN: if a provider is down or not configured, the family can still
// finish, and the lead is saved with the check marked 'unchecked' rather than lost.
const IP = 'https://api.ideal-postcodes.co.uk/v1'
const KEY = process.env.IDEAL_POSTCODES_KEY || ''
const SECRET = process.env.LEAD_SIGNING_SECRET || ''
const TW_SID = process.env.TWILIO_ACCOUNT_SID || ''
const TW_TOKEN = process.env.TWILIO_AUTH_TOKEN || ''
const TW_VERIFY = process.env.TWILIO_VERIFY_SID || ''
export const OTP_ENABLED = process.env.OTP_ENABLED !== 'false' && !!(TW_SID && TW_TOKEN && TW_VERIFY)

export type Address = { line: string; town: string; postcode: string; uprn: string | null }
export type PhoneCheck = { status: 'valid' | 'invalid' | 'unchecked'; type?: 'mobile' | 'landline' | 'other'; e164?: string; national?: string; network?: string }
export type EmailCheck = { status: 'deliverable' | 'undeliverable' | 'unknown' | 'unchecked'; disposable?: boolean; free?: boolean; role?: boolean; catchall?: boolean; suggestion?: string }

async function ideal(path: string, timeoutMs = 5000) {
  if (!KEY) return null
  const sep = path.includes('?') ? '&' : '?'
  const r = await fetch(`${IP}${path}${sep}api_key=${encodeURIComponent(KEY)}`, { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' })
  return { status: r.status, body: await r.json().catch(() => null) }
}

/** UK phone to +44 form. Returns null if it can't be a UK number. */
export function toE164(raw: string): string | null {
  const d = raw.replace(/[^\d+]/g, '')
  if (/^\+44\d{9,10}$/.test(d)) return d
  if (/^0\d{9,10}$/.test(d)) return '+44' + d.slice(1)
  if (/^44\d{9,10}$/.test(d)) return '+' + d
  return null
}

export async function lookupAddresses(postcode: string): Promise<{ status: 'ok' | 'not_found' | 'unavailable'; addresses: Address[]; suggestions?: string[] }> {
  try {
    const r = await ideal(`/postcodes/${encodeURIComponent(postcode.replace(/\s+/g, ''))}`)
    if (!r) return { status: 'unavailable', addresses: [] }
    if (r.status === 404) return { status: 'not_found', addresses: [], suggestions: r.body?.suggestions ?? [] }
    if (r.status !== 200 || !Array.isArray(r.body?.result)) return { status: 'unavailable', addresses: [] }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addresses = r.body.result.map((a: any) => ({
      line: [a.line_1, a.line_2, a.line_3].filter(Boolean).join(', '), town: a.post_town, postcode: a.postcode, uprn: a.uprn ? String(a.uprn) : null,
    }))
    return { status: 'ok', addresses }
  } catch { return { status: 'unavailable', addresses: [] } }
}

const memo = new Map<string, { at: number; v: unknown }>()
async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = memo.get(key)
  if (hit && Date.now() - hit.at < 30 * 60e3) return hit.v as T
  const v = await fn()
  if ((v as { status?: string }).status !== 'unchecked') memo.set(key, { at: Date.now(), v })
  if (memo.size > 5000) memo.clear()
  return v
}
export const checkPhone = (raw: string) => cached(`p|${toE164(raw) ?? raw}`, () => checkPhoneLive(raw))
export const checkEmail = (raw: string) => cached(`e|${raw.trim().toLowerCase()}`, () => checkEmailLive(raw))

async function checkPhoneLive(raw: string): Promise<PhoneCheck> {
  const e164 = toE164(raw)
  if (!e164) return { status: 'invalid' }
  try {
    const r = await ideal(`/phone_numbers?query=${encodeURIComponent(e164)}`)
    if (!r || r.status !== 200 || !r.body?.result) return { status: 'unchecked', e164, type: /^\+447/.test(e164) ? 'mobile' : undefined }
    const x = r.body.result
    // The current carrier is often blank (ported or unknown), so fall back to the original allocation.
    const carrier = x.current_carrier?.network_type ? x.current_carrier : x.original_carrier ?? {}
    const nt = String(carrier.network_type ?? '').toLowerCase()
    return {
      status: x.valid ? 'valid' : 'invalid', e164, national: x.national_format ?? undefined, network: carrier.name ?? undefined,
      type: nt.includes('mobile') ? 'mobile' : nt.includes('landline') || nt.includes('fixed') ? 'landline' : /^\+447[1-9]/.test(e164) ? 'mobile' : 'other',
    }
  } catch { return { status: 'unchecked', e164, type: /^\+447/.test(e164) ? 'mobile' : undefined } }
}

async function checkEmailLive(raw: string): Promise<EmailCheck> {
  const email = raw.trim().toLowerCase()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { status: 'undeliverable' }
  try {
    const r = await ideal(`/emails?query=${encodeURIComponent(email)}`, 8000)
    if (!r || r.status !== 200 || !r.body?.result) return { status: 'unchecked' }
    const x = r.body.result
    const status = x.result === 'deliverable' ? 'deliverable' : x.result === 'not_deliverable' || x.result === 'undeliverable' ? 'undeliverable' : 'unknown'
    return { status, disposable: !!x.disposable, free: !!x.free, role: !!x.role, catchall: !!x.catchall, suggestion: x.suggestions?.[0] }
  } catch { return { status: 'unchecked' } }
}

const twilio = (path: string, form: Record<string, string>) => fetch(`https://verify.twilio.com/v2/Services/${TW_VERIFY}/${path}`, {
  method: 'POST', signal: AbortSignal.timeout(8000),
  headers: { Authorization: 'Basic ' + Buffer.from(`${TW_SID}:${TW_TOKEN}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(form),
})

export async function sendCode(e164: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await twilio('Verifications', { To: e164, Channel: 'sms' })
    if (r.ok) return { ok: true }
    const b = await r.json().catch(() => ({}))
    return { ok: false, error: b?.code === 60203 ? 'Too many codes sent to this number. Please wait a few minutes.' : 'We couldn’t send a text to that number.' }
  } catch { return { ok: false, error: 'We couldn’t send a text just now.' } }
}

export async function checkCode(e164: string, code: string): Promise<boolean> {
  try {
    const r = await twilio('VerificationCheck', { To: e164, Code: code })
    const b = await r.json().catch(() => ({}))
    return r.ok && b?.status === 'approved'
  } catch { return false }
}

const mac = (s: string) => createHmac('sha256', SECRET).update(s).digest('hex')
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b))

/** Proof, valid for 30 minutes, that this browser verified this mobile. */
export const phoneToken = (e164: string) => { const ts = Date.now(); return `${ts}.${mac(`otp|${e164}|${ts}`)}` }
export function phoneTokenOk(e164: string, token: string | undefined) {
  if (!token || !SECRET) return false
  const [ts, sig] = token.split('.')
  return Date.now() - Number(ts) < 30 * 60e3 && same(sig ?? '', mac(`otp|${e164}|${ts}`))
}

/** Signature the database function submit_homecare_lead_v2 checks. */
export const signLead = (email: string, phone: string, postcode: string, ts: number) => mac(`${email}|${phone}|${postcode}|${ts}`)

/** Very small per-instance rate limiter, on top of the providers' own limits. */
const hits = new Map<string, number[]>()
export function limited(key: string, max: number, windowMs: number) {
  const now = Date.now()
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  list.push(now); hits.set(key, list)
  if (hits.size > 5000) hits.clear()
  return list.length > max
}
export const ipOf = (req: Request) => (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
