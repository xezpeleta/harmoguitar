/**
 * Lesson 25 — Modal Jazz & Quartal Harmony
 * Source: RESEARCH.md §24
 *
 * Modes as tonal centres rather than functional ii–V–I harmony. Few chords,
 * held for many bars, with interest coming from melodic colour and texture.
 * Includes the "So What" chord and stacked-fourth voicings.
 */
import type { Lesson } from '$lib/content/schema'

export const modalJazz: Lesson = {
  id: 'modal-jazz-quartal',
  slug: 'modal-jazz-and-quartal-harmony',
  title: 'Modal Jazz & Quartal Harmony',
  summary: 'When the chord just "is" — modes as tonal centres, the So What chord, and why stacked fourths sound so modern.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Modal jazz** (Miles Davis *Kind of Blue*, Coltrane, Wayne Shorter) uses **modes as tonal centres** rather than functional ii–V–I harmony. Instead of fast-moving chord changes, there is often a single chord per section, held for 8 or 16 bars. The interest comes from **melodic colour and texture**, not harmonic motion. It is the sound of "soaring" — open, floating, modern.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**"Modal" is not about using modes — it is about the *absence* of leading tones.** All jazz uses modes (a ii–V–I in {{C}} is D Dorian → G Mixolydian → C Ionian). What makes a piece *modal* is that it **lacks the leading tone and the V–I cadence** that define tonal music. In tonal music, the leading tone (a half-step below the root) creates a gravitational pull toward the tonic, and the music is organised around V–I resolutions. In modal jazz, there is no leading tone pulling you home — the chord just *is*. (Atonal music goes one step further: no tonal centre at all.) So modal jazz sits between tonal and atonal: it has a centre, but no gravity.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What makes it "modal"',
    },
    {
      kind: 'list',
      items: [
        '**Few chords, held for many bars** — e.g., "So What": 16 bars of {{D}}m7, 8 of {{Eb}}m7, 8 of {{D}}m7.',
        '**Vamps** — a repeated 1- or 2-chord pattern over which the soloist explores a mode.',
        '**Non-functional harmony** — no V7→I tension/release cycle; the chord just "is" its mode. You do not need to resolve anything — you explore.',
        '**Pedal points and drones** — a sustained bass note that anchors the tonal centre while the harmony floats above it. This is how modal jazz *establishes* a centre without functional harmony.',
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'dorian', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'D Dorian — the mode of "So What." Every note is consonant (no avoid notes). Hold it for 16 bars and explore.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Quartal harmony: chords in fourths',
    },
    {
      kind: 'text',
      markdown:
        'Traditional harmony stacks **thirds** (1-3-5-7). **Quartal harmony** stacks **fourths**: 1-4-7-10(3)… On guitar, stacked-fourth voicings are easy to finger and sound modern, open, and ambiguous. They are the signature comping sound of modal jazz.',
    },
    {
      kind: 'list',
      items: [
        'The modes modal jazz uses (especially Dorian) are rich in perfect 4ths, so stacked-4th voicings naturally express the mode.',
        'They sound **"floaty"** — the same shape can be several different chords depending on the bass note. This ambiguity is a feature, not a bug.',
        '**Parallel motion:** move a quartal voicing in parallel up and down the scale — the defining gesture of modal comping.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "So What" chord',
    },
    {
      kind: 'text',
      markdown:
        'The most famous quartal voicing in jazz: a 5-note chord of **stacked fourths with one major third on top**. For {{D}}m7, it is **{{D}}–{{G}}–{{C}}–{{F}}–{{A}}** (low to high) — three perfect 4ths (D-G, G-C, C-F) plus a major 3rd (F-A). This is the exact voicing Bill Evans plays on the head of "So What."',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'The "So What" voicing for Dm7: D-G-C-F-A. Three perfect 4ths + a major 3rd. The signature sound of modal jazz comping.',
      voicing: [
        { string: 5, fret: 5, label: 'D' },
        { string: 4, fret: 5, label: 'G' },
        { string: 3, fret: 5, label: 'C' },
        { string: 2, fret: 6, label: 'F' },
        { string: 1, fret: 5, label: 'A' },
      ],
      play: {
        kind: 'progression',
        chords: ['Dm7', 'Ebm7', 'Dm7'],
        tempo: 100,
        beatsPerChord: 4,
      },
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The shape is movable.** Slide the whole grip up one fret for {{Eb}}m7 (the second section of "So What"), up two for {{E}}m7, etc. This is **parallel motion** — the same shape moving through different roots. It is the easiest and most effective comping technique in modal jazz.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The modes of modal jazz',
    },
    {
      kind: 'table',
      headers: ['Mode', 'Vibe', 'Example tunes'],
      rows: [
        ['**Dorian**', 'Minor but bright (raised 6th)', 'So What, Maiden Voyage, Little B\'s Poem'],
        ['**Mixolydian**', 'Dominant, open (♭7)', 'Vamps on a sus or dominant chord'],
        ['**Phrygian**', 'Dark, Spanish (♭2)', 'Spanish/Middle-Eastern vamps'],
        ['**Lydian**', 'Floating, dreamy (♯4)', 'Major sus vamps, "Maiden Voyage" sections'],
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Modal jazz is a **different mindset** from bebop. In bebop, you chase fast chord changes and target guide tones. In modal jazz, you **stay** on one sound and explore its colours — motifs, rhythm, density, register. The skill is not "navigating changes" but "making one chord interesting for 16 bars."',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Freed from being a harmonic slave.** In tonal jazz, the soloist is "a harmonic slave to the chords" — you must target guide tones, avoid avoid notes, build tension through the ii–V, and resolve on the I. Your solo is almost pre-written by the progression. Modal jazz **frees** the soloist: with no functional progression to follow, you improvise **horizontally** — developing motifs, varying rhythm and register, building density — rather than **vertically** (chasing each chord). The trade-off: with no chords to do the work for you, *you* must create the interest. A modal solo with no ideas is just noodling.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The chord symbol is an approximation.** Lead sheets write "{{D}}m11" for the "So What" chord, but that is a compromise — our tertian chord-symbol system cannot notate *modes* directly. "{{D}}m11" is the closest *chord* approximation of {{D}} Dorian, because it stacks enough notes (1-♭3-5-♭7-9-11) to capture the mode\'s flavour. But the tune is not "in {{D}}m11" — it is **in {{D}} Dorian**. The chord symbol is a map, not the territory.',
    },
  ],
  sources: [
    {
      author: 'Walk That Bass',
      title: 'Modal Jazz Explained - Improvisation and Harmony',
      url: 'https://www.youtube.com/watch?v=mb0EFwzXIEo',
      note: 'Tonal = functional hierarchy (all chords gravitate to tonic via the diatonic tritone in V7); modal = all chords are equal, no function, they just \u201cfloat.\u201d Soloist is freed from being a \u201charmonic slave to the chords\u201d — improvisation shifts from vertical (chord-chasing) to horizontal (melodic exploration). Use pedal points/drones to establish the tonal centre.',
    },
    {
      author: 'Jeremy Siskind',
      title: 'What Is Modal Jazz? (Hint: It\u2019s Not About the Modes!)',
      url: 'https://www.youtube.com/watch?v=ElfCgBN0bF0',
      note: '\u201cModal\u201d is not about using modes (all jazz uses modes) — it is about the *absence* of leading tones and V–I cadences. Tonal = leading tone + organised around V–I; modal = no leading tone, no V–I; atonal = no tonal centre at all. Modal jazz sits between tonal and atonal: it has a centre, but no gravity.',
    },
    {
      author: 'Jared Bork (Sound Guitar Lessons)',
      title: 'EASY Quartal Harmony Comping on \u201cSo What\u201d by Miles Davis (Modal Jazz Chords)',
      url: 'https://www.youtube.com/watch?v=UWDlM_FsGHc',
      note: 'Quartal harmony works in modal jazz because in a mode every note is equally a chord tone (no avoid notes). One movable stacked-fourth shape on guitar covers the whole tune. \u201cDm11\u201d is the chord-symbol approximation of D Dorian — the tertian system cannot notate modes directly.',
    },
  ],
}
