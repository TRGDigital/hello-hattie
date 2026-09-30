import Link from 'next/link'
import type { Article } from '@/content/types'
import { ARTICLES, articlePath, readMins } from '@/content/articles'
import { BRAND } from '@/lib/site'
import { AUTHOR } from '@/lib/author'
import { Crumbs, CtaBand, Faqs } from '@/components/Blocks'
import { ArticleCard, categoryOf, fmtDate } from '@/components/ArticleCard'
import { MatchLink } from '@/components/MatchLink'
import { PostSidebar } from '@/components/PostSidebar'
import { makeLinker } from '@/lib/autolink'
import { Slot } from '@/components/Slot'

const idOf = (h: string) => h.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Blog-post layout used by blog posts, guides and cost pages. */
export function ArticleView({ a, crumb }: { a: Article; crumb: { href: string; label: string } }) {
  // Related reading: same topic first, then the same kind, then anything else.
  const others = ARTICLES.filter((x) => x.slug !== a.slug)
  const related = [...others.filter((x) => categoryOf(x) === categoryOf(a)), ...others.filter((x) => x.kind === a.kind), ...others]
    .filter((x, i, all) => all.findIndex((y) => y.slug === x.slug) === i).slice(0, 3)
  const midAt = Math.min(2, a.sections.length - 1)
  const link = makeLinker(articlePath(a))
  const allLabel = a.kind === 'blog' ? 'All posts' : a.kind === 'cost' ? 'All cost guides' : 'All guides'
  return (
    <>
      <section className="post-wrap"><div className="in">
        <Crumbs items={[crumb, { label: a.title }]} />
        <div className="post-layout">
          <article className="post-col post-body">
            <Link className="post-back" href={crumb.href}>← {allLabel}</Link>
            <p className="post-meta"><span className="chip">{categoryOf(a)}</span><span>{readMins(a)} min read</span><span>Updated {fmtDate(a.updated)}</span></p>
            <h1>{a.title}</h1>
            <div className="author">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AUTHOR.photo} alt="" width={56} height={56} />
              <div><p><b>Written by {AUTHOR.name}</b>, {AUTHOR.role}</p><p className="bio">{AUTHOR.bio}</p></div>
            </div>
            <Slot className="post-hero" brief={a.image?.brief ?? a.title} src={a.image?.src} sizes="(max-width: 1000px) 100vw, 880px" priority />
            <p className="post-lede">{a.summary}</p>
            {a.sections.length > 2 && (
              <nav className="toc" aria-label="On this page">
                <p className="eyebrow">On this page</p>
                <ol>{a.sections.map((s) => <li key={s.heading}><a href={`#${idOf(s.heading)}`}>{s.heading}</a></li>)}</ol>
              </nav>
            )}
            {a.sections.map((s, i) => (
              <div key={s.heading} className="post-sec">
                <h2 id={idOf(s.heading)}>{s.heading}</h2>
                {s.paragraphs.map((p) => <p key={p}>{link(p)}</p>)}
                {s.bullets && <ul className="checklist">{s.bullets.map((b) => <li key={b}>{link(b)}</li>)}</ul>}
                {i === midAt && a.sections.length > 3 && (
                  <aside className="post-cta">
                    <p className="eyebrow">Free for families</p>
                    <h3>Want help finding a good local agency?</h3>
                    <p>Tell us what’s needed and we’ll match you with a CQC-registered agency that covers your postcode.</p>
                    <p><MatchLink className="btn">Get matched, it’s free</MatchLink></p>
                  </aside>
                )}
              </div>
            ))}
            {a.sources && a.sources.length > 0 && (
              <aside className="source post-sources" aria-label="Sources"><b>Sources</b>{a.sources.map((s) => <a key={s.url} href={s.url} rel="noopener" target="_blank">{s.label}</a>)}</aside>
            )}
            <aside className="post-end">
              <div>
                <h2>Ready to find care at home?</h2>
                <p>It takes about 2 minutes, it’s free, and there’s no obligation to go ahead.</p>
              </div>
              <MatchLink className="btn">Get matched</MatchLink>
            </aside>
          </article>
          <PostSidebar />
        </div>
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': a.kind === 'blog' ? 'BlogPosting' : 'Article',
        headline: a.title, description: a.metaDescription, datePublished: a.updated, dateModified: a.updated, inLanguage: 'en-GB',
        mainEntityOfPage: `${BRAND.url}${articlePath(a)}`,
        ...(a.image?.src ? { image: `${BRAND.url}${a.image.src}` } : {}),
        author: { '@type': 'Person', name: AUTHOR.name, jobTitle: AUTHOR.role },
        publisher: { '@id': `${BRAND.url}/#org` },
      }) }} />
      <Faqs faqs={a.faqs} band />

      <section className="section"><div className="in">
        <div className="head-row"><h2>Keep reading</h2><Link href="/blog">All posts</Link></div>
        <div className="post-grid">{related.map((r) => <ArticleCard key={r.kind + r.slug} a={r} />)}</div>
      </div></section>
      <CtaBand />
    </>
  )
}
