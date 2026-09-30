import type { Article } from '../types'
import { FIGURES, gbp } from '../../lib/figures'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'Is a home care assessment the same as a council needs assessment?',
      paragraphs: [
        'No, and it helps to know the difference, because you may come across both. An agency assessment is a visit from the home care agency you are thinking of using. Its purpose is to plan the care that agency will provide: what carers will do, when, and how your parent likes things done.',
        'A council needs assessment is carried out by your parent’s local council under the Care Act 2014. It looks at what your parent can and cannot manage, what they want to achieve, and whether they are eligible for support from the council. It is free, and anyone who appears to need care and support can ask for one, whatever their income or savings.',
        'You do not need a council assessment before you arrange private care. But if you think your parent may need help with the cost, or you are not sure what support would help most, the council assessment is the place to start. Many families have both: the council assessment first, then an agency assessment once an agency is chosen.',
      ],
    },
    {
      heading: 'Who comes to an agency assessment, and how long does it take?',
      paragraphs: [
        'Usually a registered manager, care coordinator or senior carer from the agency visits your parent at home. The visit often takes around an hour, and can take longer if needs are more complex or there is a lot to talk through.',
        'It helps if a family member or friend can be there, especially for the first meeting. But the conversation should be with your parent as much as possible. It is their care, their home and their routine, and their views and wishes come first. If your parent finds long conversations tiring, ask whether the visit can be split or kept shorter.',
        'Agency assessments are often free, but not always. Ask when you first call so there are no surprises.',
      ],
    },
    {
      heading: 'What questions will they ask at a home care assessment?',
      paragraphs: [
        'Expect a friendly but thorough conversation. A good assessor will want to understand your parent as a person as well as their needs, and will ask what your parent can still do for themselves, so that care supports their independence rather than taking it away.',
      ],
      bullets: [
        'Daily routines, from getting up to going to bed, and the times that matter most',
        'Health conditions, allergies, and any recent falls or hospital stays',
        'Medicines, who orders and collects them, and whether help is needed to take them',
        'Moving around the home, getting in and out of bed, a chair or the bath',
        'Washing, dressing, continence and using the toilet',
        'Meals, drinks, special diets, and any problems with eating or swallowing',
        'Memory, mood and communication, including hearing, sight and language',
        'Who else helps, such as family, neighbours, a district nurse or day centre',
        'Likes, dislikes, faith, culture, interests and what matters most to your parent',
      ],
    },
    {
      heading: 'Will they look around the home?',
      paragraphs: [
        'Yes. Registered care providers must assess the risks to a person’s health and safety, so the assessor will usually carry out a risk assessment of the home. They are not judging how the house is kept. They are looking for anything that could make care harder or less safe for your parent or the carer.',
        'They may suggest equipment, like grab rails, a raised toilet seat or a perching stool, and explain where it can come from. Some equipment and minor adaptations can be arranged through the council after a needs assessment, and an occupational therapist may be involved.',
      ],
      bullets: [
        'Trip hazards such as loose rugs, trailing cables and clutter on stairs',
        'Lighting, especially on stairs and the route to the toilet at night',
        'The bathroom, and whether washing can be done safely',
        'Space to move around the bed if help with moving is needed',
        'Smoke alarms, heating, and any gas or fire risks',
        'Pets, and whether they need to be shut away during visits',
        'How carers will get in, such as a key safe by the front door',
      ],
    },
    {
      heading: 'How is help with medicines agreed?',
      paragraphs: [
        'Medicines need particular care. The assessor will ask what your parent takes, who orders and collects prescriptions, and whether they manage their medicines themselves. The level of help can range from a simple reminder, to handing over medicines, to carers giving them.',
        'What carers can do should be written clearly in the care plan, along with how it will be recorded. Have an up to date list of medicines ready, or the boxes and the repeat prescription slip. If you are unsure whether your parent is managing, the GP or pharmacist can review their medicines with them.',
      ],
    },
    {
      heading: 'What about consent and the Mental Capacity Act?',
      paragraphs: [
        'Care should only be given with your parent’s consent, or the consent of someone legally able to act for them. Under the Mental Capacity Act 2005, everyone must be assumed to have capacity to make a decision unless it is shown otherwise, and they should be given all practical help to make their own decisions.',
        'Capacity is about a particular decision at a particular time. Your parent might be able to decide what to wear and what to eat, but struggle with a complex decision about care. Capacity can also change from day to day, for example with an infection.',
        'If your parent cannot make a decision about their care, it must be made in their best interests, choosing the option that is least restrictive of their rights and freedoms, and they should still be involved as much as possible. If someone holds a lasting power of attorney for health and welfare, the agency will want to see it, as that person may be able to make decisions on your parent’s behalf when your parent cannot.',
      ],
    },
    {
      heading: 'What should you have ready for the assessment?',
      paragraphs: ['A little preparation saves time and makes the care plan more accurate:'],
      bullets: [
        'A list of medicines, or the boxes and repeat prescription slip',
        'GP details, and any hospital discharge letter or recent clinic letters',
        'Any council assessment or care and support plan, if your parent has one',
        'Contact details for the family members the agency should speak to',
        'Notes on routines and preferences that your parent is happy to share',
        'Details of any lasting power of attorney',
        'The visit times you are hoping for, and your questions about cost',
      ],
    },
    {
      heading: 'What happens at a council needs assessment?',
      paragraphs: [
        'You can ask your parent’s council for a needs assessment by phone or online, with their agreement. It is usually carried out by a social worker or occupational therapist, sometimes in person and sometimes by phone or video. They may ask your parent to describe how they manage everyday things, like making a cup of tea or getting out of a chair.',
        'If your parent is eligible, the council agrees a care and support plan with them, setting out what help is needed and how it will be provided. There is then a separate financial assessment to work out whether the council will contribute to the cost. In England, people with savings and capital above ' + gbp(FIGURES.capitalLimits.upper, 0) + ' usually pay for their own care, and the value of the home your parent lives in is not counted if they are getting care at home. Government guidance expects the plan to be reviewed no later than every 12 months, with a light touch review considered 6 to 8 weeks after it is agreed.',
        'An adult can refuse a needs assessment. The council must still carry one out if your parent lacks capacity to refuse and it would be in their best interests, or if they are experiencing, or at risk of, abuse or neglect.',
        'In Wales, needs assessments follow different laws, and Scotland and Northern Ireland have their own systems too, so check with the local council or trust.',
      ],
    },
    {
      heading: 'Can you have a carer’s assessment as well?',
      paragraphs: [
        'Yes. If you look after your parent, you can ask the council for a carer’s assessment. It is free, anyone over 18 who provides care can ask for one, and it looks at how caring affects your health, work, free time and relationships. It is separate from your parent’s needs assessment, but you can ask for both to be done at the same time.',
      ],
    },
    {
      heading: 'What happens after the assessment?',
      paragraphs: [
        'After an agency assessment, the agency writes a care plan setting out what carers will do at each visit and how your parent likes things done. You should also get a written quote and contract, and a proposed start date. Read the care plan carefully with your parent and ask for changes if something is missing or not quite right.',
        'In the first few weeks, expect the agency to check how things are going. A care plan should change as needs change, so tell the agency straight away after a fall, a hospital stay or any change in health, and ask for a review. Good agencies also review plans regularly even when nothing obvious has changed.',
        'If you have not chosen an agency yet, Hello Hattie is a free matching service that sends your details to one CQC-registered agency that covers your parent’s postcode and has told us it can take on new clients, so the assessment can be your next step.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Do home care agencies charge for the assessment?',
      a: 'Many do not, but some do. Ask when you first call so there are no surprises. A council needs assessment is always free.',
    },
    {
      q: 'Can care start straight after the assessment?',
      a: 'Sometimes, especially when someone is leaving hospital. It depends on whether the agency has carers free for the times you need, and on any equipment that needs to be in place first.',
    },
    {
      q: 'Do we need a council needs assessment before arranging private care?',
      a: 'No. You can arrange care privately without one. But a council assessment is free, can identify equipment and other support, and is the first step if your parent may need help with the cost.',
    },
    {
      q: 'Should my parent be there for the assessment?',
      a: 'Yes, wherever possible. The assessment is about their care and their wishes. A family member being there too can help, but the assessor should speak with your parent directly.',
    },
    {
      q: 'What if my parent has dementia?',
      a: 'They should still be involved as much as possible and supported to make the decisions they can. If they cannot make a particular decision, it must be made in their best interests under the Mental Capacity Act. Let the agency know about any lasting power of attorney.',
    },
    {
      q: 'Can we change the care plan later?',
      a: 'Yes. A care plan should change as needs change. Tell the agency if anything is not working, and ask for a review.',
    },
    {
      q: 'Can I ask for a carer’s assessment for myself?',
      a: 'Yes. If you look after your parent, you can ask the council for a free carer’s assessment. It is separate from your parent’s assessment, but both can be done at the same time.',
    },
  ],
  sources: [
    { label: 'NHS, getting a needs assessment', url: 'https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/getting-a-needs-assessment/' },
    { label: 'NHS, care and support plans', url: 'https://www.nhs.uk/social-care-and-support/help-from-social-services-and-charities/care-and-support-plans/' },
    { label: 'NHS, carer’s assessments', url: 'https://www.nhs.uk/social-care-and-support/support-and-benefits-for-carers/carer-assessments/' },
    { label: 'NHS, Mental Capacity Act', url: 'https://www.nhs.uk/social-care-and-support/making-decisions-for-someone-else/mental-capacity-act/' },
    { label: 'Care Act 2014, section 11: refusal of assessment', url: 'https://www.legislation.gov.uk/ukpga/2014/23/section/11' },
    { label: 'GOV.UK, Care and support statutory guidance', url: 'https://www.gov.uk/government/publications/care-act-statutory-guidance/care-and-support-statutory-guidance' },
  ],
}
