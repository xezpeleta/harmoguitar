/**
 * Lesson 8 — Extended & Altered Chords
 * Source: RESEARCH.md §7
 */
import type { Lesson } from '$lib/content/schema'

export const extendedChords: Lesson = {
  id: 'extended-chords',
  slug: 'extended-and-altered-chords',
  title: 'Extended & Altered Chords (9, 11, 13)',
  summary: 'Stacking thirds past the 7th — colour tones and the altered dominants of jazz.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'Once you have a 7th chord, you can keep stacking thirds to get **extensions**: the 9th, 11th, and 13th. These add colour and richness, especially in jazz. This lesson is a *light* introduction — the deep jazz voicings (shell + extension, Drop 2 / Drop 3) are covered in the **Jazz Comping Voicings** lesson.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Extensions are just **scale degrees counted past 7**. Continue the major scale into the next octave: 8 (root), 9 (the 2nd), 10 (3rd), 11 (4th), 12 (5th), 13 (6th), 14 (7th). Because you stack in thirds, only the odd numbers land: **9, 11, 13**. A theoretical 13th chord is the entire scale stacked in thirds — all 7 notes at once.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Extensions = scale degrees an octave up',
    },
    {
      kind: 'list',
      items: [
        '**9th** = the 2nd, an octave above the 7th',
        '**11th** = the 4th, an octave above the 9th',
        '**13th** = the 6th, an octave above the 11th',
      ],
    },
    {
      kind: 'text',
      markdown:
        'A theoretical 13th chord contains all 7 notes of the scale. In practice, guitarists **omit notes** (usually the 5th, sometimes the root) to make them playable. The essential notes are always the **3rd and 7th** — they define the chord\'s quality.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why is the 5th the first note to omit?** Because it is the most harmonically neutral tone — a perfect 5th is present in both major and minor, so dropping it changes the sound the least. But if the 5th is *altered* (♭5 or ♯5), it becomes a defining colour tone and **must** be played. The rule: omit the neutral, keep the character.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Extension vs. add — the critical difference',
    },
    {
      kind: 'text',
      markdown:
        'The most common source of confusion: **C9** and **Cadd9** are different chords. An extension number (9, 11, 13) *implies the 7th is already there*. The word \u201cadd\u201d means \u201ctriad only, plus this one note, no 7th.\u201d',
    },
    {
      kind: 'table',
      headers: ['Symbol', 'Means', 'Notes (C root)', 'Has 7th?'],
      rows: [
        ['C9', 'dom7 + 9', '{{C}} {{E}} {{G}} {{Bb}} {{D}}', 'Yes (♭7)'],
        ['Cadd9', 'triad + 9', '{{C}} {{E}} {{G}} {{D}}', 'No'],
        ['Cmaj9', 'maj7 + 9', '{{C}} {{E}} {{G}} {{B}} {{D}}', 'Yes (maj7)'],
        ['Cm11', 'm7 + 11', '{{C}} {{Eb}} {{G}} {{Bb}} {{D}} {{F}}', 'Yes (♭7)'],
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'The **highest extension wins** in the name. \u201cCmaj13\u201d does not mean \u201cmaj7 + 13 only\u201d — it means the 13th is the highest extension, and the 9 and 11 *may* be present (you choose). When a composer wants a specific combination, they write it out: \u201cCmaj9 13.\u201d If an extension is altered, the 7th appears in the name too: \u201cC7♯11,\u201d not \u201cC♯11.\u201d',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Common extended chords',
    },
    {
      kind: 'table',
      headers: ['Symbol', 'Meaning', 'Notes (C root)'],
      rows: [
        ['Cmaj9', 'maj7 + 9', '{{C}} {{E}} {{G}} {{B}} {{D}}'],
        ['C9', 'dom7 + 9', '{{C}} {{E}} {{G}} {{Bb}} {{D}}'],
        ['Cm9', 'm7 + 9', '{{C}} {{Eb}} {{G}} {{Bb}} {{D}}'],
        ['Cmaj13', 'maj7 + (9) + 13', '{{C}} {{E}} {{B}} {{D}} {{A}}'],
        ['C13', 'dom7 + (9) + (11) + 13', '{{C}} {{E}} {{Bb}} {{D}} {{A}}'],
        ['Cm11', 'm7 + 11', '{{C}} {{Eb}} {{G}} {{Bb}} {{D}} {{F}}'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: 'maj9', root: 'C' },
      widgets: ['fretboard', 'staff'],
      caption: 'Cmaj9 — a Cmaj7 with a 9th ({{D}}) added for colour.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm11', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dm11 — the classic iim11 sound. Try it before resolving to G7 → Cmaj7.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Altered dominant chords',
    },
    {
      kind: 'text',
      markdown:
        'Dominant 7 chords can have **altered** extensions — notes not in the parent major scale — to increase tension before resolution:',
    },
    {
      kind: 'table',
      headers: ['Alteration', 'Degree', 'Effect'],
      rows: [
        ['♭9', '♭9', 'tense, dark'],
        ['♯9', '♯9', 'bluesy ("Hendrix chord": 7♯9)'],
        ['♯11', '♯4 / ♯11', 'Lydian dominant, whole-tone-ish'],
        ['♭13', '♭13 / ♭6', 'dark, resolves to the 3rd of the tonic'],
      ],
    },
    {
      kind: 'widget',
      selection: { chordType: '7b9', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7♭9 — extra tension before resolving to C. The ♭9 ({{Ab}}) wants to fall to {{G}} or rise to {{B}}.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A chord marked **"alt"** or **"7alt"** means "play altered extensions" (typically ♭9 and/or ♯9, ♭5/♯5, ♭13). The default scale is the **altered scale** — a v1.1 topic.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The "shell + extension" method',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Play a **shell voicing** — root, 3rd, 7th (the essential notes).',
        'Add **one** extension on top for colour.',
        'Natural 9, 11, 13 are "inside"; ♭9, ♯9, ♯11, ♭13 are "altered."',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'Not every extension works on every chord. A natural 11 on a major 7 **clashes** with the 3rd — use ♯11 instead (that is the Lydian sound). When in doubt: if it sounds good, it is good — experiment.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Why does ♯11 sound better than natural 11 on a major chord?** It is the **minor-9th rule**: look at the interval between the 3rd and the 11th. In Cmaj11, that is {{E}}–{{F}} — a minor 9th, one of the most dissonant intervals. Raise the 11 to {{F#}} (Cmaj7♯11) and the interval becomes a major 9th — consonant. This is not a rule someone invented; it is the physics of consonance. The same principle explains why ♭9 on a dominant chord adds deliberate tension (a minor 9th with the root), and why the ♯9 on a 7 chord sounds bluesy — it is the \u201cblue note\u201d (enharmonic minor 3rd) sitting on top of the major 3rd.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Extensions as upper-structure triads.** The extensions of a chord are themselves another chord. Stack thirds on Dm7 ({{D}} {{F}} {{A}} {{C}}) and you get {{E}} on top = Dm9. Keep going: {{G}} = Dm11, {{B}} = Dm13. But notice that {{F}} {{A}} {{C}} {{E}} is an Fmaj7 chord — so Dm9 is \u201cFmaj7 over D.\u201d This is the **upper-structure** view: instead of thinking \u201cadd a 9th,\u201d think \u201cplay a different chord on top of the bass note.\u201d It is a powerful shortcut for both comping and soloing — arpeggiate the upper-structure triad and you automatically hit all the right extensions.',
    },
  ],
  sources: [
    {
      author: 'MusicTheoryForGuitar',
      title: 'EXTENDED (9 11 13) And ALTERED (#11, b9, etc) CHORDS',
      url: 'https://www.youtube.com/watch?v=-Elz-OxngKI',
      note: 'The clearest explanation of the numbering system (9 = 2nd an octave up, 11 = 4th, 13 = 6th), the \u201cadd\u201d vs extension distinction, and the rule that the highest extension name wins (Cmaj13 implies 9 and 11 may be present). Also why the 5th is the first note to omit.',
    },
    {
      author: 'MangoldProject',
      title: 'How to Choose Chord Tensions? (#9, b9, #11, etc)',
      url: 'https://www.youtube.com/watch?v=RFH1LD4KdWs',
      note: 'The minor-9th interval rule for choosing tensions: look at the 9th intervals between chord tones. A minor 9th = dissonant (e.g., E–F in Cmaj11); raise to ♯11 to make it a major 9th = consonant. Also why ♭9 and ♯9 work in a blues context — they come from the blues scale.',
    },
    {
      author: 'Rotem Sivan',
      title: 'The 4-Level Chord Color Trick',
      url: 'https://www.youtube.com/watch?v=oYI1eMBSqig',
      note: 'Extensions as upper-structure triads: stacking thirds on Dm7 gives Fmaj7 (= Dm9), Am7 (= Dm11), Cmaj7 (= Dm13). Instead of thinking \u201cadd a 9th,\u201d think \u201cplay Fmaj7 over D in the bass.\u201d A powerful shortcut for comping and soloing.',
    },
    {
      author: 'QJamTracks',
      title: 'Extended Guitar Chords Demystified',
      url: 'https://www.youtube.com/watch?v=pIGM2LqwGeI',
      note: 'The full naming convention: extended chords are always built on 7th chords (the 7th is implied, not notated), \u201cadd\u201d means triad + extension without the 7th, altered extensions require the 7th in the name (C7♭9, not C♭9), and the note hierarchy for omission (5th first, then root, but never the 3rd or 7th).',
    },
  ],
}
