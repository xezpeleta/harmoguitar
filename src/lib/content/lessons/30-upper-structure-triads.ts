/**
 * Lesson 30 — Upper Structure Triads
 * Source: RESEARCH.md §32 — Javier Sánchez masterclass
 *
 * Javier's key insight for complex chords: for Cmaj7(9), you don't need a
 * 5-6 note shape. If the bassist covers the root, just play the triad built
 * on the 3rd — the triad you already know IS the upper structure of the
 * complex chord. And the quality flips: a major chord's upper structure is
 * a minor triad, and vice versa.
 */
import type { Lesson } from '$lib/content/schema'

export const upperStructureTriads: Lesson = {
  id: 'upper-structure-triads',
  slug: 'upper-structure-triads',
  title: 'Upper Structure Triads',
  summary: 'Cmaj9 too big? If the bass has the root, your triad on the 3rd IS the chord. The shapes you already know, reused.',
  minutes: 13,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Here is a problem every jazz guitarist hits: the chart says **{{C}}maj9**, and you are hunting for a five- or six-note shape that covers every extension. Your hand stretches, the voicing is muddy, and you still missed the 11th. Javier Sánchez offers a liberating shortcut: **you don\'t need all the notes.** If the bassist (or a pianist, or your own thumb) is covering the root, the chord you need to play is much smaller than you think.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The upper structure = the triad on the 3rd',
    },
    {
      kind: 'text',
      markdown:
        'A **{{C}}maj9** is five notes: {{C}} {{E}} {{G}} {{B}} {{D}}. But the {{C}} is the root — let the bass handle it. What is left? {{E}} {{G}} {{B}} {{D}}. That is an **{{E}}m7** chord. So over a {{C}} bass, playing an **{{E}}m7** gives you the *exact* upper structure of {{C}}maj9 — the same four notes, nothing missing, nothing extra. You already know Em7. You just learned Cmaj9 for free.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**A complex chord is two simpler chords stacked.** This is the easiest way to think about upper structures: every extended chord is **two triads combined**. {{C}}maj7 = {{C}} major + {{E}}m (up a major 3rd). {{C}}maj9 = {{C}} major + {{G}} major (up a 5th). {{C}}maj11 = {{C}} major + {{D}} diminished (down a half-step from the next third). The root triad gives the foundation; the upper triad gives the colour. Once you see a chord symbol as *two triads*, the fretboard opens up — you are not searching for a six-note grip, you are placing two shapes you already know.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj9', root: 'C', fretCount: 12 },
      widgets: ['fretboard', 'staff'],
      caption:
        '{{C}}maj9 — all five notes: {{C}} {{E}} {{G}} {{B}} {{D}}. The root {{C}} is in blue (the bassist\'s job). The other four — {{E}} {{G}} {{B}} {{D}} — are the upper structure. Notice they spell {{E}}m7.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'E', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 5, fret: 7, label: '3' },
        { string: 4, fret: 5, label: '5' },
        { string: 3, fret: 4, label: '7' },
        { string: 2, fret: 3, label: '9' },
      ],
      play: { kind: 'phrase', stagger: 0.4 },
      caption:
        'The same four notes as an {{E}}m7 grip: {{E}} {{G}} {{B}} {{D}}. Press **Play** — over a {{C}} bass, this IS {{C}}maj9. Same chord, four notes, no stretch, no mud. The triad (and 7th) you already know is the upper structure of the complex chord.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The triad is even smaller',
    },
    {
      kind: 'text',
      markdown:
        'Javier goes further: you don\'t even need the 7th. For **{{C}}maj7(9)**, he says, just play the **{{E}}m triad** — {{E}} {{G}} {{B}}. Three notes. Over a {{C}} bass, that is {{C}}maj7 (the 9th, {{D}}, is colour you can add or leave to the pianist). The triad on the 3rd degree of the chord *is* the essential upper structure: 3rd, 5th, 7th. Every complex chord reduces to a triad you already have under your fingers.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C', fretCount: 12 },
      widgets: ['fretboard', 'staff'],
      caption:
        '{{C}}maj7 = {{C}} {{E}} {{G}} {{B}}. Drop the root {{C}} and the upper structure is {{E}} {{G}} {{B}} — an {{E}}m triad. Three notes, one shape, the whole chord.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The quality flips',
    },
    {
      kind: 'text',
      markdown:
        'Here is the beautiful symmetry at the heart of this. The triad you play is built on the **3rd** of the chord — and its quality **flips** relative to the chord:',
    },
    {
      kind: 'table',
      headers: ['Chord', 'Notes', '3rd degree', 'Upper-structure triad', 'Over root bass'],
      rows: [
        ['{{C}}maj7', '{{C}} {{E}} {{G}} {{B}}', '{{E}}', '**{{E}}m** (minor)', '{{C}}maj7'],
        ['{{C}}7', '{{C}} {{E}} {{G}} {{Bb}}', '{{E}}', '**{{E}}°** (diminished)', '{{C}}7'],
        ['{{C}}m7', '{{C}} {{Eb}} {{G}} {{Bb}}', '{{Eb}}', '**{{Eb}}** (major)', '{{C}}m7'],
        ['{{C}}maj9', '{{C}} {{E}} {{G}} {{B}} {{D}}', '{{E}}', '**{{E}}m7**', '{{C}}maj9'],
      ],
    },
    {
      kind: 'text',
      markdown:
        'A **major** chord (major 3rd) gives a **minor** triad on the 3rd. A **minor** chord (minor 3rd) gives a **major** triad. A **dominant** 7 gives a **diminished** triad. The flip is not coincidence — it is geometry. The 5th of the original chord is a perfect 5th above the root, which is a **minor 3rd** above a major 3rd, and a **major 3rd** above a minor 3rd. The interval from the 3rd to the 5th determines the triad quality, and it is always the opposite of the chord\'s own third.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the flip: C7 and Cm7',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 5, fret: 7, label: '3' },
        { string: 4, fret: 5, label: '5' },
        { string: 3, fret: 3, label: '♭7' },
      ],
      play: { kind: 'phrase', stagger: 0.4 },
      caption:
        '{{C}}7 upper structure = {{E}}° triad: {{E}} {{G}} {{Bb}} (3, 5, ♭7). Over a {{C}} bass, these three notes ARE {{C}}7. The major chord\'s upper structure is a diminished triad — the flip.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 5, fret: 6, label: '♭3' },
        { string: 4, fret: 5, label: '5' },
        { string: 3, fret: 3, label: '♭7' },
      ],
      play: { kind: 'phrase', stagger: 0.4 },
      caption:
        '{{C}}m7 upper structure = {{Eb}} major triad: {{Eb}} {{G}} {{Bb}} (♭3, 5, ♭7). Over a {{C}} bass, three notes give you {{C}}m7. The minor chord\'s upper structure is a major triad — the flip, confirmed.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Compare the two grips above side by side.** The {{C}}7 shape (E° triad) and the {{C}}m7 shape ({{Eb}} triad) differ by exactly one fret on one string — the 3rd, {{E}} → {{Eb}}. That single half-step is the entire difference between major and minor. This is why upper-structure thinking is so powerful: the shapes are tiny, the differences are legible, and your ear learns the colour of each chord quality one move at a time.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'From the 5th, too',
    },
    {
      kind: 'text',
      markdown:
        'The 3rd is not the only option. The triad built on the **5th** of the chord gives you 5, 7, 9 — the extensions. Over a {{C}}maj9, a **{{G}}** triad ({{G}} {{B}} {{D}}) spells the 5, 7, and 9. Combine that with a bassist on the root and you have the whole chord. Different inversions and different starting degrees let you voice the *same* chord many ways — each emphasising a different colour tone — without ever playing more than three notes.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Invert the upper structure triad for different colours.** The same triad in different inversions puts a different note on top — and the top note is what the ear hears as the melody of the voicing. {{E}}m over {{C}} bass: root position ({{E}} on top) sounds one way; 1st inversion ({{G}} on top) sounds another; 2nd inversion ({{B}} on top) sounds a third way. Same three notes, three distinct colours. This is how jazz pianists get so much variety from the same chord symbol — they are not changing the chord, just flipping the upper structure.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Upper structures and chord-scale pairings.** Which triad works as an upper structure depends on the **chord-scale pairing** — the chord plus the scale you pair it with. A {{C}}maj7 as the I takes {{C}} Ionian; as the IV, it takes {{C}} Lydian. Each scale contains different notes, so different triads become available. The notes in the scale (but not in the chord) are called **tensions** — and tensions are classified as **avoid** (creates a ♭9 above a guide tone, destroying the sound) or **non-avoid** (adds colour without clashing). A valid upper structure triad must contain at least one non-avoid tension. This classification system tells you *why* certain triads work and others do not — it is not guesswork.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The takeaway from Javier:** stop hunting for giant shapes. Find the triad (or 7th chord) on the 3rd, the 5th, or the 7th of the chord — the shapes you already know — and let the bass carry the root. Every complex chord is a small chord hiding inside it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why this matters',
    },
    {
      kind: 'list',
      items: [
        'Fewer notes, clearer sound. Three notes never mud. Five-note grips on the middle strings often do.',
        'Mobility. A three-note triad moves around the neck fast — perfect for comping behind a soloist.',
        'Voice-leading made easy. When you think in triads, the next chord is just the nearest inversion of the next triad — the voice-leading solves itself.',
        'It reframes "extensions" as "triads you already know." The scary chord symbol {{C}}maj9 becomes the friendly word "{{E}}m7."',
      ],
    },
  ],
  sources: [
    {
      author: 'Javier Sánchez',
      title: 'Masterclass — Tríadas, improvisación, Gypsy Jazz',
      note: 'The "triada sobre el bajo" idea — playing a triad on the 3rd (or 5th) over a root bass to voice a complex chord with three notes instead of five or six. The quality flips: a major chord\'s upper structure is a minor triad, and vice versa.',
    },
    {
      author: 'Rick Beato',
      title: 'Upper Structure Triads and Seventh Chords - Explained',
      url: 'https://www.youtube.com/watch?v=06Db12K8gzg',
      note: 'Upper structures start at the 7th — build the chord in thirds (1-3-5-7-9), then find triads above the root. For Cmaj7: G major (5-7-9), D major (9-♯11, Lydian), B minor (7-9-11). The upper structure triads of Cmaj7 are the I-IV-V of G major (the Lydian parent). Can be played melodically or harmonically.',
    },
    {
      author: 'mDecks Music',
      title: 'How to Play Upper Structure Triads? Jazz Piano Chord Voicings',
      url: 'https://www.youtube.com/watch?v=J8NmmG08M-k',
      note: 'Upper structure = left hand basic chord + right hand triad containing at least one tension. Chord-scale pairing concept: which triad works depends on the scale paired with the chord. Tensions classified as avoid (♭9 above a guide tone) vs non-avoid. "Like a painter discovering a new colour."',
    },
    {
      author: 'Piano Lesson with Warren',
      title: 'Upper Structure Triads - Easy Method For Learning Extended Chords',
      url: 'https://www.youtube.com/watch?v=PiGV63PDY9w',
      note: 'A complex chord = two simpler triads stacked: Cmaj7 = C + Em (up a 3rd), Cmaj9 = C + G (up a 5th), Cmaj11 = C + dim (down a half-step). Inverting the upper structure triad gives different voicing colours from the same chord symbol.',
    },
  ],
}
