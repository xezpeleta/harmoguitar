/**
 * Lesson 9 — Diatonic Harmony
 * Source: RESEARCH.md §8
 */
import type { Lesson } from '$lib/content/schema'

export const diatonicHarmony: Lesson = {
  id: 'diatonic-harmony',
  slug: 'diatonic-harmony',
  title: 'Diatonic Harmony: Chords Within a Key',
  summary: 'Stacking thirds on each scale degree — the magic maj-m-min-maj-maj-min-dim sequence.',
  minutes: 15,
  blocks: [
    {
      kind: 'text',
      markdown:
        '**Diatonic** means "within the key." Diatonic chords are built **only from the notes of one scale**. They naturally sound like they belong together because they share the same note pool. This is the heart of key-based harmony.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Building diatonic 7th chords from the major scale',
    },
    {
      kind: 'text',
      markdown:
        'Take each scale degree as a root and **stack thirds** (skip every other note). In **C major** ({{C}} {{D}} {{E}} {{F}} {{G}} {{A}} {{B}}), the seven diatonic 7th chords are:',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Stacking thirds = skip every other note.** Start on {{C}}, skip {{D}}, land on {{E}}, skip {{F}}, land on {{G}} — that gives you C–E–G = C major. Start on {{D}}, skip {{E}}, land on {{F}}, skip {{G}}, land on {{A}} — that gives you D–F–A = D minor. Do this for all seven roots and the chord qualities fall out automatically. No memorisation needed: the scale *is* the chords, just rearranged.',
    },
    {
      kind: 'table',
      headers: ['Degree', 'Chord', 'Notes', 'Quality', 'Roman numeral'],
      rows: [
        ['I', 'Cmaj7', '{{C}} {{E}} {{G}} {{B}}', 'Major 7', '**I**'],
        ['II', 'Dm7', '{{D}} {{F}} {{A}} {{C}}', 'Minor 7', '**ii**'],
        ['III', 'Em7', '{{E}} {{G}} {{B}} {{D}}', 'Minor 7', '**iii**'],
        ['IV', 'Fmaj7', '{{F}} {{A}} {{C}} {{E}}', 'Major 7', '**IV**'],
        ['V', 'G7', '{{G}} {{B}} {{D}} {{F}}', 'Dominant 7', '**V**'],
        ['VI', 'Am7', '{{A}} {{C}} {{E}} {{G}}', 'Minor 7', '**vi**'],
        ['VII', 'Bm7♭5', '{{B}} {{D}} {{F}} {{A}}', 'Half-diminished', '**vii°**'],
      ],
    },
    {
      kind: 'widget',
      selection: { key: 'C', keyScaleType: 'major', scaleType: 'major', root: 'C' },
      widgets: ['circle-of-fifths'],
      caption:
        'Click any diatonic chord below the circle to explore it. The circle is set to C major; the 7 diatonic chords are shown as Roman numerals.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The magic sequence',
    },
    {
      kind: 'text',
      markdown:
        'In **every major key**, the 7 diatonic 7th chords always come out as:',
    },
    {
      kind: 'text',
      markdown: '**maj7 – m7 – m7 – maj7 – dom7 – m7 – m7♭5**',
    },
    {
      kind: 'text',
      markdown:
        'As triads: **major – minor – minor – major – major – minor – diminished**. This is not arbitrary — it falls out of the W-W-H-W-W-W-H pattern of the major scale. The varying sizes of the thirds between scale degrees produce different chord qualities automatically.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Why is the pattern identical in every key?** Because every major scale is built from the same interval pattern (W-W-H-W-W-W-H). When you stack thirds on top of that pattern, the distances between the stacked notes are always the same relative to the root — so the chord qualities come out in the same order, every time. The notes change (C major vs G major), but the *relationships* do not. This is why a I–IV–V progression sounds like a I–IV–V progression no matter what key you play it in.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Click **G** on the circle of fifths above. The diatonic chords re-derive for G major: Gmaj7 – Am7 – Bm7 – Cmaj7 – D7 – Em7 – F♯m7♭5. Same sequence, different key. This is the power of the system — learn it once, use it in every key.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**The \u201csnowman\u201d shape.** A chord in root position looks like a snowman: three notes stacked in thirds, root on the bottom. But you can flip that snowman upside down (first inversion), or stand it on its head (second inversion) — it is still the same chord, the same three notes, just in a different order. C–E–G, E–G–C, and G–C–E are all C major. The notes have not changed; only their vertical arrangement has. This is why a C major triad buried inside a bigger shape is still functionally C major, no matter how it is voiced.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Roman numerals',
    },
    {
      kind: 'list',
      items: [
        '**Uppercase** (I, IV, V) = major',
        '**Lowercase** (ii, iii, vi) = minor',
        '**Lowercase + °** (vii°) = diminished',
        '**Lowercase + ø** (iiø) = half-diminished',
      ],
    },
    {
      kind: 'text',
      markdown:
        'Roman numerals let you describe a progression **in any key**: "I–IV–V–I" means the same relationship whether you are in C ({{C}}-{{F}}-{{G}}-{{C}}) or A ({{A}}-{{D}}-{{E}}-{{A}}). This is the key to transposing.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Numbers are the key to transposing.** The chord *names* change when you switch keys, but the *numbers* stay the same. A \u201c1-6-2-5\u201d in C is {{C}}–{{A}}m–{{D}}m–{{G}}; in G it is {{G}}–{{E}}m–{{A}}m–{{D}}; in F it is {{F}}–{{D}}m–{{G}}m–{{C}}. Different letters, identical relationship. Learn the numbers, and you can play any progression in any key — you just need to know the diatonic chords of the new key.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**Ear training: \u201ctagging\u201d progressions by number.** You have heard 1-6-2-5 in hundreds of songs (\u201cHeart and Soul,\u201d \u201cStand By Me\u201d vibes). But you may not *recognise* it until you name it. Once you start identifying progressions by their numbers while you listen and play, you build a mental library of tagged sounds — and then you can recognise them by ear in any key. This is how musicians without perfect pitch hear a song once and know the chords: they are not hearing letter names, they are hearing *numbers*.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Minor keys & relative keys',
    },
    {
      kind: 'text',
      markdown:
        'From the natural minor scale (e.g., A minor: {{A}} {{B}} {{C}} {{D}} {{E}} {{F}} {{G}}), the diatonic 7th chords are:',
    },
    {
      kind: 'text',
      markdown: 'i7 – iiø7 – ♭IIImaj7 – iv7 – vm7 – ♭VImaj7 – ♭VII7',
    },
    {
      kind: 'text',
      markdown:
        '({{A}}m7 – {{B}}m7♭5 – {{C}}maj7 – {{D}}m7 – {{E}}m7 – {{F}}maj7 – {{G}}7). Note: the v chord is **minor** in natural minor, which lacks the strong dominant pull. That is why harmonic minor raises the 7th to give a **major V** (E7 → Am).',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A major key and its **relative minor** share the same notes and the same diatonic chords, just with a different tonal centre. C major\'s relative minor is A minor (vi = i). The vi chord of the major key *is* the i chord of the relative minor.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Same chord, different function.** A {{G}} major chord is the **I** in G major but the **V** in C major. The chord itself has not changed — but its job has. In G it is home; in C it is the dominant pulling you back to {{C}}. This is why context matters: a chord\u2019s function depends on the key you are in, not on the chord in isolation. When you see the same chord appear in different songs, ask which scale degree it represents in that key — that tells you what it is doing.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Writing your first progression? Three rules.** (1) Start on the **I** chord. (2) Make the last chord a **IV** or a **V** — IV→I is a soft, gentle landing; V→I is a strong, decisive one. (3) For everything in between, pick *any* diatonic chord. Literally guess — it will work, because all diatonic chords share the same note pool. The IV or V at the end sets up a loop: it makes you want to return to I, so the progression repeats naturally. This is the training-wheels method that real songwriters use to get started before they learn to break the rules.',
    },
  ],
  sources: [
    {
      author: 'Gracie Terzian',
      title: 'Easy Chord Theory - Diatonic Chords of Major Keys',
      url: 'https://www.youtube.com/watch?v=HmvachZokyg',
      note: 'The clearest walk-through of the stacking-thirds method (skip every other note), the 1-4-5-major / 2-3-6-minor / 7-diminished pattern in every key, and the \u201ctagging\u201d ear-training concept: identify progressions by number so you can recognise them in any key.',
    },
    {
      author: 'Signals Music Studio',
      title: 'How To Write Chord Progressions - Songwriting Basics',
      url: 'https://www.youtube.com/watch?v=M8eItITv8QA',
      note: 'The practical three-rule method for writing diatonic progressions: start on I, end on IV or V, fill the middle with any chords. Why it works: all diatonic chords share the same note pool, and IV→I / V→I cadences create a natural loop back to the tonic.',
    },
    {
      author: 'Brad Harrison Music',
      title: 'The Complete Guide to Chords In Music',
      url: 'https://www.youtube.com/watch?v=Uyr-GogTrls',
      note: 'The \u201csnowman\u201d shape of stacked thirds, inversions as the same notes rearranged, and the explanation of why the diatonic pattern is identical in every key (all major scales share the same W-W-H-W-W-W-H interval pattern, so the stacked-third chord qualities come out in the same order).',
    },
    {
      author: 'Bill Hilton',
      title: 'How To Find The Chords Of A Key - Essential Music Theory',
      url: 'https://www.youtube.com/watch?v=rROIEpTQGvE',
      note: 'What \u201ckey\u201d really means (a song built mostly from one scale\u2019s notes), and why numbering chords by Roman numerals is the master skill: it makes transposition, improvisation, and playing in multiple keys vastly easier because the numbers stay constant when the letter names change.',
    },
  ],
}
