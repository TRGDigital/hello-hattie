// Small pictures of each check, drawn in HTML so they stay sharp. The details are made up.
const Tick = () => <span className="vm-ok">✓</span>

export function AddressMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-field"><small>Postcode</small><b>WR14 3DR</b></div>
      <ul className="vm-list"><li>1 Priory Road</li><li>2 Priory Road</li><li className="on">3 Priory Road <Tick /></li><li>4 Priory Road</li></ul>
    </div>
  )
}
export function CodeMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-sms"><small>HelloHattie</small><p>482913 is your Hello Hattie code. It confirms the care agency has the right number to call you.</p></div>
      <div className="vm-code">{'482913'.split('').map((d, i) => <span key={i}>{d}</span>)}</div>
    </div>
  )
}
export function PhoneMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-field"><small>Phone number</small><b>07911 123456</b></div>
      <p className="vm-good"><Tick /> Live mobile number, checked on the network</p>
      <div className="vm-field bad"><small>Phone number</small><b>0123 4567</b></div>
      <p className="vm-bad">That doesn’t look like a working UK number</p>
    </div>
  )
}
export function EmailMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-field"><small>Email address</small><b>fred@gmial.com</b></div>
      <p className="vm-hint">Did you mean <u>fred@gmail.com</u>?</p>
      <div className="vm-field"><small>Email address</small><b>fred@gmail.com</b></div>
      <p className="vm-good"><Tick /> Can receive email</p>
    </div>
  )
}
export function NeedsMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-chips">
        <span><small>Care</small>Visiting</span><span><small>For</small>Mum</span>
        <span><small>Hours</small>14 to 28 a week</span><span><small>Start</small>Within 2 weeks</span>
        <span><small>Paying</small>Privately</span><span><small>Call</small>Mornings</span>
      </div>
      <p className="vm-hint">Help with: washing and dressing, meals, company</p>
    </div>
  )
}
export function ConsentMock() {
  return (
    <div className="vm" aria-hidden="true">
      <div className="vm-check"><span className="box">✓</span><p>I agree to my details being passed to a CQC-registered home care agency that covers my area, so they can contact me about care.</p></div>
      <p className="vm-stamp">Agreed 30 Sep 2026, 10:42 · wording v3</p>
    </div>
  )
}
