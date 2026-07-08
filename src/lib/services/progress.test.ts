/**
 * progress.test.ts — Tests for the reactive lesson-progress service.
 *
 * Uses a real localStorage (via happy-dom in the test environment) and clears
 * it between tests. Verifies the graceful-degradation contract and reactive
 * read functions.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  markComplete,
  markIncomplete,
  isComplete,
  completedCount,
  resetProgress,
  completed,
} from '$lib/services/progress.svelte'

describe('progress service', () => {
  beforeEach(() => {
    localStorage.clear()
    resetProgress()
  })

  it('starts empty', () => {
    expect(completedCount()).toBe(0)
    expect(isComplete('x')).toBe(false)
  })

  it('marks a lesson complete', () => {
    markComplete('intervals')
    expect(isComplete('intervals')).toBe(true)
    expect(completedCount()).toBe(1)
  })

  it('is idempotent (no duplicate IDs)', () => {
    markComplete('intervals')
    markComplete('intervals')
    expect(completedCount()).toBe(1)
  })

  it('marks a lesson incomplete (toggle off)', () => {
    markComplete('intervals')
    markIncomplete('intervals')
    expect(isComplete('intervals')).toBe(false)
    expect(completedCount()).toBe(0)
  })

  it('markIncomplete on an unmarked lesson is a no-op', () => {
    markIncomplete('intervals')
    expect(completedCount()).toBe(0)
  })

  it('resetProgress clears everything', () => {
    markComplete('a')
    markComplete('b')
    resetProgress()
    expect(completedCount()).toBe(0)
    expect(isComplete('a')).toBe(false)
  })

  it('persists to localStorage under the expected key', () => {
    markComplete('intervals')
    const raw = localStorage.getItem('harmoguitar:progress')
    expect(raw).not.toBeNull()
    expect(JSON.parse(raw!)).toContain('intervals')
  })

  it('reactive `completed` array reflects mutations', () => {
    expect(completed.length).toBe(0)
    markComplete('triads')
    expect(completed).toContain('triads')
    markIncomplete('triads')
    expect(completed).not.toContain('triads')
  })
})
