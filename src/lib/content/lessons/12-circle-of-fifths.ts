/**
 * Lesson 11 — The Circle of Fifths
 * Source: RESEARCH.md §10
 */
import type { Lesson } from '$lib/content/schema'

export const circleOfFifths: Lesson = {
  id: 'circle-of-fifths',
  slug: 'circle-of-fifths',
  title: 'The Circle of Fifths',
  summary: 'The 12 keys arranged in a cycle — key signatures, I–IV–V, and transposition at a glance.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The **circle of fifths** arranges the 12 pitch classes in a cycle of **perfect fifths** (clockwise) / perfect fourths (counterclockwise). Starting at {{C}} (top): **{{C}} → {{G}} → {{D}} → {{A}} → {{E}} → {{B}} → {{F#}} → {{Db}} → {{Ab}} → {{Eb}} → {{Bb}} → {{F}} → {{C}}**. It is the single most useful diagram in music theory.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Why fifths?** The 5th note of any major scale is special: its own major scale shares every note with the first, *except one*. C major has 0 sharps; its 5th ({{G}}) has 1 sharp ({{F#}}); G\u2019s 5th ({{D}}) has 2 sharps; and so on around the clock. Each step clockwise adds exactly one sharp. Each step counterclockwise adds exactly one flat. The circle is not arbitrary geometry \u2014 it is the *consequence* of how the major scale is built. Neighbouring keys differ by a single note, which is why modulations between them feel effortless.',
    },

    {
      kind: 'widget',
      selection: { key: 'C', keyScaleType: 'major', scaleType: 'major', root: 'C' },
      widgets: ['circle-of-fifths'],
      caption:
        'The circle of fifths. Click any key to explore its scale and diatonic chords. The outer ring is major keys; the inner ring is their relative minors.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What the circle shows',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Key signatures:** each step clockwise adds a sharp; each step counterclockwise adds a flat. {{C}} = 0, {{G}} = 1♯, {{D}} = 2♯, … {{F}} = 1♭, {{Bb}} = 2♭.',
        '**Closely related keys:** neighbours share the most notes (differ by only one sharp/flat). This is where modulations naturally go.',
        '**The I–IV–V of any key:** find your key; the note to the **left is the IV**, the note to the **right is the V**.',
        '**Relative minor:** the inner ring. C major ↔ A minor — they share a key signature.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The order of sharps and flats is hiding in the circle.** Sharps appear clockwise from the 11-o\u2019clock position: {{F}} {{C}} {{G}} {{D}} {{A}} {{E}} {{B}}. Flats appear counter-clockwise from the 5-o\u2019clock position: {{Bb}} {{Eb}} {{Ab}} {{Db}} {{Gb}} {{Cb}} {{Fb}}. So if you know {{A}} major is at 3 o\u2019clock (3 sharps), count 3 positions from {{F}} in the sharp order: {{F#}} {{C#}} {{G#}}. That is A major\u2019s key signature. You never have to memorise the sharps individually \u2014 the circle *generates* them.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The I–IV–V and the 1-4-5',
    },
    {
      kind: 'text',
      markdown:
        'The three most important chords in any key — the I, IV, and V — sit together on the circle. To find them instantly: your key is I, one step **left** is IV, one step **right** is V. This is the **1-4-5** of blues, rock, and folk. In C: {{C}}–{{F}}–{{G}}. In A: {{A}}–{{D}}–{{E}}. In G: {{G}}–{{C}}–{{D}}.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Click **G** on the circle above. {{G}} is your I, {{C}} (left) is your IV, {{D}} (right) is your V. The 1-4-5 of a blues in G is {{G}}–{{C}}–{{D}} — read straight off the circle.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The relative minor is three steps clockwise.** From any major key, count three positions clockwise on the outer ring and you land on its relative minor. {{C}} → {{G}} → {{D}} → {{A}}: A minor is C major\u2019s relative. {{G}} → {{D}} → {{A}} → {{E}}: E minor is G major\u2019s relative. They share the exact same notes \u2014 only the tonal centre shifts. This is why you can play the C major scale over an Am chord (and vice versa): the note pool is identical.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Practical guitar uses',
    },
    {
      kind: 'list',
      items: [
        '**Transposing:** learn a progression as numbers (I–vi–IV–V), then apply it to any key by reading positions off the circle.',
        '**Finding the 1-4-5** for a blues in any key instantly.',
        '**Finding relative minors** for colour chords (vi = the inner-ring neighbour).',
        '**Borrowed chords:** chords from the parallel minor (♭III, ♭VI, ♭VII) sit on the opposite side of the circle.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Closeness = shared notes.** Neighbouring keys on the circle share 6 of 7 notes \u2014 they differ by a single sharp or flat. {{C}} and {{G}} differ only in {{F}}/{{F#}}; {{G}} and {{D}} differ only in {{C}}/{{C#}}. This is why a modulation from C to G feels like stepping next door, while C to {{F#}} (directly opposite) feels like travelling to a foreign country. Think of the circle as a map: nearby keys are familiar territory; distant keys are exotic. Borrowed chords usually come from your immediate neighbours \u2014 that is why they blend.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The diatonic chords live on the circle too.** For any key, the 6 usable diatonic chords (skipping the diminished vii°) form an arc: your key, plus one neighbour on each side (the IV and V), plus their relative minors on the inner ring. In C: the three majors are {{F}}–{{C}}–{{G}} (left, centre, right on the outer ring), and the three minors are {{D}}m–{{A}}m–{{E}}m (the inner-ring neighbours of those). The circle is not just a key-signature chart \u2014 it is a map of *which chords belong together*.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The diatonic circle of fifths',
    },
    {
      kind: 'text',
      markdown:
        'Within a single key, the 7 diatonic chords also form a (partial) circle: …iii–vi–ii–V–I–IV… This is why progressions like I–vi–ii–V (a "circle progression") sound so smooth — each chord\'s root is a 4th above (or 5th below) the next, the most natural root motion in tonal music.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Root motion by **4th up / 5th down** is the strongest, most "circular" movement in harmony. It is why the ii–V–I works, why turnarounds work, and why the circle of fifths is not just a key-signature chart but a map of harmonic motion.',
    },
  ],
  sources: [
    {
      author: 'Active Melody',
      title: 'Circle of Fifths Explained (For Guitar) - How to actually USE it',
      url: 'https://www.youtube.com/watch?v=qF3mJzDulJ8',
      note: 'Guitar-centric practical uses: the 1-4-5 read straight off the circle (key = I, left = IV, right = V), finding relative minors on the inner ring, and the diatonic-chord arc (count 7 positions clockwise from the IV to get all the chords that work together in a key).',
    },
    {
      author: 'Music Matters',
      title: 'Music Theory - Understanding The Circle of Fifths',
      url: 'https://www.youtube.com/watch?v=_LHv5WN4SiU',
      note: 'How to construct the circle from scratch: start at C (0 sharps), go up a 5th to G (1 sharp), another 5th to D (2 sharps), and so on. Why going down a 5th (or up a 4th) introduces flats. The construction method means you never have to memorise the circle \u2014 you can rebuild it.',
    },
    {
      author: 'Pierce Porterfield',
      title: 'The Circle of Fifths Explained',
      url: 'https://www.youtube.com/watch?v=FvOzjlJw9LM',
      note: 'The deep \u201cwhy\u201d: the circle is a consequence of the major-scale pattern (skip-skip-don\u2019t-skip). The 5th degree is significant because its scale shares all but one note with the original. The order of sharps and flats is embedded in the circle layout itself.',
    },
    {
      author: 'Gracie Terzian',
      title: '7 Ways To Actually Use the Circle of 5ths',
      url: 'https://www.youtube.com/watch?v=4WxDZ-wSXLY',
      note: 'Seven practical applications: figuring out major scales, key signatures, key closeness (neighbours share 6/7 notes), relative minors (three steps clockwise), diatonic chords as an arc on the circle, and the dominance of the 1-5 relationship in all of music.',
    },
  ],
}
