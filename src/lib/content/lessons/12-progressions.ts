/**
 * Lesson 12 — Chord Progressions & Roman Numerals
 * Source: RESEARCH.md §11
 */
import type { Lesson } from '$lib/content/schema'

export const progressions: Lesson = {
  id: 'progressions',
  slug: 'progressions-and-roman-numerals',
  title: 'Chord Progressions & Roman Numerals',
  summary: 'The foundational progressions — and why describing them as numbers is the key to transposing.',
  minutes: 9,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **chord progression** is a sequence of chords. Describing them with **Roman numerals** reveals the underlying structure that works in any key. Once you know a progression as numbers, you can play it in every key by mapping the numerals to that key\'s scale degrees.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Foundational progressions (major key)',
    },
    {
      kind: 'table',
      headers: ['Progression', 'In C major', 'Character', 'Genre'],
      rows: [
        ['I–IV–V–I', 'C–F–G–C', 'classic, strong', 'rock, country, folk'],
        ['I–V–vi–IV', 'C–G–Am–F', 'emotional arc', 'pop ("4-chord song")'],
        ['I–vi–IV–V', 'C–Am–F–G', '50s doo-wop', 'pop, ballad'],
        ['ii–V–I', 'Dm–G–C', 'jazz cadence', 'jazz, soul'],
        ['I–vi–ii–V', 'C–Am–Dm–G', 'circle / turnaround', 'jazz, pop'],
        ['vi–IV–I–V', 'Am–F–C–G', 'minor-starting pop', 'modern pop'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why diatonic progressions "work"',
    },
    {
      kind: 'text',
      markdown:
        'All the chords in a diatonic progression share the **same scale notes**, so moving between them feels coherent. The ear has heard these relationships for centuries and expects them. Breaking them (using non-diatonic chords) creates surprise — which is powerful when intentional.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Transposing',
    },
    {
      kind: 'text',
      markdown:
        'Once you know a progression as numerals, you can play it in any key. This is why Roman numerals (and the Nashville Number System) are the lingua franca of working musicians:',
    },
    {
      kind: 'list',
      items: [
        '"I–IV–V in G" = G–C–D',
        '"ii–V–I in F" = Gm–C–F',
        '"I–vi–IV–V in D" = D–Bm–G–A',
      ],
    },
    {
      kind: 'widget',
      selection: { key: 'C', keyScaleType: 'major', chordType: 'major', root: 'C' },
      widgets: ['circle-of-fifths'],
      caption:
        'Use the circle to find the I–IV–V of any key. Click the diatonic chords below to explore each one — the sequence I–vi–IV–V is right there in the roman-numeral row.',
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The **I–V–vi–IV** progression (C–G–Am–F in C) is the famous "four-chord song" pattern — it has powered hundreds of pop hits because it has a built-in emotional arc: home → tension → minor colour → lift → (loop). Try it on the circle: click I, V, vi, IV in order.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **ii–V–I** (Dm–G–C) is the most important progression in jazz — it gets its own lesson next. For now, notice it is just three diatonic chords whose roots move in 4ths (D→G→C): the circle-of-fifths motion that makes everything sound smooth.',
    },
  ],
}
