import type { Metadata } from 'next'
import { BRAND } from '@/lib/site'
import { PageHero } from '@/components/Blocks'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = { title: 'Terms of use', description: 'The terms for using Hello Hattie, the free service that matches families in England with a CQC-registered home care agency.', alternates: { canonical: '/terms' } }

export async function generateMetadata() { return withSeo('/terms', BASE_META) }

export default function Terms() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Terms' }]} title="Terms of use" intro="Draft for legal review." />
      <section className="section"><div className="in"><div className="prose">
        <p>{BRAND.name} is a trading name of TRG Digital Ltd (company number 11731704). We provide a free service that introduces families to home care agencies. We are not a care provider and we do not employ carers.</p>
        <p>Any care you arrange is agreed directly between you and the agency you choose, under that agency’s own terms. We don’t recommend or guarantee any agency. Please check an agency’s registration and latest inspection report on the Care Quality Commission website before you decide.</p>
        <p>The information on this website, including our guides and tools, is general information, not financial, legal or medical advice. Figures are shown with their sources and may change.</p>
        <p>These terms are governed by the law of England and Wales.</p>
      </div></div></section>
    </>
  )
}
