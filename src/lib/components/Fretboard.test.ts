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

  it('non-root highlighted notes are highlighted but not root', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'C' },
    })
    const cell = screen.getByLabelText('String 1 fret 1: F')
    expect(cell).toHaveClass('highlighted')
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

  it('uses the selection contextual spelling even when preferFlats is off', () => {
    // C Dorian has an Eb (flat third). Even with preferFlats=false, the
    // fretboard should label that pitch class as "Eb" (matching the scale),
    // not "D#".
    render(Fretboard, {
      props: {
        fretCount: 2,
        highlightNotes: ['C', 'D', 'Eb'],
        rootNote: 'C',
        preferFlats: false,
      },
    })
    // Fret 1 of the D string (string 4) is Eb.
    expect(screen.getByLabelText('String 4 fret 1: Eb')).toBeInTheDocument()
  })

  it('spells solfège consistently with the selection (Mib, not Re#)', () => {
    render(Fretboard, {
      props: {
        fretCount: 2,
        highlightNotes: ['C', 'D', 'Eb'],
        rootNote: 'C',
        showSolfege: true,
      },
    })
    // Eb → Mib in fixed-Do, not Re# (which would come from D# spelling).
    // The dot text shows solfège; the aria-label keeps the note name.
    expect(screen.getByText('Mib')).toBeInTheDocument()
    expect(screen.queryByText('Re#')).toBeNull()
    expect(screen.getByLabelText('String 4 fret 1: Eb')).toBeInTheDocument()
  })

  it('renders a string label gutter with number and open note', () => {
    render(Fretboard, { props: { fretCount: 0, highlightNotes: [], rootNote: 'C' } })
    // String 1 = high E, string 6 = low E.
    expect(screen.getAllByText('1').length).toBeGreaterThan(0)
    expect(screen.getAllByText('6').length).toBeGreaterThan(0)
    // Open tuning notes appear in the label gutter.
    const eLabels = screen.getAllByText('E')
    expect(eLabels.length).toBeGreaterThanOrEqual(2) // high E + low E
  })

  it('root dot has a distinct ring via the root class', () => {
    render(Fretboard, {
      props: { fretCount: 1, highlightNotes: ['F'], rootNote: 'F' },
    })
    const rootCell = screen.getByLabelText('String 1 fret 1: F')
    const dot = rootCell.querySelector('.dot')
    expect(dot).toHaveClass('root')
  })

  it('has a group label for the fretboard', () => {
    render(Fretboard, { props: { fretCount: 0, highlightNotes: [], rootNote: 'C' } })
    expect(screen.getByRole('group', { name: 'Interactive fretboard' })).toBeInTheDocument()
  })
})

describe('Fretboard.svelte — greenLights mode', () => {
  beforeEach(() => {
    app.reset()
  })
  afterEach(cleanup)

  it('colors the root red and other scale tones green', () => {
    render(Fretboard, {
      props: {
        fretCount: 1,
        highlightNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        rootNote: 'C',
        greenLights: true,
      },
    })
    // String 2 fret 1 = C (root) → red (#d62828)
    const rootCell = screen.getByLabelText('String 2 fret 1: C')
    expect(rootCell.getAttribute('style') ?? '').toContain('#d62828')
    // String 4 fret 0 = D (non-root) → green (#43a047)
    const dCell = screen.getByLabelText('String 4 fret 0: D')
    expect(dCell.getAttribute('style') ?? '').toContain('#43a047')
  })

  it('without greenLights, non-root tones use the pitch-class palette (D = orange)', () => {
    render(Fretboard, {
      props: {
        fretCount: 1,
        highlightNotes: ['C', 'D'],
        rootNote: 'C',
      },
    })
    // String 4 fret 0 = D → orange (#f77f00), not green
    const dCell = screen.getByLabelText('String 4 fret 0: D')
    expect(dCell.getAttribute('style') ?? '').toContain('#f77f00')
    expect(dCell.getAttribute('style') ?? '').not.toContain('#43a047')
  })
})
