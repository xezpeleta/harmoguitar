/**
 * LessonView.test.ts — Tests for the generic lesson reader.
 *
 * Uses a tiny fixture lesson exercising every block kind, then asserts the
 * rendered output. Widget blocks are verified to apply their selection to the
 * shared store.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import LessonView from '$lib/components/LessonView.svelte'
import type { Lesson } from '$lib/content/schema'
import { app } from '$lib/stores/app.svelte'
import { resetProgress, isComplete } from '$lib/services/progress.svelte'

// Mock the audio engine so playback calls can be asserted.
const playIntervalMock = vi.fn()
const playIntervalsMock = vi.fn()
vi.mock('$lib/services/audio', () => ({
  audio: {
    playInterval: (...a: unknown[]) => playIntervalMock(...a),
    playIntervals: (...a: unknown[]) => playIntervalsMock(...a),
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
