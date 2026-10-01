import { BRAND } from '@/lib/site'
import { AUTHOR } from '@/lib/author'

/** A JSON-LD block. Structured data Google reads; it doesn't change what visitors see. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...data }) }} />
}

export const ORG_ID = `${BRAND.url}/#org`
export const AUTHOR_ID = `${BRAND.url}/about#len-burgess`
export const authorRef = { '@type': 'Person', '@id': AUTHOR_ID, name: AUTHOR.name, url: `${BRAND.url}/about` }
const FREE = { '@type': 'Offer', price: '0', priceCurrency: 'GBP', description: 'Free for families' }
const ENGLAND = { '@type': 'Country', name: 'England' }

/** The matching service for one type of care, optionally in one region or council area. */
export function serviceLd(o: { name: string; description: string; path: string; area?: string; region?: string }) {
  const areaServed = o.area
    ? { '@type': 'AdministrativeArea', name: o.area, containedInPlace: o.region ? { '@type': 'AdministrativeArea', name: o.region, containedInPlace: ENGLAND } : ENGLAND }
    : o.region ? { '@type': 'AdministrativeArea', name: o.region, containedInPlace: ENGLAND } : ENGLAND
  return {
    '@type': 'Service', '@id': `${BRAND.url}${o.path}#service`, name: `${o.name} matching${o.area ? ` in ${o.area}` : o.region ? ` in ${o.region}` : ''}`,
    serviceType: o.name, description: o.description, url: `${BRAND.url}${o.path}`, provider: { '@id': ORG_ID }, areaServed,
    audience: { '@type': 'Audience', audienceType: 'Families arranging care at home' }, offers: FREE, isAccessibleForFree: true,
  }
}

/** An ordered list of pages, e.g. the articles on the blog or the council areas in a region. */
export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return { '@type': 'ItemList', name, numberOfItems: items.length, itemListElement: items.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, url: `${BRAND.url}${x.path}` })) }
}

/** A free tool on the site. */
export function toolLd(o: { name: string; description: string; path: string; category: string }) {
  return { '@type': 'WebApplication', name: o.name, description: o.description, url: `${BRAND.url}${o.path}`, applicationCategory: o.category, operatingSystem: 'Any', browserRequirements: 'Requires JavaScript', isAccessibleForFree: true, offers: FREE, provider: { '@id': ORG_ID } }
}
