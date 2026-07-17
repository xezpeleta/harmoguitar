/**
 * Lesson 22 — The Altered Scale & Altered Dominants
 * Source: RESEARCH.md §20
 *
 * The go-to scale for altered dominant chords (7alt, 7♭9, 7♯9, 7♭5, 7♯5, 7♭13).
 * Contains every possible alteration of a dominant chord — maximum tension,
 * all resolving by half-step into the tonic. Deepens the "altered-scale
 * shortcut" introduced in Lesson 16 (Tritone Substitution).
 */
import type { Lesson } from '$lib/content/schema'

export const alteredScale: Lesson = {
  id: 'altered-scale',
  slug: 'the-altered-scale',
  title: 'The Altered Scale',
  summary: 'Every alteration of a dominant chord in one scale — ♭9, ♯9, ♭5, ♯5 — and why they all resolve by half-step.',
  minutes: 11,
  blocks: [
    {
      kind: 'text',
      markdown:
        'When a V7 resolves to a I (or i), jazz players often **alter** it — adding ♭9, ♯9, ♭5, or ♯5 to heighten the tension. The **altered scale** is the scale that contains *all* of these alterations at once: **1 ♭9 ♯9 3 ♭5 ♯5 ♭7**. It is the go-to scale for any altered dominant chord (7alt, 7♭9, 7♯9, 7♭13) and the darkest, tensest sound in jazz harmony.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The formula',
    },
    {
      kind: 'text',
      markdown:
        'The altered scale = **the 7th mode of the melodic minor scale**. For **{{G}}7alt**, the parent melodic minor is **{{Ab}} melodic minor** ({{Ab}} {{Bb}} {{C}} {{Db}} {{Eb}} {{F}} {{G}}); its 7th mode starting on {{G}} is:',
    },
    {
      kind: 'table',
      headers: ['Degree', 'Note', 'Function'],
      rows: [
        ['1', '{{G}}', 'Root'],
        ['♭2', '{{Ab}}', '♭9'],
        ['♯2', '{{Bb}}', '♯9'],
        ['3', '{{B}}', 'Major 3rd (the defining tone)'],
        ['♯4 / ♭5', '{{Db}}', '♭5 / ♯11'],
        ['♯5 / ♭13', '{{Eb}}', '♯5 / ♭13'],
        ['♭7', '{{F}}', 'Dominant 7th'],
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'melodic-minor', root: 'Ab' },
      widgets: ['fretboard', 'staff'],
      caption: '{{Ab}} melodic minor — the parent scale of {{G}}7alt. The 7th mode (starting on {{G}}) is the altered scale. Play from {{G}} to {{G}} and you will hear every alteration.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Three ways to think about it',
    },
    {
      kind: 'list',
      items: [
        '**7th mode of melodic minor** a half-step above the root ({{G}}7alt → {{Ab}} melodic minor). This is the formal definition.',
        '**The "everything altered" scale** — built from the root with ♭9, ♯9, ♭5, ♯5, plus the 3rd and ♭7. No unaltered 5th or 9th.',
        '**The tritone-sub scale** — {{G}}7alt\'s altered scale is enharmonically the same as {{Db}} Mixolydian/Lydian dominant (the tritone sub of {{G}}7). So "play altered = play the tritone sub\'s scale." (You saw this shortcut in Lesson 16.)',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The third view is the **fastest mental shortcut** on the bandstand: if you see a {{G}}7alt and you freeze, just play {{Db}}7 material ({{Db}} Mixolydian, {{Db}} arpeggios, {{Db}} blues licks). The notes are the same. You are never more than a tritone away from the right scale.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'How it resolves — the half-step magic',
    },
    {
      kind: 'text',
      markdown:
        'Every altered note resolves by **half-step** into a chord tone of the tonic. This is why altered dominants sound so tense-and-satisfying — every tension note has a clear, close landing spot. For **{{G}}7alt → {{C}}maj7** ({{C}} {{E}} {{G}} {{B}}):',
    },
    {
      kind: 'table',
      headers: ['Altered note (G7alt)', 'Resolves to (Cmaj7)', 'Motion'],
      rows: [
        ['♭9 ({{Ab}})', '5th ({{G}})', 'down a semitone'],
        ['♯9 ({{Bb}})', '3rd ({{B}})', 'up a semitone'],
        ['♯5 / ♭13 ({{Eb}})', '3rd ({{E}})', 'up a semitone'],
        ['♭5 ({{Db}})', 'root ({{C}})', 'down a semitone'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'For a **minor tonic** ({{G}}7alt → {{C}}m7 = {{C}} {{Eb}} {{G}} {{Bb}}), the ♭9→5th and ♭5→root resolutions still apply, while ♯9 ({{Bb}}) and ♯5/♭13 ({{Eb}}) become **common tones** with {{C}}m7 (its 7th and 3rd respectively). Either way, every altered note lands close.',
    },
    {
      kind: 'widget',
      selection: { chordType: '7alt', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: '{{G}}7alt — every note is an alteration. Hit “Play progression” to hear {{D}}m7 → {{G}}7alt → {{C}}maj7 — the altered V7 resolving by half-step into the tonic.',
      play: {
        kind: 'progression',
        chords: ['Dm7', 'G7alt', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'When to use it',
    },
    {
      kind: 'list',
      items: [
        'Over any **V7 resolving to a I (or i)**, especially in ii–V–I and minor ii–V–i.',
        'When the chart says **"7alt," "7♭9," "7♯9," "7♭13,"** or **"+7♯9"**.',
        '**Not** over a static or blues tonic dominant — there the chord is not resolving, so the alterations sound wrong. Use Mixolydian instead.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The altered scale is the **7th mode of melodic minor**, but melodic minor has *seven* modes, each a distinct jazz scale (Lydian dominant, Locrian ♮2, etc.). Exploring all of them is the natural next step for advanced study — they form the backbone of chord-scale theory.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Practice tip:** learn the altered scale as "{{G}} to {{G}} from {{Ab}} melodic minor" first. Then practice resolving each altered tone into the tonic (♭9→5th, ♭5→root, ♯9→3rd, ♯5→3rd). When you can *hear* the half-step landings, you will never need to think about the formula again — your ear will guide you.',
    },
  ],
}
