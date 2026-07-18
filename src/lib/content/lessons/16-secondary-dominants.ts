/**
 * Lesson 15 — Secondary Dominants
 * Source: RESEARCH.md §15
 *
 * The first step into chromatic harmony: tonicizing a chord other than the I
 * by preceding it with its own V7. Mirrors the "dominantes secundarias"
 * concept from the Félix Santos class (turning a diatonic minor into a
 * dominant to push toward its target, while staying inside the same harmonic
 * region).
 */
import type { Lesson } from '$lib/content/schema'

export const secondaryDominants: Lesson = {
  id: 'secondary-dominants',
  slug: 'secondary-dominants',
  title: 'Secondary Dominants',
  summary: 'Giving every chord its own V7 — the simplest way to add chromatic pull and forward motion.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'So far every chord you have played came from one scale — **diatonic** harmony. A **secondary dominant** breaks that rule on purpose: it borrows a single note from outside the key to create a *temporary* leading tone that pushes toward a target chord. It is the lightest, most musical kind of chromaticism — and the gateway to the jazz sounds in the lessons that follow.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The rule',
    },
    {
      kind: 'text',
      markdown:
        '**Every major or minor chord in the key can be preceded by its own V7.** That borrowed V7 is the "secondary dominant," written **V7/x** ("five of x"). It tonicizes — temporarily points at — the target chord x, then resolves to it exactly as a normal V7→I would.',
    },
    {
      kind: 'text',
      markdown: 'In **C major**, the secondary dominants for each diatonic target are:',
    },
    {
      kind: 'table',
      headers: ['Target', 'Its V7 (secondary dominant)', 'Written', 'Borrowed note'],
      rows: [
        ['ii ({{D}}m)', 'A7 → {{D}}m', 'V7/ii', '{{C#}} (leading tone to {{D}})'],
        ['IV ({{F}})', 'C7 → {{F}}', 'V7/IV', '{{Bb}} (♭7 of C7)'],
        ['V ({{G}})', 'D7 → {{G}}', 'V7/V', '{{F#}} (leading tone to {{G}})'],
        ['vi ({{A}}m)', 'E7 → {{A}}m', 'V7/vi', '{{G#}} (leading tone to {{A}})'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why it works',
    },
    {
      kind: 'list',
      items: [
        'A secondary dominant borrows **one note** from outside the key to build a temporary leading tone that pulls toward its target.',
        'The **target chord is still diatonic**, so the listener\'s ear accepts the detour and returns home — it is "chromatic spice" that intensifies the arrival.',
        'The resolution is the same V7→I motion you already know (the tritone in the V7 collapses into the target), just pointed at a different chord.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear it: V7/vi',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'E' },
      widgets: ['fretboard', 'staff'],
      caption: 'E7 — the V7/vi in C. It borrows {{G#}} to pull toward {{A}}m. Play E7, then follow with Am.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'Am — the vi, now “tonicized.” Hit “Play progression” to hear E7 → Am7 — a mini V7→I inside the key of C.',
      play: {
        kind: 'progression',
        chords: ['E7', 'Am7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The video\'s example (in A major)',
    },
    {
      kind: 'text',
      markdown:
        'Félix Santos demonstrates this in **A major**. The diatonic iii is {{C#}}m, and the vi is {{F#}}m. Turn that iii into a dominant — **{{C#}}7** — and it becomes the V7/vi, pushing hard toward {{F#}}m. You have borrowed one note ({{E#}}/{{F}}, the leading tone to {{F#}}) without leaving the key.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Notice the function: even though {{C#}}7 is "outside" the scale, it still lives in the **tonic region** you learned in the Functional Harmony lesson. A secondary dominant does not change the harmonic *function* of its target — it just makes the arrival louder. The regions (tonic / subdominant / dominant) still hold; you are intensifying motion *within* them.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Chaining them: forward motion',
    },
    {
      kind: 'text',
      markdown:
        'Secondary dominants chain beautifully, because each one resolves down a 5th to the next. The plain turnaround **I–vi–ii–V** becomes:',
    },
    {
      kind: 'text',
      markdown: '**I – V7/vi – V7/ii – V** = {{C}} – **{{E}}7** – **{{A}}7** – {{D}}m – {{G}}7',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A7 — the V7/ii in C. Resolves to Dm. Hit “Play progression” for the full chain: {{C}}maj7 → {{E}}7 → {{A}}7 → {{D}}m7 → {{G}}7 — each dominant falls a 5th into the next.',
      play: {
        kind: 'progression',
        chords: ['Cmaj7', 'E7', 'A7', 'Dm7', 'G7'],
        tempo: 130,
        beatsPerChord: 1,
      },
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Hear the momentum? Every chord is now a dominant resolving to the next. That cascading V7→x→V7→y sound is the signature of bebop and standards. The roots walk down in 5ths (or up in 4ths) — the same circle-of-fifths motion that makes the ii–V–I feel so smooth.',
      },

    {
      kind: 'heading',
      level: 3,
      text: 'ii–V of a target (auxiliary cadences)',
    },
    {
      kind: 'text',
      markdown:
        'You can precede a target with a full **ii–V** in its key, not just the V7. To approach IV ({{F}}) in C, play **{{G}}m7–{{C}}7–{{F}}** — the ii–V of F. This is everywhere in jazz (e.g. bar 4 of a jazz blues, setting up the IV).',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'How to solo over a secondary dominant',
    },
    {
      kind: 'list',
      items: [
        '**For the brief moment it lasts**, treat the secondary dominant as a real V7 of its target — arpeggiate it, or play a Mixolydian (or altered) scale rooted on it.',
        '**Target the 3rd and 7th** (the guide tones) — they define the chord and voice-lead into the next one almost automatically.',
        '**Or just play the target chord\'s scale** and lean on the borrowed leading tone — the ear forgives a lot when the resolution is strong.',
      ],
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Try it: comp {{C}} – {{E}}7 – {{A}}m – {{F}}. The {{E}}7 is the only non-diatonic chord, but it makes the progression sound far more "jazzy" than the diatonic {{C}} – {{A}}m – {{D}}m – {{G}}. One borrowed note, a world of difference.',
    },
  ],
}
