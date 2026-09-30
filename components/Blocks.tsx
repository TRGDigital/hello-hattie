import Link from 'next/link'
import { MatchLink } from '@/components/MatchLink'
import type { ReactNode } from 'react'
import { BRAND, TRUST } from '@/lib/site'
import type { Faq } from '@/content/types'

export function Trust() {
  return <ul className="trust">{TRUST.map((t) => <li key={t}>{t}</li>)}</ul>
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb"><ol className="crumbs">
      <li><Link href="/">Home</Link></li>
      {items.map((c) => <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>)}
    </ol>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [{ label: 'Home', href: '/' }, ...items].map((c, i) => ({
        '@type': 'ListItem', position: i + 1, name: c.label, ...(c.href ? { item: `${BRAND.url}${c.href}` } : {}),
      })),
    }) }} />
    </nav>
  )
}

export function PageHero({ crumbs, title, intro, children, aside }: { crumbs: { href?: string; label: string }[]; title: string; intro?: string; children?: ReactNode; aside?: ReactNode }) {
  const copy = <>
    <Crumbs items={crumbs} />
    <h1>{title}</h1>
    {intro && <p className="lede">{intro}</p>}
    {children}
  </>
  if (!aside) return <section className="page-hero"><div className="in">{copy}</div></section>
  return (
    <section className="page-hero with-aside"><div className="in">
      <div className="page-hero-copy">{copy}</div>
      {aside}
    </div></section>
  )
}

export function Faqs({ faqs, title = 'Questions families ask', band = false }: { faqs: Faq[]; title?: string; band?: boolean }) {
  if (!faqs.length) return null
  return (
    <section className={band ? 'section band faq-sec' : 'section faq-sec'}><div className="in">
      <h2>{title}</h2>
      <div className="faq">{faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </div></section>
  )
}

export function CtaBand({ title = 'Find care at home near you', text = 'Answer a few simple questions and we’ll match you with a CQC-registered agency that covers your area.', service }: { title?: string; text?: string; service?: string }) {
  return (
    <section className="cta-band"><div className="in">
      <div style={{ display: 'grid', gap: 8 }}><h2>{title}</h2><p>{text}</p></div>
      <MatchLink href={service ? `/get-matched?service=${service}` : '/get-matched'}>Get matched, it’s free</MatchLink>
    </div></section>
  )
}

export function MobileBar() {
  return (
    <div className="mbar">
      <MatchLink>Get matched</MatchLink>
      {BRAND.phone && <span className="btn ghost">Call {BRAND.phone}</span>}
    </div>
  )
}

export function PhotoSlot({ caption = 'Photo: a carer and client at home (real UK photography)' }: { caption?: string }) {
  return <div className="photo" role="img" aria-label="Photo placeholder"><span>{caption}</span></div>
}
