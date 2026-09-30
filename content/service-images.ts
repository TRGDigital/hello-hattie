/** Photos for each type of care page. `main` sits beside "What is…" and on cards; `side` sits in the
 *  "It can suit you if" panel. A missing `src` shows a placeholder carrying the brief for the photo to make. */
type Img = { src?: string; brief: string }

export const SERVICE_IMAGES: Record<string, { main: Img; side: Img }> = {
  'live-in-care': {
    main: { src: '/images/care-live-in.jpg', brief: 'A live-in carer and an older woman planting flowers together in her garden' },
    side: { brief: 'a live-in carer and an older man cooking lunch together in his kitchen' },
  },
  'home-care': {
    main: { src: '/images/care-visiting.jpg', brief: 'A carer sharing breakfast with an older man in his kitchen' },
    side: { brief: 'a care worker arriving at an older woman’s front door, both smiling' },
  },
  'overnight-care': {
    main: { src: '/images/care-overnight.jpg', brief: 'A carer bringing an older man a cup of tea in the evening' },
    side: { brief: 'a carer reading quietly in a softly lit living room at night' },
  },
  'dementia-care-at-home': {
    main: { src: '/images/care-dementia.jpg', brief: 'A carer and an older woman looking through a photo album together' },
    side: { brief: 'a carer and an older man folding laundry together at home' },
  },
  'respite-care-at-home': {
    main: { src: '/images/care-respite.jpg', brief: 'A daughter relaxing with a cup of tea while her father chats with his carer' },
    side: { brief: 'a family carer out on a countryside walk with a friend, relaxed and smiling' },
  },
  'companionship-care': {
    main: { src: '/images/hero-home.jpg', brief: 'A smiling carer holding hands with an older woman in her living room' },
    side: { brief: 'a companion and an older man playing cards at the dining table' },
  },
  'palliative-care-at-home': {
    main: { brief: 'a carer gently holding the hand of an older woman resting in bed at home' },
    side: { brief: 'a family sitting together in a calm living room while a carer makes tea' },
  },
  'complex-care-at-home': {
    main: { brief: 'a care worker and a younger adult in a wheelchair laughing together at home' },
    side: { brief: 'a carer adjusting a profiling bed in a bright bedroom at home' },
  },
  '24-hour-care': {
    main: { brief: 'two carers doing a friendly handover in an older woman’s kitchen' },
    side: { brief: 'a carer opening the curtains in the morning for an older woman sitting up in bed' },
  },
  'hourly-care': {
    main: { brief: 'a carer and an older woman walking arm in arm to the local shop' },
    side: { brief: 'a carer helping an older man on with his coat before an appointment' },
  },
}
