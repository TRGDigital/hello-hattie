import { NextResponse } from 'next/server'
import { COOKIE } from '@/lib/admin-auth'
export function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url))
  res.cookies.delete(COOKIE)
  return res
}
