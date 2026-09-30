import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'Who pays for care at home in England?',
      paragraphs: [
        'There are three main ways care at home gets paid for in England, and many families end up with a mix of them:',
      ],
      bullets: [
        'Self-funding. Your parent pays the agency directly from their own income and savings, and chooses who provides the care and when.',
        'Council-funded care. The council assesses your parent’s needs and finances, then pays some or all of the cost. It can arrange the care itself, or give your parent the money as a direct payment so they can arrange it.',
        'NHS funding. If your parent’s needs are mainly health needs, the NHS may pay for all of their care through NHS Continuing Healthcare.',
      ],
    },
    {
      heading: 'How do we get a council needs assessment?',
      paragraphs: [
        'Anyone in England who appears to need care and support can ask their local council’s adult social care team for a needs assessment. It is free, and your parent’s income and savings make no difference to whether they can have one. You can ask on your parent’s behalf with their agreement, by phone or through the council’s website. GOV.UK can tell you which council covers their address.',
        'The assessment looks at what your parent can and cannot manage day to day, such as washing, dressing, eating, using the toilet, keeping the home safe and seeing other people. Their needs are eligible for council support if all three of these apply:',
      ],
      bullets: [
        'The needs come from a physical or mental impairment or illness.',
        'Because of those needs, your parent cannot achieve two or more of the everyday outcomes set out in the rules.',
        'As a result, there is, or is likely to be, a significant impact on their wellbeing.',
      ],
    },
    {
      heading: 'How does the council’s financial assessment work, step by step?',
      paragraphs: [
        'If your parent has eligible needs and the council is going to arrange or pay for care, it carries out a financial assessment, sometimes called a means test, to work out what your parent should pay. In broad terms it works like this:',
      ],
      bullets: [
        'Step 1. The council works out the cost of meeting your parent’s eligible needs. This is their personal budget.',
        'Step 2. It looks at your parent’s capital, such as savings and investments. The value of the home they live in is ignored.',
        'Step 3. It adds up their weekly income, such as State Pension, private pensions and most benefits.',
        'Step 4. It takes off housing costs such as rent and council tax (after any help with these), and an allowance for disability-related expenditure.',
        'Step 5. It makes sure your parent is left with at least the minimum income guarantee. Whatever is left above that is the most they can be asked to pay each week.',
        'Step 6. The council pays the rest of the personal budget. It must not charge more than it costs to meet your parent’s needs, and it should explain its calculation to you in writing.',
      ],
    },
    {
      heading: 'What are the savings limits for council help with care at home?',
      paragraphs: [
        'The national limits have stayed the same for 2025 to 2026 and 2026 to 2027:',
      ],
      bullets: [
        'Savings and capital above £23,250: your parent is usually expected to pay the full cost of their care.',
        'Between £14,250 and £23,250: your parent is treated as having £1 a week of extra income for every £250 of savings between the two limits. This is called tariff income.',
        'Below £14,250: savings are ignored and your parent contributes from income only.',
      ],
    },
    {
      heading: 'How is tariff income worked out? A worked example',
      paragraphs: [
        'Say your parent has £18,250 in savings. That is £4,000 above the lower limit of £14,250. £4,000 divided by £250 is 16, so the council treats them as having £16 a week of tariff income, which is added to their other income in the assessment. This matches the example in the government’s own statutory guidance.',
        'For care outside a care home, councils are allowed to set higher capital limits if they choose, so check your council’s charging policy. Also be aware that if someone gives money away to avoid paying for care, the council can treat them as still having it. This is called deprivation of assets.',
      ],
    },
    {
      heading: 'Will the house be counted if my parent has care at home?',
      paragraphs: [
        'No. If your parent needs care so they can stay living at home, the value of the home they live in is not included in the council’s financial assessment. Savings, investments and any second property can be counted.',
        'This is different from moving into a care home, where the home can be counted in some circumstances. You may hear about deferred payment agreements, which let someone delay selling their home to pay for care. These are mainly for care home fees and certain supported living accommodation, not for care in your parent’s own home, because the home is not counted for care at home in the first place.',
      ],
    },
    {
      heading: 'How much income will my parent be left with?',
      paragraphs: [
        'After charges, the council must leave your parent with a set amount to live on, called the minimum income guarantee. For 2026 to 2027, for a single person who has reached Pension Credit age, it is £241.45 a week. The amounts are different for couples and younger adults, and extra is added in some cases, for example for disability or caring responsibilities. This is a minimum, and councils can let people keep more.',
        'Councils can count disability benefits such as Attendance Allowance as income. If they do, they must let your parent keep enough to cover disability-related expenditure, meaning extra costs caused by their illness or disability that the council is not already meeting. Government guidance lists examples, including:',
      ],
      bullets: [
        'A community alarm system.',
        'Care or help your parent arranges privately, including night care the council is not providing.',
        'Extra laundry, bedding or special washing products, for example because of incontinence.',
        'Heating or water costs above the average for the area.',
        'Special diets, clothing or footwear needed because of a condition.',
        'Cleaning, domestic help or basic garden maintenance needed because of disability.',
        'Buying, maintaining or repairing disability equipment.',
      ],
    },
    {
      heading: 'What is Attendance Allowance and how do we claim it?',
      paragraphs: [
        'Attendance Allowance is a benefit for people over State Pension age who need help with personal care or supervision because of a disability or health condition, and have needed that help for at least 6 months. It is not means-tested, it does not depend on having a carer, and it can be spent on anything, including care.',
        'It is paid at £76.70 a week (lower rate) for frequent help or supervision during the day, or supervision at night, or £114.60 a week (higher rate) for help or supervision both day and night. People nearing the end of life can claim more quickly under special rules and get the higher rate. Getting Attendance Allowance can also mean extra Pension Credit, Housing Benefit or Council Tax Reduction.',
        'You can claim online or by post. If you call the Attendance Allowance helpline on 0800 731 0122 (Monday to Friday, 8am to 6pm) to ask for a form, the claim can start from the date of your call, as long as the form is returned within 6 weeks. In Scotland, Pension Age Disability Payment replaces it.',
      ],
    },
    {
      heading: 'What are personal budgets, direct payments and top ups?',
      paragraphs: [
        'If the council is contributing, your parent will have a personal budget. They can let the council arrange the care, or take the money as a direct payment and use it to pay an agency or carer of their choice. They then need to keep records and show the council how the money is spent.',
        'Direct payments can be used to employ a personal assistant, but there are limits on paying close family. A spouse or partner, or a close relative who lives in the same household, can only be paid from a direct payment if the council decides it is necessary.',
        'You may hear the term top up. Formal top up arrangements are mainly used when someone chooses a care home that costs more than the council’s budget. With care at home, if your parent wants more care than the council has assessed as needed, they can usually pay an agency privately for the extra hours.',
      ],
    },
    {
      heading: 'What is NHS Continuing Healthcare and when does it apply?',
      paragraphs: [
        'NHS Continuing Healthcare is care arranged and paid for in full by the NHS for adults with long-term, complex health needs. It is not means-tested, and it can be provided in your parent’s own home. Eligibility depends on the level and nature of their needs, not on a particular diagnosis.',
        'Most people first have a short checklist assessment, which a nurse, doctor, other health professional or social worker can complete. If it suggests your parent might qualify, a team of at least two professionals carries out a full assessment covering areas such as breathing, eating and drinking, mobility, cognition and behaviour. A decision should usually be made within 28 days. People whose health is deteriorating quickly near the end of life can be fast-tracked, usually within 48 hours. If your parent qualifies, the care is normally reviewed within 3 months and then at least once a year.',
        'If your parent has complex or changing health needs, ask the GP, district nurse or hospital team about a checklist. Beacon gives free, independent advice on NHS Continuing Healthcare on 0345 548 0300.',
      ],
    },
    {
      heading: 'What if my parent pays for their own care?',
      paragraphs: [
        'Many families pay privately and arrange care directly with an agency. It is still worth asking for a needs assessment, because it sets out exactly what help is needed and gives you a record to show agencies. Your parent can also ask the council to arrange care for them even if they are paying in full, though the council may charge an arrangement fee.',
        'Some help is free whatever your parent’s finances. Reablement or intermediate care arranged by the council, often after a hospital stay, must be free for up to 6 weeks, and so must aids and minor adaptations costing up to £1,000. If savings are falling towards £23,250, contact the council about 3 months beforehand and ask for a financial assessment, because council funding usually only starts from when you get in touch.',
      ],
    },
    {
      heading: 'Where can we get free, independent advice?',
      paragraphs: [
        'This page is general information, not financial advice, and it covers England only. Scotland, Wales and Northern Ireland have different rules and limits. For free, independent help, call the Age UK Advice Line on 0800 678 1602, 8am to 7pm every day. Your council’s adult social care team must also give you information and advice about care and paying for it.',
        'When you are ready to look for care, Hello Hattie’s free matching service can pass your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take new clients.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Will we have to sell the house to pay for care at home?',
      a: 'No. In England, if care is needed so your parent can stay living at home, the value of the home they live in is not counted in the council’s financial assessment.',
    },
    {
      q: 'What are the savings limits for council help in England?',
      a: 'The upper limit is £23,250 and the lower limit is £14,250, unchanged for 2026 to 2027. Between the two, your parent is treated as having £1 a week of income for every £250 of savings. Councils can choose to set higher limits for care at home.',
    },
    {
      q: 'Is the needs assessment free?',
      a: 'Yes. Anyone who appears to need care and support can have a council needs assessment, whatever their income or savings.',
    },
    {
      q: 'How much is Attendance Allowance?',
      a: 'It is £76.70 a week at the lower rate and £114.60 a week at the higher rate. It is not means-tested and can be spent on anything, including care.',
    },
    {
      q: 'Can we get a deferred payment agreement for care at home?',
      a: 'Generally not. Deferred payment agreements are for care home fees and certain supported living accommodation. For care at home, the home your parent lives in is not counted in the financial assessment anyway.',
    },
    {
      q: 'Can we choose our own agency if the council is paying?',
      a: 'Yes, if your parent takes the council’s funding as a direct payment. They then arrange and pay for care themselves and show the council how the money is spent.',
    },
    {
      q: 'Can the NHS pay for care at home?',
      a: 'Yes, through NHS Continuing Healthcare, if your parent’s needs are mainly health needs. It is not means-tested and can be provided at home. Ask the GP, district nurse or hospital team about a checklist assessment.',
    },
    {
      q: 'Are the rules the same across the UK?',
      a: 'No. The limits and rules on this page apply in England. Scotland, Wales and Northern Ireland have their own systems.',
    },
  ],
  sources: [
    {
      label: 'GOV.UK, Social care charging for care and support 2026 to 2027',
      url: 'https://www.gov.uk/government/publications/social-care-charging-for-local-authorities-2026-to-2027/social-care-charging-for-care-and-support-2026-to-2027-local-authority-circular',
    },
    {
      label: 'GOV.UK, Care and support statutory guidance',
      url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance',
    },
    {
      label: 'GOV.UK, Attendance Allowance',
      url: 'https://www.gov.uk/attendance-allowance',
    },
    {
      label: 'NHS, NHS continuing healthcare',
      url: 'https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/',
    },
    {
      label: 'NHS, Paying for your own care (self-funding)',
      url: 'https://www.nhs.uk/social-care-and-support/money-work-and-benefits/paying-for-your-own-care-self-funding/',
    },
    {
      label: 'legislation.gov.uk, Care and Support (Direct Payments) Regulations 2014, regulation 3',
      url: 'https://www.legislation.gov.uk/uksi/2014/2871/regulation/3/made',
    },
  ],
}
