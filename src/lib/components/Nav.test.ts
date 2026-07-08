import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/svelte'
import Nav from './Nav.svelte'
import { app } from '$lib/stores/app.svelte'
import { navigate } from '$lib/router.svelte'

describe('Nav.svelte', () => {
  beforeEach(() => {
    app.reset()
    window.location.hash = ''
  })
  afterEach(cleanup)

  it('renders all four nav links', () => {
    render(Nav)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lessons' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Builder' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('marks the current route as active with aria-current', async () => {
    render(Nav)
    navigate('/lessons')
    window.dispatchEvent(new Event('hashchange'))
    await new Promise((r) => setTimeout(r, 0))
    const lessonsLink = screen.getByRole('link', { name: 'Lessons' })
    expect(lessonsLink).toHaveAttribute('aria-current', 'page')
    expect(lessonsLink).toHaveClass('active')
  })

  it('the note-naming switch defaults to alphabetic (C D E) and toggles solfège', async () => {
    render(Nav)
    const group = screen.getByRole('group', { name: 'Note naming system' })
    const alpha = screen.getByRole('button', { name: 'C D E' })
    const solfa = screen.getByRole('button', { name: 'Do Re Mi' })
    // Defaults to alphabetic.
    expect(app.showSolfege).toBe(false)
    expect(alpha).toHaveAttribute('aria-pressed', 'true')
    expect(solfa).toHaveAttribute('aria-pressed', 'false')
    // Switch to solfège.
    await fireEvent.click(solfa)
    expect(app.showSolfege).toBe(true)
    expect(solfa).toHaveClass('active')
    expect(alpha).not.toHaveClass('active')
    // Switch back.
    await fireEvent.click(alpha)
    expect(app.showSolfege).toBe(false)
    expect(alpha).toHaveClass('active')
    // group still present
    expect(group).toBeInTheDocument()
  })

  it('has a hamburger toggle for small screens', () => {
    render(Nav)
    expect(
      screen.getByRole('button', { name: 'Toggle navigation menu' }),
    ).toBeInTheDocument()
  })
})
