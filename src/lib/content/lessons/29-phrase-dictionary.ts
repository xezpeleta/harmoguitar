/**
 * Lesson 29 — The Phrase Dictionary
 * Source: RESEARCH.md §29 (Associative Learning) + §3 (Scales) + §19 (Chord-Scale)
 *
 * The "diccionario de frases" idea from the Chema Vílchez masterclass: jazz
 * improvisers are not inventing every note — they draw on an assimilated
 * vocabulary of short phrases (licks), each anchored to a scale position,
 * which they recombine in real time and transpose across the neck. Build your
 * own dictionary: notate a phrase you like, *see* it on the fretboard, *hear*
 * it, *sing* it, and move the same fingering to other positions.
 */
import type { Lesson } from '$lib/content/schema'

export const phraseDictionary: Lesson = {
  id: 'phrase-dictionary',
  slug: 'the-phrase-dictionary',
  title: 'The Phrase Dictionary',
  summary: 'Improvisers don’t invent every note — they recombine a vocabulary. Build yours: notate, hear, sing, and transpose each lick.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'There is a myth that great improvisers invent every note fresh, in the moment. They do not. What they *do* have is a vast **dictionary of phrases** — short, learned melodic units (a bar or two long) that they have absorbed so deeply they can call them up, reshape them, and stitch them together on the fly. Improvisation is not creation from nothing; it is **fluent recombination of a vocabulary** — exactly like speaking a language you know well.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'The trap is owning only two or three phrases and playing them at every solo. The cure is to keep **building the dictionary**: every time you hear or compose a line you like, notate it, *anchor it to the scale position it lives in*, and practise moving it elsewhere. One phrase, well placed, is worth a hundred notes of aimless running.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'A phrase is a path through the scale',
    },
    {
      kind: 'text',
      markdown:
        'Here is a short phrase in **{{C}} major**, 5th position (around frets 9–12). It is not a scale run up and down — it climbs 1-2-3-4-5, leaps up to the 7, then falls back through the 6. Press **Play** and follow each dot as it lights: *see the shape, hear the line, sing it back.*',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C' },
      widgets: ['fretboard', 'staff'],
      voicing: [
        { string: 4, fret: 10, label: '1' },
        { string: 4, fret: 12, label: '2' },
        { string: 3, fret: 9, label: '3' },
        { string: 3, fret: 10, label: '4' },
        { string: 3, fret: 12, label: '5' },
        { string: 2, fret: 12, label: '7' },
        { string: 2, fret: 10, label: '6' },
        { string: 3, fret: 12, label: '5' },
      ],
      play: { kind: 'phrase', stagger: 0.32 },
      caption:
        'A C-major phrase: 1-2-3-4-5-7-6-5. The dots are the phrase; Play sounds them in order, each ringing as it goes. Sing the line before you press Play — then check your voice against the guitar.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Sing what you play.** The deepest layer of memory is auditory: if you can *hear* a phrase in your head before your fingers move, you are improvising, not reciting. Play the line slowly and sing each note as it sounds. The interactive Play here exists precisely to forge that audio-visual link — every dot you see has a sound, and every sound has a place on the neck.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Transpose the fingering, keep the shape',
    },
    {
      kind: 'text',
      markdown:
        'Here is the same phrase moved **two frets up** — identical fingering, identical shape, but now it lives in **{{D}} major**. Your fingers already know the motion; only the key has changed, and with it the subtle flavour of the intervals. This is the magic of movable fingerings: **one learned idea serves in every key** — you just relocate it.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'D', fretCount: 15 },
      widgets: ['fretboard', 'staff'],
      voicing: [
        { string: 4, fret: 12, label: '1' },
        { string: 4, fret: 14, label: '2' },
        { string: 3, fret: 11, label: '3' },
        { string: 3, fret: 12, label: '4' },
        { string: 3, fret: 14, label: '5' },
        { string: 2, fret: 14, label: '7' },
        { string: 2, fret: 12, label: '6' },
        { string: 3, fret: 14, label: '5' },
      ],
      play: { kind: 'phrase', stagger: 0.32 },
      caption:
        'The same phrase in {{D}} major — same fingers, shifted 2 frets. Play both versions back to back and notice how the *shape* is identical but the *sound* lifts into a new key. One idea, two (then twelve) homes.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'When you notate a phrase in your dictionary, **write down which scale position it sits in** (e.g. "5th position, C major"). Then to use it over an {{F}}maj7, you know to slide it to 5th position in F. The fingering travels; the label tells you where to drop it.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Explore the position your phrase lives in',
    },
    {
      kind: 'text',
      markdown:
        'A phrase is a path through a scale *position*. Before you stockpile licks, own the position itself — every note of the scale, in that region of the neck, so a phrase can start on any degree and move to any other. Use **+/−** to cycle the root and watch the whole position relocate; the shape of the scale is constant, only its fret changes.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C' },
      widgets: ['fretboard', 'staff'],
      steppers: { root: true },
      caption:
        'C major across the whole neck — the territory your phrase draws from. Cycle the root to see the same scale map reposition for each key. A phrase learned here travels with the map.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Build, don’t hoard',
    },
    {
      kind: 'list',
      items: [
        '**Collect actively.** When a phrase catches your ear — in a solo, a melody, your own wandering — stop and notate it. Anchor it to a position.',
        '**Vary, don’t repeat.** Take one phrase and change its rhythm, its starting note, its direction. Ten variants of one idea beat ten unrelated licks you can’t connect.',
        '**Recombine in time.** Link the end of one phrase to the start of another. That seam — how one idea hands off to the next — is where real improvisation lives.',
        '**Transposition is non-negotiable.** A phrase stuck in one key is half a phrase. Move it to every position until the fingering is location-independent.',
      ],
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'A dictionary is useless if you never *speak* from it. Do not let the collecting become a substitute for playing. Learn a phrase, sing it, transpose it, drop it into a real solo over a backing track — then, and only then, add the next one. A small dictionary you actually *use* beats a huge one you only admire.',
    },
  ],
}
