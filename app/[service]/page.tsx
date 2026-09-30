import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { REGIONS } from '@/lib/areas'
import { CtaBand, Faqs, PageHero, PhotoSlot, Trust } from '@/components/Blocks'
import { HeroMatch } from '@/components/HeroMatch'

export const dynamicParams = false
export function generateStaticParams() { return SERVICES.map((s) => ({ service: s.slug })) }
export function generateMetadata({ params }: { params: { service: string } }): Metadata {
  const s = serviceBySlug(params.service)
  return s ? { title: s.metaTitle, description: s.metaDescription, alternates: { canonical: `/${s.slug}` } } : {}
}

// Which quiz answer each page's service maps to.
export const quizService = (slug: string) =>
  slug === 'live-in-care' || slug === '24-hour-care' ? 'live_in' : slug === 'overnight-care' ? 'overnight' : 'visiting'

export default function ServicePage({ params }: { params: { service: string } }) {
  const s = serviceBySlug(params.service)
  if (!s) notFound()
  const related = s.related.map(serviceBySlug).filter(Boolean)
  return (
    <>
      <PageHero crumbs={[{ href: '/types-of-care', label: 'Types of care' }, { label: s.name }]} title={s.name} intro={s.intro}
        aside={<HeroMatch title={`Find ${s.name.toLowerCase()} near you`} service={quizService(s.slug)} />}>
        <Trust />
      </PageHero>

      <section className="section"><div className="in">
        <div className="grid-2">
          <div className="prose">
            <h2>What is {s.name.toLowerCase()}?</h2>
            {s.whatItIs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <PhotoSlot caption={`Photo: ${s.name.toLowerCase()} in a family home`} />
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="grid-2">
          <div className="prose"><h2>What carers can help with</h2><ul className="checklist">{s.whatCarersDo.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="prose"><h2>It can suit you if</h2><ul className="checklist">{s.suits.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="section"><div className="in">
        <div className="grid-2">
          <div className="prose"><h2>How it’s arranged</h2>{s.howItWorks.map((p) => <p key={p}>{p}</p>)}</div>
          <div className="panel hi"><h2>What does it cost?</h2><p>{s.costNote}</p><p><Link href="/costs">Care costs</Link> · <Link href="/tools/care-cost-calculator">Cost calculator</Link> · <Link href="/tools/funding-checker">Funding checker</Link></p></div>
        </div>
      </div></section>

      {s.areaPages && (
        <section className="section band"><div className="in">
          <h2>{s.name} by area</h2>
          <ul className="chips">{REGIONS.map((r) => <li key={r.slug}><Link href={`/${s.slug}/${r.slug}`}>{r.name}</Link></li>)}</ul>
        </div></section>
      )}

      <Faqs faqs={s.faqs} />

      {related.length > 0 && (
        <section className="section band"><div className="in">
          <h2>Other types of care</h2>
          <div className="grid-3">{related.map((r) => <Link className="card" key={r!.slug} href={`/${r!.slug}`}><h3>{r!.name}</h3><p>{r!.short}</p><b className="more">Find out more</b></Link>)}</div>
        </div></section>
      )}
      <CtaBand service={quizService(s.slug)} title={`Find ${s.name.toLowerCase()} near you`} />
    </>
  )
}
