import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { adminRpc } from '@/lib/admin-db'
import { getAlts, type ArticleRow } from '@/lib/cms'
import { ArticleEditor, type EditorArticle } from '@/components/admin/ArticleEditor'
import manifest from '@/lib/image-manifest.json'

const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'

export default async function EditArticle({ params, searchParams }: { params: { slug: string }; searchParams: { kind?: string } }) {
  requireAdmin()
  const isNew = params.slug === 'new'
  const [row, list, alts, uploads] = await Promise.all([
    isNew ? null : adminRpc<ArticleRow | null>('article_get', { slug: params.slug }),
    adminRpc<{ category: string | null }[]>('articles_list'),
    getAlts(),
    fetch(`${DB}/rest/v1/hh_image_alts?select=src,alt&uploaded=eq.true&order=updated_at.desc`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, cache: 'no-store' }).then((r) => r.json()).catch(() => []),
  ])
  if (!isNew && !row) notFound()
  const kind = (['blog', 'guide', 'cost'].includes(searchParams.kind ?? '') ? searchParams.kind : 'blog') as EditorArticle['kind']
  const initial: EditorArticle = row ? {
    kind: row.kind, slug: row.slug, title: row.title, meta_title: row.meta_title, meta_description: row.meta_description, summary: row.summary,
    category: row.category ?? '', image_src: row.image_src ?? '', image_brief: row.image_brief ?? '', status: row.status,
    sections: row.sections, faqs: row.faqs, sources: row.sources,
  } : {
    kind, slug: '', title: '', meta_title: '', meta_description: '', summary: '', category: '', image_src: '', image_brief: '', status: 'draft',
    sections: [{ heading: '', paragraphs: [''] }], faqs: [], sources: [],
  }
  const categories = Array.from(new Set(list.map((r) => r.category).filter(Boolean))) as string[]
  const images = [
    ...(uploads as { src: string; alt: string }[]),
    ...manifest.map((m) => ({ src: m.src, alt: alts[m.src] || m.defaultAlt })),
  ]
  return (
    <div className="adm-page">
      <header className="adm-head"><div><Link href="/admin/articles" className="muted">← All articles</Link><h1>{isNew ? 'New article' : row!.title}</h1></div></header>
      <ArticleEditor initial={initial} isNew={isNew} categories={categories} images={images} />
    </div>
  )
}
