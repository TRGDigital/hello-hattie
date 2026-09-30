/** "We do the legwork": the promise that makes the matching worth using. Used on the home page and
 *  PPC landing pages. Availability means the agency has told us it can take on new clients (agencies
 *  pause themselves in the Hello Hattie admin when they're full). */
export function Legwork({ place }: { place?: string }) {
  return (
    <section className="legwork"><div className="in">
      <div className="legwork-head">
        <p className="eyebrow">We do the legwork</p>
        <h2>No ring-round. No chasing. No being told “sorry, we’re full”.</h2>
        <p>Before your details go anywhere, we check the agency is right for you{place ? ` in ${place}` : ''}. We only send them to one agency that ticks every box.</p>
      </div>
      <ol className="legwork-steps">
        <li><b>Covers where you live</b><span>Its carers already visit your area, so they can reach you and arrive on time.</span></li>
        <li><b>Has room for new clients</b><span>It has told us it can take on new clients now, so you won’t hear “we’re full”.</span></li>
        <li><b>Offers the care you need</b><span>Visiting, live-in, overnight or dementia care, matched to what you asked for.</span></li>
        <li><b>Registered with the CQC</b><span>Every agency is registered and inspected by the Care Quality Commission.</span></li>
      </ol>
    </div></section>
  )
}
