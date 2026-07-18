/**
 * Lesson 4 — Minor Scales
 * Source: RESEARCH.md §3 (minor scales)
 */
import type { Lesson } from '$lib/content/schema'

export const minorScales: Lesson = {
  id: 'minor-scales',
  slug: 'minor-scales',
  title: 'Minor Scales: Natural, Harmonic, Melodic',
  summary: 'Three flavours of minor — why they exist and what each one is for.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The major scale has one form. The minor scale has **three**, each serving a different purpose. Understanding why all three exist is the key to understanding minor-key harmony and the blues/jazz sounds built on it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: '1. Natural minor (Aeolian)',
    },
    {
      kind: 'text',
      markdown:
        'Pattern: **W - H - W - W - H - W - W**. Relative to the major scale, the formula is **1 2 ♭3 4 5 ♭6 ♭7** — it lowers the 3rd, 6th, and 7th. A natural minor shares the **same notes** as its relative major: A natural minor ({{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G}}) uses exactly the notes of C major, just starting on A.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'natural-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A natural minor — same notes as C major, but {{A}} is "home."',
    },

    {
      kind: 'heading',
      level: 2,
      text: '2. Harmonic minor',
    },
    {
      kind: 'text',
      markdown:
        'Natural minor with a **raised 7th**. Formula: **1 2 ♭3 4 5 ♭6 7** ({{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G#}}). Why? In natural minor the V chord is minor (Em in A minor), which lacks the strong pull back to the tonic. Raising the 7th creates a **leading tone** ({{G#}} → {{A}}) and turns the V into a major or dominant chord (E7 → Am) that resolves forcefully.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'harmonic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A harmonic minor — notice the {{G#}} and the exotic augmented-2nd gap between {{F}} and {{G#}}.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'That gap between ♭6 and 7 ({{F}} to {{G#}}, three semitones) is an **augmented 2nd**. It gives harmonic minor its exotic, Middle-Eastern flavour — and why it is the source of the Phrygian dominant scale used in flamenco.',
    },

    {
      kind: 'heading',
      level: 2,
      text: '3. Melodic minor (jazz)',
    },
    {
      kind: 'text',
      markdown:
        'Natural minor with **both the 6th and 7th raised**: **1 2 ♭3 4 5 6 7** ({{A}} {{B}} {{C}} {{D}} {{E}} {{F#}} {{G#}}). In classical music this form is used ascending and reverted to natural minor descending. **In jazz, the raised form is used both ways** — and it is the parent of several crucial jazz modes (Lydian dominant, altered, etc.).',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'melodic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A melodic minor (jazz form) — a minor 3rd, but a major 6th and major 7th.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'When to use which',
    },
    {
      kind: 'list',
      items: [
        '**Natural minor** — the default minor sound; the relative of a major key.',
        '**Harmonic minor** — when you want a strong V → i resolution (a dominant leading tone).',
        '**Melodic minor** — the jazz tool; the source of altered and Lydian-dominant sounds (v1.1+).',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Switch the home explorer between the three minor scales with root {{A}}. Listen to how the raised 7th ({{G#}}) in harmonic minor suddenly *wants* to resolve up to {{A}}.',
    },
  ],
}
