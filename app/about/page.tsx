import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BRAND, HONEST } from '@/lib/site'
import { AUTHOR } from '@/lib/author'
import { TOTAL_AGENCIES } from '@/lib/areas'
import { Crumbs, CtaBand, Faqs } from '@/components/Blocks'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { Legwork } from '@/components/Legwork'
import { altFor, withSeo } from '@/lib/cms'
import { AUTHOR_ID, JsonLd, ORG_ID } from '@/components/JsonLd'

const BASE_META: Metadata = {
  title: 'About us',
  description: 'Hello Hattie is a free service that matches families in England with one CQC-registered home care agency near them. Who we are, how we work and how we’re paid.',
  alternates: { canonical: '/about' },
}

export async function generateMetadata() { return withSeo('/about', BASE_META) }

export default async function About() {
  return (
    <>
      <section className="section costs-hero"><div className="in">
        <div className="costs-hero-grid">
          <div className="costs-hero-copy">
            <Crumbs items={[{ label: 'About us' }]} />
            <p className="eyebrow">About {BRAND.name}</p>
            <h1>Finding care at home shouldn’t mean a ring-round</h1>
            <p className="lede">{BRAND.name} is a free service for families in England. You tell us once what’s needed, and we match you with one CQC-registered home care agency that covers your postcode and can take on new clients.</p>
          </div>
          <figure className="hero-photo">
            <Image src="/images/hero-home.jpg" alt={await altFor('/images/hero-home.jpg', 'A smiling carer holding hands with an older woman in her living room')} width={1800} height={1092} priority sizes="(max-width: 900px) 100vw, 640px" />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div><p>“Hattie isn’t one person. She’s the friendly name for our matching service.”</p><small>From {TOTAL_AGENCIES.toLocaleString('en-GB')} agencies on the CQC register</small></div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="region-intro">
          <div className="prose">
            <p className="eyebrow">Why we started</p>
            <h2>Families deserve an easier first step</h2>
            <p>When a parent needs help at home, it often happens suddenly: a fall, a hospital stay, a diagnosis. Families then face searching online, phoning agency after agency and telling the same story again and again, often to be told “sorry, we’re full”.</p>
            <p>At the same time, many good local agencies are hard to find online. They’re busy caring for people, not running adverts. We built {BRAND.name} to bring the two together: one short conversation for the family, and a real, local enquiry for an agency that has room to help.</p>
            <p>We don’t provide care ourselves and we don’t employ carers. The agency you’re matched with provides the care and agrees everything with you directly.</p>
          </div>
          <div className="about-author card">
            <Image src={AUTHOR.photo} alt={`${AUTHOR.name}, ${AUTHOR.role.toLowerCase()} of ${BRAND.name}`} width={120} height={120} />
            <div>
              <p className="eyebrow">Who’s behind {BRAND.name}</p>
              <h3>{AUTHOR.name}, {AUTHOR.role}</h3>
              <p>{AUTHOR.bio}</p>
            </div>
          </div>
        </div>
      </div></section>

      <Legwork />

      <section className="section"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '62ch' }}>
          <p className="eyebrow">Our promises to families</p>
          <h2>What you can expect from us</h2>
        </div>
        <div className="work three">
          <div className="card"><span className="num">01</span><h3>One agency, never a list</h3><p>Your details go to one agency only. We never pass them to a list of companies or sell them on.</p></div>
          <div className="card"><span className="num">02</span><h3>Only registered agencies</h3><p>Every agency we match is registered with the Care Quality Commission, the independent regulator for care in England.</p></div>
          <div className="card"><span className="num">03</span><h3>No medical questions</h3><p>We only ask about the care arrangements: the type of care, the hours, how soon and how it will be paid for.</p></div>
          <div className="card"><span className="num">04</span><h3>Free, with no obligation</h3><p>You never pay us anything, and you don’t have to go ahead with the agency we match you with.</p></div>
          <div className="card"><span className="num">05</span><h3>Plain, honest information</h3><p>Our guides use official sources such as GOV.UK, the NHS and the CQC, and we say where a figure comes from.</p></div>
          <div className="card"><span className="num">06</span><h3>Your choice respected</h3><p>Changed your mind? Email us and we’ll tell the agency not to contact you, and we won’t pass your details to anyone else.</p></div>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <DarkFeature eyebrow="Being open with you" title="How we’re paid"
          pills={['Free for families', 'Agencies pay per introduction', 'Each enquiry goes to one agency']}
          image={{ src: '/images/agency-desk.jpg', brief: await altFor('/images/agency-desk.jpg', 'A care manager smiling on a headset at her desk') }}>
          <p>{HONEST}</p>
          <p>Agencies choose the postcode areas and types of care they cover, and pay for each family we introduce. That’s how the service stays free for you.</p>
          <p><Link href="/for-agencies">Information for care agencies</Link></p>
        </DarkFeature>
      </div></section>

      <section className="section"><div className="in">
        <StoryPanel eyebrow="Get in touch" title="Questions, feedback or a change of mind"
          image={{ src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home' }}
          ticks={[`Email: ${BRAND.email}`, 'Suite Ra01, 195-197 Wood Street, London, E17 3NU', `${BRAND.name} is a service of TRG Digital Ltd, company 11731704, registered in England`, 'ICO registration ZC221613']}
          cta={{ href: '/how-it-works', label: 'How matching works' }}>
          <p>We’d love to hear from you, whether it’s a question about the service, feedback on an agency, or a request to stop an agency contacting you.</p>
        </StoryPanel>
      </div></section>

      <Faqs band faqs={[
        { q: 'Is Hello Hattie a care agency?', a: 'No. We’re a free matching service. We don’t employ carers or provide care. The agency you’re matched with provides the care and agrees the details with you.' },
        { q: 'Who runs Hello Hattie?', a: `${BRAND.name} is a service of TRG Digital Ltd, a UK company registered in England (company 11731704) and registered with the Information Commissioner’s Office (ZC221613).` },
        { q: 'How do you choose the agency?', a: 'The agency must be registered with the CQC, cover the postcode where care is needed, offer the type of care you asked for and have told us it can take on new clients.' },
        { q: 'Do you cover Scotland, Wales or Northern Ireland?', a: 'Not at the moment. We match families with agencies in England, where home care agencies are registered and inspected by the Care Quality Commission.' },
      ]} />
      <JsonLd data={{ '@graph': [
        { '@type': 'AboutPage', '@id': `${BRAND.url}/about#page`, url: `${BRAND.url}/about`, name: `About ${BRAND.name}`, about: { '@id': ORG_ID }, mainEntity: { '@id': ORG_ID } },
        { '@type': 'Person', '@id': AUTHOR_ID, name: AUTHOR.name, jobTitle: AUTHOR.role, description: AUTHOR.bio, image: `${BRAND.url}${AUTHOR.photo}`, url: `${BRAND.url}/about`, worksFor: { '@id': ORG_ID }, knowsAbout: ['Home care', 'Live-in care', 'Care homes', 'Arranging care for older people', 'Paying for care in England'] },
      ] }} />
      <CtaBand />
    </>
  )
}
