// Funnel Insights (trg-funnel-insights.vercel.app): anonymous measurement of how the pages and
// the matching form are used, shared with TRG and CareStream. The tracker is loaded for every
// visitor by <Analytics /> (not in /admin) in memory-only mode: nothing is stored in the browser,
// and ?fi_optout=1 switches it off. Never sends names, phone numbers, emails or addresses; the
// postcode only as its district (the first half, e.g. WR14). Explained in the privacy notice.

type Fi = ((type: string, props?: Record<string, unknown>) => void) & { q?: unknown[][] }

export function fi(type: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  try {
    const w = window as unknown as { fi?: Fi }
    if (!w.fi) {
      const stub = ((...a: unknown[]) => { (stub.q = stub.q || []).push(a) }) as Fi
      w.fi = stub
    }
    w.fi(type, props)
  } catch { /* measurement never breaks the form */ }
}
