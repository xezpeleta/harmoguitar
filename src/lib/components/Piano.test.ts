import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte'
import Piano from './Piano.svelte'
import { app } from '$lib/stores/app.svelte'

// Mock the audio engine so no real AudioContext is touched in jsdom.
const playNoteMock = vi.fn()
vi.mock('$lib/services/audio', () => ({
  audio: {
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

describe('Piano.svelte', () => {
  beforeEach(() => {
    playNoteMock.mockClear()
    app.reset()
  })
  afterEach(cleanup)

  it('renders 24 keys for 2 octaves (14 white + 10 black)', () => {
    render(Piano, {
      props: { octaves: 2, highlightNotes: [], rootNote: 'C' },
    })
    const keys = screen.getAllByRole('button')
    expect(keys).toHaveLength(24)
  })

  it('renders 12 keys for 1 octave (7 white + 5 black)', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: [], rootNote: 'C' },
    })
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })

  it('highlights and labels only the given notes (standalone)', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C', 'E', 'G'], rootNote: 'C' },
    })
    // C, E, G are highlighted (aria-pressed true) and labelled.
    expect(screen.getByLabelText('C (pitch class 0)')).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByLabelText('E (pitch class 4)')).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByLabelText('G (pitch class 7)')).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    // D (white key) is not highlighted.
    expect(screen.getByLabelText('D (pitch class 2)')).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    // C# (black key) is not highlighted.
    expect(screen.getByLabelText('C# (pitch class 1)')).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('shows a visible label only on highlighted keys', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C'], rootNote: 'C' },
    })
    // Exactly one visible "C" label (the highlighted C key).
    expect(screen.getAllByText('C')).toHaveLength(1)
  })

  it('standalone mode does not mark a root when rootNote is omitted', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C', 'E', 'G'] },
    })
    const cKey = screen.getByLabelText('C (pitch class 0)')
    expect(cKey).not.toHaveClass('root')
  })

  it('standalone mode marks root when rootNote is passed', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C', 'E', 'G'], rootNote: 'C' },
    })
    expect(screen.getByLabelText('C (pitch class 0)')).toHaveClass('root')
    expect(screen.getByLabelText('E (pitch class 4)')).not.toHaveClass('root')
  })

  it('clicking a key in standalone mode plays but does not toggle the store', async () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C'], rootNote: 'C' },
    })
    const key = screen.getByLabelText('D (pitch class 2)')
    await fireEvent.click(key)
    expect(playNoteMock).toHaveBeenCalledTimes(1)
    // Store untouched in standalone mode.
    expect(app.selectedNotes).toHaveLength(0)
  })

  it('store-driven mode mirrors the store selection', () => {
    app.selectScale('C', 'major') // C D E F G A B
    render(Piano, { props: { octaves: 1 } })
    // The 7 naturals are highlighted; accidentals are not.
    expect(screen.getByLabelText('C (pitch class 0)')).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByLabelText('B (pitch class 11)')).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByLabelText('C# (pitch class 1)')).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('store-driven mode marks the store root', () => {
    app.selectScale('G', 'major')
    render(Piano, { props: { octaves: 1 } })
    expect(screen.getByLabelText('G (pitch class 7)')).toHaveClass('root')
  })

  it('clicking in store-driven free mode plays and toggles the store', async () => {
    // No chord/scale selected → free mode.
    render(Piano, { props: { octaves: 1 } })
    const key = screen.getByLabelText('D (pitch class 2)')
    await fireEvent.click(key)
    expect(playNoteMock).toHaveBeenCalledTimes(1)
    expect(app.selectedNotes).toHaveLength(1)
    expect(app.selectedNotes[0]).toBe('D')
  })

  it('clicking a highlighted note in free mode removes it', async () => {
    render(Piano, { props: { octaves: 1 } })
    const key = screen.getByLabelText('D (pitch class 2)')
    await fireEvent.click(key) // add
    await fireEvent.click(key) // remove
    expect(app.selectedNotes).toHaveLength(0)
  })

  it('onselectnote prop overrides the default behaviour', async () => {
    const onselect = vi.fn()
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C'], onselectnote: onselect },
    })
    const key = screen.getByLabelText('D (pitch class 2)')
    await fireEvent.click(key)
    expect(onselect).toHaveBeenCalledTimes(1)
    expect(onselect.mock.calls[0]![0]).toBe('D')
    // store NOT toggled because callback overrode default
    expect(app.selectedNotes).toHaveLength(0)
  })

  it('shows solfège labels when showSolfege is true', () => {
    render(Piano, {
      props: { octaves: 1, highlightNotes: ['C'], rootNote: 'C', showSolfege: true },
    })
    // C = Do in fixed-Do.
    expect(screen.getByText('Do')).toBeInTheDocument()
  })

  it('standalone mode spells accidentals per preferFlats', () => {
    render(Piano, {
      props: {
        octaves: 1,
        highlightNotes: ['C#', 'D#', 'F#', 'G#', 'A#'],
        preferFlats: true,
      },
    })
    // With flats on, pc 1 (C#/Db) shows as Db.
    expect(screen.getByLabelText('Db (pitch class 1)')).toBeInTheDocument()
    expect(screen.getByLabelText('Eb (pitch class 3)')).toBeInTheDocument()
    expect(screen.queryByLabelText('C# (pitch class 1)')).toBeNull()
  })

  it('store-driven mode uses contextual spelling (Eb, not D#)', () => {
    // C Dorian spells its third Eb. Store-driven piano should label pc 3 "Eb".
    app.selectScale('C', 'dorian') // C D Eb F G A Bb
    render(Piano, { props: { octaves: 1, preferFlats: false } })
    expect(screen.getByLabelText('Eb (pitch class 3)')).toBeInTheDocument()
    expect(screen.queryByLabelText('D# (pitch class 3)')).toBeNull()
  })

  it('has a group label for the keyboard', () => {
    render(Piano, { props: { octaves: 1, highlightNotes: ['C'], rootNote: 'C' } })
    expect(
      screen.getByRole('group', { name: /Piano keyboard/ }),
    ).toBeInTheDocument()
  })

  it('all 12 pitch classes highlighted show 2 labels each across 2 octaves', () => {
    render(Piano, {
      props: {
        octaves: 2,
        highlightNotes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        rootNote: 'C',
      },
    })
    // Every note appears once per octave → 2 visible labels each.
    expect(screen.getAllByText('C')).toHaveLength(2)
    expect(screen.getAllByText('C#')).toHaveLength(2)
    expect(screen.getAllByText('B')).toHaveLength(2)
    // All 24 keys highlighted.
    const keys = screen.getAllByRole('button')
    expect(keys.every((k) => k.getAttribute('aria-pressed') === 'true')).toBe(true)
  })
})

describe('Piano.svelte — greenLights mode', () => {
  beforeEach(() => {
    app.reset()
  })
  afterEach(cleanup)

  it('colors the root red and other scale tones green', () => {
    render(Piano, {
      props: {
        octaves: 1,
        highlightNotes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        rootNote: 'C',
        greenLights: true,
      },
    })
    // C (root) → red
    const cKey = screen.getByLabelText('C (pitch class 0)')
    const cDot = cKey.querySelector('.dot')
    expect(cDot?.getAttribute('style') ?? '').toContain('#d62828')
    // D (non-root) → green
    const dKey = screen.getByLabelText('D (pitch class 2)')
    const dDot = dKey.querySelector('.dot')
    expect(dDot?.getAttribute('style') ?? '').toContain('#43a047')
  })

  it('without greenLights, uses the pitch-class palette (D = orange)', () => {
    render(Piano, {
      props: {
        octaves: 1,
        highlightNotes: ['C', 'D'],
        rootNote: 'C',
      },
    })
    const dKey = screen.getByLabelText('D (pitch class 2)')
    const dDot = dKey.querySelector('.dot')
    expect(dDot?.getAttribute('style') ?? '').toContain('#f77f00')
    expect(dDot?.getAttribute('style') ?? '').not.toContain('#43a047')
  })
})
