import { requireAdmin } from '@/lib/admin-auth'
import { getAlts } from '@/lib/cms'
import manifest from '@/lib/image-manifest.json'
import { ImageGrid } from '@/components/admin/ImageGrid'

const DB = process.env.NEXT_PUBLIC_LEADS_DB_URL || 'https://bloeazbeoqtddtmjanws.supabase.co'
const KEY = process.env.NEXT_PUBLIC_LEADS_DB_KEY || 'sb_publishable_Kc5ivNM66xL8ZcTpHDUNjQ_-HX-CC3S'

export default async function Images() {
  requireAdmin()
  const [alts, uploads] = await Promise.all([
    getAlts(),
    fetch(`${DB}/rest/v1/hh_image_alts?select=src,alt,width,height&uploaded=eq.true&order=updated_at.desc`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` }, cache: 'no-store' }).then((r) => r.json()).catch(() => []),
  ])
  const items = [
    ...(uploads as { src: string; alt: string; width: number | null; height: number | null }[]).map((u) => ({ src: u.src, alt: u.alt, defaultAlt: '', custom: true, uploaded: true, size: u.width ? `${u.width} × ${u.height}` : '' })),
    ...manifest.map((m) => ({ src: m.src, alt: alts[m.src] || m.defaultAlt, defaultAlt: m.defaultAlt, custom: !!alts[m.src], uploaded: false, size: m.width ? `${m.width} × ${m.height} · ${m.kb}KB` : '' })),
  ]
  return (
    <div className="adm-page">
      <header className="adm-head"><h1>Images</h1></header>
      <p className="muted adm-intro">Alt text describes a photo for people using screen readers, and helps Google understand the page. Changes apply everywhere the photo is used, within about a minute.</p>
      <ImageGrid items={items} />
    </div>
  )
}
