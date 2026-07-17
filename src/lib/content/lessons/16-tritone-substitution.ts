/**
 * Lesson 16 — Tritone Substitution
 * Source: RESEARCH.md §16
 *
 * Replacing a V7 with another dominant a tritone away — the "evil twin" that
 * shares the guide tones. Creates the chromatic descending bass that defines
 * the jazz sound. Mirrors the "sustitución de tritono" section of the Félix
 * Santos class (Eb7 in place of A7, walking down to D).
 */
import type { Lesson } from '$lib/content/schema'

export const tritoneSubstitution: Lesson = {
  id: 'tritone-substitution',
  slug: 'tritone-substitution',
  title: 'Tritone Substitution',
  summary: 'The V7\'s "evil twin" a tritone away — same guide tones, a chromatic descending bass.',
  minutes: 9,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Tritone substitution** is the trick that makes a ii–V–I sound instantly "jazzy." You replace a dominant 7 chord with **another dominant 7 whose root is a tritone (6 semitones / 3 whole steps) away**. The classic: swap {{G}}7 for {{Db}}7 in a ii–V–I → {{D}}m7 – **{{Db}}7** – {{C}}maj7.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why it works — the shared guide tones',
    },
    {
      kind: 'text',
      markdown:
        'A dominant 7 is defined by its **guide tones**: the 3rd and the 7th. Compare {{G}}7 with its tritone sub {{Db}}7:',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Root', '3rd', '7th'],
      rows: [
        ['{{G}}7', '{{G}}', '{{B}}', '{{F}}'],
        ['{{Db}}7', '{{Db}}', '{{F}}', '{{Cb}} (= {{B}})'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'The **3rd and 7th are the same two notes, just swapped.** {{G}}7\'s 3rd ({{B}}) is {{Db}}7\'s 7th ({{Cb}}); {{G}}7\'s 7th ({{F}}) is {{Db}}7\'s 3rd. Because the guide tones are identical, the two chords serve the same harmonic function — they both want to resolve to {{C}}. The roots ({{G}} and {{Db}}) are a tritone apart, which splits the octave exactly in half, so either root works with those guide tones.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the two dominants',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 — the natural V7 of C. Guide tones {{B}} (3rd) and {{F}} (7th).',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'Db' },
      widgets: ['fretboard', 'staff'],
      caption: 'Db7 — the tritone sub. Same guide tones ({{F}} now the 3rd, {{Cb}}/{{B}} now the 7th). Resolves to C just as well.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What it sounds like — the descending bass',
    },
    {
      kind: 'text',
      markdown:
        'Instead of the roots climbing {{D}} – {{G}} – {{C}} (up a 4th, up a 4th), they now slide **{{D}} – {{Db}} – {{C}}** — a smooth chromatic descent. This is the famous **"2–♭2–1"** bass line, sleek and modern. The tritone sub gives you the same resolution with a chromatic walk-down instead of a circle-of-fifths hop.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The classical ancestor is the **Neapolitan sixth** — a ♭II approaching I. Tritone substitution is the jazz version of that same move, dressed up as a dominant.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The video\'s example',
    },
    {
      kind: 'text',
      markdown:
        'Félix Santos shows this with the dominant of {{D}}. The natural V7 of {{D}} is **{{A}}7** ({{A}} {{C#}} {{E}} {{G}}); its tritone sub is **{{Eb}}7** ({{Eb}} {{G}} {{Bb}} {{Db}}). So instead of `{{A}}7 → {{D}}`, he plays `{{Eb}}7 → {{D}}` — the bass walks down a semitone ({{Eb}} → {{D}}) instead of jumping up a fourth ({{A}} → {{D}}). Same guide tones, just swapped: {{A}}7 has {{C#}} (3rd) & {{G}} (7th); {{Eb}}7 has {{G}} (3rd) & {{Db}} (7th, = {{C#}}).',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'Eb' },
      widgets: ['fretboard', 'staff'],
      caption: 'Eb7 — the tritone sub of A7. Both resolve to D. Play Eb7 → Dmaj7 and feel the half-step bass.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dmaj7 — the resolution. A7 → Dmaj7 (diatonic) vs Eb7 → Dmaj7 (tritone sub) — same target, different journey.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'When to use it',
    },
    {
      kind: 'list',
      items: [
        '**Any V7 (or ii–V) resolving down a fifth** can have its V7 swapped for the tritone sub. The result is more chromatic and "modern."',
        '**Turnarounds** love it: I–♭III7–♭VI7–♭II7 is a fully tritone-subbed I–vi–ii–V, with a bass that walks down the whole way.',
        '**Sub the ii too:** instead of {{D}}m7–{{G}}7, use {{Ab}}m7–{{Db}}7 (the tritone-sub ii–V) for a completely chromatic approach.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The altered-scale shortcut',
    },
    {
      kind: 'text',
      markdown:
        'Here is a beautiful shortcut. The **altered scale** over {{G}}7 (the scale with ♭9, ♯9, ♭5, ♯5, ♭13) is *enharmonically the same notes* as {{Db}} Mixolydian — the scale of the tritone sub. So jazz teachers say: **"playing altered over the V7 is the same as playing the tritone-sub dominant\'s scale."** The two ideas are two views of one sound.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'You do not have to choose between the natural V7 and the sub — **you can alternate them, or even play both** (e.g. {{D}}m7 – {{G}}7 – {{Db}}7 – {{C}}maj7) for an extra chromatic squeeze. The descending bass keeps the motion smooth.',
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The chromatic descending bass this produces is exactly the **walking bass** sound — and walking bass lines are built from the same ingredients: inversions and passing chords. That is the next idea.',
    },
  ],
}
