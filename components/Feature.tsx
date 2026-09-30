import Link from 'next/link'
import type { ReactNode } from 'react'
import { Slot } from '@/components/Slot'

type Img = { src?: string; brief: string }

/** Image set in a tinted panel on one side, story on the other: eyebrow, heading, text, ticks, one button. */
export function StoryPanel({ eyebrow, title, image, visual, ticks, cta, children, flip = false }: {
  eyebrow?: string; title: string; image?: Img; visual?: ReactNode; ticks?: string[]; cta?: { href: string; label: string } | ReactNode; children?: ReactNode; flip?: boolean
}) {
  return (
    <div className={`story${flip ? ' flip' : ''}`}>
      <div className={`story-pic${visual ? ' has-visual' : ''}`}>{visual ?? (image && <Slot className="story-img" brief={image.brief} src={image.src} />)}</div>
      <div className="story-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {children}
        {ticks && ticks.length > 0 && <ul className="checklist">{ticks.map((t) => <li key={t}>{t}</li>)}</ul>}
        {cta && (isLink(cta) ? <p><Link className="btn" href={cta.href}>{cta.label}</Link></p> : cta)}
      </div>
    </div>
  )
}

/** Dark card: eyebrow, heading, text, fact pills and a marigold button, with an image on the right. */
export function DarkFeature({ eyebrow, title, pills, cta, image, aside, children }: {
  eyebrow?: string; title: string; pills?: ReactNode[]; cta?: { href: string; label: string }; image?: Img; aside?: ReactNode; children?: ReactNode
}) {
  return (
    <div className={`dark-feature${image || aside ? '' : ' no-pic'}`}>
      <div className="df-copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {children}
        {pills && pills.length > 0 && <ul className="pills">{pills.map((p, i) => <li key={i}>{p}</li>)}</ul>}
        {cta && <p><Link className="btn hi" href={cta.href}>{cta.label}</Link></p>}
      </div>
      {aside ?? (image && <Slot className="df-img" brief={image.brief} src={image.src} />)}
    </div>
  )
}

function isLink(x: unknown): x is { href: string; label: string } {
  return typeof x === 'object' && x !== null && 'href' in x && 'label' in x
}
