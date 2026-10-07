import data from '@/data/area-facts.json'
import { AREAS } from '@/lib/areas'

// Public local facts per council area, from scripts/build-area-facts.mjs (ONS, Nomis, OHID
// Fingertips, GOV.UK, postcodes.io). Rebuild with `npm run area-facts` after `npm run areas`.
export type AreaFacts = {
  code: string
  lat: number
  lng: number
  pop?: { all: number; over65: number; over85: number }
  dementia?: { rate: number; diagnosed: number; estimated: number }
  council?: { name: string; url: string }
  towns?: string[]
  nearby: string[]
}
const FACTS = data.areas as Record<string, AreaFacts>
export const factsFor = (slug: string): AreaFacts | undefined => FACTS[slug]
export const POP_YEAR = data.popYear
export const DEMENTIA_PERIOD = data.dementiaPeriod
export const ENGLAND_DEMENTIA = data.englandDementia as { rate: number; diagnosed: number; estimated: number }
// The NHS England target for the share of people with dementia who have a diagnosis.
export const DEMENTIA_AMBITION = 66.7

const sum = (k: 'all' | 'over65' | 'over85') => Object.values(FACTS).reduce((n, f) => n + (f.pop?.[k] ?? 0), 0)
const totalAgencies = AREAS.reduce((n, a) => n + a.total, 0)
export const ENGLAND = {
  over65Share: sum('over65') / sum('all'),
  over85Share: sum('over85') / sum('all'),
  over65PerAgency: sum('over65') / totalAgencies,
}

/**
 * Area pages are released to Google in waves so a new domain is not asking it to crawl ~450
 * near-identical URLs at once. Pages outside the wave are noindex, follow and left out of the
 * sitemap; they still render and link normally. Wave 1 (7 Oct 2026): the 40 areas with the most
 * people aged 65+. Raise this once most of the wave shows as indexed in Search Console.
 */
export const INDEX_WAVE_SIZE = 40
const WAVE = new Set(
  [...AREAS].sort((a, b) => (FACTS[b.slug]?.pop?.over65 ?? 0) - (FACTS[a.slug]?.pop?.over65 ?? 0)).slice(0, INDEX_WAVE_SIZE).map((a) => a.slug),
)
export const isIndexedArea = (slug: string) => WAVE.has(slug)
