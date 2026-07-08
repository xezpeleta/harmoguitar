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
  minutes: 11,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The **circle of fifths** arranges the 12 pitch classes in a cycle of **perfect fifths** (clockwise) / perfect fourths (counterclockwise). Starting at C (top): **C → G → D → A → E → B → F♯ → D♭ → A♭ → E♭ → B♭ → F → C**. It is the single most useful diagram in music theory.',
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
        '**Key signatures:** each step clockwise adds a sharp; each step counterclockwise adds a flat. C = 0, G = 1♯, D = 2♯, … F = 1♭, B♭ = 2♭.',
        '**Closely related keys:** neighbours share the most notes (differ by only one sharp/flat). This is where modulations naturally go.',
        '**The I–IV–V of any key:** find your key; the note to the **left is the IV**, the note to the **right is the V**.',
        '**Relative minor:** the inner ring. C major ↔ A minor — they share a key signature.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The I–IV–V and the 1-4-5',
    },
    {
      kind: 'text',
      markdown:
        'The three most important chords in any key — the I, IV, and V — sit together on the circle. To find them instantly: your key is I, one step **left** is IV, one step **right** is V. This is the **1-4-5** of blues, rock, and folk. In C: C–F–G. In A: A–D–E. In G: G–C–D.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Click **G** on the circle above. G is your I, C (left) is your IV, D (right) is your V. The 1-4-5 of a blues in G is G–C–D — read straight off the circle.',
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
}
