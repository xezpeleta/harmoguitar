/**
 * Lesson 28 — Associative Voicing Inversions
 * Source: RESEARCH.md §29 (Associative Learning) + §22 (Guitar Voicings)
 *
 * The "20 chords in 5 minutes" idea from the Chema Vílchez masterclass: do
 * not learn voicings as isolated shapes. Take one chord (Cmaj7), derive its
 * four inversions on a string set, then move a note to an adjacent string to
 * spawn a whole new family — and transpose the lot up the neck. One chord
 * becomes a vocabulary, by association rather than memorisation.
 */
import type { Lesson } from '$lib/content/schema'

export const associativeVoicingInversions: Lesson = {
  id: 'associative-voicing-inversions',
  slug: 'associative-voicing-inversions',
  title: 'Associative Voicing Inversions',
  summary: 'Don’t memorise 20 grips — derive them. One Cmaj7 becomes four inversions, then a new string-set family, then every key.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You met Drop 2 and Drop 3 in the Jazz Comping Voicings lesson. Here is the *method* behind owning them: **never learn a voicing alone.** Take a single chord — say **{{C}}maj7** — and ask, "what is this same chord *with each of its tones in the bass*?" That gives you four inversions for the price of one. Then move a note onto a neighbouring string and you have a second family. Then slide the shapes up the neck. One shape has just become twenty, and you derived every one of them — you did not memorise a single new grip.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The seed: Cmaj7, root position',
    },
    {
      kind: 'text',
      markdown:
        'Here is the seed voicing — **{{C}}maj7** ({{C}} {{E}} {{G}} {{B}}) on strings 5-4-3-2, root in the bass. Four notes, no 5th-string barre, no open strings except the two we let ring. Press **Play** to hear it arpeggiate — each note rings in turn.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      strings: [5, 4, 3, 2],
      voicing: [
        { string: 5, fret: 3, label: 'R' },
        { string: 4, fret: 2, label: '3' },
        { string: 3, fret: 0, label: '5' },
        { string: 2, fret: 0, label: '7' },
      ],
      caption:
        'Cmaj7, root position (strings 5-4-3-2): {{C}} {{E}} {{G}} {{B}}, root in the bass. This is the one shape every inversion below is derived from.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Four inversions from one chord',
    },
    {
      kind: 'text',
      markdown:
        'Now put **each chord tone in the bass**, keeping the same four notes on the same string set. Same chord, four colours — because the bass note reorders the voicing and changes what the ear hears as "lowest."',
    },
    {
      kind: 'table',
      headers: ['Inversion', 'Bass note', 'Voicing (low → high)'],
      rows: [
        ['Root position', 'Root ({{C}})', '{{C}} {{E}} {{G}} {{B}}'],
        ['1st inversion', '3rd ({{E}})', '{{E}} {{G}} {{B}} {{C}}'],
        ['2nd inversion', '5th ({{G}})', '{{G}} {{B}} {{C}} {{E}}'],
        ['3rd inversion', '7th ({{B}})', '{{B}} {{C}} {{E}} {{G}}'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      strings: [5, 4, 3, 2],
      voicing: [
        { string: 5, fret: 7, label: '3' },
        { string: 4, fret: 5, label: '5' },
        { string: 3, fret: 4, label: '7' },
        { string: 2, fret: 1, label: 'R' },
      ],
      caption:
        '1st inversion — {{E}} in the bass. Same four notes, but the 3rd on the bottom gives a subtly less stable, more "leading" colour. The shape has climbed the neck from the root position.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      strings: [5, 4, 3, 2],
      voicing: [
        { string: 5, fret: 10, label: '5' },
        { string: 4, fret: 9, label: '7' },
        { string: 3, fret: 5, label: 'R' },
        { string: 2, fret: 5, label: '3' },
      ],
      caption:
        '2nd inversion — {{G}} in the bass. Higher still; the voicing is compacting as the chord tones crowd together near the top of the neck.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      strings: [5, 4, 3, 2],
      voicing: [
        { string: 5, fret: 2, label: '7' },
        { string: 4, fret: 10, label: 'R' },
        { string: 3, fret: 9, label: '3' },
        { string: 2, fret: 8, label: '5' },
      ],
      caption:
        '3rd inversion — {{B}} (the 7th) in the bass. The 7th is the most "tense" tone to sit on, so this voicing wants to resolve. Notice the bass drops low while the upper notes stay high — the shape now spans the neck.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'That is **five voicings from one chord** (root + 4 inversions), and you did not memorise a single new grip — you *derived* each one by asking "which tone is in the bass?" This is associative memory: the new shape is glued to the old one by a single changing note, so the whole set lives in your head as one idea, not five.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Move a note to a new string → a second family',
    },
    {
      kind: 'text',
      markdown:
        'Here is the trick that multiplies the vocabulary fast. Take the root-position voicing and **move its top note (the 7th, {{B}}) from string 2 up to string 1** — same pitch class, one octave higher. The chord is still {{C}}maj7, but it now lives on strings 5-4-3-**1** (string 2 is free). You have just spawned a whole second family of four inversions, identical in method to the first.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      voicing: [
        { string: 5, fret: 3, label: 'R' },
        { string: 4, fret: 2, label: '3' },
        { string: 3, fret: 0, label: '5' },
        { string: 1, fret: 7, label: '7' },
      ],
      caption:
        'Same {{C}}maj7, but the 7th ({{B}}) has jumped from string 2 to string 1 (up an octave). String 2 is now empty — free for a melody or a moving line. Apply the same "put each tone in the bass" process and you get four more inversions on this new string set.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Repeat the move on the other tones — shift the 5th onto a neighbour, then the 3rd — and each rearrangement opens another string set (5-4-3-1, 5-4-2-1, 5-3-2-1, 6-4-3-2…). **Four inversions × a handful of string sets = roughly twenty voicings, all from the one seed.** That is the "20 chords in 5 minutes" promise: not twenty things to remember, but one method applied twenty times.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Then transpose: the whole set, in every key',
    },
    {
      kind: 'text',
      markdown:
        'Every voicing above has **no open strings** in its movable form, so the entire set slides up and down the neck unchanged — one fret up and your seed is {{C#}}maj7, five frets up and it is {{F}}maj7. Use the **+/−** control to cycle the root and watch the same shapes re-locate. You are not learning twelve sets of twenty voicings; you are learning **one set of twenty, twelve places.**',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      steppers: { root: true },
      caption:
        'Cycle the root with **+/−** and the whole Cmaj7 family re-colours for the new key — same shapes, new fret. This is why the neck is not 144 chords to memorise but a handful of movable maps.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The principle, not the list',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'Do not try to learn all twenty voicings at once — that is exactly the rote, mechanical trap the next lesson warns against. Learn **the seed and the two moves** (rotate the bass tone; hop a note to a neighbour). Then *generate* inversions on demand, on the string set you happen to need, in the key that is playing. The point of association is that you can rebuild the list yourself — so you never have to store it whole.',
    },
  ],
}
