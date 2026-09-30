import type { Metadata } from 'next'
import Link from 'next/link'
import { ARTICLES } from '@/content/articles'
import { CtaBand, Crumbs } from '@/components/Blocks'
import { PostBrowser } from '@/components/PostBrowser'
import { categoryOf } from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Blog: advice for families arranging care at home',
  description: 'Practical, plain-English advice for families arranging care at home: choosing an agency, assessments, costs and difficult conversations.',
  alternates: { canonical: '/blog' },
}

export default function Blog() {
  // Newest first: blog posts, then guides and cost pages, so the page is useful from day one.
  const all = [...ARTICLES].sort((a, b) => (a.kind === 'blog' ? 0 : 1) - (b.kind === 'blog' ? 0 : 1) || b.updated.localeCompare(a.updated))
  const topics = Array.from(new Set(all.map(categoryOf))).map((t) => ({ t, n: all.filter((a) => categoryOf(a) === t).length }))
  return (
    <>
      <section className="blog-head"><div className="in">
        <Crumbs items={[{ label: 'Blog' }]} />
        <div className="blog-title">
          <p className="eyebrow">The Hello Hattie blog</p>
          <h1>Advice for families arranging care at home</h1>
          <p className="lede">Plain, practical articles on choosing an agency, what to expect, paying for care and the conversations that come with it.</p>
        </div>
        <div className="topic-cards">
          {topics.slice(0, 4).map(({ t, n }) => (
            <div className="topic-card" key={t}><span className="eyebrow">Topic</span><b>{t}</b><span className="small muted">{n} {n === 1 ? 'article' : 'articles'}</span></div>
          ))}
        </div>
      </div></section>
      <section className="section" style={{ paddingTop: 12 }}><div className="in">
        <PostBrowser posts={all} />
      </div></section>
      <section className="section band"><div className="in">
        <div className="head-row"><h2>Prefer a quick answer?</h2><span><Link href="/guides">Guides</Link> · <Link href="/costs">Costs</Link> · <Link href="/tools">Tools</Link></span></div>
        <p className="muted" style={{ maxWidth: '65ch' }}>Our guides cover the essentials in a few minutes, and the free tools help you estimate costs and see which type of care may suit.</p>
      </div></section>
      <CtaBand />
    </>
  )
}
