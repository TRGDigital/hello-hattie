export type Faq = { q: string; a: string }

/** A type of care. `slug` is its URL: /{slug}. Copy rules: UK English, plain words, no em or en dashes,
 *  no invented statistics or prices, no named agencies, never claim to provide care ourselves. */
export type Service = {
  slug: string
  name: string            // "Live-in care"
  short: string           // one line for cards, under 90 characters
  metaTitle: string       // under 60 characters
  metaDescription: string // under 155 characters
  intro: string           // 2 to 3 sentences under the H1
  whatItIs: string[]      // paragraphs
  whatCarersDo: string[]  // short bullet items
  suits: string[]         // "It can suit you if..." bullet items
  howItWorks: string[]    // paragraphs about arranging it: assessment, care plan, starting
  costNote: string        // one paragraph, no figures unless given in lib/figures.ts
  faqs: Faq[]             // 4 to 6
  related: string[]       // slugs of other services
  areaPages: boolean      // true only for the services that get council-area pages
}

export type Img = { src?: string; brief: string }

/** A guide, cost page or blog post: /guides/{slug}, /costs/{slug} or /blog/{slug}. */
export type Article = {
  slug: string
  kind: 'guide' | 'cost' | 'blog'
  category?: string       // topic chip, e.g. "Arranging care"; defaults by kind
  image?: Img             // lead photo; a missing src shows a placeholder with the brief
  title: string
  metaTitle: string
  metaDescription: string
  summary: string         // 1 to 2 sentences, shown on index cards and under the H1
  updated: string         // YYYY-MM-DD
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faqs: Faq[]
  sources?: { label: string; url: string }[]
}
