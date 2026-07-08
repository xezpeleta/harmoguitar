import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte'
import IntervalWheel from './IntervalWheel.svelte'
import { app } from '$lib/stores/app.svelte'

// Mock the audio engine so no real AudioContext is touched in jsdom.
const playNoteMock = vi.fn()
vi.mock('$lib/services/audio', () => ({
  audio: {
    playNote: (...a: unknown[]) => playNoteMock(...a),
    playChord: vi.fn(),
    playSequence: vi.fn(),
    playChordByName: vi.fn(),
    stopAll: vi.fn(),
    setVolume: vi.fn(),
    dispose: vi.fn(),
    available: false,
  },
}))

describe('IntervalWheel.svelte', () => {
  beforeEach(() => {
    playNoteMock.mockClear()
    app.reset()
  })
  afterEach(cleanup)

  it('renders 12 interval segments', () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C', 'E', 'G'] },
    })
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(12)
  })

  it('roots the wheel at the given note (root segment at the top)', () => {
    render(IntervalWheel, {
      props: { rootNote: 'G', highlightNotes: ['G'] },
    })
    // The root segment's aria-label starts with "Unison: G".
    const rootBtn = screen.getByLabelText(/Unison: G/)
    expect(rootBtn).toHaveClass('root')
  })

  it('highlights the segments in the selection', () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C', 'E', 'G', 'Bb'] },
    })
    // C (Unison), E (Major 3rd), G (Perfect 5th), Bb (Minor 7th) are highlighted.
    expect(screen.getByLabelText(/Unison: C/)).toHaveClass('highlighted')
    expect(screen.getByLabelText(/Major 3rd: E/)).toHaveClass('highlighted')
    expect(screen.getByLabelText(/Perfect 5th: G/)).toHaveClass('highlighted')
    expect(screen.getByLabelText(/Minor 7th: Bb/)).toHaveClass('highlighted')
    // D (Major 2nd) is not in the chord → not highlighted.
    expect(screen.getByLabelText(/Major 2nd: D/)).not.toHaveClass('highlighted')
  })

  it('uses the contextual spelling from the selection', () => {
    // C Dorian = C D Eb F G A Bb — the third should spell "Eb", not "D#".
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'] },
    })
    expect(screen.getByLabelText(/Minor 3rd: Eb/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Minor 3rd: D#/)).toBeNull()
  })

  it('shows solfège labels when enabled', () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C', 'E'], showSolfege: true },
    })
    // Note labels are SVG <text>; the root shows "Do".
    const texts = document.querySelectorAll('text.note-label')
    expect(texts.length).toBe(12)
    expect(texts[0]!.textContent).toBe('Do')
  })

  it('clicking a segment plays the root then the interval note', async () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C'] },
    })
    const maj3 = screen.getByLabelText(/Major 3rd: E/)
    await fireEvent.click(maj3)
    // Root plays immediately.
    expect(playNoteMock).toHaveBeenCalledTimes(1)
    // Interval note plays after a short delay.
    await new Promise((r) => setTimeout(r, 400))
    expect(playNoteMock).toHaveBeenCalledTimes(2)
  })

  it('updates the readout on hover/focus', async () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C'] },
    })
    const tritone = screen.getByLabelText(/Tritone/)
    await fireEvent.mouseEnter(tritone)
    expect(screen.getByText('Tritone')).toBeInTheDocument()
  })

  it('keyboard activates a segment (Enter)', async () => {
    render(IntervalWheel, {
      props: { rootNote: 'C', highlightNotes: ['C'] },
    })
    const p5 = screen.getByLabelText(/Perfect 5th: G/)
    p5.focus()
    await fireEvent.keyDown(p5, { key: 'Enter' })
    expect(playNoteMock).toHaveBeenCalled()
  })

  it('reads from the store when props are omitted', () => {
    app.selectChord('D', 'm7') // D F A C
    render(IntervalWheel)
    expect(screen.getByLabelText(/Unison: D/)).toHaveClass('root', 'highlighted')
    expect(screen.getByLabelText(/Minor 3rd: F/)).toHaveClass('highlighted')
  })
})
