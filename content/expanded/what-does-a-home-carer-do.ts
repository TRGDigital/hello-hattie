import type { Article } from '../types'

export const expanded: Pick<Article, 'sections' | 'faqs' | 'sources'> = {
  sections: [
    {
      heading: 'What is a home carer?',
      paragraphs: [
        'A home carer, sometimes called a care worker or domiciliary carer, visits people in their own homes to help with everyday life. The aim is to help your parent stay safe, comfortable and as independent as possible, in the place they know best.',
        'Carers can call in once a day or several times a day, stay overnight, or live in. Some visits are short and focused on one task, such as help getting up. Others are longer and include meals, housework and company. In England, agencies that provide personal care at home must be registered with the Care Quality Commission (CQC).',
        'To give you a feel for it, a morning visit might include helping your parent out of bed, a wash and getting dressed, prompting their medicines, making breakfast and a hot drink, and a quick tidy before the carer leaves. An evening visit might include a light meal, help getting changed and settled in bed, and making sure the doors are locked and a drink is within reach.',
      ],
    },
    {
      heading: 'How is it decided what the carer will do?',
      paragraphs: [
        'Everything a carer does is set out in a written care plan. Before care starts, the agency visits to assess your parent’s needs and agrees the plan with them and, where appropriate, with you. If the council has done a needs assessment, share it with the agency, as it helps explain what support is needed.',
        'A good care plan does not just list tasks. It describes how your parent likes things done, what they can still do for themselves, what worries them and what matters to them. Carers follow the plan at each visit, write notes on what they have done, and tell the agency about any changes they notice.',
        'The care plan should be reviewed regularly, and whenever your parent’s needs change, for example after a fall, an illness or a hospital stay.',
      ],
    },
    {
      heading: 'What personal care does a carer help with?',
      paragraphs: [
        'Personal care is at the heart of most home care. Carers help with intimate tasks in a respectful, unhurried way, at your parent’s pace and in the way they prefer. This can include:',
        'If your parent would feel more comfortable with a carer of the same sex for personal care, say so at the assessment. Agencies will often try to arrange this, though it can affect which visit times are available.',
      ],
      bullets: [
        'Getting out of bed in the morning and settled in bed at night.',
        'Washing, showering or bathing, and help with shaving, hair and teeth.',
        'Getting dressed and undressed, and choosing clothes.',
        'Using the toilet, and continence care such as changing pads.',
        'Skin care, such as applying creams, where this is in the care plan.',
        'Noticing and reporting signs of soreness or skin damage.',
      ],
    },
    {
      heading: 'Can a carer help with medicines?',
      paragraphs: [
        'Yes, but only in the way that has been agreed and written into the care plan. National guidance from NICE says the care plan should state who will help with each medicine and what help they will give. Support usually falls into different levels:',
      ],
      bullets: [
        'Reminding or prompting: the carer reminds your parent it is time to take their medicines, and your parent takes them.',
        'Assisting: the carer helps your parent take the medicines themselves, for example by opening containers.',
        'Administering: the carer gives the medicine to your parent. The carer must be trained to do this, and there must be clear instructions from the GP or pharmacist, such as on the label.',
      ],
    },
    {
      heading: 'What else should you know about medicines support?',
      paragraphs: [
        'Before helping with a dose, a carer should check your parent has not already taken it, and should record every bit of medicines support they give, usually on a medicines administration record. A carer should not leave a dose out for later unless this has been agreed and is in the care plan.',
        'The care plan should also say where medicines are kept and who is responsible for ordering them. The agency should make sure your parent’s GP and pharmacist know what support is being given. If medicines change after a GP visit or a hospital stay, tell the agency straight away so the plan can be updated.',
        'Some medicines are taken only when needed, such as pain relief or an inhaler. The care plan should say when these can be offered and how often. It is also worth asking the agency what carers do if your parent does not want to take a medicine, how this is recorded and who they tell.',
      ],
    },
    {
      heading: 'Will a carer help with meals and drinks?',
      paragraphs: [
        'Carers can prepare breakfast, lunch, tea and snacks, heat up ready meals or cook from scratch, depending on the time available and what is in the care plan. They can make sure a drink is left within reach, and encourage your parent to eat and drink enough, which matters a great deal for health and confidence.',
        'If your parent has a special diet, swallowing difficulties or a condition such as diabetes, make sure this is written into the care plan. Carers can also notice if your parent is losing interest in food or leaving meals untouched, and let the agency and family know.',
        'Carers can also help keep the kitchen safe, for example by checking use by dates, putting shopping away and writing a shopping list with your parent. Small things like laying the table or eating together can make mealtimes more enjoyable, especially for someone who has lost their appetite.',
      ],
    },
    {
      heading: 'Can a carer help my parent move around safely?',
      paragraphs: [
        'Carers support people to move around the home, get in and out of chairs and bed, and use the stairs, bath or shower. They are trained in safe moving and handling, which protects both your parent and the carer.',
        'Where equipment is needed, such as a walking frame, a stand aid or a hoist, carers use it as set out in the care plan. Some tasks, especially using a hoist, may need two carers at once. An occupational therapist can assess your parent and recommend equipment. Safe moving and handling usually means using the right equipment rather than lifting your parent by hand, which can injure you both.',
      ],
    },
    {
      heading: 'Do carers do housework and errands?',
      paragraphs: ['Carers usually help with household tasks that are linked to your parent’s care and wellbeing:'],
      bullets: [
        'Washing up, wiping kitchen surfaces and keeping the bathroom clean.',
        'Laundry, ironing and changing the bed.',
        'Emptying bins and keeping walkways clear to reduce the risk of falls.',
        'Shopping, collecting prescriptions and posting letters.',
        'Making sure the home is warm, secure and safe when they leave.',
      ],
    },
    {
      heading: 'Is companionship part of the job?',
      paragraphs: [
        'Yes, and for many people it is the most valued part. A carer can chat over a cup of tea, share a hobby, play cards, look at old photos, read the paper together or help with a phone or video call to family.',
        'Carers can also help your parent get out: a walk to the shops, a trip to a lunch club, church or a café, or going along to a GP or hospital appointment. Ask the agency how trips work and whether there are extra charges, such as mileage.',
        'For someone living with dementia, a familiar carer who knows their history, their favourite music and the names of the people in their photos can bring real comfort. For someone who lives alone, a regular visit may be the main conversation of the day, so it is worth telling the agency what your parent enjoys talking about.',
      ],
    },
    {
      heading: 'What can a home carer not do?',
      paragraphs: [
        'Home carers are not nurses. Clinical tasks, such as most injections, dressing wounds, or managing a catheter or feeding tube, are usually done by a community or district nurse. In some cases a nurse or other health professional can delegate a specific health task to a care worker, but only when the carer has been trained and assessed as competent, the agency agrees, it is written into the care plan, and the health professional keeps oversight.',
        'Carers also usually cannot:',
      ],
      bullets: [
        'Make decisions on your parent’s behalf, including about money, health or where they live.',
        'Handle large sums of money, sign documents for your parent or accept gifts.',
        'Do heavy cleaning, decorating, gardening or DIY that is not part of the care plan.',
        'Change what they do, or leave early, without it being agreed with the agency.',
        'Give medicines in a way that is not set out in the care plan.',
      ],
    },
    {
      heading: 'How should a carer treat your parent?',
      paragraphs: [
        'Good care protects dignity and independence. Carers should knock and announce themselves before coming in, carry an identity card, ask before helping, keep your parent covered during personal care, and let them do as much as they can for themselves, even if it takes longer. Your parent should always be treated with kindness and respect, and their choices listened to.',
        'Carers also act as eyes and ears. They record each visit and tell the agency if they notice changes such as confusion, weight loss, a fall, or signs that your parent is struggling. The agency should then review the care plan and keep you informed. If you are ever unsure whether a task is included, ask the agency before care starts. If you are starting to look for support, our free matching service can put you in touch with one CQC-registered agency near your parent.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can a carer give my parent their medication?',
      a: 'It depends on the care plan. Carers can remind, help or give medicines only in the way that has been agreed and written in the care plan. To give medicines, they must be trained, and there must be clear instructions from the GP or pharmacist.',
    },
    {
      q: 'Can a carer do nursing tasks such as injections or wound care?',
      a: 'Usually not. These are normally done by a community or district nurse. A specific health task can sometimes be delegated to a trained care worker by a health professional, but only if it is agreed, written into the care plan and overseen by that professional.',
    },
    {
      q: 'Will the carer clean the whole house?',
      a: 'Carers usually do light housework linked to your parent’s care, such as washing up, laundry and keeping the kitchen and bathroom clean. Deep cleaning, gardening and DIY are not normally included.',
    },
    {
      q: 'Can a carer take my parent to appointments?',
      a: 'Often, yes. Ask the agency how this works, whether the visit time needs to be longer, and whether there is any charge for mileage.',
    },
    {
      q: 'Can a carer help my parent with money?',
      a: 'Carers can usually help with small, everyday purchases such as shopping, with receipts kept. They should not manage your parent’s finances, handle large sums or make financial decisions for them.',
    },
    {
      q: 'What if my parent needs two carers?',
      a: 'Some tasks, such as using a hoist, need two carers at once for safety. The agency will say if this is needed after its assessment, and it will be written into the care plan.',
    },
    {
      q: 'What if my parent’s needs change?',
      a: 'Tell the agency. The care plan should be reviewed and updated so the support matches what your parent needs now, for example after a fall, an illness or a hospital stay.',
    },
  ],
  sources: [
    {
      label: 'NHS, Help at home from a paid carer',
      url: 'https://www.nhs.uk/social-care-and-support/care-services-equipment-and-care-homes/homecare/',
    },
    {
      label: 'NICE, Help to manage your medicines if you receive social care at home',
      url: 'https://www.nice.org.uk/guidance/ng67/ifp/chapter/help-to-manage-your-medicines-if-you-receive-social-care-at-home',
    },
    {
      label: 'NICE, Managing medicines for adults receiving social care in the community (NG67)',
      url: 'https://www.nice.org.uk/guidance/ng67',
    },
    {
      label: 'Skills for Care, Delegated healthcare activities',
      url: 'https://www.skillsforcare.org.uk/delegated-healthcare-activities',
    },
    {
      label: 'CQC, The five key questions we ask',
      url: 'https://www.cqc.org.uk/about-us/how-we-do-our-job/five-key-questions-we-ask',
    },
  ],
}
