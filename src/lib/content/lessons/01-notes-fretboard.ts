/**
 * Lesson 1 — Notes & the Fretboard
 * Source: RESEARCH.md §1
 */
import type { Lesson } from '$lib/content/schema'

export const notesFretboard: Lesson = {
  id: 'notes-fretboard',
  slug: 'notes-and-the-fretboard',
  title: 'Notes & the Fretboard',
  summary: 'The 12 pitch classes, standard tuning, and how to find any note anywhere on the neck.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You already play the guitar. This lesson gives you the map underneath everything you play — the **12 notes** and where they live on the fretboard. Once you can name the note under any finger, every chord, scale, and interval on this site becomes something you can see, not just memorise.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The 12 pitch classes',
    },
    {
      kind: 'text',
      markdown:
        'Western music uses **12 pitch classes** per octave. Using sharps (♯) and flats (♭) they are:',
    },
    {
      kind: 'text',
      markdown:
        '{{C}}  {{C#}}/{{Db}}  {{D}}  {{D#}}/{{Eb}}  {{E}}  {{F}}  {{F#}}/{{Gb}}  {{G}}  {{G#}}/{{Ab}}  {{A}}  {{A#}}/{{Bb}}  {{B}} → (back to {{C}})',
    },
    {
      kind: 'piano',
      octaves: 1,
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      caption:
        'The same 12 pitch classes on a keyboard. The 7 white keys are the natural notes ({{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}}); the 5 black keys are the accidentals. After {{B}} the cycle repeats from {{C}} again, one octave higher. Click any key to hear it, or press **Play notes** to hear all 12 in order — each key rings as it sounds.',
    },
    {
      kind: 'list',
      items: [
        '**Natural notes** — {{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}} (the 7 "white-key" notes).',
        '**Accidentals** — the 5 notes between them, each with two names ({{C#}} = {{Db}}). These double names are called *enharmonic equivalents*.',
        '**The octave** — after 12 semitones you return to the same letter name, one octave higher. The octave doubles the frequency (a 2:1 ratio).',
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A **semitone** (half step) is the smallest unit here — the distance of **one fret**. Two frets = one **whole tone** (whole step). Everything in harmony is measured in semitones.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The rule that unlocks the whole neck:** among the 7 natural notes, the gap between any two adjacent letters is a **whole step (2 frets)** — *except* **{{B}}→{{C}}** and **{{E}}→{{F}}**, which are **half steps (1 fret)**. That is why there is no {{B}}♯/{{C}}♭ and no {{E}}♯/{{F}}♭: those pairs are already next-door neighbours. Memorise this one exception and you can deduce every natural note on the fretboard by counting from any known note.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      widgets: ['piano', 'fretboard'],
      caption:
        'Now explore: click a piano key **or** a fret — every occurrence of that note lights up on both instruments at once. The keyboard and the fretboard are two maps of the same 12 notes.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Standard tuning & the "kink"',
    },
    {
      kind: 'text',
      markdown:
        'Your guitar is tuned **{{E}}–{{A}}–{{D}}–{{G}}–{{B}}–{{E}}** (low to high). The interval between adjacent strings is a **perfect 4th** — *except* between the {{G}} and {{B}} strings, which is a **major 3rd**. This "kink" is the single most important fact shaping every chord shape you know. It is why a {{G}}-barre chord shape slides unchanged but the high strings need a one-fret shift.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'E', fretCount: 12 },
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 0 },
        { string: 5, fret: 0 },
        { string: 4, fret: 0 },
        { string: 3, fret: 0 },
        { string: 2, fret: 0 },
        { string: 1, fret: 0 },
      ],
      play: { kind: 'open-strings', order: 'low-to-high', stagger: 0.55 },
      caption:
        'The six open strings — {{E}} {{A}} {{D}} {{G}} {{B}} {{E}}, low → high. Press **Play strings** to hear them struck 6 → 1; each string lights up as it sounds. The big leap you hear between the {{G}} and {{B}} strings is the major-3rd "kink".',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Finding any note',
    },
    {
      kind: 'text',
      markdown:
        'You do not need to memorise all 6 strings × 12 frets at once. Use this strategy:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Learn the notes on **strings 6 and 5** first (low {{E}} and {{A}}) — they are the roots of most chord shapes and the foundation everything else is built on.',
        'Memorise a few **anchor notes** on those two strings (the “Big Six” below) so you always have a known landmark nearby.',
        'Learn the **octave shapes** to jump from a known note on strings 6/5 to the same note on the inner strings — there are two families, because the {{G}}–{{B}} kink changes the offset.',
        'Deduce any other note by stepping at most a whole step from an anchor, using the {{B}}–{{C}} / {{E}}–{{F}} rule.',
      ],
    },
    {
      kind: 'widget',
      selection: { showAllNotes: true, fretCount: 12 },
      strings: [6, 5],
      widgets: ['fretboard'],
      caption:
        'Your roadmap: every note on strings 6 and 5, labelled. Learn these two rows first — every other string is reached from them via octave shapes.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      strings: [6, 5, 4, 3],
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 8 },
        { string: 4, fret: 10 },
        { string: 5, fret: 3 },
        { string: 3, fret: 5 },
      ],
      caption:
        'Octave shapes, family 1 (below the kink): all four dots are {{C}}. A note on string 6 (fret 8) reappears **2 frets higher** on string 4 (fret 10); string 5 (fret 3) → string 3 (fret 5). Same offset, both pairs. Press **Play** to hear them ring in turn.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'G', fretCount: 12 },
      strings: [4, 3, 2, 1],
      widgets: ['fretboard'],
      voicing: [
        { string: 4, fret: 5 },
        { string: 2, fret: 8 },
        { string: 3, fret: 0 },
        { string: 1, fret: 3 },
      ],
      play: { kind: 'phrase', stagger: 0.4 },
      caption:
        'Octave shapes, family 2 (crossing the kink): all four dots are {{G}}. Here the offset jumps to **3 frets** — string 4 (fret 5) → string 2 (fret 8), and string 3 (fret 0) → string 1 (fret 3). The {{G}}–{{B}} major-3rd kink is *why*: crossing it adds the extra fret. Two families, one kink — that is the whole system.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      strings: [6, 5],
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 3, label: 'G' },
        { string: 5, fret: 3, label: 'C' },
        { string: 6, fret: 5, label: 'A' },
        { string: 5, fret: 5, label: 'D' },
        { string: 6, fret: 7, label: 'B' },
        { string: 5, fret: 7, label: 'E' },
      ],
      play: { kind: 'phrase', stagger: 0.35 },
      caption:
        'The **“Big Six” anchors** — six notes at frets 3, 5, and 7 on strings 6 and 5: {{G}}/{{C}}, {{A}}/{{D}}, {{B}}/{{E}}. Add the open strings and the 12th fret and you have a grid of known notes. From any of them you are **never more than a whole step** from the note you are looking for — count up or down with the {{B}}–{{C}} / {{E}}–{{F}} rule and you land on it.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The notes at **fret 12** are exactly the open-string names ({{E}} {{A}} {{D}} {{G}} {{B}} {{E}}), one octave up. The fret markers (dots at 3, 5, 7, 9, 12) are your landmarks — use them to jump by 3rds, 4ths, and 5ths without counting.',
    },
    {
      kind: 'widget',
      selection: { clear: true, followRoot: true, root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      steppers: { root: true },
      caption:
        'Note-finder: use **+/−** to cycle the note name ({{C}} → {{C#}} → {{D}} → …) and watch every occurrence of that pitch class light up across the whole neck. Find a note, then spot its octave 12 frets up.',
    },
    {
      kind: 'text',
      markdown:
        '**Try it free:** click any fret below to hear the note and see every other occurrence of that pitch class light up. Use **◀/▶** to slide the window up the neck and explore higher positions.',
    },
    {
      kind: 'widget',
      selection: { clear: true, root: 'C', fretCount: 12 },
      widgets: ['fretboard'],
      steppers: { position: true },
      caption: 'Free-exploration mode: click frets to build your own set of highlighted notes.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'How to actually learn this',
    },
    {
      kind: 'text',
      markdown:
        'Knowing the map is not the same as *internalising* it — being able to name a note instantly, without counting. That only comes from short, frequent reps. The consensus across every teacher who covers this topic: **five minutes a day, four or five times a week, beats an hour of cramming.** Your brain laid down the note names the way it laid down the keyboard under your fingers — through repetition, not effort.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Spell the alphabet up one string.** Start on the open note, play and **say each note name aloud** as you climb: open → {{E}}, then {{F}} (1 fret — the {{E}}–{{F}} half step), then {{G}}, {{A}}, {{B}}, {{C}} (1 fret — the {{B}}–{{C}} half step), {{D}}, back to {{E}} at fret 12. If fret 12 is not the open-string name, something went wrong.',
        '**Find one note on every string.** Pick a note (say {{A}}). With a metronome at ~40 bpm, find and play an {{A}} on each string in turn, low → high → low. Say the name as you play it. Then pick another note.',
        '**Check yourself with a tuner.** Clip-on tuners display the note name — play your guess, glance at the tuner, and you get instant, honest feedback with no cheat-sheet needed.',
        '**Use the anchors, then remove them.** Rely on the Big Six and octave shapes at first; once a note feels automatic, stop counting to it and let it become a reflex.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Say it out loud.** This is not a gimmick — naming the note as you play it engages your ear *and* your voice *and* your fingers at once, which is how the association actually sticks. Silent practice is roughly half as effective.',
    },
  ],
  sources: [
    {
      author: 'JustinGuitar',
      title: 'The 5-Minute Fretboard Method',
      url: 'https://www.youtube.com/watch?v=S0FJI6O62PQ',
      note: 'The “Big Six” anchor notes (frets 3/5/7 on strings 6 & 5) and the “never more than a tone from a known note” deduction principle; the case for short, daily 5-minute practice sessions over cramming.',
    },
    {
      author: 'GuitarZero2Hero',
      title: 'Learn The Fretboard — How To Memorize The Notes Of The Guitar',
      url: 'https://www.youtube.com/watch?v=jTCyiq5mjn8',
      note: 'The complete set of octave-shape shortcuts (including the 3-fret shapes that cross the G–B kink) and the internalisation exercises — single-string spelling, one-note-per-string with a metronome, and octave-shape jumping.',
    },
    {
      author: 'Marty Music',
      title: 'Learn Every Note on the Fretboard',
      url: 'https://www.youtube.com/watch?v=WQ8DSYD2kvw',
      note: 'The clearest statement of the B–C / E–F half-step rule and the anchor-and-deduce method — memorise a few landmark notes, then count whole and half steps to find any neighbour.',
    },
  ],
}
