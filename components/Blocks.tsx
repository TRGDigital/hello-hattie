import Link from 'next/link'
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
    </ol></nav>
  )
}

export function PageHero({ crumbs, title, intro, children }: { crumbs: { href?: string; label: string }[]; title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="page-hero"><div className="in">
      <Crumbs items={crumbs} />
      <h1>{title}</h1>
      {intro && <p className="lede">{intro}</p>}
      {children}
    </div></section>
  )
}

export function Faqs({ faqs, title = 'Questions families ask' }: { faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null
  return (
    <section className="section"><div className="in">
      <h2>{title}</h2>
      <div className="faq">{faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
    </div></section>
  )
}

export function CtaBand({ title = 'Find care at home near you', text = 'Answer a few simple questions and we’ll put you in touch with up to 3 CQC-registered agencies that cover your area.', service }: { title?: string; text?: string; service?: string }) {
  return (
    <section className="cta-band"><div className="in">
      <div style={{ display: 'grid', gap: 8 }}><h2>{title}</h2><p>{text}</p></div>
      <Link className="btn" href={service ? `/get-matched?service=${service}` : '/get-matched'}>Get matched, it’s free</Link>
    </div></section>
  )
}

export function MobileBar() {
  return (
    <div className="mbar">
      <Link className="btn" href="/get-matched">Get matched</Link>
      {BRAND.phone && <span className="btn ghost">Call {BRAND.phone}</span>}
    </div>
  )
}

export function PhotoSlot({ caption = 'Photo: a carer and client at home (real UK photography)' }: { caption?: string }) {
  return <div className="photo" role="img" aria-label="Photo placeholder"><span>{caption}</span></div>
}
