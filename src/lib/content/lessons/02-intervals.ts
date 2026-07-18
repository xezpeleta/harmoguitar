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
  minutes: 14,
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
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why the same distance can have two names.** An interval name has two parts: a **number** (2nd, 3rd, 4th…) and a **quality** (major, minor, perfect…). The number comes from counting **letter names**, not semitones. {{C}}→{{D}} is a *2nd* because {{D}} is the 2nd letter from {{C}}. {{C}}→{{E}} is a *3rd* because {{E}} is the 3rd letter. The quality then pins down the exact size: {{C}}→{{E}} (4 semitones) is a **major** 3rd; {{C}}→{{Eb}} (3 semitones) is a **minor** 3rd. Same 3 semitones can also be spelled {{C}}→{{D#}} — but that is only 2 letter names, so it is an **augmented 2nd**, not a minor 3rd. The notes sound identical; the spelling tells you the harmonic function.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Major, minor, perfect',
    },
    {
      kind: 'text',
      markdown:
        'Intervals come in families — and the words are simpler than they sound. **Major** just means *bigger*; **minor** means *smaller* (the Latin roots). A major 3rd is the bigger version of a 3rd (4 semitones); a minor 3rd is the smaller version (3 semitones). Shrink a major interval by one semitone and it becomes minor. **Perfect** intervals (the 4th, 5th, and octave) do not come in major/minor sizes — they are a single, fixed size. Shrink a perfect interval and it becomes **diminished**; stretch it and it becomes **augmented**.',
    },
    {
      kind: 'text',
      markdown:
        'One more distinction: intervals can be **melodic** (the two notes played one after the other — a melody) or **harmonic** (both notes at once — a chord). Every interval name applies to both; the only difference is whether you hear the distance unfold in time or all at once. Tap **▶** next to each example to hear the comparison against a root of {{C}} — first the starting interval, then the altered one.',
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
      text: 'Interval inversions',
    },
    {
      kind: 'text',
      markdown:
        'Flip any interval — move the lower note up an octave, or the higher note down — and you get its **inversion**. The two always add up to an octave (12 semitones), and the interval numbers always sum to 9: a 2nd becomes a 7th (2 + 7 = 9), a 3rd becomes a 6th (3 + 6 = 9), a 4th becomes a 5th (4 + 5 = 9). Major and minor swap places; perfect stays perfect; the tritone, sitting exactly at the midpoint, inverts to *itself*.',
    },
    {
      kind: 'table',
      headers: ['Interval', '→ Inversion', 'Rule'],
      rows: [
        ['Major 2nd (2 st)', 'Minor 7th (10 st)', 'major ↔ minor'],
        ['Minor 3rd (3 st)', 'Major 6th (9 st)', 'major ↔ minor'],
        ['Major 3rd (4 st)', 'Minor 6th (8 st)', 'major ↔ minor'],
        ['Perfect 4th (5 st)', 'Perfect 5th (7 st)', 'perfect ↔ perfect'],
        ['Tritone (6 st)', 'Tritone (6 st)', 'symmetrical — inverts to itself'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Inversions explain why chords are built the way they are. A major triad is root + major 3rd + perfect 5th. Flip the 3rd above the 5th and you get a first-inversion voicing — the same three notes, but the *minor 6th* between the 3rd and the root (now on top) is the inversion of the original major 3rd. The geometry is elegant: every chord voicing is a set of intervals and their inversions.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Recognising intervals by ear',
    },
    {
      kind: 'text',
      markdown:
        'Knowing the names and semitone counts is the theory. But recognising an interval when you *hear* it — that is a different skill, and it is the skill that lets you play what you hear, whether on the radio or in your head. The trick every ear-training teacher recommends: **associate each interval with a song you already know.** The first two notes of a familiar melody give you a reference point. When you hear an unknown interval, hum your reference songs until one matches.',
    },
    {
      kind: 'table',
      headers: ['Interval', 'Song', 'Where to listen'],
      rows: [
        ['Minor 2nd', '“Jaws” (John Williams)', 'the two-note pivot'],
        ['Major 2nd', '“Frère Jacques”', 'first two notes (Do–Re)'],
        ['Minor 3rd', '“Greensleeves”', 'opening notes'],
        ['Major 3rd', '“When the Saints Go Marching In”', 'first two notes'],
        ['Perfect 4th', '“Here Comes the Bride” (Wagner)', 'opening leap'],
        ['Tritone', '“The Simpsons” theme', 'opening tag'],
        ['Perfect 5th', '“Star Wars” (John Williams)', 'main theme — first two notes'],
        ['Minor 6th', '“The Entertainer” (Joplin)', 'main melody'],
        ['Major 6th', '“My Bonnie Lies Over the Ocean”', 'first two notes'],
        ['Minor 7th', '“Somewhere” (West Side Story)', 'first two notes of the melody'],
        ['Major 7th', '“Take On Me” (a-ha)', 'chorus — the big leap'],
        ['Octave', '“Somewhere Over the Rainbow”', 'opening leap (Some–where)'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'These are **ascending** examples. For descending intervals, either flip the song in your head (the end of the melody back to the start) or learn separate descending references. And remember: your ear does not care about the spelling — {{C}}→{{Eb}} (minor 3rd) and {{C}}→{{D#}} (augmented 2nd) sound identical. Ear training lets you throw away the naming rules and focus on the *sound*.',
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
  sources: [
    {
      author: 'David Bennett',
      title: 'Songs that will help you identify ascending intervals',
      url: 'https://www.youtube.com/watch?v=PhDIm_2qS5s',
      note: 'The song-association method for interval ear training — linking each of the 12 intervals to a famous melody (Jaws, Star Wars, The Simpsons, Take On Me, etc.) so you can recognise intervals by ear.',
    },
    {
      author: 'Signals Music Studio',
      title: 'Explaining Musical Intervals As CLEARLY As I Possibly Can',
      url: 'https://www.youtube.com/watch?v=m9GlB8tanNE',
      note: 'The letter-class counting system that explains why the same semitone distance can have different interval names; the major/minor = big/small mnemonic; augmented and diminished as “grown/shrunk beyond standard size”; and interval inversions (the complement-to-octave rule).',
    },
    {
      author: 'QJamTracks',
      title: 'INTERVALS for Guitar – crystal clear and ultimate guide',
      url: 'https://www.youtube.com/watch?v=axYQzYaajC4',
      note: 'The melodic vs harmonic interval distinction (notes played successively vs simultaneously) and the derivation of interval names from diatonic scale degrees.',
    },
  ],
}
