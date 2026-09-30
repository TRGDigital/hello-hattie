import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES } from '@/content/articles'
import { CtaBand, PageHero } from '@/components/Blocks'

export const metadata: Metadata = { title: 'Guides to arranging care at home', description: 'Plain guides for families: choosing an agency, live-in care or a care home, care after hospital and more.', alternates: { canonical: '/guides' } }

export default function Guides() {
  const guides = ARTICLES.filter((a) => a.kind === 'guide')
  return (
    <>
      <PageHero crumbs={[{ label: 'Guides' }]} title="Guides for families" intro="Plain answers to the questions families ask when arranging care at home." />
      <section className="section"><div className="in">
        <div className="grid-3">{guides.map((a) => <Link className="card" key={a.slug} href={`/guides/${a.slug}`}><h3>{a.title}</h3><p>{a.summary}</p><b className="more">Read the guide</b></Link>)}</div>
      </div></section>
      <CtaBand />
    </>
  )
}
