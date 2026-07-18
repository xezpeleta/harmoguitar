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
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Modal mixture** (or "borrowed chords") means taking chords from the **parallel minor** and using them in a major key. The tonal center stays the same — you just "darken" it momentarily. The most famous example: the **minor iv** chord ({{F}}m in C major) that ends countless Beatles and pop ballads with a bittersweet sigh.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Parallel minor, not relative minor.** The **relative minor** of {{C}} major is {{A}} minor — same notes, different starting note. The **parallel minor** of {{C}} major is {{C}} minor — same starting note, different notes (three flats). Borrowed chords come from the *parallel* minor: same tonic, different palette. That shared tonic is why they feel related, not foreign.',
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
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Interchange vs modulation.** If you borrow a chord from the parallel minor and then **return to the home key**, that is modal interchange — a momentary darkening. If you borrow a chord and **stay there**, you have modulated. The difference is whether you come back home. Modal interchange is a visit; modulation is a move.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The "video game" cadence.** The ♭VI – ♭VII – I progression ({{Ab}} – {{Bb}} – {{C}}) sounds like you just beat the game — heroic, triumphant, filmic. You hear it in the *Zelda* theme, in countless film scores, and in classical music. It works because all three chords are major, yet they come from the parallel minor — borrowing lets you string together major chords that would not otherwise coexist in a single key. The result is a cadence that replaces the V–I with something grander and more cinematic.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**You can borrow from any mode, not just natural minor.** The term *modal* interchange is literal: you can borrow from Dorian, Phrygian, Lydian — any mode that shares the same tonic. Natural minor (Aeolian) is the most common source, but Dorian gives you a raised 6th ({{A}} instead of {{Ab}} in {{C}}), and Lydian gives you a ♯4. Each mode lends a different colour. And you generally keep the **major V** from the home key for cadences — the minor v from the parallel minor is rarely used, because the major V\u2019s leading tone is what creates the pull to I.',
    },
  ],
  sources: [
    {
      author: 'Ian O\u2019Donnell',
      title: 'Borrowed Chords - Music Theory Lesson',
      url: 'https://www.youtube.com/watch?v=gIUHfqCyHIg',
      note: 'Borrowing from the parallel minor; the \u266dVI\u2013\u266dVII\u2013I \u201cvideo game\u201d cadence (Zelda, film scores); still use major V for cadences; melodies = major scale over major chords, minor scale over borrowed.',
    },
    {
      author: 'Michael Banfield',
      title: 'MODAL INTERCHANGE - Borrowed Chords and Parallel Modes',
      url: 'https://www.youtube.com/watch?v=14gBV0Ni-DY',
      note: 'Parallel mode = different scale, same root. You can borrow from any mode (Dorian, Phrygian, Lydian), not just natural minor. Interchange vs modulation: if you don\u2019t return to the home key, it\u2019s a modulation. Extend to 7ths for a jazzier sound.',
    },
    {
      author: 'Christopher Siu',
      title: 'Awesome Music Theory: Modal Mixture & Modal Interchange!',
      url: 'https://www.youtube.com/watch?v=VPfMU7nl6FU',
      note: 'Relative minor (same notes, different tonic) vs parallel minor (same tonic, different notes). The minor iv\u2192I as a \u201cminor plagal cadence\u201d adding sadness and regret. Most common borrowed chords: minor iv, \u266dVI, \u266dVII.',
    },
  ],
}
