import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'How much does home care cost per hour in England?',
      paragraphs: [
        'There is no single price for home care. Each agency sets its own hourly rates, so two agencies in the same town can quote quite different amounts for what looks like the same help. The rate you pay depends on where your parent lives, when the visits happen, how long each visit lasts and how much support they need.',
        'Most agencies charge by the hour, with visits often booked in blocks such as 30 minutes, 45 minutes or an hour. You are usually billed for the time booked in the care plan, weekly or monthly. The only reliable price is a written quote from an agency after it has assessed your parent’s needs, so treat any figure you see online as a rough guide at best.',
        'What you can do is understand what drives the price, know the minimum a properly run agency needs to charge, and compare quotes on a like for like basis. That is what this guide covers.',
      ],
    },
    {
      heading: 'What is the Homecare Association minimum price, and why does it matter?',
      paragraphs: [
        'The Homecare Association, the membership body for home care providers, works out a Minimum Price for Homecare each year. For England, from April 2026 to March 2027, it is £34.42 an hour, up from £32.14 the year before. The Association updates this figure every April, so check its website for the latest amount.',
        'This is not a typical price and it is not what you will necessarily pay. It is the least an agency needs to charge to pay care workers at least the National Living Wage for all of their working time, including travel between visits, and to run a safe, legal service with training, supervision and management. Prices for families paying privately are usually higher.',
        'The figure is useful as a check. If an hourly quote is well below it, that does not automatically mean something is wrong, but it is fair to ask the agency how it pays its care workers for travel time, how it covers sickness and holidays, and how it manages to run safely at that price.',
      ],
    },
    {
      heading: 'What makes one hourly rate higher than another?',
      paragraphs: ['These are the things that usually make the biggest difference to the rate you are quoted:'],
      bullets: [
        'Where your parent lives. Rates tend to be higher where wages and living costs are higher, and in rural areas where care workers have further to travel between visits.',
        'Time of day. Early mornings, evenings and nights often cost more than weekday daytime visits.',
        'Weekends and bank holidays. Many agencies have a separate weekend rate, and bank holiday rates are often higher again, sometimes much higher around Christmas and New Year.',
        'Visit length. Shorter visits usually cost more per hour than longer ones (see below).',
        'Two care workers. If your parent needs two people for safe moving and handling, for example with a hoist, you will normally pay for both workers’ time.',
        'The kind of care. Support for more complex needs, such as advanced dementia, catheter or stoma care, or help at the end of life, may be charged at a higher rate because it needs extra training and experience.',
        'Short notice. Care that has to start within a day or two, or one-off visits, can cost more than a regular, planned package.',
      ],
    },
    {
      heading: 'Why do short visits cost more per hour?',
      paragraphs: [
        'A care worker has to travel to your parent’s home and on to the next person, and that travel time has to be paid. When a visit is short, those fixed costs are spread over fewer minutes, so the price per hour goes up. This is why many agencies set a minimum visit length, and why a 30 minute visit is rarely charged at exactly half the hourly rate.',
        'Short visits can also be rushed. NICE, which writes national guidance for health and care in England, recommends that home care visits shorter than half an hour should only be made if the care worker already knows the person, the visit is part of a wider package of support, and there is enough time to finish specific tasks or check the person is safe and well. If a quote relies on very short visits for washing, dressing or meals, ask whether the time is realistic for your parent.',
      ],
    },
    {
      heading: 'What is included in the hourly rate, and what might be extra?',
      paragraphs: [
        'With a CQC-registered agency, the hourly rate normally covers the care worker’s time with your parent and the work that goes on behind the scenes. That usually includes the initial assessment, writing and reviewing the care plan, recruitment checks, training, supervision, insurance, rota planning and an on-call line for problems outside office hours.',
        'Things that are sometimes charged on top include:',
      ],
      bullets: [
        'Mileage if the care worker uses their own car to take your parent to appointments or to go shopping for them.',
        'A one-off assessment, registration or set-up fee.',
        'Higher rates for weekends, bank holidays or unsocial hours.',
        'Extra charges for cancelled visits if you do not give enough notice.',
        'Any other extras set out in the terms, such as the cost of fitting a key safe.',
      ],
    },
    {
      heading: 'Is VAT charged on home care?',
      paragraphs: [
        'Personal care supplied by a home care agency that is registered with the Care Quality Commission (CQC) is generally exempt from VAT. HMRC treats registered domiciliary care agencies as state-regulated welfare agencies, and welfare services they supply are exempt, including when the council is paying the agency.',
        'If a quote shows VAT, ask the agency to explain what it is being charged on. If you use an introductory agency, which introduces a self-employed carer rather than providing the care itself, ask whether VAT is added to the agency’s own fees.',
      ],
    },
    {
      heading: 'How do I work out a weekly cost from an hourly rate?',
      paragraphs: [
        'Start with the hours, not the price. Write down what help your parent needs each day and how long each visit should realistically take. Then multiply by the rates on the quote.',
        'For example, say your parent needs a 45 minute morning visit to help them wash, dress and have breakfast, and a 30 minute evening visit to get ready for bed, every day of the week. That is 1 hour 15 minutes a day, or 8 hours 45 minutes a week. Five of those days are weekdays and two are weekend days, so you would work out the weekday hours at the weekday rate and the weekend hours at the weekend rate, then add them together. Check whether the agency charges the 30 minute visit at a different rate from the 45 minute one.',
        'Remember that needs often grow over time, so it is worth asking how prices change if more visits are added later. Our care cost calculator can help you rough out a weekly total for the hours you have in mind.',
      ],
    },
    {
      heading: 'How do I compare quotes from home care agencies?',
      paragraphs: [
        'Ask each agency for its prices in writing, along with a copy of its terms and conditions, so you can compare like with like. When you have the quotes side by side, check:',
      ],
      bullets: [
        'The weekday, evening, weekend and bank holiday rates, and which days count as bank holidays.',
        'The shortest visit the agency offers and how visits under an hour are charged.',
        'Whether travel time and mileage are included or charged separately.',
        'Any one-off fees, and how often prices are reviewed and with how much notice.',
        'The cancellation policy, including what happens if your parent goes into hospital.',
        'The notice period to end the contract, and whether you pay in advance or in arrears.',
        'How the agency keeps the same small team of care workers visiting, and what happens if a care worker is late or cannot come.',
        'The agency’s latest CQC rating and inspection report, which you can read free on the CQC website.',
      ],
    },
    {
      heading: 'Will the council or the NHS pay some of the hourly cost?',
      paragraphs: [
        'Possibly. In England, your parent can ask the council for a free needs assessment whatever their income or savings. If they have eligible needs, a financial assessment works out what they should pay. Savings above £23,250 usually mean paying in full, and the value of the home your parent lives in is not counted when the care is at home. Our guide to paying for care at home explains this step by step.',
        'Some help is free regardless of money. If the council provides reablement or intermediate care, for example after a hospital stay, it must be free for up to 6 weeks. People whose needs are mainly health needs may qualify for NHS Continuing Healthcare, which the NHS pays for in full. Attendance Allowance, which is not means-tested, can also be used towards the cost of care.',
      ],
    },
    {
      heading: 'What should I do next?',
      paragraphs: [
        'Make a list of the help your parent needs and when, get two or three written quotes, and compare them using the checklist above rather than on the headline hourly rate alone. Reliability, continuity and a good CQC report matter as much as price. This page is general information, not financial advice. For free, independent help with care costs you can call the Age UK Advice Line on 0800 678 1602, 8am to 7pm every day.',
        'If you would like a starting point, Hello Hattie’s free matching service can pass your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take new clients.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is £34.42 an hour what we will pay for home care?',
      a: 'Probably not. £34.42 an hour is the Homecare Association’s Minimum Price for Homecare in England for April 2026 to March 2027. It is the least an agency needs to charge to pay care workers properly for all their working time and run safely. Private prices are usually higher, and the figure is updated each April.',
    },
    {
      q: 'Why do short visits cost more per hour?',
      a: 'The care worker still has to travel to your parent and on to the next visit, and that time has to be paid. With a short visit, those fixed costs are spread over fewer minutes, so the hourly rate is higher. Many agencies set a minimum visit length for this reason.',
    },
    {
      q: 'Do home care agencies charge more at weekends and bank holidays?',
      a: 'Many do, and bank holiday rates are often higher again. Ask for the full list of rates in writing, including which days the agency treats as bank holidays.',
    },
    {
      q: 'Do we pay VAT on home care?',
      a: 'Care supplied by a CQC-registered home care agency is generally exempt from VAT, as HMRC treats it as a welfare service supplied by a state-regulated agency. If VAT appears on a quote, ask what it is being charged on.',
    },
    {
      q: 'Are we charged if a visit is cancelled?',
      a: 'It depends on the agency’s terms. Many charge for visits cancelled at short notice. Check the cancellation policy before you sign, including what happens if your parent goes into hospital.',
    },
    {
      q: 'Is it cheaper to employ a carer directly?',
      a: 'It can look cheaper per hour, but you take on the responsibilities of an employer, such as running payroll, paying holiday pay, arranging insurance and finding cover when the carer is off. A CQC-registered agency handles all of that and is inspected. Weigh up the extra work and risk as well as the price.',
    },
    {
      q: 'Will the council help pay for home care?',
      a: 'It might. In England the council can carry out a free needs assessment, then a financial assessment to see what your parent should contribute. Savings above £23,250 usually mean paying in full, but the value of the home they live in is not counted for care at home.',
    },
  ],
  sources: [
    {
      label: 'Homecare Association, Minimum Price for Homecare, England, April 2025 to March 2026 (previous year)',
      url: 'https://www.homecareassociation.org.uk/static/3a39caec-73af-428f-a261647e5a309c2f/Homecare-Association-Minimum-Price-for-Homecare-England-2025-2026.pdf',
    },
    {
      label: 'Homecare Association, Research and reports',
      url: 'https://www.homecareassociation.org.uk/about-us/research-and-reports.html',
    },
    {
      label: 'NICE, Home care: delivering personal care and practical support to older people living in their own homes (NG21)',
      url: 'https://www.nice.org.uk/guidance/ng21/chapter/Recommendations',
    },
    {
      label: 'GOV.UK, Welfare services and goods (VAT Notice 701/2)',
      url: 'https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012',
    },
    {
      label: 'GOV.UK, Care and support statutory guidance',
      url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance',
    },
    {
      label: 'NHS, Help at home from a paid carer',
      url: 'https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/homecare/',
    },
  ],
}
