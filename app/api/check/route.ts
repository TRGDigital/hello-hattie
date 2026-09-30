import { NextResponse } from 'next/server'
import { checkEmail, checkPhone, ipOf, limited, OTP_ENABLED } from '@/lib/verify-server'

// Instant checks while the family types, so problems show before they press submit.
export async function POST(req: Request) {
  if (limited(`chk|${ipOf(req)}`, 30, 10 * 60e3)) return NextResponse.json({ error: 'Too many checks' }, { status: 429 })
  const b = await req.json().catch(() => ({}))
  const [phone, email] = await Promise.all([
    typeof b.phone === 'string' && b.phone.trim() ? checkPhone(b.phone) : null,
    typeof b.email === 'string' && b.email.trim() ? checkEmail(b.email) : null,
  ])
  return NextResponse.json({
    phone: phone && { status: phone.status, type: phone.type, needsCode: OTP_ENABLED && phone.status !== 'invalid' && phone.type === 'mobile' },
    email: email && { status: email.disposable ? 'undeliverable' : email.status, suggestion: email.suggestion },
  })
}
