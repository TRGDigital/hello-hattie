import { NextResponse, type NextRequest } from 'next/server'

// Keeps /admin behind the login. Checks the session cookie's signature with Web Crypto (middleware
// runs at the edge); pages and server actions check it again on the server.
async function valid(value: string | undefined) {
  const secret = process.env.HH_SESSION_SECRET
  if (!value || !secret) return false
  const [b, exp, sig] = value.split('.')
  if (!b || !exp || !sig || Number(exp) < Date.now()) return false
  const email = atob(b.replace(/-/g, '+').replace(/_/g, '/'))
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${email}|${exp}`))
  const hex = Array.from(new Uint8Array(mac)).map((x) => x.toString(16).padStart(2, '0')).join('')
  return hex === sig
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin/login') return NextResponse.next()
  if (!(await valid(req.cookies.get('hh_admin')?.value))) {
    const url = req.nextUrl.clone(); url.pathname = '/admin/login'; url.search = ''
    return NextResponse.redirect(url)
  }
  const res = NextResponse.next()
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export const config = { matcher: ['/admin', '/admin/:path*'] }
