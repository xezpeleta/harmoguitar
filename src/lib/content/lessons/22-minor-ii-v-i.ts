/**
 * Lesson 21 — The Minor ii–V–i
 * Source: RESEARCH.md §18
 *
 * The minor-key counterpart of the major ii–V–I. Uses a half-diminished ii,
 * an altered V7, and resolves to a minor tonic — the dark, tense sound at the
 * heart of Autumn Leaves, Blue Bossa, and Black Orpheus.
 */
import type { Lesson } from '$lib/content/schema'

export const minorIIVi: Lesson = {
  id: 'minor-ii-v-i',
  slug: 'the-minor-ii-v-i',
  title: 'The Minor ii–V–i',
  summary: 'The dark twin of the ii–V–I — half-diminished ii, altered V7, minor tonic. The sound of a hundred jazz ballads.',
  minutes: 12,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You know the major ii–V–I ({{D}}m7 – {{G}}7 – {{C}}maj7). Its **minor-key twin** is just as important — arguably more common in jazz ballads. The structure is the same (ii → V → i, roots moving in 4ths), but every chord changes quality to fit the minor key, and the V7 gets **altered** for maximum tension. In **A minor**: **{{B}}m7♭5 – {{E}}7♭9 – {{A}}m7**.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The structure',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Roman', 'Quality', 'Notes (A minor)'],
      rows: [
        ['{{B}}m7♭5', 'iiø7', 'Half-diminished', '{{B}} {{D}} {{F}} {{A}}'],
        ['{{E}}7(♭9)', 'V7', 'Dominant (altered)', '{{E}} {{G#}} {{B}} {{D}} {{F}}'],
        ['{{A}}m7', 'i7', 'Minor 7', '{{A}} {{C}} {{E}} {{G}}'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why these chords',
    },
    {
      kind: 'list',
      items: [
        '**ii = m7♭5 (half-diminished):** built on the 2nd degree of the natural minor scale ({{B}} {{D}} {{F}} {{A}}). In a minor key the ii is *naturally* half-diminished — you do not alter it, it just is.',
        '**V7 with alterations (♭9, ♭13):** the V comes from **harmonic minor** ({{E}}7 = {{E}} {{G#}} {{B}} {{D}}, with the {{G#}} raised leading tone). Players add ♭9 ({{F}}) and ♭13 ({{C}}) — notes borrowed from the minor scale — to heighten the dark, tense pull toward the minor tonic.',
        '**i = m7 or m6:** {{A}}m7 ({{A}} {{C}} {{E}} {{G}}) is the natural resolution; {{A}}m6 ({{A}} {{C}} {{E}} {{F#}}) is a common variant — the 6th ({{F#}}) is the Dorian colour and a great melody note.',
      ],
    },

    {
      kind: 'widget',
      selection: { chordType: 'm7b5', root: 'B' },
      widgets: ['fretboard', 'staff'],
      caption: '{{B}}m7♭5 — the iiø7. Half-diminished: a minor 7 with a flattened 5th ({{F}} instead of {{F#}}). This is the diatonic ii of A minor — no alteration needed.',
    },
    {
      kind: 'widget',
      selection: { chordType: '7b9', root: 'E' },
      widgets: ['fretboard', 'staff'],
      caption: '{{E}}7♭9 — the V7. The ♭9 ({{F}}) adds a dark, crunching tension that pulls hard toward {{A}}m. The {{G#}} is the raised leading tone from harmonic minor.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: '{{A}}m7 — the i. Resolution. Hit “Play progression” to hear the full minor ii–V–i: {{B}}m7♭5 → {{E}}7♭9 → {{A}}m7.',
      play: {
        kind: 'progression',
        chords: ['Bm7b5', 'E7b9', 'Am7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Scales over the minor ii–V–i',
    },
    {
      kind: 'text',
      markdown:
        'Each chord gets its own scale — the chord is the vertical snapshot, the scale is the horizontal palette you draw lines from:',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Scale', 'Why'],
      rows: [
        ['{{B}}m7♭5 (iiø7)', '**Locrian**', 'The 7th mode of {{C}} major ({{B}} {{C}} {{D}} {{E}} {{F}} {{G}} {{A}}) — contains every chord tone. Dissonant but correct.'],
        ['{{E}}7alt (V7)', '**Altered scale**', '7th mode of {{F}} melodic minor — every alteration (♭9, ♯9, ♭5, ♯5) resolving by half-step. (Covered in the next lesson.)'],
        ['{{A}}m7 (i)', '**Aeolian or Dorian**', 'Aeolian = natural minor (dark). Dorian = raised 6th ({{F#}}, brighter). Pick by mood.'],
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'locrian', root: 'B' },
      widgets: ['fretboard', 'staff'],
      caption: 'B Locrian — the scale over Bm7♭5. Every chord tone ({{B}} {{D}} {{F}} {{A}}) is in the scale. The ♭5 ({{F}}) is the "character note" — it defines the half-diminished sound.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "lick" sound: altered tones resolving by half-step',
    },
    {
      kind: 'text',
      markdown:
        'Because the V7 is altered and resolves to a minor tonic, the characteristic licks emphasise the **altered tones resolving by half-step** into chord tones of {{A}}m ({{A}} {{C}} {{E}} {{G}}). For {{E}}7♭9 → {{A}}m:',
    },
    {
      kind: 'table',
      headers: ['Altered note (on E7)', 'Resolves to (on Am)', 'Motion'],
      rows: [
        ['♭9 ({{F}})', '5th ({{E}})', 'down a semitone'],
        ['♭5 ({{Bb}})', 'root ({{A}})', 'down a semitone'],
        ['♯9 ({{G}})', '7th ({{G}})', 'common tone — colours the resolution'],
        ['♯5 / ♭13 ({{C}})', '3rd ({{C}})', 'common tone — colours the resolution'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Target the ♭9→5th and ♭5→root half-step descents** for the most authentic minor-jazz "landing" sound. These two resolutions are the fingerprint of the minor ii–V–i — learn to hear them and your solos will sound like the repertoire.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'How to practice',
    },
    {
      kind: 'list',
      items: [
        '**Learn the form** in A minor first ({{B}}m7♭5 – {{E}}7♭9 – {{A}}m7), then move it to other keys (D minor: {{E}}m7♭5 – {{A}}7♭9 – {{D}}m7).',
        '**Comp with guide tones** — the 3rds and 7ths voice-lead just as smoothly as in the major ii–V–I (Lesson 17).',
        '**Solo with arpeggios first** — outline each chord, then connect with the parent scales.',
        '**Play along with Autumn Leaves** — the opening 4 bars are a minor ii–V–i in G minor ({{A}}m7♭5 – {{D}}7♭9 – {{G}}m7), then a major ii–V–I. The tune is a textbook.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **altered scale** over the V7 is the single most powerful tool for this progression — and it has a deep connection to the tritone substitution you learned in Lesson 16. That is the next lesson.',
    },
  ],
}
