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

export const submitLead = (p: Record<string, unknown>) => rpc<{ id: string; duplicate: boolean }>('submit_homecare_lead', p)
// Ask the TRG platform to send the lead to its agency straight away. Fire and forget: if this
// fails, the platform's one-minute sweep sends it anyway.
const DISTRIBUTE = process.env.NEXT_PUBLIC_DISTRIBUTE_URL || 'https://www.trgdigital.co.uk/api/homecare/distribute'
export function pingDistribution(leadId: string) {
  try {
    fetch(DISTRIBUTE, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lead_id: leadId }) }).catch(() => {})
  } catch {}
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
