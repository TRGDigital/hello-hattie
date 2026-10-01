import type { Metadata } from 'next'
import Link from 'next/link'
import { articlePath, articlesFor } from '@/lib/autolink'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { AREAS, AREAS_GENERATED, areaBySlugs, regionBySlug } from '@/lib/areas'
import { FIGURES, gbp } from '@/lib/figures'
import { CtaBand, Faqs, PageHero, Trust } from '@/components/Blocks'
import { HeroMatch } from '@/components/HeroMatch'
import { Legwork } from '@/components/Legwork'
import { MatchLink } from '@/components/MatchLink'
import { Slot } from '@/components/Slot'
import { JsonLd, serviceLd } from '@/components/JsonLd'
import { StoryPanel } from '@/components/Feature'
import { getArticles, getServiceImages, withSeo } from '@/lib/cms'
import { quizService } from '../../page'

export const dynamicParams = false
export function generateStaticParams() {
  return SERVICES.filter((s) => s.areaPages).flatMap((s) => AREAS.map((a) => ({ service: s.slug, region: a.regionSlug, area: a.slug })))
}
function baseMeta({ params }: { params: { service: string; region: string; area: string } }): Metadata {
  const s = serviceBySlug(params.service); const a = areaBySlugs(params.region, params.area)
  if (!s || !a) return {}
  return {
    title: `${s.name} in ${a.name}`.length > 52 ? { absolute: `${s.name} in ${a.name}` } : `${s.name} in ${a.name}`,
    description: `${a.total} CQC-registered home care agencies are registered in ${a.name}. Find ${s.name.toLowerCase()} near you, free and with no obligation.`,
    alternates: { canonical: `/${s.slug}/${a.regionSlug}/${a.slug}` },
  }
}

const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0)

export async function generateMetadata(props: { params: { service: string; region: string; area: string } }) { return withSeo(`/${props.params.service}/${props.params.region}/${props.params.area}`, baseMeta(props)) }

export default async function AreaPage({ params }: { params: { service: string; region: string; area: string } }) {
  const IMAGES = await getServiceImages()
  const ALL = await getArticles()
  const s = serviceBySlug(params.service); const a = areaBySlugs(params.region, params.area); const r = regionBySlug(params.region)
  if (!s || !a || !r || !s.areaPages) notFound()
  const svc = s.name.toLowerCase()
  const inspected = a.total - a.notRated
  const goodPlus = a.good + a.outstanding
  const rInspected = r.areas.reduce((n, x) => n + x.total - x.notRated, 0)
  const rGood = r.areas.reduce((n, x) => n + x.good + x.outstanding, 0)
  const rank = [...r.areas].sort((x, y) => y.total - x.total).findIndex((x) => x.slug === a.slug) + 1
  // The four areas either side in the region's A to Z list (wrapping round), so every area gets the
  // same number of links from its neighbours instead of the biggest areas collecting them all.
  // Three guides, rotating through the most relevant ones so each gets links from many area pages.
  const pool = [...articlesFor(s.name, 6, ALL), ...ALL].filter((x, i, all) => all.indexOf(x) === i)
  const guides = [0, 1, 2].map((k) => pool[(AREAS.findIndex((x) => x.slug === a.slug) * 3 + k) % pool.length])
  const ring = [...r.areas].sort((x, y) => x.name.localeCompare(y.name))
  const at = ring.findIndex((x) => x.slug === a.slug)
  const img = IMAGES[s.slug]
  const nearby = ring.length <= 9 ? ring.filter((x) => x.slug !== a.slug)
    : [-4, -3, -2, -1, 1, 2, 3, 4].map((d) => ring[(at + d + ring.length) % ring.length])
  const others = SERVICES.filter((x) => x.areaPages && x.slug !== s.slug)
  const c = FIGURES.capitalLimits
  const faqs = [
    { q: `How many home care agencies are there in ${a.name}?`, a: `${a.total} CQC-registered home care agencies are registered in ${a.name}. Of the ${inspected} that have been inspected, ${goodPlus} are rated Good or Outstanding. Agencies based nearby may also cover your area.` },
    { q: `How much does ${svc} cost in ${a.name}?`, a: `Prices depend on the hours, the type of care and the agency. The agency we match you with will give you a written quote after an assessment. Our cost guide and calculator can help you plan a budget first.` },
    { q: `Can ${a.name} council help pay for care at home?`, a: `The council can assess the care needs of anyone who asks. If you have savings over ${gbp(c.upper, 0)}, not counting the home you live in, you will usually pay for care yourself. Below that, the council may help, depending on your income and savings.` },
    { q: `How quickly can ${svc} start in ${a.name}?`, a: `It depends on the agency’s availability. When you tell us when care is needed, we pass that on, so the agency can say straight away whether they can meet it.` },
  ]
  return (
    <>
      <PageHero crumbs={[{ href: `/${s.slug}`, label: s.name }, { href: `/${s.slug}/${r.slug}`, label: r.name }, { label: a.name }]}
        title={`${s.name} in ${a.name}`}
        intro={`There are ${a.total} CQC-registered home care agencies registered in ${a.name}. Tell us what’s needed and we’ll match you with a registered agency that covers your postcode, free and with no obligation.`}
        aside={<HeroMatch title={`Find ${svc} in ${a.name}`} service={quizService(s.slug)} place={a.name} />}>
        <Trust />
      </PageHero>

      <section className="section"><div className="in">
        <div className="stats">
          <div className="stat"><b>{a.total}</b><span>home care agencies registered in {a.name}</span></div>
          <div className="stat"><b>{goodPlus}</b><span>rated Good or Outstanding, {pct(goodPlus, inspected)}% of those inspected</span></div>
          <div className="stat"><b>{a.notRated}</b><span>newer agencies not yet rated by the CQC</span></div>
        </div>
        <p className="small muted">From the CQC register, {new Date(AREAS_GENERATED).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}. {a.name} has the {rank === 1 ? 'most' : `${rank}${['th', 'st', 'nd', 'rd'][rank % 10 > 3 || [11, 12, 13].includes(rank % 100) ? 0 : rank % 10]} most`} home care agencies of the {r.areas.length} council areas in {r.name}, where {pct(rGood, rInspected)}% of inspected agencies are rated Good or Outstanding.</p>
      </div></section>

      <section className="section band"><div className="in">
        <div className="region-intro">
          <div className="prose">
            <p className="eyebrow">{s.name} in {a.name}</p>
            <h2>Arranging {svc} in {a.name}</h2>
            <p>{s.whatItIs[0]}</p>
            <p>When you use our free matching, we look for an agency registered with the Care Quality Commission that covers your postcode in {a.name}, offers {svc} and has told us it can take on new clients. That agency, and only that agency, calls you to talk it through, usually before arranging an assessment.</p>
            <p><Link href={`/${s.slug}`}>Read more about {svc}</Link></p>
          </div>
          <figure className="svc-photo">
            <Slot brief={img.main.brief} src={img.main.src} sizes="(max-width: 900px) 100vw, 560px" />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div><p>“Tell me your postcode in {a.name} and I’ll find an agency that covers your street.”</p><small>{a.total} agencies registered in {a.name}</small></div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <Legwork place={a.name} />

      <section className="section"><div className="in">
        <StoryPanel eyebrow={`Is ${svc} right for you?`} title={`${s.name} can suit you if`} image={img.side} ticks={s.suits}
          cta={<p><MatchLink>Find {svc} in {a.name}</MatchLink></p>} />
      </div></section>

      <section className="section band"><div className="in">
        <div className="grid-2">
          <div className="panel hi">
            <h2>Help with paying in {a.name}</h2>
            <p>The council for {a.name} can assess care needs for anyone who asks, and then look at finances. In England, if savings are over {gbp(c.upper, 0)} you will usually pay for your own care; below {gbp(c.lower, 0)} the council may meet more of the cost, subject to income.</p>
            <p>{FIGURES.homeNotCounted.text}</p>
            <p><Link href="/tools/funding-checker">Check what help you might get</Link></p>
          </div>
          <div className="panel line">
            <h2>Before you agree to care</h2>
            <ul className="checklist">
              <li>Read the agency’s latest CQC report and check the date</li>
              <li>Ask for every rate in writing, including weekends</li>
              <li>Ask who the carers will be and how they’re introduced</li>
              <li>Check the notice period in the contract</li>
            </ul>
            <p><Link href="/blog/questions-to-ask-a-home-care-agency">Questions to ask an agency</Link> · <Link href="/downloads/hello-hattie-home-care-call-guide-2026.pdf">Free call guide (PDF)</Link></p>
          </div>
        </div>
      </div></section>

      <Faqs faqs={faqs} title={`${s.name} in ${a.name}: questions families ask`} />

      <section className="section band"><div className="in">
        <h2>Nearby areas</h2>
        <ul className="chips">{nearby.map((x) => <li key={x.slug}><Link href={`/${s.slug}/${x.regionSlug}/${x.slug}`}>{s.name} in {x.name}</Link></li>)}</ul>
        <h2 style={{ marginTop: 12 }}>Other care in {a.name}</h2>
        <ul className="chips">{others.map((x) => <li key={x.slug}><Link href={`/${x.slug}/${a.regionSlug}/${a.slug}`}>{x.name} in {a.name}</Link></li>)}</ul>
        <h2 style={{ marginTop: 12 }}>Helpful guides</h2>
        <ul className="chips">{guides.map((g) => <li key={g.slug}><Link href={articlePath(g)}>{g.title}</Link></li>)}</ul>
      </div></section>

      <JsonLd data={serviceLd({ name: s.name, description: `Free matching with a CQC-registered ${svc} agency that covers your postcode in ${a.name}.`, path: `/${s.slug}/${r.slug}/${a.slug}`, area: a.name, region: r.name })} />
      <CtaBand service={quizService(s.slug)} title={`Find ${svc} in ${a.name}`} />
    </>
  )
}
