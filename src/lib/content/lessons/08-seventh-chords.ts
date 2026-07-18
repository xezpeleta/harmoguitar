/**
 * Lesson 7 — Seventh Chords
 * Source: RESEARCH.md §6
 */
import type { Lesson } from '$lib/content/schema'

export const seventhChords: Lesson = {
  id: 'seventh-chords',
  slug: 'seventh-chords',
  title: 'Seventh Chords',
  summary: 'Adding one more third — the five 7th-chord qualities that define jazz harmony.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **seventh chord** adds one more third on top of a triad — now 4 notes: root, 3rd, 5th, 7th. Seventh chords are the foundation of jazz harmony. There are five you must know cold.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The 7th is the note just below the octave. Find the root, go up an octave (same note, 12 frets higher), and the 7th is right there: **one fret below** the octave is the major 7th; **two frets below** is the minor 7th. This is the fastest way to locate any 7th on the fretboard — the octave is your landmark.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The five essential 7th chords',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Formula', 'Stack of 3rds', 'Example (C)', 'Use'],
      rows: [
        ['Major 7', '1 3 5 7', 'M3 m3 M3', '{{C}} {{E}} {{G}} {{B}}', 'Imaj7, IVmaj7'],
        ['Dominant 7', '1 3 5 ♭7', 'M3 m3 m3', '{{C}} {{E}} {{G}} {{Bb}}', 'V7 (resolves to I)'],
        ['Minor 7', '1 ♭3 5 ♭7', 'm3 M3 m3', '{{C}} {{Eb}} {{G}} {{Bb}}', 'iim7, vim7'],
        ['Half-diminished', '1 ♭3 ♭5 ♭7', 'm3 m3 M3', '{{C}} {{Eb}} {{Gb}} {{Bb}}', 'iim7♭5 (minor ii–V–i)'],
        ['Diminished 7', '1 ♭3 ♭5 ♭♭7', 'm3 m3 m3', '{{C}} {{Eb}} {{Gb}} {{Bbb}}', 'passing, leading-tone'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The transformation chain',
    },
    {
      kind: 'text',
      markdown:
        'The five qualities are not unrelated — they form a chain. Start with a major 7th and lower one note at a time. Each step darkens the chord by one degree:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Major 7** (1 3 5 7) — the brightest, most \u201crestful\u201d 7th chord.',
        'Lower the 7th one semitone → **Dominant 7** (1 3 5 ♭7) — tension enters; the V chord.',
        'Lower the 3rd one semitone → **Minor 7** (1 ♭3 5 ♭7) — the chord darkens; now minor.',
        'Lower the 5th one semitone → **Half-diminished** (1 ♭3 ♭5 ♭7) — unstable, uneasy.',
        'Lower the 7th one more semitone → **Diminished 7** (1 ♭3 ♭5 ♭♭7) — the darkest, most tense.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Practise the chain on one grip: play a {{G}}maj7, then lower the 7th ({{F#}}→{{F}}) for G7, lower the 3rd ({{B}}→{{Bb}}) for Gm7, lower the 5th ({{D}}→{{Db}}) for Gm7♭5, and lower the 7th again ({{F}}→{{Fb}}) for Gdim7. Five chords, one shape, four single-note moves — from brightest to darkest. You will hear the harmony darken step by step.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Build any 7th chord in 3 steps',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Find the **root** note on the fretboard.',
        'Count up the **stack of thirds** (major or minor, per the formula) to find the 3rd, 5th, and 7th.',
        'Find all occurrences of those 4 notes across the other strings — any combination (with doublings) forms a voicing.',
      ],
    },

    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'Cmaj7 ({{C}} {{E}} {{G}} {{B}}). The "home" chord of the key of C.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 ({{G}} {{B}} {{D}} {{F}}) — the V7 of C. Hear how it wants to resolve to C.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dm7 ({{D}} {{F}} {{A}} {{C}}) — the iim7 of C, the start of a ii–V–I.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why dominant 7 is special',
    },
    {
      kind: 'text',
      markdown:
        'The dominant 7 chord (1 3 5 ♭7) contains a **tritone** between the 3rd and ♭7th. This tritone creates **maximum tension** that wants to resolve: the 3rd pulls up by semitone, the ♭7 pulls down by semitone. This V7 → I resolution is the engine of all Western tonal harmony.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'In G7 ({{G}} {{B}} {{D}} {{F}}), the tritone is **{{B}}–{{F}}**. {{B}} wants to rise to {{C}} (the root of the I chord); {{F}} wants to fall to {{E}} (the 3rd of the I chord). Watch those two notes resolve into Cmaj7 and you have understood the core of tonal music.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why play D7 and not just D on the V chord?** A plain D major triad already has one note (the 3rd, {{F#}}) a semitone from resolution — it pulls nicely to {{G}}. But add the ♭7 ({{C}}) and now you have **two** notes a semitone from home: {{F#}}↑→{{G}} and {{C}}↓→{{B}}. That is the whole case for the dominant 7th — it doubles the gravitational pull. Think of the V as a red carpet rolled out for the tonic: D major is a fine carpet; D7 is a brighter, fluffier, more grand one.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'On the explorer, switch between maj7, dom7, and m7 with the same root. The only difference is the 7th — but that one note changes the chord\u2019s entire function.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The **diminished 7th** is symmetrical: it is built entirely of minor 3rds (3 semitones each). Because all four notes are equally spaced, **any note can serve as the root** — C dim7 ({{C}} {{Eb}} {{Gb}} {{Bbb}}), E♭ dim7, G♭ dim7, and A dim7 all contain the same four pitches, just spelled differently. One dim7 grip on the fretboard is simultaneously four different dim7 chords. This is why dim7 is the great chameleon of harmony: it can resolve to four different keys from a single shape.',
    },
  ],
  sources: [
    {
      author: 'Move Forward Guitar',
      title: 'Guitar Chord Theory - Maj7 - Dom7 - min7 - m7b5 - Dim7 (#1)',
      url: 'https://www.youtube.com/watch?v=aGRurwdxuuE',
      note: 'The transformation chain: start from a major 7th grip and lower one note at a time to reach dominant 7, minor 7, minor 7 ♭5, and diminished 7. Five chords from one shape, heard from brightest to darkest.',
    },
    {
      author: 'LickNRiff - Free Guitar Education',
      title: 'Finally Understanding 7, m7 & maj7 Chords - Guitar Lesson',
      url: 'https://www.youtube.com/watch?v=NmtRxLphQ_o',
      note: 'The 7th as the note just below the octave: major 7th one fret below, minor 7th two frets below. The fastest fretboard landmark for finding any 7th. Also the character of each quality \u2014 maj7 as \u201cthe most pleasant chord,\u201d the dominant 7 as the basis of all tension.',
    },
    {
      author: 'Gracie Terzian',
      title: 'Why Do I Use Dominant 7 Chords?',
      url: 'https://www.youtube.com/watch?v=dhAZQgZJf9M',
      note: 'Answers the practical question \u201cwhy D7 and not just D on the V chord?\u201d \u2014 the dominant 7 adds a second semitone-resolving note (the ♭7), doubling the pull to the tonic. The V as a \u201cred carpet\u201d for the tonic, made brighter and grander by the 7th.',
    },
    {
      author: 'QJamTracks',
      title: 'Instant Level Up with 7th CHORDS - Chord Theory Part 2',
      url: 'https://www.youtube.com/watch?v=C_NyIiSD9wQ',
      note: 'The full taxonomy of 7th chords as stacks of three thirds, and the symmetrical property of the diminished 7th \u2014 all minor 3rds, so every note can be the root, making one dim7 shape equal to four enharmonic dim7 chords.',
    },
  ],
}
