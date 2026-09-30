/** An image slot: the photo when there is one, otherwise a designed placeholder carrying the brief for it. */
export function Slot({ brief, src, className = '' }: { brief: string; src?: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`slot pic ${className}`} src={src} alt={brief} loading="lazy" decoding="async" />
  }
  return (
    <div className={`slot ${className}`} role="img" aria-label={`Image to come: ${brief}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="mark" src="/brand/hello-hattie-mark.svg" alt="" />
      <span>Image to come: {brief}</span>
    </div>
  )
}
