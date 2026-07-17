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
  minutes: 10,
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
      caption: 'Cmaj7 ({{C}} {{E}} {{G}} {{B}}). The shell is {{C}}–{{E}}–{{B}} (root, 3rd, 7th) — the 5th ({{G}}) is optional.',
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
      caption: 'A13 — root, 3rd, ♭7, and 13th. Four notes, one tension (the 13th, {{F#}}). The 5th ({{E}}) and 9th ({{B}}) are omitted to keep it lean. This is the shell+extension method in a single grip.',
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
      caption: 'G7 — find a 4-note cluster on the middle strings (5-4-3-2). That cluster, with the 2nd-from-top note dropped, is a Drop 2. Invert it up the neck for the other three.',
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
  ],
}
