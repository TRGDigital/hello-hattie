// PPC landing pages: /go/{slug}. One per ad group theme. Copy rules as the rest of the site:
// UK English, no dashes, no invented numbers, no named agencies, and "one agency, never a list".
// Headlines can take a place from the ad's final URL: /go/home-care?loc=Malvern -> "Home care in Malvern".
export type Landing = {
  slug: string
  service: string          // the /{service} page it borrows photos and FAQs from
  quiz?: 'visiting' | 'live_in' | 'overnight'   // set when the page is clearly one kind; left out, the form asks
  h1: string               // "{loc}" is replaced by " in Malvern", or removed when there is no loc
  sub: string
  bullets: string[]
}

export const LANDINGS: Landing[] = [
  {
    slug: 'home-care', service: 'home-care', quiz: 'visiting',
    h1: 'Trusted home care{loc}, matched for you',
    sub: 'Tell us what help is needed and we’ll match you with a CQC-registered home care agency that covers your postcode. Free, with no obligation.',
    bullets: ['Help with washing, dressing, meals and medicines', 'Visits at the times of day you need', 'Only CQC-registered agencies'],
  },
  {
    slug: 'live-in-care', service: 'live-in-care', quiz: 'live_in',
    h1: 'Live-in care{loc}, so they can stay at home',
    sub: 'A carer who lives in, for support day and night. We’ll match you with a CQC-registered live-in care agency near you. Free for families.',
    bullets: ['One to one support in their own home', 'An alternative to moving into a care home', 'Only CQC-registered agencies'],
  },
  {
    slug: 'overnight-care', service: 'overnight-care', quiz: 'overnight',
    h1: 'Overnight care{loc}, for peaceful nights',
    sub: 'Someone there through the night, awake or asleep. We’ll match you with a CQC-registered agency that covers your postcode.',
    bullets: ['Waking or sleeping nights', 'Peace of mind for the whole family', 'Only CQC-registered agencies'],
  },
  {
    slug: 'dementia-care', service: 'dementia-care-at-home',
    h1: 'Dementia care at home{loc}',
    sub: 'Familiar faces and familiar routines, at home. We’ll match you with a CQC-registered agency that offers dementia care near you.',
    bullets: ['Care that keeps their routines', 'Visiting, overnight or live-in care', 'Only CQC-registered agencies'],
  },
  {
    slug: 'respite-care', service: 'respite-care-at-home',
    h1: 'Respite care at home{loc}, so you can rest',
    sub: 'Cover at home while you take a break from caring. We’ll match you with a CQC-registered agency near you.',
    bullets: ['A few hours, days or weeks', 'Your loved one keeps their routine', 'Only CQC-registered agencies'],
  },
  {
    slug: '24-hour-care', service: '24-hour-care', quiz: 'live_in',
    h1: '24 hour care at home{loc}',
    sub: 'Someone always there, day and night. We’ll match you with a CQC-registered agency that can provide round the clock care near you.',
    bullets: ['Support at any time of day or night', 'A small, regular team of carers', 'Only CQC-registered agencies'],
  },
  {
    slug: 'companionship-care', service: 'companionship-care', quiz: 'visiting',
    h1: 'Companionship care{loc}',
    sub: 'Regular visits for company, outings and a helping hand. We’ll match you with a CQC-registered agency near you.',
    bullets: ['Chats, walks, shopping and appointments', 'The same friendly faces each week', 'Only CQC-registered agencies'],
  },
]

export const landingBySlug = (s: string) => LANDINGS.find((l) => l.slug === s)

/** A place name from the ad URL, cleaned so nothing odd reaches the page: letters, spaces, hyphens, apostrophes. */
export function cleanLoc(raw?: string | string[]) {
  const v = (Array.isArray(raw) ? raw[0] : raw ?? '').replace(/[^A-Za-z '\-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 30)
  return v ? v.replace(/\b\w/g, (c) => c.toUpperCase()) : ''
}
