import type { Article, Img } from './types'
import { POSTS } from './posts'

const UPDATED = '2026-09-30'

const HCA_SOURCE = {
  label: 'Homecare Association Minimum Price for Homecare, England, April 2025 to March 2026',
  url: 'https://www.homecareassociation.org.uk/static/3a39caec-73af-428f-a261647e5a309c2f/Homecare-Association-Minimum-Price-for-Homecare-England-2025-2026.pdf',
}
const CAPITAL_SOURCE = {
  label: 'GOV.UK, Social care charging for care and support 2025 to 2026',
  url: 'https://www.gov.uk/government/publications/social-care-charging-for-local-authorities-2025-to-2026/social-care-charging-for-care-and-support-2025-to-2026-local-authority-circular',
}
const HOME_SOURCE = {
  label: 'Age UK, Financial assessment for care',
  url: 'https://www.ageuk.org.uk/information-advice/care/paying-for-care/financial-assessment/',
}
const AA_SOURCE = {
  label: 'GOV.UK, Attendance Allowance rates',
  url: 'https://www.gov.uk/attendance-allowance/what-youll-get',
}

const MATCH_INVITE =
  'If you would like help finding a CQC-registered agency near you, our free matching service can put you in touch with local agencies.'

const BASE: Article[] = [
  // ---------------------------------------------------------------- COSTS
  {
    slug: 'home-care-cost-per-hour',
    kind: 'cost',
    title: 'How much does home care cost per hour?',
    metaTitle: 'Home care cost per hour: what affects the price',
    metaDescription:
      'What changes the hourly price of home care, what the £32.14 Homecare Association minimum means, and how to compare quotes from agencies.',
    summary:
      'Home care is usually charged by the hour, but the price depends on where you live, when visits happen and how long they last. Here is what shapes the cost and how to compare quotes fairly.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Why there is no single hourly price',
        paragraphs: [
          'Home care agencies set their own prices, so the hourly rate you are quoted can vary quite a lot from one agency to the next, even in the same town.',
          'The price reflects what it costs the agency to recruit, train and pay carers, cover their travel, supervise the care and meet the standards the Care Quality Commission (CQC) expects.',
        ],
      },
      {
        heading: 'What affects the hourly price',
        paragraphs: ['A few things make the biggest difference to what you pay:'],
        bullets: [
          'Where you live. Prices tend to be higher where wages and living costs are higher, and in rural areas where carers travel further between visits.',
          'Time of day. Early mornings, evenings and nights can cost more than daytime visits.',
          'Weekends and bank holidays. Many agencies charge a higher rate on these days.',
          'Visit length. Short visits usually cost more per hour than longer ones, because the carer’s travel and time between visits still has to be paid for.',
          'Travel. Some agencies build travel into the hourly rate, others add a mileage charge if the carer uses their car for errands.',
          'The type of care. Support with more complex needs, or visits that need two carers, will cost more.',
        ],
      },
      {
        heading: 'The Homecare Association minimum price explained',
        paragraphs: [
          'The Homecare Association, the trade body for home care providers, works out a minimum price for home care in England each year. For April 2025 to March 2026 it is £32.14 an hour.',
          'This is not a typical price. It is the minimum an agency needs to charge to pay carers at least the National Living Wage for all their working time, including travel between visits, and to run the service safely. Private prices are usually higher than this.',
          'It is still useful to know. If a quote is well below this figure, it is fair to ask the agency how it pays its carers for travel time and how it keeps the service safe.',
        ],
      },
      {
        heading: 'What is usually included',
        paragraphs: [
          'The hourly rate normally covers the carer’s time with you and the agency’s work behind the scenes, such as the care assessment, writing and reviewing the care plan, training, supervision and an on-call service for problems outside office hours.',
          'Ask whether anything is charged on top, for example mileage for shopping trips, a set-up or assessment fee, or higher rates on bank holidays.',
        ],
      },
      {
        heading: 'How to compare quotes',
        paragraphs: [
          'Ask each agency to put its prices in writing so you can compare like with like. Check the weekday, evening, weekend and bank holiday rates, the shortest visit length they offer and how they charge for it.',
          'Price is only part of the picture. Ask about continuity of carers, how they handle late or missed visits, and check their latest CQC report. You can use our care cost calculator to get a rough idea of a weekly total for the hours you have in mind.',
          MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Is £32.14 an hour what I will pay?',
        a: 'Not necessarily. £32.14 an hour is the Homecare Association’s minimum price for England for April 2025 to March 2026. It is the least an agency needs to charge to run safely and pay carers properly. Private prices are usually higher.',
      },
      {
        q: 'Why do short visits cost more per hour?',
        a: 'The carer still has to travel to you and between visits, and that time has to be paid. When a visit is short, those fixed costs are spread over less time, so the hourly rate is higher.',
      },
      {
        q: 'Do agencies charge more at weekends?',
        a: 'Many do, and bank holiday rates are often higher again. Always ask for the full list of rates in writing.',
      },
      {
        q: 'Will the council pay for some of my care?',
        a: 'It might. In England the council can carry out a needs assessment and a financial assessment to work out whether it will contribute. Our guide to paying for care at home explains how this works.',
      },
    ],
    sources: [HCA_SOURCE],
  },
  {
    slug: 'live-in-care-cost',
    kind: 'cost',
    title: 'How much does live-in care cost?',
    metaTitle: 'Live-in care cost: how it is priced',
    metaDescription:
      'How live-in care is priced, the difference between managed and introductory agencies, what raises the cost and what families need to provide.',
    summary:
      'Live-in care is usually charged as a weekly rate rather than by the hour. The price depends on the type of agency, the level of need and a few practical details at home.',
    updated: UPDATED,
    sections: [
      {
        heading: 'How live-in care is priced',
        paragraphs: [
          'With live-in care, a carer lives in the home and provides support through the day. Instead of an hourly rate, most agencies charge a weekly rate that covers the carer’s time, their breaks and the agency’s support.',
          'Prices vary between agencies and areas, so the only reliable figure is a written quote. Agencies will usually visit or speak with you to assess the care needed, then give you a written quote based on that assessment.',
        ],
      },
      {
        heading: 'Managed and introductory agencies',
        paragraphs: ['There are two main ways live-in care is arranged, and they work quite differently:'],
        bullets: [
          'Managed service. The agency employs or directly manages the carer, writes and reviews the care plan, supervises the care and arranges cover. It must be registered with the CQC in England. This usually costs more, but the agency carries the responsibility.',
          'Introductory agency. The agency introduces a self-employed carer and you, or the person receiving care, take on more of the organising, such as agreeing duties and arranging cover. It can cost less, but more of the responsibility sits with the family.',
        ],
      },
      {
        heading: 'What can raise the price',
        paragraphs: ['Your quote is likely to be higher if:'],
        bullets: [
          'Care is needed through the night as well as the day, so a second carer is needed.',
          'The person has complex needs, such as advanced dementia or help with moving that needs two people.',
          'The carer is supporting a couple rather than one person.',
          'Cover is needed for the carer’s breaks and time off, which most agencies include or arrange at a cost.',
        ],
      },
      {
        heading: 'What the family provides',
        paragraphs: [
          'Families are usually expected to provide the carer with a private bedroom, food while they are working, and reasonable access to the internet and a bathroom. Some agencies also ask for a contribution to travel costs at changeovers.',
          'Ask each agency exactly what is expected so there are no surprises later.',
        ],
      },
      {
        heading: 'How it compares with other types of care',
        paragraphs: [
          'Live-in care gives one-to-one support in the person’s own home, which visiting care cannot match for people who need help at many points in the day. For people who only need help at set times, visiting care is often the simpler and cheaper choice.',
          'Compared with a care home, live-in care keeps someone at home with their routines, belongings and pets, while a care home offers round-the-clock staff on site and company from other residents. Which one works out better value depends on the level of need and the person’s wishes.',
        ],
      },
      {
        heading: 'Getting quotes',
        paragraphs: [
          'Speak with more than one agency, ask for written quotes after an assessment, and check what is included, how breaks are covered and what notice period applies. Check each agency’s latest CQC report too.',
          MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Is live-in care charged by the hour?',
        a: 'Usually not. Most agencies charge a weekly rate. Ask what that rate includes, especially cover for the carer’s breaks.',
      },
      {
        q: 'Do we need a spare room for live-in care?',
        a: 'Yes. The carer needs a private bedroom. Families usually provide food for the carer too.',
      },
      {
        q: 'What is the difference between a managed and an introductory agency?',
        a: 'A managed agency directly manages the carer and the care, and must be CQC-registered in England. An introductory agency introduces a self-employed carer and leaves more of the organising to the family.',
      },
      {
        q: 'Can the council help pay for live-in care?',
        a: 'In England the council may contribute if the person is assessed as needing care and the financial assessment shows they qualify. Our guide to paying for care at home explains the rules.',
      },
    ],
  },
  {
    slug: 'paying-for-home-care',
    kind: 'cost',
    title: 'Paying for care at home',
    metaTitle: 'Paying for care at home in England',
    metaDescription:
      'Council assessments, the £23,250 and £14,250 savings limits, Attendance Allowance, direct payments and NHS funding for care at home in England.',
    summary:
      'Some people pay for all their home care, others get help from the council, benefits or the NHS. Here is how funding for care at home works in England.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Start with a council needs assessment',
        paragraphs: [
          'In England, anyone who seems to need care and support can ask their local council for a free needs assessment, whatever their income or savings. You can ask for one for yourself or for a parent, with their agreement.',
          'The assessment looks at what the person can and cannot manage day to day, and whether their needs meet the national eligibility rules. If they do, the council moves on to a financial assessment.',
        ],
      },
      {
        heading: 'The financial assessment and savings limits',
        paragraphs: [
          'The financial assessment, sometimes called a means test, works out how much the person should pay towards their care. For 2025 to 2026 in England the limits are:',
        ],
        bullets: [
          'Savings and capital above £23,250: the person usually pays for their own care in full.',
          'Between £14,250 and £23,250: the council may help, but the person contributes. They are treated as having £1 a week of income for every £250 of savings between the two limits.',
          'Below £14,250: savings are ignored, and the person contributes from their income only.',
        ],
      },
      {
        heading: 'Your home is not counted for care at home',
        paragraphs: [
          'If someone needs care so they can stay living at home, the council’s financial assessment does not include the value of the home they live in. This is different from moving into a care home, where the home can be counted.',
          'Income such as pensions is usually taken into account, but the council must leave the person with a set amount to live on. The council will explain its calculation in writing.',
        ],
      },
      {
        heading: 'Attendance Allowance',
        paragraphs: [
          'Attendance Allowance is a benefit for people over State Pension age who need help because of an illness or disability. It is not means-tested, so savings and income do not affect it, and it can be spent however the person chooses, including on care.',
          'It is currently paid at £76.70 a week (lower rate) for help during the day or the night, or £114.60 a week (higher rate) for help both day and night. You apply through GOV.UK. Scotland has its own benefit instead.',
        ],
      },
      {
        heading: 'Direct payments and NHS funding',
        paragraphs: [
          'If the council is paying towards care, you can ask for the money as a direct payment. This lets the person choose and pay for their own agency or carer, rather than using one the council arranges.',
          'NHS Continuing Healthcare is care fully funded by the NHS for people whose needs are mainly health needs. It is not means-tested, but the eligibility bar is high. If a parent has complex or changing health needs, ask their GP, nurse or hospital team whether they should be screened for it.',
        ],
      },
      {
        heading: 'Paying for care yourself',
        paragraphs: [
          'Many families pay for home care privately, often called self-funding. You arrange care directly with an agency, so you choose who provides it and when. It is still worth asking the council for a needs assessment, as the advice can be useful and circumstances change as savings go down.',
          'Check whether the person is claiming every benefit they are entitled to, such as Attendance Allowance. Age UK and your council can help with this. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Will we have to sell the house to pay for care at home?',
        a: 'No. In England, if care is needed so someone can stay at home, the value of the home they live in is not counted in the council’s financial assessment.',
      },
      {
        q: 'What are the savings limits for council help in England?',
        a: 'For 2025 to 2026 the upper limit is £23,250 and the lower limit is £14,250. Between the two, the person is treated as having £1 a week of income for every £250 of savings.',
      },
      {
        q: 'How much is Attendance Allowance?',
        a: 'It is currently £76.70 a week at the lower rate and £114.60 a week at the higher rate. It is not means-tested.',
      },
      {
        q: 'Can we choose our own agency if the council is paying?',
        a: 'Yes, if you take the council’s funding as a direct payment. You then arrange and pay for care yourself, and account to the council for how the money is spent.',
      },
      {
        q: 'Are the rules the same across the UK?',
        a: 'No. The limits and rules on this page apply in England. Scotland, Wales and Northern Ireland have their own systems.',
      },
    ],
    sources: [CAPITAL_SOURCE, HOME_SOURCE, AA_SOURCE],
  },

  // ---------------------------------------------------------------- GUIDES
  {
    slug: 'live-in-care-vs-care-home',
    kind: 'guide',
    title: 'Live-in care or a care home?',
    metaTitle: 'Live-in care or a care home? A fair comparison',
    metaDescription:
      'What live-in care and care homes each involve, who each tends to suit, and the questions to talk through as a family before you decide.',
    summary:
      'Both live-in care and care homes can give someone support day and night. This guide sets out what each involves and who each tends to suit, so you can decide together.',
    updated: UPDATED,
    sections: [
      {
        heading: 'What live-in care involves',
        paragraphs: [
          'A carer lives in the person’s home and supports them with daily life: personal care, meals, medication support as set out in the care plan, housework and company. Carers usually change over on a regular rota, and the agency arranges cover for breaks.',
          'The person keeps their own home, routines, belongings, neighbours and often their pets. The home needs a spare bedroom for the carer.',
        ],
      },
      {
        heading: 'What a care home involves',
        paragraphs: [
          'A care home provides a room, meals, personal care and activities, with staff on site day and night. Nursing homes also have registered nurses on duty for people with health needs that need a nurse.',
          'The person moves to a new place, but gains company from other residents and staff, and the family no longer has to manage a household or a carer’s living arrangements.',
        ],
      },
      {
        heading: 'Who live-in care can suit',
        paragraphs: ['Live-in care often works well for:'],
        bullets: [
          'People who feel strongly about staying at home.',
          'People living with dementia who are calmer in familiar surroundings.',
          'Couples who want to stay together at home.',
          'People with a pet they could not take to a care home.',
          'Families who want one-to-one attention for their relative.',
        ],
      },
      {
        heading: 'Who a care home can suit',
        paragraphs: ['A care home is often the better fit for:'],
        bullets: [
          'People who are lonely at home and would enjoy more company.',
          'People whose home is no longer safe or practical, and cannot easily be adapted.',
          'People who need several staff at once, or nursing care at any hour.',
          'Families who cannot offer a spare room or manage a carer living in.',
        ],
      },
      {
        heading: 'Talking it through as a family',
        paragraphs: [
          'Start with what matters most to the person: staying at home, company, feeling safe, being near family. Where they can take part, their wishes should lead the decision.',
          'Check CQC reports for any agency or home you are considering, visit or meet them, and ask how they would meet your relative’s specific needs. Remember the choice can change later if needs change. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Is live-in care safe for someone with dementia?',
        a: 'It can be, and many people with dementia find familiar surroundings reassuring. The agency should assess their needs and train carers in dementia care. If needs become very complex, a care home may be safer.',
      },
      {
        q: 'Does live-in care mean the same carer all the time?',
        a: 'Usually carers work in rotation, with regular changeovers. A good agency aims to keep a small, consistent team so your relative gets to know them.',
      },
      {
        q: 'Can a couple have live-in care together?',
        a: 'Yes. Many agencies support couples at home, though the price is usually higher than for one person.',
      },
      {
        q: 'Who regulates live-in care and care homes?',
        a: 'In England, both managed live-in care agencies and care homes are regulated by the Care Quality Commission (CQC), which inspects them and publishes reports.',
      },
    ],
  },
  {
    slug: 'choosing-a-home-care-agency',
    kind: 'guide',
    title: 'How to choose a home care agency',
    metaTitle: 'How to choose a home care agency',
    metaDescription:
      'Check CQC registration and ratings, ask the right questions, and understand contracts, notice and trial periods before you choose a home care agency.',
    summary:
      'Choosing an agency is about more than price. Check its CQC report, ask good questions and read the contract before you agree to anything.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Check CQC registration and reports',
        paragraphs: [
          'In England, any agency providing personal care at home must be registered with the Care Quality Commission (CQC). You can search for the agency by name or postcode on the CQC website to see its rating and read its latest inspection report.',
          'Read the report, not just the rating. It shows what inspectors found about safety, staffing, kindness and how well the agency is run. Check the date of the report and whether the agency has made improvements since.',
        ],
      },
      {
        heading: 'Questions to ask agencies',
        paragraphs: ['A good agency will be happy to answer these clearly:'],
        bullets: [
          'How will you assess my relative’s needs and write the care plan?',
          'What training do your carers have, including dementia care if needed?',
          'Do you cover the area reliably, including at weekends?',
          'What are your rates for weekdays, evenings, weekends and bank holidays?',
          'Who do we contact out of hours, and how quickly will someone respond?',
          'How often will the care plan be reviewed?',
        ],
      },
      {
        heading: 'Continuity of carers',
        paragraphs: [
          'Seeing the same small group of carers matters, especially for someone living with dementia or who is anxious about strangers in the home. Ask how the agency plans rotas, how many different carers your relative is likely to see, and whether you will be told in advance who is coming.',
        ],
      },
      {
        heading: 'Late and missed visits',
        paragraphs: [
          'Ask how the agency tracks visits, what counts as late, and what happens if a carer cannot make it. Find out whether they will phone you, and how they make sure a visit is never simply missed.',
          'Ask too how complaints are handled and who you can go to if you are not happy with the response.',
        ],
      },
      {
        heading: 'Contracts, notice and trial periods',
        paragraphs: [
          'Read the contract before signing. Check the notice period for ending care, how much notice you must give to cancel a single visit, how price rises are handled and what happens if your relative goes into hospital.',
          'Some agencies offer a trial period. It is a good chance to see whether the carers and your relative get on. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I check an agency’s CQC rating?',
        a: 'Search for the agency by name or postcode on the CQC website. Its page shows the current rating and the latest inspection report.',
      },
      {
        q: 'Should I only consider agencies rated Good or Outstanding?',
        a: 'Those ratings are a good sign. If an agency is rated lower, read the report to see what the concerns were and ask the agency what it has changed since.',
      },
      {
        q: 'Can we change agency if it is not working out?',
        a: 'Yes. Check the notice period in your contract, and try to arrange the new agency before care ends so there is no gap.',
      },
      {
        q: 'What if the agency is new and not yet rated?',
        a: 'New agencies can be registered but not yet inspected. Ask about the managers’ experience, their training and how they will keep you informed.',
      },
    ],
  },
  {
    slug: 'what-does-a-home-carer-do',
    kind: 'guide',
    title: 'What does a home carer do?',
    metaTitle: 'What does a home carer do? Tasks explained',
    metaDescription:
      'The everyday support a home carer can give, from personal care and meals to company, and the tasks carers usually cannot do.',
    summary:
      'Home carers help people with everyday life so they can stay at home safely. What they do is set out in a care plan agreed with you and the person receiving care.',
    updated: UPDATED,
    sections: [
      {
        heading: 'It starts with a care plan',
        paragraphs: [
          'Before care begins, the agency assesses the person’s needs and agrees a care plan with them and, where appropriate, the family. The plan sets out what the carer will do at each visit, and how the person likes things done.',
          'Carers follow the plan, record what they have done, and tell the agency if they notice changes.',
        ],
      },
      {
        heading: 'Personal care and medication support',
        paragraphs: ['Much of a carer’s work is helping with personal tasks, always with dignity and at the person’s pace:'],
        bullets: [
          'Help getting up, washed, dressed and ready for bed.',
          'Help with using the toilet and continence care.',
          'Support with moving around the home safely.',
          'Reminding, prompting or helping with medication, only as agreed in the care plan.',
        ],
      },
      {
        heading: 'Meals and household help',
        paragraphs: ['Carers also help keep daily life running smoothly at home:'],
        bullets: [
          'Preparing meals and drinks, and encouraging the person to eat and drink.',
          'Light housework, washing up, laundry and changing beds.',
          'Shopping, collecting prescriptions and posting letters.',
          'Keeping an eye on the home and letting the family know about any worries.',
        ],
      },
      {
        heading: 'Company and getting out',
        paragraphs: [
          'Companionship is a real part of the job. Carers can chat, share a hobby, go for a walk, help with phone or video calls to family, or go along to appointments and social activities.',
        ],
      },
      {
        heading: 'What carers usually cannot do',
        paragraphs: [
          'Home carers are not nurses. Clinical tasks, such as some injections, wound care or catheter care, are usually done by a community nurse. A carer can only take on a clinical task if they are trained, the agency agrees and it is written into the care plan.',
          'Carers also cannot usually handle large sums of money or make decisions on the person’s behalf. If you are unsure whether something is included, ask the agency before care starts. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a carer give my parent their medication?',
        a: 'It depends on the care plan. Carers can remind, prompt or help with medication when this has been agreed and they are trained. The agency will explain what level of support it offers.',
      },
      {
        q: 'Will the carer clean the whole house?',
        a: 'Carers usually do light housework linked to the person’s care, such as washing up, laundry and keeping the kitchen and bathroom clean. Deep cleaning is not normally included.',
      },
      {
        q: 'Can a carer take my parent to appointments?',
        a: 'Often, yes. Ask the agency how this works, and whether there is any charge for mileage.',
      },
      {
        q: 'What if my parent’s needs change?',
        a: 'Tell the agency. The care plan should be reviewed and updated so the support matches what your parent needs now.',
      },
    ],
  },
  {
    slug: 'arranging-care-after-hospital',
    kind: 'guide',
    title: 'Arranging care after a hospital stay',
    metaTitle: 'Arranging care after a hospital stay',
    metaDescription:
      'How hospital discharge works, what reablement is, and the questions to ask before a parent comes home from hospital.',
    summary:
      'Coming home from hospital can feel rushed. Knowing who to talk to and what to ask helps make sure the right support is in place.',
    updated: UPDATED,
    sections: [
      {
        heading: 'The hospital discharge team',
        paragraphs: [
          'Most hospitals have a discharge team, sometimes called a discharge coordinator or ward team, who plan how a patient will leave hospital and what support they will need at home.',
          'Ask the ward staff who is responsible for your relative’s discharge and how you can be involved. Share what you know about their home, how they were managing before and what worries you.',
        ],
      },
      {
        heading: 'Reablement: short-term support at home',
        paragraphs: [
          'In England, councils can offer reablement. This is short-term support at home to help someone regain skills and confidence after an illness or hospital stay, such as washing, dressing and making meals.',
          'Reablement is usually free for a limited time. At the end, the council reviews whether ongoing care is needed and whether the person will need to pay towards it.',
        ],
      },
      {
        heading: 'Planning ahead',
        paragraphs: [
          'If you think your relative will need ongoing care, start looking early rather than waiting for the discharge date. Agencies may not be able to start straight away, especially for care at busy times of day.',
          'Think about the home too. Would equipment, such as a raised toilet seat or grab rails, make things safer? The hospital or council may arrange an occupational therapy assessment.',
        ],
      },
      {
        heading: 'What to ask before discharge',
        paragraphs: ['Before your relative leaves hospital, it helps to ask:'],
        bullets: [
          'What care and support will be in place on the first day home, and who is providing it?',
          'Is reablement being offered, and what happens when it ends?',
          'What medication is being sent home, and have there been any changes?',
          'Is any equipment needed, and when will it arrive?',
          'Who do we contact if things are not going well?',
          'Should my relative be considered for NHS Continuing Healthcare?',
        ],
      },
      {
        heading: 'Arranging private care',
        paragraphs: [
          'If you plan to pay for care, or want to top up what the council provides, you can arrange it directly with an agency. Tell the agency the expected discharge date so they can assess your relative and be ready.',
          'Check each agency’s CQC report and ask how quickly they can start. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'Can hospital discharge be delayed until care is in place?',
        a: 'The hospital should make sure a safe discharge plan is in place. If you are worried it is not safe, tell the discharge team clearly and ask them to explain the plan.',
      },
      {
        q: 'Is reablement free?',
        a: 'In England reablement is usually free for a limited period. Ask the council or discharge team what is being offered and for how long.',
      },
      {
        q: 'Do we have to use the care the council arranges?',
        a: 'No. You can arrange private care yourself, or, if the council is funding care, ask about a direct payment so you can choose your own agency.',
      },
      {
        q: 'What if my parent’s needs are mainly health needs?',
        a: 'Ask the discharge team whether your parent should be screened for NHS Continuing Healthcare, which is care fully funded by the NHS.',
      },
    ],
  },
  {
    slug: 'signs-a-parent-needs-help-at-home',
    kind: 'guide',
    title: 'Signs a parent may need help at home',
    metaTitle: 'Signs a parent may need help at home',
    metaDescription:
      'Everyday signs that an older parent may need support at home, how to raise it kindly, and practical next steps.',
    summary:
      'It is not always easy to tell when a parent needs more help. These everyday signs can help you notice, and there are gentle ways to start the conversation.',
    updated: UPDATED,
    sections: [
      {
        heading: 'Everyday signs to look out for',
        paragraphs: ['Small changes often build up over time. You might notice:'],
        bullets: [
          'Post and bills piling up unopened, or reminders for unpaid bills.',
          'Missed meals, little fresh food in the fridge, or food past its date.',
          'Falls, bruises they cannot explain, or a fear of falling.',
          'Struggling with stairs, getting in and out of the bath, or getting up from a chair.',
          'A home that is less clean or tidy than it used to be.',
          'Wearing the same clothes, or less attention to washing and grooming.',
          'Missed appointments or medication not being taken as prescribed.',
          'Seeing friends less, losing interest in hobbies, or seeming lonely.',
        ],
      },
      {
        heading: 'When to think about health',
        paragraphs: [
          'Some changes, like confusion, forgetfulness, weight loss or low mood, can have many causes. Do not try to work out the cause yourself. Encourage your parent to talk to their GP, and offer to go with them if they would like.',
        ],
      },
      {
        heading: 'How to raise it kindly',
        paragraphs: [
          'Choose a calm, private moment and talk about what you have noticed rather than what you think they cannot do. Ask how they feel things are going and what would make life easier.',
          'Focus on staying independent. A little help with the harder tasks can help someone stay in their own home for longer. Be patient, as it may take more than one conversation.',
        ],
      },
      {
        heading: 'Next steps',
        paragraphs: ['Once you and your parent agree that some help would be useful, you could:'],
        bullets: [
          'Ask the local council for a free needs assessment. In England anyone who seems to need care and support can have one.',
          'Check whether your parent could claim Attendance Allowance.',
          'Look at simple changes, like grab rails or a personal alarm.',
          'Consider a few home care visits a week to start, and build up if needed.',
        ],
      },
      {
        heading: 'Getting support at home',
        paragraphs: [
          'Home care can start small, such as help with a morning routine or a weekly shopping trip, and change as needs change. Agencies will assess your parent’s needs and agree a care plan with them. ' + MATCH_INVITE,
        ],
      },
    ],
    faqs: [
      {
        q: 'My parent says they are fine. What can I do?',
        a: 'Keep the conversation open and focus on what would make life easier rather than what they cannot do. Where your parent can make their own decisions, the choice is theirs, but you can share your worries and offer options.',
      },
      {
        q: 'Should I talk to their GP?',
        a: 'If you are worried about their health or memory, encourage your parent to see their GP and offer to go with them.',
      },
      {
        q: 'Can I arrange a needs assessment for my parent?',
        a: 'Yes. You can contact their local council to ask for one, with your parent’s agreement. It is free in England.',
      },
      {
        q: 'Does home care have to be every day?',
        a: 'No. Care can start with a few visits a week and be increased if needs change.',
      },
    ],
  },
]

// Topic and lead photo for the guides and cost pages. A missing src shows a placeholder with the brief.
const META: Record<string, { category: string; image: Img }> = {
  'home-care-cost-per-hour': { category: 'Costs and funding', image: { src: '/images/guide-cost-hour.jpg', brief: 'An older couple looking through paperwork at the kitchen table with a pot of tea' } },
  'live-in-care-cost': { category: 'Costs and funding', image: { src: '/images/guide-live-in-cost.jpg', brief: 'A live-in carer and an older woman chatting over lunch' } },
  'paying-for-home-care': { category: 'Costs and funding', image: { src: '/images/hattie-phone.jpg', brief: 'A woman smiling on the phone at home, arranging care for her mum' } },
  'live-in-care-vs-care-home': { category: 'Choosing care', image: { src: '/images/care-live-in.jpg', brief: 'A live-in carer and an older woman planting flowers together in her garden' } },
  'choosing-a-home-care-agency': { category: 'Choosing care', image: { src: '/images/agency-desk.jpg', brief: 'A care manager smiling on a headset at her desk' } },
  'what-does-a-home-carer-do': { category: 'Understanding care', image: { src: '/images/care-visiting.jpg', brief: 'A carer sharing breakfast with an older man in his kitchen' } },
  'arranging-care-after-hospital': { category: 'Arranging care', image: { src: '/images/svc-hourly-side.jpg', brief: 'A carer helping an older man on with his coat in his hallway' } },
  'signs-a-parent-needs-help-at-home': { category: 'Family life', image: { src: '/images/guide-signs.jpg', brief: 'A daughter and her mum talking at the kitchen table over tea' } },
}

export const ARTICLES: Article[] = [...BASE.map((a) => ({ ...META[a.slug], ...a })), ...POSTS]

export const articleBySlug = (kind: Article['kind'], s: string) =>
  ARTICLES.find((a) => a.kind === kind && a.slug === s)

/** Where an article lives. */
export const articlePath = (a: Article) => `/${a.kind === 'cost' ? 'costs' : a.kind === 'blog' ? 'blog' : 'guides'}/${a.slug}`

/** Reading time in minutes, at about 200 words a minute. */
export const readMins = (a: Article) => {
  const words = [a.summary, ...a.sections.flatMap((x) => [x.heading, ...x.paragraphs, ...(x.bullets ?? [])])].join(' ').split(/\s+/).length
  return Math.max(2, Math.round(words / 200))
}
