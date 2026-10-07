'use client'
import { useMemo, useState, useTransition } from 'react'
import { saveIntro, setIntroStatus } from '@/app/admin/actions'
import type { IntroRow } from '@/lib/cms'

type Row = IntroRow & { title: string }
const TABS = [['draft', 'Waiting for review'], ['published', 'Published'], ['rejected', 'Rejected']] as const
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length

function Item({ row, onChange }: { row: Row; onChange: (r: Row) => void }) {
  const [text, setText] = useState(row.intro)
  const [msg, setMsg] = useState('')
  const [busy, start] = useTransition()
  const dirty = text !== row.intro
  const save = async () => { const r = await saveIntro(row.path, text); setMsg(r.error ?? (r.problems?.length ? `Saved, but: ${r.problems.join(' ')}` : 'Saved.')); if (!r.error) onChange({ ...row, intro: text.trim() }) }
  const status = (s: Row['status']) => start(async () => {
    if (dirty) await save()
    await setIntroStatus([row.path], s)
    onChange({ ...row, intro: text.trim(), status: s, published_at: s === 'published' ? new Date().toISOString() : null })
  })
  return (
    <div className="adm-card" style={{ display: 'grid', gap: 10 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
        <b>{row.title}</b><small className="muted">{row.path}</small>
        <span className={`adm-pill${row.status === 'published' ? ' published' : ''}`}>{row.status}</span>
        <small className="muted">Drafted {new Date(row.drafted_at).toLocaleDateString('en-GB')}{row.drafted_by ? ` by ${row.drafted_by}` : ''}</small>
      </div>
      <label className="field adm-field"><span className="adm-label">Intro<span className={`adm-count${words(text) > 200 || words(text) < 90 ? ' over' : ''}`}>{words(text)} words</span></span>
        <textarea rows={8} value={text} onChange={(e) => { setText(e.target.value); setMsg('') }} /></label>
      <div className="adm-seo-btns">
        {row.status !== 'published' && <button className="btn" disabled={busy} onClick={() => status('published')}>{busy ? 'Working…' : 'Publish and release page'}</button>}
        {dirty && <button className="btn ghost" disabled={busy} onClick={() => start(save)}>Save changes</button>}
        {row.status === 'draft' && <button className="btn ghost" disabled={busy} onClick={() => status('rejected')}>Reject</button>}
        {row.status === 'published' && <button className="btn ghost" disabled={busy} onClick={() => status('draft')}>Unpublish</button>}
        {row.status === 'rejected' && <button className="btn ghost" disabled={busy} onClick={() => status('draft')}>Back to review</button>}
        <a href={`/admin/preview?path=${encodeURIComponent(row.path)}`} target="_blank" rel="noopener" className="linkish">Preview on the page ↗</a>
        {msg && <span className="adm-ok">{msg}</span>}
      </div>
    </div>
  )
}

export function IntroQueue({ rows: initial }: { rows: Row[] }) {
  const [rows, setRows] = useState(initial)
  const [tab, setTab] = useState<Row['status']>('draft')
  const [q, setQ] = useState('')
  const [busy, start] = useTransition()
  const shown = useMemo(() => rows.filter((r) => r.status === tab && (!q || `${r.title} ${r.path}`.toLowerCase().includes(q.toLowerCase().trim()))), [rows, tab, q])
  const update = (n: Row) => setRows((xs) => xs.map((x) => (x.path === n.path ? n : x)))
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="adm-card adm-filter">
        <input type="search" placeholder="Search, e.g. kent or live-in" value={q} onChange={(e) => setQ(e.target.value)} />
        <nav className="adm-tabs">{TABS.map(([k, l]) => <button key={k} className={k === tab ? 'on' : ''} onClick={() => setTab(k)}>{l} ({rows.filter((r) => r.status === k).length})</button>)}</nav>
        {tab === 'draft' && shown.length > 1 && (
          <button className="btn ghost" disabled={busy} onClick={() => {
            if (!window.confirm(`Publish all ${shown.length} drafts shown and release those pages?`)) return
            start(async () => { await setIntroStatus(shown.map((r) => r.path), 'published'); setRows((xs) => xs.map((x) => (shown.some((s) => s.path === x.path) ? { ...x, status: 'published', published_at: new Date().toISOString() } : x))) })
          }}>{busy ? 'Publishing…' : `Publish all ${shown.length} shown`}</button>
        )}
      </div>
      {shown.length === 0 && <p className="muted">Nothing here.</p>}
      {shown.slice(0, 150).map((r) => <Item key={r.path} row={r} onChange={update} />)}
    </div>
  )
}
