/**
 * Lesson 18 — Passing Chords, Inversions & Walking Bass
 * Source: RESEARCH.md §21 (diminished), §23 (inversions/voice leading)
 *
 * The "develop the chord" idea from the Félix Santos class: instead of sitting
 * static on one voicing, move a dominant through its inversions up the neck,
 * connecting them with diminished-7 passing chords. The result is a walking
 * bass line and a self-accompanying, orchestral texture.
 */
import type { Lesson } from '$lib/content/schema'

export const passingChordsInversions: Lesson = {
  id: 'passing-chords-inversions',
  slug: 'passing-chords-inversions-walking-bass',
  title: 'Passing Chords, Inversions & Walking Bass',
  summary: 'Stop sitting still: move a chord through its inversions and connect them with diminished passing chords.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Here is a common habit Félix Santos calls out: when guitarists play a blues, they find **one** voicing (say {{A}}7) and strum it statically for four bars. It works — but it is boring, and it wastes the neck. The cure is to **develop the chord**: move it through its **inversions** up the fretboard, and glue those inversions together with **diminished-7 passing chords**. The bass starts to *walk*, and one guitar starts to sound like a bass, a piano, and a guitar all at once.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Recap: inversions',
    },
    {
      kind: 'text',
      markdown:
        'You met triad inversions in the Triads lesson. The same idea applies to 7th chords: any of the four chord tones can sit in the bass. **Same notes, different bass note, different sound.**',
    },
    {
      kind: 'table',
      headers: ['Inversion', 'Bass note', 'A7 example'],
      rows: [
        ['Root position', 'Root (1)', '{{A}}7 — {{A}} in the bass'],
        ['1st inversion', '3rd', '{{A}}7/{{C#}} — {{C#}} in the bass'],
        ['2nd inversion', '5th', '{{A}}7/{{E}} — {{E}} in the bass'],
        ['3rd inversion', '7th', '{{A}}7/{{G}} — {{G}} in the bass'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A7 ({{A}} {{C#}} {{E}} {{G}}). The fretboard shows every A7 tone across the neck — each cluster at a different position is a different inversion waiting to be played.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Diminished-7 passing chords',
    },
    {
      kind: 'text',
      markdown:
        'To move smoothly between inversions, insert a **diminished 7 chord a semitone away** from your target. Because the dim7 sits just one fret above or below, your hand *slides* into the inversion — chromatic motion, no jumps. The dim7 is a **passing chord**: it is not a destination, just a slippery texture that connects two real chords.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**A diminished passing chord is secretly a dominant.** A {{C#}}dim7 resolving to {{D}}m is not random slipperiness — it is functioning as an **{{A}}7** (the V of Dm) in disguise. The dim7 shares the guide tones of A7, so the ear hears a dominant resolving to its tonic. The rule of thumb: **a dim7 resolves by moving up a half step to the next chord** ({{C#}}dim7 → {{D}}m). You do not need to analyse it — just think \u201cone fret below my target\u201d and slide up.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dim7', root: 'Bb' },
      widgets: ['fretboard', 'staff'],
      caption: 'Bb dim7 ({{Bb}} {{Db}} {{E}} {{G}}) — a half-step above A7. Slide it down one fret and you land back on A7 material. Pure passing tension.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Diminished symmetry:** a dim7 is built entirely of minor 3rds, so it **repeats every 3 frets** — the same four notes, transposed. There are really only **3 distinct dim7 chords** in total ({{C}}dim7 = {{Eb}}dim7 = {{F#}}dim7 = {{A}}dim7 — same notes). So any dim7 grip you learn is reusable up and down the neck in minor-3rd hops. This is why they are so handy as passing chords: you always have one within reach.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The exercise: developing A7 up the neck',
    },
    {
      kind: 'text',
      markdown:
        'Here is the sequence from the class. Hold the flavour of **{{A}}7** the whole time, but walk up the neck through its inversions, approaching each one with a dim7 a semitone above. Play it slowly, letting each chord ring:',
    },
    {
      kind: 'table',
      headers: ['Step', 'Chord', 'Bass', 'Role'],
      rows: [
        ['1', '{{A}}7', '{{A}}', 'Root position — home base'],
        ['2', '{{Bb}}dim7', '{{Bb}}', 'Passing — a fret above'],
        ['3', '{{A}}7/{{C#}}', '{{C#}}', '1st inversion (3rd in bass)'],
        ['4', '{{C}}dim7', '{{C}}', 'Passing'],
        ['5', '{{A}}7/{{E}}', '{{E}}', '2nd inversion (5th in bass)'],
        ['6', '{{Eb}}dim7', '{{Eb}}', 'Passing'],
        ['7', '{{A}}7/{{G}}', '{{G}}', '3rd inversion (7th in bass)'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'dim7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'C dim7 — another passing chord in the sequence. Same symmetric shape as Bb dim7, just shifted.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dim7', root: 'Eb' },
      widgets: ['fretboard', 'staff'],
      caption: 'Eb dim7 — the third passing chord. Notice these are all the same grip moved around the neck (diminished symmetry).',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Instead of strumming one {{A}}7 for a whole bar, play **step 1 → 2 → 3** across the bar. The bass walks ({{A}} → {{Bb}} → {{C#}}), the harmony stays "A7-ish," and suddenly you are accompanying *yourself*. Add steps 4–7 over the next bars and you have climbed the whole neck. This is the essence of chord-melody and walking-bass comping.',
    },
    {
      kind: 'heading',
      level: 2,
      text: 'Upper and lower neighbours',
    },
    {
      kind: 'text',
      markdown:
        'The diminished passing chord is one instance of a broader idea: the **neighbour chord**. Before any target chord, you can play the same chord shape **one fret above** (the upper neighbour) or **one fret below** (the lower neighbour), then slide into the target. This works for full chord shapes, not just diminished chords — slide a dominant grip up or down a fret and resolve back. You hear it constantly in blues: *Stormy Monday* lives on this trick.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Same chord, different name.** A {{G#}}7 and an {{Ab}}7 are enharmonically the same four notes — but we name them by *which way they resolve*. {{G#}}7 resolves **up** a half step to {{A}}7; {{Ab}}7 resolves **down** a half step to {{G}}7. The chord is identical; only the direction of motion gives it its name. This is why thinking \u201capproach from above\u201d or \u201capproach from below\u201d is more useful than memorising chord names.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Passing diminished between diatonic chords',
    },
    {
      kind: 'text',
      markdown:
        'The same trick works between two diatonic chords a whole step apart. To get from {{C}} to {{D}}m, slide a **{{C#}}dim7** between them: `{{C}} → {{C#}}dim7 → {{D}}m`. The bass walks up ({{C}} → {{C#}} → {{D}}), and the dim7 supplies a moment of slippery tension that resolves neatly into the Dm. You will hear this in countless jazz and pop arrangements.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'A passing chord is a **means, not an end.** Do not camp on the dim7 — it is there to grease the motion between two chords that matter. The moment you linger on it, it stops walking and starts sounding like a horror-movie sting.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Walking bass = inversions + passing chords',
    },
    {
      kind: 'text',
      markdown:
        'A **walking bass line** is built from exactly these ingredients: choose chord-tone inversions so the bass lands on roots, 3rds, 5ths, and 7ths on the strong beats, and fill the gaps with **chromatic passing notes** (often supplied by dim7 shapes). When you play the exercise above, you are *playing a walking bass line with chords on top* — the same job a bassist and a pianist would do together.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**How to build a walking bass, step by step.** (1) Play just the **roots** in time. (2) Play the **chord and the root** separately — bass note, then chord — to train your thumb to work independently. (3) Add a **triplet feel**: bass-chord-bass on each beat, giving that sloppy, swinging walk. (4) **Approach each root from one fret below** (chromatic lower neighbour). (5) Approach from **one fret above**. (6–8) **Mix** above and below, and start using **diatonic** approaches (scale-wise, sometimes a whole step) instead of only chromatic. The golden fingering rule: *the finger that frets the bass note must also fret the approach note* — otherwise you cannot form the chord in time.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'This is also the harmonic side of the **blue note** idea you will meet in the Pentatonics & Blue Notes lesson: when a melody hits a slippery chromatic "blue" note, the chord underneath is very often one of these **diminished passing chords**. The melody and the harmony walk together.',
    },
  ],
  sources: [
    {
      author: 'Félix Santos',
      title: 'Master Class de Armonía, Jazz y Blues',
      url: 'https://www.youtube.com/watch?v=1C0mF-utIlI',
      note: 'The \u201cdevelop the chord\u201d idea — moving a dominant through inversions, connected by diminished passing chords, to create a self-accompanying walking-bass texture.',
    },
    {
      author: 'Jens Larsen',
      title: 'Jazz Chords: Every Type of Passing Chord You Need To Know',
      url: 'https://www.youtube.com/watch?v=8T19eMddqXs',
      note: 'Diminished passing chords function as dominants (C#dim7 = A7 resolving to Dm); the rule \u201cresolve up a half step\u201d; chromatic baseline is the main reason it works. Chromatic vs diatonic passing chords. Counter-movement (chord up, melody down). G#7 and Ab7 are the same chord named by resolution direction.',
    },
    {
      author: 'Jazz Guitar Lessons (Marc-André Séguin)',
      title: 'Jazz Guitar: Walking Bass Lines with Chords',
      url: 'https://www.youtube.com/watch?v=0O6QHWL7ORc',
      note: 'Step-by-step walking bass method: roots only → chord+bass separated → triplet feel (bass-chord-bass) → chromatic approach from below → from above → mixed. The finger that frets the bass must also fret the approach note. Diatonic (scale-wise) approaches as an alternative to chromatic.',
    },
    {
      author: 'swiftlessons (Rob)',
      title: 'Jazz Blues Passing Chords & Substitutions Explained',
      url: 'https://www.youtube.com/watch?v=whgHzQTYL0o',
      note: 'Upper and lower neighbour concept as the unifying idea: approach any chord from a half-step above or below. Stormy Monday as the classic blues example. Diminished passing chord from IV→I analysed as a lower-neighbour walk-up. 3-6-2-5-1 jazz turnaround added to blues.',
    },
  ],
}
