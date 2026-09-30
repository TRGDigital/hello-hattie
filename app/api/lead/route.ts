import { NextResponse } from 'next/server'
import { fullNameProblem, NAME_MESSAGE } from '@/lib/name-check'
import { checkEmail, checkPhone, ipOf, limited, OTP_ENABLED, phoneTokenOk, signLead } from '@/lib/verify-server'

const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'
const DISTRIBUTE = process.env.DISTRIBUTE_URL || 'https://www.trgdigital.co.uk/api/homecare/distribute'
const bad = (message: string, field?: string) => NextResponse.json({ message, field }, { status: 400 })

// The only way a lead reaches the database: phone and email are checked here, the mobile's text
// code proof is checked, then the lead is signed so submit_homecare_lead_v2 accepts it.
export async function POST(req: Request) {
  if (limited(`lead|${ipOf(req)}`, 6, 10 * 60e3)) return bad('Too many attempts. Please try again in a few minutes.')
  const p = await req.json().catch(() => null)
  if (!p || typeof p !== 'object') return bad('Something went wrong. Please try again.')

  // Names: split if an older form sent one field, then block offensive or made-up names.
  const parts = String(p.name ?? '').trim().split(/\s+/)
  const first = String(p.first_name ?? parts[0] ?? '').trim(), last = String(p.last_name ?? parts.slice(1).join(' ')).trim()
  const np = fullNameProblem(first, last)
  if (np) return bad(NAME_MESSAGE[np]('name'), 'name')
  p.name = `${first} ${last}`

  const [phone, email] = await Promise.all([checkPhone(String(p.phone ?? '')), checkEmail(String(p.email ?? ''))])
  if (phone.status === 'invalid' || !phone.e164) return bad('Please check the phone number. It doesn’t look like a working UK number.', 'phone')
  if (email.status === 'undeliverable' || email.disposable) return bad('Please check the email address. It doesn’t look like it can receive email.', 'email')
  const verified = phone.type === 'mobile' && phoneTokenOk(phone.e164, p.phone_token)

  const emailNorm = String(p.email).trim().toLowerCase()
  const postcode = String(p.postcode ?? '').toUpperCase().replace(/\s+/g, ' ').trim()
  const ts = Date.now()
  const body = {
    ...p, email: emailNorm, phone: phone.e164, postcode, ts, sig: signLead(emailNorm, phone.e164, postcode, ts),
    address: typeof p.address === 'string' ? p.address.slice(0, 300) : null, uprn: typeof p.uprn === 'string' ? p.uprn.slice(0, 20) : null,
    verification: {
      phone: { status: phone.status, type: phone.type ?? null, network: phone.network ?? null, national: phone.national ?? null },
      phone_verified: verified, otp_required: OTP_ENABLED && phone.type === 'mobile',
      email: { status: email.status, free: email.free ?? null, role: email.role ?? null, catchall: email.catchall ?? null },
      address_source: p.uprn ? 'lookup' : p.address ? 'manual' : 'none', checked_at: new Date(ts).toISOString(),
    },
  }
  delete body.phone_token
  const r = await fetch(`${DB}/rest/v1/rpc/submit_homecare_lead_v2`, {
    method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ p: body }),
  })
  const out = await r.json().catch(() => null)
  if (!r.ok) return bad(out?.message || 'Something went wrong. Please try again.')
  if (out?.id && !out.duplicate) {
    await fetch(DISTRIBUTE, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://homecare-site-three.vercel.app' }, body: JSON.stringify({ lead_id: out.id }), signal: AbortSignal.timeout(4000) }).catch(() => {})
  }
  return NextResponse.json({ id: out?.id, duplicate: !!out?.duplicate, verified })
}
