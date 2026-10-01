import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { currentAdmin } from '@/lib/admin-auth'

// Turns on preview mode (drafts visible) for this browser and opens the page. Admins only.
export function GET(req: Request) {
  if (!currentAdmin()) return NextResponse.redirect(new URL('/admin/login', req.url))
  const path = new URL(req.url).searchParams.get('path') || '/'
  if (!path.startsWith('/') || path.startsWith('//')) return NextResponse.redirect(new URL('/admin', req.url))
  if (new URL(req.url).searchParams.get('off')) draftMode().disable(); else draftMode().enable()
  return NextResponse.redirect(new URL(path, req.url))
}
