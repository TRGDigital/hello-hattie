import type { Metadata } from 'next'
import { Crumbs } from '@/components/Blocks'
import { DarkFeature, StoryPanel } from '@/components/Feature'
import { CalcMock, FundingMock, WhichMock } from '@/components/tools/Mockups'
import { FIGURES } from '@/lib/figures'
import { withSeo } from '@/lib/cms'

const BASE_META: Metadata = {
  title: 'Free tools for planning care at home',
  description: 'Free, simple tools to estimate home care costs, see which type of care may suit, and check what funding help may be available in England.',
  alternates: { canonical: '/tools' },
}

const SOURCES = [FIGURES.hcaMinimumHourly, FIGURES.capitalLimits, FIGURES.homeNotCounted, FIGURES.attendanceAllowance]

export async function generateMetadata() { return withSeo('/tools', BASE_META) }

export default function ToolsPage() {
  return (
    <>
      <section className="blog-head"><div className="in">
        <Crumbs items={[{ label: 'Tools' }]} />
        <div className="blog-title">
          <p className="eyebrow">Free tools</p>
          <h1>Three quick tools to help you plan care at home</h1>
          <p className="lede">Work out a rough weekly cost, see which type of care may suit, and check what help with paying could be available. Each one takes a minute or two.</p>
          <ul className="trust-chips">
            <li>Free to use</li><li>No sign-up</li><li>Nothing saved or sent</li><li>Figures with sources</li>
          </ul>
        </div>
      </div></section>

      <section className="section"><div className="in tool-rows">
        <StoryPanel eyebrow="Tool 1 · Costs" title="Care cost calculator" visual={<CalcMock />}
          ticks={['Choose the hourly rate, visit length, visits a day and days a week', 'See the weekly, four-weekly and yearly cost', 'Starts at the Homecare Association minimum rate, so you can put in a real quote']}
          cta={{ href: '/tools/care-cost-calculator', label: 'Work out a cost' }}>
          <p>Visiting care is usually charged by the hour, which makes it hard to picture the weekly bill. Put in the hours you have in mind and the calculator does the sums.</p>
        </StoryPanel>

        <StoryPanel flip eyebrow="Tool 2 · Types of care" title="Which type of care is right?" visual={<WhichMock />}
          ticks={['Five quick questions about help, nights and living arrangements', 'A suggested type of care with the reasons why', 'A link to read more, and to find an agency near you']}
          cta={{ href: '/tools/which-care-is-right', label: 'Answer five questions' }}>
          <p>Visiting care, overnight care, live-in care, respite: it is not always obvious which fits. Answer a few questions and we’ll suggest a good place to start.</p>
        </StoryPanel>

        <StoryPanel eyebrow="Tool 3 · Funding" title="Funding checker" visual={<FundingMock />}
          ticks={['See whether the council may help, based on savings', 'Check if Attendance Allowance may apply, and at which rate', 'Plain explanations with links to the official rules']}
          cta={{ href: '/tools/funding-checker', label: 'Check what help may apply' }}>
          <p>Many families do not know the council may help with the cost of care, or that Attendance Allowance is not means tested. This checker explains what may apply in England.</p>
        </StoryPanel>
      </div></section>

      <section className="section band"><div className="in">
        <div style={{ display: 'grid', gap: 10, maxWidth: '62ch' }}>
          <h2>Where the numbers come from</h2>
          <p className="muted">Every figure in our tools comes from a published source, and we check them when they change each year. The tools give a guide, not financial advice.</p>
        </div>
        <ul className="source-cards">
          {SOURCES.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
        </ul>
      </div></section>

      <section className="section"><div className="in">
        <DarkFeature eyebrow="The next step" title="Ready to talk to an agency near you?"
          pills={['Free for families', 'Only CQC-registered agencies', 'No obligation']}
          cta={{ href: '/get-matched', label: 'Get matched' }}
          image={{ src: '/images/family-phone.jpg', brief: 'A smiling woman on the phone at home' }}>
          <p>When you have a rough idea of the care and the budget, tell us where care is needed. We’ll match you with a local agency that can give you a proper quote.</p>
        </DarkFeature>
      </div></section>
    </>
  )
}
