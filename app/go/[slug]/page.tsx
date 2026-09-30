import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LANDINGS, cleanLoc, landingBySlug } from '@/content/landings'
import { serviceBySlug } from '@/content/services'
import { SERVICE_IMAGES } from '@/content/service-images'
import { Faqs } from '@/components/Blocks'
import { StoryPanel } from '@/components/Feature'
import { HeroMatch } from '@/components/HeroMatch'
import { MatchLink } from '@/components/MatchLink'
import { TOTAL_AGENCIES } from '@/lib/areas'

// PPC landing template. No site navigation (the header and footer links are hidden for .go-page),
// the matching form in the hero, and nothing that sends a paid visitor elsewhere. Never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } }
export function generateStaticParams() { return LANDINGS.map((l) => ({ slug: l.slug })) }

export default function GoPage({ params, searchParams }: { params: { slug: string }; searchParams: { loc?: string } }) {
  const l = landingBySlug(params.slug)
  if (!l) notFound()
  const s = serviceBySlug(l.service)
  const img = SERVICE_IMAGES[l.service]
  const loc = cleanLoc(searchParams.loc)
  const h1 = l.h1.replace('{loc}', loc ? ` in ${loc}` : '')
  return (
    <div className="go-page">
      <section className="go-hero"><div className="in">
        <div className="go-copy">
          <p className="eyebrow">Free matching for families{loc ? ` · ${loc}` : ''}</p>
          <h1>{h1}</h1>
          <p className="lede">{l.sub}</p>
          <ul className="checklist">{l.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <figure className="go-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img?.main.src ?? '/images/hero-home.jpg'} alt={img?.main.brief ?? ''} width={800} height={600} />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div><p>“Your details go to one trusted local agency, never to a list.”</p><small>Hattie’s promise</small></div>
            </figcaption>
          </figure>
        </div>
        <HeroMatch title={`Find ${s?.name.toLowerCase() ?? 'care'}${loc ? ` in ${loc}` : ' near you'}`} service={l.quiz} />
      </div></section>

      <section className="go-strip"><div className="in">
        <div><b>Free</b><span>for families, always</span></div>
        <div><b>2 minutes</b><span>to tell us what’s needed</span></div>
        <div><b>One agency</b><span>matched to you, never a list</span></div>
        <div><b>{TOTAL_AGENCIES.toLocaleString('en-GB')}</b><span>agencies on the CQC register</span></div>
      </div></section>

      <section className="section"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}><h2>How it works</h2></div>
        <div className="work three">
          <div className="card"><span className="num">01</span><h3>Tell us what’s needed</h3><p>A few short questions about the care, the hours and how soon. We never ask about medical conditions.</p></div>
          <div className="card"><span className="num">02</span><h3>We find your match</h3><p>A CQC-registered agency that covers your postcode, offers this care and can take on new clients.</p></div>
          <div className="card"><span className="num">03</span><h3>They call you</h3><p>Talk it through, arrange an assessment and get a written quote. There’s no obligation to go ahead.</p></div>
        </div>
      </div></section>

      {s && img && (
        <section className="section band"><div className="in">
          <StoryPanel eyebrow={s.name} title="What carers can help with" image={img.side} ticks={s.whatCarersDo.slice(0, 5)}
            cta={<p><MatchLink>Get matched, it’s free</MatchLink></p>}>
            <p>{s.whatItIs[0]}</p>
          </StoryPanel>
        </div></section>
      )}

      <Faqs faqs={[
        { q: 'Is it really free?', a: 'Yes. Families never pay us anything. The agency pays us when we introduce you.' },
        { q: 'Who will contact me?', a: 'One CQC-registered agency that covers your postcode and offers the care you need. Your details go to that agency only.' },
        ...(s?.faqs.slice(0, 3) ?? []),
      ]} />

      <section className="go-final"><div className="in">
        <h2>Find {s?.name.toLowerCase() ?? 'care'}{loc ? ` in ${loc}` : ' near you'}</h2>
        <p>Free for families, with no obligation. It takes about 2 minutes.</p>
        <MatchLink className="btn hi">Get matched now</MatchLink>
      </div></section>
    </div>
  )
}
