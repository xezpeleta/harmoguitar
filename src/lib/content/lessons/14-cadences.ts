/**
 * Lesson 13 — Cadences & Turnarounds
 * Source: RESEARCH.md §12
 */
import type { Lesson } from '$lib/content/schema'

export const cadences: Lesson = {
  id: 'cadences',
  slug: 'cadences-and-turnarounds',
  title: 'Cadences & Turnarounds',
  summary: 'The musical punctuation that ends phrases — and the loops that bring you back to the top.',
  minutes: 12,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **cadence** is a chord progression that ends a phrase — the musical equivalent of punctuation. A **turnaround** is a short progression at the end of a form that loops back to the top. Both are essential vocabulary.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Cadences come in pairs of phrases.** A phrase is a musical sentence — usually 4 bars. Phrases come in pairs called a **period**: the first phrase (the *antecedent*) asks a question and ends on a **half cadence** (any chord → V, leaving you hanging); the second phrase (the *consequent*) answers it and ends on an **authentic cadence** (V → I, full resolution). This call-and-response \u2014 question, then answer \u2014 is the foundation of musical form. Without cadences, music would be an endless run-on sentence with no shape.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The four cadences',
    },
    {
      kind: 'table',
      headers: ['Cadence', 'Progression', 'Effect'],
      rows: [
        ['Authentic', 'V–I ({{G}}7–{{C}})', '"period" — full resolution, strongest'],
        ['Plagal', 'IV–I ({{F}}–{{C}})', '"amen" — softer, gospel'],
        ['Half', 'any–V ({{C}}–{{G}})', 'comma — leaves you hanging'],
        ['Deceptive', 'V–vi ({{G}}7–{{A}}m)', 'plot twist — resolves to a substitute'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Perfect vs. plagal: the two flavours of "finished".** The **authentic** cadence (V→I) is a full stop \u2014 the strongest resolution in tonal music, driven by the leading tone pulling up into the root. The **plagal** cadence (IV→I) is softer, gentler \u2014 think of the \u201cAmen\u201d at the end of a hymn. It resolves not by tension-and-release but by a gentle fall. Modern pop rarely uses authentic cadences because loops do not want to feel \u201cfinished\u201d \u2014 they want to keep cycling. But when a song *does* want to say \u201cthe end\u201d (like the final chord of Imagine), the authentic cadence is how it says it.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The perfect authentic cadence.** For the *strongest* possible resolution, add two rules to the V→I: (1) both chords in **root position** (so the bass moves V→I, reinforcing the root motion), and (2) the **melody moves from the leading tone up to the tonic** (scale degree 7 → 1). This \u2014 root-position V to root-position I, with the melody climbing ti→do \u2014 is the most final-sounding cadence in all of western music.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the cadences',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 — the V of C. Follow it with Cmaj7 (below) for an authentic cadence.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj7 — the I. Hit “Play progression” to hear the authentic cadence: {{G}}7 → {{C}}maj7 — the strongest resolution in tonal music.',
      play: {
        kind: 'progression',
        chords: ['G7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Turnarounds',
    },
    {
      kind: 'text',
      markdown:
        'A **turnaround** is a 1- or 2-bar progression at the end of a form that loops back to the top. Common jazz turnarounds:',
    },
    {
      kind: 'list',
      items: [
        '**I–vi–ii–V** ({{C}}–{{A}}m–{{D}}m–{{G}}) — the classic',
        '**iii–vi–ii–V** ({{E}}m–{{A}}7–{{D}}m–{{G}}) — often with secondary dominants',
        '**I–VI7–ii–V** ({{C}}–{{A}}7–{{D}}m–{{G}})',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Tritone-sub versions of turnarounds (I–♭III7–♭VI7–♭II7, a chromatic descending bass) are covered in the **Tritone Substitution** lesson. For now, the I–vi–ii–V is the turnaround to master.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The turnaround is an embellished V→I.** Strip the I–vi–ii–V down to its core and you get just I→V \u2014 the simplest turnaround (end on V, loop back to I). Add a ii in front of the V (ii→V→I) and you get stronger pull. Split the I bar into I then vi, and you have the full I–vi–ii–V. The vi is nearly identical to I (they share notes), so it is a gentle way to start moving before the ii–V pulls hard. Every jazz turnaround is just this V→I skeleton with flesh on it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why cadences matter',
    },
    {
      kind: 'text',
      markdown:
        'Cadences are how you **shape a phrase**. An authentic cadence says "this section is over." A half cadence says "wait — more is coming." A deceptive cadence surprises. The same chords, in different orders, tell entirely different stories. Learning to *hear* the cadence is learning to hear the form of a song.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Play {{G}}7 → {{C}} (authentic), then {{G}}7 → {{A}}m (deceptive). The notes are nearly identical, but the *feeling* is completely different. That is the power of cadence — it is about expectation and resolution, not just the chords themselves.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why does the deceptive cadence work?** The vi chord ({{A}}m) shares two notes with the I ({{C}}): {{C}} and {{E}}. So when V ({{G}}7) resolves to vi instead of I, the ear gets *most* of the resolution it expected \u2014 but the {{A}} in the bass (instead of {{C}}) is a let-down, a plot twist. It feels like the chord \u201cknew the way home but took a detour.\u201d That is why it is called *deceptive*: the V set up a promise of I, and the harmony broke it.',
    },
  ],
  sources: [
    {
      author: 'David Bennett',
      title: 'Every type of Cadence EXPLAINED',
      url: 'https://www.youtube.com/watch?v=SIcFOkMtDJI',
      note: 'Comprehensive tour of all cadence types. Authentic (V-I) as the definitive \u201cfull stop\u201d; plagal (IV-I) as the softer \u201cAmen\u201d; why modern pop avoids authentic cadences in favour of loops; the minor plagal cadence (iv-I) and its bittersweet chromatic pull; deceptive (V-vi) as the plot twist.',
    },
    {
      author: '12tone',
      title: 'Cadences: The End Is Nigh',
      url: 'https://www.youtube.com/watch?v=evwgAttA80M',
      note: 'Cadences as phrase punctuation. The antecedent-consequent period structure: first phrase asks a question (half cadence), second phrase answers (authentic cadence). The perfect authentic cadence (root-position V-I with melody on leading-tone-to-tonic) as the strongest possible resolution.',
    },
    {
      author: 'Jens Larsen',
      title: 'Jazz Chords: I VI II V turnaround in 10 variations',
      url: 'https://www.youtube.com/watch?v=_K4dIQ9G3u4',
      note: 'How the I-vi-ii-V turnaround is an embellished V-I: start with I-V, add ii before the V, split the I bar into I-vi. The vi is nearly identical to I (only one note changes). Variations via secondary dominants (A7 for Am), tritone subs, and altered dominants \u2014 all flesh on the same V-I skeleton.',
    },
    {
      author: 'Walk That Bass',
      title: 'Jazz Blues Turnarounds Part I (I, VI, ii, V)',
      url: 'https://www.youtube.com/watch?v=WYZ-vdNCiyw',
      note: 'Turnarounds in the 12-bar blues: from the simplest (just play V) to the ii-V-based turnaround that follows circle-of-fifths root motion (E-A-D-G-C). Why chromatic descending turnarounds sound good: the chords stay close together, taking \u201cbaby steps\u201d instead of large jumps.',
    },
  ],
}
