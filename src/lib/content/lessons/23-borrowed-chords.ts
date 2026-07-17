/**
 * Lesson 23 — Borrowed Chords & Modal Mixture
 * Source: RESEARCH.md §17
 *
 * Taking chords from the parallel minor (or another mode) and using them in a
 * major key — the "darkening" technique behind countless Beatles, pop, and
 * jazz ballad moments.
 */
import type { Lesson } from '$lib/content/schema'

export const borrowedChords: Lesson = {
  id: 'borrowed-chords',
  slug: 'borrowed-chords-and-modal-mixture',
  title: 'Borrowed Chords & Modal Mixture',
  summary: 'How a single chord from the parallel minor can turn a happy major key wistful — the bittersweet sound of modal mixture.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Modal mixture** (or "borrowed chords") means taking chords from the **parallel minor** and using them in a major key. The tonal center stays the same — you just "darken" it momentarily. The most famous example: the **minor iv** chord ({{F}}m in C major) that ends countless Beatles and pop ballads with a bittersweet sigh.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The parallel minor\'s chords',
    },
    {
      kind: 'text',
      markdown:
        'The {{C}} natural minor scale ({{C}} {{D}} {{Eb}} {{F}} {{G}} {{Ab}} {{Bb}}) produces chords that can be borrowed into {{C}} major. They all share the same tonic ({{C}}), so they feel related but coloured:',
    },
    {
      kind: 'table',
      headers: ['Borrowed chord', 'In C', 'Common use', 'Effect'],
      rows: [
        ['**i (minor I)**', '{{C}}m', 'deceptive, colour', '"now it\'s sad"'],
        ['**♭III**', '{{Eb}}', 'bridge to IV', 'broad, filmic'],
        ['**iv (minor iv)**', '{{F}}m', 'ending a phrase to I', 'bittersweet, "Beatles"'],
        ['**♭VI**', '{{Ab}}', 'dramatic lift', 'epic, theatrical'],
        ['**♭VII**', '{{Bb}}', 'back-door to I', '"Mixolydian" rock sound'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The minor iv → I',
    },
    {
      kind: 'text',
      markdown:
        'The **minor iv → I** is the most common borrowed chord. Instead of {{F}} → {{C}}, you play **{{F}}m → {{C}}**. The magic note is **{{Ab}}** (the ♭3 of Fm, borrowed from C minor) — it resolves down by semitone to **{{G}}** (the 5th of C). That half-step descent is the "teardrop" sound.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'minor', root: 'F' },
      widgets: ['fretboard', 'staff'],
      caption: '{{F}}m — the borrowed minor iv. Hit “Play progression” to hear {{F}}m → {{C}} — the bittersweet ending.',
      play: {
        kind: 'progression',
        chords: ['Fm', 'C'],
        tempo: 100,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The back-door cadence: ♭VI → ♭VII → I',
    },
    {
      kind: 'text',
      markdown:
        'A majestic, "final" sound: **{{Ab}} → {{Bb}} → {{C}}**. In jazz, the ♭VII is often played as a dominant 7 ({{Bb}}7), creating the **back-door cadence**: **iv7 – ♭VII7 – I** = {{F}}m7 – {{Bb}}7 – {{C}}maj7. The {{Bb}}7 is the "back-door dominant" — it resolves to I by whole-step down instead of the usual V7→I fifth motion.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'F' },
      widgets: ['fretboard', 'staff'],
      caption: 'The back-door cadence: {{F}}m7 → {{Bb}}7 → {{C}}maj7. Hit “Play progression” to hear this classic jazz ending.',
      play: {
        kind: 'progression',
        chords: ['Fm7', 'Bb7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why it works',
    },
    {
      kind: 'list',
      items: [
        'The parallel minor shares the **same tonic note**, so borrowed chords feel related, not foreign.',
        'They momentarily **darken** the major key — adding a touch of sadness or drama — without actually modulating.',
        'The borrowed notes (like {{Ab}} in C major) create **chromatic half-step resolutions** into chord tones, which is why they sound so satisfying.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Try it:** take any major-key song you know and swap the IV for a iv ({{F}} → {{F}}m in C) right before the final I. That one chord change is the difference between "happy ending" and "bittersweet ending." It is the single most effective reharmonization trick in pop music.',
    },
  ],
}
