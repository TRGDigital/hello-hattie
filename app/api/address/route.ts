import { NextResponse } from 'next/server'
import { ipOf, limited, lookupAddresses } from '@/lib/verify-server'

// Addresses for a postcode, for the address picker on the last step. Each call costs a lookup credit.
export async function GET(req: Request) {
  const pc = new URL(req.url).searchParams.get('postcode')?.toUpperCase().trim() ?? ''
  if (!/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/.test(pc)) return NextResponse.json({ status: 'not_found', addresses: [] }, { status: 400 })
  if (limited(`addr|${ipOf(req)}`, 12, 10 * 60e3)) return NextResponse.json({ status: 'unavailable', addresses: [] }, { status: 429 })
  return NextResponse.json(await lookupAddresses(pc), { headers: { 'Cache-Control': 'private, max-age=600' } })
}
