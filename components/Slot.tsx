/** An image slot: a designed placeholder carrying the brief for the image that will replace it. */
export function Slot({ brief, className = '' }: { brief: string; className?: string }) {
  return (
    <div className={`slot ${className}`} role="img" aria-label={`Image to come: ${brief}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="mark" src="/brand/hello-hattie-mark.svg" alt="" />
      <span>Image to come: {brief}</span>
    </div>
  )
}
