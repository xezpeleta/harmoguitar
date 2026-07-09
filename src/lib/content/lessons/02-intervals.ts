/**
 * Lesson 2 — Intervals
 * Source: RESEARCH.md §2
 */
import type { Lesson } from '$lib/content/schema'

export const intervals: Lesson = {
  id: 'intervals',
  slug: 'intervals',
  title: 'Intervals: The Building Blocks',
  summary: 'The 12 distances between notes — the single concept that chords and scales are made of.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'An **interval** is the distance between two notes, measured in **semitones** (frets). There are 12 intervals within an octave. Learn these and you have the key to every chord and scale — they are not separate topics, just intervals stacked in patterns.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The 12 intervals',
    },
    {
      kind: 'text',
      markdown:
        'Here are all 12 intervals within an octave, measured from a root of {{C}}. Tap the **▶** button on any row to hear that interval played against the root — first the low note, then the high note, so the *distance* is what you hear.',
    },
    {
      kind: 'table',
      headers: ['Semitones', 'Name', 'Symbol', 'Character'],
      rows: [
        ['0', 'Unison', '1', 'same note'],
        ['1', 'Minor 2nd', '♭2', 'tense, dissonant'],
        ['2', 'Major 2nd', '2', 'a step'],
        ['3', 'Minor 3rd', '♭3', 'minor / sad'],
        ['4', 'Major 3rd', '3', 'major / happy'],
        ['5', 'Perfect 4th', '4', 'open, suspended'],
        ['6', 'Tritone', '♯4 / ♭5', 'dissonant, restless'],
        ['7', 'Perfect 5th', '5', 'stable, power chord'],
        ['8', 'Minor 6th', '♭6', 'dark'],
        ['9', 'Major 6th', '6', 'bright'],
        ['10', 'Minor 7th', '♭7', 'bluesy, dominant'],
        ['11', 'Major 7th', '7', 'jazzy'],
        ['12', 'Octave', '8 / 1', 'same note, higher'],
      ],
      playable: {
        root: 'C',
        semitones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C' },
      widgets: ['interval-wheel'],
      play: { kind: 'intervals-from-root', root: 'C' },
      caption:
        'The interval wheel rooted at {{C}}. The 7 major-scale tones are coloured. Hover or tap a segment to hear that interval played against the root — or press Play to hear every interval in turn: {{C}}–{{C}}, {{C}}–{{C#}}, {{C}}–{{D}}, … up to the octave.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Major, minor, perfect',
    },
    {
      kind: 'text',
      markdown:
        'Intervals come in families. Tap **▶** next to each example to hear the comparison against a root of {{C}} — first the starting interval, then the altered one.',
    },
    {
      kind: 'list',
      items: [
        'A **major** interval made one semitone smaller becomes **minor** (major 3rd → minor 3rd).',
        'A **perfect** interval (4th, 5th, octave) made one semitone smaller becomes **diminished**; one semitone larger becomes **augmented**.',
        'The **3rd** is the most important interval in harmony — it alone defines whether a chord is major or minor.',
      ],
      playable: {
        root: 'C',
        offsets: [
          [4, 3], // major 3rd, then minor 3rd
          [7, 6, 8], // perfect 5th, diminished 5th (tritone), augmented 5th
          [4, 3], // the 3rd: major then minor
        ],
      },
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'The **tritone** (6 semitones) splits the octave exactly in half. It sounds restless and wants to resolve. It is the engine of dominant tension — the reason a V7 chord pulls toward the I. You will meet it again in every jazz lesson.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Compound intervals',
    },
    {
      kind: 'text',
      markdown:
        'When you keep stacking thirds past the 7th, the intervals wrap around the octave and get new names:',
    },
    {
      kind: 'list',
      items: [
        '**9th** = 2nd + octave',
        '**11th** = 4th + octave',
        '**13th** = 6th + octave',
      ],
    },
    {
      kind: 'text',
      markdown:
        'This is why a "13th chord" is really just a 7th chord with a 6th (an octave up) added for colour — and why 9, 11, and 13 appear on chord symbols.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Try it:** in the wheel above, change the root with the home-page selector and watch the intervals re-label. Every interval is measured *from the root* — so the same 7 semitones is a "perfect 5th" no matter where you start. From {{C}} that lands on {{G}}; from {{F}} it lands on {{C}}.',
    },
  ],
}
