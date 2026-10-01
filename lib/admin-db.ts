import 'server-only'

// Admin reads and writes go through the database function hh_admin(), which only works with the
// server-held HH_ADMIN_SECRET. Never import this from a client component.
const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'

export async function adminRpc<T = unknown>(action: string, args: Record<string, unknown> = {}): Promise<T> {
  const secret = process.env.HH_ADMIN_SECRET
  if (!secret) throw new Error('Admin is not configured (HH_ADMIN_SECRET missing)')
  const r = await fetch(`${DB}/rest/v1/rpc/hh_admin`, {
    method: 'POST', cache: 'no-store',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p: { ...args, action, secret } }),
  })
  const body = await r.json().catch(() => null)
  if (!r.ok) throw new Error(body?.message || `Database error ${r.status}`)
  return body as T
}
