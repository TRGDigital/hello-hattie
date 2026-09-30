import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'Why does the choice of agency matter so much?',
      paragraphs: [
        'A home care agency will be sending people into your parent’s home, often when they are at their most vulnerable. The right agency can make the difference between your parent feeling safe, respected and settled, and feeling anxious about who will turn up and when.',
        'Price matters, but it should not be the only thing you compare. Reliability, kindness, good communication and a small team of familiar carers are what families most often say make care work. This guide walks you through the checks and questions that help you tell a good agency from a poor one. It covers the rules in England.',
      ],
    },
    {
      heading: 'Is the agency registered with the CQC?',
      paragraphs: [
        'In England, any agency that provides personal care in people’s homes, such as help with washing, dressing or using the toilet, must be registered with the Care Quality Commission (CQC). The CQC inspects registered agencies and publishes its reports for anyone to read. You can search for an agency by name or postcode on the CQC website.',
        'Be aware of the difference between a managed agency and an introductory agency. A managed agency employs or manages its carers, is responsible for the care and must be registered. An introductory agency only introduces self-employed carers and has no ongoing role in the care, so it does not need to register and the CQC does not inspect it. If you use an introductory agency, you or your parent take on much more responsibility for checking and managing the carer.',
        'Registered agencies must show their latest CQC rating, and the date it was given, on their website and at their office. If you cannot find it, ask.',
      ],
    },
    {
      heading: 'How do you read a CQC report?',
      paragraphs: [
        'Every inspection looks at five key questions. Each gets its own rating, and together they make up the overall rating:',
      ],
      bullets: [
        'Safe: people are protected from abuse and avoidable harm.',
        'Effective: care achieves good outcomes, helps people keep their quality of life and is based on the best available evidence.',
        'Caring: staff treat people with compassion, kindness, dignity and respect.',
        'Responsive: the service is organised to meet people’s needs.',
        'Well-led: leadership and management make sure care is high quality, centred on the person and open to learning.',
      ],
    },
    {
      heading: 'What do the CQC ratings mean?',
      paragraphs: [
        'There are four ratings. Outstanding means the service is performing exceptionally well. Good means it is performing well and meeting expectations. Requires improvement means it is not performing as well as it should, and the CQC has told it how to improve. Inadequate means it is performing badly and the CQC has taken action.',
        'Read the report, not just the headline rating. Look at the date of the inspection, as a report from some years ago may not reflect the agency today. Look at the individual ratings too. An agency rated Good overall but Requires improvement for Safe deserves some careful questions. Reports often include comments from people who use the service and their families, which give a real feel for day to day care.',
        'Newer agencies may be registered but not yet rated. That is not necessarily a bad sign, but ask about the manager’s experience, how carers are trained and how the agency checks the quality of its own care.',
      ],
    },
    {
      heading: 'What should you ask an agency before you agree?',
      paragraphs: ['A good agency will answer these clearly and without pressure:'],
      bullets: [
        'Do you cover my parent’s address reliably, including evenings, weekends and bank holidays?',
        'Can you start when we need you, and at the visit times my parent needs?',
        'Who will carry out the assessment, and will we be involved in writing the care plan?',
        'What training do your carers have, including dementia care, moving and handling and medicines support?',
        'How many different carers is my parent likely to see in a typical week?',
        'What are your rates for weekdays, evenings, weekends and bank holidays, and are there any extra charges such as mileage?',
        'What is the shortest visit you offer, and how do you make sure carers stay for the full time?',
        'Who do we contact out of hours, and how quickly will they respond?',
        'How often is the care plan reviewed, and how will you tell us about changes in my parent’s health?',
      ],
    },
    {
      heading: 'How will the agency assess your parent and plan their care?',
      paragraphs: [
        'Before care starts, a good agency visits your parent to assess their needs. It should ask not only about tasks, but about how your parent likes things done: the time they like to get up, what they like to eat, how they take their tea, what makes them anxious. Where your parent can take part, they should lead this conversation.',
        'The assessment becomes a written care plan that carers follow at every visit. Ask to see it, and check it reflects your parent as a person, not just a list of jobs. The plan should be reviewed regularly and whenever needs change, for example after a fall or a hospital stay.',
        'If your parent has had a council needs assessment, share it with the agency. It helps explain what support is needed.',
      ],
    },
    {
      heading: 'How are carers checked and trained?',
      paragraphs: [
        'Registered agencies must carry out pre-employment checks on care staff, including a criminal record check through the Disclosure and Barring Service (DBS). Ask how the agency recruits carers and how it checks references.',
        'New care workers are expected to complete an induction based on the Care Certificate standards, which cover the basic skills, knowledge and values for safe, compassionate care. Ask what training carers have beyond that, and whether it covers the specific needs your parent has, such as dementia, stroke, diabetes or using a hoist.',
        'Carers should carry identity cards, and should knock and announce themselves before coming into your parent’s home.',
      ],
    },
    {
      heading: 'Will your parent see the same carers, and will they arrive on time?',
      paragraphs: [
        'Continuity matters, especially for someone living with dementia or who is anxious about strangers in their home. A familiar carer notices small changes, knows your parent’s routines and builds real trust.',
        'Ask how the agency plans rotas, whether carers are matched to people and kept together where possible, and whether you will be told in advance who is coming. Ask how new carers are introduced, and what happens when a regular carer is on holiday or off sick.',
        'Ask too how the agency tracks visits, for example through an app that carers use to log in and out. Find out what the agency counts as late, whether they will phone you or your parent if a carer is running behind, and how they make sure a visit is never simply missed.',
        'Missed visits can be serious for someone who relies on help to eat, take medicines or get to the toilet. A good agency will have a clear plan for this and be honest about how it works.',
      ],
    },
    {
      heading: 'What should be in the contract?',
      paragraphs: [
        'Always read the contract, or terms and conditions, before signing. Things to check include:',
      ],
      bullets: [
        'The notice period to end care, and whether it applies to both sides.',
        'How much notice you must give to cancel a single visit, and whether you are charged for late cancellations.',
        'What happens to visits and charges if your parent goes into hospital.',
        'How and when prices can rise, and how much notice you will get.',
        'How invoices work, how often you are billed and how you pay.',
        'Whether there is a trial period, and what happens at the end of it.',
        'How to make a complaint, and who to contact if you are not happy with the answer.',
      ],
    },
    {
      heading: 'How do you complain if something goes wrong?',
      paragraphs: [
        'Start with the agency. Speak to the manager first, as many problems can be sorted quickly. If not, make a formal complaint using the agency’s complaints procedure, and keep a note of dates, times and what happened. If the council funds or arranges the care, you can also complain to the council.',
        'If you are still unhappy once the agency has had the chance to respond, you can take your complaint to the Local Government and Social Care Ombudsman. The Ombudsman is free and can investigate complaints about adult social care, including care that is arranged and paid for privately. You normally need to go to the Ombudsman within 12 months of first knowing about the problem.',
        'The CQC does not investigate individual complaints, but it does want to hear about poor care. You can share your experience on the CQC website, and it uses this information to decide when and where to inspect. If you think your parent is being abused or neglected, contact the council’s adult social care team straight away, or call 999 if they are in immediate danger.',
      ],
    },
    {
      heading: 'Getting started with the right agency',
      paragraphs: [
        'Once you have checked the CQC report, asked your questions and read the contract, trust your instincts too. Notice how the agency speaks to you and to your parent, and whether they listen. Changing agency later is possible, but it is easier to get things right from the start. If you would like help finding a starting point, our free matching service can introduce you to one CQC-registered agency that covers your parent’s postcode.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How do I check an agency’s CQC rating?',
      a: 'Search for the agency by name or postcode on the CQC website. Its page shows the current rating, the ratings for each of the five key questions and the latest inspection report. Registered agencies must also show their rating on their own website.',
    },
    {
      q: 'Should I only consider agencies rated Good or Outstanding?',
      a: 'Those ratings are a good sign. If an agency is rated lower, read the report to see what the concerns were, check the date, and ask the agency what it has changed since. Look at the individual ratings, especially Safe.',
    },
    {
      q: 'What if the agency is new and not yet rated?',
      a: 'New agencies can be registered but not yet inspected. Ask about the manager’s experience, how carers are recruited and trained, and how the agency will keep you informed.',
    },
    {
      q: 'What is the difference between a managed and an introductory agency?',
      a: 'A managed agency employs or manages its carers, is responsible for the care and must register with the CQC. An introductory agency only introduces self-employed carers and does not need to register, so you take on more responsibility for checking and managing the carer.',
    },
    {
      q: 'Can we change agency if it is not working out?',
      a: 'Yes. Check the notice period in your contract, and try to arrange the new agency before care ends so there is no gap in support for your parent.',
    },
    {
      q: 'Does the CQC deal with complaints about home care?',
      a: 'No. The CQC cannot investigate individual complaints, but it wants to hear about poor care. Complain to the agency first, then to the council if it funds the care, and then to the Local Government and Social Care Ombudsman if you are still unhappy.',
    },
    {
      q: 'Is there a time limit for complaining to the Ombudsman?',
      a: 'You should normally go to the Local Government and Social Care Ombudsman within 12 months of first knowing about the problem, after the agency has had a chance to respond.',
    },
  ],
  sources: [
    {
      label: 'CQC, The five key questions we ask',
      url: 'https://www.cqc.org.uk/about-us/how-we-do-our-job/five-key-questions-we-ask',
    },
    {
      label: 'CQC, Our ratings and scores',
      url: 'https://www.cqc.org.uk/about-us/how-we-do-our-job/our-ratings-scores',
    },
    {
      label: 'CQC, Personal care: introductory agencies and individual care workers',
      url: 'https://www.cqc.org.uk/guidance-providers/registration/personal-care-ongoing-role-introductory-agencies-individual-care',
    },
    {
      label: 'CQC, Complain about an adult social care service',
      url: 'https://www.cqc.org.uk/contact-us/how-complain/complain-about-adult-social-care-service',
    },
    {
      label: 'Local Government and Social Care Ombudsman, How to complain',
      url: 'https://www.lgo.org.uk/how-to-complain',
    },
    {
      label: 'legislation.gov.uk, Regulated Activities Regulations 2014, regulation 20A (display of ratings)',
      url: 'https://www.legislation.gov.uk/uksi/2014/2936/regulation/20A',
    },
  ],
}
