/**
 * Lesson 4 — Minor Scales
 * Source: RESEARCH.md §3 (minor scales)
 */
import type { Lesson } from '$lib/content/schema'

export const minorScales: Lesson = {
  id: 'minor-scales',
  slug: 'minor-scales',
  title: 'Minor Scales: Natural, Harmonic, Melodic',
  summary: 'Three flavours of minor — why they exist and what each one is for.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'The major scale has one form. The minor scale has **three**, each serving a different purpose. Understanding why all three exist is the key to understanding minor-key harmony and the blues/jazz sounds built on it.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'All three minor scales — and the Dorian mode you will meet later — share the **same five core notes**: the minor pentatonic (1 ♭3 4 5 ♭7). Each variant just adds one or two extra notes to that common base. So the minor sound is not five separate scales to memorise from scratch; it is one shared skeleton with different "flavour notes" bolted on. Master the minor pentatonic and you already have 70% of every minor scale.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The problem: a missing leading tone',
    },
    {
      kind: 'text',
      markdown:
        'To understand why three minor scales exist, start with the major scale\u2019s greatest feature: the **leading tone**. The 7th degree of a major scale sits one half-step below the tonic — play it and you can *feel* it pulling upward toward home. Stop on that note and the music begs to resolve. Natural minor **lacks** this: its 7th degree is a whole step below the tonic, so it has no pull, no tension, no forward motion. Play a melody in natural minor without landing on the tonic and the ear drifts — it is hard to tell which note is home. Every variation of the minor scale is an attempt to **solve this problem** in a different way.',
    },

    {
      kind: 'heading',
      level: 2,
      text: '1. Natural minor (Aeolian)',
    },
    {
      kind: 'text',
      markdown:
        'Pattern: **W - H - W - W - H - W - W**. Relative to the major scale, the formula is **1 2 ♭3 4 5 ♭6 ♭7** — it lowers the 3rd, 6th, and 7th. A natural minor shares the **same notes** as its relative major: A natural minor ({{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G}}) uses exactly the notes of C major, just starting on {{A}}.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Natural minor is the **default** minor sound — the one you hear in most pop and rock minor-key songs. Its ♭7 (a whole step below the tonic) means no leading tone, no strong pull home. That is not a flaw; it is a *choice*. The soft, drifting quality of natural minor — the sense that the tonic is a resting place rather than a magnet — is exactly the colour many songs want. You only reach for the other two scales when you *do* want that pull.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'natural-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A natural minor — same notes as C major, but {{A}} is "home."',
    },

    {
      kind: 'heading',
      level: 2,
      text: '2. Harmonic minor',
    },
    {
      kind: 'text',
      markdown:
        'Natural minor with a **raised 7th**. Formula: **1 2 ♭3 4 5 ♭6 7** ({{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G#}}). Why? In natural minor the V chord is minor (Em in A minor), which lacks the strong pull back to the tonic. Raising the 7th creates a **leading tone** ({{G#}} → {{A}}) and turns the V into a major or dominant chord (E7 → Am) that resolves forcefully.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'This is the **whole reason harmonic minor exists**: to give the minor key a leading tone. In natural minor, the V chord is minor (Em → Am is a weak landing). Raise the 7th and that same V becomes major or dominant (E → Am, or E7 → Am) — suddenly the resolution *snaps* home, because the V now contains the leading tone ({{G#}}) that is half a step below the tonic. Harmonic minor is not an exotic flavour; it is the minor key\u2019s version of the V→I cadence you already know from major.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'harmonic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A harmonic minor — notice the {{G#}} and the exotic augmented-2nd gap between {{F}} and {{G#}}.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'That gap between ♭6 and 7 ({{F}} to {{G#}}, three semitones) is an **augmented 2nd**. It gives harmonic minor its exotic, Middle-Eastern flavour — and why it is the source of the Phrygian dominant scale used in flamenco.',
    },

    {
      kind: 'heading',
      level: 2,
      text: '3. Melodic minor (jazz)',
    },
    {
      kind: 'text',
      markdown:
        'Natural minor with **both the 6th and 7th raised**: **1 2 ♭3 4 5 6 7** ({{A}} {{B}} {{C}} {{D}} {{E}} {{F#}} {{G#}}). In classical music this form is used ascending and reverted to natural minor descending. **In jazz, the raised form is used both ways** — and it is the parent of several crucial jazz modes (Lydian dominant, altered, etc.).',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'Why raise the 6th at all? Harmonic minor restored the leading tone, but it created a three-semitone gap between ♭6 and 7 ({{F}} to {{G#}}) — the **augmented 2nd** that sounds exotic but also awkward to sing and to play melodically. Melodic minor raises the 6th ({{F}} → {{F#}}) purely to **smooth that gap** into a regular whole step, keeping the leading tone but making the scale singable. The classical descending rule follows the same logic: when you descend, you are no longer heading *toward* the tonic, so the leading tone is pointless and you revert to natural minor. Jazz throws out that rule and uses the smooth form both ways.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'melodic-minor', root: 'A' },
      widgets: ['fretboard', 'staff'],
      caption: 'A melodic minor (jazz form) — a minor 3rd, but a major 6th and major 7th.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'When to use which',
    },
    {
      kind: 'list',
      items: [
        '**Natural minor** — the default minor sound; the relative of a major key.',
        '**Harmonic minor** — when you want a strong V → i resolution (a dominant leading tone).',
        '**Melodic minor** — the jazz tool; the source of altered and Lydian-dominant sounds (v1.1+).',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Switch the home explorer between the three minor scales with root {{A}}. Listen to how the raised 7th ({{G#}}) in harmonic minor suddenly *wants* to resolve up to {{A}}.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Hear the one note that changes everything.** Improvise over an Am chord using the A minor pentatonic. Now add the {{G#}} — the harmonic minor\u2019s raised 7th — as a passing note leading into {{A}}. That single note, played at the right moment, transforms your solo from \u201cwandering in natural minor\u201d to \u201cresolving with tension.\u201d All three minor scales differ by only one or two notes from that pentatonic base; learn to hear each flavour note and you can switch scales mid-phrase by ear.',
    },
  ],
  sources: [
    {
      author: 'Michael New',
      title: 'Minor Scales - Natural, Harmonic, and Melodic',
      url: 'https://www.youtube.com/watch?v=Q7WqKpD7w4Q',
      note: 'The leading-tone framing that unifies all three scales: the major scale\u2019s strength is its half-step leading tone; natural minor lacks it; harmonic minor restores it; melodic minor smooths the augmented-2nd gap. Also why the V chord flips from minor (natural) to major (harmonic).',
    },
    {
      author: 'Gracie Terzian',
      title: 'Why 3 Minor Scales Exist (And How We Can Use Them)',
      url: 'https://www.youtube.com/watch?v=44t2KJQUh3Y',
      note: 'The leading tone as the half-step-below-tonic that creates the pull to resolve, and the tonic-dominant (I-V) relationship as the most important harmonic pairing in music — the reason harmonic minor raises the 7th to turn the V chord major.',
    },
    {
      author: 'Active Melody',
      title: 'How to hear & use the minor scales on guitar',
      url: 'https://www.youtube.com/watch?v=AEXCpWLf4Gw',
      note: 'The minor pentatonic as the shared five-note base of all minor scales (natural, harmonic, melodic, Dorian) — each adds just one or two flavour notes. A practical ear-based approach to hearing which single note gives each minor scale its character.',
    },
    {
      author: 'Rick Beato',
      title: 'Natural, Melodic & Harmonic Minor: What IS the Difference?',
      url: 'https://www.youtube.com/watch?v=-V0SYpla8tU',
      note: 'The derivative-from-major-scale formulas (♭3, ♭6, ♭7 for natural; ♭3 with raised 6 & 7 for melodic) and the classical ascending-melodic / descending-natural rule. Also the jazz usage of melodic minor as the parent of altered and Lydian-dominant modes.',
    },
  ],
}
