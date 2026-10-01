'use client'
import { useState, useTransition } from 'react'
import { saveAlt, uploadImage } from '@/app/admin/actions'

type Item = { src: string; alt: string; defaultAlt: string; custom: boolean; uploaded: boolean; size: string }

function Card({ it, onSaved }: { it: Item; onSaved: (i: Item) => void }) {
  const [alt, setAlt] = useState(it.alt)
  const [msg, setMsg] = useState('')
  const [busy, start] = useTransition()
  const state = !it.alt ? 'missing' : it.custom ? 'custom' : 'default'
  return (
    <div className="adm-img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={it.src} alt="" loading="lazy" />
      <div className="adm-img-body">
        <span className="adm-img-meta">{it.uploaded ? 'Uploaded' : it.src.replace('/images/', '')}{it.size ? ` · ${it.size}` : ''} <span className={`adm-pill ${state === 'missing' ? 'draft' : state === 'custom' ? 'published' : ''}`}>{state === 'missing' ? 'No alt text' : state === 'custom' ? 'Custom alt' : 'Default alt'}</span></span>
        <textarea rows={3} value={alt} onChange={(e) => { setAlt(e.target.value); setMsg('') }} placeholder="Describe the photo" />
        <div className="adm-img-btns">
          <button className="btn ghost" disabled={busy || alt === it.alt} onClick={() => start(async () => { const r = await saveAlt(it.src, alt); setMsg(r.error ?? 'Saved'); if (!r.error) onSaved({ ...it, alt, custom: true }) })}>{busy ? 'Saving…' : 'Save'}</button>
          {it.uploaded && <button className="linkish" onClick={() => { navigator.clipboard?.writeText(it.src).then(() => setMsg('Link copied'), () => setMsg(it.src)) }}>Copy link</button>}
          {msg && <span className="adm-ok">{msg}</span>}
        </div>
      </div>
    </div>
  )
}

export function ImageGrid({ items: initial }: { items: Item[] }) {
  const [items, setItems] = useState(initial)
  const [file, setFile] = useState<File>()
  const [alt, setAlt] = useState('')
  const [err, setErr] = useState('')
  const [busy, start] = useTransition()
  const [filter, setFilter] = useState<'all' | 'missing' | 'uploaded'>('all')
  const shown = items.filter((i) => filter === 'all' || (filter === 'missing' ? !i.alt : i.uploaded))
  return (
    <>
      <div className="adm-card adm-upload-card">
        <h2>Upload a photo</h2>
        <div className="adm-upload-row">
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0])} />
          <input type="text" placeholder="Alt text, e.g. A carer and an older man laughing in his kitchen" value={alt} onChange={(e) => setAlt(e.target.value)} />
          <button className="btn" disabled={busy} onClick={() => start(async () => {
            setErr('')
            if (!file) return setErr('Choose a photo first.')
            const dims = await new Promise<{ w: number; h: number }>((res) => { const im = new Image(); im.onload = () => res({ w: im.naturalWidth, h: im.naturalHeight }); im.onerror = () => res({ w: 0, h: 0 }); im.src = URL.createObjectURL(file) })
            const fd = new FormData(); fd.set('file', file); fd.set('alt', alt); fd.set('width', String(dims.w || '')); fd.set('height', String(dims.h || ''))
            const r = await uploadImage(fd)
            if (r.error || !r.src) return setErr(r.error ?? 'Upload failed.')
            setItems((xs) => [{ src: r.src!, alt, defaultAlt: '', custom: true, uploaded: true, size: dims.w ? `${dims.w} × ${dims.h}` : '' }, ...xs]); setFile(undefined); setAlt('')
          })}>{busy ? 'Uploading…' : 'Upload'}</button>
        </div>
        {err && <p className="error">{err}</p>}
        <p className="hint">Uploaded photos can be used as an article’s lead photo in the article editor. JPG, PNG or WebP, under 8MB.</p>
      </div>
      <nav className="adm-tabs">
        <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({items.length})</button>
        <button className={filter === 'missing' ? 'on' : ''} onClick={() => setFilter('missing')}>Missing alt text ({items.filter((i) => !i.alt).length})</button>
        <button className={filter === 'uploaded' ? 'on' : ''} onClick={() => setFilter('uploaded')}>Uploaded ({items.filter((i) => i.uploaded).length})</button>
      </nav>
      <div className="adm-img-grid">{shown.map((it) => <Card key={it.src} it={it} onSaved={(n) => setItems((xs) => xs.map((x) => (x.src === n.src ? n : x)))} />)}</div>
    </>
  )
}
