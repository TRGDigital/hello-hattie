import type { Article } from './types'

// Blog posts. Same rules as the guides: UK English, plain words, no em or en dashes, no invented
// statistics or prices, no named agencies, and we never claim to provide care ourselves.

const MATCH =
  'If you would like help finding a CQC-registered agency near you, our free matching service can put you in touch with up to 3 local agencies.'

const CQC_SOURCE = { label: 'Care Quality Commission, search for a care service', url: 'https://www.cqc.org.uk/search/all' }
const CARE_ACT_SOURCE = { label: 'GOV.UK, Care and support statutory guidance', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance' }
const MCA_SOURCE = { label: 'NHS, Mental Capacity Act', url: 'https://www.nhs.uk/social-care-and-support/making-decisions-for-someone-else/mental-capacity-act/' }
const CARER_SOURCE = { label: 'NHS, Carer’s assessments', url: 'https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/' }

export const POSTS: Article[] = [
  {
    slug: 'questions-to-ask-a-home-care-agency',
    kind: 'blog',
    category: 'Choosing care',
    title: 'Questions to ask a home care agency on the first call',
    metaTitle: 'Questions to ask a home care agency before you choose',
    metaDescription:
      'The questions worth asking a home care agency on the first call: visit times, carers, training, what happens when things go wrong, and prices.',
    summary:
      'The first phone call tells you a lot about an agency. These are the questions that help you compare agencies fairly and spot the ones that will be easy to work with.',
    updated: '2026-09-30',
    image: { brief: 'a woman at her kitchen table with a notepad and phone, making calls about care for her mum' },
    sections: [
      {
        heading: 'Why does the first call matter so much?',
        paragraphs: [
          'Most families speak to two or three agencies before choosing one. The first call is your chance to hear how an agency talks about the person who needs care, not just about hours and prices.',
          'Keep a notepad by the phone and ask the same questions each time. It makes it much easier to compare answers afterwards, especially if you are making calls between hospital visits or work.',
        ],
      },
      {
        heading: 'What should you ask about the care itself?',
        paragraphs: ['Start with the things that shape everyday life for your parent:'],
        bullets: [
          'Can you cover the visit times we need, including weekends and bank holidays?',
          'What is the shortest visit you offer, and how long will the carer actually be there?',
          'Will it be the same small group of carers most of the time?',
          'How do you introduce a new carer, and can we meet them first?',
          'How do you record what happens at each visit, and can the family see the notes?',
        ],
      },
      {
        heading: 'What should you ask about the carers?',
        paragraphs: [
          'Good agencies are happy to talk about their team. Ask how carers are trained when they start and how that training is kept up to date. In England, new care workers usually complete the Care Certificate, a set of standards that covers the basics of safe, kind care.',
          'It is also fair to ask whether carers are paid for their travel time between visits and how the agency checks the quality of care, for example with spot checks. Agencies that look after their carers tend to keep them, which means more familiar faces for your parent.',
        ],
      },
      {
        heading: 'What happens when something goes wrong?',
        paragraphs: ['Even the best agencies have days when a carer is ill or stuck in traffic. What matters is how they handle it:'],
        bullets: [
          'What happens if a carer is running late or cannot make a visit?',
          'Who do we call in the evening or at the weekend?',
          'How do we raise a concern, and who deals with it?',
        ],
      },
      {
        heading: 'What should you ask about money?',
        paragraphs: [
          'Ask for the full list of rates in writing: weekday, evening, weekend and bank holiday. Check whether there is a charge for the assessment, whether mileage is added for shopping trips, and how much notice you need to give to change or stop care.',
          'A clear written quote makes comparing agencies much simpler, and it avoids surprises on the first invoice. Our cost guides explain what shapes the price if a quote looks very different from the others.',
        ],
      },
      {
        heading: 'How do you check an agency’s CQC report?',
        paragraphs: [
          'Every home care agency in England must be registered with the Care Quality Commission, the independent regulator. You can search for any agency on the CQC website and read its latest inspection report.',
          'The report rates the agency on five questions: is it safe, effective, caring, responsive and well led. Look at the date of the inspection too, and ask the agency what has changed since if the report is a few years old.',
        ],
      },
      {
        heading: 'Should you trust your instinct?',
        paragraphs: [
          'Yes. Notice whether the person on the phone asked about your parent as a person: their routines, what they enjoy, what worries them. An agency that listens on the first call is more likely to listen once care begins.',
          MATCH,
        ],
      },
    ],
    faqs: [
      { q: 'How many agencies should I speak to?', a: 'Two or three is usually enough to get a feel for the options and compare prices, without the calls taking over your week.' },
      { q: 'Is it rude to ask about carers’ pay?', a: 'Not at all. Asking whether carers are paid for travel time is a fair question, and a good agency will be comfortable answering it.' },
      { q: 'What if the agency has not been inspected yet?', a: 'Newer agencies may be waiting for their first inspection. Ask how long they have been running, how many people they support and how they check the quality of their care.' },
    ],
    sources: [CQC_SOURCE],
  },
  {
    slug: 'what-happens-at-a-home-care-assessment',
    kind: 'blog',
    category: 'Arranging care',
    title: 'What happens at a home care assessment?',
    metaTitle: 'What happens at a home care assessment?',
    metaDescription:
      'Before care starts, the agency visits to assess what is needed. Here is who comes, what they ask, what to have ready and what happens next.',
    summary:
      'Before care starts, the agency will visit to understand what help is needed and how your parent likes things done. Knowing what to expect makes the visit calmer and the care plan better.',
    updated: '2026-09-30',
    image: { src: '/images/svc-24h.jpg', brief: 'Two care staff with a clipboard talking with an older woman in her kitchen' },
    sections: [
      {
        heading: 'Who comes, and how long does it take?',
        paragraphs: [
          'Usually a manager or care coordinator from the agency visits your parent at home. The visit often takes around an hour, sometimes longer if needs are more complex.',
          'It helps if a family member can be there, but the conversation should be with your parent as much as possible. It is their care, and their views and wishes come first.',
        ],
      },
      {
        heading: 'What will they ask about?',
        paragraphs: ['Expect a friendly but thorough conversation covering:'],
        bullets: [
          'Daily routines, from getting up to going to bed',
          'Health conditions and any medicines, and whether help is needed with them',
          'Moving around the home, getting in and out of bed or the bath',
          'Washing, dressing and using the toilet',
          'Meals, drinks and any special diets',
          'Who else helps, such as family, neighbours or community nurses',
          'Likes, dislikes, interests and what matters most to your parent',
        ],
      },
      {
        heading: 'Will they look around the home?',
        paragraphs: [
          'Yes. The agency will check for anything that could make care harder or less safe, such as trip hazards, steep stairs or a bathroom that is difficult to use. They may suggest equipment, like grab rails or a raised toilet seat, and explain where it can come from.',
          'They will also ask how carers will get in. Many families fit a key safe by the front door, so carers can let themselves in without your parent having to get up.',
        ],
      },
      {
        heading: 'What should you have ready?',
        paragraphs: ['A little preparation saves time and makes the care plan more accurate:'],
        bullets: [
          'A list of medicines, or the boxes and repeat prescription slip',
          'GP details and any hospital discharge letter',
          'Contact details for the family members the agency should speak to',
          'Notes on routines and preferences that your parent is happy to share',
          'Details of any power of attorney for health and welfare decisions',
        ],
      },
      {
        heading: 'What if your parent cannot make decisions themselves?',
        paragraphs: [
          'Everyone should be supported to make their own decisions for as long as they can. If your parent does not have the mental capacity to decide about their care, decisions must be made in their best interests under the Mental Capacity Act, and they should still be involved as much as possible.',
          'If someone holds a lasting power of attorney for health and welfare, the agency will want to know, as that person can make decisions on your parent’s behalf.',
        ],
      },
      {
        heading: 'What happens after the assessment?',
        paragraphs: [
          'The agency writes a care plan setting out what carers will do at each visit and how your parent likes things done. You should get a written quote and a proposed start date. Read the care plan carefully and ask for changes if something is missing.',
          'In the first few weeks, expect the agency to check how things are going. The care plan should be reviewed whenever needs change, and at least regularly after that.',
        ],
      },
      {
        heading: 'Is this the same as a council needs assessment?',
        paragraphs: [
          'No. An agency assessment is about planning the care that agency will provide. A council needs assessment, under the Care Act 2014, looks at what support your parent is eligible for and is the first step if you want the council to help with the cost. Anyone who appears to need care and support can ask their council for one.',
          MATCH,
        ],
      },
    ],
    faqs: [
      { q: 'Do agencies charge for the assessment?', a: 'Many do not, but some do. Ask when you first call so there are no surprises.' },
      { q: 'Can care start straight after the assessment?', a: 'Sometimes, especially when someone is leaving hospital. It depends on whether the agency has carers free for the times you need.' },
      { q: 'Can we change the care plan later?', a: 'Yes. A care plan should change as needs change. Tell the agency if anything is not working, and ask for a review.' },
    ],
    sources: [MCA_SOURCE, CARE_ACT_SOURCE],
  },
  {
    slug: 'when-a-parent-does-not-want-help',
    kind: 'blog',
    category: 'Family life',
    title: 'When a parent does not want help at home',
    metaTitle: 'When a parent refuses help at home: what you can do',
    metaDescription:
      'Many older people resist help at home at first. Why it happens, gentle ways to start the conversation, and what to do if you are worried about their safety.',
    summary:
      'It is very common for a parent to say no to help at first. With patience, small steps and the right conversation, most families find a way forward that everyone can live with.',
    updated: '2026-09-30',
    image: { brief: 'an adult son and his elderly father talking on a garden bench, relaxed and warm' },
    sections: [
      {
        heading: 'Why do so many parents say no?',
        paragraphs: [
          'Accepting help can feel like losing independence. Your parent may worry about strangers in their home, about the cost, or about what needing help says about them. Some fear that care at home is the first step towards a care home.',
          'Understanding the reason behind the no is usually the key. A worry about cost needs a different answer from a worry about privacy.',
        ],
      },
      {
        heading: 'How do you start the conversation?',
        paragraphs: ['Choose a calm moment, not straight after a fall or a difficult day. Then:'],
        bullets: [
          'Ask what they find hard, rather than telling them what you have noticed',
          'Listen to their worries and take them seriously',
          'Talk about what help would make possible, like staying at home and keeping their routines',
          'Involve them in every choice, from the agency to the visit times',
        ],
      },
      {
        heading: 'Does starting small help?',
        paragraphs: [
          'Often, yes. A short weekly visit for company, shopping or a walk can feel far less daunting than personal care. Once your parent knows a carer, adding more help later is usually much easier.',
          'Some families suggest a trial for a few weeks, with an honest review at the end. Others frame it as help for the family: it gives you peace of mind, and that matters too.',
        ],
      },
      {
        heading: 'Who else could help the conversation?',
        paragraphs: [
          'Sometimes the message lands better from someone else. A GP, a community nurse, a trusted friend or another relative can all help your parent see the benefits without it feeling like the family is taking over.',
        ],
      },
      {
        heading: 'What if your parent still says no?',
        paragraphs: [
          'Adults who have the mental capacity to decide have the right to make their own choices, even ones their family think are unwise. That principle is part of the Mental Capacity Act, and it protects all of us.',
          'If you are worried about their safety, you can ask the council for a needs assessment, and your parent can be involved in it. If you think they are at risk of harm or neglect, contact the council’s adult social care team, who can advise on what to do next.',
        ],
      },
      {
        heading: 'Who looks after you?',
        paragraphs: [
          'Worrying about a parent is tiring, especially when you are helping out yourself. If you provide care for a family member, you can ask the council for a carer’s assessment to see what support is available for you.',
          'When your parent is ready, ' + MATCH.charAt(0).toLowerCase() + MATCH.slice(1),
        ],
      },
    ],
    faqs: [
      { q: 'Can I arrange care without my parent agreeing?', a: 'Not if they have the mental capacity to decide. Care works best when the person receiving it is involved and agrees to it.' },
      { q: 'What if my parent has dementia?', a: 'If they cannot make a particular decision, it must be made in their best interests, and they should still be involved as much as possible. A GP or the council can help.' },
      { q: 'Is companionship care a good first step?', a: 'For many families it is. Regular visits for company and errands help your parent get to know a carer, which makes more help easier to accept later.' },
    ],
    sources: [MCA_SOURCE, CARER_SOURCE],
  },
]
