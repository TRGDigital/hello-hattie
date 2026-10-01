'use client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { deleteArticle, saveArticle, uploadImage, type ArticleInput } from '@/app/admin/actions'

// The article editor. Inputs live in small components defined OUTSIDE the editor (never inside its
// render), so typing never remounts a field and loses focus.

type Kind = 'blog' | 'guide' | 'cost'
type Sec = { heading: string; ptext: string; btext: string }
type Img = { src: string; alt: string }
export type EditorArticle = {
  kind: Kind; slug: string; title: string; meta_title: string; meta_description: string; summary: string; category: string
  image_src: string; image_brief: string; status: 'draft' | 'published'
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]; faqs: { q: string; a: string }[]; sources: { label: string; url: string }[]
}
const PATH: Record<Kind, string> = { blog: '/blog', guide: '/guides', cost: '/costs' }
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)

function Count({ n, max }: { n: number; max: number }) {
  return <span className={`adm-count${n > max ? ' over' : n > max * 0.9 ? ' near' : ''}`}>{n} / {max}</span>
}
function Text({ label, value, onChange, hint, max, rows }: { label: string; value: string; onChange: (v: string) => void; hint?: string; max?: number; rows?: number }) {
  return (
    <label className="field adm-field">
      <span className="adm-label">{label}{max ? <Count n={value.length} max={max} /> : null}</span>
      {rows ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} /> : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />}
      {hint && <span className="hint">{hint}</span>}
    </label>
  )
}
function SectionCard({ s, i, n, onChange, onMove, onDelete }: { s: Sec; i: number; n: number; onChange: (s: Sec) => void; onMove: (d: number) => void; onDelete: () => void }) {
  return (
    <div className="adm-sec">
      <div className="adm-sec-bar">
        <b>Section {i + 1}</b>
        <span>
          <button type="button" className="linkish" disabled={i === 0} onClick={() => onMove(-1)}>Move up</button>{' · '}
          <button type="button" className="linkish" disabled={i === n - 1} onClick={() => onMove(1)}>Move down</button>{' · '}
          <button type="button" className="linkish danger" onClick={onDelete}>Remove</button>
        </span>
      </div>
      <Text label="Heading (a question families ask works well)" value={s.heading} onChange={(v) => onChange({ ...s, heading: v })} />
      <Text label="Paragraphs" rows={7} value={s.ptext} onChange={(v) => onChange({ ...s, ptext: v })} hint="Leave a blank line between paragraphs." />
      <Text label="Bullet points (optional)" rows={4} value={s.btext} onChange={(v) => onChange({ ...s, btext: v })} hint="One bullet per line." />
    </div>
  )
}

export function ArticleEditor({ initial, isNew, categories, images }: { initial: EditorArticle; isNew: boolean; categories: string[]; images: Img[] }) {
  const router = useRouter()
  const [a, setA] = useState(initial)
  const [secs, setSecs] = useState<Sec[]>(initial.sections.map((s) => ({ heading: s.heading, ptext: s.paragraphs.join('\n\n'), btext: (s.bullets ?? []).join('\n') })))
  const [slugTouched, setSlugTouched] = useState(!isNew)
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({})
  const [busy, start] = useTransition()
  const [confirmDel, setConfirmDel] = useState(false)
  const [lib, setLib] = useState(images)
  const [up, setUp] = useState<{ file?: File; alt: string; busy?: boolean; err?: string }>({ alt: '' })
  const set = <K extends keyof EditorArticle>(k: K, v: EditorArticle[K]) => { setA((x) => ({ ...x, [k]: v })); setMsg({}) }

  const toInput = (status: EditorArticle['status']): ArticleInput => ({
    ...a, status, category: a.category || null, image_src: a.image_src || null, image_brief: a.image_brief || null, old_slug: isNew ? '' : initial.slug,
    sections: secs.map((s) => ({ heading: s.heading, paragraphs: s.ptext.split(/\n\s*\n/), bullets: s.btext.split('\n') })),
  })
  const save = (status: EditorArticle['status'], then?: (slug: string) => void) => start(async () => {
    const r = await saveArticle(toInput(status))
    if (r.error) { setMsg({ err: r.error }); return }
    setA((x) => ({ ...x, status }))
    setMsg({ ok: status === 'published' ? 'Published. The live page updates within about a minute.' : 'Saved as a draft.' })
    if (r.slug && (isNew || r.slug !== initial.slug)) router.replace(`/admin/articles/${r.slug}`)
    then?.(r.slug!)
  })
  const preview = () => save(a.status, (slug) => window.open(`/admin/preview?path=${PATH[a.kind]}/${slug}`, '_blank'))

  async function doUpload() {
    if (!up.file) return setUp((u) => ({ ...u, err: 'Choose a photo first.' }))
    setUp((u) => ({ ...u, busy: true, err: '' }))
    const fd = new FormData(); fd.set('file', up.file); fd.set('alt', up.alt)
    const r = await uploadImage(fd)
    if (r.error || !r.src) return setUp((u) => ({ ...u, busy: false, err: r.error }))
    setLib((l) => [{ src: r.src!, alt: up.alt }, ...l]); setA((x) => ({ ...x, image_src: r.src!, image_brief: up.alt })); setUp({ alt: '' })
  }

  const url = `www.hellohattie.co.uk${PATH[a.kind]}/${a.slug || 'your-article'}`
  const gTitle = (a.meta_title || a.title || 'Your title') + ' | Hello Hattie'
  const words = [a.summary, ...secs.flatMap((s) => [s.heading, s.ptext, s.btext])].join(' ').split(/\s+/).filter(Boolean).length

  return (
    <div className="adm-editor">
      <div className="adm-editor-main">
        <section className="adm-card">
          <Text label="Title" value={a.title} onChange={(v) => { set('title', v); if (!slugTouched) set('slug', slugify(v)) }} max={70} />
          <label className="field adm-field"><span className="adm-label">Web address</span>
            <div className="adm-slug"><span>{PATH[a.kind]}/</span><input value={a.slug} onChange={(e) => { setSlugTouched(true); set('slug', slugify(e.target.value)) }} /></div>
            {!isNew && a.slug !== initial.slug && <span className="hint warn">Changing the address of a live article breaks links to the old one.</span>}
          </label>
          <div className="adm-row">
            <label className="field adm-field"><span className="adm-label">Type</span>
              <select value={a.kind} onChange={(e) => set('kind', e.target.value as Kind)}><option value="blog">Blog post</option><option value="guide">Guide</option><option value="cost">Cost guide</option></select></label>
            <label className="field adm-field"><span className="adm-label">Topic</span>
              <input list="adm-cats" value={a.category} onChange={(e) => set('category', e.target.value)} placeholder="e.g. Choosing care" />
              <datalist id="adm-cats">{categories.map((c) => <option key={c} value={c} />)}</datalist></label>
          </div>
          <Text label="Summary" rows={3} value={a.summary} onChange={(v) => set('summary', v)} hint="Shown under the title and on article cards. One or two sentences." max={260} />
        </section>

        <section className="adm-card">
          <h2>Lead photo</h2>
          <div className="adm-photo">
            {a.image_src ? <img src={a.image_src} alt="" /> : <div className="adm-photo-empty">No photo yet</div>}
            <div className="adm-photo-side">
              <label className="field adm-field"><span className="adm-label">Choose from your photos</span>
                <select value={a.image_src} onChange={(e) => { const m = lib.find((x) => x.src === e.target.value); set('image_src', e.target.value); if (m) set('image_brief', m.alt) }}>
                  <option value="">No photo</option>
                  {lib.map((m) => <option key={m.src} value={m.src}>{m.alt || m.src.split('/').pop()}</option>)}
                </select></label>
              <Text label="Alt text" value={a.image_brief} onChange={(v) => set('image_brief', v)} hint="Describe the photo for people using screen readers, e.g. “A carer and an older woman looking through a photo album”." max={125} />
              <details className="adm-upload"><summary>Upload a new photo</summary>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setUp((u) => ({ ...u, file: e.target.files?.[0] }))} />
                <input type="text" placeholder="Alt text for the new photo" value={up.alt} onChange={(e) => setUp((u) => ({ ...u, alt: e.target.value }))} />
                {up.err && <p className="error">{up.err}</p>}
                <button type="button" className="btn ghost" disabled={up.busy} onClick={doUpload}>{up.busy ? 'Uploading…' : 'Upload and use'}</button>
                <span className="hint">Landscape photos work best (about 1600 by 1000). JPG under 8MB.</span>
              </details>
            </div>
          </div>
        </section>

        <section className="adm-card">
          <div className="adm-head small"><h2>Sections</h2><span className="muted">{words.toLocaleString('en-GB')} words</span></div>
          {secs.map((s, i) => (
            <SectionCard key={i} s={s} i={i} n={secs.length}
              onChange={(ns) => { setSecs((xs) => xs.map((x, j) => (j === i ? ns : x))); setMsg({}) }}
              onMove={(d) => setSecs((xs) => { const c = [...xs]; [c[i], c[i + d]] = [c[i + d], c[i]]; return c })}
              onDelete={() => setSecs((xs) => xs.filter((_, j) => j !== i))} />
          ))}
          <button type="button" className="btn ghost" onClick={() => setSecs((xs) => [...xs, { heading: '', ptext: '', btext: '' }])}>Add a section</button>
        </section>

        <section className="adm-card">
          <h2>Questions families ask (FAQs)</h2>
          {a.faqs.map((f, i) => (
            <div key={i} className="adm-faq">
              <input placeholder="Question" value={f.q} onChange={(e) => set('faqs', a.faqs.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} />
              <textarea rows={3} placeholder="Answer" value={f.a} onChange={(e) => set('faqs', a.faqs.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} />
              <button type="button" className="linkish danger" onClick={() => set('faqs', a.faqs.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <button type="button" className="btn ghost" onClick={() => set('faqs', [...a.faqs, { q: '', a: '' }])}>Add a question</button>
        </section>

        <section className="adm-card">
          <h2>Sources</h2>
          <p className="hint">Official pages that back up the facts in the article (GOV.UK, NHS, CQC and so on).</p>
          {a.sources.map((s, i) => (
            <div key={i} className="adm-src">
              <input placeholder="Name, e.g. NHS, Carer’s assessments" value={s.label} onChange={(e) => set('sources', a.sources.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
              <input placeholder="https://" value={s.url} onChange={(e) => set('sources', a.sources.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} />
              <button type="button" className="linkish danger" onClick={() => set('sources', a.sources.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <button type="button" className="btn ghost" onClick={() => set('sources', [...a.sources, { label: '', url: '' }])}>Add a source</button>
        </section>
      </div>

      <aside className="adm-editor-side">
        <div className="adm-card adm-publish">
          <p>Status: <span className={`adm-pill ${a.status}`}>{a.status === 'published' ? 'Published' : 'Draft'}</span></p>
          {msg.ok && <p className="adm-ok">{msg.ok}</p>}
          {msg.err && <p className="error" role="alert">{msg.err}</p>}
          {a.status === 'published' ? (
            <>
              <button className="btn" disabled={busy} onClick={() => save('published')}>{busy ? 'Saving…' : 'Update live article'}</button>
              <button className="btn ghost" disabled={busy} onClick={() => save('draft')}>Unpublish (back to draft)</button>
              <a className="linkish" href={`${PATH[a.kind]}/${initial.slug}`} target="_blank" rel="noopener">View live page ↗</a>
            </>
          ) : (
            <>
              <button className="btn" disabled={busy} onClick={() => save('published')}>{busy ? 'Saving…' : 'Publish'}</button>
              <button className="btn ghost" disabled={busy} onClick={() => save('draft')}>Save draft</button>
            </>
          )}
          <button className="btn ghost" disabled={busy || !a.slug} onClick={preview}>Save and preview ↗</button>
          {!isNew && (confirmDel
            ? <span className="adm-del">Delete for good? <button className="linkish danger" onClick={() => start(() => deleteArticle(initial.slug))}>Yes, delete</button> · <button className="linkish" onClick={() => setConfirmDel(false)}>Cancel</button></span>
            : <button className="linkish danger" onClick={() => setConfirmDel(true)}>Delete article</button>)}
        </div>

        <div className="adm-card">
          <h2>Search engine listing</h2>
          <Text label="SEO title" value={a.meta_title} onChange={(v) => set('meta_title', v)} max={60} hint="Leave blank to use the article title." />
          <Text label="Meta description" rows={4} value={a.meta_description} onChange={(v) => set('meta_description', v)} max={155} hint="Leave blank to use the summary." />
          <div className="gprev">
            <span className="gprev-url">{url}</span>
            <span className="gprev-title">{gTitle.length > 62 ? gTitle.slice(0, 60) + '…' : gTitle}</span>
            <span className="gprev-desc">{(a.meta_description || a.summary || 'Your description').slice(0, 158)}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
