/**
 * Lesson 6 — Triads
 * Source: RESEARCH.md §5
 */
import type { Lesson } from '$lib/content/schema'

export const triads: Lesson = {
  id: 'triads',
  slug: 'triads',
  title: 'Triads: The First Chords',
  summary: 'Stacking thirds into the four triad qualities — the gateway to fretboard freedom.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **triad** is a 3-note chord built by **stacking thirds** — skip every other scale degree. It contains a **root, a 3rd, and a 5th**. The quality of the 3rd and 5th determines the triad type. There are only four, and they are the DNA of every chord you will ever play.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'You already play triads — every open chord you know is one. A standard open {{C}} major is just the triad ({{C}} {{E}} {{G}}) with two notes doubled for a fuller sound: strings 5-4-3 give you root-3rd-5th, and strings 2-1 double the root and 3rd an octave up. Strip away the doubles and you are left with three notes. That is the triad — the open chord is the triad **padded out**.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why bother with triads at all?** Three notes ring clearer than six (less mud in a band mix), the shapes are small enough to move anywhere on the neck, and they let you blur the line between rhythm and lead — a riff can *be* the chord progression. Countless iconic parts are triads in disguise: the intros of \u201cRoxanne,\u201d \u201cSubstitute,\u201d and \u201cWhole Lotta Love\u201d are small triad shapes slid up the neck, not full barre chords.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The four triad qualities',
    },
    {
      kind: 'table',
      headers: ['Triad', 'Formula', 'Stack of 3rds', 'Example (C)', 'Sound'],
      rows: [
        ['Major', '1 3 5', 'M3 + m3', '{{C}} {{E}} {{G}}', 'happy, stable'],
        ['Minor', '1 ♭3 5', 'm3 + M3', '{{C}} {{Eb}} {{G}}', 'sad, stable'],
        ['Diminished', '1 ♭3 ♭5', 'm3 + m3', '{{C}} {{Eb}} {{Gb}}', 'tense, unstable'],
        ['Augmented', '1 3 ♯5', 'M3 + M3', '{{C}} {{E}} {{G#}}', 'suspenseful'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'A **major 3rd** = 4 semitones; a **minor 3rd** = 3 semitones. The four triads are just the four ways to stack two thirds (major or minor) on top of each other. The clearest way to see the relationships is as a **transformation chain** starting from the major triad — change one note at a time:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Start with **major** (1 3 5).',
        'Lower the 3rd one semitone → **minor** (1 ♭3 5).',
        'Lower the 5th one semitone → **diminished** (1 ♭3 ♭5).',
        'Go back to major, and raise the 5th one semitone → **augmented** (1 3 ♯5).',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The 3rd is the switch that flips major ↔ minor. The 5th is the switch that flips stable ↔ unstable: a perfect 5th feels settled (major, minor); a diminished 5th creates tension (diminished); an augmented 5th creates suspense (augmented). Two knobs, four sounds.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'See and hear them',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C major triad ({{C}} {{E}} {{G}}). Switch the chord type on the explorer to hear minor, diminished, and augmented.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'minor', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C minor triad ({{C}} {{Eb}} {{G}}) — one note different from major, a completely different emotion.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Inversions',
    },
    {
      kind: 'text',
      markdown:
        'A triad can be voiced with any of its three notes in the bass — same three notes, reordered. This matters because it changes the **bass motion** and the emotional colour: a root-position triad feels grounded; a 1st inversion (3rd in the bass) feels like it is lifting; a 2nd inversion (5th in the bass) feels suspended, wanting to resolve.',
    },
    {
      kind: 'list',
      items: [
        '**Root position** — root in the bass (1-3-5)',
        '**1st inversion** — 3rd in the bass (3-5-1)',
        '**2nd inversion** — 5th in the bass (5-1-3)',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'On guitar, triads live on **four string sets**: strings 1-2-3, 2-3-4, 3-4-5, and 4-5-6. On each set there are three inversions (root, 1st, 2nd) — twelve shapes in total. That sounds like a lot, but the open chords you already know are the first row: the open {{D}} chord shape is a 2nd-inversion triad on strings 1-2-3, the open {{A}} shape is a 1st-inversion triad on strings 2-3-4. You are not learning from scratch — you are *naming what you already play*. Practice tip: pick one string set, find the three inversions of a major triad, and arpeggiate them up and down the neck before moving to the next set.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **3rd** is the note that decides major vs minor. The 5th is the same in both (a perfect 5th) — it is the most "neutral" note. This is why you can often omit the 5th in larger chords without changing the harmony.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to practise triads.** Do not try to memorize all twelve shapes at once. Start with one string set (strings 1-2-3, the thinnest, is easiest) and one quality (major). Find the three inversions up the neck, then repeat for minor. Only when major and minor feel automatic on one string set should you add a second set. The goal is not to know every shape — it is to *see* the triad hidden inside any chord or scale shape you already play, so you can grab it the instant a progression needs a smaller, clearer voicing.',
    },
  ],
  sources: [
    {
      author: 'Jack Gardiner',
      title: 'TRIADS | 10 Levels | Beginner to Pro',
      url: 'https://www.youtube.com/watch?v=E7KBw24O5Jo',
      note: 'A progressive 10-level method from constructing a major triad to using inversions as arpeggios across all four string sets. The four-string-set framework (E-string, A-string, D-string, G-string sets) and the reminder that open chords are already triads in inversion.',
    },
    {
      author: 'Move Forward Guitar',
      title: 'Guitar Music Theory - Major, minor, Diminished, Augmented',
      url: 'https://www.youtube.com/watch?v=n8eHRaDr9U0',
      note: 'The cleanest one-note-at-a-time transformation chain: start from a major triad, lower the 3rd for minor, lower the 5th for diminished, raise the 5th for augmented. Also the clearest statement that every open chord is a triad with doubled notes.',
    },
    {
      author: 'GuitarLessonsVancouver',
      title: 'Triads on Guitar: What\u2019s the Point???',
      url: 'https://www.youtube.com/watch?v=o6292SsJSZk',
      note: 'Answers the \u201cwhy bother\u201d question: triads as the link between chord shapes and pentatonic scale shapes, so you can resolve a solo line onto a chord tone or blend rhythm and lead. The three inversion shapes found inside the open A, E, and D chord forms.',
    },
    {
      author: 'Andy Guitar',
      title: 'Why You Should Learn TRIADS & 8 Songs To Play!',
      url: 'https://www.youtube.com/watch?v=r3yzNMzHHRk',
      note: 'Song-based motivation: iconic riffs built from triad shapes moved up the neck \u2014 \u201cRoxanne,\u201d \u201cSubstitute,\u201d \u201cWholehearted,\u201d \u201cEnd of the Line,\u201d \u201cUnder Pressure.\u201d Shows that triads turn ordinary barre-chord progressions into memorable riffs.',
    },
  ],
}
