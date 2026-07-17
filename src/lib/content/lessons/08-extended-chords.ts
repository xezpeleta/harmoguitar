/**
 * Lesson 8 — Extended & Altered Chords
 * Source: RESEARCH.md §7
 */
import type { Lesson } from '$lib/content/schema'

export const extendedChords: Lesson = {
  id: 'extended-chords',
  slug: 'extended-and-altered-chords',
  title: 'Extended & Altered Chords (9, 11, 13)',
  summary: 'Stacking thirds past the 7th — colour tones and the altered dominants of jazz.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Once you have a 7th chord, you can keep stacking thirds to get **extensions**: the 9th, 11th, and 13th. These add colour and richness, especially in jazz. This lesson is a *light* introduction — the deep jazz voicings (shell + extension, Drop 2 / Drop 3) are covered in the **Jazz Comping Voicings** lesson.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Extensions = scale degrees an octave up',
    },
    {
      kind: 'list',
      items: [
        '**9th** = the 2nd, an octave above the 7th',
        '**11th** = the 4th, an octave above the 9th',
        '**13th** = the 6th, an octave above the 11th',
      ],
    },
    {
      kind: 'text',
      markdown:
        'A theoretical 13th chord contains all 7 notes of the scale. In practice, guitarists **omit notes** (usually the 5th, sometimes the root) to make them playable. The essential notes are always the **3rd and 7th** — they define the chord\'s quality.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Common extended chords',
    },
    {
      kind: 'table',
      headers: ['Symbol', 'Meaning', 'Notes (C root)'],
      rows: [
        ['Cmaj9', 'maj7 + 9', '{{C}} {{E}} {{G}} {{B}} {{D}}'],
        ['C9', 'dom7 + 9', '{{C}} {{E}} {{G}} {{Bb}} {{D}}'],
        ['Cm9', 'm7 + 9', '{{C}} {{Eb}} {{G}} {{Bb}} {{D}}'],
        ['Cmaj13', 'maj7 + (9) + 13', '{{C}} {{E}} {{B}} {{D}} {{A}}'],
        ['C13', 'dom7 + (9) + (11) + 13', '{{C}} {{E}} {{Bb}} {{D}} {{A}}'],
        ['Cm11', 'm7 + 11', '{{C}} {{Eb}} {{G}} {{Bb}} {{D}} {{F}}'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj9', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj9 — a Cmaj7 with a 9th ({{D}}) added for colour.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm11', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dm11 — the classic iim11 sound. Try it before resolving to G7 → Cmaj7.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Altered dominant chords',
    },
    {
      kind: 'text',
      markdown:
        'Dominant 7 chords can have **altered** extensions — notes not in the parent major scale — to increase tension before resolution:',
    },
    {
      kind: 'table',
      headers: ['Alteration', 'Degree', 'Effect'],
      rows: [
        ['♭9', '♭9', 'tense, dark'],
        ['♯9', '♯9', 'bluesy ("Hendrix chord": 7♯9)'],
        ['♯11', '♯4 / ♯11', 'Lydian dominant, whole-tone-ish'],
        ['♭13', '♭13 / ♭6', 'dark, resolves to the 3rd of the tonic'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: '7b9', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7♭9 — extra tension before resolving to C. The ♭9 ({{Ab}}) wants to fall to {{G}} or rise to {{B}}.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A chord marked **"alt"** or **"7alt"** means "play altered extensions" (typically ♭9 and/or ♯9, ♭5/♯5, ♭13). The default scale is the **altered scale** — a v1.1 topic.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "shell + extension" method',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Play a **shell voicing** — root, 3rd, 7th (the essential notes).',
        'Add **one** extension on top for colour.',
        'Natural 9, 11, 13 are "inside"; ♭9, ♯9, ♯11, ♭13 are "altered."',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'Not every extension works on every chord. A natural 11 on a major 7 **clashes** with the 3rd — use ♯11 instead (that is the Lydian sound). When in doubt: if it sounds good, it is good — experiment.',
    },
  ],
}
