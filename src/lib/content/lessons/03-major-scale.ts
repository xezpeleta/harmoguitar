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
  minutes: 9,
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
  ],
}
