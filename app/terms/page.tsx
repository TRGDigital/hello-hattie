import type { Metadata } from 'next'
import Link from 'next/link'
import { BRAND } from '@/lib/site'
import { Crumbs } from '@/components/Blocks'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'Terms and conditions', description: 'The terms for using Hello Hattie, including how we pass your enquiry to one CQC-registered home care agency, and what we are and aren’t responsible for.', alternates: { canonical: '/terms' } }

export async function generateMetadata() { return withSeo('/terms', BASE_META) }

const UPDATED = '1 October 2026'
const ADDRESS = 'Suite Ra01, 195-197 Wood Street, London, England, E17 3NU'

// Section headings, in order, for the contents list. Each id is the anchor.
const TOC: [string, string][] = [
  ['about', 'About these terms'], ['changes', 'These terms may change'], ['access', 'Accessing the website'],
  ['matching', 'How our matching service works'], ['not-advice', 'Information on the website is not advice'],
  ['ip', 'Intellectual property'], ['use', 'Acceptable use'], ['links', 'Links and third-party content'],
  ['liability', 'Our liability'], ['viruses', 'Viruses'], ['data', 'How we use your personal data'],
  ['agencies', 'Care agencies'], ['law', 'Governing law and jurisdiction'], ['contact', 'Contact us'],
]

export default function Terms() {
  let n = 0
  const H = ({ id }: { id: string }) => <h2 id={id}>{++n}. {TOC.find(([k]) => k === id)![1]}</h2>
  return (
    <>
      <section className="blog-head"><div className="in">
        <Crumbs items={[{ label: 'Terms and conditions' }]} />
        <div className="blog-title">
          <p className="eyebrow">Legal</p>
          <h1>Terms and conditions</h1>
          <p className="lede">Last updated: {UPDATED}</p>
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 8 }}><div className="in">
        <div className="legal">
          <nav className="toc legal-toc" aria-label="Contents">
            <p className="eyebrow">Contents</p>
            <ol>{TOC.map(([id, t]) => <li key={id}><a href={`#${id}`}>{t}</a></li>)}</ol>
          </nav>

          <article className="prose legal-body">
            <H id="about" />
            <p>These terms and conditions (“Terms”) govern your use of the {BRAND.name} website at www.hellohattie.co.uk (the “Website”) and our matching service. Please read them carefully. By using the Website, or by asking us to match you with a care agency, you confirm that you accept these Terms. If you do not agree, you must not use the Website.</p>
            <p>{BRAND.name} is a trading name of TRG Digital Ltd, a company registered in England and Wales with company number 11731704, whose registered office is at {ADDRESS}. In these Terms, “we”, “us” and “our” mean TRG Digital Ltd trading as {BRAND.name}.</p>
            <p>You can contact us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or by post at the address above.</p>

            <H id="changes" />
            <p>We may revise these Terms from time to time by updating this page. Any changes take effect when they are posted, so please check this page from time to time. If you continue to use the Website after changes are posted, you accept the revised Terms. The Terms that apply to an enquiry are the ones in place when you send it.</p>

            <H id="access" />
            <p>The Website and our matching service are free for families. We do not guarantee that the Website, or any content on it, will always be available or uninterrupted. We may suspend, withdraw or restrict all or part of the Website for business and operational reasons, and we will try to give reasonable notice where we can.</p>
            <p>You are responsible for making the arrangements you need to access the Website, and for making sure that anyone who uses the Website through your internet connection is aware of these Terms and follows them.</p>

            <H id="matching" />
            <p>{BRAND.name} is a free matching service. We are not a care provider, we do not employ or supply carers, and we do not provide care of any kind. When you ask us to find care, this is how your enquiry is handled.</p>
            <h3>What you tell us</h3>
            <p>You tell us about the care arrangements: who the care is for, the type of care, roughly how much help is needed, when it is needed and how it is likely to be paid for, together with your name, phone number, email address and the address where care is needed. We do not ask about medical conditions, and we ask you not to send us health information.</p>
            <p>You agree that the information you give us is accurate and that you are entitled to give it, including any details about the person who needs care. If you are arranging care for someone else, you should have their agreement, or be acting in their best interests, where you can.</p>
            <h3>Checking your details</h3>
            <p>To make sure the agency can reach you, we check your details when you send them. We look up the address from the Royal Mail address list, check that your phone number is a working UK number, and check that your email address can receive email. If you give a mobile number, we text you a one-time code to confirm it. We may refuse an enquiry that fails these checks, or that uses a name or details that are clearly false or offensive.</p>
            <h3>Passing your enquiry to one agency</h3>
            <p>When you tick the box to agree, we pass your contact details, the address where care is needed and your answers about the care to <b>one</b> home care agency. We choose an agency that:</p>
            <ul>
              <li>is registered with the Care Quality Commission (CQC);</li>
              <li>has told us it covers the postcode where care is needed;</li>
              <li>has told us it offers the type of care you asked for; and</li>
              <li>has told us it can take on new clients.</li>
            </ul>
            <p>We send each enquiry to one agency only. We do not pass your details to a list of companies, and we do not sell them on to anyone else.</p>
            <h3>What happens next</h3>
            <p>The agency will contact you directly, usually by phone, to talk about the care and may arrange an assessment. We rely on the information agencies give us about their coverage, services and availability. We can’t guarantee that the agency will contact you, that it will be able to provide the care you need, or when care could start.</p>
            <p>You are under no obligation to use the agency we match you with. If you decide to go ahead, any care is agreed between you (or the person receiving care) and the agency directly, under the agency’s own terms and conditions. We are not a party to that agreement.</p>
            <h3>Our role and the agency’s role</h3>
            <p>Matching you with an agency is not a recommendation or endorsement of that agency, and we do not inspect, supervise or guarantee the care any agency provides. The agency is solely responsible for the care it provides, for its staff and for meeting its legal and regulatory obligations. Before you agree to care, we encourage you to read the agency’s latest CQC inspection report on the CQC website and to ask the questions in our <Link href="/blog/questions-to-ask-a-home-care-agency">guide to choosing an agency</Link>.</p>
            <p>Information we show about the CQC register, including ratings and the number of agencies in an area, comes from the CQC and may not reflect the most recent changes. Always check the CQC website for an agency’s current registration and rating.</p>
            <h3>How we are paid</h3>
            <p>Our service is free for families. Agencies pay us a fee when we introduce a family to them. You never pay us anything.</p>
            <h3>Changing your mind</h3>
            <p>You can withdraw your agreement at any time by emailing <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>. We will tell the agency we introduced you to that you no longer wish to be contacted, and we will not pass your details to anyone else. Concerns about the care itself should go to the agency first. If you’re not happy with its response, you can contact the Local Government and Social Care Ombudsman.</p>
            <h3>Fair use of the matching service</h3>
            <p>You must not send an enquiry using someone else’s details without their permission, send false or test enquiries, or use the service to contact agencies for any purpose other than arranging care.</p>

            <H id="not-advice" />
            <p>The content on the Website is for general information only. It is not medical, clinical, legal, financial or other professional advice, and you should not rely on it as such. This includes our guides, cost information, calculators and checkers, which give a guide only and are not formal advice.</p>
            <p>Nothing on the Website replaces advice from a qualified healthcare or other professional who knows your circumstances. Always seek appropriate professional advice before making a decision about your health, care or wellbeing, or that of anyone you are arranging care for. For independent advice about care and money, organisations such as Age UK (0800 678 1602) can help for free.</p>
            <p><b>If you or someone else is experiencing a medical emergency, call 999 immediately. Do not rely on the Website.</b></p>
            <p>Although we make reasonable efforts to keep the information on the Website up to date, we make no representations, warranties or guarantees, whether express or implied, that it is accurate, complete or current. Figures such as prices, savings limits and benefit rates change, usually each April, and are shown with their sources.</p>

            <H id="ip" />
            <p>We are the owner or licensee of all intellectual property rights in the Website and the material published on it, including text, graphics, logos, images and design. These works are protected by copyright and other laws and treaties around the world. All such rights are reserved.</p>
            <p>You may print one copy, and download extracts, of any page of the Website for your personal use, including our home care call guide, and you may draw other people’s attention to content on the Website. You must not change any paper or digital copies you print or download, and you must not use any illustrations, photographs or graphics separately from the text that goes with them.</p>
            <p>You must not use any part of the content on the Website for commercial purposes without a licence from us. The {BRAND.name} name and logo are trading names and marks used by us, and you must not use them without our written consent.</p>

            <H id="use" />
            <p>You may use the Website only for lawful purposes. You must not:</p>
            <ul>
              <li>use the Website in any way that breaches any applicable law or regulation;</li>
              <li>use the Website in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;</li>
              <li>use the Website to send, knowingly receive, upload, download, use or re-use any material that is unlawful, harmful, defamatory, obscene or otherwise objectionable;</li>
              <li>attempt to gain unauthorised access to the Website, the server on which it is stored, or any server, computer or database connected to it;</li>
              <li>introduce any viruses, trojans, worms or other material that is malicious or technologically harmful; or</li>
              <li>attack the Website through a denial-of-service attack or a distributed denial-of-service attack.</li>
            </ul>
            <p>We may decide, acting reasonably, whether there has been a breach of this section. If there has, we may take any action we consider appropriate, including withdrawing your right to use the Website.</p>

            <H id="links" />
            <p>Where the Website links to other sites and resources provided by third parties, such as GOV.UK, the NHS or the CQC, these links are for your information only. We have no control over the content of those sites or resources, and a link is not an approval by us of the linked website or the information on it.</p>
            <p>You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it. You must not create a link in a way that suggests any form of association, approval or endorsement on our part where none exists.</p>

            <H id="liability" />
            <p>Nothing in these Terms excludes or limits our liability for death or personal injury arising from our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited under the law of England and Wales. Nothing in these Terms affects your statutory rights as a consumer.</p>
            <p>To the extent permitted by law, we exclude all conditions, warranties, representations or other terms that may apply to the Website or any content on it, whether express or implied.</p>
            <p>We are not responsible for the care, or any other services, provided by any agency, or for anything an agency does or fails to do, including whether it contacts you or can provide care. To the extent permitted by law, we will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty or otherwise, arising under or in connection with:</p>
            <ul>
              <li>use of, or inability to use, the Website or our matching service; or</li>
              <li>use of, or reliance on, any content displayed on the Website.</li>
            </ul>
            <p>We will not be liable for any loss of profits, sales, business or revenue, business interruption, loss of anticipated savings, or loss of business opportunity, goodwill or reputation.</p>

            <H id="viruses" />
            <p>We do not guarantee that the Website will be secure or free from bugs or viruses. You are responsible for configuring your own technology to access the Website, and you should use your own virus protection software.</p>

            <H id="data" />
            <p>We process personal data about you, including the details you give us when you ask to be matched with an agency, in line with our <Link href="/privacy">privacy notice</Link>. Our privacy notice also explains how we use cookies and how to change your cookie choices. Please read it to understand how we handle your information. TRG Digital Ltd is registered with the Information Commissioner’s Office (registration ZC221613).</p>

            <H id="agencies" />
            <p>These Terms cover families and other visitors using the Website. Care agencies that receive enquiries through {BRAND.name} do so under a separate agreement with us. If you’d like to receive enquiries, see our <Link href="/for-agencies">information for care agencies</Link>.</p>

            <H id="law" />
            <p>These Terms, their subject matter and their formation are governed by the law of England and Wales. You and we both agree that the courts of England and Wales have exclusive jurisdiction, except that if you are a consumer living in Scotland or Northern Ireland, you may also bring proceedings in your home courts.</p>

            <H id="contact" />
            <p>To contact us, please email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or write to us at:</p>
            <p>TRG Digital Ltd trading as {BRAND.name}<br />{ADDRESS}</p>
            <p>Thank you for using {BRAND.name}.</p>
          </article>
        </div>
      </div></section>
    </>
  )
}
