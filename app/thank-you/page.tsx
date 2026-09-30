import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Thank you', robots: { index: false, follow: false } }

export default function ThankYou() {
  return (
    <>
      <section className="section"><div className="in" style={{ maxWidth: 760 }}>
        <h1>Thank you, we’ve got your details</h1>
        <p className="lede">The CQC-registered home care agency we’ve matched you with will be in touch, usually by phone. Keep your phone nearby over the next day or so.</p>
        <div className="panel line">
          <h2>What happens next</h2>
          <ol className="steps" style={{ gridTemplateColumns: '1fr' }}>
            <li><h3>The agency calls you</h3><p>They’ll ask about the help needed and answer your questions. Have a pen handy to note what they offer.</p></li>
            <li><h3>They may arrange an assessment</h3><p>Usually a visit or call to understand needs and routines, before they give you a written quote.</p></li>
            <li><h3>You decide, with no obligation</h3><p>Think about the quote and how the agency made you feel. You can say no at any point.</p></li>
          </ol>
        </div>
        <p>While you wait: <Link href="/guides/choosing-a-home-care-agency">questions to ask a care agency</Link>, and <Link href="/costs">what care at home costs</Link>.</p>
        <p className="small muted">Changed your mind? Email us and we’ll tell the agency not to contact you.</p>
      </div></section>
    </>
  )
}
