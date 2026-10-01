import type { Metadata } from 'next'
import { BRAND, HONEST } from '@/lib/site'
import { CtaBand, PageHero } from '@/components/Blocks'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'About us', alternates: { canonical: '/about' } }

export async function generateMetadata() { return withSeo('/about', BASE_META) }

export default function About() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About us' }]} title={`About ${BRAND.name}`} intro="We help families across England find care at home, quickly and without the ring-round." />
      <section className="section"><div className="in"><div className="prose">
        <p>Finding a home care agency usually means searching, phoning round and repeating the same story several times, often while a parent is waiting to come home from hospital. We make that one short conversation.</p>
        <p>{HONEST}</p>
        <p>{BRAND.name} is run by TRG Digital Ltd, a company that has worked with UK care providers for many years.</p>
      </div></div></section>
      <CtaBand />
    </>
  )
}
