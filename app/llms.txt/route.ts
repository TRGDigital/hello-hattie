import { BRAND } from '@/lib/site'
import { SERVICES } from '@/content/services'
import { articlePath } from '@/content/articles'
import { getArticles } from '@/lib/cms'
import { REGIONS, TOTAL_AGENCIES } from '@/lib/areas'

// llms.txt (llmstxt.org): a plain summary of the site for AI assistants, with links to the pages
// worth reading. Built from the same content as the site so it never goes stale.
export const revalidate = 3600

export async function GET() {
  const ARTICLES = await getArticles()
  const u = (p: string) => `${BRAND.url}${p}`
  const areaSvc = SERVICES.filter((s) => s.areaPages)
  const lines = [
    `# ${BRAND.name}`,
    '',
    `> ${BRAND.name} is a free service for families in England. A family tells us where care at home is needed and what kind of help, and we match them with one CQC-registered home care agency that covers their postcode. Families never pay; the agency pays for the introduction. We are not a care provider and do not employ carers. ${TOTAL_AGENCIES.toLocaleString('en-GB')} home care agencies are on the CQC register in England.`,
    '',
    'Key facts:',
    '- Coverage: England only. Every matched agency is registered with the Care Quality Commission (CQC).',
    '- Each enquiry goes to one agency only, never to a list, and is never sold on.',
    '- Families are never asked about medical conditions.',
    `- Run by TRG Digital Ltd (company 11731704, ICO registration ZC221613). Contact: ${BRAND.email}`,
    '',
    '## Types of care at home',
    ...SERVICES.map((s) => `- [${s.name}](${u(`/${s.slug}`)}): ${s.short}`),
    '',
    '## Costs and funding',
    `- [What care at home costs](${u('/costs')}): published figures for England, what affects the price, and help with paying`,
    ...ARTICLES.filter((a) => a.kind === 'cost').map((a) => `- [${a.title}](${u(articlePath(a))}): ${a.summary}`),
    '',
    '## Guides and articles',
    ...ARTICLES.filter((a) => a.kind !== 'cost').map((a) => `- [${a.title}](${u(articlePath(a))}): ${a.summary}`),
    '',
    '## Free tools',
    `- [Care cost calculator](${u('/tools/care-cost-calculator')}): weekly, four-weekly and yearly cost of visiting care`,
    `- [Which type of care is right?](${u('/tools/which-care-is-right')}): five questions that suggest a type of care`,
    `- [Funding checker](${u('/tools/funding-checker')}): whether the council or Attendance Allowance may help, in England`,
    '',
    '## Care by area',
    ...areaSvc.flatMap((s) => REGIONS.map((r) => `- [${s.name} in ${r.name}](${u(`/${s.slug}/${r.slug}`)})`)),
    `- [All areas](${u('/areas')}): every council area in England with the number of registered agencies`,
    '',
    '## About the service',
    `- [How it works](${u('/how-it-works')})`,
    `- [For care agencies](${u('/for-agencies')}): exclusive enquiries, pay per enquiry, no contract`,
    `- [About us](${u('/about')})`,
    `- [Privacy](${u('/privacy')})`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
