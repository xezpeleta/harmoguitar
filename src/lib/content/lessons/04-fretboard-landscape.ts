/**
 * Lesson 4 — The Fretboard Landscape: Green Lights & Red Tonic
 * Source: RESEARCH.md §29 (Associative Learning) — the Metheny visualization
 *
 * Right after learning the major scale, before any box habits form: a way to
 * SEE the whole neck as one connected map. Every scale tone lights up green
 * across the entire fretboard; the tonic (root) lights up red. This is the
 * "green lights & red tonic" image Pat Metheny described — the cure for
 * box-thinking, stepwise playing, and losing the root.
 */
import type { Lesson } from '$lib/content/schema'

export const fretboardLandscape: Lesson = {
  id: 'fretboard-landscape',
  slug: 'the-fretboard-landscape',
  title: 'The Fretboard Landscape: Green Lights & Red Tonic',
  summary: 'See the whole neck at once: every scale tone lit green, the tonic lit red. The cure for box-thinking — straight from Pat Metheny.',
  minutes: 12,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You just learned what a major scale **is** — seven notes, a pattern of whole and half steps. Now learn to **see** it. Most guitarists learn scales in "boxes" — five or seven little shapes, each covering four frets. They get good at running one box, then freeze when the melody wants to go higher or lower. Pat Metheny described a different picture: when he improvises in a key, he does not see boxes. He sees **every available note in that scale, across the entire neck, lit up like green lights — and the tonic (the root) lit up red.** The neck is not a puzzle of interlocking shapes. It is one continuous landscape of green lights, with red lights marking home.',
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The neck is **smaller than it looks.** Two facts halve the work. First, **everything repeats at the 12th fret** — the notes from fret 0 to 11 are mirrored exactly from fret 12 to 23, one octave higher. Master the first twelve frets and you have mastered the whole instrument. Second, **standard tuning gives you two {{E}} strings** — the lowest and highest. Whatever you learn on the low {{E}} string you know on the high {{E}} string for free. So the real territory to map is not 6 strings × 15 frets; it is 5 distinct strings × 12 frets — and the octave shapes from Lesson 1 stitch even those together.',
    },
    {
      kind: 'heading',
      level: 2,
      text: 'The whole landscape at once',
    },
    {
      kind: 'text',
      markdown:
        'Here is {{C}} major seen the Metheny way. Every **{{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}}** across all six strings and fifteen frets is a **green light** — a note you can play. Every **{{C}}** (the tonic, the root) is a **red light** — home base. That is the whole picture: a field of green with red anchors. Use **+/−** to change the key and watch the *entire landscape* re-colour — the green field shifts, the red anchors relocate, but the map stays one connected piece.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', greenLights: true },
      widgets: ['fretboard'],
      steppers: { root: true },
      caption:
        'C major as a landscape: green = any scale tone you can play, red = the tonic (home). Every dot is a available note; the red ones are where you resolve. Cycle the root with **+/−** and the whole field re-keys instantly — same map, new home.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Compare this to a piano. A pianist playing in {{C}} major does not think in boxes — they just see all the white keys laid out in front of them, and they can jump from a low {{C}} to a high {{G}} because the layout is obvious. The green-lights image turns the guitar neck into that same kind of keyboard: a single field of available notes, not a maze of shapes.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Step 1 — Map the red lights first',
    },
    {
      kind: 'text',
      markdown:
        'Before you can see the whole green field, you must know where home is. Find **every {{C}}** on the fretboard — not by hunting, but by knowing instantly. These red anchors are your safety net: if you get lost mid-phrase, aim for the nearest red light and you are home.',
    },
    {
      kind: 'widget',
      selection: { followRoot: true, greenLights: true },
      widgets: ['fretboard'],
      steppers: { root: true },
      caption:
        'Red lights only — every occurrence of the tonic. These are your anchors. Close your eyes, visualise where the next red light is, then open them and check. Cycle the root to re-map home for any key.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Step 2 — Light up the green, one string at a time',
    },
    {
      kind: 'text',
      markdown:
        'Trying to see all the green lights at once is overwhelming. Break it down **horizontally**. Play the {{C}} major scale up and down a *single string* — you learn the intervals in a line, not a box. Here is the high {{E}} string alone: every green light on it is a C-major note, with the red {{C}}\'s as anchors. Do this for each string until the green lights distribute themselves linearly in your mind.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Single-string practice does double duty: it breaks the vertical box habit **and** trains your ear. On one string the intervals unfold one after another — you hear the size of each step in sequence, the way a singer or a horn player does. That linear hearing is the foundation of melodic playing; boxes, by contrast, let your fingers run ahead of your ear.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C', greenLights: true },
      strings: [1],
      widgets: ['fretboard'],
      caption:
        'C major on the high {{E}} string only — the green lights in a line. This breaks the vertical "box" habit and teaches the scale horizontally. Repeat on every string until each one is a familiar line of green.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The **octave shapes** you learned in Lesson 1 are how the red lights connect across strings: a {{C}} on string 6 lives again two frets higher on string 4, and so on. Once the red anchors are mapped, the green lights fill in between them — the whole landscape grows outward from the roots.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Step 3 — The piano-key view',
    },
    {
      kind: 'text',
      markdown:
        'Here is the same {{C}} major on a keyboard — the pianist\'s view. Every white key is a green light; the {{C}}\'s are red. A pianist jumps freely between any two lit keys because they see them all at once. Pair this with the fretboard landscape above and you have two maps of the same territory: the guitar neck and the piano keyboard, both one continuous field of green with red home notes.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', greenLights: true },
      widgets: ['piano'],
      steppers: { root: true },
      caption:
        'C major on the keyboard — every scale tone green, the tonic red. The pianist\'s "all white keys" view, made literal. Cycle the root and watch the green field and red anchors shift together.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Step 4 — Jump, don\'t walk',
    },
    {
      kind: 'text',
      markdown:
        'Boxes teach you to play **stepwise** — shuffling to the next-door note, which sounds like an exercise. The green-lights landscape lets you **jump**: pick any two lit spots and connect them directly. Here is a phrase that leaps across the whole neck — low {{C}} on string 6, up to high {{G}} on string 1, down to mid {{E}} on string 4, back up to high {{C}}. You can only make these jumps if you see the lights; if you see boxes, you are stuck walking. Press **Play** and follow each dot as it rings.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C', greenLights: true },
      widgets: ['fretboard'],
      voicing: [
        { string: 6, fret: 8, label: '1' },
        { string: 1, fret: 3, label: '5' },
        { string: 4, fret: 2, label: '3' },
        { string: 1, fret: 8, label: '1' },
      ],
      play: { kind: 'phrase', stagger: 0.45 },
      caption:
        'A wide-jump phrase: low {{C}} (red) → high {{G}} (green) → mid {{E}} (green) → high {{C}} (red). Each leap spans the neck — impossible from a single box, natural if you see the landscape. The red dots are home; the green dots are everywhere you can go.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'The whole point of the green-lights image is to **stop playing stepwise**. If your solo sounds like a scale exercised up and down, you are still in a box. Pick a green light far from where you are and go straight to it — then another — and let the red lights catch you when you want to resolve. **Jump, don\'t walk.**',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Boxes, CAGED, and the green-lights view',
    },
    {
      kind: 'text',
      markdown:
        'You may have heard of the **CAGED system** — five chord shapes (C, A, G, E, D) that tile the fretboard and give you a map of arpeggios and scales in every position. It is a powerful and legitimate tool. So where does it fit with the green-lights image? **Boxes are subsets of the landscape.** Each CAGED shape is a window onto four or five frets of the green field — a convenient fingering cluster inside the larger map. The danger is not the shapes themselves but *thinking* in shapes: when the neck is five disconnected boxes, you cannot jump between them, and you lose sight of the tonic. The green-lights view does not abolish CAGED — it **connects** the boxes into one continuous field, so a shape becomes a place to rest your hand, not a cage for your mind.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why this works',
    },
    {
      kind: 'list',
      items: [
        '**No more box confinement.** You are not trapped in four frets — the green field extends the whole neck, so you can move freely up and down without "shifting gears" to the next shape.',
        '**No more stepwise playing.** When every available note is visible at once, you naturally pick interesting jumps instead of shuffling to neighbours. Wide intervals sound like music; stepwise scales sound like drills.',
        '**You never lose the root.** The red lights are always on. Wherever you wander in the green field, you can see the nearest red light and resolve there. Losing the tonic is what makes a solo feel lost; the red map prevents it.',
        '**It transfers to every key.** Cycle the root and the *whole landscape* re-colours — one mental model, twelve keys. You are not learning twelve sets of boxes; you are learning one landscape that relocates.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'This image is the foundation of everything that follows. When you learn minor scales, modes, and pentatonics in the lessons ahead, do not learn them as new boxes — ask *"where are the green lights now, and which one is red?"* The landscape changes colour; the method of seeing it stays the same. One neck, one map, home always lit red.',
    },
  ],
  sources: [
    {
      author: 'Pat Metheny',
      title: 'Green lights & red tonic visualization (widely cited)',
      note: 'Metheny described seeing every scale tone lit green across the whole neck with the tonic lit red — a concept referenced across multiple interviews and masterclasses.',
    },
    {
      author: 'BERNTH',
      title: 'How to INSTANTLY visualize the FULL fretboard!',
      url: 'https://www.youtube.com/watch?v=kVNIZPXw3Qo',
      note: 'Two practical simplifications: the 12th-fret repetition (everything mirrors one octave higher, so master frets 0–11) and the low-E/high-E string symmetry (standard tuning gives two identical E strings). Also the “find one note everywhere” exercise using octave shapes.',
    },
    {
      author: 'Steve Stine',
      title: 'The 1-String Practice Method That Unlocks the Fretboard',
      url: 'https://www.youtube.com/watch?v=E-H-iTFwJhM',
      note: 'Why single-string (horizontal) practice trains the ear as well as the fingers: on one string the intervals unfold sequentially, the way a singer or horn player hears them, rather than letting the hand run ahead of the ear inside a vertical box.',
    },
    {
      author: 'Marty Music',
      title: 'The CAGED System for Guitar – Unlock the Entire Fretboard',
      url: 'https://www.youtube.com/watch?v=65s8eIkfwNg',
      note: 'The CAGED system as five chord shapes (C-A-G-E-D) that tile the neck — a legitimate tool for arpeggios and voicings. Positioned here relative to the green-lights view: boxes are fingering clusters inside the larger landscape, useful for the hand but limiting as a mental model.',
    },
  ],
}
