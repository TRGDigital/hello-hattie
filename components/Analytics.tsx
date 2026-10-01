'use client'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Google Analytics 4 with Consent Mode. Analytics storage is denied by default and only granted when
// the visitor accepts on the banner (UK PECR: analytics cookies need opt-in). The choice is kept in
// localStorage; "Cookie settings" in the footer reopens the banner. Not loaded in /admin.
import { CONSENT_KEY as KEY, GA_ID } from '@/lib/analytics'
type Choice = 'granted' | 'denied'
declare global { interface Window { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] } }

function read(): Choice | null { try { const v = localStorage.getItem(KEY); return v === 'granted' || v === 'denied' ? v : null } catch { return null } }

export function Analytics() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!read()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('hh:cookie-settings', reopen)
    return () => window.removeEventListener('hh:cookie-settings', reopen)
  }, [])
  if (path?.startsWith('/admin')) return null

  const choose = (c: Choice) => {
    try { localStorage.setItem(KEY, c) } catch {}
    window.gtag?.('consent', 'update', { analytics_storage: c })
    setOpen(false)
  }
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      {/* Funnel Insights: anonymous page and form measurement for everyone, nothing stored in the
          browser (memory mode), switched off with ?fi_optout=1. See the privacy notice. */}
      <Script src="https://trg-funnel-insights.vercel.app/t.js" data-site="hellohattie" data-storage="memory" strategy="afterInteractive" />
      {open && (
        <div className="cookie-bar" role="dialog" aria-label="Cookie choices">
          <p>We’d like to use analytics cookies to see how people use Hello Hattie, so we can make it better. They’re off unless you accept. <a href="/privacy#cookies">More about cookies</a></p>
          <div className="cookie-btns">
            <button type="button" className="btn ghost" onClick={() => choose('denied')}>Reject</button>
            <button type="button" className="btn" onClick={() => choose('granted')}>Accept</button>
          </div>
        </div>
      )}
    </>
  )
}

/** Footer link that reopens the banner. */
export function CookieSettingsLink() {
  return <button type="button" className="linkish" onClick={() => window.dispatchEvent(new Event('hh:cookie-settings'))}>Cookie settings</button>
}

