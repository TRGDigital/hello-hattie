import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'How much does live-in care cost in England?',
      paragraphs: [
        'Live-in care means a trained care worker moves into your parent’s home and provides support through the day, usually for a set number of days or weeks before another carer takes over. Because the carer is there all day rather than visiting, most providers charge a weekly rate instead of an hourly one.',
        'There is no standard price. Weekly rates vary between providers, between regions, and above all with how much help your parent needs, especially at night. The type of service you choose makes a big difference too, because a fully managed service and an introductory agency charge for quite different things. The only figure you can rely on is a written quote given after the provider has assessed your parent.',
        'This guide explains how the weekly price is built up, what it should include, the extra costs families usually cover, and where help with funding may come from.',
      ],
    },
    {
      heading: 'What does the weekly price of live-in care usually include?',
      paragraphs: [
        'With a fully managed service, the weekly rate normally covers:',
      ],
      bullets: [
        'The live-in carer’s time and pay, for an agreed daily routine of care and support.',
        'An assessment of your parent’s needs and a written care plan, reviewed as needs change.',
        'Matching a carer to your parent’s needs, personality and interests.',
        'Cover for the carer’s daily breaks and for their holidays or sickness.',
        'Supervision, spot checks and training for the carer, and a manager you can contact.',
        'An on-call line for problems outside office hours.',
      ],
    },
    {
      heading: 'How are the live-in carer’s breaks and time off covered?',
      paragraphs: [
        'A live-in carer cannot work around the clock. They need a proper break every day, time off each week or at the end of a placement, and a good night’s sleep. How that time is covered is one of the most important things to understand before you agree a price.',
        'Some families cover the daily break themselves, for example by sitting with their parent for a couple of hours in the afternoon. Others ask the provider to send a visiting care worker during the break, which usually costs extra. When the regular carer goes on holiday or finishes a placement, a replacement carer needs to take over. A managed service arranges this and it is usually built into the weekly rate. With an introductory agency, you may need to agree cover yourself.',
        'Ask each provider:',
      ],
      bullets: [
        'How long is the carer’s daily break, and who looks after my parent during it?',
        'Is a replacement carer included when the regular carer has time off, and at what cost?',
        'How many regular carers will my parent have over a typical month?',
        'What happens if the carer is woken in the night more than occasionally?',
      ],
    },
    {
      heading: 'What is the difference between a fully managed service and an introductory agency?',
      paragraphs: [
        'There are two main ways live-in care is arranged in England. Both can work well, but the price you are quoted covers different things, so it is important to know which one you are dealing with.',
        'A fully managed service employs or directly manages the carer. Because it provides personal care, it must be registered with the Care Quality Commission (CQC), which inspects and rates it. The provider writes the care plan, supervises the carer, deals with problems, arranges replacement carers and carries responsibility for the quality and safety of the care. Weekly prices tend to be higher because all of this is included.',
        'An introductory agency introduces a self-employed carer to your family and charges a fee for doing so. The carer is paid by your family, usually directly. The CQC says introductory agencies do not need to register with it, as long as they have no ongoing role in directing or controlling the care once the introduction has been made. This can cost less, but more of the responsibility sits with your family, such as agreeing duties, checking the care is going well, and arranging cover.',
        'Neither model is right for everyone. If your parent’s needs are complex or likely to change, or the family cannot be closely involved, the oversight of a managed service may be worth the extra cost. If you want more say over who the carer is and are happy to manage the arrangement, an introductory agency may suit. Whichever you choose, ask exactly who is responsible for what, in writing.',
      ],
    },
    {
      heading: 'What makes live-in care cost more?',
      paragraphs: ['Your quote is likely to be higher if:'],
      bullets: [
        'Your parent needs help regularly through the night. One live-in carer cannot be up every night, so a second carer or a separate night carer may be needed.',
        'Your parent needs two people to move them safely, for example with a hoist. A visiting care worker may need to come in at set times to help.',
        'The needs are complex, such as advanced dementia, Parkinson’s, a stroke, or care at the end of life, which call for extra skills and training.',
        'The carer is supporting a couple rather than one person.',
        'The carer needs to drive, or your parent lives somewhere remote that is harder to staff.',
        'Care is needed at very short notice, or for a short period such as a few weeks after a hospital stay.',
      ],
    },
    {
      heading: 'What will the family need to provide on top of the weekly fee?',
      paragraphs: [
        'Most providers expect the household to provide:',
      ],
      bullets: [
        'A private, furnished bedroom for the carer.',
        'Food for the carer while they are working, or an agreed food allowance.',
        'Reasonable use of the kitchen, bathroom and household facilities.',
        'Internet access so the carer can stay in touch with family and the provider.',
        'Use of a car, or an allowance for fuel, if the carer will be driving your parent around.',
      ],
    },
    {
      heading: 'Is VAT charged on live-in care?',
      paragraphs: [
        'Personal care supplied by a CQC-registered care agency is generally exempt from VAT, because HMRC treats registered domiciliary care agencies as state-regulated welfare agencies. So a fully managed live-in service should not normally add VAT to its care charges.',
        'If you use an introductory agency, the care is supplied by the self-employed carer, and the agency charges its own fee for the introduction and any ongoing admin. Ask whether VAT is added to those fees, and read the contract carefully.',
      ],
    },
    {
      heading: 'Can the council or NHS help pay for live-in care?',
      paragraphs: [
        'In England, your parent can ask the council for a free needs assessment whatever their income or savings. If they have eligible needs, the council works out a personal budget, which is the amount it thinks it will cost to meet those needs, and a financial assessment decides how much your parent pays towards it.',
        'Some points to know:',
      ],
      bullets: [
        'The value of the home your parent lives in is not counted when care is provided at home.',
        'Savings above £23,250 usually mean paying in full. Between £14,250 and £23,250, your parent is treated as having £1 a week of income for every £250 of savings between the two limits.',
        'The council will fund what it assesses as needed to meet eligible needs. That may be visiting care rather than live-in care, and the personal budget may not cover the full cost of live-in care. If your parent wants more care than the council has assessed as needed, you can usually arrange and pay for the extra privately.',
        'If the council is contributing, your parent can ask for the money as a direct payment and use it to buy care from a provider they choose.',
        'People whose needs are mainly health needs may qualify for NHS Continuing Healthcare, which can be provided at home and is paid for in full by the NHS. Ask the GP, district nurse or hospital team about a checklist assessment.',
        'Attendance Allowance, at £76.70 or £114.60 a week, is not means-tested and can be spent on care.',
      ],
    },
    {
      heading: 'Is live-in care better value than visiting care or a care home?',
      paragraphs: [
        'If your parent only needs help at set times, such as getting up, meals and going to bed, visiting care is usually simpler and cheaper, because you only pay for the hours used. Live-in care starts to make sense when help is needed at many points through the day, when your parent is not safe alone for long, or when the family wants the reassurance of someone in the house overnight.',
        'Compared with a care home, live-in care gives one-to-one support and keeps your parent at home with their routines, belongings, neighbours and pets. A care home has staff on site around the clock, including at night, and the company of other residents. How the costs compare depends on your parent’s needs and on how the house would be treated in the financial assessment, because the home can be counted for a care home but not for care at home. Our guide comparing live-in care and care homes goes into this in more detail.',
      ],
    },
    {
      heading: 'How do I get and compare live-in care quotes?',
      paragraphs: [
        'Speak to more than one provider, ask for an assessment, and get every quote in writing. Check whether it is a managed service or an introductory agency, exactly what the weekly rate includes, how breaks and holidays are covered, what the family must provide, how much notice you need to give, and whether rates rise on bank holidays. For a managed service, read its latest CQC inspection report.',
        'This page is general information, not financial advice. For free, independent help with care costs and benefits, call the Age UK Advice Line on 0800 678 1602, 8am to 7pm every day.',
        'If you would like help getting started, Hello Hattie’s free matching service can pass your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take new clients.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is live-in care charged by the hour?',
      a: 'Usually not. Most providers charge a weekly rate. Ask exactly what that rate includes, especially cover for the carer’s daily breaks and time off, and whether bank holidays cost more.',
    },
    {
      q: 'Do we need a spare room for live-in care?',
      a: 'Yes. The carer needs a private bedroom. Families usually provide the carer’s food while they are working, use of the bathroom and kitchen, and internet access.',
    },
    {
      q: 'Can one live-in carer provide care day and night?',
      a: 'Not on a regular basis. A live-in carer needs a proper night’s sleep and a daily break. If your parent needs help most nights, a second carer or a separate night carer is usually needed, which raises the cost.',
    },
    {
      q: 'What is the difference between a managed and an introductory agency?',
      a: 'A managed service employs or directly manages the carer, runs the care plan and arranges cover, and must be registered with the CQC. An introductory agency introduces a self-employed carer and does not need to register with the CQC if it has no ongoing role in directing the care, so more of the responsibility sits with your family.',
    },
    {
      q: 'Is VAT charged on live-in care?',
      a: 'Care supplied by a CQC-registered agency is generally exempt from VAT. If you use an introductory agency, ask whether VAT is added to its own fees.',
    },
    {
      q: 'Will we have to sell the house to pay for live-in care?',
      a: 'No. In England, if care is provided so your parent can stay living at home, the value of that home is not counted in the council’s financial assessment. Savings and income are counted.',
    },
    {
      q: 'Can the council help pay for live-in care?',
      a: 'It may contribute if your parent has eligible needs and the financial assessment shows they qualify. The council funds what it assesses as needed, which may be less than the full cost of live-in care. NHS Continuing Healthcare can also fund care at home for people whose needs are mainly health needs.',
    },
  ],
  sources: [
    {
      label: 'Care Quality Commission, Personal care: ongoing role, introductory agencies and individual care workers',
      url: 'https://www.cqc.org.uk/guidance-providers/registration/personal-care-ongoing-role-introductory-agencies-individual-care',
    },
    {
      label: 'GOV.UK, Welfare services and goods (VAT Notice 701/2)',
      url: 'https://www.gov.uk/guidance/welfare-services-and-goods-notice-7012',
    },
    {
      label: 'GOV.UK, Social care charging for care and support 2026 to 2027',
      url: 'https://www.gov.uk/government/publications/social-care-charging-for-local-authorities-2026-to-2027/social-care-charging-for-care-and-support-2026-to-2027-local-authority-circular',
    },
    {
      label: 'NHS, NHS continuing healthcare',
      url: 'https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/',
    },
    {
      label: 'GOV.UK, Attendance Allowance: what you’ll get',
      url: 'https://www.gov.uk/attendance-allowance/what-youll-get',
    },
    {
      label: 'Age UK, Financial assessment for care',
      url: 'https://www.ageuk.org.uk/information-advice/care/paying-for-care/financial-assessment/',
    },
  ],
}
