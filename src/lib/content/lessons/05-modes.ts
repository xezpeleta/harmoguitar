/**
 * Lesson 5 — The Seven Modes
 * Source: RESEARCH.md §4
 */
import type { Lesson } from '$lib/content/schema'

export const modes: Lesson = {
  id: 'modes',
  slug: 'modes-of-the-major-scale',
  title: 'The Seven Modes',
  summary: 'The same 7 notes, seven different homes. How modes work and what each one sounds like.',
  minutes: 12,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **mode** is a scale played from a note other than its root — you take the *same 7 notes* but treat a different degree as "home." Each mode has a **characteristic note** that gives it its flavour. There are two ways to think about modes, and you need both.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The seven modes',
    },
    {
      kind: 'table',
      headers: ['Degree', 'Mode', 'Formula (vs major)', 'Characteristic note', 'Sound'],
      rows: [
        ['I', 'Ionian', '1 2 3 4 5 6 7', '—', 'major scale; bright'],
        ['II', 'Dorian', '1 2 ♭3 4 5 6 ♭7', 'natural 6', 'minor but hopeful'],
        ['III', 'Phrygian', '1 ♭2 ♭3 4 5 ♭6 ♭7', '♭2', 'dark, Spanish'],
        ['IV', 'Lydian', '1 2 3 ♯4 5 6 7', '♯4', 'dreamy, floating'],
        ['V', 'Mixolydian', '1 2 3 4 5 6 ♭7', '♭7', 'bluesy, dominant'],
        ['VI', 'Aeolian', '1 2 ♭3 4 5 ♭6 ♭7', '♭6', 'natural minor; sad'],
        ['VII', 'Locrian', '1 ♭2 ♭3 4 ♭5 ♭6 ♭7', '♭5', 'unstable, unresolved'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Two ways to see them',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Parent-scale view:** D Dorian = the notes of C major, starting on D. Easiest to *construct* — you already know the major scale.',
        '**Parallel / formula view:** D Dorian = D major with ♭3 and ♭7. Easiest to *play over a single chord* — you compare to the major scale of the same root.',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'The parent-scale view is why beginners get confused: "D Dorian has the same notes as C major, so what makes it Dorian?" The answer is the **tonal centre** — which note feels like "home." Play a D in the bass and Dorian emerges; play a C and Ionian returns. Context is everything.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Dorian: the most useful mode',
    },
    {
      kind: 'text',
      markdown:
        'Dorian is a minor scale with a **natural 6th** (instead of the ♭6 of natural minor). That one note lifts it from sad to bittersweet/hopeful. It is the default choice over any minor vamp — "if in doubt on a minor chord, play Dorian."',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'dorian', root: 'D' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'D Dorian. Compare the natural 6th (B) to the ♭6 you would expect in D natural minor.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Mixolydian: the dominant sound',
    },
    {
      kind: 'text',
      markdown:
        'Mixolydian is a major scale with a **♭7**. It is the scale of choice over any dominant 7 chord — the V of a key, or the tonic of a blues. It is the sound of classic rock and blues-rock rhythm.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'mixolydian', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G Mixolydian — a major scale with a ♭7 (F natural). The sound of a G7 vamp.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Practical chord-scale matching',
    },
    {
      kind: 'list',
      items: [
        '**Dorian** → over a iim7 chord, or any minor vamp (So What, Footprints).',
        '**Mixolydian** → over any dominant 7 chord (the V, or a blues tonic).',
        '**Lydian** → over a Imaj7 that is the IV of the key, or any maj7 with a ♯11.',
        '**Aeolian** → over a minor tonic chord (natural minor).',
        '**Locrian** → over a m7♭5 (half-diminished); rarely a tonal centre.',
      ],
    },
  ],
}
