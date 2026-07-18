/**
 * Lesson 10 — Functional Harmony
 * Source: RESEARCH.md §9
 */
import type { Lesson } from '$lib/content/schema'

export const functionalHarmony: Lesson = {
  id: 'functional-harmony',
  slug: 'functional-harmony',
  title: 'Functional Harmony: Tonic, Subdominant, Dominant',
  summary: 'Why chords behave the way they do — the three functions behind tonal music.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Functional harmony** explains *why* chords behave the way they do — which feel stable, which create motion, and which demand resolution. Most tonal music relies on three harmonic **functions**.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The three functions',
    },
    {
      kind: 'table',
      headers: ['Function', 'Role', 'Chords (in C)', 'Feeling'],
      rows: [
        ['Tonic (T)', 'Home, rest, resolution', 'I (C), vi (Am), iii (Em)', 'stable, settled'],
        ['Subdominant (S)', 'Departure, lift, motion', 'IV (F), ii (Dm)', 'moving away'],
        ['Dominant (D)', 'Tension, wants to resolve', 'V (G), vii° (B°)', 'tense, pulling home'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Why do these three functions exist?** Three scale degrees do all the work: the **3rd, 4th, and 7th**. The 3rd defines the key\u2019s colour (major or minor) \u2014 a chord with the 3rd but *not* the 4th feels consonant and at rest (**tonic**). The 4th sits just above the 3rd and disrupts that rest \u2014 a chord with the 4th but *not* the 7th feels unstable and ungrounded (**subdominant**). The 7th (the leading tone) sits a half-step below the root and pulls upward \u2014 a chord with the 7th but *not* the 3rd feels dissonant and directional (**dominant**). This is a diagnostic, not just a label: look at those three notes and you can predict how any diatonic chord will feel.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The harmonic narrative',
    },
    {
      kind: 'text',
      markdown:
        'A typical progression tells a story: **leave home (T → S), build tension (S → D), return home (D → T)**. This tension-and-release cycle is the emotional engine of tonal music.',
    },
    {
      kind: 'list',
      items: [
        '**Tonic** chords feel at rest. The I is the strongest; vi and iii are "tonic substitutes" — stable but coloured.',
        '**Subdominant** chords move away from home. IV lifts; ii (the pre-dominant) sets up the dominant.',
        '**Dominant** chords contain the tritone (3rd + ♭7th of V7) that pulls toward the tonic. V7 → I is the strongest resolution in tonal music.',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The tritone is the heart of dominant function.** In C major, the only tritone is {{F}}\u2013{{B}} \u2014 and it appears in *both* dominant-function chords: G7 ({{G}} {{B}} {{D}} {{F}}) and Bm7ø5 ({{B}} {{D}} {{F}} {{A}}). That tritone wants to collapse inward: {{B}}\u2192{{C}}, {{F}}\u2192{{E}}. The principle: **any chord containing a tritone can serve as a dominant**. This is why V7 and viiø pull toward the tonic with equal force \u2014 and it is the seed of tritone substitution and diminished-7th chords, covered in later lessons.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Chords that share two notes share a function.** This is why substitutions work. I ({{C}} {{E}} {{G}}) and vi ({{A}}m = {{A}} {{C}} {{E}}) share {{C}} and {{E}} \u2014 both tonic. IV ({{F}} {{A}} {{C}}) and ii ({{D}}m = {{D}} {{F}} {{A}}) share {{F}} and {{A}} \u2014 both subdominant. V ({{G}} {{B}} {{D}}) and vii° ({{B}}° = {{B}} {{D}} {{F}}) share {{B}} and {{D}} \u2014 both dominant. Need a tonic sound but want variety? Swap I for vi. The function stays; the colour shifts.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Hear the resolution',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff', 'interval-wheel'],
      caption: 'G7 — the V7 of C. The tritone {{B}}–{{F}} (3rd & ♭7) wants to resolve: {{B}}→{{C}}, {{F}}→{{E}}.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj7 — the resolution. Play G7 first, then this, to feel the V7 → I release.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The families (quick reference, C major)',
    },
    {
      kind: 'list',
      items: [
        '**Tonic:** I, vi (and iii)',
        '**Subdominant / Pre-dominant:** IV, ii (and vi)',
        '**Dominant:** V, vii° (and secondary dominants)',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Subdominant lifts gently; dominant pulls hard.** Play IV\u2192I and you feel a gentle *fall* \u2014 the 4th degree sinks back to the 3rd, releasing a little tension. Play V\u2192I and you feel a strong *pull* \u2014 the leading tone (7th degree) strains upward toward the root. Same destination, very different force. The leading tone is the ingredient that makes dominant resolution unmistakable: any chord containing it (V, vii°) drags you home.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Writing a progression? Ask one question: should the next chord feel more or less stable than the last?** If you want more rest, pick from the tonic family (I, vi, iii). If you want a gentle step away, pick subdominant (IV, ii). If you want maximum tension before a return, pick dominant (V, vii°). Function first, specific chord second \u2014 this is how experienced songwriters navigate without guessing.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Minor keys: borrowing a dominant',
    },
    {
      kind: 'text',
      markdown:
        'In natural minor, the v chord is minor ({{E}}m in {{A}}m) and lacks pull. Composers **borrow from harmonic minor** to get a major V (E7 in Am). The raised 7th ({{G#}}) creates a leading tone that resolves up to the tonic {{A}}.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Classic example: "House of the Rising Sun" — Am C D F Am C **E** Am. That E major (V of A minor) is borrowed from harmonic minor. Without it, the progression would feel weak; with it, it drives home.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'This "borrowing" is your first taste of **modal mixture** — pulling a chord from a parallel scale to add colour. It is the gateway to the richer jazz sounds in later lessons.',
    },
  ],
  sources: [
    {
      author: '12tone',
      title: 'Building Blocks: The Job Of A Chord',
      url: 'https://www.youtube.com/watch?v=Ot_lbUcb-uE',
      note: 'The 3rd/4th/7th-degree rule of thumb for identifying function: 3rd without 4th = tonic (consonant rest); 4th without 7th = subdominant (unstable, ungrounded); 7th without 3rd = dominant (dissonant, directional). Also why tonic chords share the 3rd degree (it defines modality) and how triads vs 7ths shift subdominant feel.',
    },
    {
      author: '12tone',
      title: 'The Heart Of Dominant Function',
      url: 'https://www.youtube.com/watch?v=4FNWQSGZQTw',
      note: 'The tritone as the engine of all dominant function: \u201cthe tritone always resolves.\u201d Any chord with a tritone can serve as a dominant. This principle underpins secondary dominants, tritone substitution, and diminished-7th resolutions.',
    },
    {
      author: 'Chris Sherland Guitar',
      title: 'Tonic Subdominant and Dominant: What do these terms mean?',
      url: 'https://www.youtube.com/watch?v=k6NNKaQcfdc',
      note: 'Guitar-focused: the shared-two-common-tones grouping method (I & vi, IV & ii, V & vii°), the felt difference between subdominant (gentle lift/fall) and dominant (strong pull), the leading tone as the key ingredient, and the practical \u201cmore or less stable?\u201d question for choosing the next chord.',
    },
    {
      author: 'Walk That Bass',
      title: 'Jazz Piano Tutorial \u2013 II-V-I and the Diatonic Function',
      url: 'https://www.youtube.com/watch?v=Tloy3wGsJ1o',
      note: 'The pre-dominant \u2192 dominant \u2192 tonic template as the structure behind the ii-V-I (and every variant). Why it sounds good: smooth voice leading (notes stay or move by step). Tonic substitutes as median-note substitutions (Em7 = Cmaj9 without the root; Am7 = C6 inverted).',
    },
  ],
}
