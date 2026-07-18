/**
 * Lesson 32 — Rhythm, Time & Self-Recording
 * Source: RESEARCH.md §32 — Javier Sánchez masterclass
 *
 * Javier emphasises that harmony is useless without time. His practice
 * prescription: always practise with a metronome (or backing track), and
 * record yourself constantly — because the way you *think* you sound and
 * the way you *actually* sound are two different things, and only the
 * recording tells the truth.
 */
import type { Lesson } from '$lib/content/schema'

export const rhythmTimeSelfRecording: Lesson = {
  id: 'rhythm-time-self-recording',
  slug: 'rhythm-time-self-recording',
  title: 'Rhythm, Time & Self-Recording',
  summary: 'Harmony without time is just notes. Practise with a click, record yourself, and let the playback be your honest teacher.',
  minutes: 8,
  blocks: [
    {
      kind: 'text',
      markdown:
        'You can know every chord substitution in this course cold and still sound bad — if your time is weak. Javier Sánchez is blunt about this: **harmony is only useful when it sits on a steady groove.** A {{C}}maj7 played late, rushing, or with uneven rhythm is not a {{C}}maj7; it is noise that happens to contain the right pitches. This lesson is about the two habits Javier insists every student build: practising with a time reference, and recording themselves relentlessly.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Always practise with a clock',
    },
    {
      kind: 'text',
      markdown:
        'There is no "free" practice time. If you practise a chord progression or a lick without a metronome, a drum loop, or a backing track, you are training your internal clock to drift — and reinforcing whatever tempo you happened to settle into, which is almost certainly uneven. A click is non-negotiable. It does not have to be a rigid 4/4 metronome; a backing track, a drum loop, or even a foot tap is a clock. But there must be *something* external measuring the beat.',
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**Three ways to put a clock under your practice:**\n\n1. **Metronome** — pure tempo, no harmony. Hardest, because there is nothing to hide behind. Start here for new material.\n2. **Drum loop** — tempo + feel. Good for working on groove and comping rhythm.\n3. **Backing track** — tempo + harmony. Best for applying a concept in a musical context, but easiest to hide mistakes in. Use last, once the concept is solid.',
    },
    {
      kind: 'text',
      markdown:
        'When you practise a new voicing or progression, set the metronome **slowly** — slow enough that you can think about each move. Speed comes from accuracy, never from effort. A common mistake is to crank the tempo to "feel" productive; you only bake in the mistakes.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The metronome as a test, not a crutch',
    },
    {
      kind: 'text',
      markdown:
        'Once a passage is comfortable, Javier recommends **testing** your time rather than just accompanying it. Two classic drills:',
    },
    {
      kind: 'list',
      items: [
        '**Click on 2 and 4.** Set the metronome to half-speed and let it mark beats 2 and 4 (the backbeat) while you play all four beats. If your time is off, you will hear the click *against* your note instead of *with* it. Instant, brutal feedback.',
        '**Click only on 1.** Even harder: the metronome sounds once per bar. You must hold the tempo for three beats on your own. This exposes drifting like nothing else.',
      ],
    },
    {
      kind: 'text',
      markdown:
        'These drills feel awful at first — that is the point. The discomfort is the sound of your internal clock being calibrated. Do them for two minutes at the start of a practice session, not for an hour. Short, honest, frequent.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Record yourself — constantly',
    },
    {
      kind: 'text',
      markdown:
        'This is the single most important habit in the lesson. **While you play, you cannot hear yourself objectively.** Your attention is on producing the sound, not on judging it. The physical act of fretting, the effort, the intention — all of it colours your perception. You think you nailed the passage. The recording, listened to ten seconds later, tells you the truth: the rhythm dragged, the chord was muddy, the transition was late.',
    },
    {
      kind: 'callout',
      variant: 'warning',
      markdown:
        '**Your phone is enough.** You do not need a studio. The voice-memo app on your phone captures your timing and your note choices perfectly well for practice purposes. The fidelity does not matter — the *objectivity* does. Record, listen back immediately, take one note, fix it, record again.',
    },
    {
      kind: 'text',
      markdown:
        'Javier\'s loop: **play → record → listen → identify one problem → play again focusing only on that problem → record again.** Repeat. Each cycle fixes one thing. Ten cycles fix ten things. The compounding is fast — faster than any other practice method — because the feedback loop is tight and honest.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'What to listen for on playback',
    },
    {
      kind: 'list',
      items: [
        '**Time.** Did you rush the hard part and drag the easy part? Was the groove steady, or did it breathe unevenly?',
        '**Clarity.** Are all the notes of the chord speaking, or are some muted or buzzy?',
        '**Phrasing.** Does the line have shape — a clear start, a peak, an ending — or is it a run of evenly-spaced notes?',
        '**Dynamic.** Is everything one volume, or are you shaping the music louder and softer?',
        '**Commitment.** Did you play each note like you meant it, or tentatively? Hesitation is audible on recording even when it is invisible in the moment.',
      ],
    },
    {
      kind: 'text',
      markdown:
        'Pick **one** of these per recording. Do not try to fix five things at once. The recording reveals many flaws; your job is to address them one at a time, in order of severity, across many short cycles.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'Gypsy Jazz: time-feel at the extreme',
    },
    {
      kind: 'text',
      markdown:
        'Javier teaches Gypsy Jazz, and the style is a masterclass in why time matters. The Gypsy Jazz rhythm guitar part — **la pompe** — is a single percussive strum on each beat, with a very specific long-short articulation and a slight push. There is almost no harmonic content to hide behind: you are playing one chord, four times a bar, and the *entire* groove depends on the consistency and the feel of those strums. If your time wobbles, the whole band wobbles. It is the purest test of "harmony is useless without time."',
    },
    {
      kind: 'callout',
      variant: 'note',
      markdown:
        '**La pompe in one sentence:** strum on each beat (1-2-3-4), let the chord ring briefly then choke it, with a slight anticipation on beats 2 and 4. The choke and the anticipation are what give the "Django" swing. It takes ten seconds to understand and months to make feel right — because right means *consistent*, and consistency is a time skill, not a harmony skill.',
    },
    {
      kind: 'text',
      markdown:
        'You do not need to play Gypsy Jazz to take the lesson from it. Whatever style you play, ask yourself: **could I play my part with one chord and a strum, and would it groove?** If the answer is no, the problem is not your harmony — it is your time. Go back to the metronome and the recorder.',
    },

    {
      kind: 'heading',
      level: 2,
      text: 'The practice loop, summarised',
    },
    {
      kind: 'list',
      items: [
        'Set a clock — metronome, loop, or track. Start slow.',
        'Play the passage once. Record it.',
        'Listen back. Identify **one** problem (time, clarity, phrasing, dynamic, or commitment).',
        'Play again, focusing only on that one problem. Record again.',
        'Repeat until that problem is solved. Then pick the next one.',
        'End every session by recording a full, no-stopping "performance" take. Save it. Compare it to last week\'s.',
      ],
    },
    {
      kind: 'callout',
      variant: 'tip',
      markdown:
        '**The archive is your teacher.** Keep your weekly performance takes. A month from now, listen to the oldest one. You will hear progress you could not feel day-to-day — because improvement is gradual and the recording is the only honest measure of it.',
    },
  ],
  sources: [
    {
      author: 'Javier Sánchez',
      title: 'Masterclass — Tríadas, improvisación, Gypsy Jazz',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      note: 'The insistence on metronome-and-recording practice, the "play → record → listen → fix one thing" loop, and the Gypsy Jazz la pompe as the purest test of time-feel.',
    },
  ],
}
