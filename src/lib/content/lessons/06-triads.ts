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
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **triad** is a 3-note chord built by **stacking thirds** — skip every other scale degree. It contains a **root, a 3rd, and a 5th**. The quality of the 3rd and 5th determines the triad type. There are only four, and they are the DNA of every chord you will ever play.',
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
        ['Major', '1 3 5', 'M3 + m3', 'C E G', 'happy, stable'],
        ['Minor', '1 ♭3 5', 'm3 + M3', 'C E♭ G', 'sad, stable'],
        ['Diminished', '1 ♭3 ♭5', 'm3 + m3', 'C E♭ G♭', 'tense, unstable'],
        ['Augmented', '1 3 ♯5', 'M3 + M3', 'C E G♯', 'suspenseful'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'A **major 3rd** = 4 semitones; a **minor 3rd** = 3 semitones. The four triads are just the four ways to stack two thirds (major or minor) on top of each other:',
    },
    {
      kind: 'list',
      items: [
        'Major = root → **M3** → m3',
        'Minor = root → **m3** → M3',
        'Diminished = root → **m3** → m3',
        'Augmented = root → **M3** → M3',
      ],
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
      caption: 'C major triad (C E G). Switch the chord type on the explorer to hear minor, diminished, and augmented.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'minor', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C minor triad (C E♭ G) — one note different from major, a completely different emotion.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Inversions',
    },
    {
      kind: 'text',
      markdown:
        'A triad can be voiced with any of its three notes in the bass. Same three notes, different sound and bass motion:',
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
        'On guitar, triads appear as **small 3-note shapes** on adjacent string sets (strings 1-2-3, 2-3-4, 3-4-5, 4-5-6). Learning triads in all inversions across the neck is the gateway to fretboard freedom — every barre chord and CAGED shape is just triads connected.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **3rd** is the note that decides major vs minor. The 5th is the same in both (a perfect 5th) — it is the most "neutral" note. This is why you can often omit the 5th in larger chords without changing the harmony.',
    },
  ],
}
