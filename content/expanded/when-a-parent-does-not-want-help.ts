import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'Why do so many parents refuse help at home?',
      paragraphs: [
        'If your parent is saying no to help, you are far from alone. For many older people, accepting care feels like a loss: of independence, of privacy, of being the one who looks after others. Saying no can be a way of holding on to control at a time when a lot feels out of their hands.',
        'Understanding the reason behind the no is usually the key, because each worry needs a different answer:',
      ],
      bullets: [
        'Fear of losing independence, or of being “put in a home”',
        'Not wanting strangers in the house, or worry about privacy and dignity',
        'Worry about the cost, or about using up savings meant for the family',
        'Pride, embarrassment, or not wanting to be a burden',
        'Not noticing the problems, which can happen with memory changes',
        'A bad experience of care in the past, for themselves or a friend',
        'Simply feeling they are managing fine, and resenting being told otherwise',
      ],
    },
    {
      heading: 'How do you start the conversation about care?',
      paragraphs: [
        'Choose a calm, private moment, not straight after a fall or a difficult day, and not with the whole family lined up around the table. A walk, a drive or a cup of tea can feel less like a meeting.',
      ],
      bullets: [
        'Ask what they find hard, rather than telling them what you have noticed',
        'Listen to their worries and take them seriously, even if you disagree',
        'Use “I” statements, such as “I worry when you are on the stairs at night”',
        'Talk about what help would make possible, like staying at home and keeping their routines',
        'Offer choices rather than a single plan, so they stay in charge',
        'Involve them in every decision, from the agency to the visit times',
        'Accept that it may take several conversations, and leave the door open',
      ],
    },
    {
      heading: 'Does starting small help a parent accept care?',
      paragraphs: [
        'Often, yes. A short weekly visit for company, shopping, a walk or help around the house can feel far less daunting than help with washing or dressing. Once your parent knows a carer and trusts them, adding more help later is usually much easier.',
        'Some families suggest a trial for a few weeks, with an honest review at the end and a promise that your parent can stop if it is not for them. Others frame the help as something for the family: it gives you peace of mind, and that matters too. Linking help to something your parent values, like keeping their garden going or getting to a weekly club, can also make it feel like a gain rather than a loss.',
        'It is also worth talking about cost openly if that is the worry. A free council needs assessment will show what support your parent may be entitled to, and they may be able to claim Attendance Allowance, which is not means tested, to help with extra costs.',
      ],
    },
    {
      heading: 'Who else could help the conversation?',
      paragraphs: [
        'Sometimes the message lands better from someone outside the family. A GP, practice nurse, community nurse, pharmacist, faith leader or trusted friend can all help your parent see the benefits without it feeling like the family is taking over.',
        'If you are worried about your parent’s health or memory, encourage them to see their GP, and offer to go with them. Some changes, like sudden confusion, can have treatable causes, and the GP can also suggest local support. With your parent’s agreement, you can share your concerns with the GP before the appointment.',
      ],
    },
    {
      heading: 'What if your parent still says no?',
      paragraphs: [
        'Adults who have the mental capacity to make a decision have the right to make their own choices, even ones their family think are unwise. This is one of the core principles of the Mental Capacity Act 2005: a person must not be treated as unable to decide simply because they make an unwise decision. It can be very hard to watch, but it protects all of us.',
        'Capacity is about a specific decision at a specific time. If you have real doubts about whether your parent understands the risks, talk to their GP. If your parent is assessed as unable to make a particular decision, it must be made in their best interests, choosing the option least restrictive of their freedom, and they should still be involved as much as possible.',
        'You can still ask the council for a needs assessment. An adult can refuse one, but the council must carry it out anyway if your parent lacks capacity to refuse and it would be in their best interests, or if they are experiencing, or at risk of, abuse or neglect.',
      ],
    },
    {
      heading: 'When should you contact the council’s safeguarding team?',
      paragraphs: [
        'If you think your parent is at risk of harm or neglect, contact the adult social care or adult safeguarding team at their local council. This includes worries about someone else harming or taking advantage of them, including financially, and serious self neglect, such as not eating, not keeping warm, or living in conditions that put their health at risk. The council can advise on what to do and may make enquiries.',
        'If your parent is in immediate danger, call 999. If a crime has been committed, you can also contact the police. If you suspect a scam, report it to Report Fraud, which replaced Action Fraud in December 2025, at reportfraud.police.uk or on 0300 123 2040. In Scotland, call Police Scotland on 101.',
      ],
    },
    {
      heading: 'Should you set up a lasting power of attorney now?',
      paragraphs: [
        'A lasting power of attorney (LPA) lets your parent choose people they trust to make decisions for them if they cannot in future. There are two types: one for health and welfare, and one for property and financial affairs. Your parent can make one or both.',
        'Your parent must have mental capacity when they make an LPA, which is why it is worth raising sooner rather than later. It has to be registered with the Office of the Public Guardian before it can be used. The GOV.UK rules cover England and Wales; Scotland and Northern Ireland have their own systems. For advice on your family’s situation, speak to a solicitor or one of the helplines below.',
      ],
    },
    {
      heading: 'Who looks after you while you wait?',
      paragraphs: [
        'Worrying about a parent who will not accept help is exhausting, especially if you are filling the gaps yourself. Your wellbeing matters, and you do not have to manage alone.',
        'If you provide care for your parent, you can ask the council for a free carer’s assessment. It looks at how caring affects your health, work and life, and what support could help, such as a break. You can have one even if your parent refuses their own assessment.',
      ],
      bullets: [
        'Carers UK Helpline: 0808 808 7777, Monday to Friday, 9am to 6pm',
        'Dementia UK Admiral Nurse Helpline: 0800 888 6678',
        'Age UK Advice Line: 0800 678 1602, 8am to 7pm, every day of the year',
      ],
    },
    {
      heading: 'What can you do in the meantime?',
      paragraphs: [
        'Even while your parent is not ready for care, there are small things that can reduce risk and keep the conversation going. Offer these as options, not conditions.',
      ],
      bullets: [
        'Suggest a personal alarm or a key safe, so help can get in quickly',
        'Tidy away trip hazards and improve lighting on stairs and at night',
        'Set up regular phone calls or a shared calendar of visits from family and friends',
        'Ask the pharmacist about easier ways to manage medicines',
        'Keep a note of changes you notice, with dates, to share with the GP if needed',
        'Revisit the conversation after a few weeks, or after any change in health',
      ],
    },
    {
      heading: 'What happens when your parent is ready?',
      paragraphs: [
        'Many parents who say no at first come round in their own time, especially when they feel listened to and in control. When that moment comes, keep them at the centre: let them meet the agency, shape the care plan and choose the visit times.',
        'When your parent is ready, Hello Hattie is a free matching service that sends your details to one CQC-registered agency that covers their postcode and has told us it can take on new clients.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I arrange care without my parent agreeing?',
      a: 'Not if they have the mental capacity to decide. Adults with capacity can refuse care, even if others think it is unwise. Care also works best when the person receiving it is involved and agrees.',
    },
    {
      q: 'What if my parent has dementia and refuses help?',
      a: 'Having dementia does not automatically mean someone cannot decide. Capacity is about each decision at the time it needs to be made. If your parent cannot make a particular decision, it must be made in their best interests, and they should still be involved as much as possible. The GP, the council or the Dementia UK Admiral Nurse Helpline on 0800 888 6678 can help.',
    },
    {
      q: 'Can I ask the council to assess my parent if they do not want it?',
      a: 'You can contact the council to share your concerns. Your parent can refuse a needs assessment, but the council must still carry one out if your parent lacks capacity to refuse and it is in their best interests, or if they are experiencing or at risk of abuse or neglect.',
    },
    {
      q: 'Is companionship care a good first step?',
      a: 'For many families it is. Regular visits for company, a walk or errands help your parent get to know a carer, which makes more help easier to accept later.',
    },
    {
      q: 'What counts as self neglect?',
      a: 'Government guidance describes it as a wide range of behaviour, such as neglecting personal hygiene, health or surroundings, and includes things like hoarding. If you are seriously worried, contact the council’s adult social care team for advice.',
    },
    {
      q: 'Who can I talk to about how I am feeling?',
      a: 'The Carers UK Helpline is on 0808 808 7777, Monday to Friday, 9am to 6pm, and the Age UK Advice Line is on 0800 678 1602, 8am to 7pm every day. You can also ask the council for a free carer’s assessment.',
    },
    {
      q: 'When is it too late to make a lasting power of attorney?',
      a: 'Your parent must have mental capacity to make one. If they lose capacity before making an LPA, family may need to apply to the Court of Protection to become a deputy, which involves an application, a fee and yearly reports, so it is worth raising early.',
    },
  ],
  sources: [
    { label: 'NHS, Mental Capacity Act', url: 'https://www.nhs.uk/social-care-and-support/making-decisions-for-someone-else/mental-capacity-act/' },
    { label: 'Care Act 2014, section 11: refusal of assessment', url: 'https://www.legislation.gov.uk/ukpga/2014/23/section/11' },
    { label: 'NHS, abuse and neglect of adults at risk (safeguarding)', url: 'https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/abuse-and-neglect-adults-at-risk/' },
    { label: 'GOV.UK, lasting power of attorney', url: 'https://www.gov.uk/power-of-attorney' },
    { label: 'NHS, carer’s assessments', url: 'https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/' },
    { label: 'GOV.UK, Report Fraud: new service from City of London Police', url: 'https://www.gov.uk/government/news/report-fraud-new-service-from-city-of-london-police' },
  ],
}
