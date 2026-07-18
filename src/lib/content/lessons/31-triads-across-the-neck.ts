/**
 * Lesson 31 — Triads Across the Neck (7 Positions)
 * Source: RESEARCH.md §32 — Javier Sánchez masterclass
 *
 * Javier's organisation principle: a single triad (e.g. G major) lives in
 * seven discrete closed-position inversions up the neck — three per octave
 * (root, 1st inv, 2nd inv) plus the octave repeats. Knowing where each
 * inversion sits breaks the "one box" trap and lets you arpeggiate or
 * comp in any register.
 */
import type { Lesson } from '$lib/content/schema'

export const triadsAcrossTheNeck: Lesson = {
  id: 'triads-across-the-neck',
  slug: 'triads-across-the-neck',
  title: 'Triads Across the Neck',
  summary: 'One triad, seven homes. Learn the three inversions per octave and you can voice or arpeggiate any chord in any register.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A triad is only three notes. But those three notes — root, 3rd, 5th — appear **all over the fretboard**, in three different orders called **inversions**. Javier Sánchez organises the neck by learning where every inversion of a triad lives, so he is never trapped in one box. This lesson maps that organisation for a {{G}} major triad; the shapes transpose to every key.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The three inversions',
    },
    {
      kind: 'text',
      markdown:
        'A triad has three notes, so it has three "stacking orders" — which note is on the bottom:',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Slash chords are inversions in disguise.** When you see **{{G}}/{{B}}** on a chart, that is a {{G}} major triad with {{B}} (the 3rd) in the bass — i.e., **1st inversion**. **{{G}}/{{D}}** is {{G}} with {{D}} (the 5th) in the bass — **2nd inversion**. The slash notation is just inversion notation by another name. Once you know this, every slash chord on a lead sheet becomes a triad shape you already have.',
    },
    {
      kind: 'table',
      headers: ['Inversion', 'Bottom note', 'G major example', 'Order (low→high)'],
      rows: [
        ['Root position', 'Root', '{{G}} {{B}} {{D}}', '1 - 3 - 5'],
        ['1st inversion', '3rd', '{{B}} {{D}} {{G}}', '3 - 5 - 1'],
        ['2nd inversion', '5th', '{{D}} {{G}} {{B}}', '5 - 1 - 3'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'The notes are the same in every inversion — {{G}} {{B}} {{D}} — but the order, and therefore the shape and the sound colour, changes. Root position sounds grounded; 1st inversion sounds slightly lifted; 2nd inversion has an open, suspended quality because the 5th is on the bottom.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Position 1 — the open triads (strings 3-2-1)',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 3, fret: 0, label: '1' },
        { string: 2, fret: 0, label: '3' },
        { string: 1, fret: 3, label: '1' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        'Open-position {{G}} triad on strings 3-2-1: {{G}} {{B}} {{G}}. This is a 2nd-inversion flavour (5th would be on the bottom in the true low voicing, but here the open strings give a root+3rd colour). The point: your very first chord, the open {{G}}, is already a triad voicing you can name and move.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 4, fret: 5, label: '1' },
        { string: 3, fret: 4, label: '3' },
        { string: 2, fret: 3, label: '5' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        'Root-position {{G}} triad, strings 4-3-2: {{G}} {{B}} {{D}}. A closed three-note shape — no open strings, so it slides anywhere. This is your mobile root-position triad.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Position 2 — 1st inversion (3rd on the bottom)',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 3, fret: 4, label: '3' },
        { string: 2, fret: 3, label: '5' },
        { string: 1, fret: 3, label: '1' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        '1st inversion {{G}} triad: {{B}} {{D}} {{G}}. The 3rd ({{B}}) is on the bottom. Notice it shares two notes with the root-position shape above — only the lowest note changed. This is how inversions connect: they overlap.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Position 3 — 2nd inversion (5th on the bottom)',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 5, fret: 5, label: '5' },
        { string: 4, fret: 5, label: '1' },
        { string: 3, fret: 4, label: '3' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        '2nd inversion {{G}} triad on strings 5-4-3: {{D}} {{G}} {{B}}, with the 5th ({{D}}) lowest. The 5th on the bottom gives the open, floating quality. Same three notes — different colour, different shape.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Up the neck — octave positions',
    },
    {
      kind: 'text',
      markdown:
        'Each of the three inversions repeats one octave higher. The shapes are identical — only the fret changes. So across the full neck you have, in principle, **three inversions × however many octaves you can reach** = roughly **seven homes** for one triad (three in the first octave, three in the second, plus the open-string version). Here is the same root-position shape, an octave up:',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 15 },
      widgets: ['fretboard'],
      voicing: [
        { string: 3, fret: 12, label: '1' },
        { string: 2, fret: 12, label: '3' },
        { string: 1, fret: 10, label: '5' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        'Root-position {{G}} triad, an octave higher: {{G}} {{B}} {{D}} on strings 3-2-1, frets 12-12-10. Same stacking order (1-3-5) as the fret-5 version, just up an octave. The neck is a repeating lattice.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 15 },
      widgets: ['fretboard'],
      voicing: [
        { string: 3, fret: 12, label: '1' },
        { string: 2, fret: 12, label: '3' },
        { string: 1, fret: 15, label: '1' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        'And the open-shape {{G}} triad, transposed up an octave to fret 12: {{G}} {{B}} {{G}}. Every open-string shape has a barred equivalent twelve frets up. The neck repeats.',
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The seven-position view.** Practise finding *all three inversions* of one triad in one octave, then slide the whole set up twelve frets and find them again. Do this for {{G}}, then {{C}}, then {{A}}. After a few keys you stop "searching" for a triad — you simply *know* which inversion is under your hand in any position, because you have mapped the lattice.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Four string sets, twelve shapes.** The fretboard has **four adjacent string sets** (strings 1-2-3, 2-3-4, 3-4-5, 4-5-6). On each string set, a triad has **three inversions** (root, 1st, 2nd). That is **4 × 3 = 12 shapes** total — not dozens. Learn one string set at a time: find all three inversions on strings 1-2-3, then move to 2-3-4, and so on. The shapes on strings 4-5-6 are identical to strings 1-2-3 (same tuning interval), so you really only learn two distinct sets of shapes. Twelve shapes, not infinite.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Minor triads are one fret away.** Once you know the 12 major triad shapes, you know the 12 minor shapes for free: **lower the 3rd by one fret** in any major triad shape, and it becomes minor. The same logic gives you diminished (lower both the 3rd and the 5th) and augmented (raise the 5th). Learn major first; the other qualities are modifications, not new shapes.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Arpeggios are triads in motion',
    },
    {
      kind: 'text',
      markdown:
        'Once the inversions are mapped, arpeggios stop being scary scale-patterns and become **triads chained together**. To arpeggiate up the neck, you play one inversion, then the nearest note of the next inversion, then the next — connecting the dots. Here is a small example: a {{G}} arpeggio ({{G}} {{B}} {{D}}) that walks up through inversions instead of staying in one box:',
    },
    {
      kind: 'widget',
      selection: { chordType: 'major', root: 'G', fretCount: 15 },
      widgets: ['fretboard'],
      voicing: [
        { string: 4, fret: 5, label: '1' },
        { string: 4, fret: 7, label: '2' },
        { string: 3, fret: 4, label: '3' },
        { string: 3, fret: 5, label: '4' },
        { string: 3, fret: 7, label: '5' },
      ],
      play: { kind: 'phrase', stagger: 0.3 },
      caption:
        'A {{G}}-arpeggio phrase: {{G}} (1) → passing {{A}} (2) → {{B}} (3) → passing {{C}} (4) → {{D}} (5). The arpeggio tones (1-3-5) are the *destination*; the scale tones (2-4) are the connective tissue. This is the arpeggio-anchor idea: arpeggio notes mark the chord, scale notes move between them.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Arpeggio as anchor, scale as connective.** When you improvise, the chord tones (the triad) are your anchors — the notes that *belong*. The scale tones between them are how you *travel* from one anchor to the next. Map the triads first; the scale fills in the gaps automatically.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why organise the neck this way',
    },
    {
      kind: 'list',
      items: [
        '**Escape the box.** A single pentatonic or scale box is a cage. Triads live everywhere; knowing them frees you to play in any register.',
        '**Comp anywhere.** Behind a soloist, you can grab a tiny triad voicing in whatever region of the neck the melody is *not* occupying, staying out of the way.',
        '**Voice-lead effortlessly.** The next chord is just the nearest inversion of the next triad — often one or two fingers move a fret, the rest stay.',
        '**Arpeggios become geography, not patterns.** You stop memorising 6-string arpeggio shapes and start *navigating* between triad inversions you already know.',
        '**Create space in the mix.** A three-note triad voicing leaves room for the bass, keys, horns, or a second guitar. Big five- and six-note grips muddy the middle register; triads cut through cleanly.',
      ],
    },
  ],
  sources: [
    {
      author: 'Javier Sánchez',
      title: 'Masterclass — Tríadas, improvisación, Gypsy Jazz',
      note: 'The systematic mapping of triad inversions across the neck (siete posiciones) and the arpeggio-as-anchor improvising concept — arpeggio tones as destinations, scale tones as connective tissue.',
    },
    {
      author: 'Samjamguitar',
      title: 'THE ULTIMATE GUIDE TO GUITAR TRIADS',
      url: 'https://www.youtube.com/watch?v=eQkfnY2sF-o',
      note: '12 triad shapes in 4 string sets (3 per set). Slash chords = inversions (G/B = 1st inv, G/D = 2nd inv). Triads as \u201cdestination points,\u201d scales as \u201croads that connect them.\u201d Minor = lower the 3rd one fret from major. Three-note voicings create space in the mix for other instruments.',
    },
    {
      author: 'Davey Jones',
      title: 'How 3 Chord Inversions Unlock Every Triad on the Guitar Neck',
      url: 'https://www.youtube.com/watch?v=vVTUWHqlG1s',
      note: 'Only 3 fundamental chord shapes on guitar (E, A, C/D) — everything else is a variation. Triads are fragments of the full CAGED barre-chord shapes. You do not need the full barre chord — play a \u201cpiece\u201d of it (the triad).',
    },
    {
      author: 'GuitarLessons365',
      title: 'Major Triad Inversions Across The Guitar Fretboard',
      url: 'https://www.youtube.com/watch?v=YD4Wn6IinMk',
      note: 'Closed-position triads (all within one octave). 4 string sets, 3 inversions each. Slash chord notation = inversions. Spelling triads (knowing the notes) is essential — not just memorising shapes. Stack triads to create larger chord forms and soloing ideas.',
    },
  ],
}
