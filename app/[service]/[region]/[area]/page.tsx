import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { AREAS, AREAS_GENERATED, areaBySlugs, regionBySlug } from '@/lib/areas'
import { FIGURES, gbp } from '@/lib/figures'
import { CtaBand, Faqs, PageHero, Trust } from '@/components/Blocks'
import { HeroMatch } from '@/components/HeroMatch'
import { quizService } from '../../page'

export const dynamicParams = false
export function generateStaticParams() {
  return SERVICES.filter((s) => s.areaPages).flatMap((s) => AREAS.map((a) => ({ service: s.slug, region: a.regionSlug, area: a.slug })))
}
export function generateMetadata({ params }: { params: { service: string; region: string; area: string } }): Metadata {
  const s = serviceBySlug(params.service); const a = areaBySlugs(params.region, params.area)
  if (!s || !a) return {}
  return {
    title: `${s.name} in ${a.name}`,
    description: `${a.total} CQC-registered home care agencies are registered in ${a.name}. Find ${s.name.toLowerCase()} near you, free and with no obligation.`,
    alternates: { canonical: `/${s.slug}/${a.regionSlug}/${a.slug}` },
  }
}

const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0)

export default function AreaPage({ params }: { params: { service: string; region: string; area: string } }) {
  const s = serviceBySlug(params.service); const a = areaBySlugs(params.region, params.area); const r = regionBySlug(params.region)
  if (!s || !a || !r || !s.areaPages) notFound()
  const svc = s.name.toLowerCase()
  const inspected = a.total - a.notRated
  const goodPlus = a.good + a.outstanding
  const rInspected = r.areas.reduce((n, x) => n + x.total - x.notRated, 0)
  const rGood = r.areas.reduce((n, x) => n + x.good + x.outstanding, 0)
  const rank = [...r.areas].sort((x, y) => y.total - x.total).findIndex((x) => x.slug === a.slug) + 1
  const nearby = r.areas.filter((x) => x.slug !== a.slug).sort((x, y) => y.total - x.total).slice(0, 8)
  const others = SERVICES.filter((x) => x.areaPages && x.slug !== s.slug)
  const c = FIGURES.capitalLimits
  const faqs = [
    { q: `How many home care agencies are there in ${a.name}?`, a: `${a.total} CQC-registered home care agencies are registered in ${a.name}. Of the ${inspected} that have been inspected, ${goodPlus} are rated Good or Outstanding. Agencies based nearby may also cover your area.` },
    { q: `How much does ${svc} cost in ${a.name}?`, a: `Prices depend on the hours, the type of care and the agency. The agencies we match you with will give you a written quote after an assessment. Our cost guide and calculator can help you plan a budget first.` },
    { q: `Can ${a.name} council help pay for care at home?`, a: `The council can assess the care needs of anyone who asks. If you have savings over ${gbp(c.upper, 0)}, not counting the home you live in, you will usually pay for care yourself. Below that, the council may help, depending on your income and savings.` },
    { q: `How quickly can ${svc} start in ${a.name}?`, a: `It depends on the agencies’ availability. When you tell us when care is needed, we pass that on, so the agencies can say straight away whether they can meet it.` },
  ]
  return (
    <>
      <PageHero crumbs={[{ href: `/${s.slug}`, label: s.name }, { href: `/${s.slug}/${r.slug}`, label: r.name }, { label: a.name }]}
        title={`${s.name} in ${a.name}`}
        intro={`There are ${a.total} CQC-registered home care agencies registered in ${a.name}. Tell us what’s needed and we’ll match you with registered agencies that cover your postcode, free and with no obligation.`}
        aside={<HeroMatch title={`Find ${svc} in ${a.name}`} service={quizService(s.slug)} place={a.name} />}>
        <Trust />
      </PageHero>

      <section className="section"><div className="in">
        <div className="stats">
          <div className="stat"><b>{a.total}</b><span>home care agencies registered in {a.name}</span></div>
          <div className="stat"><b>{goodPlus}</b><span>rated Good or Outstanding, {pct(goodPlus, inspected)}% of those inspected</span></div>
          <div className="stat"><b>{a.notRated}</b><span>newer agencies not yet rated by the CQC</span></div>
        </div>
        <p className="small muted">From the CQC register, {AREAS_GENERATED}. {a.name} has the {rank === 1 ? 'most' : `${rank}${['th', 'st', 'nd', 'rd'][rank % 10 > 3 || [11, 12, 13].includes(rank % 100) ? 0 : rank % 10]} most`} home care agencies of the {r.areas.length} council areas in {r.name}, where {pct(rGood, rInspected)}% of inspected agencies are rated Good or Outstanding.</p>
      </div></section>

      <section className="section band"><div className="in">
        <div className="grid-2">
          <div className="prose">
            <h2>Arranging {svc} in {a.name}</h2>
            <p>{s.whatItIs[0]}</p>
            <p>When you use our free matching, we look for agencies registered with the Care Quality Commission that cover your postcode in {a.name} and offer {svc}. The best matched of them will call you to talk it through, usually after arranging an assessment.</p>
            <p>Before you choose, you can read each agency’s latest inspection report on the CQC website. Our guide to <Link href="/guides/choosing-a-home-care-agency">choosing a home care agency</Link> lists the questions worth asking.</p>
          </div>
          <div className="panel hi">
            <h2>Help with paying in {a.name}</h2>
            <p>The council for {a.name} can assess care needs for anyone who asks, and then look at finances. In England, if savings are over {gbp(c.upper, 0)} you will usually pay for your own care; below {gbp(c.lower, 0)} the council may meet more of the cost, subject to income.</p>
            <p>{FIGURES.homeNotCounted.text}</p>
            <p><Link href="/tools/funding-checker">Check what help you might get</Link></p>
          </div>
        </div>
      </div></section>

      <Faqs faqs={faqs} title={`${s.name} in ${a.name}: questions families ask`} />

      <section className="section band"><div className="in">
        <h2>Nearby areas</h2>
        <ul className="chips">{nearby.map((x) => <li key={x.slug}><Link href={`/${s.slug}/${x.regionSlug}/${x.slug}`}>{s.name} in {x.name}</Link></li>)}</ul>
        <h2 style={{ marginTop: 12 }}>Other care in {a.name}</h2>
        <ul className="chips">{others.map((x) => <li key={x.slug}><Link href={`/${x.slug}/${a.regionSlug}/${a.slug}`}>{x.name} in {a.name}</Link></li>)}</ul>
      </div></section>

      <CtaBand service={quizService(s.slug)} title={`Find ${svc} in ${a.name}`} />
    </>
  )
}
