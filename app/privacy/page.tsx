import type { Metadata } from 'next'
import Link from 'next/link'
import { BRAND } from '@/lib/site'
import { LegalPage } from '@/components/LegalPage'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'Privacy notice', description: 'How Hello Hattie collects, uses and shares your details when you ask to be matched with a home care agency, and your rights.', alternates: { canonical: '/privacy' } }

export async function generateMetadata() { return withSeo('/privacy', BASE_META) }

const UPDATED = '1 October 2026'
const ADDRESS = 'Suite Ra01, 195-197 Wood Street, London, England, E17 3NU'
const Mail = () => <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>

export default function Privacy() {
  return <LegalPage title="Privacy notice" updated={UPDATED} sections={[
    { id: 'who', heading: 'Who we are', body: <>
      <p>{BRAND.name} is a trading name of TRG Digital Ltd, a company registered in England and Wales with company number 11731704, whose registered office is at {ADDRESS}. TRG Digital Ltd is registered with the Information Commissioner’s Office (registration ZC221613).</p>
      <p>We are the controller of the personal information you give us through the {BRAND.name} website and matching service. This notice explains what we collect, why, who we share it with and your rights. It should be read with our <Link href="/terms">terms and conditions</Link> and <Link href="/cookies">cookie policy</Link>.</p>
    </> },
    { id: 'collect', heading: 'What we collect', body: <>
      <p>When you ask us to find care, we collect:</p>
      <ul>
        <li>your first name, last name, phone number and email address;</li>
        <li>the address and postcode where care is needed;</li>
        <li>your answers about the care arrangements: who it’s for, the type and amount of care, the kind of help, when it’s needed, how it’s likely to be paid for and the best time to call;</li>
        <li>the results of the checks we run on your details (for example, whether your mobile number was confirmed by text code);</li>
        <li>your agreement to be contacted, the wording you agreed to and when; and</li>
        <li>how you found us, such as the advert you clicked, and basic technical details about your visit, such as your browser type.</li>
      </ul>
      <p>We don’t ask about medical conditions, and we ask you not to send us health information.</p>
      <p>If you’re a care agency and ask about joining, we collect your agency name, your name, email address, phone number and anything you choose to tell us about your services.</p>
    </> },
    { id: 'use', heading: 'How we use your information', body: <>
      <p>We use your information to:</p>
      <ul>
        <li><b>match you with one care agency</b> and pass your enquiry to it, so it can contact you about care. We do this with your consent, which you give by ticking the box on the last step of the form;</li>
        <li><b>check your details</b> so the agency can reach you, and to keep the service free of false or misused enquiries. This is in our legitimate interests and those of the families and agencies who use the service;</li>
        <li><b>send you occasional guides</b> about arranging care, only if you ticked the separate box to receive them. You can unsubscribe at any time;</li>
        <li><b>respond to you</b> if you contact us, including requests to stop an agency contacting you;</li>
        <li><b>understand and improve the website</b>, as described in our <Link href="/cookies">cookie policy</Link>; and</li>
        <li><b>meet our legal obligations</b> and establish, exercise or defend legal claims.</li>
      </ul>
      <p>We don’t use your information to make automated decisions that have a legal or similarly significant effect on you. Matching uses simple rules (the agency’s coverage, services and availability) to choose which agency receives your enquiry.</p>
    </> },
    { id: 'share', heading: 'Who we share it with', body: <>
      <h3>The care agency we match you with</h3>
      <p>With your agreement, we pass your details and answers to <b>one</b> home care agency registered with the Care Quality Commission that covers the postcode where care is needed. We send each enquiry to one agency only. We do not pass your details to a list of companies, and we do not sell them to anyone else. Once the agency has your details, it is responsible for them under its own privacy notice.</p>
      <h3>Companies that help us run the service</h3>
      <p>We use trusted suppliers who process information on our behalf, under contract and only on our instructions:</p>
      <ul>
        <li><b>Ideal Postcodes</b> (Ideal Postcodes Ltd, UK): address look-up, and checking that phone numbers and email addresses are valid;</li>
        <li><b>Twilio</b>: sending the one-time text code that confirms a mobile number;</li>
        <li><b>Supabase</b>: the secure database where enquiries are stored;</li>
        <li><b>Vercel</b>: hosting the website;</li>
        <li><b>SendGrid</b> (Twilio): sending enquiry emails to agencies and service emails;</li>
        <li><b>Google Analytics</b>: website analytics, only if you accept analytics cookies; and</li>
        <li><b>postcodes.io</b>: finding the location of a postcode district (such as WR14) for the service area tool on our home page. Only the district is sent, and the look-up isn’t stored.</li>
      </ul>
      <p>We may also share information if the law requires it, or to protect the rights, property or safety of our users or others.</p>
    </> },
    { id: 'transfers', heading: 'International transfers', body: <>
      <p>Some of our suppliers process information outside the UK, for example in the United States. Where they do, we make sure there are appropriate safeguards, such as the UK’s adequacy regulations (including the UK Extension to the EU-US Data Privacy Framework) or contract terms approved by the Information Commissioner.</p>
    </> },
    { id: 'keep', heading: 'How long we keep it', body: <>
      <p>We keep enquiry details for 24 months from when you send them, so we can deal with any questions or complaints and keep accurate records of introductions. After that, we anonymise them: we remove your name, phone number, email address, full postcode and address, and the check results. We keep the anonymised record, such as the type of care and the postcode district, to understand how the service is used.</p>
      <p>If you ask us to delete your details sooner, we will, unless we need to keep something to meet a legal obligation.</p>
    </> },
    { id: 'security', heading: 'Keeping your information safe', body: <>
      <p>We use appropriate technical and organisational measures to protect your information. The website uses encrypted connections, enquiries are stored in a secure database that the public cannot read, and access is limited to the people who need it to run the service.</p>
    </> },
    { id: 'rights', heading: 'Your rights', body: <>
      <p>Under UK data protection law you have the right to:</p>
      <ul>
        <li>ask for a copy of the information we hold about you;</li>
        <li>ask us to correct information that is wrong or incomplete;</li>
        <li>ask us to delete your information;</li>
        <li>object to, or ask us to restrict, how we use your information;</li>
        <li>withdraw your consent at any time, without affecting anything we did before you withdrew it; and</li>
        <li>ask for your information in a format you can take to another organisation.</li>
      </ul>
      <p>To use any of these rights, email <Mail />. We’ll reply within one month.</p>
    </> },
    { id: 'change-mind', heading: 'Changing your mind', body: <>
      <p>You can withdraw your agreement at any time by emailing <Mail />. We’ll stop sharing your details, tell the agency we introduced you to that you no longer wish to be contacted, and we won’t pass your details to anyone else. To stop receiving our guides, use the unsubscribe link in any email.</p>
    </> },
    { id: 'cookies', heading: 'Cookies and measurement', body: <>
      <p>If you accept analytics cookies, we use Google Analytics to see which pages people visit and how they use the site. If you reject, or don’t choose, analytics cookies stay off. We also measure how our pages and form are used without cookies and without collecting your name or contact details. Our <Link href="/cookies">cookie policy</Link> explains both in full, including how to switch them off. You can change your cookie choice at any time with “Cookie settings” at the bottom of every page.</p>
    </> },
    { id: 'children', heading: 'Children', body: <>
      <p>Our service is for adults arranging care. It isn’t intended for anyone under 18, and we don’t knowingly collect information from children.</p>
    </> },
    { id: 'changes', heading: 'Changes to this notice', body: <>
      <p>We may update this notice from time to time. Any changes will be posted on this page with a new “last updated” date.</p>
    </> },
    { id: 'contact', heading: 'Contact us and complaints', body: <>
      <p>If you have a question about this notice or how we use your information, email <Mail /> or write to us at: TRG Digital Ltd trading as {BRAND.name}, {ADDRESS}.</p>
      <p>If you’re unhappy with how we’ve handled your information, please tell us first so we can put it right. You also have the right to complain to the Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk</a> or on 0303 123 1113.</p>
    </> },
  ]} />
}
