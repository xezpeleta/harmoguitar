/**
 * Lesson 27 — Reharmonization & Substitutions Overview
 * Source: RESEARCH.md §26
 *
 * The art of changing the chords under a melody to create a new harmonic
 * context. A capstone lesson that ties together every technique from the
 * jazz harmony path (Lessons 15–26).
 */
import type { Lesson } from '$lib/content/schema'

export const reharmonization: Lesson = {
  id: 'reharmonization',
  slug: 'reharmonization-overview',
  title: 'Reharmonization & Substitutions',
  summary: 'The capstone: every reharmonization technique you have learned, assembled into one toolkit. When and how to change the chords.',
  minutes: 9,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Reharmonization** is the art of changing the chords under a melody to create a new — often richer or more surprising — harmonic context. Jazz musicians do it in real time. Every technique in this overview you have already learned in the preceding lessons; here we assemble them into one toolkit and ask: **when do you use each, and why?**',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The toolkit',
    },
    {
      kind: 'table',
      headers: ['Technique', 'What it does', 'Lesson'],
      rows: [
        ['**Secondary dominants**', 'Insert V7/x to tonicize a diatonic chord', 'Lesson 15'],
        ['**Tritone substitution**', 'Replace V7 with ♭II7 for chromatic bass', 'Lesson 16'],
        ['**Borrowed chords / modal mixture**', 'Pull chords from parallel minor for colour', 'Lesson 23'],
        ['**Chord-quality substitution**', 'Swap a chord for a related quality (e.g., maj7↔m7 via relative)', 'Lesson 9'],
        ['**Diminished passing chords**', 'Slide dim7 between diatonic chords for chromatic motion', 'Lesson 18'],
        ['**Planing / parallel motion**', 'Move identical chord shapes in parallel through a scale', 'Lesson 25'],
        ['**Altered dominants**', 'Add ♭9/♯9/♭5/♯5 to a V7 for maximum tension', 'Lesson 22'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'A worked example',
    },
    {
      kind: 'text',
      markdown:
        'Take a plain **ii–V–I in C**: {{D}}m7 – {{G}}7 – {{C}}maj7. Here is how each technique transforms it:',
    },
    {
      kind: 'table',
      headers: ['Technique', 'Result', 'Character'],
      rows: [
        ['Secondary dominant', '{{D}}m7 – **{{D}}7** – {{G}}7 – {{C}}maj7', 'Tonicizes the V'],
        ['Tritone sub', '{{D}}m7 – **{{Db}}7** – {{C}}maj7', 'Chromatic bass walk-down'],
        ['Back-door (borrowed)', '{{F}}m7 – **{{Bb}}7** – {{C}}maj7', 'Jazz ending, whole-step resolution'],
        ['Altered dominant', '{{D}}m7 – **{{G}}7alt** – {{C}}maj7', 'Maximum tension, half-step resolution'],
        ['Diminished passing', '{{D}}m7 – **{{F#}}dim7** – {{G}}7 – {{C}}maj7', 'Chromatic squeeze'],
        ['Stack them all', '{{D}}m7 – {{Db}}7 – **{{C}}m6** (borrowed i)', 'Dark, modern, surprising'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Hear a reharmonized ii–V–I: {{D}}m7 – {{Db}}7 (tritone sub) – {{C}}maj7. The bass walks down: {{D}} → {{Db}} → {{C}}.',
      play: {
        kind: 'progression',
        chords: ['Dm7', 'Db7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Principles',
    },
    {
      kind: 'list',
      items: [
        '**Preserve the melody** — the melody note should remain consonant (or intentionally tensional) with the new chord. The melody is the contract with the listener; the harmony is negotiable.',
        '**Preserve the function** — a sub should usually keep the chord\'s role (e.g., a tritone sub for V7 still functions as a dominant). Do not turn a V7 into a ii without a reason.',
        '**Voice-lead smoothly** — the best reharmonizations also move the inner voices gracefully. A surprising chord that voice-leads well sounds inevitable; one that jumps sounds clumsy.',
        '**More changes ≠ better** — reharmonize where it adds meaning, not everywhere. A single well-placed borrowed chord can transform a tune; reharmonizing every bar just sounds busy.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to start:** take a tune you know well (a folk song, a pop song, a standard) and try one reharmonization per phrase. Swap a IV for a iv (borrowed). Add a secondary dominant before a target. Try a tritone sub on the V7. One change at a time, listen, and keep what sounds good. Reharmonization is a muscle — it grows with use.',
    },
    {
      kind: 'heading',
      level: 2,
      text: 'Where you are now',
    },
    {
      kind: 'text',
      markdown:
        'You started with the notes on the fretboard. You learned intervals, scales, modes, triads, seventh chords, extended chords, diatonic harmony, functional harmony, the circle of fifths, progressions, cadences, the blues, and the ii–V–I. Then you went deep: secondary dominants, tritone substitution, voice leading, passing chords, comping voicings, blue notes, the minor ii–V–i, the altered scale, borrowed chords, chord-scale theory, modal jazz, and the harmonic/melodic minor modes. **You now have the complete jazz harmony toolkit.** The rest is a lifetime of playing, listening, and experimenting — the theory is behind you; the music is ahead.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Use the **Builder** to explore any chord or scale you encounter. Pick a root and type, see the formula, fretboard, staff, and intervals, and play it. The best way to internalise all of this is to *play* it — every day, in a different key, over a different tune. The theory is the map; the playing is the journey.',
    },
  ],
}
