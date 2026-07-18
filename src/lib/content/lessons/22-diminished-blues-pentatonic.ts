/**
 * Lesson 22 — The Diminished Blues Pentatonic
 * Source: RESEARCH.md §31 (Diminished Blues Pentatonic) — Félix Santos
 *
 * The soloing question the Passing Chords (19) and Pentatonics (21) lessons
 * set up but never answer: *what do you play over a passing diminished
 * chord in a blues?* The default — a straight diminished arpeggio — is
 * correct but square. Félix Santos's bluesier alternative: keep the major
 * pentatonic of the preceding chord and treat the diminished root as an
 * appoggiatura — sliding into it from below when ascending, from above when
 * descending. Same five-note vocabulary, retuned for the passing chord.
 */
import type { Lesson } from '$lib/content/schema'

export const diminishedBluesPentatonic: Lesson = {
  id: 'diminished-blues-pentatonic',
  slug: 'the-diminished-blues-pentatonic',
  title: 'The Diminished Blues Pentatonic',
  summary: 'A passing diminished chord in a blues? Skip the square arpeggio — keep the pentatonic and slide into the dim root.',
  minutes: 9,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Here is a question that stops blues and jazz guitarists cold: **what do you play over a passing diminished chord?** You are grooving on a **{{D}}9**, soloing in {{D}} major pentatonic, and suddenly the progression throws a **{{D#}}dim7** at you — a half-step up, there and gone in a beat or two. The reflex is to switch to a **{{D#}} diminished arpeggio** ({{D#}} {{F#}} {{A}} {{C}}). It fits. It is correct. And after a few times it sounds rigid, mathematical, and — as Félix Santos puts it — *square*. It stops sounding like the blues.',
    },
    {
      kind: 'text',
      markdown:
        'The fix is not a new scale to memorise. It is a **treatment** of the pentatonic you were already playing. Keep the **{{D}} major pentatonic** shape under your fingers and treat the diminished root ({{D#}}) as a **blues appoggiatura** — a note you slide into and immediately leave. The direction of the slide flips depending on which way the line is going:',
    },
    {
      kind: 'list',
      items: [
        '**Ascending** — slide into {{D#}} from a half-step *below* ({{D}} → {{D#}}), and **omit the {{E}}** (the pentatonic note just above). The {{D#}} gets the slide emphasis; nothing clashes above it.',
        '**Descending** — flip it: keep the **{{E}}** and slide *down* into {{D#}} from a half-step *above* ({{E}} → {{D#}}).',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'First, hear the “square” default',
    },
    {
      kind: 'text',
      markdown:
        'Before the cure, the symptom. Here is the standard **{{D#}}dim7 arpeggio** — root, ♭3, ♭5, ♭♭7 — played straight up. Press **Play** and hear how correct and how stiff it sounds: four equal chord tones, no blues in it at all. This is what we are going to replace.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dim7', root: 'D#', fretCount: 12 },
      widgets: ['fretboard', 'staff'],
      voicing: [
        { string: 5, fret: 6 },
        { string: 4, fret: 4 },
        { string: 3, fret: 2 },
        { string: 2, fret: 1 },
      ],
      play: { kind: 'phrase', stagger: 0.4 },
      caption:
        'The standard {{D#}}dim7 arpeggio: {{D#}} → {{F#}} → {{A}} → {{C}}. Mathematically perfect, musically stiff. Every note is a chord tone; there is no tension-and-release, no slide, no blues. Now hear the alternative.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Ascending: slide from below, skip the E',
    },
    {
      kind: 'text',
      markdown:
        'Here is the ascending line. It is **{{D}} major pentatonic** with one alteration: the {{E}} (the 2nd) is dropped, and the diminished root **{{D#}}** is slid into from {{D}} a half-step below. The rest — {{F#}}, {{A}}, {{B}}, up to {{D}} — is pure pentatonic. Press **Play** and follow each dot: notice the {{D}} → {{D#}} slide, the *gap* where {{E}} would have been, and how the line lands back on pentatonic material.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major-pentatonic', root: 'D', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 5, fret: 5 },
        { string: 5, fret: 6 },
        { string: 4, fret: 4 },
        { string: 4, fret: 7 },
        { string: 3, fret: 4 },
        { string: 3, fret: 7 },
      ],
      play: { kind: 'phrase', stagger: 0.38 },
      caption:
        'Ascending diminished-blues pentatonic: {{D}} → {{D#}} (slide up) → {{F#}} → {{A}} → {{B}} → {{D}}. The {{D#}} is the only non-pentatonic note — it is the passing dim root, approached from below. The {{E}} is deliberately absent.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The ascending rule:** when the line is rising, approach the diminished root from a half-step *below* and leave out the pentatonic note a half-step *above* it. You never want to land on the note just above the dim root — that is where the clash lives. Slide up into the root, then leap past the clash to the next pentatonic tone.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Descending: keep the E, slide down into D#',
    },
    {
      kind: 'text',
      markdown:
        'Coming back down, the appoggiatura flips. Now you **keep** the {{E}} and use it to slide *down* into {{D#}}. The line falls through the pentatonic ({{F#}} → {{E}} → {{D}} → {{B}} → {{A}} → {{F#}} → {{E}}) and only at the very end does the {{E}} slide down to {{D#}} — the dim root, approached from above. Same five-note vocabulary, opposite direction, same bluesy tension.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major-pentatonic', root: 'D', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 2, fret: 7 },
        { string: 2, fret: 5 },
        { string: 3, fret: 7 },
        { string: 3, fret: 4 },
        { string: 4, fret: 7 },
        { string: 4, fret: 4 },
        { string: 5, fret: 7 },
        { string: 5, fret: 6 },
      ],
      play: { kind: 'phrase', stagger: 0.32 },
      caption:
        'Descending diminished-blues pentatonic: {{F#}} → {{E}} → {{D}} → {{B}} → {{A}} → {{F#}} → {{E}} → {{D#}} (slide down). The final {{E}} → {{D#}} is the mirror of the ascending slide — the dim root approached from above.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The descending rule:** when the line is falling, keep the pentatonic note a half-step *above* the dim root and slide *down* into it. The clash note is now your approach note — you pass through it on the way to the root, so it earns its place. Direction determines treatment: up = from below, down = from above.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'It is not one position — it generalises',
    },
    {
      kind: 'text',
      markdown:
        'This is not a trick that only works on the A string around the 5th fret. It is a **method**: wherever a passing diminished chord appears, grab the major pentatonic of the chord right before it and apply the two slide rules. Here is the same idea moved to the bass strings — an **{{A}}** groove moving to **{{A#}}dim7**. Same fingering logic, same omit-above / keep-above rules, just relocated. Press **Play** and hear the identical bluesy flavour in a new register.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major-pentatonic', root: 'A', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 5 },
        { string: 6, fret: 6 },
        { string: 5, fret: 4 },
        { string: 5, fret: 7 },
        { string: 4, fret: 4 },
        { string: 3, fret: 2 },
      ],
      play: { kind: 'phrase', stagger: 0.38 },
      caption:
        'Ascending over {{A#}}dim7, bass-string version: {{A}} → {{A#}} (slide up) → {{C#}} → {{E}} → {{F#}} → {{A}}. Same shape as the {{D}} version, shifted down a fourth. The {{B}} is omitted — the dim root {{A#}} is approached from below. One method, every position.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why this sounds like the blues',
    },
    {
      kind: 'text',
      markdown:
        'A straight diminished arpeggio sounds classical because it is *all chord tones, all the time* — four equal notes with no passing tension. The blues, by contrast, is built on **pentatonic shapes decorated with slides and half-step approaches**. By keeping the pentatonic and merely redirecting one note into the diminished root, you get the harmonic tension the dim7 demands *without abandoning the blues vocabulary*. The slide is what makes it sing: a fretted note slurred into its neighbour is the most vocal sound the guitar makes, and it is the sound of every blues player from B.B. King onward.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Notice what the two versions share: **{{F#}}** and **{{A}}** are chord tones of *both* {{D}} major pentatonic and {{D#}}dim7. The pentatonic and the arpeggio overlap on the 3rd and 5th of the diminished chord — so most of the line is already “correct” over the dim7. The only negotiation is the root itself, and that is exactly the note the slide rules handle. This is why the trick works: you are not fighting the chord, you are bluesing your way into it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The recipe',
    },
    {
      kind: 'list',
      items: [
        '**Spot the passing diminished** in a blues (commonly a ♯IVdim7 or a dim7 a half-step above the chord you just left).',
        '**Keep the major pentatonic** of the previous chord under your fingers — do not switch to an arpeggio.',
        '**Ascending:** slide into the dim root from a half-step below, and skip the pentatonic note a half-step above it.',
        '**Descending:** keep that upper note and slide down into the dim root from a half-step above.',
        '**Move it.** The same fingering works in any position — find the pentatonic shape, apply the two slides.',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'Do not overuse it. A passing diminished chord is *passing* — it lasts a beat or two. The slide is a moment of tension that resolves back into the next chord. If you linger on the diminished sound, it stops passing and starts sounding like you are lost. In, slide, out.',
    },
  ],
}
