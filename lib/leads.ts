// Leads go to the TRG platform database through submit_homecare_lead (a validated function;
// the browser cannot read or write the leads table directly). The key is the public anon key.
const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'
export const CONSENT_VERSION = 'v3-2026-09-30'
export const CONSENT_TEXT = 'I agree to my details being passed to a CQC-registered home care agency that covers my area, so they can contact me about care.'

async function rpc<T>(fn: string, p: Record<string, unknown>): Promise<T> {
  const r = await fetch(`${DB}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p }),
  })
  const body = await r.json().catch(() => null)
  if (!r.ok) throw new Error(body?.message || 'Something went wrong. Please try again, or try again in a few minutes.')
  return body as T
}

/** Leads go through this site's own server (/api/lead), which checks the phone and email, checks
 *  the text-code proof and signs the lead; the database only accepts signed leads. */
export async function submitLead(p: Record<string, unknown>): Promise<{ id: string; duplicate: boolean; verified: boolean }> {
  const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
  const body = await r.json().catch(() => null)
  if (!r.ok) throw Object.assign(new Error(body?.message || 'Something went wrong. Please try again.'), { field: body?.field })
  return body
}
export const postJson = async <T,>(url: string, body: unknown): Promise<T> => {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  return r.json()
}
export const submitAgency = (p: Record<string, unknown>) => rpc<string>('submit_homecare_agency', p)

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'] as const
/** First-touch attribution, kept for the visit so a lead from an ad is traceable to its campaign. */
export function rememberAttribution() {
  try {
    const q = new URLSearchParams(window.location.search)
    if (!KEYS.some((k) => q.get(k))) return
    if (sessionStorage.getItem('attr')) return
    sessionStorage.setItem('attr', JSON.stringify(Object.fromEntries(KEYS.map((k) => [k, q.get(k)]).filter(([, v]) => v))))
  } catch {}
}
export function attribution(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem('attr') || '{}') } catch { return {} }
}
