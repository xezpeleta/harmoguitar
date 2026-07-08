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

  it('the solfège toggle reflects and updates the store', async () => {
    render(Nav)
    const toggle = screen.getByTitle('Show fixed-Do solfège (Do Ré Mi…)')
    const checkbox = toggle.querySelector('input')!
    expect(checkbox).not.toBeChecked()
    await fireEvent.click(checkbox)
    expect(app.showSolfege).toBe(true)
  })

  it('the flats toggle updates the store', async () => {
    render(Nav)
    const toggle = screen.getByTitle('Spell notes with flats')
    const checkbox = toggle.querySelector('input')!
    await fireEvent.click(checkbox)
    expect(app.preferFlats).toBe(true)
  })

  it('has a hamburger toggle for small screens', () => {
    render(Nav)
    expect(
      screen.getByRole('button', { name: 'Toggle navigation menu' }),
    ).toBeInTheDocument()
  })
})
