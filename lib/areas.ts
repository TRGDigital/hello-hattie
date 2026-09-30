import data from '@/data/areas.json'

export type Area = (typeof data.areas)[number]
export const AREAS: Area[] = data.areas
export const TOTAL_AGENCIES: number = data.totalAgencies
export const AREAS_GENERATED: string = data.generated
export const RATINGS = data.ratings
export const MAPPED_AGENCIES: number = data.mappedAgencies

export const REGIONS = Array.from(new Set(AREAS.map((a) => a.regionSlug))).map((slug) => {
  const areas = AREAS.filter((a) => a.regionSlug === slug)
  return { slug, name: areas[0].region.replace('&', 'and'), areas, total: areas.reduce((n, a) => n + a.total, 0) }
})
export const regionBySlug = (s: string) => REGIONS.find((r) => r.slug === s)
export const areaBySlugs = (region: string, area: string) => AREAS.find((a) => a.regionSlug === region && a.slug === area)
export const ratedGoodOrBetter = (a: { outstanding: number; good: number }) => a.outstanding + a.good
