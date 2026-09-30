import { NextResponse } from 'next/server'
import { checkCode, ipOf, limited, phoneToken, sendCode, toE164 } from '@/lib/verify-server'

// Text-code verification for mobiles: { action: 'send', phone } then { action: 'check', phone, code }.
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}))
  const e164 = typeof b.phone === 'string' ? toE164(b.phone) : null
  if (!e164 || !/^\+447/.test(e164)) return NextResponse.json({ ok: false, error: 'Please enter a UK mobile number.' }, { status: 400 })
  if (b.action === 'send') {
    if (limited(`otp|${ipOf(req)}`, 5, 15 * 60e3) || limited(`otpn|${e164}`, 3, 15 * 60e3)) return NextResponse.json({ ok: false, error: 'Too many codes requested. Please wait a few minutes.' }, { status: 429 })
    return NextResponse.json(await sendCode(e164))
  }
  if (b.action === 'check') {
    if (limited(`otpc|${e164}`, 8, 15 * 60e3)) return NextResponse.json({ ok: false, error: 'Too many attempts. Please request a new code.' }, { status: 429 })
    const code = String(b.code ?? '').replace(/\D/g, '')
    if (code.length !== 6) return NextResponse.json({ ok: false, error: 'The code is 6 numbers.' })
    return (await checkCode(e164, code)) ? NextResponse.json({ ok: true, token: phoneToken(e164) }) : NextResponse.json({ ok: false, error: 'That code isn’t right. Please check the text and try again.' })
  }
  return NextResponse.json({ ok: false }, { status: 400 })
}
