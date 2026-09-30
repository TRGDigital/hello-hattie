import { FIGURES, gbp } from '@/lib/figures'

// Static pictures of each tool, drawn in HTML so they stay sharp. The numbers are real: the calculator
// mock shows the Homecare Association minimum rate for one hour a day, every day.
const hca = FIGURES.hcaMinimumHourly.value
const weekly = hca * 7

export function CalcMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Care cost calculator</span></div>
      <div className="mock-body">
        <div className="mock-fields">
          <div><small>Hourly rate</small><b>{gbp(hca)}</b></div>
          <div><small>Hours per visit</small><b>1 hour</b></div>
          <div><small>Visits per day</small><b>1 visit</b></div>
          <div><small>Days per week</small><b>7 days</b></div>
        </div>
        <div className="mock-result">
          <small>Estimated weekly cost</small>
          <b className="num">{gbp(weekly)}</b>
          <div className="mock-split"><span>Four weeks <b>{gbp(weekly * 4)}</b></span><span>A year <b>{gbp(weekly * 52)}</b></span></div>
        </div>
      </div>
    </div>
  )
}

export function WhichMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Which care is right?</span></div>
      <div className="mock-body">
        <div className="mock-progress"><i style={{ width: '60%' }} /></div>
        <small className="mock-q">Question 3 of 5</small>
        <b className="mock-h">Is help needed at night?</b>
        <div className="mock-opts">
          <span>No</span>
          <span className="on">Sometimes</span>
          <span>Most nights</span>
        </div>
        <div className="mock-rec"><small>A good place to start</small><b>Overnight care</b></div>
      </div>
    </div>
  )
}

export function FundingMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>Funding checker</span></div>
      <div className="mock-body">
        <small className="mock-q">Savings, not counting the home</small>
        <div className="mock-opts">
          <span>Under {gbp(FIGURES.capitalLimits.lower, 0)}</span>
          <span className="on">{gbp(FIGURES.capitalLimits.lower, 0)} to {gbp(FIGURES.capitalLimits.upper, 0)}</span>
          <span>Over {gbp(FIGURES.capitalLimits.upper, 0)}</span>
        </div>
        <div className="mock-rec"><small>What it may mean</small><b>The council may help, and you contribute</b></div>
        <div className="mock-rec alt"><small>Attendance Allowance, higher rate</small><b className="num">{gbp(FIGURES.attendanceAllowance.higher)} a week</b></div>
      </div>
    </div>
  )
}
