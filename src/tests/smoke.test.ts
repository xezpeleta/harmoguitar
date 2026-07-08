import { describe, it, expect } from 'vitest'

/**
 * Smoke test — verifies the Vitest + jsdom + jest-dom setup is wired correctly.
 * Real tests live next to each theory module.
 */
describe('test infrastructure', () => {
  it('runs basic assertions', () => {
    expect(1 + 1).toBe(2)
  })

  it('has a DOM environment (jsdom)', () => {
    const el = document.createElement('div')
    el.textContent = 'hello'
    document.body.appendChild(el)
    // jest-dom matcher (from @testing-library/jest-dom)
    expect(el).toHaveTextContent('hello')
  })
})
