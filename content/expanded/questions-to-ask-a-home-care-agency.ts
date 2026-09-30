import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'Why does the first call to a home care agency matter so much?',
      paragraphs: [
        'The first phone call is often the moment you learn the most about an agency. You hear how they talk about the person who needs care, whether they listen, and how clearly they explain things. Hours and prices matter, but so does the feeling that someone on the other end of the line actually cares about your parent as a person.',
        'Keep a notepad by the phone and ask each agency the same questions in the same order. It makes it much easier to compare answers afterwards, especially if you are making calls between hospital visits, work and everything else. Write down the name of the person you spoke to and the date, so you can pick up where you left off.',
        'If it helps, you can download our free printable guide, Your home care call guide, with 20 questions and space for notes, from /downloads/hello-hattie-home-care-call-guide-2026.pdf. The sections below explain why each group of questions matters and what a good answer sounds like.',
      ],
    },
    {
      heading: 'What should you ask about the care and the visits?',
      paragraphs: [
        'Start with the things that will shape everyday life for your parent. Home care is built around visits, so the details of when, how long and who will make the biggest difference to how it feels.',
      ],
      bullets: [
        'Can you cover the visit times we need, including early mornings, evenings, weekends and bank holidays?',
        'How much flexibility is there on times? What window do you work to, for example within half an hour either side?',
        'What is the shortest visit you offer, and how long will the carer actually be with my parent?',
        'Will it be the same small group of carers most of the time, and how do you decide who visits?',
        'How do you introduce a new carer? Can my parent meet them first, or will someone familiar come along the first time?',
        'Can you help with the specific things my parent needs, such as washing, dressing, meals, medicines or getting out to the shops?',
        'How do carers record what happens at each visit, and can the family see the notes, for example through an app?',
        'Can the care increase or change quickly if my parent’s needs change, or after a stay in hospital?',
      ],
    },
    {
      heading: 'What should you ask about the carers and their training?',
      paragraphs: [
        'Good agencies are happy to talk about their team. The law expects them to have enough suitably trained staff and to carry out proper recruitment checks, including on criminal records and work history. You are entitled to ask how they do this in practice.',
        'In England, new care workers are usually expected to complete the Care Certificate, a set of standards covering the knowledge and skills needed for safe, kind care. Skills for Care, which looks after it, updated the standards in March 2025 and there are now 16 of them. Ask whether new carers complete it, how long their induction lasts, and whether they shadow an experienced carer before visiting on their own.',
      ],
      bullets: [
        'How do you check carers before they start, including criminal record checks and references?',
        'Do new carers complete the Care Certificate, and do they shadow experienced colleagues first?',
        'What extra training do carers have for things like dementia, moving and handling, or giving medicines?',
        'Are carers paid for their travel time between visits?',
        'How do you check the quality of care, for example with spot checks or supervision?',
        'How long do carers tend to stay with you?',
      ],
    },
    {
      heading: 'What should you ask about when things go wrong?',
      paragraphs: [
        'Even the best agencies have days when a carer is ill or stuck in traffic. What matters is how they plan for it and how quickly they let you know. Every registered provider must have a system for handling complaints and must investigate them properly, so ask to see it.',
      ],
      bullets: [
        'What happens if a carer is running late or cannot make a visit? Will you call my parent, or me?',
        'Who do we call in the evening or at the weekend, and will someone answer?',
        'What do carers do if they find my parent unwell or on the floor?',
        'What happens if my parent does not answer the door?',
        'How do we raise a concern or make a complaint, and who deals with it?',
        'How would you handle it if my parent did not get on with a particular carer?',
      ],
    },
    {
      heading: 'What should you ask about money and contracts?',
      paragraphs: [
        'Ask for the full list of rates in writing: weekday, evening, weekend and bank holiday. Check whether visits are charged by the minute, the quarter hour or a minimum block, and whether there is a charge for the first assessment. If carers will drive your parent to appointments or the shops, ask how mileage is charged.',
        'Read the contract before anyone signs it. Look for how much notice you need to give to change or stop care, what happens if a visit is cancelled at short notice, what happens if your parent goes into hospital, and how and when the agency can put its prices up. A clear written quote makes it much easier to compare agencies fairly and avoids surprises on the first invoice.',
        'If the council is paying for some or all of the care, ask the agency whether it already works with your council, or whether it can accept a direct payment if your parent chooses to arrange care that way.',
      ],
      bullets: [
        'Can you send me all your rates in writing?',
        'Is there a charge for the assessment or for setting up care?',
        'What is your minimum visit length and how is it charged?',
        'How much notice do we need to give to change or stop care?',
        'Do we pay if my parent is in hospital and visits are paused?',
        'How and when do your prices change?',
      ],
    },
    {
      heading: 'How do you check a home care agency’s CQC report?',
      paragraphs: [
        'Every home care agency in England that provides personal care, such as help with washing, dressing or going to the toilet, must be registered with the Care Quality Commission (CQC), the independent regulator. You can search for any agency by name or postcode on the CQC website and read its latest report for free.',
        'CQC gives an overall rating of outstanding, good, requires improvement or inadequate. It also rates the service against five key questions: is it safe, effective, caring, responsive and well led. The overall rating is a good starting point, but it is worth reading the detail under each heading.',
      ],
      bullets: [
        'Check the name and address on the report match the agency you spoke to.',
        'Look at the date. If the inspection was a few years ago, ask the agency what has changed since.',
        'Read the “safe” and “well led” sections closely. They often say most about how the agency is run day to day.',
        'If any area is rated requires improvement or inadequate, ask the agency what it has done about it.',
        'A newer agency may not have been rated yet. That is not a bad sign in itself, but ask more questions.',
      ],
    },
    {
      heading: 'What should you ask about your parent as a person?',
      paragraphs: [
        'The best agencies ask as many questions as you do. Notice whether the person on the phone wants to know about your parent’s routines, what they enjoy, what worries them and how they like things done. Care that fits around someone’s life feels very different from care that simply ticks off tasks.',
      ],
      bullets: [
        'How will you get to know my parent’s routines and preferences?',
        'Who writes the care plan, and will my parent be involved?',
        'Can you match carers with shared interests or a language my parent speaks?',
        'How do you support people living with dementia or memory problems?',
        'How often will you review the care plan with us?',
      ],
    },
    {
      heading: 'What are the warning signs on a first call?',
      paragraphs: [
        'Most agencies are run by people who care deeply about the work. Still, a few answers should make you pause and ask more.',
      ],
      bullets: [
        'They are vague about prices or will not put them in writing.',
        'They cannot tell you who you would call out of hours.',
        'They seem unsure about training or checks on carers.',
        'They promise they can start tomorrow without asking anything about your parent.',
        'They push you to sign quickly or pay a large sum up front.',
        'Their CQC report raises concerns they do not mention or cannot explain.',
      ],
    },
    {
      heading: 'Should you trust your instinct after the call?',
      paragraphs: [
        'Yes. After a few calls you will usually have a sense of which agency felt right. Did they explain things clearly? Did they call back when they said they would? Did they speak about your parent with warmth and respect? An agency that listens on the first call is more likely to listen once care begins.',
        'It is fine to go back with follow up questions, or to ask for a second conversation with the manager before you decide. Once you have chosen, the agency will arrange an assessment visit to plan the care in detail with your parent.',
        'If you would like help getting started, Hello Hattie is a free matching service that sends your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take on new clients, so you can have that first call with confidence.',
      ],
    },
  ],
  faqs: [
    {
      q: 'How many home care agencies should I speak to?',
      a: 'Two or three is usually enough to get a feel for the options and compare prices and approach, without the calls taking over your week.',
    },
    {
      q: 'Is it rude to ask whether carers are paid for travel time?',
      a: 'Not at all. It is a fair question, and a good agency will be comfortable answering it. How an agency treats its carers often affects how long carers stay, which means more familiar faces for your parent.',
    },
    {
      q: 'What is the Care Certificate?',
      a: 'It is a set of standards for people new to care work in England, covering the knowledge, skills and behaviours needed for safe, kind care. The standards were updated in March 2025 and there are now 16. Ask the agency whether its new carers complete it.',
    },
    {
      q: 'What if the agency has not been inspected by CQC yet?',
      a: 'Newer agencies may be registered but waiting for their first assessment. Check they are registered on the CQC website, then ask how long they have been running, how many people they support and how they check the quality of their care.',
    },
    {
      q: 'Can CQC deal with a complaint about a home care agency?',
      a: 'CQC wants to hear about poor care and uses what people tell it to decide when and where to inspect, but it cannot resolve individual complaints. Complain to the agency first. If you are not happy with the response, the Local Government and Social Care Ombudsman can look at complaints about adult social care, including care you pay for yourself.',
    },
    {
      q: 'Should my parent be on the call?',
      a: 'If they would like to be, yes. It is their care, and hearing the agency speak directly to them can be reassuring. If a call is tiring, you could make the first call and involve your parent in the assessment visit.',
    },
    {
      q: 'Are the rules the same in Wales, Scotland and Northern Ireland?',
      a: 'No. This guide is about England. Home care is regulated by Care Inspectorate Wales in Wales, the Care Inspectorate in Scotland and the Regulation and Quality Improvement Authority in Northern Ireland, and training standards differ too.',
    },
  ],
  sources: [
    { label: 'Care Quality Commission, search for a care service', url: 'https://www.cqc.org.uk/search/all' },
    { label: 'Care Quality Commission, our ratings', url: 'https://www.cqc.org.uk/about-us/how-we-do-our-job/ratings' },
    { label: 'Care Quality Commission, the fundamental standards', url: 'https://www.cqc.org.uk/about-us/fundamental-standards' },
    { label: 'Skills for Care, the Care Certificate', url: 'https://www.skillsforcare.org.uk/Developing-your-workforce/Care-Certificate/Care-Certificate.aspx' },
    { label: 'Care Quality Commission, complain about an adult social care service', url: 'https://www.cqc.org.uk/contact-us/how-complain/complain-about-adult-social-care-service' },
    { label: 'Local Government and Social Care Ombudsman, adult social care', url: 'https://www.lgo.org.uk/adult-social-care' },
  ],
}
