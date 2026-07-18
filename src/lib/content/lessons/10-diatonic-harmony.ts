/**
 * Lesson 9 — Diatonic Harmony
 * Source: RESEARCH.md §8
 */
import type { Lesson } from '$lib/content/schema'

export const diatonicHarmony: Lesson = {
  id: 'diatonic-harmony',
  slug: 'diatonic-harmony',
  title: 'Diatonic Harmony: Chords Within a Key',
  summary: 'Stacking thirds on each scale degree — the magic maj-m-min-maj-maj-min-dim sequence.',
  minutes: 12,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Diatonic** means "within the key." Diatonic chords are built **only from the notes of one scale**. They naturally sound like they belong together because they share the same note pool. This is the heart of key-based harmony.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Building diatonic 7th chords from the major scale',
    },
    {
      kind: 'text',
      markdown:
        'Take each scale degree as a root and **stack thirds** (skip every other note). In **C major** ({{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}}), the seven diatonic 7th chords are:',
    },
    {
      kind: 'table',
      headers: ['Degree', 'Chord', 'Notes', 'Quality', 'Roman numeral'],
      rows: [
        ['I', 'Cmaj7', '{{C}} {{E}} {{G}} {{B}}', 'Major 7', '**I**'],
        ['II', 'Dm7', '{{D}} {{F}} {{A}} {{C}}', 'Minor 7', '**ii**'],
        ['III', 'Em7', '{{E}} {{G}} {{B}} {{D}}', 'Minor 7', '**iii**'],
        ['IV', 'Fmaj7', '{{F}} {{A}} {{C}} {{E}}', 'Major 7', '**IV**'],
        ['V', 'G7', '{{G}} {{B}} {{D}} {{F}}', 'Dominant 7', '**V**'],
        ['VI', 'Am7', '{{A}} {{C}} {{E}} {{G}}', 'Minor 7', '**vi**'],
        ['VII', 'Bm7♭5', '{{B}} {{D}} {{F}} {{A}}', 'Half-diminished', '**vii°**'],
      ],
    },
    {
      kind: 'widget',
      selection: { key: 'C', keyScaleType: 'major', scaleType: 'major', root: 'C' },
      widgets: ['circle-of-fifths'],
      caption:
        'Click any diatonic chord below the circle to explore it. The circle is set to C major; the 7 diatonic chords are shown as Roman numerals.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The magic sequence',
    },
    {
      kind: 'text',
      markdown:
        'In **every major key**, the 7 diatonic 7th chords always come out as:',
    },
    {
      kind: 'text',
      markdown: '**maj7 – m7 – m7 – maj7 – dom7 – m7 – m7♭5**',
    },
    {
      kind: 'text',
      markdown:
        'As triads: **major – minor – minor – major – major – minor – diminished**. This is not arbitrary — it falls out of the W-W-H-W-W-W-H pattern of the major scale. The varying sizes of the thirds between scale degrees produce different chord qualities automatically.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Click **G** on the circle of fifths above. The diatonic chords re-derive for G major: Gmaj7 – Am7 – Bm7 – Cmaj7 – D7 – Em7 – F♯m7♭5. Same sequence, different key. This is the power of the system — learn it once, use it in every key.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Roman numerals',
    },
    {
      kind: 'list',
      items: [
        '**Uppercase** (I, IV, V) = major',
        '**Lowercase** (ii, iii, vi) = minor',
        '**Lowercase + °** (vii°) = diminished',
        '**Lowercase + ø** (iiø) = half-diminished',
      ],
    },
    {
      kind: 'text',
      markdown:
        'Roman numerals let you describe a progression **in any key**: "I–IV–V–I" means the same relationship whether you are in C ({{C}}-{{F}}-{{G}}-{{C}}) or A ({{A}}-{{D}}-{{E}}-{{A}}). This is the key to transposing.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Minor keys & relative keys',
    },
    {
      kind: 'text',
      markdown:
        'From the natural minor scale (e.g., A minor: {{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G}}), the diatonic 7th chords are:',
    },
    {
      kind: 'text',
      markdown: 'i7 – iiø7 – ♭IIImaj7 – iv7 – vm7 – ♭VImaj7 – ♭VII7',
    },
    {
      kind: 'text',
      markdown:
        '({{A}}m7 – {{B}}m7♭5 – {{C}}maj7 – {{D}}m7 – {{E}}m7 – {{F}}maj7 – {{G}}7). Note: the v chord is **minor** in natural minor, which lacks the strong dominant pull. That is why harmonic minor raises the 7th to give a **major V** (E7 → Am).',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A major key and its **relative minor** share the same notes and the same diatonic chords, just with a different tonal centre. C major\'s relative minor is A minor (vi = i). The vi chord of the major key *is* the i chord of the relative minor.',
    },
  ],
}
