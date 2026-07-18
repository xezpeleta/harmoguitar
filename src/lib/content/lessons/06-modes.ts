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
  minutes: 16,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **mode** is a scale played from a note other than its root — you take the *same 7 notes* but treat a different degree as "home." Each mode has a **characteristic note** that gives it its flavour. There are two ways to think about modes, and you need both.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The most useful way to think about modes: **each one is an effect, defined by a single note.** Do not try to memorize seven new scales. Instead, learn the *one note* that gives each mode its colour — the ♯4 that makes Lydian dreamy, the ♭7 that makes Mixolydian bluesy, the natural 6 that makes Dorian hopeful. If you never hit that characteristic note, the listener hears only a plain major or minor scale. Hit it and the mode snaps into focus. Modes are not scales you switch to; they are **colours you deploy**.',
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
        '**Parent-scale view:** D Dorian = the notes of C major, starting on {{D}}. Easiest to *construct* — you already know the major scale.',
        '**Parallel / formula view:** D Dorian = D major with ♭3 and ♭7. Easiest to *play over a single chord* — you compare to the major scale of the same root.',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'The parent-scale view is why beginners get confused: "D Dorian has the same notes as C major, so what makes it Dorian?" The answer is the **tonal centre** — which note feels like "home." Play a {{D}} in the bass and Dorian emerges; play a {{C}} and Ionian returns. Context is everything.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Two camps: major modes and minor modes',
    },
    {
      kind: 'text',
      markdown:
        'The parallel view is clearest when you group the modes into **two camps**. The **major modes** (Ionian, Lydian, Mixolydian) all contain a major 3rd, so they derive from the major scale — each by changing a single note. The **minor modes** (Dorian, Phrygian, Aeolian) all contain a minor 3rd, so they derive from the natural minor scale — again, each by changing a single note. Locrian (the 7th) sits uneasily in the minor camp with a ♭5 that makes it unstable.',
    },
    {
      kind: 'table',
      headers: ['Camp', 'Mode', 'Start from', 'Change', 'Characteristic note'],
      rows: [
        ['Major', 'Ionian', 'major scale', '—', '—'],
        ['Major', 'Lydian', 'major scale', 'raise the 4', '♯4'],
        ['Major', 'Mixolydian', 'major scale', 'lower the 7', '♭7'],
        ['Minor', 'Aeolian', 'natural minor', '—', '—'],
        ['Minor', 'Dorian', 'natural minor', 'raise the 6', 'natural 6'],
        ['Minor', 'Phrygian', 'natural minor', 'lower the 2', '♭2'],
        ['Minor', 'Locrian', 'natural minor', 'lower the 2 and the 5', '♭2 and ♭5'],
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Notice the symmetry: the major modes alter the 4th or the 7th; the minor modes alter the 2nd or the 6th. These are the notes *adjacent to the tonic* — the ones that shape the approach to home. The 3rd and 5th (which define major vs minor and the basic consonance) stay fixed within each camp. That is why each mode sounds like a *flavour* of major or minor rather than a wholly different scale.',
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
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The natural 6 is Dorian\u2019s defining note — **if you never play it, no one will hear Dorian.** Target it deliberately: resolve a phrase onto the natural 6, or use it as a melodic high point. The classic Dorian moment is the 4→6 leap (up a major 3rd), which sounds "mysterious" and unmistakably modal. It is the sound of countless film scores and of songs like \u201cEleanor Rigby\u201d and \u201cSo What.\u201d',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'dorian', root: 'D' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'D Dorian. Compare the natural 6th ({{B}}) to the ♭6 you would expect in D natural minor.',
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
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The ♭7 is Mixolydian\u2019s defining note. Its characteristic chords are **I, IV, and ♭VII** — all major — which is why a Mixolydian vamp (like G–F–C, the backbone of countless rock songs) sounds bright but with a bluesy edge. The ♭VII chord ({{F}} major in the key of {{G}}) is the tell: it only exists naturally in Mixolydian, not in a plain major key.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'mixolydian', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G Mixolydian — a major scale with a ♭7 ({{F}} natural). The sound of a G7 vamp.',
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
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to actually practise modes.** Do not try to learn all seven at once. Pick **one mode** (Dorian is the friendliest start), find a drone or backing track that vamps on its tonic chord, and improvise using the parent major scale — but *emphasize the characteristic note*. Your ear will lock onto the modal flavour within minutes. Only add a second mode once the first sounds like a colour you recognise, not a formula you calculated. The goal is to hear a chord and instinctively know which mode fits — the same way you already know minor pentatonic fits a minor chord.',
    },
  ],
  sources: [
    {
      author: '8-bit Music Theory',
      title: 'Tutorial Level 2: Modes',
      url: 'https://www.youtube.com/watch?v=yS83fcFhG0E',
      note: 'The framing of modes as \u201ceffects\u201d defined by a single characteristic note rather than seven scales to memorize — the ♯4 for Lydian, ♭7 for Mixolydian, natural 6 for Dorian, ♭2 for Phrygian. With video-game soundtrack examples (Super Mario Galaxy, Undertale) that illustrate each mode\u2019s colour.',
    },
    {
      author: 'Samjamguitar',
      title: 'How to Learn MODES on Guitar (and USE them INSTANTLY)',
      url: 'https://www.youtube.com/watch?v=esELMSxd_Hk',
      note: 'The major-camp / minor-camp organisation: major modes (Ionian, Lydian, Mixolydian) derive from the major scale by changing one note; minor modes (Dorian, Phrygian, Aeolian) derive from natural minor by changing one note. Also the importance of emphasising the characteristic note to make the mode audible.',
    },
    {
      author: 'PianoPig',
      title: 'INTRODUCTION TO MODES: Dorian, Lydian, Mixolydian',
      url: 'https://www.youtube.com/watch?v=o6FVtZ-bkyU',
      note: 'The characteristic chords of each mode (Lydian = I and II major; Mixolydian = I, IV, ♭VII; Dorian = i and IV) and the two ways to construct any mode — parent-scale (\u201cwhich major scale has C as its 2nd note?\u201d) or parallel (\u201cC major with a ♭3 and ♭7\u201d).',
    },
    {
      author: 'Walk That Bass',
      title: 'Music Theory Tutorial - Understanding Modes',
      url: 'https://www.youtube.com/watch?v=yc4wX0Wjpo0',
      note: 'The simplest statement of the parent-scale approach: the mode name tells you which degree to start on (Dorian = 2nd, Phrygian = 3rd, Lydian = 4th…), so \u201cD Dorian\u201d means \u201cplay C major starting and ending on D.\u201d',
    },
  ],
}
