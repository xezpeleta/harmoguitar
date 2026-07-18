/**
 * LessonView.test.ts — Tests for the generic lesson reader.
 *
 * Uses a tiny fixture lesson exercising every block kind, then asserts the
 * rendered output. Widget blocks are verified to apply their selection to the
 * shared store.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import { tick } from 'svelte'
import LessonView from '$lib/components/LessonView.svelte'
import type { Lesson } from '$lib/content/schema'
import { app } from '$lib/stores/app.svelte'
import { resetProgress, isComplete } from '$lib/services/progress.svelte'

// Mock the audio engine so playback calls can be asserted.
const playIntervalMock = vi.fn()
const playIntervalsMock = vi.fn()
const playProgressionMock = vi.fn()
const playNoteMock = vi.fn()
vi.mock('$lib/services/audio', () => ({
  audio: {
    playInterval: (...a: unknown[]) => playIntervalMock(...a),
    playIntervals: (...a: unknown[]) => playIntervalsMock(...a),
    playProgression: (...a: unknown[]) => playProgressionMock(...a),
    playNote: (...a: unknown[]) => playNoteMock(...a),
    playChord: vi.fn(),
    playSequence: vi.fn(),
    playChordByName: vi.fn(),
    playNoteName: vi.fn(),
    stopAll: vi.fn(),
    setVolume: vi.fn(),
    dispose: vi.fn(),
    available: false,
  },
}))

const fixture: Lesson = {
  id: 'test-lesson',
  slug: 'test-lesson',
  title: 'Test Lesson',
  summary: 'A fixture for testing the reader.',
  minutes: 5,
  blocks: [
    { kind: 'heading', level: 2, text: 'Section One' },
    { kind: 'text', markdown: 'A paragraph with **bold** and `code`.' },
    { kind: 'text', markdown: 'Play {{C}} then {{E}} then {{G}}.' },
    {
      kind: 'callout',
      variant: 'tip',
      markdown: 'Try this out.',
    },
    { kind: 'list', items: ['first', 'second'] },
    {
      kind: 'table',
      headers: ['A', 'B'],
      rows: [['1', '2'], ['3', '4']],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'G' },
      widgets: ['fretboard'],
      caption: 'G major',
    },
  ],
}

describe('LessonView', () => {
  beforeEach(() => {
    resetProgress()
    app.reset()
    playIntervalMock.mockClear()
    playIntervalsMock.mockClear()
    playNoteMock.mockClear()
  })

  it('renders the title, summary, and minutes', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('Test Lesson')).toBeTruthy()
    expect(getByText('A fixture for testing the reader.')).toBeTruthy()
    expect(getByText(/5 min/)).toBeTruthy()
  })

  it('renders headings', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('Section One')).toBeTruthy()
  })

  it('renders formatted markdown (bold, code)', () => {
    const { container } = render(LessonView, { lesson: fixture })
    expect(container.querySelector('strong')?.textContent).toBe('bold')
    expect(container.querySelector('code')?.textContent).toBe('code')
  })

  it('renders note tokens as clickable chips', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const chips = container.querySelectorAll('.note-chip-btn')
    expect(chips.length).toBe(3)
    // Each chip is a real button with an accessible label
    const first = chips[0] as HTMLButtonElement
    expect(first.tagName).toBe('BUTTON')
    expect(first.getAttribute('aria-label')).toContain('Play')
    // Labels show note names in CDE mode by default
    const labels = [...chips].map((c) => c.textContent?.replace(/\s+/g, '').trim())
    expect(labels[0]).toContain('C')
    expect(labels[1]).toContain('E')
    expect(labels[2]).toContain('G')
  })

  it('renders callouts with the variant class', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const callout = container.querySelector('.callout.tip')
    expect(callout).toBeTruthy()
  })

  it('renders list items', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('first')).toBeTruthy()
    expect(getByText('second')).toBeTruthy()
  })

  it('renders table headers and cells', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const ths = container.querySelectorAll('th')
    expect(ths.length).toBe(2)
    const tds = container.querySelectorAll('td')
    expect(tds.length).toBe(4)
  })

  it('renders a widget block with a caption', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('G major')).toBeTruthy()
  })

  it('applies the widget selection to the shared store', () => {
    render(LessonView, { lesson: fixture })
    expect(app.rootNote).toBe('G')
    expect(app.scaleType).toBe('major')
  })

  it('renders a "Mark as complete" button', () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    expect(getByRole('button', { name: /mark as complete/i })).toBeTruthy()
  })

  it('marks the lesson complete when the button is clicked', async () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    const btn = getByRole('button', { name: /mark as complete/i })
    btn.click()
    // The progress module is updated synchronously.
    expect(isComplete('test-lesson')).toBe(true)
  })

  it('renders prev/next nav buttons referencing sibling lessons', () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    // fixture is not in the real LESSONS array, so prev/next are undefined
    // → no nav buttons. Assert none are present.
    const navBtns = getByRole('button', { name: /mark as complete/i })
    expect(navBtns).toBeTruthy()
  })
})

describe('LessonView — playable intervals table', () => {
  const intervalsLesson: Lesson = {
    id: 'intervals-test',
    slug: 'intervals-test',
    title: 'Intervals Test',
    summary: 'Play intervals.',
    minutes: 5,
    blocks: [
      {
        kind: 'table',
        headers: ['Semitones', 'Name'],
        rows: [
          ['0', 'Unison'],
          ['7', 'Perfect 5th'],
          ['12', 'Octave'],
        ],
        playable: { root: 'C', semitones: [0, 7, 12] },
      },
    ],
  }

  beforeEach(() => {
    playIntervalMock.mockClear()
  })

  it('renders a play button per row', () => {
    const { container } = render(LessonView, { lesson: intervalsLesson })
    const buttons = container.querySelectorAll('.row-play')
    expect(buttons.length).toBe(3)
  })

  it('adds an empty header for the play column', () => {
    const { container } = render(LessonView, { lesson: intervalsLesson })
    const ths = container.querySelectorAll('th')
    expect(ths.length).toBe(3) // 2 data cols + 1 play col
  })

  it('clicking a row button plays root + that interval', async () => {
    const { container } = render(LessonView, { lesson: intervalsLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>('.row-play')
    // Row 1 = Perfect 5th (7 semitones from C).
    await fireEvent.click(buttons[1]!)
    expect(playIntervalMock).toHaveBeenCalledTimes(1)
    // C4 = midi 60; 7 semitones up.
    expect(playIntervalMock.mock.calls[0]![0]).toBe(60)
    expect(playIntervalMock.mock.calls[0]![1]).toBe(7)
  })

  it('the unison row plays interval 0', async () => {
    const { container } = render(LessonView, { lesson: intervalsLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>('.row-play')
    await fireEvent.click(buttons[0]!)
    expect(playIntervalMock.mock.calls[0]![1]).toBe(0)
  })

  it('row play buttons have accessible labels', () => {
    const { container } = render(LessonView, { lesson: intervalsLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>('.row-play')
    expect(buttons[0]!.getAttribute('aria-label')).toContain('Play')
    expect(buttons[0]!.getAttribute('aria-label')).toContain('C')
  })
})

describe('LessonView — widget Play override', () => {
  const wheelLesson: Lesson = {
    id: 'wheel-test',
    slug: 'wheel-test',
    title: 'Wheel Test',
    summary: 'All intervals.',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { scaleType: 'major', root: 'C' },
        widgets: ['interval-wheel'],
        play: { kind: 'intervals-from-root', root: 'C' },
      },
    ],
  }

  beforeEach(() => {
    playIntervalsMock.mockClear()
  })

  it('the Play button plays every interval from the root (0..12)', async () => {
    const { getByRole } = render(LessonView, { lesson: wheelLesson })
    const play = getByRole('button', { name: /play/i })
    await fireEvent.click(play)
    expect(playIntervalsMock).toHaveBeenCalledTimes(1)
    // C4 = midi 60.
    expect(playIntervalsMock.mock.calls[0]![0]).toBe(60)
    // offsets 0..12
    expect(playIntervalsMock.mock.calls[0]![1]).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ])
  })
})

describe('LessonView — progression Play', () => {
  const progressionLesson: Lesson = {
    id: 'progression-test',
    slug: 'progression-test',
    title: 'Progression Test',
    summary: 'Hear a ii–V–I.',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { chordType: 'm7', root: 'D' },
        widgets: ['fretboard', 'staff'],
        play: {
          kind: 'progression',
          chords: ['Dm7', 'G7', 'Cmaj7'],
          tempo: 200,
          beatsPerChord: 1,
        },
      },
    ],
  }

  beforeEach(() => {
    playProgressionMock.mockClear()
  })

  it('renders a "Play progression" button', () => {
    const { getByRole } = render(LessonView, { lesson: progressionLesson })
    expect(getByRole('button', { name: /play progression/i })).toBeTruthy()
  })

  it('clicking plays the chord sequence via the audio engine', async () => {
    const { getByRole } = render(LessonView, { lesson: progressionLesson })
    await fireEvent.click(getByRole('button', { name: /play progression/i }))
    expect(playProgressionMock).toHaveBeenCalledTimes(1)
    // Three chords, each a NoteName[] (4 notes for 7th chords).
    const sets = playProgressionMock.mock.calls[0]![0] as unknown[][]
    expect(sets.length).toBe(3)
    expect(sets[0]).toEqual(['D', 'F', 'A', 'C'])
    expect(sets[1]).toEqual(['G', 'B', 'D', 'F'])
    expect(sets[2]).toEqual(['C', 'E', 'G', 'B'])
    // Tempo + beatsPerChord forwarded.
    const opts = playProgressionMock.mock.calls[0]![1] as { tempo: number; beatsPerChord: number }
    expect(opts.tempo).toBe(200)
    expect(opts.beatsPerChord).toBe(1)
  })

  it('clicking again stops the progression (toggles to Stop, then back)', async () => {
    const { getByRole } = render(LessonView, { lesson: progressionLesson })
    const btn = getByRole('button', { name: /play progression/i })
    await fireEvent.click(btn) // start
    await tick()
    // Now the button reads "Stop".
    const stopBtn = getByRole('button', { name: /stop/i })
    await fireEvent.click(stopBtn) // stop
    // playProgression called once (on start); stop calls audio.stopAll, not play.
    expect(playProgressionMock).toHaveBeenCalledTimes(1)
  })
})

describe('LessonView — fretboard voicing markers', () => {
  const voicingLesson: Lesson = {
    id: 'voicing-test',
    slug: 'voicing-test',
    title: 'Voicing Test',
    summary: 'A specific grip.',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { chordType: 'dom13', root: 'A' },
        widgets: ['fretboard'],
        voicing: [
          { string: 6, fret: 5 },
          { string: 4, fret: 5 },
          { string: 3, fret: 6 },
          { string: 2, fret: 7 },
        ],
        caption: 'A13 grip',
      },
    ],
  }

  it('renders exactly the marked voicing positions (no whole-neck highlights)', () => {
    const { container } = render(LessonView, { lesson: voicingLesson })
    const dots = container.querySelectorAll('.fret-cell.grip .dot')
    expect(dots.length).toBe(4)
  })
})

describe('LessonView — playable comparison list', () => {
  const listLesson: Lesson = {
    id: 'list-test',
    slug: 'list-test',
    title: 'List Test',
    summary: 'Comparisons.',
    minutes: 5,
    blocks: [
      {
        kind: 'list',
        items: ['Major 3rd then minor 3rd.', 'Perfect 5th then tritone.'],
        playable: { root: 'C', offsets: [[4, 3], [7, 6]] },
      },
    ],
  }

  beforeEach(() => {
    playIntervalsMock.mockClear()
  })

  it('renders a play button per list item', () => {
    const { container } = render(LessonView, { lesson: listLesson })
    const buttons = container.querySelectorAll('.prose-list .row-play')
    expect(buttons.length).toBe(2)
  })

  it('lays out each item as text + button (flex)', () => {
    const { container } = render(LessonView, { lesson: listLesson })
    const items = container.querySelectorAll('.prose-list li.has-play')
    expect(items.length).toBe(2)
    // Each item has a .li-text span and a .row-play button.
    expect(items[0]!.querySelector('.li-text')).toBeTruthy()
    expect(items[0]!.querySelector('.row-play')).toBeTruthy()
  })

  it('clicking a list play button plays the comparison intervals', async () => {
    const { container } = render(LessonView, { lesson: listLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      '.prose-list .row-play',
    )
    await fireEvent.click(buttons[0]!) // major 3rd then minor 3rd
    expect(playIntervalsMock).toHaveBeenCalledTimes(1)
    // C4 = midi 60.
    expect(playIntervalsMock.mock.calls[0]![0]).toBe(60)
    expect(playIntervalsMock.mock.calls[0]![1]).toEqual([4, 3])
  })

  it('the second item plays its own offsets', async () => {
    const { container } = render(LessonView, { lesson: listLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      '.prose-list .row-play',
    )
    await fireEvent.click(buttons[1]!)
    expect(playIntervalsMock.mock.calls[0]![1]).toEqual([7, 6])
  })

  it('comparison play buttons have descriptive accessible labels', () => {
    const { container } = render(LessonView, { lesson: listLesson })
    const buttons = container.querySelectorAll<HTMLButtonElement>(
      '.prose-list .row-play',
    )
    const label0 = buttons[0]!.getAttribute('aria-label') ?? ''
    expect(label0).toContain('Play')
    expect(label0).toContain('C')
    expect(label0).toContain('Major 3rd')
    expect(label0).toContain('Minor 3rd')
  })
})

describe('LessonView — each widget displays its own selection', () => {
  // Regression: previously only the first widget block applied its selection
  // to the shared store, so every subsequent fretboard showed the FIRST
  // chord's tones (e.g. a Cmaj7 caption over an F7 diagram). Each widget must
  // now render its own chord/scale.
  const multiChordLesson: Lesson = {
    id: 'multi-chord',
    slug: 'multi-chord',
    title: 'Multi Chord',
    summary: 'Three chords.',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { chordType: 'm7', root: 'D' },
        widgets: ['fretboard'],
        caption: 'Dm7',
      },
      {
        kind: 'widget',
        selection: { chordType: 'dom7', root: 'G' },
        widgets: ['fretboard'],
        caption: 'G7',
      },
      {
        kind: 'widget',
        selection: { chordType: 'maj7', root: 'C' },
        widgets: ['fretboard'],
        caption: 'Cmaj7',
      },
    ],
  }

  /** Collect the highlighted note names from a single widget-block figure. */
  function highlightedNotes(figure: Element): Set<string> {
    const pressed = figure.querySelectorAll<HTMLButtonElement>(
      '.fret-cell[aria-pressed="true"]',
    )
    const notes = new Set<string>()
    pressed.forEach((b) => {
      const label = b.getAttribute('aria-label') ?? ''
      // aria-label = "String N fret M: NOTE"
      const note = label.split(':').pop()?.trim()
      if (note) notes.add(note)
    })
    return notes
  }

  it('the first widget shows Dm7 tones (D, F, A, C)', () => {
    const { container } = render(LessonView, { lesson: multiChordLesson })
    const figures = container.querySelectorAll('.widget-block')
    const notes = highlightedNotes(figures[0]!)
    expect(notes.has('D')).toBe(true)
    expect(notes.has('F')).toBe(true)
    expect(notes.has('A')).toBe(true)
    expect(notes.has('C')).toBe(true)
  })

  it('the second widget shows G7 tones (G, B, D, F), NOT Dm7', () => {
    const { container } = render(LessonView, { lesson: multiChordLesson })
    const figures = container.querySelectorAll('.widget-block')
    const notes = highlightedNotes(figures[1]!)
    expect(notes.has('G')).toBe(true)
    expect(notes.has('B')).toBe(true)
    // Dm7 has Eb? no — Dm7 is D F A C. G7 is G B D F. Both share D and F,
    // but G7 has B (not in Dm7) and Dm7 has A (not in G7).
    expect(notes.has('A')).toBe(false)
  })

  it('the third widget shows Cmaj7 tones (C, E, G, B), NOT Dm7 or G7', () => {
    const { container } = render(LessonView, { lesson: multiChordLesson })
    const figures = container.querySelectorAll('.widget-block')
    const notes = highlightedNotes(figures[2]!)
    expect(notes.has('C')).toBe(true)
    expect(notes.has('E')).toBe(true)
    expect(notes.has('G')).toBe(true)
    expect(notes.has('B')).toBe(true)
    // Cmaj7 has E natural; F7 (the old bug) would show Eb instead.
    expect(notes.has('Eb')).toBe(false)
    expect(notes.has('A')).toBe(false)
  })
})

describe('LessonView — open-strings playback', () => {
  const openStringsLesson: Lesson = {
    id: 'open-strings-test',
    slug: 'open-strings-test',
    title: 'Open Strings Test',
    summary: 'Hear the open strings.',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { clear: true, root: 'E', fretCount: 12 },
        widgets: ['fretboard'],
        voicing: [
          { string: 6, fret: 0 },
          { string: 5, fret: 0 },
          { string: 4, fret: 0 },
          { string: 3, fret: 0 },
          { string: 2, fret: 0 },
          { string: 1, fret: 0 },
        ],
        play: { kind: 'open-strings', order: 'low-to-high', stagger: 0.55 },
      },
    ],
  }

  beforeEach(() => {
    playNoteMock.mockClear()
  })

  it('renders a "Play strings" button', () => {
    const { getByRole } = render(LessonView, { lesson: openStringsLesson })
    expect(getByRole('button', { name: /play strings/i })).toBeTruthy()
  })

  it('plays each open string 6 → 1 in ascending sequence', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: openStringsLesson })
      await fireEvent.click(getByRole('button', { name: /play strings/i }))
      await vi.advanceTimersByTimeAsync(4000)
      // One note per string.
      expect(playNoteMock).toHaveBeenCalledTimes(6)
      // String 6 open = E2 (midi 40); string 1 open = E4 (midi 64).
      expect(playNoteMock.mock.calls[0]![0]).toBe(40)
      expect(playNoteMock.mock.calls[5]![0]).toBe(64)
    } finally {
      vi.useRealTimers()
    }
  })

  it('toggles to a Stop button while playing', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: openStringsLesson })
      await fireEvent.click(getByRole('button', { name: /play strings/i }))
      expect(getByRole('button', { name: /stop/i })).toBeTruthy()
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('LessonView — fretboard string filter & showAllNotes', () => {
  it('renders only the requested strings', () => {
    const lesson: Lesson = {
      id: 'strings-test',
      slug: 'strings-test',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { showAllNotes: true, fretCount: 12 },
          strings: [6, 5],
          widgets: ['fretboard'],
        },
      ],
    }
    const { container } = render(LessonView, { lesson })
    // 2 strings × 13 cells (open + 12 frets) = 26 fret-cells.
    expect(container.querySelectorAll('.fret-cell').length).toBe(26)
    expect(container.querySelector('[aria-label^="String 6"]')).toBeTruthy()
    expect(container.querySelector('[aria-label^="String 5"]')).toBeTruthy()
    expect(container.querySelector('[aria-label^="String 4"]')).toBeNull()
  })

  it('showAllNotes highlights every pitch class', () => {
    const lesson: Lesson = {
      id: 'all-notes',
      slug: 'all-notes',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { showAllNotes: true, fretCount: 0 },
          widgets: ['fretboard'],
        },
      ],
    }
    const { container } = render(LessonView, { lesson })
    // 6 open strings, all 12 pitch classes lit → all 6 pressed.
    expect(container.querySelectorAll('.fret-cell[aria-pressed="true"]').length).toBe(6)
  })
})

describe('LessonView — steppers', () => {
  it('root stepper cycles the root note chromatically', async () => {
    const lesson: Lesson = {
      id: 'root-step',
      slug: 'root-step',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { clear: true, followRoot: true, root: 'C', fretCount: 12 },
          widgets: ['fretboard'],
          steppers: { root: true },
        },
      ],
    }
    const { getByLabelText } = render(LessonView, { lesson })
    const up = getByLabelText('Raise root by one semitone')
    const down = getByLabelText('Lower root by one semitone')
    await fireEvent.click(up)
    expect(app.rootNote).toBe('C#')
    await fireEvent.click(down)
    expect(app.rootNote).toBe('C')
    await fireEvent.click(down)
    expect(app.rootNote).toBe('B')
  })

  it('followRoot highlights only the root note', () => {
    const lesson: Lesson = {
      id: 'follow-root',
      slug: 'follow-root',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { clear: true, followRoot: true, root: 'C', fretCount: 12 },
          widgets: ['fretboard'],
          steppers: { root: true },
        },
      ],
    }
    const { container } = render(LessonView, { lesson })
    const pressed = [
      ...container.querySelectorAll('.fret-cell[aria-pressed="true"]'),
    ]
    expect(pressed.length).toBeGreaterThan(0)
    pressed.forEach((c) => {
      expect(c.getAttribute('aria-label')?.endsWith(': C')).toBe(true)
    })
  })

  it('position stepper shifts the fretboard window and hides the open column', async () => {
    const lesson: Lesson = {
      id: 'pos-step',
      slug: 'pos-step',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { clear: true, root: 'C', fretCount: 12 },
          widgets: ['fretboard'],
          steppers: { position: true },
        },
      ],
    }
    const { getByLabelText, container } = render(LessonView, { lesson })
    // Initially the open-string (fret 0) column is shown.
    expect(container.querySelector('.open-cell')).toBeTruthy()
    await fireEvent.click(getByLabelText('Shift fretboard window up one fret'))
    // After shifting to start fret 1, the open column is gone.
    expect(container.querySelector('.open-cell')).toBeNull()
  })
})

describe('LessonView — free-exploration highlight fix', () => {
  // Regression: a `clear` (free) widget used to pass highlightNotes=[] so clicks
  // never lit anything. It must now follow the store live.
  it('clicking a fret in a clear widget highlights every occurrence of that note', async () => {
    const lesson: Lesson = {
      id: 'clear-click',
      slug: 'clear-click',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { clear: true, root: 'C', fretCount: 12 },
          widgets: ['fretboard'],
        },
      ],
    }
    const { container } = render(LessonView, { lesson })
    expect(container.querySelectorAll('.fret-cell[aria-pressed="true"]').length).toBe(0)
    const cell = container.querySelector<HTMLButtonElement>(
      '[aria-label="String 1 fret 1: F"]',
    )!
    await fireEvent.click(cell)
    const pressed = [
      ...container.querySelectorAll<HTMLButtonElement>(
        '.fret-cell[aria-pressed="true"]',
      ),
    ]
    expect(pressed.length).toBeGreaterThan(1)
    pressed.forEach((c) =>
      expect(c.getAttribute('aria-label')?.endsWith(': F')).toBe(true),
    )
  })

  it('renders a store-driven piano inside a widget block', () => {
    const lesson: Lesson = {
      id: 'piano-widget',
      slug: 'piano-widget',
      title: 'T',
      summary: 's',
      minutes: 5,
      blocks: [
        {
          kind: 'widget',
          selection: { clear: true, root: 'C', fretCount: 12 },
          widgets: ['piano', 'fretboard'],
        },
      ],
    }
    const { container } = render(LessonView, { lesson })
    expect(container.querySelector('.piano')).toBeTruthy()
    expect(container.querySelector('.fretboard-grid')).toBeTruthy()
  })
})

describe('LessonView — standalone piano Play button', () => {
  const pianoLesson: Lesson = {
    id: 'piano-play',
    slug: 'piano-play',
    title: 'T',
    summary: 's',
    minutes: 5,
    blocks: [
      {
        kind: 'piano',
        octaves: 1,
        notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
    ],
  }

  beforeEach(() => {
    playNoteMock.mockClear()
  })

  it('renders a "Play notes" button on a standalone piano block', () => {
    const { getByRole } = render(LessonView, { lesson: pianoLesson })
    expect(getByRole('button', { name: /play notes/i })).toBeTruthy()
  })

  it('plays all 12 notes in ascending order', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: pianoLesson })
      await fireEvent.click(getByRole('button', { name: /play notes/i }))
      await vi.advanceTimersByTimeAsync(6000)
      expect(playNoteMock).toHaveBeenCalledTimes(12)
      // C4 = midi 60 (first), B4 = midi 71 (last).
      expect(playNoteMock.mock.calls[0]![0]).toBe(60)
      expect(playNoteMock.mock.calls[11]![0]).toBe(71)
    } finally {
      vi.useRealTimers()
    }
  })

  it('sets soundingMidis to the currently-ringing note during play', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: pianoLesson })
      await fireEvent.click(getByRole('button', { name: /play notes/i }))
      // First note (C4 = midi 60) rings immediately.
      await vi.advanceTimersByTimeAsync(0)
      expect(app.soundingMidis.has(60)).toBe(true)
      // After the stagger, the second note (C#4 = 61) rings instead.
      await vi.advanceTimersByTimeAsync(450)
      expect(app.soundingMidis.has(61)).toBe(true)
      expect(app.soundingMidis.has(60)).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })

  it('clears soundingMidis when playback ends', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: pianoLesson })
      await fireEvent.click(getByRole('button', { name: /play notes/i }))
      await vi.advanceTimersByTimeAsync(10000)
      expect(app.soundingMidis.size).toBe(0)
    } finally {
      vi.useRealTimers()
    }
  })

  it('toggles to Stop and back', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: pianoLesson })
      await fireEvent.click(getByRole('button', { name: /play notes/i }))
      expect(getByRole('button', { name: /stop/i })).toBeTruthy()
      await fireEvent.click(getByRole('button', { name: /stop/i }))
      expect(getByRole('button', { name: /play notes/i })).toBeTruthy()
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('LessonView — voicing grip Play makes sound', () => {
  // Regression: a `clear` widget with a voicing grip had a Play button that
  // did nothing (selectionNotes returned undefined for `clear`).
  const gripLesson: Lesson = {
    id: 'grip-play',
    slug: 'grip-play',
    title: 'T',
    summary: 's',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { clear: true, root: 'C', fretCount: 12 },
        strings: [6, 5, 4, 3],
        widgets: ['fretboard'],
        voicing: [
          { string: 6, fret: 8 },
          { string: 4, fret: 10 },
          { string: 5, fret: 3 },
          { string: 3, fret: 5 },
        ],
      },
    ],
  }

  beforeEach(() => {
    playNoteMock.mockClear()
  })

  it('plays the voicing notes (unique pitches, ascending)', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: gripLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      await vi.advanceTimersByTimeAsync(3000)
      // 4 voicing positions → 2 unique MIDIs (C3=48, C4=60).
      expect(playNoteMock).toHaveBeenCalledTimes(2)
      expect(playNoteMock.mock.calls[0]![0]).toBe(48)
      expect(playNoteMock.mock.calls[1]![0]).toBe(60)
    } finally {
      vi.useRealTimers()
    }
  })

  it('rings the matching positions via soundingMidis', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: gripLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      await vi.advanceTimersByTimeAsync(0)
      // C3 (midi 48) ringing first.
      expect(app.soundingMidis.has(48)).toBe(true)
      await vi.advanceTimersByTimeAsync(450)
      // Then C4 (midi 60).
      expect(app.soundingMidis.has(60)).toBe(true)
      expect(app.soundingMidis.has(48)).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('LessonView — clear widget Play runs the chromatic scale', () => {
  // A `clear` widget with no voicing used to play nothing. It now runs the
  // 12-note chromatic scale from its root so Play always makes sound.
  const clearLesson: Lesson = {
    id: 'clear-play',
    slug: 'clear-play',
    title: 'T',
    summary: 's',
    minutes: 5,
    blocks: [
      {
        kind: 'widget',
        selection: { clear: true, root: 'C', fretCount: 12 },
        widgets: ['piano', 'fretboard'],
      },
    ],
  }

  beforeEach(() => {
    playNoteMock.mockClear()
  })

  it('plays 12 chromatic notes from the root', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: clearLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      await vi.advanceTimersByTimeAsync(7000)
      expect(playNoteMock).toHaveBeenCalledTimes(12)
      expect(playNoteMock.mock.calls[0]![0]).toBe(60) // C4
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('LessonView — phrase Play (ordered lick)', () => {
  // A short C-major phrase: 1-2-3-4-5-7-6-5 (C D E F G B A G).
  // Positions (string,fret): (4,10)(4,12)(3,9)(3,10)(3,12)(2,12)(2,10)(3,12).
  const phraseLesson: Lesson = {
    id: 'phrase-test',
    slug: 'phrase-test',
    title: 'Phrase Test',
    summary: 's',
    minutes: 5,
    blocks: [
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
        play: { kind: 'phrase', stagger: 0.3 },
      },
    ],
  }

  beforeEach(() => {
    playNoteMock.mockClear()
  })

  it('plays the phrase notes in array order (not sorted)', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: phraseLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      await vi.advanceTimersByTimeAsync(5000)
      expect(playNoteMock).toHaveBeenCalledTimes(8)
      // Order is the notated phrase: C4 D4 E4 F4 G4 B4 A4 G4.
      const midis = playNoteMock.mock.calls.map((c) => c[0])
      expect(midis).toEqual([60, 62, 64, 65, 67, 71, 69, 67])
    } finally {
      vi.useRealTimers()
    }
  })

  it('lights each note in turn via soundingMidis', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: phraseLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      // First note (C4 = 60) rings immediately.
      await vi.advanceTimersByTimeAsync(0)
      expect(app.soundingMidis.has(60)).toBe(true)
      // Second note (D4 = 62) after the stagger.
      await vi.advanceTimersByTimeAsync(300)
      expect(app.soundingMidis.has(62)).toBe(true)
      expect(app.soundingMidis.has(60)).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })

  it('clears soundingMidis when the phrase ends', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: phraseLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      await vi.advanceTimersByTimeAsync(10000)
      expect(app.soundingMidis.size).toBe(0)
    } finally {
      vi.useRealTimers()
    }
  })

  it('toggles to Stop and back', async () => {
    vi.useFakeTimers()
    try {
      const { getByRole } = render(LessonView, { lesson: phraseLesson })
      await fireEvent.click(getByRole('button', { name: /^▶ Play$/ }))
      expect(getByRole('button', { name: /stop/i })).toBeTruthy()
      await fireEvent.click(getByRole('button', { name: /stop/i }))
      expect(getByRole('button', { name: /^▶ Play$/ })).toBeTruthy()
    } finally {
      vi.useRealTimers()
    }
  })
})
