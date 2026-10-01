// One-off: copy the articles from content/*.ts into the CMS database (hh_articles), published.
// Safe to re-run: it upserts by kind and slug. Run: npx tsx scripts/cms/seed-articles.mts
import { ARTICLES } from '../../content/articles.ts'
const DB = 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'
const secret = process.env.HH_ADMIN_SECRET
if (!secret) throw new Error('HH_ADMIN_SECRET not set')
for (const a of ARTICLES) {
  const r = await fetch(`${DB}/rest/v1/rpc/hh_admin`, {
    method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p: { secret, action: 'article_save', a: {
      kind: a.kind, slug: a.slug, title: a.title, meta_title: a.metaTitle, meta_description: a.metaDescription, summary: a.summary,
      category: a.category ?? '', image_src: a.image?.src ?? '', image_brief: a.image?.brief ?? '', sections: a.sections, faqs: a.faqs,
      sources: a.sources ?? [], status: 'published', published_at: `${a.updated}T09:00:00Z`,
    } } }),
  })
  console.log(r.ok ? 'ok ' : 'FAIL', a.kind, a.slug, r.ok ? '' : await r.text())
}
