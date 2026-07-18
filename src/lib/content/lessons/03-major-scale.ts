/**
 * Lesson 3 — The Major Scale
 * Source: RESEARCH.md §3
 */
import type { Lesson } from '$lib/content/schema'

export const majorScale: Lesson = {
  id: 'major-scale',
  slug: 'the-major-scale',
  title: 'The Major Scale',
  summary: 'The W-W-H-W-W-W-H pattern — the reference that every interval, chord, and mode is measured against.',
  minutes: 13,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The major scale is the **reference for everything** in Western harmony. Intervals are named by comparing to it, chord formulas are written against it, and the modes are derived from it. Learn the pattern once and you can build it from any root.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The pattern',
    },
    {
      kind: 'text',
      markdown:
        'The major scale is a fixed sequence of **whole (W) and half (H) steps**:',
    },
    {
      kind: 'text',
      markdown: '`W - W - H - W - W - W - H`',
    },
    {
      kind: 'text',
      markdown:
        'In semitones that is **2 - 2 - 1 - 2 - 2 - 2 - 1**. The half-steps fall between the 3rd & 4th and the 7th & 8th degrees — those two "kinks" are what give the major scale its character.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'You already know what this scale sounds like: it is the **"do re mi"** scale — the melody Rodgers & Hammerstein wrote in *The Sound of Music*. Sing "do, a deer, a female deer" in your head and you have just heard a major scale ascending. That familiarity is your greatest asset: if a scale you build doesn\u2019t sound like "do re mi," something went wrong.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A subtle but important point: **whole and half steps describe movements, not notes.** {{F}} is not "a half-step note" — {{E}} to {{F}} is a half *step* (a movement of one semitone), while {{F}} to {{G}} is a whole step. The same note participates in different-sized steps depending on where it sits relative to its neighbours.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'C major & G major',
    },
    {
      kind: 'list',
      items: [
        '**C major** (no sharps/flats): {{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}} {{C}}',
        '**G major** (1 sharp, F♯): {{G}} {{A}} {{B}} {{C}} {{D}} {{E}} {{F#}} {{G}}',
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'C major across the fretboard, on the staff, and on the interval wheel — all in sync.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Change the root on the home explorer to **G** and watch {{F#}} appear on the fretboard and staff. The pattern never changes — only the starting note does.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Building any major scale',
    },
    {
      kind: 'text',
      markdown:
        'C major is easy because no notes need altering — the white keys already fit the pattern. But what about a key like {{D}} major? Here is the method every theory teacher recommends: **write the seven letters of the musical alphabet starting from your root, then check each step against W-W-H-W-W-W-H, fixing notes as you go.** The golden rule is that **every scale degree gets its own letter** — you never reuse a letter and never skip one. This is why {{D}} major is spelled D-E-{{F#}}-G-A-B-{{C#}}, not D-E-{{Gb}}-G-A-B-{{Db}}: the third degree must be an "F" of some kind, and the seventh must be a "C" of some kind.',
    },
    {
      kind: 'table',
      headers: ['Step', 'Need', 'Have', 'Fix'],
      rows: [
        ['{{D}} → {{E}}', 'W (2 st)', '2 st ✓', '—'],
        ['{{E}} → {{F}}', 'W (2 st)', '1 st ✗', 'sharpen the {{F}} → {{F#}}'],
        ['{{F#}} → {{G}}', 'H (1 st)', '1 st ✓', '—'],
        ['{{G}} → {{A}}', 'W (2 st)', '2 st ✓', '—'],
        ['{{A}} → {{B}}', 'W (2 st)', '2 st ✓', '—'],
        ['{{B}} → {{C}}', 'W (2 st)', '1 st ✗', 'sharpen the {{C}} → {{C#}}'],
        ['{{C#}} → {{D}}', 'H (1 st)', '1 st ✓', '—'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Two fixes, two sharps — and you have built {{D}} major from scratch: **{{D}} {{E}} {{F#}} {{G}} {{A}} {{B}} {{C#}} {{D}}**. The number of sharps or flats a key needs is no accident: it is exactly the number of letters the "natural" alphabet gets wrong. This is why the circle of fifths adds one sharp at a time — each new key needs exactly one more fix.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why does it sound “happy”?',
    },
    {
      kind: 'text',
      markdown:
        'People describe the major scale as "bright" or "happy" and the minor scale as "dark" or "sad." That is not just cultural conditioning — it maps onto a real acoustic property called **brightness**: the *relative size of the intervals* within a scale or chord. Wider intervals sound brighter; narrower intervals sound darker. The major scale\u2019s defining colour comes from its **major 3rd** (4 semitones from the root to the 3rd degree), which is wider than the minor 3rd (3 semitones) that defines the minor scale. Swap that one interval and the whole scale flips from bright to dark.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Brightness is a spectrum, not a switch. Too bright (an augmented chord, with its widened 5th) sounds dissonant and sour; too dark (a diminished chord, with its narrowed 5th) sounds tense and unstable. The major scale sits at a balanced, consonant point — wide enough to sound open and uplifting, narrow enough in its half-steps to create the pull that makes the 7th degree *want* to resolve up to the octave. Those two half-steps (between 3-4 and 7-8) are the engine of that forward motion.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Scale degrees',
    },
    {
      kind: 'text',
      markdown:
        'We number the notes of the scale **1–7**, then 8 = the octave (= 1 again). These numbers are the **scale degrees**, and they are the basis of chord formulas (a major triad is "1 3 5") and Roman numerals (the V chord is built on degree 5).',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Why does numbering stop at 7? Western scales are **heptatonic** (7 notes). The 8th note is the octave — the same as the 1st, just higher. This is why intervals go up to a 7th, and why 9/11/13 are just 2/4/6 an octave up.',
    },
    {
      kind: 'text',
      markdown:
        'The major scale is also called the **Ionian mode** (its first mode). When you meet the seven modes later, Ionian is simply "the major scale starting on degree 1."',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to actually practise this.** Find the root on the 6th string (e.g. {{C}} at the 8th fret) and play the scale straight up using one finger per fret, keeping your hand in a single position — don\u2019t scoot along the neck. Once the shape is under your fingers, practise it **in thirds**: play a note, skip the next, play the next, then start again from the note you skipped (1-3, 2-4, 3-5…). Those thirds are the skeleton of every chord in the key — you are secretly practising arpeggios. Move the whole shape up or down a fret and you have transposed to a new key, because the shape is fully movable.',
    },
  ],
  sources: [
    {
      author: 'Adam Neely',
      title: 'Why is major “happy?”',
      url: 'https://www.youtube.com/watch?v=9rEqrPwVITY',
      note: 'The concept of brightness — that major sounds “happy” because its intervals are wider than minor\u2019s, placing it higher on a brightness spectrum. Also covers how the modes arrange from brightest (Lydian) to darkest (Locrian) and how the circle of fifths is a brightness map.',
    },
    {
      author: 'SPJ Guitar Lessons',
      title: 'Music Theory for GUITAR #1: Major Scales',
      url: 'https://www.youtube.com/watch?v=PZr4frJtfd4',
      note: 'The “write the alphabet, then fix” construction method: write the seven letters from your root, check each step against W-W-H-W-W-W-H, and sharpen or flatten the second note wherever the step is wrong — never reusing or skipping a letter. The rule that every scale degree gets its own letter.',
    },
    {
      author: 'Marty Music',
      title: 'The Essential Guide to Mastering the Major Scale on Guitar',
      url: 'https://www.youtube.com/watch?v=BmDiDy_Dzn8',
      note: 'The movable major-scale shape (root on the 6th string, one finger per fret), the “do re mi” ear reference from The Sound of Music, and practising the scale in thirds to uncover chord tones and arpeggios.',
    },
    {
      author: 'Soundfly',
      title: 'Cracking the Code of Major Scales: Whole & Half Steps',
      url: 'https://www.youtube.com/watch?v=6BP6KNmihV0',
      note: 'The W-W-H-W-W-W-H “code” as a Morse-like pattern of movements between notes, and the demonstration that the same code produces every major scale regardless of starting note.',
    },
  ],
}
