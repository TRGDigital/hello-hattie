import Image from 'next/image'

/** An image slot: the photo when there is one (resized and served as AVIF/WebP by next/image,
 *  inside a box whose shape comes from CSS, so nothing shifts), otherwise a placeholder with the brief. */
export function Slot({ brief, src, className = '', sizes = '(max-width: 760px) 100vw, 50vw', priority = false }: {
  brief: string; src?: string; className?: string; sizes?: string; priority?: boolean
}) {
  if (src) {
    return (
      <div className={`slot pic ${className}`}>
        <Image src={src} alt={brief} fill sizes={sizes} priority={priority} />
      </div>
    )
  }
  return (
    <div className={`slot ${className}`} role="img" aria-label={`Image to come: ${brief}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="mark" src="/brand/hello-hattie-mark.svg" alt="" />
      <span>Image to come: {brief}</span>
    </div>
  )
}
