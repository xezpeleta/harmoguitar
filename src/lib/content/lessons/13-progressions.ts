/**
 * Lesson 12 — Chord Progressions & Roman Numerals
 * Source: RESEARCH.md §11
 */
import type { Lesson } from '$lib/content/schema'

export const progressions: Lesson = {
  id: 'progressions',
  slug: 'progressions-and-roman-numerals',
  title: 'Chord Progressions & Roman Numerals',
  summary: 'The foundational progressions — and why describing them as numbers is the key to transposing.',
  minutes: 14,
  blocks: [
    {
      kind: 'text',
      markdown:
        'A **chord progression** is a sequence of chords. Describing them with **Roman numerals** reveals the underlying structure that works in any key. Once you know a progression as numbers, you can play it in every key by mapping the numerals to that key\'s scale degrees.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Case matters.** Uppercase Roman numerals are **major** chords (I, IV, V); lowercase are **minor** (ii, iii, vi); lowercase with a ° is **diminished** (vii°). So the numeral tells you two things at once: the scale degree *and* the chord quality. In C major: **I** = {{C}} major, **ii** = {{D}}m, **iii** = {{E}}m, **IV** = {{F}}, **V** = {{G}}, **vi** = {{A}}m, **vii°** = {{B}}°. This pattern — major, minor, minor, major, major, minor, diminished — is identical in every major key, which is why the same numerals produce the same *sound* no matter where you start.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Foundational progressions (major key)',
    },
    {
      kind: 'table',
      headers: ['Progression', 'In C major', 'Character', 'Genre'],
      rows: [
        ['I–IV–V–I', '{{C}}–{{F}}–{{G}}–{{C}}', 'classic, strong', 'rock, country, folk'],
        ['I–V–vi–IV', '{{C}}–{{G}}–{{A}}m–{{F}}', 'emotional arc', 'pop ("4-chord song")'],
        ['I–vi–IV–V', '{{C}}–{{A}}m–{{F}}–{{G}}', '50s doo-wop', 'pop, ballad'],
        ['ii–V–I', '{{D}}m–{{G}}–{{C}}', 'jazz cadence', 'jazz, soul'],
        ['I–vi–ii–V', '{{C}}–{{A}}m–{{D}}m–{{G}}', 'circle / turnaround', 'jazz, pop'],
        ['vi–IV–I–V', '{{A}}m–{{F}}–{{C}}–{{G}}', 'minor-starting pop', 'modern pop'],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why diatonic progressions "work"',
    },
    {
      kind: 'text',
      markdown:
        'All the chords in a diatonic progression share the **same scale notes**, so moving between them feels coherent. The ear has heard these relationships for centuries and expects them. Breaking them (using non-diatonic chords) creates surprise — which is powerful when intentional.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Why does the V chord pull toward I?** It is the **leading tone**. Scale degree 7 sits a half step below the root — in C major that is {{B}}, just below {{C}}. The {{B}} is the middle note of the V chord ({{G}} major = {{G}}-{{B}}-{{D}}), and your ear hears it as teetering on the edge, desperate to resolve upward into {{C}}. That half-step pull is the mechanical engine behind every V→I cadence in western music. Without it, dominant function would not exist.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Every chord has a job.** Think of the diatonic chords in three functional groups: **tonic** (I, vi, iii) = rest, home, resolution; **subdominant** (IV, ii) = gentle tension, a lift away from home; **dominant** (V, vii°) = strong tension, pulling hard back to I. Notice that **ii and IV are interchangeable** — they share 2 of their 3 notes ({{D}}m = {{D}}-{{F}}-{{A}}, {{F}} = {{F}}-{{A}}-{{C}}), so they are almost the same chord. Swapping one for the other barely changes the mood. This is why a progression like I–V–ii–IV *climbs* without really changing function: you stay in subdominant territory while rising from scale degree 2 to 4.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Transposing',
    },
    {
      kind: 'text',
      markdown:
        'Once you know a progression as numerals, you can play it in any key. This is why Roman numerals (and the Nashville Number System) are the lingua franca of working musicians:',
    },
    {
      kind: 'list',
      items: [
        '"I–IV–V in G" = {{G}}–{{C}}–{{D}}',
        '"ii–V–I in F" = {{G}}m–{{C}}–{{F}}',
        '"I–vi–IV–V in D" = {{D}}–{{B}}m–{{G}}–{{A}}',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Three rules to write a progression that works.** (1) Use **four bars**. (2) **Start on I** — establish home. (3) **End on IV or V** — either sets up the loop back to I. Fill the middle two bars with *any* diatonic chord and it will sound musical. Ending on IV gives a **soft landing** (the plagal "Amen" cadence); ending on V gives a **strong pull** (the authentic cadence). Try it: pick a key, start on I, guess two chords from the diatonic set, end on V, repeat. You cannot go wrong.',
    },
    {
      kind: 'widget',
      selection: { key: 'C', keyScaleType: 'major', chordType: 'major', root: 'C' },
      widgets: ['circle-of-fifths'],
      caption:
        'Use the circle to find the I–IV–V of any key. Hit “Play progression” to hear the famous I–V–vi–IV ({{C}}–{{G}}–{{A}}m–{{F}}) and watch the root travel around the circle.',
      play: {
        kind: 'progression',
        chords: ['C', 'G', 'Am', 'F'],
        tempo: 120,
        beatsPerChord: 2,
      },
    },

    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The **I–V–vi–IV** progression ({{C}}–{{G}}–{{A}}m–{{F}} in C) is the famous "four-chord song" pattern — it has powered hundreds of pop hits because it has a built-in emotional arc: home → tension → minor colour → lift → (loop). The comedy trio Axis of Awesome medleyed dozens of #1 hits over these exact four chords — from Journey to Elton John to U2 to Maroon 5 — proving that this one progression is the backbone of modern pop. Try it on the circle: click I, V, vi, IV in order.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Same four chords, different starting point.** I–V–vi–IV, vi–IV–I–V, and IV–I–V–vi all use the *same* four chords — only the entry point changes. Starting on I feels settled; starting on vi (the relative minor) feels wistful; starting on IV launches with immediate momentum because you begin on a chord of tension. The songwriting trick is finding *where* in the loop to begin.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The **ii–V–I** ({{D}}m–{{G}}–{{C}}) is the most important progression in jazz — it gets its own lesson next. For now, notice it is just three diatonic chords whose roots move in 4ths ({{D}}→{{G}}→{{C}}): the circle-of-fifths motion that makes everything sound smooth.',
    },
  ],
  sources: [
    {
      author: 'Signals Music Studio',
      title: 'How To Write Chord Progressions - Songwriting Basics',
      url: 'https://www.youtube.com/watch?v=M8eItITv8QA',
      note: 'Three practical rules for writing a progression that works: four bars, start on I, end on IV or V. Any diatonic chord in between sounds musical. IV→I is a soft landing; V→I is a strong one. Uppercase Roman numerals = major, lowercase = minor, ° = diminished. The same formula applies in every key.',
    },
    {
      author: 'Michael New',
      title: 'How to Write Music - Building a Chord Progression',
      url: 'https://www.youtube.com/watch?v=QBhJsShMF2g',
      note: 'Why the I–V–I progression moves from rest to tension and back: the V chord contains the leading tone (scale degree 7, a half step below the root), which your ear hears as needing to resolve upward into I. Each chord has a functional \u201cjob\u201d \u2014 tonic is rest, dominant is tension.',
    },
    {
      author: 'Axis of Awesome',
      title: '4 Chords (The Four Chord Song)',
      url: 'https://www.youtube.com/watch?v=oOlDewpCfZQ',
      note: 'The iconic comedy medley that strings together dozens of #1 pop hits \u2014 Journey, Elton John, U2, Maroon 5, the Beatles \u2014 over the same I–V–vi–IV progression. The cultural proof that one four-chord loop powers modern pop.',
    },
    {
      author: 'David Bennett',
      title: '6 common chord progressions and why they work',
      url: 'https://www.youtube.com/watch?v=v3YbEL-_eoI',
      note: 'Six progressions analysed by function: the \u201cWonderwall\u201d plagal cascade (chained 4→1 moves), the Aeolian \u201cCan\u2019t Stop\u201d (i-♭VII-iv-IV), and why ii and IV are interchangeable (they share 2 of 3 notes). Same four chords in different starting orders (I-V-vi-IV vs vi-IV-I-V vs IV-I-V-vi) give different momentum.',
    },
  ],
}
