// Rebuilds public/data/towns.json for the service area map: town and city names with a centre point,
// taken as the average location of the care providers CareAssura lists in each town (care homes
// and home care agencies). A name used in two places (e.g. Newport) is kept only where its
// providers sit close together, so a label never lands between two towns.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const env = Object.fromEntries(fs.readFileSync(path.join(os.homedir(), 'carecompass/.env.local'), 'utf8')
  .split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim().replace(/^"|"$/g, '')]))
const DB_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL
const KEY = env.SUPABASE_SERVICE_ROLE_KEY

const rows = []
for (let from = 0; ; from += 1000) {
  const r = await fetch(`${DB_URL}/rest/v1/care_homes?select=town,county,lat,lng&status=eq.published&lat=not.is.null&town=neq.&order=id`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Range: `${from}-${from + 999}`, 'Range-Unit': 'items' },
  })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  const page = await r.json()
  rows.push(...page)
  if (page.length < 1000) break
}

const tidy = (t) => t.trim().replace(/\s+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b(Upon|On|In|Under|The|And|Le|By|Next)\b/g, (w) => w.toLowerCase())
const spread = (pts) => {
  const ml = pts.reduce((s, p) => s + p.lat, 0) / pts.length, mg = pts.reduce((s, p) => s + p.lng, 0) / pts.length
  const sd = Math.sqrt(pts.reduce((s, p) => s + (p.lat - ml) ** 2 + ((p.lng - mg) * 0.62) ** 2, 0) / pts.length)
  return { lat: ml, lng: mg, sd }
}
const byName = new Map()
for (const h of rows) {
  if (!h.town || !(h.lat > 49.8 && h.lat < 55.9 && h.lng > -6.5 && h.lng < 1.9)) continue
  const k = tidy(h.town)
  if (!byName.has(k)) byName.set(k, [])
  byName.get(k).push(h)
}
const towns = []
for (const [name, pts] of byName) {
  if (pts.length < 3) continue
  const all = spread(pts)
  // One place: keep it. Otherwise split by council area and keep only tight groups.
  const groups = all.sd < 0.12 ? [pts] : [...Map.groupBy(pts, (p) => p.county).values()]
  for (const g of groups) {
    if (g.length < 3) continue
    const s = spread(g)
    if (s.sd < 0.12) towns.push([name, Math.round(s.lat * 1000), Math.round(s.lng * 1000), g.length])
  }
}
towns.sort((a, b) => b[3] - a[3])
fs.mkdirSync(new URL('../public/data/', import.meta.url), { recursive: true })
fs.writeFileSync(new URL('../public/data/towns.json', import.meta.url), JSON.stringify(towns))
console.log(rows.length, 'providers ->', towns.length, 'towns; top:', towns.slice(0, 6).map((t) => t[0]).join(', '))
