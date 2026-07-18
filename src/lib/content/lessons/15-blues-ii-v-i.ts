/**
 * Lesson 14 — The Blues & the ii–V–I
 * Source: RESEARCH.md §13–§14
 */
import type { Lesson } from '$lib/content/schema'

export const bluesAndIIVI: Lesson = {
  id: 'blues-ii-v-i',
  slug: 'the-blues-and-ii-v-i',
  title: 'The Blues & the ii–V–I',
  summary: 'The 12-bar blues form and the most important progression in jazz — your gateway to v1.1.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Two forms close out v1: the **12-bar blues** (the foundation of blues, rock, and jazz) and the **ii–V–I** (the engine of jazz harmony). Master these and you are ready for the deep jazz sounds in v1.1.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The 12-bar blues',
    },
    {
      kind: 'text',
      markdown:
        'A 12-bar form built on I, IV, V — in jazz/blues all played as dominant 7 chords. In **F**:',
    },
    {
      kind: 'table',
      headers: ['Bars', 'Chords', 'Function'],
      rows: [
        ['1–4', '{{F}}7 | {{F}}7 | {{F}}7 | {{F}}7', '4 bars tonic'],
        ['5–8', '{{Bb}}7 | {{Bb}}7 | {{F}}7 | {{F}}7', 'subdominant and back'],
        ['9–12', '{{C}}7 | {{Bb}}7 | {{F}}7 | {{C}}7', 'turnaround'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'The final V→I ({{C}}7→{{F}}7) is the turnaround that loops to the next chorus.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'F' },
      widgets: ['fretboard', 'staff'],
      caption: '{{F}}7 — the I of a blues in F. In jazz, the tonic of a blues is a dominant 7, not a major triad.',
      play: {
        kind: 'progression',
        chords: ['F7', 'F7', 'F7', 'F7', 'Bb7', 'Bb7', 'F7', 'F7', 'C7', 'Bb7', 'F7', 'C7'],
        tempo: 140,
        beatsPerChord: 1,
      },
    },

    {
      kind: 'heading',
      level: 3,
      text: 'Scales over the blues',
    },
    {
      kind: 'list',
      items: [
        'Over the **tonic (I7) and IV7**: **Mixolydian** (the major scale a 5th up, with a ♭7).',
        'Over the **V7**: Mixolydian, or the blues/minor pentatonic for a bluesy feel.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Jazz blues adds **secondary dominants** and **ii–V** movement to the basic form (e.g., a iim7–V7 leading to the IV in bar 4). These are covered in the **Secondary Dominants** lesson — for now, nail the basic 12-bar form in a few keys.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The ii–V–I',
    },
    {
      kind: 'text',
      markdown:
        'The **ii–V–I** is the most important progression in jazz — it is the engine of countless standards (Autumn Leaves, All The Things You Are, Tune Up…). In **C major**: **{{D}}m7 – {{G}}7 – {{C}}maj7**.',
    },

    {
      kind: 'heading',
      level: 3,
      text: 'Why it works',
    },
    {
      kind: 'list',
      items: [
        '**ii ({{D}}m7)** = pre-dominant, starts moving away from tonic.',
        '**V7 ({{G}}7)** = dominant, builds maximum tension (tritone {{B}}–{{F}}).',
        '**I ({{C}}maj7)** = resolution, releases the tension.',
        'The roots move in **4ths** ({{D}}→{{G}}→{{C}}) — the strongest, most "circular" root motion.',
      ],
    },

    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: '{{D}}m7 — the ii. The pre-dominant that starts the journey away from home.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: '{{G}}7 — the V. Maximum tension; the tritone {{B}}–{{F}} wants to resolve.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: '{{C}}maj7 — the I. Hit “Play progression” to hear the full ii–V–I: {{D}}m7 → {{G}}7 → {{C}}maj7.',
      play: {
        kind: 'progression',
        chords: ['Dm7', 'G7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 3,
      text: 'The 3rd-to-7th voice leading',
    },
    {
      kind: 'text',
      markdown:
        'Here is the magic of the ii–V–I: the **3rd of one chord becomes the 7th of the next**, and vice versa. The 3rd of Dm7 ({{F}}) becomes the 7th of G7 ({{F}}). The 3rd of G7 ({{B}}) becomes the 7th of Cmaj7 ({{B}}). Those two notes — {{F}} and {{B}} — just **swap places**. The tritone flips. This is the smoothest possible connection and the basis of all jazz voice leading.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Guide tones:** improvise using only the 3rds and 7ths of each chord. They define the harmony *and* connect automatically — you barely have to move your fingers. This is the single most useful soloing concept in jazz.',
    },

    {
      kind: 'heading',
      level: 3,
      text: 'How to solo over it',
    },
    {
      kind: 'list',
      items: [
        '**Arpeggios + parent scale** — play each chord\'s arpeggio, connect with C major scale notes.',
        '**Target the 3rd of the next chord** — especially a note that *wasn\'t* in the previous chord.',
        '**Pentatonic shortcut** — D minor pentatonic ({{D}} {{F}} {{G}} {{A}} {{C}}) works over the whole ii–V–I in C.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Where to go next',
    },
    {
      kind: 'text',
      markdown:
        'You have completed the foundations: notes → intervals → scales → modes → chords → diatonic harmony → functional harmony → the circle → progressions → cadences → the blues & ii–V–I. You now have the theory grounding behind everything you play.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The next lessons take you into **deep jazz harmony**: secondary dominants, tritone substitution, voice leading & guide tones, passing chords & inversions, jazz comping voicings, and pentatonics & blue notes. The full knowledge base lives in `RESEARCH.md` §15–§23 and §28 — and these lessons turn it into playable widgets.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'For now, **use the Builder** to explore any chord or scale: pick a root and type, see the formula, fretboard, staff, and intervals, and play it. The best way to internalise this is to *play* it — every day, in a different key.',
    },
  ],
}
