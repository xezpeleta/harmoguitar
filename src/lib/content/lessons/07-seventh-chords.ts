/**
 * Lesson 7 — Seventh Chords
 * Source: RESEARCH.md §6
 */
import type { Lesson } from '$lib/content/schema'

export const seventhChords: Lesson = {
  id: 'seventh-chords',
  slug: 'seventh-chords',
  title: 'Seventh Chords',
  summary: 'Adding one more third — the five 7th-chord qualities that define jazz harmony.',
  minutes: 11,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **seventh chord** adds one more third on top of a triad — now 4 notes: root, 3rd, 5th, 7th. Seventh chords are the foundation of jazz harmony. There are five you must know cold.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The five essential 7th chords',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Formula', 'Stack of 3rds', 'Example (C)', 'Use'],
      rows: [
        ['Major 7', '1 3 5 7', 'M3 m3 M3', 'C E G B', 'Imaj7, IVmaj7'],
        ['Dominant 7', '1 3 5 ♭7', 'M3 m3 m3', 'C E G B♭', 'V7 (resolves to I)'],
        ['Minor 7', '1 ♭3 5 ♭7', 'm3 M3 m3', 'C E♭ G B♭', 'iim7, vim7'],
        ['Half-diminished', '1 ♭3 ♭5 ♭7', 'm3 m3 M3', 'C E♭ G♭ B♭', 'iim7♭5 (minor ii–V–i)'],
        ['Diminished 7', '1 ♭3 ♭5 ♭♭7', 'm3 m3 m3', 'C E♭ G♭ B♭♭', 'passing, leading-tone'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Build any 7th chord in 3 steps',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Find the **root** note on the fretboard.',
        'Count up the **stack of thirds** (major or minor, per the formula) to find the 3rd, 5th, and 7th.',
        'Find all occurrences of those 4 notes across the other strings — any combination (with doublings) forms a voicing.',
      ],
    },

    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'Cmaj7 (C E G B). The "home" chord of the key of C.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 (G B D F) — the V7 of C. Hear how it wants to resolve to C.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dm7 (D F A C) — the iim7 of C, the start of a ii–V–I.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why dominant 7 is special',
    },
    {
      kind: 'text',
      markdown:
        'The dominant 7 chord (1 3 5 ♭7) contains a **tritone** between the 3rd and ♭7th. This tritone creates **maximum tension** that wants to resolve: the 3rd pulls up by semitone, the ♭7 pulls down by semitone. This V7 → I resolution is the engine of all Western tonal harmony.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'In G7 (G B D F), the tritone is **B–F**. B wants to rise to C (the 3rd of the I chord); F wants to fall to E (the 3rd of C major, or rather the 5th... actually E is the 3rd of C). Watch those two notes resolve into Cmaj7 and you have understood the core of tonal music.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'On the explorer, switch between maj7, dom7, and m7 with the same root. The only difference is the 7th — but that one note changes the chord\'s entire function.',
    },
  ],
}
