/**
 * Lesson 10 — Functional Harmony
 * Source: RESEARCH.md §9
 */
import type { Lesson } from '$lib/content/schema'

export const functionalHarmony: Lesson = {
  id: 'functional-harmony',
  slug: 'functional-harmony',
  title: 'Functional Harmony: Tonic, Subdominant, Dominant',
  summary: 'Why chords behave the way they do — the three functions behind tonal music.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Functional harmony** explains *why* chords behave the way they do — which feel stable, which create motion, and which demand resolution. Most tonal music relies on three harmonic **functions**.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The three functions',
    },
    {
      kind: 'table',
      headers: ['Function', 'Role', 'Chords (in C)', 'Feeling'],
      rows: [
        ['Tonic (T)', 'Home, rest, resolution', 'I (C), vi (Am), iii (Em)', 'stable, settled'],
        ['Subdominant (S)', 'Departure, lift, motion', 'IV (F), ii (Dm)', 'moving away'],
        ['Dominant (D)', 'Tension, wants to resolve', 'V (G), vii° (B°)', 'tense, pulling home'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The harmonic narrative',
    },
    {
      kind: 'text',
      markdown:
        'A typical progression tells a story: **leave home (T → S), build tension (S → D), return home (D → T)**. This tension-and-release cycle is the emotional engine of tonal music.',
    },
    {
      kind: 'list',
      items: [
        '**Tonic** chords feel at rest. The I is the strongest; vi and iii are "tonic substitutes" — stable but coloured.',
        '**Subdominant** chords move away from home. IV lifts; ii (the pre-dominant) sets up the dominant.',
        '**Dominant** chords contain the tritone (3rd + ♭7th of V7) that pulls toward the tonic. V7 → I is the strongest resolution in tonal music.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the resolution',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'G7 — the V7 of C. The tritone {{B}}–{{F}} (3rd & ♭7) wants to resolve: {{B}}→{{C}}, {{F}}→{{E}}.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj7 — the resolution. Play G7 first, then this, to feel the V7 → I release.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The families (quick reference, C major)',
    },
    {
      kind: 'list',
      items: [
        '**Tonic:** I, vi (and iii)',
        '**Subdominant / Pre-dominant:** IV, ii (and vi)',
        '**Dominant:** V, vii° (and secondary dominants)',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Minor keys: borrowing a dominant',
    },
    {
      kind: 'text',
      markdown:
        'In natural minor, the v chord is minor ({{E}}m in {{A}}m) and lacks pull. Composers **borrow from harmonic minor** to get a major V (E7 in Am). The raised 7th ({{G#}}) creates a leading tone that resolves up to the tonic {{A}}.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Classic example: "House of the Rising Sun" — Am C D F Am C **E** Am. That E major (V of A minor) is borrowed from harmonic minor. Without it, the progression would feel weak; with it, it drives home.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'This "borrowing" is your first taste of **modal mixture** — pulling a chord from a parallel scale to add colour. It is the gateway to the richer jazz sounds in later lessons.',
    },
  ],
}
