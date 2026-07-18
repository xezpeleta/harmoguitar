/**
 * Lesson 27 — Reharmonization & Substitutions Overview
 * Source: RESEARCH.md §26
 *
 * The art of changing the chords under a melody to create a new harmonic
 * context. A capstone lesson that ties together every technique from the
 * jazz harmony path (Lessons 15–26).
 */
import type { Lesson } from '$lib/content/schema'

export const reharmonization: Lesson = {
  id: 'reharmonization',
  slug: 'reharmonization-overview',
  title: 'Reharmonization & Substitutions',
  summary: 'The capstone: every reharmonization technique you have learned, assembled into one toolkit. When and how to change the chords.',
  minutes: 13,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Reharmonization** is the art of changing the chords under a melody to create a new — often richer or more surprising — harmonic context. Jazz musicians do it in real time. Every technique in this overview you have already learned in the preceding lessons; here we assemble them into one toolkit and ask: **when do you use each, and why?**',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Harmonic improvisation under a fixed melody.** Reharmonization flips the usual improvisation process. In a normal solo, the harmony is fixed and you improvise the melody *above* it. In reharmonization, the **melody is fixed** and you improvise the harmony *beneath* it. The melody is the contract; the chords are negotiable. This is why reharmonization feels like a second layer of improvisation — you are composing new harmony in real time, under a tune everyone already knows.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The toolkit',
    },
    {
      kind: 'table',
      headers: ['Technique', 'What it does', 'Lesson'],
      rows: [
        ['**Secondary dominants**', 'Insert V7/x to tonicize a diatonic chord', 'Lesson 15'],
        ['**Tritone substitution**', 'Replace V7 with ♭II7 for chromatic bass', 'Lesson 16'],
        ['**Borrowed chords / modal mixture**', 'Pull chords from parallel minor for colour', 'Lesson 23'],
        ['**Chord-quality substitution**', 'Swap a chord for a related quality (e.g., maj7↔m7 via relative)', 'Lesson 9'],
        ['**Diminished passing chords**', 'Slide dim7 between diatonic chords for chromatic motion', 'Lesson 18'],
        ['**Planing / parallel motion**', 'Move identical chord shapes in parallel through a scale', 'Lesson 25'],
        ['**Altered dominants**', 'Add ♭9/♯9/♭5/♯5 to a V7 for maximum tension', 'Lesson 22'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'A worked example',
    },
    {
      kind: 'text',
      markdown:
        'Take a plain **ii–V–I in C**: {{D}}m7 – {{G}}7 – {{C}}maj7. Here is how each technique transforms it:',
    },
    {
      kind: 'table',
      headers: ['Technique', 'Result', 'Character'],
      rows: [
        ['Secondary dominant', '{{D}}m7 – **{{D}}7** – {{G}}7 – {{C}}maj7', 'Tonicizes the V'],
        ['Tritone sub', '{{D}}m7 – **{{Db}}7** – {{C}}maj7', 'Chromatic bass walk-down'],
        ['Back-door (borrowed)', '{{F}}m7 – **{{Bb}}7** – {{C}}maj7', 'Jazz ending, whole-step resolution'],
        ['Altered dominant', '{{D}}m7 – **{{G}}7alt** – {{C}}maj7', 'Maximum tension, half-step resolution'],
        ['Diminished passing', '{{D}}m7 – **{{F#}}dim7** – {{G}}7 – {{C}}maj7', 'Chromatic squeeze'],
        ['Stack them all', '{{D}}m7 – {{Db}}7 – **{{C}}m6** (borrowed i)', 'Dark, modern, surprising'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Hear a reharmonized ii–V–I: {{D}}m7 – {{Db}}7 (tritone sub) – {{C}}maj7. The bass walks down: {{D}} → {{Db}} → {{C}}.',
      play: {
        kind: 'progression',
        chords: ['Dm7', 'Db7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Principles',
    },
    {
      kind: 'list',
      items: [
        '**Preserve the melody** — the melody note should remain consonant (or intentionally tensional) with the new chord. The melody is the contract with the listener; the harmony is negotiable.',
        '**Preserve the function** — a sub should usually keep the chord\'s role (e.g., a tritone sub for V7 still functions as a dominant). Do not turn a V7 into a ii without a reason.',
        '**Voice-lead smoothly** — the best reharmonizations also move the inner voices gracefully. A surprising chord that voice-leads well sounds inevitable; one that jumps sounds clumsy.',
        '**More changes ≠ better** — reharmonize where it adds meaning, not everywhere. A single well-placed borrowed chord can transform a tune; reharmonizing every bar just sounds busy.',
        '**Think in degrees, not note names** — reharmonization is about *function* (what degree is this chord?), not absolute pitch. "Replace the IV with a ii" works in any key. Thinking in Roman numerals lets you transfer ideas across keys instantly.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The progressive approach.** Reharmonization is not all-or-nothing — it is a ladder. **Step 1:** fix your inversions for smooth voice leading. **Step 2:** upgrade triads to 7th chords ({{C}} → {{C}}maj7, {{Am}} → {{Am}}7). **Step 3:** try simple substitutions (swap IV for ii, or V7 for ♭VII7 back-door). **Step 4:** add approach chords — precede any target with its V7 or a full ii-V. **Step 5:** stack techniques (tritone sub + altered dominant + borrowed tonic). Start simple, listen, and keep what sounds good. Each step is a valid stopping point — a tune with just step 1 and 2 already sounds more jazz.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Approach chords.** You can precede *any* chord — major, minor, whatever — with its related V7 (or a full ii-V into it). Heading to {{G}}m? Insert {{D}}7 (or {{Am}}7♭5 → {{D}}7alt → {{G}}m) before it. This works because the V7 creates a temporary gravitational pull toward the target, making the arrival feel earned. You can chain approach chords: approach the approach chord, and so on — each insertion adds momentum and harmonic density.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**iii as a substitute for I.** The iii chord shares two notes with the I chord (and the iiim7 shares three notes with the Imaj7). So {{E}}m7 can substitute for {{C}}maj7 — it keeps the tonic function while creating more *cycle movement* (I → iii → vi → ii → V) instead of sitting still on the tonic. This is why jazz players rarely rest on the I for long — they keep the harmony in motion by substituting related chords that preserve the function.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to start:** take a tune you know well (a folk song, a pop song, a standard) and try one reharmonization per phrase. Swap a IV for a iv (borrowed). Add a secondary dominant before a target. Try a tritone sub on the V7. One change at a time, listen, and keep what sounds good. Reharmonization is a muscle — it grows with use.',
    },
    {
      kind: 'heading',
      level: 2,
      text: 'Where you are now',
    },
    {
      kind: 'text',
      markdown:
        'You started with the notes on the fretboard. You learned intervals, scales, modes, triads, seventh chords, extended chords, diatonic harmony, functional harmony, the circle of fifths, progressions, cadences, the blues, and the ii–V–I. Then you went deep: secondary dominants, tritone substitution, voice leading, passing chords, comping voicings, blue notes, the minor ii–V–i, the altered scale, borrowed chords, chord-scale theory, modal jazz, and the harmonic/melodic minor modes. **You now have the complete jazz harmony toolkit.** The rest is a lifetime of playing, listening, and experimenting — the theory is behind you; the music is ahead.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Use the **Builder** to explore any chord or scale you encounter. Pick a root and type, see the formula, fretboard, staff, and intervals, and play it. The best way to internalise all of this is to *play* it — every day, in a different key, over a different tune. The theory is the map; the playing is the journey.',
    },
  ],
  sources: [
    {
      author: 'Berklee Online (Steve Rochinski)',
      title: 'Reharmonization Techniques',
      url: 'https://www.youtube.com/watch?v=kMnvC7awGDQ',
      note: 'Reharmonization = \u201charmonic improvisation under a fixed melody line\u201d — flips the usual process (melody fixed, harmony improvised). Covers diminished 7th handling, delayed cadences, turnarounds, the axis system (graphic map of functional families), approach techniques (adding chords), and applying reharmonization from small phrases to Blues forms to modal systems.',
    },
    {
      author: 'MangoldProject',
      title: 'Jazz Reharmonization Masterclass: From BEGINNER to ADVANCED',
      url: 'https://www.youtube.com/watch?v=exSbG6PB41w',
      note: 'Step-by-step reharmonization of \u201cNight and Day.\u201d Progressive ladder: (1) fix inversions for smooth voice leading; (2) upgrade triads to 7th chords; (3) simple substitutions (IV→ii, V7→♭VII7 back-door); (4) add approach chords; (5) stack techniques. Think in degrees, not note names. Start simple, get progressively \u201ccrazier.\u201d',
    },
    {
      author: 'Kent Hewitt',
      title: '\u201cOver The Rainbow\u201d, The Art of Reharmonization',
      url: 'https://www.youtube.com/watch?v=MDwyBctziVU',
      note: 'Approach chords: precede any chord with its related V7 or a full ii-V. iii as substitute for I (shares 3 notes with Imaj7, creates cycle movement). Descending bass lines for harmonic movement. Color tones (9, ♭9, ♯9, 11, 13, ♭5) on every dominant 7th. \u201cWhatever you do with reharmonization, it has to fit the melody.\u201d',
    },
  ],
}
