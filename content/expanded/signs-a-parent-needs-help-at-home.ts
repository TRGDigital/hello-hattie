import type { Article } from '../types'
import { FIGURES, gbp } from '../../lib/figures'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'How do you know when a parent needs help at home?',
      paragraphs: [
        'There is rarely one clear moment. More often, small changes build up over months until something, perhaps a fall, a missed appointment or a worrying phone call, makes you stop and look again. Many families say afterwards that the signs had been there for a while, but were easy to explain away.',
        'Noticing a sign does not mean your parent cannot cope, or that they need a lot of care. It may mean a little help with one or two harder tasks would make daily life safer and easier. It helps to look at the whole picture over time, rather than one bad day. If you can, spend a full day with your parent, including a mealtime, rather than a short visit where they may make an extra effort.',
      ],
    },
    {
      heading: 'What changes around the home should you look out for?',
      paragraphs: ['The home often tells you more than a phone call. You might notice:'],
      bullets: [
        'Post and bills piling up unopened, or reminders and final demands',
        'A home that is less clean or tidy than it used to be, or washing piling up',
        'The heating off in cold weather, or the home feeling very cold',
        'Scorched pans, or appliances left on',
        'Plants, pets or the garden being neglected when they used to be a pride and joy',
        'Parts of the house no longer used, such as sleeping downstairs to avoid the stairs',
        'Dents or scrapes on the car, if your parent still drives',
      ],
    },
    {
      heading: 'What are the signs your parent is struggling with personal care?',
      paragraphs: [
        'Washing, dressing and going to the toilet are personal, and many people find it hard to admit they are struggling. Signs can be subtle:',
      ],
      bullets: [
        'Wearing the same clothes for several days, or clothes that are unwashed',
        'Less attention to washing, shaving, hair or teeth than before',
        'Body odour, or a smell of urine in the home',
        'Avoiding the bath or shower, or saying they “had a wash earlier”',
        'Difficulty with buttons, zips, shoes or socks',
        'Long, untrimmed nails, or sore skin',
      ],
    },
    {
      heading: 'Is your parent eating and drinking enough?',
      paragraphs: [
        'Poor eating and drinking can quietly affect strength, balance, mood and memory. Look in the fridge and cupboards, gently and without making a show of it.',
      ],
      bullets: [
        'Little fresh food, or food well past its date',
        'The same simple meal every day, or lots of snacks instead of meals',
        'Weight loss, or clothes that have become loose',
        'Few signs of drinking during the day, or a very dry mouth',
        'Shopping that is not being done, or duplicate items bought again and again',
      ],
    },
    {
      heading: 'Are medicines being taken as prescribed?',
      paragraphs: [
        'Mistakes with medicines are easy to make, especially when someone takes several at different times of day. Look out for full blister packs part way through the week, tablets found on the floor, prescriptions not being collected, or confusion about what each medicine is for.',
        'Do not change or sort out medicines yourself. Encourage your parent to speak to their GP or pharmacist, who can review the medicines and suggest simpler ways to manage them. Home carers can also help with prompting or giving medicines, as agreed in a care plan.',
      ],
    },
    {
      heading: 'What should you do about falls and mobility problems?',
      paragraphs: [
        'Watch how your parent moves. Holding on to furniture to get around the room, struggling to get up from a chair, taking the stairs very slowly or avoiding going out can all be signs that mobility is changing. Falls, bruises they cannot explain, or a new fear of falling are important signs, even if your parent was not hurt.',
        'Tell the GP about any fall. The NHS also suggests asking the council for a free needs assessment if you are worried about falls, as it can look at changes that would make the home safer. Simple steps help too: good lighting, removing loose rugs, well fitting shoes, regular eye tests, and a personal alarm so your parent can call for help.',
      ],
    },
    {
      heading: 'When are memory and mood changes a sign to act?',
      paragraphs: [
        'Everyone forgets things sometimes. But repeated forgetting, getting lost in familiar places, struggling to follow a conversation or find the right word, being confused about the time or place, or finding familiar tasks hard can be early signs of dementia. The NHS says dementia is not a natural part of ageing, so it is important to talk to a GP sooner rather than later.',
        'Mood matters too. Seeing friends less, losing interest in hobbies, seeming withdrawn or low, or saying they feel lonely can all affect how well someone looks after themselves. Some changes have treatable causes, so do not try to work out the cause yourself. Encourage your parent to see their GP, and offer to go with them.',
      ],
    },
    {
      heading: 'Could your parent be struggling with money or being targeted by scams?',
      paragraphs: [
        'Changes in how someone handles money can be an early sign that they need support, and can also leave them open to people who take advantage.',
      ],
      bullets: [
        'Unpaid bills, or money running out earlier in the month',
        'Unusual payments, withdrawals or new direct debits',
        'Lots of post, calls or visitors offering prizes, investments or home repairs',
        'A new “friend” who seems very interested in their money',
        'Your parent seeming worried or secretive about finances',
      ],
    },
    {
      heading: 'What should you do if you are worried about a scam or abuse?',
      paragraphs: [
        'If you think your parent has been scammed, contact their bank straight away, and report it to Report Fraud, which replaced Action Fraud in December 2025, at reportfraud.police.uk or on 0300 123 2040. In Scotland, call Police Scotland on 101. If you think someone is harming, neglecting or taking advantage of your parent, contact the adult safeguarding team at their local council. If they are in immediate danger, call 999.',
      ],
    },
    {
      heading: 'When is it urgent, and who should you call?',
      paragraphs: [
        'Some signs need help straight away rather than a conversation about care:',
      ],
      bullets: [
        'Call 999 or go to A&E if your parent suddenly becomes confused. The NHS says sudden confusion needs urgent assessment, and in older people it is often caused by an infection, such as a urine infection.',
        'Call 999 if your parent has fallen and may have hurt their head, neck, back or hip, or cannot get up.',
        'Call NHS 111, or use 111 online, if your parent has fallen and may be in pain, injured or unwell, or you need urgent medical advice and are not sure where to go.',
        'Call 999 if you believe your parent is in immediate danger from someone else.',
      ],
    },
    {
      heading: 'What are the next steps once you have noticed the signs?',
      paragraphs: [
        'Choose a calm, private moment to talk. Speak about what you have noticed rather than what you think your parent cannot do, and ask how they feel things are going and what would make life easier. Focus on staying independent: a little help with the harder tasks can help someone stay in their own home for longer. It may take more than one conversation, and if your parent has capacity to decide, the choice is theirs.',
        'Once you and your parent agree some help would be useful, you could:',
      ],
      bullets: [
        'Ask the local council for a free needs assessment. In England anyone who appears to need care and support can have one.',
        'Check whether your parent could claim Attendance Allowance. It is for people who have reached State Pension age and need help with personal care or supervision, it is not means tested, and it is currently ' + gbp(FIGURES.attendanceAllowance.lower) + ' or ' + gbp(FIGURES.attendanceAllowance.higher) + ' a week depending on need.',
        'If you help your parent yourself, ask the council for a free carer’s assessment.',
        'Look at simple changes, like grab rails, better lighting or a personal alarm.',
        'Consider a few home care visits a week to start, and build up if needed. Home care can begin small, such as help with a morning routine or a weekly shopping trip, and change as needs change.',
        'Hello Hattie is a free matching service that sends your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take on new clients, so you can talk through what help might suit.',
      ],
    },
  ],
  faqs: [
    {
      q: 'My parent says they are fine. What can I do?',
      a: 'Keep the conversation open and focus on what would make life easier rather than what they cannot do. Where your parent can make their own decisions, the choice is theirs, but you can share your worries, offer options and suggest a short trial of help.',
    },
    {
      q: 'Should I talk to their GP?',
      a: 'If you are worried about their health, memory, mood or falls, encourage your parent to see their GP and offer to go with them. With your parent’s agreement, you can share what you have noticed beforehand.',
    },
    {
      q: 'Can I arrange a needs assessment for my parent?',
      a: 'Yes. You can contact their local council to ask for one, with your parent’s agreement, by phone or online. It is free, and it is usually carried out by a social worker or occupational therapist.',
    },
    {
      q: 'Is sudden confusion a sign of dementia?',
      a: 'Not necessarily. Sudden confusion needs urgent medical help, and the NHS advises calling 999. In older people it is often caused by an infection. Memory problems that come on gradually are different, and a GP is the right first step.',
    },
    {
      q: 'Can my parent get Attendance Allowance?',
      a: 'They may if they have reached State Pension age and, because of a disability or health condition, have needed help caring for themselves or someone to supervise them for at least 6 months. It is not means tested. There are different rules for people nearing the end of life, and in Scotland the equivalent benefit is Pension Age Disability Payment.',
    },
    {
      q: 'Does home care have to be every day?',
      a: 'No. Care can start with a few visits a week and be increased if needs change.',
    },
    {
      q: 'Is this guide the same in Wales, Scotland and Northern Ireland?',
      a: 'The signs are the same everywhere, but the rules on assessments, funding and regulation differ. This guide describes England. Contact your parent’s local council or health and social care trust for the local process.',
    },
  ],
  sources: [
    { label: 'NHS, falls', url: 'https://www.nhs.uk/conditions/falls/' },
    { label: 'NHS, confusion', url: 'https://www.nhs.uk/symptoms/confusion/' },
    { label: 'NHS, symptoms of dementia', url: 'https://www.nhs.uk/conditions/dementia/symptoms-and-diagnosis/symptoms/' },
    { label: 'NHS, getting a needs assessment', url: 'https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/' },
    { label: 'GOV.UK, Attendance Allowance', url: 'https://www.gov.uk/attendance-allowance' },
    { label: 'Stop! Think Fraud, reporting fraud', url: 'https://stopthinkfraud.campaign.gov.uk/reporting-fraud/' },
  ],
}
