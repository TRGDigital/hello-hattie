import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { SERVICE_IMAGES } from '@/content/service-images'
import { REGIONS } from '@/lib/areas'
import { CtaBand, Faqs, PageHero, Trust } from '@/components/Blocks'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { HeroMatch } from '@/components/HeroMatch'
import { MatchLink } from '@/components/MatchLink'
import { Slot } from '@/components/Slot'

export const dynamicParams = false
export function generateStaticParams() { return SERVICES.map((s) => ({ service: s.slug })) }
export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = serviceBySlug(params.service)
  return s ? { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `/${s.slug}` } } : {}
}

// Which quiz answer each page's service maps to.
export const quizService = (slug: string) =>
  slug === 'live-in-care' || slug === '24-hour-care' ? 'live_in' : slug === 'overnight-care' ? 'overnight' : 'visiting'

// Headings for the three "How it's arranged" paragraphs, which always run: first steps, planning, once care begins.
const STEPS = ['First steps', 'Planning the care', 'Once care begins']

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = serviceBySlug(params.service)
  if (!s) notFound()
  const img = SERVICE_IMAGES[s.slug]
  const related = s.related.map(serviceBySlug).filter(Boolean)
  const lower = s.name.toLowerCase()
  return (
    <>
      <PageHero crumbs={[{ href: '/types-of-care', label: 'Types of care' }, { label: s.name }]} title={s.name} intro={s.intro}
        aside={<HeroMatch title={`Find ${lower} near you`} service={quizService(s.slug)} />}>
        <Trust />
      </PageHero>

      <section className="section"><div className="in">
        <div className="grid-2" style={{ alignItems: 'center', gap: 'clamp(24px, 4vw, 56px)' }}>
          <div className="prose">
            <p className="eyebrow">{s.name}</p>
            <h2>What is {lower}?</h2>
            {s.whatItIs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <figure className="svc-photo">
            <Slot brief={img.main.brief} src={img.main.src} />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div>
                <p>“{s.short}”</p>
                <small>Hattie’s short version</small>
              </div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <h2>What carers can help with</h2>
          <p className="muted">Every care plan is different. These are the things carers most often help with.</p>
        </div>
        <ul className="helps">{s.whatCarersDo.map((x) => <li key={x}>{x}</li>)}</ul>
      </div></section>

      <section className="section"><div className="in">
        <StoryPanel eyebrow="Is it right for you?" title={`${s.name} can suit you if`} image={img.side} ticks={s.suits}
          cta={<p><MatchLink>Find {lower} near you</MatchLink></p>} />
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '60ch' }}>
          <h2>How it’s arranged</h2>
          <p className="muted">What usually happens once an agency gets in touch.</p>
        </div>
        <div className="work three">
          {s.howItWorks.map((p, i) => (
            <div className="card" key={p}><span className="num">{String(i + 1).padStart(2, '0')}</span><h3>{STEPS[i] ?? `Step ${i + 1}`}</h3><p>{p}</p></div>
          ))}
        </div>
      </div></section>

      <section className="section"><div className="in">
        <DarkFeature eyebrow="Costs and funding" title={`What does ${lower} cost?`}
          pills={[<Link key="c" href="/costs">Care costs guide</Link>, <Link key="k" href="/tools/care-cost-calculator">Cost calculator</Link>, <Link key="f" href="/tools/funding-checker">Funding checker</Link>]}
          image={{ src: '/images/why-kitchen.jpg', brief: 'A family and their carer chatting over tea around the kitchen table' }}>
          <p>{s.costNote}</p>
        </DarkFeature>
      </div></section>

      {s.areaPages && (
        <section className="section band"><div className="in">
          <h2>{s.name} by area</h2>
          <p className="muted" style={{ maxWidth: '65ch' }}>Choose your region to see registered agencies and {lower} in your council area.</p>
          <ul className="chips">{REGIONS.map((r) => <li key={r.slug}><Link href={`/${s.slug}/${r.slug}`}>{r.name}</Link></li>)}</ul>
        </div></section>
      )}

      <Faqs faqs={s.faqs} band={!s.areaPages} />

      {related.length > 0 && (
        <section className={s.areaPages ? 'section band' : 'section'}><div className="in">
          <div className="head-row"><h2>Other types of care</h2><Link href="/types-of-care">See all types of care</Link></div>
          <div className="care-cards three">
            {related.map((r) => {
              const ri = SERVICE_IMAGES[r!.slug]
              return (
                <Link className="care-card" key={r!.slug} href={`/${r!.slug}`}>
                  <Slot brief={ri.main.brief} src={ri.main.src} />
                  <div className="body"><h3>{r!.name}</h3><p>{r!.short}</p><span className="go">Find out more →</span></div>
                </Link>
              )
            })}
          </div>
        </div></section>
      )}
      <CtaBand service={quizService(s.slug)} title={`Find ${lower} near you`} />
    </>
  )
}
