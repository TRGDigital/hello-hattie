// Rebuilds data/area-facts.json: public local facts for every council area in data/areas.json, so
// each area page says something true about that place beyond its agency counts. Public sources
// only, no credentials:
//   ONS Open Geography   council code and centre point (Counties and Unitary Authorities, Dec 2024)
//   Nomis (ONS)          mid-year population estimates: all ages, 65+, 85+
//   OHID Fingertips      estimated dementia diagnosis rate, aged 65+ (indicator 92949, NHS England data)
//   GOV.UK               the council's own website
//   postcodes.io         which council area each town in public/data/towns.json sits in
// Nearby areas are the eight closest council centres, across region boundaries.
// Run after `npm run areas`: npm run area-facts
import fs from 'node:fs'

const areas = JSON.parse(fs.readFileSync(new URL('../data/areas.json', import.meta.url), 'utf8')).areas
const towns = JSON.parse(fs.readFileSync(new URL('../public/data/towns.json', import.meta.url), 'utf8'))
const get = async (url, as = 'json') => {
  for (let i = 0; ; i++) {
    const r = await fetch(url, { headers: { 'User-Agent': 'hellohattie.co.uk area facts' } })
    if (r.ok) return as === 'json' ? r.json() : r.text()
    if (i === 2) throw new Error(`${r.status} ${url}`)
    await new Promise((ok) => setTimeout(ok, 1500))
  }
}
const norm = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/,? (city|county) of/g, '').replace(/^kingston upon hull$/, 'hull').replace(/[^a-z]/g, '')

// 1. ONS codes and centre points
const ons = await get('https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/Counties_and_Unitary_Authorities_December_2024_Boundaries_UK_BSC/FeatureServer/0/query?where=1%3D1&outFields=CTYUA24CD,CTYUA24NM,LAT,LONG&returnGeometry=false&f=json')
const byName = new Map(ons.features.map((f) => f.attributes).filter((a) => a.CTYUA24CD.startsWith('E')).map((a) => [norm(a.CTYUA24NM), a]))
const facts = {}
for (const a of areas) {
  const o = byName.get(norm(a.name))
  if (!o) throw new Error(`No ONS match for ${a.name}`)
  facts[a.slug] = { code: o.CTYUA24CD, lat: +o.LAT.toFixed(4), lng: +o.LONG.toFixed(4) }
}
const codes = areas.map((a) => facts[a.slug].code)
const slugByCode = Object.fromEntries(areas.map((a) => [facts[a.slug].code, a.slug]))

// 2. Population (latest mid-year estimate)
const csvRows = (t) => t.trim().split('\n').slice(1).map((l) => l.split(',').map((c) => c.replace(/^"|"$/g, '')))
const popCsv = await get(`https://www.nomisweb.co.uk/api/v01/dataset/NM_2002_1.data.csv?geography=${codes.join(',')}&date=latest&gender=0&c_age=200,209,210&measures=20100&select=date_name,geography_code,c_age_name,obs_value`, 'text')
let popYear = ''
for (const [year, code, age, v] of csvRows(popCsv)) {
  const f = facts[slugByCode[code]]; if (!f) continue
  popYear = year
  f.pop ??= {}
  f.pop[age === 'All Ages' ? 'all' : age === 'Aged 65+' ? 'over65' : 'over85'] = +v
}

// 3. Dementia diagnosis rate, 65+ (latest period). Count = people with a recorded diagnosis,
// Denominator = estimated number living with dementia.
const dem = await get('https://fingertips.phe.org.uk/api/all_data/csv/by_indicator_id?indicator_ids=92949&child_area_type_id=502&parent_area_type_id=15', 'text')
const parse = (line) => { const out = []; let cur = '', q = false; for (const ch of line) { if (ch === '"') q = !q; else if (ch === ',' && !q) { out.push(cur); cur = '' } else cur += ch } out.push(cur); return out }
const [head, ...lines] = dem.replace(/^﻿/, '').trim().split('\n')
const H = parse(head); const col = (n) => H.indexOf(n)
const demRows = lines.map(parse).filter((r) => r[col('Sex')] === 'Persons')
const demPeriod = demRows.map((r) => r[col('Time period')]).sort().pop()
let england = null
for (const r of demRows.filter((r) => r[col('Time period')] === demPeriod)) {
  const d = { rate: +(+r[col('Value')]).toFixed(1), diagnosed: Math.round(+r[col('Count')]), estimated: Math.round(+r[col('Denominator')]) }
  if (r[col('Area Name')] === 'England') england = d
  const slug = slugByCode[r[col('Area Code')]]
  if (slug && r[col('Value')]) facts[slug].dementia = d
}

// 4. Council website, from GOV.UK. Try the obvious slug, then look it up by a postcode near the centre.
const govSlug = (n) => n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const a of areas) {
  const f = facts[a.slug]
  let la = null
  try { la = (await get(`https://www.gov.uk/api/local-authority/${govSlug(a.name)}`)).local_authority } catch {}
  if (!la || !['unitary', 'county'].includes(la.tier)) {
    try {
      const pc = (await get(`https://api.postcodes.io/postcodes?lon=${f.lng}&lat=${f.lat}&radius=2000&limit=1`)).result?.[0]?.postcode
      const res = pc && (await get(`https://www.gov.uk/api/local-authority?postcode=${encodeURIComponent(pc)}`))
      const all = res?.local_authority ? [res.local_authority, res.local_authority.parent].filter(Boolean) : []
      la = all.find((x) => ['unitary', 'county'].includes(x.tier)) ?? null
    } catch {}
  }
  if (la?.homepage_url) f.council = { name: la.name, url: la.homepage_url }
  else console.warn('No council website for', a.name)
}

// 5. Towns in each council area (London boroughs share one "London" entry, so they get none)
for (let i = 0; i < towns.length; i += 100) {
  const batch = towns.slice(i, i + 100)
  const r = await fetch('https://api.postcodes.io/postcodes', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ geolocations: batch.map(([, lat, lng]) => ({ latitude: lat / 1000, longitude: lng / 1000, radius: 2000, limit: 1 })) }) })
  const { result } = await r.json()
  result.forEach((x, k) => {
    const c = x.result?.[0]?.codes; if (!c) return
    const code = c.admin_county && c.admin_county !== 'E99999999' ? c.admin_county : c.admin_district
    const slug = slugByCode[code]; const [name, , , n] = batch[k]
    if (slug && name !== 'London') (facts[slug].towns ??= []).push([name, n])
  })
}
for (const f of Object.values(facts)) if (f.towns) f.towns = f.towns.sort((x, y) => y[1] - x[1]).slice(0, 6).map(([n]) => n)

// 6. Nearest eight council areas by centre point
const km = (p, q) => { const R = 6371, r = Math.PI / 180, dLat = (q.lat - p.lat) * r, dLng = (q.lng - p.lng) * r
  return 2 * R * Math.asin(Math.sqrt(Math.sin(dLat / 2) ** 2 + Math.cos(p.lat * r) * Math.cos(q.lat * r) * Math.sin(dLng / 2) ** 2)) }
for (const a of areas) {
  const f = facts[a.slug]
  f.nearby = areas.filter((x) => x.slug !== a.slug).map((x) => [x.slug, km(f, facts[x.slug])]).sort((x, y) => x[1] - y[1]).slice(0, 8).map(([s]) => s)
}

const out = { generated: new Date().toISOString().slice(0, 10), popYear, dementiaPeriod: demPeriod, englandDementia: england, areas: facts }
fs.writeFileSync(new URL('../data/area-facts.json', import.meta.url), JSON.stringify(out, null, 1))
const missing = (k) => areas.filter((a) => !facts[a.slug][k]).map((a) => a.name)
console.log(areas.length, 'areas; pop', popYear, '; dementia', demPeriod, england, '; missing pop', missing('pop'), 'dementia', missing('dementia'), 'council', missing('council'), 'towns', missing('towns').length)
