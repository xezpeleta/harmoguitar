import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte'
import Fretboard from './Fretboard.svelte'
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

describe('Fretboard.svelte', () => {
  beforeEach(() => {
    playNoteMock.mockClear()
    app.reset()
  })
  afterEach(cleanup)

  it('renders a cell for every string × fret (6 × 13 = 78 buttons)', () => {
    render(Fretboard, { props: { fretCount: 12, highlightNotes: [], rootNote: 'C' } })
    const cells = screen.getAllByRole('button')
    expect(cells).toHaveLength(78) // 6 strings × (12 frets + open)
  })

  it('places high E (string 1) at the top, low E (string 6) at the bottom', () => {
    render(Fretboard, { props: { fretCount: 0, highlightNotes: [], rootNote: 'C' } })
    const cells = screen.getAllByRole('button')
    // 6 open-string cells; first should be string 1, last string 6.
    expect(cells[0]).toHaveAttribute('aria-label', 'String 1 fret 0: E')
    expect(cells[5]).toHaveAttribute('aria-label', 'String 6 fret 0: E')
  })

  it('shows dots only on highlighted notes', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'F' },
    })
    // F appears on fret 1 of the low & high E strings (and open-string? no, E open).
    // On a 1-fret board, F is at fret 1 of both E strings.
    const dots = screen.getAllByText('F')
    expect(dots.length).toBe(2)
  })

  it('marks the root note distinctly', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'F' },
    })
    const rootCell = screen.getByLabelText('String 1 fret 1: F')
    expect(rootCell).toHaveClass('root')
    expect(rootCell).toHaveClass('highlighted')
    expect(rootCell).toHaveAttribute('aria-pressed', 'true')
  })

  it('non-root highlighted notes get the root-not-root class', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'C' },
    })
    const cell = screen.getByLabelText('String 1 fret 1: F')
    expect(cell).toHaveClass('highlighted', 'root-not-root')
    expect(cell).not.toHaveClass('root')
  })

  it('non-highlighted cells have aria-pressed false and no dot', () => {
    render(Fretboard, {
      props: { fretCount: 0, highlightNotes: ['C'], rootNote: 'C' },
    })
    // The open E strings are not C — no dot, aria-pressed false.
    const openE = screen.getByLabelText('String 1 fret 0: E')
    expect(openE).toHaveAttribute('aria-pressed', 'false')
    expect(openE).not.toHaveClass('highlighted')
  })

  it('clicking a cell plays the note and toggles the store', async () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: [], rootNote: 'C' },
    })
    const cell = screen.getByLabelText('String 1 fret 1: F')
    await fireEvent.click(cell)
    expect(playNoteMock).toHaveBeenCalledTimes(1)
    // The clicked note's pitch class (F) should now be in the store selection.
    expect(app.selectedNotes).toHaveLength(1)
    expect(app.selectedNotes[0]).toBe('F')
  })

  it('clicking a highlighted note again removes it from the store', async () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: [], rootNote: 'C' },
    })
    const cell = screen.getByLabelText('String 1 fret 1: F')
    await fireEvent.click(cell) // add
    await fireEvent.click(cell) // remove
    expect(app.selectedNotes).toHaveLength(0)
  })

  it('onselectnote prop overrides the default store toggle', async () => {
    const onselect = vi.fn()
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: [], rootNote: 'C', onselectnote: onselect },
    })
    const cell = screen.getByLabelText('String 1 fret 1: F')
    await fireEvent.click(cell)
    expect(onselect).toHaveBeenCalledTimes(1)
    expect(onselect.mock.calls[0]![0]).toBe('F')
    // store NOT toggled because callback overrode default
    expect(app.selectedNotes).toHaveLength(0)
  })

  it('shows solfège labels when showSolfege is true', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'F', showSolfege: true },
    })
    // F = Fa in fixed-Do
    expect(screen.getAllByText('Fa').length).toBeGreaterThan(0)
  })

  it('honours preferFlats for display spelling', () => {
    // Fret 1 of the D string (string 4) is D# / Eb.
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['Eb'], rootNote: 'Eb', preferFlats: true },
    })
    expect(screen.getByLabelText('String 4 fret 1: Eb')).toBeInTheDocument()
  })

  it('has a group label for the fretboard', () => {
    render(Fretboard, { props: { fretCount: 0, highlightNotes: [], rootNote: 'C' } })
    expect(screen.getByRole('group', { name: 'Interactive fretboard' })).toBeInTheDocument()
  })
})
