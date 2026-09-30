// Every figure the site quotes, with its source. Nothing is quoted anywhere that is not here.
export const FIGURES = {
  hcaMinimumHourly: {
    value: 34.42,
    period: 'April 2026 to March 2027',
    short: '2026 to 2027',
    label: 'Homecare Association Minimum Price for Homecare, England, April 2026 to March 2027',
    note: 'The minimum an agency needs to charge to pay carers the National Living Wage for all working time, including travel, and run safely. Private agency prices are usually higher.',
    url: 'https://www.homecareassociation.org.uk/about-us/research-and-reports.html',
  },
  capitalLimits: {
    upper: 23250,
    lower: 14250,
    tariff: 'Between the two limits, you are treated as having £1 a week of income for every £250 of savings.',
    label: 'GOV.UK, Social care charging for care and support 2026 to 2027',
    url: 'https://www.gov.uk/government/publications/social-care-charging-for-local-authorities-2026-to-2027/social-care-charging-for-care-and-support-2026-to-2027-local-authority-circular',
  },
  homeNotCounted: {
    text: 'If you need care to stay living at home, the council’s financial assessment does not include the value of the home you live in.',
    label: 'Age UK, Financial assessment for care',
    url: 'https://www.ageuk.org.uk/information-advice/care/paying-for-care/financial-assessment/',
  },
  attendanceAllowance: {
    lower: 76.7,
    higher: 114.6,
    label: 'GOV.UK, Attendance Allowance rates (checked 30 September 2026)',
    url: 'https://www.gov.uk/attendance-allowance/what-youll-get',
  },
} as const

export const gbp = (n: number, dp = 2) => `£${n.toLocaleString('en-GB', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`
