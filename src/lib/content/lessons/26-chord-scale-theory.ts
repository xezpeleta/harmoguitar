/**
 * Lesson 24 — Chord-Scale Theory
 * Source: RESEARCH.md §19
 *
 * The jazz approach to improvisation: for each chord, identify the scale that
 * contains its chord tones, then improvise with that scale. The chord is the
 * vertical snapshot; the scale is the horizontal palette.
 */
import type { Lesson } from '$lib/content/schema'

export const chordScaleTheory: Lesson = {
  id: 'chord-scale-theory',
  slug: 'chord-scale-theory',
  title: 'Chord-Scale Theory',
  summary: 'The jazz improviser\'s map: which scale fits which chord, and why some notes are "avoid" notes.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Chord-scale theory** (CST) is the jazz approach to improvisation. Instead of thinking "what notes can I play over this chord?", you think "what **scale** contains this chord?" — then improvise with that scale. The chord is the vertical snapshot; the scale is the horizontal palette you draw lines from.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Modes are the same notes heard differently.** The seven modes of the major scale are not seven new scales to memorise — they are **one scale started on each of its seven degrees**. {{C}} Ionian, {{D}} Dorian, {{E}} Phrygian, {{F}} Lydian, {{G}} Mixolydian, {{A}} Aeolian, {{B}} Locrian are all the same seven notes. The chord you are playing over determines which note feels like the root, and that changes the sound entirely. So practising your major scales in all keys *is* practising your modes — you just have not named them yet.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Scales for the common chord types',
    },
    {
      kind: 'text',
      markdown:
        'Every chord is a vertical slice of one or more scales. Here is the map for the chord types you will meet most often (all shown with a {{C}} root):',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Primary scale(s)', 'Notes (C root)'],
      rows: [
        ['{{C}}maj7', '**Ionian** / **Lydian**', '{{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}} / …{{F#}}…'],
        ['{{C}}maj7(♯11)', '**Lydian**', '{{C}} {{D}} {{E}} {{F#}} {{G}} {{A}} {{B}}'],
        ['{{C}}7 (dominant)', '**Mixolydian**', '{{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{Bb}}'],
        ['{{C}}7(♯11)', '**Lydian dominant**', '{{C}} {{D}} {{E}} {{F#}} {{G}} {{A}} {{Bb}}'],
        ['{{C}}7alt', '**Altered scale**', '{{C}} {{Db}} {{Eb}} {{E}} {{Gb}} {{Ab}} {{Bb}}'],
        ['{{C}}m7', '**Dorian** / Aeolian', '{{C}} {{D}} {{Eb}} {{F}} {{G}} {{A}} {{Bb}} / …{{Ab}}…'],
        ['{{C}}m6', '**Melodic minor**', '{{C}} {{D}} {{Eb}} {{F}} {{G}} {{A}} {{B}}'],
        ['{{C}}m7♭5', '**Locrian**', '{{C}} {{Db}} {{Eb}} {{F}} {{Gb}} {{Ab}} {{Bb}}'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hearing the difference: Ionian vs Lydian',
    },
    {
      kind: 'text',
      markdown:
        'The difference between Ionian (major) and Lydian over a major 7 chord is one note: the **4th**. Ionian has a natural 4 ({{F}} in C), which sits a half-step below the 3rd ({{E}}) and creates a mild clash — an "avoid" note. Lydian raises it to ♯4 ({{F#}}), which is consonant and dreamy. Most jazz players prefer Lydian over a static maj7 for this reason.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'ionian', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C Ionian (major) — the natural 4 ({{F}}) is an "avoid" note over Cmaj7 (it clashes with the 3rd, {{E}}). Use it as a passing tone, not a resting point.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'lydian', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C Lydian — the ♯4 ({{F#}}) is consonant with Cmaj7. No avoid notes. This is why jazz players reach for Lydian over a static major 7.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "avoid" note concept',
    },
    {
      kind: 'text',
      markdown:
        'Some scale degrees clash slightly with a chord and are best used as **passing tones** — notes you pass through, not rest on:',
    },
    {
      kind: 'list',
      items: [
        '**Natural 4 over a major 7** — a half-step below the 3rd. Use **Lydian** (♯4) instead for a consonant 11th.',
        '**Natural 11 over a dominant or major chord** — clashes with the 3rd. Use **♯11 / Lydian dominant** instead.',
        '**Natural 4 over a minor 7** — actually fine in Dorian (it is a characteristic colour note). Context matters.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'These aren\'t "wrong" notes — they\'re **tension notes.** Use them on purpose, resolved by step. The only truly "wrong" note in jazz is one played timidly. Every note in every scale has been used by someone, somewhere, to great effect.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Context decides the scale, not just the chord symbol.** A {{C}}maj7 could take {{C}} Ionian or {{C}} Lydian — but which one? The answer is **where the chord sits in the key**. If {{C}}maj7 is the **I** of the key, Ionian is the default. If {{C}}maj7 is the **IV** of the key (e.g., in {{G}} major), reach for Lydian, because the natural 4 of {{C}} Ionian ({{F}}) clashes with the key\'s {{F#}}. The chord symbol tells you the chord; the **key signature** tells you the scale. Always read the chord in the context of the key around it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Chord tones are king',
    },
    {
      kind: 'text',
      markdown:
        'Chord-scale theory gives you the **palette**, but **chord tones on strong beats** are what make a line outline the harmony. Use the scale to connect arpeggios; aim arpeggio tones (especially **3rds and 7ths**) onto downbeats and chord changes. A solo that only plays scale notes sounds like practising; a solo that targets chord tones sounds like music.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'dorian', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C Dorian — the preferred scale over Cm7. Every note is usable (no avoid notes in Dorian). Target the 3rd ({{Eb}}) and 7th ({{Bb}}) on downbeats.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Practice method:** pick a ii–V–I (e.g., {{D}}m7 – {{G}}7 – {{C}}maj7). For each chord, play its arpeggio (1-3-5-7), then its scale, then improvise — but always land on a chord tone (3rd or 7th) when the chord changes. This "target tone" approach is the bridge from theory to musical soloing.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Melodic minor: the hidden engine of jazz.** If there is one scale that stands above the rest in jazz, it is **melodic minor**. It generates seven distinct modes, each mapped to a different chord type: the 1st mode is minor-major 7, the 4th is Lydian dominant (♯11), the 5th gives the altered sound (♭13), and the 7th is the altered scale itself. One melodic-minor idea can be played over **every chord in a ii–V–I** by starting it on a different chord tone — the 3rd of the ii, the ♭9 of the V, the root of the I. This "universal sound hack" is why melodic minor is the backbone of modern jazz improvisation.',
    },
  ],
  sources: [
    {
      author: 'Jared Bork (Sound Guitar Lessons)',
      title: 'Jazz Scales for Every Chord Type (ULTIMATE GUIDE)',
      url: 'https://www.youtube.com/watch?v=4-rv7cdwLW8',
      note: 'Comprehensive guide mapping scales to chord types. Default for maj7 = major scale, but use Lydian when the chord is the IV of the key. maj6/maj7/maj9/maj13 are interchangeable. Context (where the chord sits in the key) determines the right scale.',
    },
    {
      author: 'Richard Pavlidis',
      title: 'Beginner Chord Scale Theory',
      url: 'https://www.youtube.com/watch?v=4vnxP8-J4ik',
      note: 'Introduction to CST: which scale to improvise over which chord. Modes are the major scale started on different degrees — same notes, different sound. Common progressions (ii-V-I, I-vi-ii-V) practised with parent-scale modes.',
    },
    {
      author: 'Nathan Borton',
      title: 'Most Important Scale for Jazz Improv (& How To Use It)',
      url: 'https://www.youtube.com/watch?v=254rxlvBwtY',
      note: 'Melodic minor as jazz\'s most important scale. Seven diatonic chords (one per mode): mMaj7, m7♭5, maj7♯5♯11, 7♯11, 9♭13, m7♭5♮9, m7♭5. The \u201cuniversal sound hack\u201d: one melodic-minor idea over every chord of a ii-V-I by starting on different chord tones (3rd of ii, ♭9 of V, root of i).',
    },
  ],
}
