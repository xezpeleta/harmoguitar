/**
 * Lesson 13 — Cadences & Turnarounds
 * Source: RESEARCH.md §12
 */
import type { Lesson } from '$lib/content/schema'

export const cadences: Lesson = {
  id: 'cadences',
  slug: 'cadences-and-turnarounds',
  title: 'Cadences & Turnarounds',
  summary: 'The musical punctuation that ends phrases — and the loops that bring you back to the top.',
  minutes: 8,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **cadence** is a chord progression that ends a phrase — the musical equivalent of punctuation. A **turnaround** is a short progression at the end of a form that loops back to the top. Both are essential vocabulary.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The four cadences',
    },
    {
      kind: 'table',
      headers: ['Cadence', 'Progression', 'Effect'],
      rows: [
        ['Authentic', 'V–I (G7–C)', '"period" — full resolution, strongest'],
        ['Plagal', 'IV–I (F–C)', '"amen" — softer, gospel'],
        ['Half', 'any–V (C–G)', 'comma — leaves you hanging'],
        ['Deceptive', 'V–vi (G7–Am)', 'plot twist — resolves to a substitute'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the cadences',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 — the V of C. Follow it with Cmaj7 (below) for an authentic cadence.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj7 — the I. G7 → Cmaj7 is the strongest resolution in tonal music.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Turnarounds',
    },
    {
      kind: 'text',
      markdown:
        'A **turnaround** is a 1- or 2-bar progression at the end of a form that loops back to the top. Common jazz turnarounds:',
    },
    {
      kind: 'list',
      items: [
        '**I–vi–ii–V** (C–Am–Dm–G) — the classic',
        '**iii–vi–ii–V** (Em–A7–Dm–G) — often with secondary dominants',
        '**I–VI7–ii–V** (C–A7–Dm–G)',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Tritone-sub versions of turnarounds (I–♭III7–♭VI7–♭II7, a chromatic descending bass) are a v1.1 jazz topic. For v1, the I–vi–ii–V is the turnaround to master.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why cadences matter',
    },
    {
      kind: 'text',
      markdown:
        'Cadences are how you **shape a phrase**. An authentic cadence says "this section is over." A half cadence says "wait — more is coming." A deceptive cadence surprises. The same chords, in different orders, tell entirely different stories. Learning to *hear* the cadence is learning to hear the form of a song.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Play G7 → C (authentic), then G7 → Am (deceptive). The notes are nearly identical, but the *feeling* is completely different. That is the power of cadence — it is about expectation and resolution, not just the chords themselves.',
    },
  ],
}
