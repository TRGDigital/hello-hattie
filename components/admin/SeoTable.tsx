'use client'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { fetchPageMeta, saveSeo } from '@/app/admin/actions'

type Row = { path: string; group: string; title: string; description: string }
const GROUPS = ['Main pages', 'Tools', 'Articles', 'Regions', 'Council areas']

function Counter({ n, max }: { n: number; max: number }) { return <span className={`adm-count${n > max ? ' over' : n > max * 0.9 ? ' near' : ''}`}>{n} / {max}</span> }

function Editor({ row, onSaved }: { row: Row; onSaved: (r: Row) => void }) {
  const [title, setTitle] = useState(row.title)
  const [desc, setDesc] = useState(row.description)
  const [live, setLive] = useState<{ title: string; description: string } | null>(null)
  const [msg, setMsg] = useState('')
  const [busy, start] = useTransition()
  useEffect(() => { let on = true; fetchPageMeta(row.path).then((m) => on && setLive(m)); return () => { on = false } }, [row.path])
  const gTitle = title || live?.title || ''
  const gDesc = desc || live?.description || ''
  return (
    <div className="adm-seo-edit">
      <label className="field adm-field"><span className="adm-label">Title<Counter n={title.length} max={60} /></span>
        <input value={title} placeholder={live?.title ?? 'Loading the current title…'} onChange={(e) => { setTitle(e.target.value); setMsg('') }} /></label>
      <label className="field adm-field"><span className="adm-label">Meta description<Counter n={desc.length} max={155} /></span>
        <textarea rows={3} value={desc} placeholder={live?.description ?? ''} onChange={(e) => { setDesc(e.target.value); setMsg('') }} /></label>
      <div className="gprev"><span className="gprev-url">www.hellohattie.co.uk{row.path}</span><span className="gprev-title">{gTitle.length > 62 ? gTitle.slice(0, 60) + '…' : gTitle}</span><span className="gprev-desc">{gDesc.slice(0, 158)}</span></div>
      <div className="adm-seo-btns">
        <button className="btn" disabled={busy} onClick={() => start(async () => { const r = await saveSeo(row.path, title, desc); setMsg(r.error ?? 'Saved. Live within about a minute.'); if (!r.error) onSaved({ ...row, title, description: desc }) })}>{busy ? 'Saving…' : 'Save'}</button>
        {(row.title || row.description) && <button className="btn ghost" disabled={busy} onClick={() => start(async () => { await saveSeo(row.path, '', ''); setTitle(''); setDesc(''); setMsg('Reset to the page’s own title and description.'); onSaved({ ...row, title: '', description: '' }) })}>Reset to default</button>}
        <a href={row.path} target="_blank" rel="noopener" className="linkish">View page ↗</a>
        {msg && <span className="adm-ok">{msg}</span>}
      </div>
    </div>
  )
}

export function SeoTable({ rows: initial }: { rows: Row[] }) {
  const [rows, setRows] = useState(initial)
  const [q, setQ] = useState('')
  const [group, setGroup] = useState('Main pages')
  const [onlyCustom, setOnlyCustom] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  const shown = useMemo(() => rows.filter((r) => (q ? r.path.includes(q.toLowerCase().trim()) : r.group === group) && (!onlyCustom || r.title || r.description)), [rows, q, group, onlyCustom])
  return (
    <div className="adm-card">
      <div className="adm-filter">
        <input type="search" placeholder="Search all pages, e.g. wandsworth or live-in" value={q} onChange={(e) => setQ(e.target.value)} />
        {!q && <nav className="adm-tabs">{GROUPS.map((g) => <button key={g} className={g === group ? 'on' : ''} onClick={() => setGroup(g)}>{g} ({rows.filter((r) => r.group === g).length})</button>)}</nav>}
        <label className="adm-check"><input type="checkbox" checked={onlyCustom} onChange={(e) => setOnlyCustom(e.target.checked)} /> Only pages with custom SEO</label>
      </div>
      <table className="adm-table">
        <tbody>
          {shown.slice(0, 200).map((r) => (
            <tr key={r.path} className={open === r.path ? 'open' : ''}>
              <td>
                <button className="adm-rowbtn" onClick={() => setOpen(open === r.path ? null : r.path)}>
                  <b>{r.path}</b>{(r.title || r.description) ? <span className="adm-pill published">Custom</span> : <span className="adm-pill">Default</span>}
                </button>
                {r.title && <small>{r.title}</small>}
                {open === r.path && <Editor row={r} onSaved={(n) => setRows((xs) => xs.map((x) => (x.path === n.path ? n : x)))} />}
              </td>
            </tr>
          ))}
          {shown.length > 200 && <tr><td className="muted">Showing 200 of {shown.length}. Search to narrow it down.</td></tr>}
          {!shown.length && <tr><td className="muted">No pages match.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
