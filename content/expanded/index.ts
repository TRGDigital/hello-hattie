// Long-form versions of the guides, cost guides and blog posts (sections, FAQs and sources),
// one file per article. They replace the short originals in articles.ts and posts.ts.
import type { Article } from '../types'
import { expanded as e0 } from './arranging-care-after-hospital'
import { expanded as e1 } from './choosing-a-home-care-agency'
import { expanded as e2 } from './home-care-cost-per-hour'
import { expanded as e3 } from './live-in-care-cost'
import { expanded as e4 } from './live-in-care-vs-care-home'
import { expanded as e5 } from './paying-for-home-care'
import { expanded as e6 } from './questions-to-ask-a-home-care-agency'
import { expanded as e7 } from './signs-a-parent-needs-help-at-home'
import { expanded as e8 } from './what-does-a-home-carer-do'
import { expanded as e9 } from './what-happens-at-a-home-care-assessment'
import { expanded as e10 } from './when-a-parent-does-not-want-help'

export const EXPANDED: Record<string, Pick<Article, 'sections' | 'faqs' | 'sources'>> = {
  'arranging-care-after-hospital': e0,
  'choosing-a-home-care-agency': e1,
  'home-care-cost-per-hour': e2,
  'live-in-care-cost': e3,
  'live-in-care-vs-care-home': e4,
  'paying-for-home-care': e5,
  'questions-to-ask-a-home-care-agency': e6,
  'signs-a-parent-needs-help-at-home': e7,
  'what-does-a-home-carer-do': e8,
  'what-happens-at-a-home-care-assessment': e9,
  'when-a-parent-does-not-want-help': e10,
}
