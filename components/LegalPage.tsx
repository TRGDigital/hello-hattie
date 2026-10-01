import type { ReactNode } from 'react'
import { Crumbs } from '@/components/Blocks'

/** Layout shared by the terms, privacy notice and cookie policy: title and date, a sticky contents
 *  list, and the text. Pass the sections in order; each becomes "1. Heading" with its own anchor. */
export function LegalPage({ title, updated, intro, sections }: {
  title: string; updated: string; intro?: ReactNode
  sections: { id: string; heading: string; body: ReactNode }[]
}) {
  return (
    <>
      <section className="blog-head"><div className="in">
        <Crumbs items={[{ label: title }]} />
        <div className="blog-title">
          <p className="eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="lede">Last updated: {updated}</p>
          {intro}
        </div>
      </div></section>
      <section className="section" style={{ paddingTop: 8 }}><div className="in">
        <div className="legal">
          <nav className="toc legal-toc" aria-label="Contents">
            <p className="eyebrow">Contents</p>
            <ol>{sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>)}</ol>
          </nav>
          <article className="prose legal-body">
            {sections.map((s, i) => (
              <section key={s.id} className="legal-sec">
                <h2 id={s.id}>{i + 1}. {s.heading}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </div></section>
    </>
  )
}
