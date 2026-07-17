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
  minutes: 10,
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
      kind: 'piano',
      octaves: 1,
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      caption:
        'The same 12 pitch classes on a keyboard. The 7 white keys are the natural notes ({{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}}); the 5 black keys are the accidentals. After {{B}} the cycle repeats from {{C}} again, one octave higher. Click any key to hear it, or press **Play notes** to hear all 12 in order — each key rings as it sounds.',
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
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      widgets: ['piano', 'fretboard'],
      caption:
        'Now explore: click a piano key **or** a fret — every occurrence of that note lights up on both instruments at once. The keyboard and the fretboard are two maps of the same 12 notes.',
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
      selection: { clear: true, root: 'E', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 0 },
        { string: 5, fret: 0 },
        { string: 4, fret: 0 },
        { string: 3, fret: 0 },
        { string: 2, fret: 0 },
        { string: 1, fret: 0 },
      ],
      play: { kind: 'open-strings', order: 'low-to-high', stagger: 0.55 },
      caption:
        'The six open strings — {{E}} {{A}} {{D}} {{G}} {{B}} {{E}}, low → high. Press **Play strings** to hear them struck 6 → 1; each string lights up as it sounds. The big leap you hear between the {{G}} and {{B}} strings is the major-3rd "kink".',
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
      kind: 'widget',
      selection: { showAllNotes: true, fretCount: 12 },
      strings: [6, 5],
      widgets: ['fretboard'],
      caption:
        'Your roadmap: every note on strings 6 and 5, labelled. Learn these two rows first — every other string is reached from them via octave shapes.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      strings: [6, 5, 4, 3],
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 8 },
        { string: 4, fret: 10 },
        { string: 5, fret: 3 },
        { string: 3, fret: 5 },
      ],
      caption:
        'Octave shapes in action: all four dots are {{C}}. A note on string 6 (fret 8) reappears **2 frets higher** on string 4 (fret 10); string 5 (fret 3) → string 3 (fret 5). Same shape, both pairs. Press **Play** to hear them ring in turn — each dot lights up as it sounds.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The notes at **fret 12** are exactly the open-string names ({{E}} {{A}} {{D}} {{G}} {{B}} {{E}}), one octave up. The fret markers (dots at 3, 5, 7, 9, 12) are your landmarks — use them to jump by 3rds, 4ths, and 5ths without counting.',
    },
    {
      kind: 'widget',
      selection: { clear: true, followRoot: true, root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      steppers: { root: true },
      caption:
        'Note-finder: use **+/−** to cycle the note name ({{C}} → {{C#}} → {{D}} → …) and watch every occurrence of that pitch class light up across the whole neck. Find a note, then spot its octave 12 frets up.',
    },
    {
      kind: 'text',
      markdown:
        '**Try it free:** click any fret below to hear the note and see every other occurrence of that pitch class light up. Use **◀/▶** to slide the window up the neck and explore higher positions.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      steppers: { position: true },
      caption: 'Free-exploration mode: click frets to build your own set of highlighted notes.',
    },
  ],
}
