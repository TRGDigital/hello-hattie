import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICES, serviceBySlug } from '@/content/services'
import { REGIONS, regionBySlug } from '@/lib/areas'
import { CtaBand, PageHero, Trust } from '@/components/Blocks'
import { HeroMatch } from '@/components/HeroMatch'
import { quizService } from '../page'

export const dynamicParams = false
export function generateStaticParams() {
  return SERVICES.filter((s) => s.areaPages).flatMap((s) => REGIONS.map((r) => ({ service: s.slug, region: r.slug })))
}
export function generateMetadata({ params }: { params: { service: string; region: string } }): Metadata {
  const s = serviceBySlug(params.service); const r = regionBySlug(params.region)
  if (!s || !r) return {}
  return { title: `${s.name} in ${r.name}`, description: `Find CQC-registered ${s.name.toLowerCase()} agencies in ${r.name}. ${r.total.toLocaleString('en-GB')} home care agencies across ${r.areas.length} council areas. Free matching.`, alternates: { canonical: `/${s.slug}/${r.slug}` } }
}

export default function RegionPage({ params }: { params: { service: string; region: string } }) {
  const s = serviceBySlug(params.service); const r = regionBySlug(params.region)
  if (!s || !r || !s.areaPages) notFound()
  const areas = [...r.areas].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <>
      <PageHero crumbs={[{ href: '/types-of-care', label: 'Types of care' }, { href: `/${s.slug}`, label: s.name }, { label: r.name }]}
        title={`${s.name} in ${r.name}`}
        intro={`There are ${r.total.toLocaleString('en-GB')} CQC-registered home care agencies across ${r.areas.length} council areas in ${r.name}. Tell us what’s needed and we’ll match you with a registered agency that covers your postcode.`}
        aside={<HeroMatch title={`Find ${s.name.toLowerCase()} in ${r.name}`} service={quizService(s.slug)} place={r.name} />}>
        <Trust />
      </PageHero>
      <section className="section"><div className="in">
        <h2>Choose your area</h2>
        <div className="table-wrap"><table>
          <thead><tr><th scope="col">Council area</th><th scope="col">Home care agencies</th><th scope="col">Rated Good or Outstanding</th></tr></thead>
          <tbody>{areas.map((a) => (
            <tr key={a.slug}><td><Link href={`/${s.slug}/${r.slug}/${a.slug}`}>{a.name}</Link></td><td>{a.total}</td><td>{a.good + a.outstanding}</td></tr>
          ))}</tbody>
        </table></div>
        <p className="small muted">Agencies registered in each council area, from the CQC register. Many also cover neighbouring areas.</p>
      </div></section>
      <CtaBand service={quizService(s.slug)} />
    </>
  )
}
