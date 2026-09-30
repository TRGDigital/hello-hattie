// Builds public/downloads/hello-hattie-home-care-call-guide-2026.pdf from call-guide.html with Chrome.
// Needs Playwright (npx playwright) or a local Chrome; run from the project root.
import { chromium } from 'playwright'
import path from 'path'
const src = path.resolve('scripts/pdf/call-guide.html')
const out = path.resolve('public/downloads/hello-hattie-home-care-call-guide-2026.pdf')
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await b.newPage()
await p.goto('file://' + src, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true })
await b.close()
console.log('wrote', out)
