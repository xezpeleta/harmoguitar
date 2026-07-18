/**
 * Lesson 17 — Voice Leading & Guide Tones
 * Source: RESEARCH.md §23
 *
 * The art of moving from chord to chord with the least unnecessary motion.
 * Deepens the guide-tone idea from the Blues & ii–V–I lesson and explains the
 * "horn player's secret" from the Félix Santos class: arpeggiating the guide
 * tones of substitute chords so the harmony is felt even with no accompanist.
 */
import type { Lesson } from '$lib/content/schema'

export const voiceLeadingGuideTones: Lesson = {
  id: 'voice-leading-guide-tones',
  slug: 'voice-leading-and-guide-tones',
  title: 'Voice Leading & Guide Tones',
  summary: 'Moving between chords with the least motion — and why the 3rd & 7th are all you really need.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Voice leading** is the art of moving from one chord to the next with the **least unnecessary motion** — each "voice" (note) moves by the smallest possible interval, ideally a step. Good voice leading makes a progression sound smooth, connected, and professional; bad voice leading sounds jumpy and amateur. It is the invisible craft behind every great accompanist and arranger.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The golden rules',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Keep common tones.** If two chords share a note, leave that finger where it is.',
        '**Move the other voices by step** (half or whole), not by leap.',
        '**Resolve tendency tones** in their natural direction: the 3rd of V7 (the leading tone) pulls up to the tonic; the 7th of V7 falls by step.',
        '**The 3rd and 7th (guide tones) are paramount.** They define the chord; the 5th — and often the root — can be omitted.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The bass is free.** The rules of voice leading apply to the *inner voices* — the 3rds, 7ths, and colour tones. The bass is an independent voice: it can leap by a 4th or 5th (the circle-of-fifths root motion) while the upper voices glide by half steps. This is why inversions exist — not as ends in themselves, but as tools to keep the upper voices smooth while the bass does whatever it needs to do.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Guide tones: the 3rd and the 7th',
    },
    {
      kind: 'text',
      markdown:
        'Of a chord\'s four notes, only **two really matter**: the **3rd** (which says major or minor) and the **7th** (which says the color — maj7, dom7, m7…). The root just names the chord; the 5th is usually a perfect 5th and adds almost no information. Jazz players call the 3rd and 7th the **guide tones** — they *guide* the harmony and the voice leading.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why not the root or the 5th?** When you are improvising, the root is the *least* useful note — the bass player is already playing it, and the comping instrument probably is too. The 5th is a filler note: it is almost always a perfect 5th and tells you nothing about whether the chord is major, minor, or dominant. The **3rd tells you the quality** (major or minor); the **7th tells you the flavour** (maj7, dom7, m7). So 3rds and 7ths give you the *maximum harmonic information* with the *minimum number of notes*. That is why horn players — who can only play one note at a time — live on guide tones.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'G' },
      widgets: ['fretboard', 'staff'],
      caption: 'G7 ({{G}} {{B}} {{D}} {{F}}). The guide tones are {{B}} (3rd) and {{F}} (7th) — the tritone that wants to resolve. {{D}} (5th) and even {{G}} (root) are expendable.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The ii–V–I guide-tone miracle',
    },
    {
      kind: 'text',
      markdown:
        'Here is the magic of the ii–V–I in C ({{D}}m7 – {{G}}7 – {{C}}maj7). Watch only the 3rds and 7ths:',
    },
    {
      kind: 'table',
      headers: ['Chord', '3rd', '7th'],
      rows: [
        ['{{D}}m7', '{{F}}', '{{C}}'],
        ['{{G}}7', '{{B}}', '{{F}}'],
        ['{{C}}maj7', '{{E}}', '{{B}}'],
      ],
    },
    {
      kind: 'list',
      items: [
        'The **3rd of {{D}}m7 ({{F}}) becomes the 7th of {{G}}7 ({{F}})** — same note, stays put.',
        'The **7th of {{D}}m7 ({{C}}) steps down to {{B}}** — the 3rd of {{G}}7.',
        'The **3rd of {{G}}7 ({{B}}) becomes the 7th of {{C}}maj7 ({{B}})** — same note, stays put.',
        'The **7th of {{G}}7 ({{F}}) steps down to {{E}}** — the 3rd of {{C}}maj7.',
      ],
    },
    {
      kind: 'text',
      markdown:
        'Across the whole progression, two notes ({{F}} and {{B}}) just **swap which is the 3rd and which is the 7th** — they barely move. This is why **guide-tone comping** (playing only 3rds and 7ths) works so well: the harmony is fully defined and the voice leading is almost automatic.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The horn player\'s secret',
    },
    {
      kind: 'text',
      markdown:
        'Saxophonists and trumpeters — Charlie Parker, Dizzy Gillespie — could not play full chords: they sound **one note at a time**. So how does a soloist make the harmony *change* underneath them when nobody is comping? They **arpeggiate the guide tones of each chord** (and its substitutions) in their melodic line.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'When a horn player lands on the **3rd and 7th of each chord in turn**, the listener *hears* the harmony shift — even with no accompanist. The guide tones are so characteristic that outlining them melodically is enough to imply the whole progression. This is why transcribing bebop solos reveals so many 3rds and 7ths on strong beats.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Guide-tone lines as compound melody.** When you connect 3→7→3→7 across a progression, you create a hidden melodic line *beneath* your solo surface. This is called **compound melody** — a single-note line that implies two melodies at once (your actual melody on top, the guide-tone line underneath). Charlie Parker was a master of this: in *Blues for Alice*, the surface melody dances around, but the guide tones (3rds and 7ths on strong beats) tell the whole harmonic story. Bach did the same thing centuries earlier. Practice landing guide tones *on or near the downbeat* of each chord — they become signposts that your ear navigates by.',
    },
    {
      kind: 'widget',
      selection: { chordType: 'm7', root: 'D' },
      widgets: ['fretboard', 'staff'],
      caption: 'Dm7 — target its 3rd ({{F}}) and 7th ({{C}}) in a melody. Hit “Play progression” to hear the ii–V–I and listen for how the 3rds and 7ths connect.',
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
      text: 'Voice leading a tritone sub',
    },
    {
      kind: 'text',
      markdown:
        'The tritone substitution from the previous lesson works *because* of voice leading. Replace {{G}}7 with {{Db}}7 and the guide tones are the same two notes ({{F}} and {{B}}/{{Cb}}), just swapped — so the sub voice-leads just as smoothly as the original, with the bonus of a chromatic descending bass ({{D}} → {{Db}} → {{C}}).',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dom7', root: 'Db' },
      widgets: ['fretboard', 'staff'],
      caption: 'Db7 — the tritone sub of G7. Its guide tones ({{F}}, {{Cb}}) are the same as G7\'s ({{F}}, {{B}}), so it voice-leads into Cmaj7 identically — with a half-step bass bonus.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Once you think in guide tones, substitutions stop being "different chords" and become **different roots under the same two notes.** That is the whole secret of jazz harmony on the guitar — and it leads directly to the next lesson: keeping those guide tones while you walk the bass through inversions and passing chords.',
    },
  ],
  sources: [
    {
      author: 'Félix Santos',
      title: 'Master Class de Armonía, Jazz y Blues',
      url: 'https://www.youtube.com/watch?v=1C0mF-utIlI',
      note: 'The \u201chorn player\u2019s secret\u201d — arpeggiating guide tones (3rds & 7ths) as the backbone of jazz soloing, so the harmony is felt even with no accompanist.',
    },
    {
      author: 'Berklee Online',
      title: 'Music Theory Fundamentals: The Rules of Voice Leading',
      url: 'https://www.youtube.com/watch?v=gvFiHUkhraE',
      note: 'Three rules: use common tones, move by half/whole step, avoid leaps greater than a third. The bass is an independent voice that can move freely while upper voices stay smooth. Inversions are tools for voice leading, not ends in themselves.',
    },
    {
      author: 'Scott Paddock',
      title: 'VOICE LEADING EXPLAINED',
      url: 'https://www.youtube.com/watch?v=aEMI19UmN20',
      note: 'Two rules for horn players: (1) move to the closest note possible, (2) give as much information about the chord as possible. The root is least useful (bassist already plays it); the 5th is filler. The 3rd tells quality (major/minor); the 7th tells flavour (maj7/dom7/m7). 3rd→7th or 7th→3rd by half step = maximum information.',
    },
    {
      author: 'Jeremy Siskind',
      title: '5 Levels of Guidetone Lines (Jazz Improvisation Tutorial)',
      url: 'https://www.youtube.com/watch?v=0hQXFADTjtY',
      note: 'Guide-tone lines as compound melody — a single-note line that implies a second melody beneath the surface (3→7→3→7 on strong beats). Charlie Parker\u2019s Blues for Alice as a masterclass. Three practice methods: hit guide tones on downbeats, use as top notes of phrases, use as bottom notes.',
    },
  ],
}
