import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICES } from '@/content/services'
import { CtaBand, PageHero } from '@/components/Blocks'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'Types of care at home', description: 'Live-in care, visiting care, overnight care, dementia care and more. What each involves and who it suits.', alternates: { canonical: '/types-of-care' } }

export async function generateMetadata() { return withSeo('/types-of-care', BASE_META) }

export default function TypesOfCare() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Types of care' }]} title="Types of care at home" intro="Care at home can be a short visit each day or a carer who lives in. Here’s what each type involves, so you can work out what might suit." />
      <section className="section"><div className="in">
        <div className="grid-3">{SERVICES.map((s) => <Link className="card" key={s.slug} href={`/${s.slug}`}><h3>{s.name}</h3><p>{s.short}</p><b className="more">Find out more</b></Link>)}</div>
        <p>Not sure which is right? Try <Link href="/tools/which-care-is-right">which type of care is right</Link>.</p>
      </div></section>
      <CtaBand />
    </>
  )
}
