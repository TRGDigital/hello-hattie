// One place for everything that changes when the brand is chosen.
export const BRAND = {
  name: 'Hello Hattie',
  tagline: 'Home care matching',
  phone: null as string | null, // set once a tracked number exists; the Call button hides without one
  hours: 'Mon to Sat, 8am to 8pm',
  email: 'hello@hellohattie.co.uk', // mailbox to be set up before launch
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hellohattie.co.uk',
  live: process.env.NEXT_PUBLIC_SITE_LIVE === 'true', // false: every page is noindex and robots.txt blocks crawlers
}

export const NAV = [
  { href: '/types-of-care', label: 'Types of care' },
  { href: '/costs', label: 'Costs' },
  { href: '/tools', label: 'Tools' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/how-it-works', label: 'How it works' },
]

// The family-facing promise, used in several places so it never drifts.
export const PROMISE = 'Tell us what’s needed and we’ll match you with a CQC-registered care agency near you. Free for families, with no obligation.'
export const TRUST = ['Only CQC-registered agencies', 'Free for families', 'No obligation', 'Takes about 2 minutes']
export const HONEST = 'We’re a free matching service, not a care provider. Care agencies pay us when we introduce them to a family, so you never pay us anything.'
