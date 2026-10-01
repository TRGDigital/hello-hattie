import type { Metadata } from 'next'
import Link from 'next/link'
import { REGIONS, TOTAL_AGENCIES } from '@/lib/areas'
import { CtaBand, PageHero } from '@/components/Blocks'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'Areas we cover', description: 'Home care, live-in care and dementia care at home across England, by council area.', alternates: { canonical: '/areas' } }

export async function generateMetadata() { return withSeo('/areas', BASE_META) }

export default function Areas() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Areas we cover' }]} title="Care at home across England" intro={`We match families with CQC-registered home care agencies in every region of England, from ${TOTAL_AGENCIES.toLocaleString('en-GB')} agencies on the register.`} />
      <section className="section"><div className="in">
        {REGIONS.map((r) => (
          <div key={r.slug} id={r.slug} style={{ display: 'grid', gap: 12 }}>
            <h2>{r.name}</h2>
            <p className="muted">{r.total.toLocaleString('en-GB')} home care agencies across {r.areas.length} council areas. <Link href={`/home-care/${r.slug}`}>Home care</Link> · <Link href={`/live-in-care/${r.slug}`}>Live-in care</Link> · <Link href={`/dementia-care-at-home/${r.slug}`}>Dementia care at home</Link></p>
            <ul className="chips">{[...r.areas].sort((a, b) => a.name.localeCompare(b.name)).map((a) => <li key={a.slug}><Link href={`/home-care/${r.slug}/${a.slug}`}>{a.name}</Link></li>)}</ul>
          </div>
        ))}
      </div></section>
      <CtaBand />
    </>
  )
}
