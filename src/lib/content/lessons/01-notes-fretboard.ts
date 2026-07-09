/**
 * Lesson 1 — Notes & the Fretboard
 * Source: RESEARCH.md §1
 */
import type { Lesson } from '$lib/content/schema'

export const notesFretboard: Lesson = {
  id: 'notes-fretboard',
  slug: 'notes-and-the-fretboard',
  title: 'Notes & the Fretboard',
  summary: 'The 12 pitch classes, standard tuning, and how to find any note anywhere on the neck.',
  minutes: 8,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You already play the guitar. This lesson gives you the map underneath everything you play — the **12 notes** and where they live on the fretboard. Once you can name the note under any finger, every chord, scale, and interval on this site becomes something you can see, not just memorise.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The 12 pitch classes',
    },
    {
      kind: 'text',
      markdown:
        'Western music uses **12 pitch classes** per octave. Using sharps (♯) and flats (♭) they are:',
    },
    {
      kind: 'text',
      markdown:
        '{{C}}  {{C#}}/{{Db}}  {{D}}  {{D#}}/{{Eb}}  {{E}}  {{F}}  {{F#}}/{{Gb}}  {{G}}  {{G#}}/{{Ab}}  {{A}}  {{A#}}/{{Bb}}  {{B}} → (back to {{C}})',
    },
    {
      kind: 'list',
      items: [
        '**Natural notes** — {{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}} (the 7 "white-key" notes).',
        '**Accidentals** — the 5 notes between them, each with two names ({{C#}} = {{Db}}). These double names are called *enharmonic equivalents*.',
        '**The octave** — after 12 semitones you return to the same letter name, one octave higher. The octave doubles the frequency (a 2:1 ratio).',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A **semitone** (half step) is the smallest unit here — the distance of **one fret**. Two frets = one **whole tone** (whole step). Everything in harmony is measured in semitones.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Standard tuning & the "kink"',
    },
    {
      kind: 'text',
      markdown:
        'Your guitar is tuned **{{E}}–{{A}}–{{D}}–{{G}}–{{B}}–{{E}}** (low to high). The interval between adjacent strings is a **perfect 4th** — *except* between the {{G}} and {{B}} strings, which is a **major 3rd**. This "kink" is the single most important fact shaping every chord shape you know. It is why a {{G}}-barre chord shape slides unchanged but the high strings need a one-fret shift.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      caption:
        'The C major scale across all 12 frets. Notice how the same note repeats 12 frets up the same string.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Finding any note',
    },
    {
      kind: 'text',
      markdown:
        'You do not need to memorise all 6 strings × 12 frets at once. Use this strategy:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Learn the notes on **strings 6 and 5** first (low {{E}} and {{A}}) — they are the roots of most chord shapes.',
        'Learn the **octave shapes**: a note on string 6 appears **2 frets higher** on string 4, and a note on string 5 appears **2 frets higher** on string 3.',
        'Use those shapes to reach any note on strings 4, 3, and 2 from what you already know on 6 and 5.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The notes at **fret 12** are exactly the open-string names ({{E}} {{A}} {{D}} {{G}} {{B}} {{E}}), one octave up. The fret markers (dots at 3, 5, 7, 9, 12) are your landmarks — use them to jump by 3rds, 4ths, and 5ths without counting.',
    },
    {
      kind: 'text',
      markdown:
        '**Try it:** click any fret below to hear the note and see every other occurrence of that pitch class light up. Find a {{C}}, then find the next {{C}} using an octave shape.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      caption: 'Free-exploration mode: click frets to build your own set of highlighted notes.',
    },
  ],
}
