import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { getArticles, getServiceImages, withSeo } from '@/lib/cms'
import { AREAS_GENERATED, REGIONS, regionBySlug } from '@/lib/areas'
import { CtaBand, Faqs, PageHero, Trust } from '@/components/Blocks'
import { ArticleCard } from '@/components/ArticleCard'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { HeroMatch } from '@/components/HeroMatch'
import { Legwork } from '@/components/Legwork'
import { MatchLink } from '@/components/MatchLink'
import { Slot } from '@/components/Slot'
import { articlesFor } from '@/lib/autolink'
import { quizService } from '../page'

export const dynamicParams = false
export function generateStaticParams() {
  return SERVICES.filter((s) => s.areaPages).flatMap((s) => REGIONS.map((r) => ({ service: s.slug, region: r.slug })))
}
function baseMeta({ params }: { params: { service: string; region: string } }): Metadata {
  const s = serviceBySlug(params.service); const r = regionBySlug(params.region)
  if (!s || !r) return {}
  return { title: `${s.name} in ${r.name}`.length > 52 ? { absolute: `${s.name} in ${r.name}` } : `${s.name} in ${r.name}`, description: `Find CQC-registered ${s.name.toLowerCase()} agencies in ${r.name}. ${r.total.toLocaleString('en-GB')} home care agencies across ${r.areas.length} council areas. Free matching.`, alternates: { canonical: `/${s.slug}/${r.slug}` } }
}

const n = (x: number) => x.toLocaleString('en-GB')

export async function generateMetadata(props: { params: { service: string; region: string } }) { return withSeo(`/${props.params.service}/${props.params.region}`, baseMeta(props)) }

export default async function RegionPage({ params }: { params: { service: string; region: string } }) {
  const IMAGES = await getServiceImages()
  const s = serviceBySlug(params.service); const r = regionBySlug(params.region)
  if (!s || !r || !s.areaPages) notFound()
  const lower = s.name.toLowerCase()
  const img = IMAGES[s.slug]
  const areas = [...r.areas].sort((a, b) => a.name.localeCompare(b.name))
  const sum = (k: 'outstanding' | 'good' | 'requiresImprovement' | 'inadequate' | 'notRated') => r.areas.reduce((t, a) => t + a[k], 0)
  const rated = { outstanding: sum('outstanding'), good: sum('good'), ri: sum('requiresImprovement'), inadequate: sum('inadequate'), notRated: sum('notRated') }
  const goodPlus = rated.outstanding + rated.good
  const biggest = [...r.areas].sort((a, b) => b.total - a.total).slice(0, 6)
  const maxArea = biggest[0]?.total || 1
  const guides = articlesFor(s.name, 3, await getArticles())
  const otherCare = SERVICES.filter((x) => x.areaPages && x.slug !== s.slug)
  const otherRegions = REGIONS.filter((x) => x.slug !== r.slug)
  const asOf = new Date(AREAS_GENERATED).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <PageHero crumbs={[{ href: '/types-of-care', label: 'Types of care' }, { href: `/${s.slug}`, label: s.name }, { label: r.name }]}
        title={`${s.name} in ${r.name}`}
        intro={`There are ${n(r.total)} CQC-registered home care agencies across ${r.areas.length} council areas in ${r.name}. Tell us what’s needed and we’ll match you with one registered agency that covers your postcode and can take on new clients.`}
        aside={<HeroMatch title={`Find ${lower} in ${r.name}`} service={quizService(s.slug)} place={r.name} />}>
        <Trust />
      </PageHero>

      <section className="go-strip"><div className="in">
        <div><b>{n(r.total)}</b><span>home care agencies in {r.name}</span></div>
        <div><b>{r.areas.length}</b><span>council areas</span></div>
        <div><b>{n(goodPlus)}</b><span>rated Good or Outstanding</span></div>
        <div><b>One agency</b><span>matched to you, never a list</span></div>
      </div></section>

      <section className="section"><div className="in">
        <div className="region-intro">
          <div className="prose">
            <p className="eyebrow">{s.name} in {r.name}</p>
            <h2>Care at home across {r.name}</h2>
            <p>{s.whatItIs[0]}</p>
            <p>Every agency we match is registered with the Care Quality Commission, covers the postcode where care is needed and has told us it can take on new clients. You tell us once, and the right agency calls you.</p>
            <p><Link href={`/${s.slug}`}>Read more about {lower}</Link></p>
          </div>
          <figure className="svc-photo">
            <Slot brief={img.main.brief} src={img.main.src} sizes="(max-width: 900px) 100vw, 560px" />
            <figcaption className="hattie-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hello-hattie-mark.svg" alt="" />
              <div><p>“Choose your council area below, or just tell me your postcode.”</p><small>{n(r.total)} agencies in {r.name}</small></div>
            </figcaption>
          </figure>
        </div>
      </div></section>

      <section className="section band"><div className="in">
        <div className="head-row"><h2>Choose your area</h2><span className="small muted">CQC register, {asOf}</span></div>
        <ul className="area-cards">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link href={`/${s.slug}/${r.slug}/${a.slug}`}>
                <b>{a.name}</b>
                <span>{n(a.total)} agencies · {n(a.good + a.outstanding)} Good or Outstanding</span>
                <span className="go">{s.name} in {a.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="small muted">Agencies registered in each council area. Many also cover neighbouring areas, which is why we match by postcode rather than council.</p>
      </div></section>

      <section className="section"><div className="in">
        <div className="grid-2 region-stats">
          <div className="card">
            <h3>How agencies in {r.name} are rated</h3>
            <div className="bars">
              {([['Outstanding', rated.outstanding], ['Good', rated.good], ['Requires improvement', rated.ri], ['Inadequate', rated.inadequate], ['Not yet rated', rated.notRated]] as [string, number][]).map(([l, v]) => (
                <div className="bar" key={l}><span>{l}</span><span className="track"><i className={`fill${l === 'Not yet rated' ? ' hi' : ''}`} style={{ width: `${(v / r.total) * 100}%` }} /></span><b>{n(v)}</b></div>
              ))}
            </div>
            <p className="small muted">“Not yet rated” usually means a newer agency waiting for its first inspection. You can read any agency’s latest report on the CQC website.</p>
          </div>
          <div className="card">
            <h3>Where the most agencies are based</h3>
            <div className="bars">
              {biggest.map((a) => (
                <div className="bar" key={a.slug}><span><Link href={`/${s.slug}/${r.slug}/${a.slug}`}>{a.name}</Link></span><span className="track"><i className="fill" style={{ width: `${(a.total / maxArea) * 100}%` }} /></span><b>{n(a.total)}</b></div>
              ))}
            </div>
            <p className="small muted">More agencies nearby usually means more choice and a better chance of finding one with space for new clients.</p>
          </div>
        </div>
      </div></section>

      <Legwork place={r.name} />

      <section className="section"><div className="in">
        <StoryPanel eyebrow={`Is ${lower} right for you?`} title={`${s.name} can suit you if`} image={img.side} ticks={s.suits}
          cta={<p><MatchLink>Find {lower} in {r.name}</MatchLink></p>} />
      </div></section>

      <section className="section band"><div className="in">
        <DarkFeature eyebrow="Costs and funding" title={`Paying for ${lower} in ${r.name}`}
          pills={[<Link key="c" href="/costs">Care costs guide</Link>, <Link key="k" href="/tools/care-cost-calculator">Cost calculator</Link>, <Link key="f" href="/tools/funding-checker">Funding checker</Link>]}
          image={{ src: '/images/guide-cost-hour.jpg', brief: 'An older couple looking through paperwork at the kitchen table with a pot of tea' }}>
          <p>{s.costNote}</p>
          <p>Your council in {r.name} can assess care needs for anyone who asks, and then look at finances to see whether it will help with the cost.</p>
        </DarkFeature>
      </div></section>

      {guides.length > 0 && (
        <section className="section"><div className="in">
          <div className="head-row"><h2>Guides about {lower}</h2><Link href="/guides">All guides</Link></div>
          <div className="post-grid">{guides.map((g) => <ArticleCard key={g.slug} a={g} />)}</div>
        </div></section>
      )}

      <Faqs band faqs={[
        { q: `How many home care agencies are there in ${r.name}?`, a: `There are ${n(r.total)} home care agencies registered with the CQC across ${r.areas.length} council areas in ${r.name}, and ${n(goodPlus)} of them are rated Good or Outstanding. Some newer agencies are still waiting for their first inspection.` },
        { q: `How do you choose an agency for me in ${r.name}?`, a: 'We match by postcode, not council area. The agency has to be registered with the CQC, cover the address where care is needed, offer the type of care you asked for and have told us it can take on new clients. Your details go to that one agency only.' },
        { q: `Can the council help pay for ${lower} in ${r.name}?`, a: 'It may. Contact the adult social care team at your council and ask for a needs assessment. If your parent is eligible, the council will then do a financial assessment to work out what it can contribute. Our funding checker gives a quick idea first.' },
        { q: 'How quickly could care start?', a: 'It depends on the agency and how much care is needed. Tell us how soon care is needed and we pass that on, so the agency can tell you straight away when they could start.' },
        ...s.faqs.slice(0, 2),
      ]} title={`${s.name} in ${r.name}: questions families ask`} />

      <section className="section"><div className="in">
        <h2>Other care in {r.name}</h2>
        <ul className="chips">{otherCare.map((x) => <li key={x.slug}><Link href={`/${x.slug}/${r.slug}`}>{x.name} in {r.name}</Link></li>)}</ul>
        <h2 style={{ marginTop: 12 }}>{s.name} in other regions</h2>
        <ul className="chips">{otherRegions.map((x) => <li key={x.slug}><Link href={`/${s.slug}/${x.slug}`}>{s.name} in {x.name}</Link></li>)}</ul>
      </div></section>

      <CtaBand service={quizService(s.slug)} title={`Find ${lower} in ${r.name}`} />
    </>
  )
}
