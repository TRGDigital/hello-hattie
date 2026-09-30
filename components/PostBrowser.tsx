'use client'
import { useMemo, useState } from 'react'
import type { Article } from '@/content/types'
import { ArticleCard, categoryOf } from '@/components/ArticleCard'

/** Search box, topic chips, a featured post and the grid. Filtering happens in the browser. */
export function PostBrowser({ posts, featured = true }: { posts: Article[]; featured?: boolean }) {
  const [q, setQ] = useState('')
  const [topic, setTopic] = useState('All')
  const topics = useMemo(() => ['All', ...Array.from(new Set(posts.map(categoryOf)))], [posts])
  const shown = posts.filter((a) => (topic === 'All' || categoryOf(a) === topic)
    && (!q.trim() || `${a.title} ${a.summary}`.toLowerCase().includes(q.trim().toLowerCase())))
  const filtering = topic !== 'All' || q.trim() !== ''
  const [lead, ...rest] = shown
  return (
    <div className="browser">
      <div className="browser-bar">
        <input type="search" placeholder="Search articles" aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="topic-chips" role="group" aria-label="Topics">
          {topics.map((t) => <button key={t} type="button" aria-pressed={t === topic} onClick={() => setTopic(t)}>{t}</button>)}
        </div>
      </div>
      {!shown.length && <p className="muted">Nothing matches that yet. Try another word or topic.</p>}
      {featured && !filtering && lead ? <>
        <ArticleCard a={lead} wide />
        {rest.length > 0 && <div className="post-grid">{rest.map((a) => <ArticleCard key={a.kind + a.slug} a={a} />)}</div>}
      </> : shown.length > 0 && <div className="post-grid">{shown.map((a) => <ArticleCard key={a.kind + a.slug} a={a} />)}</div>}
    </div>
  )
}
