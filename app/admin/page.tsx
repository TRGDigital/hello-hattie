import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'
import { adminRpc } from '@/lib/admin-db'
import { getSeo, getAlts } from '@/lib/cms'
import manifest from '@/lib/image-manifest.json'

type Row = { kind: string; slug: string; title: string; status: string; updated_at: string }
const KIND: Record<string, string> = { blog: 'Blog post', guide: 'Guide', cost: 'Cost guide' }
const PATH: Record<string, string> = { blog: '/blog', guide: '/guides', cost: '/costs' }

export default async function Dashboard() {
  requireAdmin()
  const [rows, seo, alts] = await Promise.all([adminRpc<Row[]>('articles_list'), getSeo(), getAlts()])
  const published = rows.filter((r) => r.status === 'published').length
  const missingAlt = manifest.filter((m) => !alts[m.src] && !m.defaultAlt).length
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Dashboard</h1><Link className="btn" href="/admin/articles/new">New article</Link></header>
      <div className="adm-stats">
        <Link href="/admin/articles"><b>{published}</b><span>published articles</span></Link>
        <Link href="/admin/articles?status=draft"><b>{rows.length - published}</b><span>drafts</span></Link>
        <Link href="/admin/seo"><b>{Object.keys(seo).length}</b><span>pages with custom SEO</span></Link>
        <Link href="/admin/images"><b>{missingAlt}</b><span>photos missing alt text</span></Link>
      </div>
      <section className="adm-card">
        <h2>Recently edited</h2>
        <table className="adm-table"><tbody>
          {rows.slice(0, 8).map((r) => (
            <tr key={r.slug}>
              <td><Link href={`/admin/articles/${r.slug}`}>{r.title}</Link><small>{KIND[r.kind]} · {PATH[r.kind]}/{r.slug}</small></td>
              <td><span className={`adm-pill ${r.status}`}>{r.status === 'published' ? 'Published' : 'Draft'}</span></td>
              <td className="muted">{new Date(r.updated_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
            </tr>
          ))}
        </tbody></table>
      </section>
      <section className="adm-card adm-help">
        <h2>How changes go live</h2>
        <p>When you save, the site refreshes that content within about a minute. No deploy needed. Drafts are only visible to you: use <b>Preview</b> in the editor to see one on the real page.</p>
      </section>
    </div>
  )
}
