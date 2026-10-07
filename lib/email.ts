import 'server-only'

// Sends one email through SendGrid. Needs SENDGRID_API_KEY and SENDGRID_FROM_EMAIL (a verified
// sender) in the Vercel environment; the same values the TRG platform uses.
export async function sendEmail(o: { to: string; subject: string; html: string; text: string }) {
  const key = process.env.SENDGRID_API_KEY, from = process.env.SENDGRID_FROM_EMAIL
  if (!key || !from) throw new Error('Email is not configured (SENDGRID_API_KEY / SENDGRID_FROM_EMAIL missing)')
  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: o.to }] }], from: { email: from, name: 'Hello Hattie' }, subject: o.subject,
      content: [{ type: 'text/plain', value: o.text }, { type: 'text/html', value: o.html }],
    }),
  })
  if (!r.ok) throw new Error(`SendGrid ${r.status} ${await r.text()}`)
}
