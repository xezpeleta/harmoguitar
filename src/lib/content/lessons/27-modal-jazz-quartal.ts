/**
 * Lesson 25 — Modal Jazz & Quartal Harmony
 * Source: RESEARCH.md §24
 *
 * Modes as tonal centres rather than functional ii–V–I harmony. Few chords,
 * held for many bars, with interest coming from melodic colour and texture.
 * Includes the "So What" chord and stacked-fourth voicings.
 */
import type { Lesson } from '$lib/content/schema'

export const modalJazz: Lesson = {
  id: 'modal-jazz-quartal',
  slug: 'modal-jazz-and-quartal-harmony',
  title: 'Modal Jazz & Quartal Harmony',
  summary: 'When the chord just "is" — modes as tonal centres, the So What chord, and why stacked fourths sound so modern.',
  minutes: 11,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Modal jazz** (Miles Davis *Kind of Blue*, Coltrane, Wayne Shorter) uses **modes as tonal centres** rather than functional ii–V–I harmony. Instead of fast-moving chord changes, there is often a single chord per section, held for 8 or 16 bars. The interest comes from **melodic colour and texture**, not harmonic motion. It is the sound of "soaring" — open, floating, modern.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What makes it "modal"',
    },
    {
      kind: 'list',
      items: [
        '**Few chords, held for many bars** — e.g., "So What": 16 bars of {{D}}m7, 8 of {{Eb}}m7, 8 of {{D}}m7.',
        '**Vamps** — a repeated 1- or 2-chord pattern over which the soloist explores a mode.',
        '**Non-functional harmony** — no V7→I tension/release cycle; the chord just "is" its mode. You do not need to resolve anything — you explore.',
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'dorian', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'D Dorian — the mode of "So What." Every note is consonant (no avoid notes). Hold it for 16 bars and explore.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Quartal harmony: chords in fourths',
    },
    {
      kind: 'text',
      markdown:
        'Traditional harmony stacks **thirds** (1-3-5-7). **Quartal harmony** stacks **fourths**: 1-4-7-10(3)… On guitar, stacked-fourth voicings are easy to finger and sound modern, open, and ambiguous. They are the signature comping sound of modal jazz.',
    },
    {
      kind: 'list',
      items: [
        'The modes modal jazz uses (especially Dorian) are rich in perfect 4ths, so stacked-4th voicings naturally express the mode.',
        'They sound **"floaty"** — the same shape can be several different chords depending on the bass note. This ambiguity is a feature, not a bug.',
        '**Parallel motion:** move a quartal voicing in parallel up and down the scale — the defining gesture of modal comping.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "So What" chord',
    },
    {
      kind: 'text',
      markdown:
        'The most famous quartal voicing in jazz: a 5-note chord of **stacked fourths with one major third on top**. For {{D}}m7, it is **{{D}}–{{G}}–{{C}}–{{F}}–{{A}}** (low to high) — three perfect 4ths (D-G, G-C, C-F) plus a major 3rd (F-A). This is the exact voicing Bill Evans plays on the head of "So What."',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'The "So What" voicing for Dm7: D-G-C-F-A. Three perfect 4ths + a major 3rd. The signature sound of modal jazz comping.',
      voicing: [
        { string: 5, fret: 5, label: 'D' },
        { string: 4, fret: 5, label: 'G' },
        { string: 3, fret: 5, label: 'C' },
        { string: 2, fret: 6, label: 'F' },
        { string: 1, fret: 5, label: 'A' },
      ],
      play: {
        kind: 'progression',
        chords: ['Dm7', 'Ebm7', 'Dm7'],
        tempo: 100,
        beatsPerChord: 4,
      },
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The shape is movable.** Slide the whole grip up one fret for {{Eb}}m7 (the second section of "So What"), up two for {{E}}m7, etc. This is **parallel motion** — the same shape moving through different roots. It is the easiest and most effective comping technique in modal jazz.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The modes of modal jazz',
    },
    {
      kind: 'table',
      headers: ['Mode', 'Vibe', 'Example tunes'],
      rows: [
        ['**Dorian**', 'Minor but bright (raised 6th)', 'So What, Maiden Voyage, Little B\'s Poem'],
        ['**Mixolydian**', 'Dominant, open (♭7)', 'Vamps on a sus or dominant chord'],
        ['**Phrygian**', 'Dark, Spanish (♭2)', 'Spanish/Middle-Eastern vamps'],
        ['**Lydian**', 'Floating, dreamy (♯4)', 'Major sus vamps, "Maiden Voyage" sections'],
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Modal jazz is a **different mindset** from bebop. In bebop, you chase fast chord changes and target guide tones. In modal jazz, you **stay** on one sound and explore its colours — motifs, rhythm, density, register. The skill is not "navigating changes" but "making one chord interesting for 16 bars."',
    },
  ],
}
