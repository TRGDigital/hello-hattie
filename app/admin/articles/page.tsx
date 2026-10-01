import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'
import { adminRpc } from '@/lib/admin-db'

type Row = { kind: string; slug: string; title: string; category: string | null; status: string; updated_at: string; n_sections: number }
const KIND: Record<string, string> = { blog: 'Blog post', guide: 'Guide', cost: 'Cost guide' }
const PATH: Record<string, string> = { blog: '/blog', guide: '/guides', cost: '/costs' }

export default async function Articles({ searchParams }: { searchParams: { kind?: string; status?: string } }) {
  requireAdmin()
  const all = await adminRpc<Row[]>('articles_list')
  const rows = all.filter((r) => (!searchParams.kind || r.kind === searchParams.kind) && (!searchParams.status || r.status === searchParams.status))
  const tab = (q: string, label: string, on: boolean) => <Link href={`/admin/articles${q}`} className={on ? 'on' : ''}>{label}</Link>
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Articles</h1><Link className="btn" href="/admin/articles/new">New article</Link></header>
      <nav className="adm-tabs">
        {tab('', `All (${all.length})`, !searchParams.kind && !searchParams.status)}
        {tab('?kind=blog', 'Blog posts', searchParams.kind === 'blog')}
        {tab('?kind=guide', 'Guides', searchParams.kind === 'guide')}
        {tab('?kind=cost', 'Cost guides', searchParams.kind === 'cost')}
        {tab('?status=draft', 'Drafts', searchParams.status === 'draft')}
      </nav>
      <div className="adm-card">
        <table className="adm-table">
          <thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Sections</th><th>Last edited</th><th /></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug}>
                <td><Link href={`/admin/articles/${r.slug}`}><b>{r.title}</b></Link><small>{PATH[r.kind]}/{r.slug}{r.category ? ` · ${r.category}` : ''}</small></td>
                <td>{KIND[r.kind]}</td>
                <td><span className={`adm-pill ${r.status}`}>{r.status === 'published' ? 'Published' : 'Draft'}</span></td>
                <td>{r.n_sections}</td>
                <td className="muted">{new Date(r.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td><a href={r.status === 'published' ? `${PATH[r.kind]}/${r.slug}` : `/admin/preview?path=${PATH[r.kind]}/${r.slug}`} target="_blank" rel="noopener">View ↗</a></td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={6} className="muted">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
