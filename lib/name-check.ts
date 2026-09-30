// Name checks for the matching form (and the agency form). We can't sell an enquiry with an
// offensive or made-up name, so these run in the browser (the field is cleared as soon as the
// family leaves it) and again on the server before the lead is saved.
//
// Two lists, to avoid blocking real surnames (the "Scunthorpe problem"):
//  - CONTAINS: strings with no innocent use inside a name. Matched anywhere, after undoing
//    common disguises (f*ck, sh1t, c u n t, fuuuck).
//  - WHOLE: words that are offensive on their own but appear inside genuine names, so they only
//    match as a whole word: e.g. "dick" (but Dickens, Dickinson), "cock" (Cockburn, Hancock),
//    "fag" (Fagan), "willy" is left out entirely because it's a real first name.
// Add to either list here; the form and the server both pick it up.

const CONTAINS = [
  'fuck', 'fck', 'fuq', 'cunt', 'shit', 'motherf', 'bollock', 'bollok', 'twat', 'bastard', 'bitch',
  'whore', 'slut', 'nigg', 'faggot', 'retard', 'spastic', 'paedo', 'rapist', 'dickhead', 'knobhead',
  'bellend', 'arsehole', 'asshole', 'dipshit', 'jizz', 'wanker', 'tosser', 'minge', 'pussy', 'dildo', 'penis',
  'vagina', 'blowjob', 'handjob', 'rimjob', 'cumshot', 'hitler', 'kkk',
]

const WHOLE = [
  'arse', 'ass', 'bum', 'cock', 'cocks', 'crap', 'cum', 'damn', 'dicks', 'fag', 'fags', 'git', 'goddam', 'homo', 'jap',
  'kike', 'knob', 'lesbo', 'nonce', 'nob', 'paki', 'piss', 'poof', 'poop', 'prat', 'prick', 'pube', 'queer', 'rape',
  'scrote', 'sex', 'sexy', 'shag', 'slag', 'spaz', 'spunk', 'tit', 'tits', 'titty', 'turd', 'wog', 'wop', 'yid', 'bugger',
  'pillock', 'plonker', 'numpty', 'idiot', 'moron', 'stupid', 'dumb', 'loser', 'ugly', 'wank', 'wanky', 'fuk', 'kunt',
  'clit', 'porn', 'boner', 'nazi', 'pedo', 'nigga', 'coon', 'bitches', 'boobs', 'boob',
]

// Real names that contain a blocked string. Never blocked. Add any genuine name that gets caught.
const ALLOW = ['shittu', 'scunthorpe', 'dickens', 'dickinson', 'dickson', 'cockburn', 'cockerill', 'hancock', 'babcock',
  'hitchcock', 'glasscock', 'peacock', 'woodcock', 'nazir', 'nazira', 'fukuda', 'kuntz', 'swank', 'clitheroe', 'penistone',
  'pratt', 'cumming', 'cummings', 'cumberbatch', 'assange', 'bassett', 'wankel', 'twatling']

// Made-up or placeholder names. Whole-name matches after removing spaces and punctuation.
const FAKE = [
  'test', 'testing', 'tester', 'testtest', 'asdf', 'asdfgh', 'qwerty', 'qwert', 'zxcv', 'abc', 'abcd', 'xxx', 'xyz', 'aaa',
  'na', 'none', 'noname', 'nobody', 'anon', 'anonymous', 'unknown', 'name', 'firstname', 'lastname', 'surname', 'fake',
  'blah', 'nothing', 'null', 'undefined', 'mickeymouse', 'minniemouse', 'donaldduck', 'johndoe', 'janedoe', 'joebloggs',
  'batman', 'superman', 'spiderman', 'santa', 'santaclaus', 'fatherchristmas', 'homersimpson', 'bartsimpson',
  'mrbean', 'hellohattie', 'hattie', 'admin', 'user', 'customer', 'me', 'myself', 'mum', 'dad',
]
// Pairs that are only fake together (first + last), e.g. "Mickey" is a real first name.
const FAKE_FULL = ['mickeymouse', 'minniemouse', 'donaldduck', 'johndoe', 'janedoe', 'joebloggs', 'homersimpson', 'bartsimpson', 'santaclaus', 'mrbean', 'test test', 'testtest']

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '!': 'i', '|': 'i', '3': 'e', '4': 'a', '@': 'a', '5': 's', '$': 's', '7': 't', '8': 'b', '9': 'g', '+': 't' }

/** Lower case, accents off, leetspeak undone. Keeps spaces between words. */
function clean(s: string) {
  return s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[01!|3@4578$9+]/g, (c) => LEET[c] ?? c)
}
/** Letters only, repeated letters squashed (fuuuck -> fuck, c.u.n.t -> cunt). */
const squash = (s: string) => clean(s).replace(/[^a-z]/g, '').replace(/(.)\1{2,}/g, '$1$1')
const squash1 = (s: string) => squash(s).replace(/(.)\1+/g, '$1')

export type NameProblem = 'empty' | 'short' | 'characters' | 'offensive' | 'fake'

/** Checks one name part (a first name or a last name). Returns null when it's fine. */
export function nameProblem(raw: string): NameProblem | null {
  const v = raw.trim()
  if (!v) return 'empty'
  if (v.replace(/[^\p{L}]/gu, '').length < 2) return 'short'
  // Letters, spaces, hyphens and apostrophes only (O'Brien, Smith-Jones, Zoë, Siân). No digits or symbols.
  if (!/^[\p{L}][\p{L}' ’.\-]*$/u.test(v)) {
    // Could be a disguised swear word (sh1t, f*ck): check before calling it a character problem.
    return isOffensive(v) ? 'offensive' : 'characters'
  }
  if (isOffensive(v)) return 'offensive'
  const flat = squash(v)
  if (FAKE.includes(flat) || /^(.)\1+$/.test(flat) || /^[bcdfghjklmnpqrstvwxz]{5,}$/.test(flat)) return 'fake'
  return null
}

function isOffensive(v: string) {
  const words = clean(v).split(/[^a-z]+/).filter(Boolean)
  const allowed = (w: string) => ALLOW.includes(w)
  // Check each word on its own (so an allowed surname never hides a swear word in the other part),
  // then the whole value with spaces and dots removed (catches "f u c k" and "c.u.n.t").
  for (const w of words) {
    if (allowed(w)) continue
    const s = w.replace(/(.)\1{2,}/g, '$1$1'), s1 = w.replace(/(.)\1+/g, '$1')
    if (CONTAINS.some((c) => s.includes(c) || s1.includes(c))) return true
    if (WHOLE.includes(s)) return true
  }
  const joined = squash(v)
  if (words.length > 1 && !words.some(allowed) && CONTAINS.some((c) => joined.includes(c))) return true
  return false
}

/** Checks the full name together, for fake pairs like "Mickey Mouse". */
export function fullNameProblem(first: string, last: string): NameProblem | null {
  const a = nameProblem(first); if (a) return a
  const b = nameProblem(last); if (b) return b
  const full = squash(`${first}${last}`)
  if (FAKE_FULL.includes(full) || squash(first) === squash(last) && squash(first).length < 5) return 'fake'
  return null
}

export const NAME_MESSAGE: Record<NameProblem, (part: string) => string> = {
  empty: (p) => `Please enter your ${p}.`,
  short: (p) => `Please enter your full ${p}.`,
  characters: (p) => `Please use letters only in your ${p}.`,
  offensive: (p) => `Please enter your real ${p}. The agency uses it to call you.`,
  fake: (p) => `Please enter your real ${p}. The agency uses it to call you.`,
}
