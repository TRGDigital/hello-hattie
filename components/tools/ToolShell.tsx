import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Faq } from '@/content/types'
import { Crumbs, CtaBand, Faqs } from '@/components/Blocks'
import { MatchLink } from '@/components/MatchLink'
import { JsonLd, toolLd } from '@/components/JsonLd'
import { CalcMock, FundingMock, WhichMock } from '@/components/tools/Mockups'

const TOOLS = [
  { href: '/tools/care-cost-calculator', name: 'Care cost calculator', line: 'Estimate the weekly, four-weekly and yearly cost of visiting care.', mock: <CalcMock /> },
  { href: '/tools/which-care-is-right', name: 'Which type of care is right?', line: 'Five quick questions to see which kind of care at home may suit.', mock: <WhichMock /> },
  { href: '/tools/funding-checker', name: 'Funding checker', line: 'See if the council or Attendance Allowance may help with the cost.', mock: <FundingMock /> },
]

type Source = { label: string; url: string }

/** Page frame for a tool: hero, the tool beside a how-it-works column, the explanation, FAQs and the other tools. */
export function ToolShell({ href, title, intro, chips, steps, tool, explainTitle, explain, sources, faqs, service }: {
  href: string; title: string; intro: string; chips: string[]; steps: string[]; tool: ReactNode
  explainTitle: string; explain: ReactNode; sources: Source[]; faqs: Faq[]; service?: string
}) {
  const others = TOOLS.filter((t) => t.href !== href)
  return (
    <>
      <section className="blog-head tool-head"><div className="in">
        <Crumbs items={[{ href: '/tools', label: 'Tools' }, { label: title }]} />
        <div className="blog-title">
          <p className="eyebrow">Free tool</p>
          <h1>{title}</h1>
          <p className="lede">{intro}</p>
          <ul className="trust-chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 8 }}><div className="in tool-layout">
        <div className="tool-main">{tool}</div>
        <aside className="tool-side">
          <div className="side-card">
            <p className="eyebrow">How it works</p>
            <ol className="side-steps">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </div>
          <div className="side-card dark">
            <p className="eyebrow">Free for families</p>
            <h3>Talk to an agency near you</h3>
            <p>We’ll match you with a CQC-registered agency that covers your postcode, so you can get a proper quote.</p>
            <MatchLink className="btn hi">Get matched</MatchLink>
          </div>
        </aside>
      </div></section>

      <section className="section band"><div className="in">
        <div className="explain">
          <div className="prose"><h2>{explainTitle}</h2>{explain}</div>
          <div className="side-card sources">
            <p className="eyebrow">Sources</p>
            <ul>{sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            <p className="small muted">A guide, not financial advice. Nothing you enter is saved or sent anywhere.</p>
          </div>
        </div>
      </div></section>

      <Faqs faqs={faqs} />

      <section className="section band"><div className="in">
        <div className="head-row"><h2>More free tools</h2><Link href="/tools">All tools</Link></div>
        <div className="tool-cards">
          {others.map((t) => (
            <Link key={t.href} className="tool-card" href={t.href}>
              <div className="tool-card-pic">{t.mock}</div>
              <div className="body"><h3>{t.name}</h3><p>{t.line}</p><span className="go">Use the tool →</span></div>
            </Link>
          ))}
        </div>
      </div></section>
      <JsonLd data={toolLd({ name: title, description: intro, path: href, category: href.includes('calculator') || href.includes('funding') ? 'FinanceApplication' : 'LifestyleApplication' })} />
      <CtaBand service={service} />
    </>
  )
}
