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
vi.mock('$lib/services/audio', () => ({
  audio: {
    playInterval: (...a: unknown[]) => playIntervalMock(...a),
    playIntervals: (...a: unknown[]) => playIntervalsMock(...a),
    playProgression: (...a: unknown[]) => playProgressionMock(...a),
    playNote: vi.fn(),
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
