/**
 * Lesson 19 — Jazz Comping Voicings
 * Source: RESEARCH.md §22
 *
 * Condensing big barre chords into playable 4-note jazz voicings: shell +
 * extension, Drop 2, and Drop 3. Mirrors the "acordes de jazz a 4 voces y
 * tensiones" section of the Félix Santos class, including the A13 grip.
 */
import type { Lesson } from '$lib/content/schema'

export const jazzCompingVoicings: Lesson = {
  id: 'jazz-comping-voicings',
  slug: 'jazz-comping-voicings',
  title: 'Jazz Comping Voicings',
  summary: 'Why 6-string barre chords muddy the mix — and the 4-note shapes that sound instantly professional.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Six-string barre chords are loud, they are easy, and in a jazz ensemble they are **too much.** Stacking all six strings doubles notes, clutters the midrange, and steps on the bassist and pianist. Jazz guitarists **condense** each chord to the few notes that actually define it, freeing up fingers and sonic space. The result is voicings that sound instantly "pro."',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The four essential voices',
    },
    {
      kind: 'text',
      markdown:
        'A useful jazz voicing keeps **four** kinds of note, and omits the rest:',
    },
    {
      kind: 'table',
      headers: ['Voice', 'Why it matters'],
      rows: [
        ['**Root**', 'Tells you which chord it is (and the bassist often has this covered).'],
        ['**3rd**', 'Decides major vs minor — the chord\'s "gender."'],
        ['**7th**', 'Decides the color — maj7, dom7, m7… the jazz fingerprint.'],
        ['**One tension**', 'A 9th, 11th, or 13th on top for color and modernity.'],
      ],
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **5th is usually omitted** — it is almost always a perfect 5th and adds almost no information about the chord\'s quality or function. (Skip it only when it is altered, as in ♭5 or ♯11 chords.) The root, too, can go when a bassist is handling it — leaving just 3rd, 7th, and a tension, the classic **three-note comping** shape.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Shell voicings: root + 3rd + 7th',
    },
    {
      kind: 'text',
      markdown:
        'The simplest jazz voicing is the **shell**: root, 3rd, 7th. Three notes, the 5th left out. Shells are easy, mobile, and voice-lead perfectly (you learned why in the Voice Leading lesson: the 3rd of one chord becomes the 7th of the next, so you barely move). Add a 9th or 13th on the remaining string for instant color.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj7', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj7 shell — root ({{C}}), 3rd ({{E}}), 7th ({{B}}). The 5th ({{G}}) is omitted. Three notes, instantly jazzy.',
      voicing: [
        { string: 5, fret: 3, label: 'R' },
        { string: 4, fret: 2, label: '3' },
        { string: 3, fret: 4, label: '7' },
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The A13 grip from the class',
    },
    {
      kind: 'text',
      markdown:
        'Félix Santos\'s example is an **{{A}}13** — a shell with a 13th on top. Four notes, no 5th, big sound:',
    },
    {
      kind: 'table',
      headers: ['String', 'Note', 'Role'],
      rows: [
        ['6th (low E), fret 5', '{{A}}', 'Root'],
        ['4th (D), fret 5', '{{G}}', '♭7 (the jazz color)'],
        ['3rd (G), fret 6', '{{C#}}', '3rd (major)'],
        ['2nd (B), fret 7', '{{F#}}', '13th (the tension)'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom13', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A13 grip — four notes: root, ♭7, 3rd, 13th. The 5th ({{E}}) and 9th ({{B}}) are omitted to keep it lean. The 13th ({{F#}}) is the “money note.”',
      voicing: [
        { string: 6, fret: 5, label: 'R' },
        { string: 4, fret: 5, label: '♭7' },
        { string: 3, fret: 6, label: '3' },
        { string: 2, fret: 7, label: '13' },
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Once you own this shape (and slide it to its inversions), your comping immediately sounds like a working musician\'s. The 13th is the "money note" — that one tension on top of the shell is what separates a jazz dominant from a rock power chord.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Drop 2 voicings',
    },
    {
      kind: 'text',
      markdown:
        'The most important comping system in jazz guitar is **Drop 2**. Start with a closed-position 7th chord (four notes stacked in thirds), take the **2nd-highest note and drop it an octave**, and the chord spreads across **four adjacent strings** in a playable, open-sounding shape.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why \u201cdrop\u201d at all? Close vs open position.** A closed-position 7th chord stacks all four notes within a single octave — tight, compact, and on guitar often **physically unplayable** (the frets are too wide for your fingers). Dropping a note down an octave creates an **open-position** voicing that spans *more* than an octave — suddenly the notes are far enough apart to fit on four adjacent strings. That is the whole point of Drop 2: it makes dense piano harmony playable on a guitar neck. Count \u201c1, 2\u201d from the **highest** note down — the 2nd note from the top is the one you drop.',
    },
    {
      kind: 'list',
      items: [
        'For each 7th-chord type (maj7, dom7, m7, m7♭5, dim7) there are **4 inversions** of the Drop 2 voicing (root, 1st, 2nd, 3rd).',
        'Each inversion lives on **3 string sets** (6-5-4-3, 5-4-3-2, 4-3-2-1) — a full vocabulary of roughly 60 voicings.',
        'Drop 2 voicings **voice-lead smoothly** between chords: adjacent chords often share two notes and move only two by step. This is the bread and butter of jazz comping.',
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 Drop 2 (root position, strings 5-4-3-2): 5th–root–3rd–♭7. Hit “Play progression” to hear a ii–V–I comped with shell/Drop-2 voicings.',
      voicing: [
        { string: 5, fret: 5, label: '5' },
        { string: 4, fret: 5, label: 'R' },
        { string: 3, fret: 4, label: '3' },
        { string: 2, fret: 6, label: '♭7' },
      ],
      play: {
        kind: 'progression',
        chords: ['Dm7', 'G7', 'Cmaj7'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Drop 3 voicings',
    },
    {
      kind: 'text',
      markdown:
        '**Drop 3** takes the **3rd-highest note of the closed chord and drops it an octave.** This leaves a **skip between the bass note and the upper structure**, typically played on strings 6-4-3-2 or 5-3-2-1 (a string-skip). Drop 3 sounds **bigger and more open** — the low bass is separated from the upper notes — and is great for bass-less duos or a richer, more orchestral texture.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'When to use which',
    },
    {
      kind: 'table',
      headers: ['Voicing', 'Best for'],
      rows: [
        ['**Shell** (root-3rd-7th)', 'Fast, simple comping; walking-bass-plus-chord; learning ii–V–I voice leading.'],
        ['**Shell + extension**', 'Solo guitar; adding color with one finger.'],
        ['**Drop 2**', 'The default for ensemble comping — full but not muddy, smooth voice leading.'],
        ['**Drop 3**', 'Fuller, lower register; bass-less situations; orchestral sound.'],
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Learning strategy:** learn Drop 2 on the **middle string set (5-4-3-2)** first, all 4 inversions, for maj7, dom7, and m7. That is 12 shapes that will cover most of your comping. Then expand to the other string sets, add m7♭5 and dim7, then add Drop 3. Do not try to learn all 60 at once — build the core, then grow.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The \u201c9th replaces root\u201d superpower.** Once you know your Drop 2 shapes, you can unlock extensions for free. Take a {{C}}m7 voicing, find the root ({{C}}), and replace it with the 9th ({{D}}) — you now have {{C}}m9. But look closely: that {{C}}m9 voicing is *also* an {{Eb}}maj7 voicing (the same four notes rearranged). So if you know your maj7 Drop 2s, you already know your m9 Drop 2s. The same trick turns {{F}}7 into {{F}}9, which is also an {{A}}m7♭5. **One shape, multiple chords** — this is why you should never blindly memorise 60 inversions. Learn what each note *is* against the root, and one grip becomes three chords.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Learn through songs, not inversions.** The biggest mistake is drilling Drop 2 inversions in isolation — you memorise shapes you never use. Instead, pick one song ({{Autumn Leaves}} is the classic) and learn only the 4 chord types it needs: m7, dom7, maj7, and m7♭5. Play them through the progression until the voice leading feels natural. You internalise the shapes *because the song demands them*, not because a chart told you to. Then the same shapes transfer to every other jazz standard.',
    },
  ],
  sources: [
    {
      author: 'Félix Santos',
      title: 'Master Class de Armonía, Jazz y Blues',
      url: 'https://www.youtube.com/watch?v=1C0mF-utIlI',
      note: 'The \u201cacordes cuatríadas y tensiones\u201d section — shell + extension voicings and Drop 2 / Drop 3 grips, including the A13 \u201cmoney note\u201d grip.',
    },
    {
      author: 'Jens Larsen',
      title: 'The Most Powerful System For Jazz Chords',
      url: 'https://www.youtube.com/watch?v=EGgaHggR5U4',
      note: 'Drop 2 spans more than an octave (open position) vs standard inversions (close position, often unplayable on guitar). The \u201c9th replaces root\u201d superpower: Cm9 = Ebmaj7, F9 = Am7♭5 — one shape, multiple chords. Learn through a song (Autumn Leaves), not endless inversions. The bassist covers the root, so the lowest note may be the 5th.',
    },
    {
      author: 'Jamie Holroyd',
      title: 'Jazz Guitar Chords - How to Play Drop 2 and 3 Chords on Guitar',
      url: 'https://www.youtube.com/watch?v=m2TgqgNM5bk',
      note: 'Drop 2 = drop the 2nd note from the top down an octave, starting from close-position stacked thirds. Four inversions on the top four strings (7th, root, 3rd, or 5th on top). The same interval formulas apply to the inner string set (5-4-3-2).',
    },
    {
      author: 'Jared Bork (Sound Guitar Lessons)',
      title: 'Drop Chords Guitar Lesson - Drop 2 & Drop 3 voicings',
      url: 'https://www.youtube.com/watch?v=wmwznh1g19M',
      note: 'Guitarist-friendly explanation: count \u201c1, 2\u201d from the highest note down to find which note to drop. Close position (within an octave) becomes open position (spans more than an octave). A trick to identify whether any seventh-chord shape is Drop 2 or Drop 3.',
    },
  ],
}
