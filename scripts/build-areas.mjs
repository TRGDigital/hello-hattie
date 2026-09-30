// Rebuilds data/areas.json from the CareAssura database: one row per council area with its region
// and home care agency counts by CQC rating. Counts only: the site never names an agency.
// Reads CareAssura's credentials from ~/carecompass/.env.local at run time; nothing is stored here.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const env = Object.fromEntries(fs.readFileSync(path.join(os.homedir(), 'carecompass/.env.local'), 'utf8')
  .split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim().replace(/^"|"$/g, '')]))
const DB_URL = env.SUPABASE_URL || env.VITE_SUPABASE_URL
const KEY = env.SUPABASE_SERVICE_ROLE_KEY

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const rows = []
for (let from = 0; ; from += 1000) {
  const r = await fetch(`${DB_URL}/rest/v1/care_homes?select=county,county_slug,region,cqc_rating&type_homecare=eq.true&status=eq.published&county_slug=not.is.null&order=id`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Range: `${from}-${from + 999}`, 'Range-Unit': 'items' },
  })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  const page = await r.json()
  rows.push(...page)
  if (page.length < 1000) break
}

const by = new Map()
for (const h of rows) {
  if (!h.region || h.region === 'Wales') continue // England only: the site matches CQC-registered agencies
  const a = by.get(h.county_slug) ?? { name: h.county, slug: h.county_slug, region: h.region, regionSlug: slug(h.region), total: 0, outstanding: 0, good: 0, requiresImprovement: 0, inadequate: 0, notRated: 0 }
  a.total++
  if (h.cqc_rating === 'outstanding') a.outstanding++
  else if (h.cqc_rating === 'good') a.good++
  else if (h.cqc_rating === 'requires_improvement') a.requiresImprovement++
  else if (h.cqc_rating === 'inadequate') a.inadequate++
  else a.notRated++
  by.set(h.county_slug, a)
}
// Council names as CQC stores them ("Herefordshire, County of") read oddly on a page.
const tidy = (n) => n.replace(/^(.*), County of$/, '$1').replace(/^(.*), City of$/, '$1').replace(/^Kingston upon Hull$/, 'Hull')
const areas = [...by.values()].map((a) => ({ ...a, name: tidy(a.name) })).sort((x, y) => x.region.localeCompare(y.region) || x.name.localeCompare(y.name))
fs.writeFileSync(new URL('../data/areas.json', import.meta.url), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), source: 'CareAssura (CQC register)', totalAgencies: areas.reduce((n, a) => n + a.total, 0), areas }, null, 1))
console.log(rows.length, 'rows ->', areas.length, 'areas,', areas.reduce((n, a) => n + a.total, 0), 'agencies')
