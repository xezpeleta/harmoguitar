import { describe, it, expect, beforeEach } from 'vitest'
import { route, navigate, NAV_ITEMS } from './router.svelte'

describe('router', () => {
  beforeEach(() => {
    window.location.hash = ''
  })

  it('defaults to "/" when no hash is set', () => {
    window.location.hash = ''
    window.dispatchEvent(new Event('hashchange'))
    expect(route.path).toBe('/')
  })

  it('navigate sets the hash and route updates on hashchange', () => {
    navigate('/lessons')
    // Setting the hash fires hashchange; dispatch to be deterministic in jsdom.
    window.dispatchEvent(new Event('hashchange'))
    expect(window.location.hash).toBe('#/lessons')
    expect(route.path).toBe('/lessons')
  })

  it('normalises a path without a leading slash', () => {
    window.location.hash = 'builder'
    window.dispatchEvent(new Event('hashchange'))
    expect(route.path).toBe('/builder')
  })

  it('handles deep links like #/about', () => {
    window.location.hash = '#/about'
    window.dispatchEvent(new Event('hashchange'))
    expect(route.path).toBe('/about')
  })

  it('NAV_ITEMS has Home, Lessons, Builder, About', () => {
    expect(NAV_ITEMS.map((i) => i.label)).toEqual([
      'Home', 'Lessons', 'Builder', 'About',
    ])
  })
})
