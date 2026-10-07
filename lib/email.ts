import 'server-only'

// Sends one email through SendGrid. Needs SENDGRID_API_KEY in the Vercel environment (the same key
// the TRG platform uses). Sends from the trgdigital.co.uk domain, which SendGrid already accepts;
// SENDGRID_FROM_EMAIL overrides it.
export async function sendEmail(o: { to: string; subject: string; html: string; text: string }) {
  const key = process.env.SENDGRID_API_KEY, from = process.env.SENDGRID_FROM_EMAIL || 'hello@trgdigital.co.uk'
  if (!key) throw new Error('Email is not configured (SENDGRID_API_KEY missing)')
  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: o.to }] }], from: { email: from, name: 'Hello Hattie' }, subject: o.subject,
      content: [{ type: 'text/plain', value: o.text }, { type: 'text/html', value: o.html }],
    }),
  })
  if (!r.ok) throw new Error(`SendGrid ${r.status} ${await r.text()}`)
}
