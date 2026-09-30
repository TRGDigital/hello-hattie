import Link from 'next/link'
import type { Article } from '@/content/types'
import { CtaBand, Faqs, PageHero } from '@/components/Blocks'

export function ArticleView({ a, crumb }: { a: Article; crumb: { href: string; label: string } }) {
  const updated = new Date(a.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <>
      <PageHero crumbs={[crumb, { label: a.title }]} title={a.title} intro={a.summary}>
        <p className="small muted">Updated {updated}</p>
      </PageHero>
      <section className="section"><div className="in">
        <article className="prose">
          {a.sections.map((s) => (
            <section key={s.heading} style={{ display: 'grid', gap: 14 }}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
              {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </section>
          ))}
          <p><Link className="btn" href="/get-matched">Get matched with local agencies</Link></p>
          {a.sources && a.sources.length > 0 && (
            <aside className="source" aria-label="Sources"><b>Sources:</b> {a.sources.map((s, i) => <span key={s.url}>{i ? ' · ' : ''}<a href={s.url} rel="noopener" target="_blank">{s.label}</a></span>)}</aside>
          )}
        </article>
      </div></section>
      <Faqs faqs={a.faqs} />
      <CtaBand />
    </>
  )
}
