/**
 * Lesson 20 — Pentatonics & Blue Notes
 * Source: RESEARCH.md §3 (pentatonic/blues formulas) + §28 (blue-note usage)
 *
 * Pentatonic scales not as something to run top-to-bottom, but as raw
 * material for embellishment and blue notes. Mirrors the "pentatónicas y las
 * verdaderas blue notes" section of the Félix Santos class — including the
 * golden rule that a blue note is a passing note you never "live on."
 */
import type { Lesson } from '$lib/content/schema'

export const pentatonicBlueNotes: Lesson = {
  id: 'pentatonic-blue-notes',
  slug: 'pentatonic-and-blue-notes',
  title: 'Pentatonics & Blue Notes',
  summary: 'The pentatonic is not a ladder to climb — it is material to embellish. And a blue note never stays.',
  minutes: 9,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The **pentatonic scale** (five notes) is the guitarist\'s comfort blanket — and, taught badly, a trap. Félix Santos gives it a sharp tug of the ear: *playing the scale up and down is not making music.* The sound of blues, jazz, and all Black American music is not the scale itself but the **floreo** (embellishment) and the **blue notes** that bend around it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The two pentatonics',
    },
    {
      kind: 'table',
      headers: ['Scale', 'Formula', 'In A'],
      rows: [
        ['Major pentatonic', '1 2 3 5 6', '{{A}} {{B}} {{C#}} {{E}} {{F#}}'],
        ['Minor pentatonic', '1 ♭3 4 5 ♭7', '{{A}} {{C}} {{D}} {{E}} {{G}}'],
      ],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'minor-pentatonic', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A minor pentatonic — the classic blues/rock scale. Five notes, no half steps, almost impossible to play a "wrong" note. That safety is also its danger.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major-pentatonic', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A major pentatonic — the country/gospel/major-blues sound. Same shapes as minor pentatonic, shifted; the two interlock like a zipper.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The blues scale: pentatonic + the ♭5',
    },
    {
      kind: 'text',
      markdown:
        'Add one note to the minor pentatonic — the **♭5** (the "blue note") — and you get the **blues scale**: 1 ♭3 4 **♭5** 5 ♭7. That single extra note is the source of the slippery, melancholy flavour we call "the blues."',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'blues', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A blues scale ({{A}} {{C}} {{D}} {{Eb}} {{E}} {{G}}). The {{Eb}} is the blue note — the ♭5 wedged between the 4 and the 5.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What a blue note really is',
    },
    {
      kind: 'text',
      markdown:
        'A **blue note** is a *chromatic passing note* — a note that does not belong to the chord or the diatonic scale, slipped in between two that do. The ♭5 is the most famous, but there are many: the ♭3 leaned against a major chord, the ♭7, the ♭5/#4, even slides between major and minor 3rds. What makes them "blue" is not which note it is — it is **how it behaves**.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        '**The golden rule: a blue note is a passing note. You do not live on it.** You pass through it — touching it for an instant on the way to a chord tone a semitone above or below. Land on a blue note and *stop*, and it stops sounding blue and starts sounding wrong. The tension only means something because it resolves.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'How to use them: embellish, don\'t ladder',
    },
    {
      kind: 'list',
      items: [
        '**Don\'t run the scale.** Use two or three notes, then slide off one of them through a blue note into the next. The *floreo* — turns, slides, grace notes, hammer-ons and pull-offs — is where the music lives.',
        '**Approach a chord tone from a semitone below** through a blue note. A {{C}} approached via {{B}} (or {{Cb}}) sings the blues instantly.',
        '**Bend into the note.** On guitar, a quarter-tone bend up to the ♭3 or ♭5 is the most vocal, human sound the instrument makes — that ambiguity between major and minor is the heart of the style.',
        '**Resolve, always.** Every blue note should resolve by half-step into a chord tone. The resolution *is* the blues; the blue note is just the set-up.',
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The harmony under a blue note',
    },
    {
      kind: 'text',
      markdown:
        'Here is the link back to the Passing Chords lesson. When the melody leans on a blue note, the chord underneath is very often a **diminished 7** — one of those slippery passing chords. The blue note (melody) and the dim7 (harmony) are two sides of the same coin: both are *chromatic tension that slides into a chord tone.*',
    },
    {
      kind: 'widget',
      selection: { chordType: 'dim7', root: 'Bb' },
      widgets: ['fretboard', 'staff'],
      caption: 'Bb dim7 — a typical chord under a blue note. Its chromatic, symmetric tension mirrors the melodic blue note above it; both resolve by half-step into the next chord.',
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Try it over a slow A blues: play an A minor pentatonic phrase, but on the way to the {{A}} or {{C}} or {{E}}, slip through the {{Eb}} (♭5) for an instant and *resolve immediately*. Then comp yourself with a {{Bb}}dim7 → {{A}}7 move underneath. Melody and harmony are walking the same chromatic walk — that is the blues, whole and complete.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Where you are now',
    },
    {
      kind: 'text',
      markdown:
        'You started with single notes and ended able to voice-lead guide tones, substitute dominants, develop a chord through inversions with passing diminished chords, condense to lean 4-note voicings, and bend pentatonic notes into true blue notes. That is the toolkit of a working jazz and blues guitarist — not a pile of scales to memorise, but a handful of principles that move.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Félix Santos\'s parting advice applies to all of it: **stop thinking statically.** A bar of {{A}}7 is not one chord — it is four beats of harmonic opportunity. Find an inversion, walk the bass, slip a passing chord, lean on a blue note. Make the guitar sound like it is playing itself.',
    },
  ],
}
