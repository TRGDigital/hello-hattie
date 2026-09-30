import Link from 'next/link'
import type { ReactNode } from 'react'
import { SERVICES } from '@/content/services'
import { ARTICLES, articlePath } from '@/content/articles'
import type { Article } from '@/content/types'

// Contextual internal links: in article text, the first mention of a type of care or a tool links
// to its page. Longest phrases first so "dementia care at home" wins over "home care". Never links
// a page to itself, and at most one link per target per article.
const TARGETS: [string, string][] = [
  ...SERVICES.map((s) => [s.name.toLowerCase(), `/${s.slug}`] as [string, string]),
  ...([['live-in carer', '/live-in-care'], ['visiting care', '/home-care'], ['domiciliary care', '/home-care'],
  ['respite care', '/respite-care-at-home'], ['dementia care', '/dementia-care-at-home'], ['end of life care', '/palliative-care-at-home'],
  ['care cost calculator', '/tools/care-cost-calculator'], ['funding checker', '/tools/funding-checker'],
  ['attendance allowance', '/tools/funding-checker'], ['financial assessment', '/costs/paying-for-home-care'],
  ['care home', '/guides/live-in-care-vs-care-home'],
  ['home care agency', '/guides/choosing-a-home-care-agency'], ['choosing an agency', '/guides/choosing-a-home-care-agency'],
  ['cqc report', '/guides/choosing-a-home-care-agency'], ['inspection report', '/guides/choosing-a-home-care-agency'],
  ['needs assessment', '/costs/paying-for-home-care'], ['paying for care', '/costs/paying-for-home-care'], ['self-funding', '/costs/paying-for-home-care'],
  ['hospital stay', '/guides/arranging-care-after-hospital'], ['leaving hospital', '/guides/arranging-care-after-hospital'], ['discharge', '/guides/arranging-care-after-hospital'],
  ['care plan', '/guides/what-does-a-home-carer-do'], ['care worker', '/guides/what-does-a-home-carer-do'],
  ['hourly rate', '/costs/home-care-cost-per-hour'], ['homecare association', '/costs/home-care-cost-per-hour'],
  ['assessment', '/blog/what-happens-at-a-home-care-assessment'],
  ['home care', '/home-care']] as [string, string][]),
].sort((a, b) => b[0].length - a[0].length)

const RE = new RegExp(`\\b(${TARGETS.map(([p]) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')

export function makeLinker(selfPath: string) {
  const used = new Set<string>([selfPath])
  return (text: string): ReactNode => {
    const out: ReactNode[] = []
    let last = 0
    for (const m of text.matchAll(RE)) {
      const href = TARGETS.find(([p]) => p === m[0].toLowerCase())?.[1]
      if (!href || used.has(href) || m.index === undefined) continue
      used.add(href)
      out.push(text.slice(last, m.index), <Link key={m.index} href={href}>{m[0]}</Link>)
      last = m.index + m[0].length
    }
    if (!out.length) return text
    out.push(text.slice(last))
    return out
  }
}

/** Articles most about a type of care: scored by how often its name appears in the article. */
export function articlesFor(serviceName: string, n = 3): Article[] {
  const words = serviceName.toLowerCase().replace(/ at home$/, '')
  const score = (a: Article) => {
    const t = [a.title, a.summary, ...a.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])])].join(' ').toLowerCase()
    return (a.title.toLowerCase().includes(words) ? 10 : 0) + t.split(words).length - 1
  }
  return [...ARTICLES].map((a) => [a, score(a)] as const).filter(([, s]) => s > 0).sort((x, y) => y[1] - x[1]).slice(0, n).map(([a]) => a)
}
export { articlePath }
