import type { Metadata } from 'next'
import Link from 'next/link'
import { BRAND } from '@/lib/site'
import { LegalPage } from '@/components/LegalPage'
import { CookieSettingsLink } from '@/components/Analytics'
import { withSeo } from '@/lib/cms'
import { GA_ID } from '@/lib/analytics'

const BASE_META: Metadata = { title: 'Cookie policy', description: 'The cookies and similar technologies Hello Hattie uses, what each one is for, how long it lasts and how to change your choices.', alternates: { canonical: '/cookies' } }

export async function generateMetadata() { return withSeo('/cookies', BASE_META) }

const UPDATED = '1 October 2026'
const ADDRESS = 'Suite Ra01, 195-197 Wood Street, London, England, E17 3NU'

// Every cookie and storage item the site actually uses. Keep this in step with the code: Analytics.tsx
// (consent and GA), lib/leads.ts (attribution), MatchQuiz (thank-you greeting), the admin and preview.
const ROWS: { name: string; by: string; type: string; purpose: string; lasts: string }[] = [
  { name: 'hh_consent', by: BRAND.name, type: 'Strictly necessary (browser storage)', purpose: 'Remembers whether you accepted or rejected analytics cookies, so we apply your choice and don’t ask again on every page.', lasts: 'Until you clear your browser storage' },
  { name: 'attr', by: BRAND.name, type: 'Strictly necessary (session storage)', purpose: 'Notes how you reached us, such as the advert you clicked, so an enquiry can be matched to the right campaign.', lasts: 'Until you close the tab' },
  { name: 'hh_done', by: BRAND.name, type: 'Strictly necessary (session storage)', purpose: 'After you send an enquiry, lets the thank-you page greet you by first name and show your area.', lasts: 'Until you close the tab' },
  { name: '_ga', by: 'Google Analytics', type: 'Analytics (only with your consent)', purpose: 'Distinguishes visitors so Google Analytics can count visits and see how the site is used.', lasts: '2 years' },
  { name: `_ga_${GA_ID.replace('G-', '')}`, by: 'Google Analytics', type: 'Analytics (only with your consent)', purpose: 'Keeps track of your visit for Google Analytics.', lasts: '2 years' },
  { name: 'hh_admin', by: BRAND.name, type: 'Strictly necessary (staff only)', purpose: 'Keeps our staff signed in to the website’s admin area. Never set for families or other visitors.', lasts: '14 days' },
  { name: '__prerender_bypass', by: BRAND.name, type: 'Strictly necessary (staff only)', purpose: 'Lets our staff preview draft articles before they’re published. Never set for families or other visitors.', lasts: 'Until the browser is closed' },
]

export default function Cookies() {
  return <LegalPage title="Cookie policy" updated={UPDATED} sections={[
    { id: 'about', heading: 'About this policy', body: <>
      <p>This cookie policy explains how {BRAND.name} (“we”, “us” or “our”) uses cookies and similar technologies on our website. It should be read alongside our <Link href="/privacy">privacy notice</Link>, which explains how we collect and use your personal information more generally.</p>
      <p>{BRAND.name} is a trading name of TRG Digital Ltd, a company registered in England and Wales with company number 11731704, whose registered office is at {ADDRESS}.</p>
      <p>We only use cookies that need your consent, such as analytics cookies, once you have given it.</p>
    </> },
    { id: 'what', heading: 'What are cookies?', body: <>
      <p>Cookies are small text files placed on your computer, tablet, smartphone or other device when you visit a website. They are widely used to make websites work, or work more efficiently, and to give information to the website owner.</p>
      <p>Websites also use similar technologies, such as browser storage (local storage and session storage), pixels and tags, which work in comparable ways. In this policy we refer to all of these as “cookies”.</p>
      <p>Cookies may be “session” cookies, deleted when you close your browser or tab, or “persistent” cookies, which stay on your device for a set time or until you delete them. They may be set by us (“first-party”) or by other companies whose services we use (“third-party”).</p>
    </> },
    { id: 'how', heading: 'How we use cookies', body: <>
      <p>We use cookies to:</p>
      <ul>
        <li>make the website and our matching form work, and keep them secure;</li>
        <li>remember your cookie choice; and</li>
        <li>with your consent, understand how visitors use the website so we can improve it.</li>
      </ul>
      <p>We don’t use advertising or tracking cookies, we don’t build profiles of you for advertising, and we don’t sell information collected through cookies.</p>
    </> },
    { id: 'types', heading: 'Types of cookies we use', body: <>
      <h3>Strictly necessary</h3>
      <p>These are essential for the website to work, for example remembering your cookie choice or completing the matching form. They don’t need your consent. You can set your browser to block them, but parts of the website may then not work.</p>
      <h3>Analytics</h3>
      <p>These let us count visits and see which pages are most and least popular and how visitors move around the site, so we can improve it. The information is aggregated. We only set these cookies if you accept them.</p>
      <h3>Functional and advertising cookies</h3>
      <p>We don’t currently use functional or advertising cookies. If that changes, we’ll update this policy and ask for your consent first.</p>
      <h3 id="measurement">Anonymous page measurement</h3>
      <p>We also measure how our pages and matching form are used so we can make them easier to use: which pages are viewed, how far down a page people scroll, which buttons are clicked, which questions on the form are answered and where people stop, and where a visit came from, such as an advert. We record the answers chosen on the form and only the first half of the postcode (such as WR14), never your name, phone number, email or address. This uses a random identifier held only in the memory of your browser tab while the page is open. It isn’t stored as a cookie or on your device, it isn’t linked to your name or contact details, and it isn’t used for advertising. We do this on the basis of our legitimate interest in improving the service.</p>
      <p>To switch it off in the browser you’re using, <a href="/?fi_optout=1">click here</a>. We remember that choice in your browser so it stays off. To switch it back on, <a href="/?fi_optout=0">click here</a>.</p>
    </> },
    { id: 'list', heading: 'The cookies we use', body: <>
      <p>This is the full list of cookies and browser storage the website uses.</p>
      <div className="table-wrap"><table className="cookie-table">
        <thead><tr><th scope="col">Name</th><th scope="col">Set by</th><th scope="col">Type</th><th scope="col">What it’s for</th><th scope="col">How long</th></tr></thead>
        <tbody>{ROWS.map((r) => <tr key={r.name}><td><code>{r.name}</code></td><td>{r.by}</td><td>{r.type}</td><td>{r.purpose}</td><td>{r.lasts}</td></tr>)}</tbody>
      </table></div>
      <p>The services we use to check your details when you send an enquiry (Ideal Postcodes for addresses, phone and email checks, and Twilio for the text code) work behind the scenes on our server and don’t set cookies on your device.</p>
    </> },
    { id: 'third', heading: 'Third-party cookies', body: <>
      <p>Some cookies are placed by other companies that provide services for us. We don’t control these cookies, and their use is governed by those companies’ own privacy policies. We currently work with:</p>
      <ul>
        <li><b>Google Analytics</b>, for website analytics, only if you accept analytics cookies. See <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">how Google uses cookies</a>. You can also use Google’s <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">opt-out browser add-on</a>.</li>
      </ul>
    </> },
    { id: 'manage', heading: 'Managing your cookie choices', body: <>
      <p>When you first visit our website, a banner asks whether you accept or reject analytics cookies. Analytics stays off until you accept. You can change your choice at any time with <CookieSettingsLink /> (also at the bottom of every page).</p>
      <p>You can also control cookies through your browser settings. Most browsers let you refuse or delete cookies, and the steps vary between browsers:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
        <li><a href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
      </ul>
      <p>If you block or delete strictly necessary cookies, parts of the website, such as the matching form, may not work properly.</p>
      <p>For more general information about cookies and how to manage them, see the <a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener">Information Commissioner’s Office</a> and <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener">Your Online Choices</a>.</p>
    </> },
    { id: 'changes', heading: 'Changes to this policy', body: <>
      <p>We may update this cookie policy to reflect changes to the cookies we use, or for other operational, legal or regulatory reasons. Any changes will be posted on this page with a new “last updated” date. Please check this page from time to time.</p>
    </> },
    { id: 'contact', heading: 'Contact us', body: <>
      <p>If you have any questions about this cookie policy or our use of cookies, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or write to us at: TRG Digital Ltd trading as {BRAND.name}, {ADDRESS}.</p>
    </> },
  ]} />
}
