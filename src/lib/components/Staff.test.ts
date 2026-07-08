import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, cleanup, waitFor } from '@testing-library/svelte'
import Staff from './Staff.svelte'
import { app } from '$lib/stores/app.svelte'

describe('Staff.svelte', () => {
  beforeEach(() => app.reset())
  afterEach(cleanup)

  it('shows the empty-state message when there are no notes', () => {
    const { container } = render(Staff, { props: { notes: [] } })
    expect(container.textContent).toContain('Select a chord or scale')
    // No svg drawn.
    expect(container.querySelector('svg')).toBeNull()
  })

  it('renders an SVG stave for a chord', async () => {
    const { container } = render(Staff, {
      props: { notes: ['C', 'E', 'G', 'B'], asScale: false },
    })
    // The rAF-debounced draw runs after a tick.
    await waitFor(() => {
      expect(container.querySelector('svg')).not.toBeNull()
    })
    const svg = container.querySelector('svg')!
    // VexFlow emits <g> groups containing <path> elements.
    expect(svg.querySelectorAll('path').length).toBeGreaterThan(0)
  })

  it('renders an SVG stave for a scale (sequence)', async () => {
    const { container } = render(Staff, {
      props: {
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        asScale: true,
      },
    })
    await waitFor(() => {
      expect(container.querySelector('svg')).not.toBeNull()
    })
    expect(container.querySelector('svg')!.querySelectorAll('path').length).toBeGreaterThan(0)
  })

  it('redraws when the notes change', async () => {
    const { container, rerender } = render(Staff, {
      props: { notes: ['C', 'E', 'G'] },
    })
    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    const firstPaths = container.querySelectorAll('path').length

    await rerender({ notes: ['C', 'Eb', 'G', 'Bb'] })
    await waitFor(() => {
      // A denser chord should produce at least as many glyphs.
      expect(container.querySelectorAll('path').length).toBeGreaterThanOrEqual(firstPaths)
    })
  })

  it('keeps the SVG cleared between redraws (no stacking)', async () => {
    const { container, rerender } = render(Staff, {
      props: { notes: ['C', 'E', 'G'] },
    })
    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    await rerender({ notes: ['D', 'F', 'A'] })
    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    // Exactly one svg element.
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  it('reads from the store when notes are not provided', async () => {
    app.selectChord('C', 'maj7')
    const { container } = render(Staff)
    await waitFor(() => expect(container.querySelector('svg')).not.toBeNull())
    // Cmaj7 = C E G B should be in the aria-label.
    const img = container.querySelector('[role="img"]')!
    expect(img.getAttribute('aria-label')).toContain('C')
    expect(img.getAttribute('aria-label')).toContain('B')
  })

  it('exposes an accessible label listing the notes', async () => {
    const { container } = render(Staff, {
      props: { notes: ['C', 'E', 'G'] },
    })
    const img = container.querySelector('[role="img"]')!
    expect(img.getAttribute('aria-label')).toBe('Staff notation: C, E, G')
  })
})
