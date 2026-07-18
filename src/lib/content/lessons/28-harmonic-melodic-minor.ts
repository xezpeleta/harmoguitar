/**
 * Lesson 26 — Harmonic & Melodic Minor: The Jazz Toolkits
 * Source: RESEARCH.md §25
 *
 * Beyond the major scale and its modes, jazz relies heavily on harmonic minor
 * and melodic minor and their modes. Each mode fits a specific chord type —
 * together they form the core altered-harmony toolkit.
 */
import type { Lesson } from '$lib/content/schema'

export const harmonicMelodicMinor: Lesson = {
  id: 'harmonic-melodic-minor',
  slug: 'harmonic-and-melodic-minor-modes',
  title: 'Harmonic & Melodic Minor Modes',
  summary: 'Two scales, fourteen modes, and the jazz secret weapon: melodic minor has no "avoid" notes.',
  minutes: 16,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You know the major scale and its seven modes. But jazz relies just as heavily on two more scales and their modes: **harmonic minor** and **melodic minor**. Each has seven modes, and several of them are essential jazz vocabulary — they cover minor tonics, altered dominants, half-diminished chords, and tritone-sub sounds that the major-scale modes simply cannot.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Three scales, twenty-one modes.** The major scale (7 modes), melodic minor (7 modes), and harmonic minor (7 modes) give you **21 modes** total. Add the diminished scale and you have enough to play over virtually any jazz standard based on functional harmony. You do not need to learn all 21 at once — but knowing they exist, and that they all derive from just three parent scales, demystifies the whole landscape.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Harmonic minor',
    },
    {
      kind: 'text',
      markdown:
        'Harmonic minor = **1 2 ♭3 4 5 ♭6 7** — the natural minor scale with a **raised 7th** (the leading tone). It exists to give the minor key a V7 that actually resolves (with a tritone and leading tone). Its most important mode is the **5th: Phrygian dominant** — the "Spanish/flamenco" sound over a V7 resolving to a minor tonic.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Same arpeggio, different colour.** Harmonic minor and melodic minor share the same four-note arpeggio (root, ♭3, 5, 7) — the difference is only in the **upper extensions and passing tones**. If you improvise using just the arpeggio, listeners cannot tell which scale you intend. It is only when you emphasise the *characteristic notes* (the ♭6 in harmonic minor, the 6 in melodic minor) that the true flavour emerges. Each harmonic minor mode has a **characteristic 4-note grouping** (♭6–7–1–♭2: minor 2nd, minor 3rd, minor 2nd) that signals to the listener: \u201cthis is harmonic minor, not natural or melodic.\u201d Flamenco music is built on these modes.',
    },
    {
      kind: 'table',
      headers: ['Mode', 'Degree', 'Formula', 'Use'],
      rows: [
        ['Harmonic minor', 'I', '1 2 ♭3 4 5 ♭6 7', 'minor tonic with leading tone'],
        ['**Phrygian dominant**', 'V', '1 ♭2 3 4 5 ♭6 ♭7', 'V7 → minor tonic (flamenco, "Spanish")'],
        ['Locrian ♮6', 'VII', '1 ♭2 ♭3 4 ♭5 6 ♭7', 'rare; over vii° in minor'],
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'harmonic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A harmonic minor — note the raised 7th ({{G#}}). The 5th mode (starting on {{E}}) is E Phrygian dominant: the V7 sound that resolves to Am.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Phrygian dominant** (5th mode of harmonic minor) is the scale over a V7 resolving to a **minor** tonic — e.g., {{E}}7 → {{A}}m. It has a ♭2 ({{F}} in E) that gives the dark, "Spanish" flavour. You already heard it in the minor ii–V–i lesson — it is an alternative to the altered scale over the V7.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Melodic minor (jazz minor)',
    },
    {
      kind: 'text',
      markdown:
        'In jazz, **melodic minor** is played the same ascending and descending: **1 2 ♭3 4 5 6 7** — a natural minor with a raised 6th *and* 7th. (In classical music, you descend with natural minor — jazz ignores that rule.) It is simply a **major scale with a flatted 3rd**. All **seven** of its modes are used in jazz, and four of them are essential:',
    },
    {
      kind: 'table',
      headers: ['Mode', 'Degree', 'Name / Use'],
      rows: [
        ['**Melodic minor**', 'I', 'minor tonic (i m6); "jazz minor"'],
        ['Dorian ♭2', 'II', 'sus♭9 chords; rare'],
        ['Lydian augmented', 'III', '+maj7 chords; rare'],
        ['**Lydian dominant**', 'IV', '7♯11, tritone subs, blues IV7'],
        ['Mixolydian ♭6', 'V', 'rare dominant'],
        ['**Locrian ♮2**', 'VI', 'm7♭5 (less dissonant than Locrian)'],
        ['**Altered (super Locrian)**', 'VII', '7alt, altered dominants (Lesson 22)'],
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'melodic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A melodic minor — the "jazz minor." Its 7th mode (starting on {{G#}}) is the altered scale. Its 4th mode (starting on {{D}}) is Lydian dominant.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why melodic minor is a jazz secret weapon',
    },
    {
      kind: 'text',
      markdown:
        'Every mode of melodic minor contains the **perfect 4th and perfect 5th** — there are **no "avoid" notes.** This is why melodic minor modes are so usable for improvisation: there is no "wrong" note, only choices of colour. By contrast, the major-scale modes have avoid notes (the 4 in Ionian, the 11 in Mixolydian, etc.). When a jazz player wants maximum freedom over a chord, they reach for a melodic minor mode.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why melodic minor is more popular than harmonic minor.** The answer is **avoid notes**. Melodic minor has *none* — every non-chord tone is a usable upper extension you can sit on without clashing. Harmonic minor *usually has at least one* avoid note per mode. This means you can learn one or two melodic minor modes and superimpose them across many chords; with harmonic minor, you must be more careful. The freedom from avoid notes is the single biggest reason melodic minor dominates jazz improvisation.',
    },
    {
      kind: 'list',
      items: [
        '**Over a minor tonic (i m6):** melodic minor itself (or Dorian).',
        '**Over a 7♯11 or tritone-sub dominant:** Lydian dominant (4th mode).',
        '**Over a m7♭5 (half-diminished):** Locrian ♮2 (6th mode) — less dissonant than plain Locrian.',
        '**Over an altered dominant (7alt):** the altered scale (7th mode) — covered in Lesson 22.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The four **bolded** modes — melodic minor, Lydian dominant, Locrian ♮2, and Altered — are the core of the altered-harmony toolkit. Together they cover every altered chord type you will meet on a jazz gig. Learn the parent scale (melodic minor) in all 12 keys, and the modes come for free — you just start from a different degree.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Practical shortcut:** you do not need to memorise all 14 modes at once. Start with the two you already know — **Dorian** (major-scale mode, covered in Lesson 5) and **Altered** (Lesson 22). Then add **Lydian dominant** (tritone-sub dominants) and **Phrygian dominant** (V7 → minor). That is four modes that cover 90% of jazz gigs. Add the rest as you encounter them.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The "new CEO" analogy.** Think of a scale as a company with seven employees. The mode is determined by **who is the CEO** (the root). Same seven people, same office — but when a different person becomes CEO, the whole company\'s direction changes. {{C}} Ionian and {{A}} Aeolian are the same seven notes, but when {{C}} is CEO the vibe is bright and major; when {{A}} is CEO the vibe is dark and minor. Every mode of every parent scale works this way: the notes do not change, only the leadership does.',
    },
  ],
  sources: [
    {
      author: 'Noah Kellman',
      title: 'The Melodic Minor Modes and What Chords To Use Them For',
      url: 'https://www.youtube.com/watch?v=xun4sCi0tIE',
      note: 'Dictionary of all 7 melodic minor modes. Melodic minor = major scale with ♭3 only; same up and down in jazz (unlike classical). Goes with minor-major 7. Each mode mapped to a specific chord type.',
    },
    {
      author: 'Richie Zellon',
      title: 'Using the Harmonic Minor Modes in Jazz',
      url: 'https://www.youtube.com/watch?v=cPYqF6vsLeQ',
      note: '21 modes from 3 scales + diminished = enough for any standard. Harmonic & melodic minor share the same arpeggio (root, ♭3, 5, 7) — difference is only in upper extensions. Melodic minor has NO avoid notes (every non-chord tone is a usable extension); harmonic minor usually has at least one avoid note — this is WHY melodic minor is more popular. Each harmonic minor mode has a characteristic 4-note grouping (♭6-7-1-♭2). Flamenco is built on these modes.',
    },
    {
      author: 'Jason Zac (Nathaniel School of Music)',
      title: 'All 21 Modes Explained: Major, Melodic Minor & Harmonic Minor',
      url: 'https://www.youtube.com/watch?v=-H3Mog6KUdw',
      note: 'All 21 modes (7+7+7) with parent scale, formula, quality, and best-fit chord. The \u201cnew CEO\u201d analogy: same seven notes, but a different root (leader) changes the entire direction and vibe. Practice in multiple keys, not just C.',
    },
  ],
}
