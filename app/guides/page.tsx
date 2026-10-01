import type { Metadata } from 'next'
import { getArticles, withSeo } from '@/lib/cms'
import { CtaBand, Crumbs } from '@/components/Blocks'
import { PostBrowser } from '@/components/PostBrowser'
import { StoryPanel } from '@/components/Feature'

const BASE: Metadata = { title: 'Guides to arranging care at home', description: 'Plain guides for families: choosing an agency, live-in care or a care home, care after hospital and more.', alternates: { canonical: '/guides' } }

export const revalidate = 3600
export async function generateMetadata() { return withSeo('/guides', BASE) }

export default async function Guides() {
  const ARTICLES = await getArticles()
  const guides = ARTICLES.filter((a) => a.kind === 'guide')
  return (
    <>
      <section className="blog-head"><div className="in">
        <Crumbs items={[{ label: 'Guides' }]} />
        <div className="blog-title">
          <p className="eyebrow">Guides for families</p>
          <h1>Plain answers for arranging care at home</h1>
          <p className="lede">The questions families ask most, answered in a few minutes each: which care suits, how to choose an agency, and what to do after a hospital stay.</p>
        </div>
      </div></section>
      <section className="section" style={{ paddingTop: 12 }}><div className="in">
        <PostBrowser posts={guides} />
      </div></section>
      <section className="section band"><div className="in">
        <StoryPanel eyebrow="Not sure where to start?" title="Answer five questions and we’ll suggest a type of care"
          image={{ src: '/images/care-dementia.jpg', brief: 'A carer and an older woman looking through a photo album together' }}
          ticks={['Takes about a minute', 'Nothing is saved or sent', 'Explains why each type of care may suit']}
          cta={{ href: '/tools/which-care-is-right', label: 'Which care is right?' }}>
          <p>Our free tool asks about the help needed, nights, living arrangements and space at home, then points you to the type of care that is a good place to start.</p>
        </StoryPanel>
      </div></section>
      <CtaBand />
    </>
  )
}
