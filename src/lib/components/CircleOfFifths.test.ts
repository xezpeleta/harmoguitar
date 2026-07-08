import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte'
import CircleOfFifths from './CircleOfFifths.svelte'
import { app } from '$lib/stores/app.svelte'

describe('CircleOfFifths.svelte', () => {
  beforeEach(() => app.reset())
  afterEach(cleanup)

  it('renders 12 major and 12 minor key buttons (24 key buttons)', () => {
    render(CircleOfFifths)
    // Key buttons have accessible names containing "major" or "minor".
    const keyButtons = screen.getAllByRole('button', { name: /major|minor/ })
    expect(keyButtons).toHaveLength(24)
  })

  it('places C major at the top and labels it with no sharps/flats', () => {
    render(CircleOfFifths)
    expect(screen.getByLabelText(/C major — no sharps or flats/)).toBeInTheDocument()
  })

  it('labels G major with 1 sharp and F major with 1 flat', () => {
    render(CircleOfFifths)
    expect(screen.getByLabelText(/G major — 1 sharp/)).toBeInTheDocument()
    expect(screen.getByLabelText(/F major — 1 flat/)).toBeInTheDocument()
  })

  it('highlights the active key (C major by default)', () => {
    render(CircleOfFifths)
    const c = screen.getByLabelText(/C major — no sharps or flats/)
    expect(c).toHaveAttribute('aria-pressed', 'true')
  })

  it('clicking G major sets the store key + explores G major', async () => {
    render(CircleOfFifths)
    await fireEvent.click(screen.getByLabelText(/G major — 1 sharp/))
    expect(app.key).toBe('G')
    expect(app.keyScaleType).toBe('major')
    expect(app.scaleType).toBe('major')
    expect(app.rootNote).toBe('G')
  })

  it('clicking a minor key sets the store to natural minor', async () => {
    render(CircleOfFifths)
    // A minor is the relative minor of C major.
    await fireEvent.click(screen.getByLabelText(/A minor — relative of C major/))
    expect(app.key).toBe('A')
    expect(app.keyScaleType).toBe('natural-minor')
    expect(app.scaleType).toBe('natural-minor')
  })

  it('shows the 7 diatonic chords of the current key', () => {
    render(CircleOfFifths)
    // C major diatonic triads: I ii iii IV V vi vii°
    expect(screen.getByText('I')).toBeInTheDocument()
    expect(screen.getByText('ii')).toBeInTheDocument()
    expect(screen.getByText('iii')).toBeInTheDocument()
    expect(screen.getByText('IV')).toBeInTheDocument()
    expect(screen.getByText('V')).toBeInTheDocument()
    expect(screen.getByText('vi')).toBeInTheDocument()
    expect(screen.getByText('vii°')).toBeInTheDocument()
  })

  it('clicking a diatonic chord explores it', async () => {
    render(CircleOfFifths)
    // The V chord in C major is G major.
    const vButton = screen.getByText('V').closest('button')!
    await fireEvent.click(vButton)
    expect(app.chordType).toBe('major')
    expect(app.rootNote).toBe('G')
  })

  it('updates diatonic chords when the key changes', async () => {
    render(CircleOfFifths)
    await fireEvent.click(screen.getByLabelText(/G major — 1 sharp/))
    // G major: I ii iii IV V vi vii°  (roots shift to G A B C D E F#)
    const v = screen.getByText('V').closest('button')!
    expect(v.getAttribute('title')).toContain('D') // V of G is D major
  })

  it('keyboard activates a major key (Enter)', async () => {
    render(CircleOfFifths)
    const d = screen.getByLabelText(/D major — 2 sharp/)
    d.focus()
    await fireEvent.keyDown(d, { key: 'Enter' })
    expect(app.key).toBe('D')
  })

  it('shows the key signature in the centre readout', () => {
    render(CircleOfFifths)
    // Default C major.
    expect(screen.getByText('C major')).toBeInTheDocument()
    expect(screen.getByText('no sharps or flats')).toBeInTheDocument()
  })
})
