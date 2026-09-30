import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'When does planning to leave hospital start?',
      paragraphs: [
        'Planning for discharge should start early, ideally soon after your parent is admitted. Government guidance for England says hospitals should tell the council as early as possible if someone is likely to need social care support when they leave, so everyone can plan together.',
        'Discharge can still feel sudden. Once doctors decide your parent no longer needs to be in a hospital bed, things can move quickly. The best thing you can do is get involved early, ask questions, and start thinking about what support your parent will need at home before a date is set.',
        'This guide covers the rules in England. Scotland, Wales and Northern Ireland arrange hospital discharge and care differently.',
      ],
    },
    {
      heading: 'Who should you talk to on the ward?',
      paragraphs: [
        'Ask the nurse in charge who is responsible for planning your parent’s discharge. Many hospitals have a discharge team or discharge coordinator, and your parent may also see a social worker, a physiotherapist or an occupational therapist before they leave. Your parent should be given the name and contact details of someone they can talk to about their discharge.',
        'With your parent’s agreement, you can be involved in these conversations. Share what you know: how they were managing before they came in, the layout of their home, who else helps them, and anything that worries you. Staff should also ask whether you, or anyone else, will be giving unpaid care, and whether you are willing and able to do so. Be honest. You do not have to take on more than you can manage.',
      ],
    },
    {
      heading: 'What is discharge to assess?',
      paragraphs: [
        'Many areas in England use an approach called discharge to assess. The idea is that people are assessed for their longer term care needs after they leave hospital, once they have had a chance to recover, rather than while they are still unwell on a ward. Going home is meant to be the normal first choice. There are four routes, often called pathways:',
      ],
      bullets: [
        'Pathway 0: going home with no new care needs.',
        'Pathway 1: going home with new or extra support, such as reablement visits.',
        'Pathway 2: a short stay in a community bed, such as a community hospital or care home, to recover before going home or deciding on longer term care.',
        'Pathway 3: moving into a new care home or nursing home. The guidance says this should only happen in exceptional circumstances, and people should usually have a chance to recover in a temporary placement before any decision about a permanent care home.',
      ],
    },
    {
      heading: 'What is reablement, and is it free?',
      paragraphs: [
        'Reablement, often called intermediate care, is short-term support to help your parent recover and regain skills and confidence after a hospital stay, a fall or an illness. It might include exercises to rebuild strength and movement, and help relearning daily tasks such as washing, dressing and making a drink. Most people receive it at home, though it can also be given in a community hospital or care home.',
        'It is provided by a team that may include occupational therapists, physiotherapists, nurses, social workers and care workers. It is not designed to do things for your parent, but to help them do things for themselves again.',
        'In England, the law says councils must provide intermediate care and reablement free of charge for up to six weeks. It lasts only as long as your parent needs it, which may be a week or two, and it is not available in every area. Ask the ward staff whether reablement is being offered, who will provide it and how long it is expected to last.',
      ],
    },
    {
      heading: 'What happens when reablement ends?',
      paragraphs: [
        'Before reablement finishes, the team should talk with your parent and you about what comes next. Many people recover well and need little or no further help. Others will need ongoing care.',
        'If your parent is likely to need longer term support, the council should carry out a care needs assessment. If they have eligible needs, the council will also do a financial assessment to work out how much your parent should pay towards their care. You can also choose to arrange and pay for care privately.',
        'If your parent has complex, intense or unpredictable health needs, ask whether they should be screened for NHS continuing healthcare. This is care arranged and funded solely by the NHS, and it can be given at home. The first step is usually a short checklist completed by a health or social care professional.',
      ],
    },
    {
      heading: 'What should you have ready at home?',
      paragraphs: ['A few simple preparations can make the first days home much easier:'],
      bullets: [
        'Heating on and the home warm, especially in colder months.',
        'Food in the fridge and cupboards that is easy to prepare, and drinks within reach.',
        'A clear route through the home, with rugs, trailing wires and clutter moved out of the way.',
        'A bed made up, and perhaps moved downstairs for a while if stairs are a problem.',
        'A key safe, or a plan for how carers and nurses will get in if your parent cannot easily reach the door.',
        'A list of phone numbers by the phone: GP, pharmacy, the agency, family and neighbours.',
        'Any existing medicines checked against what the hospital sends home, with old ones set aside if they have been stopped.',
      ],
    },
    {
      heading: 'What equipment might your parent need?',
      paragraphs: [
        'Equipment can make a big difference to safety and independence. Common examples include a raised toilet seat, a commode, a perching stool for the kitchen, grab rails, a shower seat, a walking frame or a special bed. An occupational therapist may assess your parent in hospital or at home and recommend what would help.',
        'In England, councils must provide community equipment, including aids and minor adaptations costing £1,000 or less, free of charge to people who are assessed as needing them. Ask when equipment will be delivered, and check that it arrives before or on the day your parent comes home. Larger adaptations, such as a stairlift or level access shower, go through a separate process with the council.',
      ],
    },
    {
      heading: 'What should you ask before your parent leaves hospital?',
      paragraphs: ['It helps to have clear answers to these questions before the day of discharge:'],
      bullets: [
        'What date and time is my parent expected to leave, and how will they get home?',
        'What care and support will be in place on the first day home, and who is providing it?',
        'Is reablement being offered, how long will it last, and what happens when it ends?',
        'What medicines are being sent home, and has anything changed or stopped?',
        'Is any equipment needed, and when will it arrive?',
        'Has the GP been sent a summary of the hospital stay?',
        'Who do we contact if things are not going well in the first few days?',
        'Should my parent be screened for NHS continuing healthcare?',
      ],
    },
    {
      heading: 'What if you think it is not safe for your parent to come home?',
      paragraphs: [
        'Your parent should not be sent home until staff have assessed what they need straight away. If you are worried the plan is not safe, for example because no care is in place, equipment has not arrived, or your parent could not manage the stairs, say so clearly to the ward staff and the discharge team. Ask them to explain the plan and write down what they tell you.',
        'If your concerns are not resolved, you can contact the hospital’s Patient Advice and Liaison Service (PALS). Bear in mind that the guidance says people do not have the right to stay in a hospital bed once they no longer need hospital care, including to wait for their preferred option. If your parent cannot manage at home straight away, ask about a short stay in a community bed to recover (pathway 2) rather than any permanent move.',
        'If things go wrong after your parent gets home, such as a fall or not coping, contact the GP, the reablement team or the council’s adult social care team quickly. Call 999 in an emergency.',
      ],
    },
    {
      heading: 'What support is there for you as a carer?',
      paragraphs: [
        'If you will be helping to look after your parent, you are entitled to ask the council for a carer’s assessment. It looks at how caring affects you, and what support might help, such as breaks. The guidance for England says a carer’s assessment should be done before new caring responsibilities begin. Local charities, such as your local Age UK, may also offer home from hospital support in some areas.',
      ],
    },
    {
      heading: 'How do you arrange private care after hospital?',
      paragraphs: [
        'If you plan to pay for care, want care to start sooner, or want to add to what the council provides, you can arrange it directly with a home care agency. If the council is funding your parent’s care, you can ask about a direct payment so you can choose the agency yourself.',
        'Contact agencies as early as you can. Tell them the expected discharge date, what the hospital has said about your parent’s needs, and whether reablement is in place. The agency will want to assess your parent, ideally before they leave hospital or on the first day home, so they can put a care plan together. Check the agency’s CQC report and ask how quickly they can start. Our free matching service can put you in touch with one CQC-registered agency that covers your parent’s postcode.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can hospital discharge be delayed until care is in place?',
      a: 'Your parent should not be sent home until staff have assessed their immediate needs and a safe plan is in place. But people do not have the right to stay in a hospital bed once they no longer need hospital care. If you are worried the plan is not safe, tell the discharge team clearly, and contact PALS if your concerns are not resolved.',
    },
    {
      q: 'Is reablement free?',
      a: 'Yes. In England, councils must provide intermediate care and reablement free of charge for up to six weeks. It only lasts as long as your parent needs it, and it is not available in every area.',
    },
    {
      q: 'What happens after the six weeks?',
      a: 'The team should plan next steps with you before reablement ends. If your parent still needs support, the council should assess their needs and, if they have eligible needs, their finances. Your parent may need to pay towards ongoing care.',
    },
    {
      q: 'What is discharge to assess?',
      a: 'It is an approach where people are assessed for longer term care after they leave hospital and have had a chance to recover, rather than on the ward. Going home is meant to be the normal first choice.',
    },
    {
      q: 'Do we have to use the care the council arranges?',
      a: 'No. You can arrange private care yourself, or, if the council is funding care, ask about a direct payment so you can choose your own agency.',
    },
    {
      q: 'Will equipment cost us anything?',
      a: 'In England, community equipment, including aids and minor adaptations costing £1,000 or less, must be provided free by the council to people assessed as needing it. Ask the occupational therapist or discharge team what is being arranged.',
    },
    {
      q: 'What if my parent’s needs are mainly health needs?',
      a: 'Ask the discharge team whether your parent should be screened for NHS continuing healthcare, which is care arranged and funded solely by the NHS and can be given at home.',
    },
    {
      q: 'Can I have a say in the discharge plan?',
      a: 'Yes, if your parent agrees. Families and carers can be involved in discharge discussions, and unpaid carers are entitled to a carer’s assessment.',
    },
  ],
  sources: [
    {
      label: 'GOV.UK, Hospital discharge and community support guidance',
      url: 'https://www.gov.uk/government/publications/hospital-discharge-and-community-support-guidance/hospital-discharge-and-community-support-guidance',
    },
    {
      label: 'NHS, Planning to leave hospital',
      url: 'https://www.nhs.uk/social-care-and-support/care-after-a-hospital-stay/planning-to-leave-hospital/',
    },
    {
      label: 'NHS, Care to support recovery after leaving hospital or after a fall, injury or illness',
      url: 'https://www.nhs.uk/social-care-and-support/care-after-a-hospital-stay/care-to-support-recovery-after-leaving-hospital-or-after-a-fall-injury-or-illness/',
    },
    {
      label: 'legislation.gov.uk, Care and Support (Charging and Assessment of Resources) Regulations 2014, regulation 3',
      url: 'https://www.legislation.gov.uk/uksi/2014/2672/regulation/3',
    },
    {
      label: 'Age UK, Leaving hospital',
      url: 'https://www.ageuk.org.uk/information-advice/health-wellbeing/health-services/leaving-hospital/',
    },
    {
      label: 'NHS, NHS continuing healthcare',
      url: 'https://www.nhs.uk/social-care-and-support/money-work-and-benefits/nhs-continuing-healthcare/',
    },
  ],
}
