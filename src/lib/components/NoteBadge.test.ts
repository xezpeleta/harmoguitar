import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/svelte'
import NoteBadge from './NoteBadge.svelte'
import { app } from '$lib/stores/app.svelte'
import { noteColor } from '$lib/utils/colors'

describe('NoteBadge.svelte', () => {
  beforeEach(() => app.reset())
  afterEach(cleanup)

  it('renders the note name by default', () => {
    render(NoteBadge, { props: { note: 'C#' } })
    expect(screen.getByText('C#')).toBeInTheDocument()
  })

  it('renders solfège when showSolfege is true', () => {
    render(NoteBadge, { props: { note: 'D', showSolfege: true } })
    expect(screen.getByText('Re')).toBeInTheDocument()
  })

  it('shows a color dot by default', () => {
    const { container } = render(NoteBadge, { props: { note: 'C' } })
    const dot = container.querySelector('.dot')
    expect(dot).not.toBeNull()
    // The color is set as a CSS var on the parent badge.
    const badge = container.querySelector('.note-badge')!
    expect(badge.getAttribute('style')).toContain(noteColor('C'))
  })

  it('hides the dot when dot={false}', () => {
    const { container } = render(NoteBadge, { props: { note: 'C', dot: false } })
    expect(container.querySelector('.dot')).toBeNull()
  })

  it('filled variant uses the note color as background', () => {
    const { container } = render(NoteBadge, {
      props: { note: 'E', filled: true, dot: false },
    })
    const badge = container.querySelector('.note-badge')
    expect(badge).toHaveClass('filled')
    expect(badge?.getAttribute('style')).toContain(noteColor('E'))
  })

  it('root variant gets the root class', () => {
    const { container } = render(NoteBadge, {
      props: { note: 'G', variant: 'root' },
    })
    expect(container.querySelector('.note-badge')).toHaveClass('root')
  })

  it('has a title attribute with the note name', () => {
    render(NoteBadge, { props: { note: 'A' } })
    expect(screen.getByTitle('Note A (pitch class 9)')).toBeInTheDocument()
  })
})
