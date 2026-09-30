import Link from 'next/link'
import type { Article } from '@/content/types'
import { articlePath, readMins } from '@/content/articles'
import { AUTHOR } from '@/lib/author'
import { Slot } from '@/components/Slot'

export const categoryOf = (a: Article) => a.category ?? (a.kind === 'cost' ? 'Costs and funding' : 'Guides')
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/** A post card: photo, topic chip and read time, title, summary, byline and date. `wide` is the featured layout. */
export function ArticleCard({ a, wide = false }: { a: Article; wide?: boolean }) {
  return (
    <Link className={`post-card${wide ? ' wide' : ''}`} href={articlePath(a)}>
      <Slot brief={a.image?.brief ?? a.title} src={a.image?.src} sizes={wide ? '(max-width: 800px) 100vw, 700px' : '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 420px'} />
      <div className="body">
        <p className="post-meta"><span className="chip">{categoryOf(a)}</span><span>{readMins(a)} min read</span></p>
        <h3>{a.title}</h3>
        <p className="sum">{a.summary}</p>
        <p className="by"><span>{AUTHOR.name}</span><span>{fmtDate(a.updated)}</span></p>
        <span className="go">Read {a.kind === 'blog' ? 'the post' : 'the guide'} →</span>
      </div>
    </Link>
  )
}
