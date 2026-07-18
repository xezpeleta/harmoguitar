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
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You met Drop 2 and Drop 3 in the Jazz Comping Voicings lesson. Here is the *method* behind owning them: **never learn a voicing alone.** Take a single chord — say **{{C}}maj7** — and ask, "what is this same chord *with each of its tones in the bass*?" That gives you four inversions for the price of one. Then move a note onto a neighbouring string and you have a second family. Then slide the shapes up the neck. One shape has just become twenty, and you derived every one of them — you did not memorise a single new grip.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Where the name "Drop 2" comes from.** It is a literal arranging term. Start with four chord tones stacked in close position (all within one octave). Take the **second-highest note** and drop it down an octave. That one move spreads the voicing out so the notes sit comfortably under the guitar hand — taking into account the tuning and the span your fingers can reach. The guitar cannot play close-position 7th chords easily; Drop 2 makes complex harmony *playable*. The same logic gives Drop 3 (drop the third-highest note) and Drop 2-and-4.',
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
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**One voicing, multiple jobs.** Here is the power of thinking in voicings rather than chord names: the *same four notes* can serve as several different chords depending on what the bass is doing. A **{{C}}m6** voicing ({{C}} {{Eb}} {{G}} {{A}}) is also an **{{A}}m7♭5** (start from {{A}}) and an **{{F}}7** altered (with {{F}} in the bass). You do not learn three chords — you learn *one grip* and repurpose it. This is why jazz guitarists seem to have an endless vocabulary: they are recycling a small set of shapes across multiple harmonic functions.',
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
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Start with one voicing per chord — and make music immediately.** The biggest mistake is to drill all inversions for weeks as a technical exercise and never use them. Instead, learn **one** voicing for a chord, then immediately play it on a real tune. Only add the next inversion once the first is in your ears and your comping. You do not need every inversion to make music — you need *one*, used well, to start. The rest follow because you connect each new shape to the one before it.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Think about the melody note.** A voicing is not just a shape — its *top note* is the melody. When you choose an inversion, you are choosing which chord tone sits on top, and that note is what the listener hears most. A {{C}}maj7 with {{B}} on top sounds like a modal, floating line; the same chord with {{C}} on top sounds resolved and final. Practise inversions with a bass drone underneath and listen to how each top note changes the colour. You are not learning shapes — you are learning *sounds*.',
    },
  ],
  sources: [
    {
      author: 'Chema Vílchez',
      title: 'Master Class: cómo estudiar y salir de la mecanicidad',
      url: 'https://www.youtube.com/watch?v=6ccY37fyxVo',
      note: 'The “20 chords in 5 minutes” idea — deriving ~20 voicings from one Cmaj7 via inversions + string-set moves.',
    },
    {
      author: 'Berklee Online',
      title: 'Guitar Lesson: Drop-2 Voicings',
      url: 'https://www.youtube.com/watch?v=g1wrLeR7mDA',
      note: 'Drop 2 is a literal arranging term: take the 2nd-highest note of a close-position chord and drop it down an octave. This spreads the voicing so it is playable on guitar (tuning + hand reach). Demonstrates the four inversions of C7 (root, 1st with 3rd in bass, 2nd with 5th, 3rd with 7th).',
    },
    {
      author: 'Jens Larsen',
      title: 'How To Learn Drop 2 Jazz Chords The Right Way',
      url: 'https://www.youtube.com/watch?v=kgt2WzhYUMQ',
      note: 'Don\'t drill all inversions for weeks — start using them immediately on a real song (Solar). With 3 voicing types you can play most jazz. One voicing serves multiple functions: Cm6 = Am7♭5 = F7 altered (same notes, different bass). Associate new voicings with ones you already know (e.g., a campfire chord) to remember them. Start with one voicing per chord, make music, then add more.',
    },
    {
      author: 'Jens Larsen',
      title: 'Chord Inversions on Guitar - How to Learn, Memorize and Use',
      url: 'https://www.youtube.com/watch?v=Hmzg2nChgHc',
      note: 'The problem: people learn inversions but can\'t use them in playing. Solution: take ONE voicing at a time and connect it to what you already play. You need to hear what it sounds like, not just know the shape. Think about the melody note (top note) — e.g., ♭7 on top = modal minor sound. Practise with a bass drone to hear how voicings connect. Build vocabulary slowly.',
    },
  ],
}
