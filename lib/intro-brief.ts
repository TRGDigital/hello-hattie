import { SERVICES } from '@/content/services'
import { AREAS, regionBySlug } from '@/lib/areas'
import { DEMENTIA_AMBITION, DEMENTIA_PERIOD, ENGLAND, ENGLAND_DEMENTIA, POP_YEAR, factsFor, isIndexedArea } from '@/lib/area-facts'

// Area page intros: what the writer (the weekly routine, or a person) is told, the facts for each
// page, the order pages are queued in, and the checks a draft must pass before it is saved.

export const INTRO_RULES = `You are writing the opening of a Hello Hattie area page. Hello Hattie is a free service that matches families in England with one CQC-registered home care agency that covers their postcode. It is not a care provider and never lists or names agencies.

Write 110 to 170 words in two short paragraphs, separated by a blank line. Plain text only: no headings, no bullet points, no links, no markdown.

Who is reading: an adult son or daughter, often worried and short of time, looking for care for a parent in this area.

Use ONLY the facts supplied for the page. Do not add anything else about the place: no hospitals, landmarks, transport, history, council services, waiting times, prices or local reputations. Do not name or describe any care agency. Do not invent statistics or round them into new claims. You may use the town names given.

Make it specific to this place and this type of care. Lead with the fact that matters most for this care type (older population for visiting home care, people aged 85 and over for live-in care, dementia diagnosis for dementia care at home). Compare with England where the facts allow. Mention one or two of the towns if any are given. End with a calm, practical line about telling us the postcode so we can find one agency that covers it.

Vary sentence openings and structure from page to page. Never start with "Looking for", "If you are looking", "Welcome to", "Finding care" or the area name followed by "is". Avoid cliches like "nestled", "vibrant", "bustling", "peace of mind", "every step of the way", "tailored", "holistic".

Style: UK English, warm, plain and direct, short sentences, like an experienced care professional talking to a family. No dashes of any kind (no em dash, en dash or spaced hyphen); use commas or full stops instead. No exclamation marks. Do not use the word "loved one".`

export type IntroPage = {
  path: string; service: string; serviceName: string; region: string; regionName: string; area: string; areaName: string
  facts: Record<string, string | number | string[] | null>
}

const n = (x: number) => x.toLocaleString('en-GB')
const pc = (x: number) => `${(x * 100).toFixed(1)}%`

/** Every area page, in the order intros are written and pages released. */
export function allIntroPages(): IntroPage[] {
  const svcs = SERVICES.filter((s) => s.areaPages)
  const order = [...AREAS].sort((a, b) => Number(isIndexedArea(b.slug)) - Number(isIndexedArea(a.slug)) || (factsFor(b.slug)?.pop?.over65 ?? 0) - (factsFor(a.slug)?.pop?.over65 ?? 0))
  return order.flatMap((a) => svcs.map((s) => {
    const f = factsFor(a.slug), r = regionBySlug(a.regionSlug)!
    const inspected = a.total - a.notRated
    return {
      path: `/${s.slug}/${a.regionSlug}/${a.slug}`, service: s.slug, serviceName: s.name, region: a.regionSlug, regionName: r.name, area: a.slug, areaName: a.name,
      facts: {
        'Care type': s.name,
        'Council area': a.name,
        Region: r.name,
        'Towns in the area': f?.towns ?? [],
        'CQC-registered home care agencies registered here': a.total,
        'Of those inspected, rated Good or Outstanding': `${a.good + a.outstanding} of ${inspected}`,
        'Newer agencies not yet rated': a.notRated,
        [`People aged 65+ (ONS mid-${POP_YEAR})`]: f?.pop ? `${n(f.pop.over65)}, ${pc(f.pop.over65 / f.pop.all)} of residents (England ${pc(ENGLAND.over65Share)})` : null,
        [`People aged 85+ (ONS mid-${POP_YEAR})`]: f?.pop ? `${n(f.pop.over85)}, ${pc(f.pop.over85 / f.pop.all)} of residents (England ${pc(ENGLAND.over85Share)})` : null,
        'People aged 65+ per registered agency': f?.pop ? `${n(Math.round(f.pop.over65 / a.total))} (England ${n(Math.round(ENGLAND.over65PerAgency))})` : null,
        [`Dementia, aged 65+ (NHS England data via OHID, ${DEMENTIA_PERIOD})`]: f?.dementia ? `estimated ${n(f.dementia.estimated)} living with dementia, ${n(f.dementia.diagnosed)} diagnosed (${f.dementia.rate}%). England ${ENGLAND_DEMENTIA.rate}%, NHS target ${DEMENTIA_AMBITION}%` : null,
        'Neighbouring council areas': (f?.nearby ?? []).slice(0, 4).map((x) => AREAS.find((y) => y.slug === x)?.name ?? x),
        Council: f?.council?.name ?? null,
      },
    }
  }))
}

export const introPage = (path: string) => allIntroPages().find((p) => p.path === path)

/** Problems with a draft, or an empty list if it can be saved. */
export function checkIntro(text: string, page: IntroPage): string[] {
  const t = text.trim(), words = t.split(/\s+/).filter(Boolean).length, out: string[] = []
  if (words < 90 || words > 200) out.push(`Write 110 to 170 words (this has ${words}).`)
  if (/[–—]| - /.test(t)) out.push('No dashes: use commas or full stops.')
  if (/https?:|www\.|[#*_]{2}|^#|^- /m.test(t)) out.push('Plain text only: no links or markdown.')
  if (/!/.test(t)) out.push('No exclamation marks.')
  if (/loved one|nestled|vibrant|bustling|peace of mind|every step of the way|holistic/i.test(t)) out.push('Remove the banned phrases.')
  if (!t.includes(page.areaName)) out.push(`Mention ${page.areaName} by name.`)
  return out
}
