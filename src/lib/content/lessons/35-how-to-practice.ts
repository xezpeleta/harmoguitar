/**
 * Lesson 30 — How to Practice: The Multisensory Method
 * Source: RESEARCH.md §29 (Associative Learning)
 *
 * The Chema Vílchez masterclass on *how to study*: the trap of "mecanicidad"
 * (mechanical, disconnected repetition), and the way out — a multisensory,
 * associative method that engages the ear, the eye, the muscles, and the
 * memory all at once. This is the capstone, and it explains why every lesson
 * in this course ships with a playable, clickable widget: the audio-visual
 * link is not decoration — it *is* the method.
 */
import type { Lesson } from '$lib/content/schema'

export const howToPractice: Lesson = {
  id: 'how-to-practice',
  slug: 'how-to-practice',
  title: 'How to Practice: The Multisensory Method',
  summary: 'Why running scales up and down keeps you stuck — and the multisensory, associative method that actually makes things stick.',
  minutes: 10,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You have now seen the whole toolkit — notes, intervals, scales, chords, progressions, voicings, reharmonization. Knowing the material is not the same as *owning* it, and the gap between the two is where most players get stuck for years. This final lesson is about **how to cross that gap**: not what to practise, but *how*. It is also the answer to a question you may have been asking throughout the course: *why is every lesson here wrapped in a clickable, playable widget?*',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The trap: "mecanicidad"',
    },
    {
      kind: 'text',
      markdown:
        'The danger has a name: **mecanicidad** — mechanical, disconnected repetition. You learn a scale or an arpeggio, and you play it up and down, over and over, until your fingers can do it fast. And then you are *worse off than when you started*, because you have trained a reflex that has nothing to do with music. You can run the scale, but you cannot *hear* it, cannot *sing* it, cannot *find* a note in it without starting from the bottom, and cannot leave it to go somewhere interesting. The fingers got a workout; the musician did not grow.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        'If your practise sounds like a scale played top-to-bottom, faster each week, with the metronome clicking up — **you are practising mecanicidad.** The symptom is the sinking feeling of playing for years and not improving. The cause is that information (you *have* the scale) was never turned into *connection* (you cannot *use* it).',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The way out: four memories at once',
    },
    {
      kind: 'text',
      markdown:
        'The cure is to engage **four kinds of memory simultaneously**, so that every thing you learn is stored in more than one place and can be reached by more than one path:',
    },
    {
      kind: 'table',
      headers: ['Memory', 'What it means', 'How to train it'],
      rows: [
        [
          '**Auditory**',
          'You can *hear* the note or line in your head before you play it.',
          'Sing what you play. Play slowly and voice each note. If you cannot sing it, you do not *know* it yet.',
        ],
        [
          '**Visual**',
          'You *see* the whole pattern on the neck, not just the note under your finger.',
          'Picture the full scale or chord shape. Practise jumping intervals, not just stepping to neighbours.',
        ],
        [
          '**Muscular**',
          'Your hands know the shape with the *minimum* tension.',
          'Practise relaxed. Use only the force needed. Tension practised in is tension played out.',
        ],
        [
          '**Associative**',
          'Each new thing is glued to something you already know.',
          'Derive, do not memorise. Learn a chord’s inversions from one shape; anchor a phrase to a position.',
        ],
      ],
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Auditory: sing what you play',
    },
    {
      kind: 'text',
      markdown:
        'This is the deepest layer and the most neglected. Play a scale or a phrase **slowly**, and **sing the note you are fingering** as it sounds. The goal is not speed or a flashy solo — it is to weld your *ear* to your *fingers* until you can hear a melody in your head and your hands simply find it. Every **Play** button in this course exists for this: it sounds each note in turn and lights the place it lives, so you can match your voice to what you see and hear.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Visual: see the whole map, then jump',
    },
    {
      kind: 'text',
      markdown:
        'Most players see only the note directly under their finger. The multisensorial player sees the **entire pattern** laid out on the neck — every occurrence of the note, every octave shape, the whole scale as a single picture. From that picture you can **jump** to any note in it, not just shuffle to the next-door neighbour. Do-Re-Mi-Fa is the ladder; leaping from Do up to La is the music. Below, explore the whole C major map and try jumping between distant notes instead of walking stepwise.',
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'C' },
      widgets: ['fretboard', 'staff'],
      steppers: { root: true, position: true },
      caption:
        'The full C major map. Click any fret to sound it and light every occurrence; use **◀/▶** to slide the window and **+/−** to change key. Practise *jumping* — pick two far-apart scale tones and move directly between them, not via the neighbours.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'The **octave shapes** you learned in Lesson 1 are the foundation of visual memory: a note on string 6 lives again 2 frets higher on string 4, and so on. Once you own those shapes, "finding any note anywhere" stops being a search and becomes a glance.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Muscular: the mastery of least effort',
    },
    {
      kind: 'text',
      markdown:
        'When you practise, you record not only the notes but the **tension** in your hands. Practise tense and you will play tense — and tension is the enemy of speed, tone, and stamina. The image to hold is lifting a bottle: if it takes 10% of your grip, do not spend 100%. Seek the **minimum force** that frets the note cleanly, until you barely feel the guitar in your hands. That lightness is what lets you play for hours and move freely across the neck — the "effortless mastery" that looks like talent but is really just relaxed, well-practised hands.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'There is no widget for relaxation — only your own attention. Every few minutes of practise, **check in**: jaw, shoulders, wrist, thumb pressure. Drop whatever you do not need. The hands you are training are the hands you will perform with; train them loose.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Associative: derive, do not memorise',
    },
    {
      kind: 'text',
      markdown:
        'You have seen this method throughout the course. A single **{{C}}maj7** becomes four inversions, then a second string-set family, then every key — twenty voicings *derived* from one seed (Lesson 28). A single phrase becomes a dozen, transposed across the neck (Lesson 29). Diminished symmetry means one dim7 grip is three chords at once (Lesson 18). The circle of fifths means five shapes unlock all twelve keys (Lesson 11). **The neck is not 144 things to remember — it is a handful of maps, each generating the next.**',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        'Whenever you meet a new chord, scale, or phrase, ask the associative question: *“What do I already know that this is one move away from?”* Invert it. Shift a note to a neighbour string. Slide it up the neck. The new thing is never isolated — it is a rotation of an old one, and rotation is what memory hangs on.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Why this course is interactive',
    },
    {
      kind: 'text',
      markdown:
        'This lesson is also an explanation of the tool you have been using. Every concept in this course is paired with a **playable, clickable widget** — a fretboard you can strum, a piano that lights every occurrence of a note, a Play button that sounds each chord tone in turn, steppers that transpose a shape up the neck. That is not decoration. **It is the multisensory method, built into the lesson.** You *see* the note on the neck, you *hear* it ring, you *find* it under your finger, and — if you sing along — you *voice* it. Four memories, one gesture.',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        'A textbook can tell you a Cmaj7 is C-E-G-B. This course *sounds* it, *lights* it on the neck, and lets you *move* it to every key. The gap between "I read it" and "I own it" is exactly the gap between knowing the name of a note and being able to find, hear, and sing it in real time — and that gap is what the interactive widgets are for. Use them the way the method demands: slowly, with your voice, jumping not stepping, relaxed, always connecting the new shape to the last one.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'A practise loop to take with you',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**Pick one thing** — a chord, a scale position, a single phrase. Not five. One.',
        '**See it whole.** Picture the full shape on the neck before you touch the guitar. Use the widgets to confirm the map.',
        '**Sing it.** Play it slowly and voice each note. If you cannot sing it, slow down until you can.',
        '**Jump, don’t ladder.** Move between distant notes of the shape, not just neighbours. Break the mechanical path.',
        '**Relax.** Minimum force. Check jaw, shoulders, wrist.',
        '**Associate.** Invert it, shift a note, transpose it one key. Glue it to what you already know.',
        '**Use it.** Drop it into a real progression or backing track within the same session. A thing unplayed is a thing unlearned.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The whole course in one line:** stop moving your fingers up and down — start *hearing, seeing, and connecting*. The harmony you have learned is a small set of movable maps; the method above is how those maps become *music in your hands*. Go slowly, sing everything, and let the widgets do what they are built for — linking the sound, the shape, and the name into one thing you can actually play.',
    },
  ],
  sources: [
    {
      author: 'Chema Vílchez',
      title: 'Master Class: cómo estudiar y salir de la mecanicidad',
      url: 'https://www.youtube.com/watch?v=6ccY37fyxVo',
      note: 'The multisensory method — the trap of mecanicidad and the four memories (auditory, visual, muscular, associative).',
    },
  ],
}
