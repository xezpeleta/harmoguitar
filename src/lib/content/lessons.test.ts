/**
 * lessons.test.ts — Integrity tests for the v1 lesson content.
 *
 * Validates the structured-data curriculum: every lesson has a unique id and
 * slug, blocks are well-formed, widget selections reference valid types, and
 * the prev/next/lookup helpers behave.
 */
import { describe, it, expect } from 'vitest'
import { LESSONS, lessonBySlug, prevLesson, nextLesson } from '$lib/content/lessons'
import type { WidgetKind } from '$lib/content/schema'

const VALID_WIDGETS: WidgetKind[] = [
  'fretboard',
  'staff',
  'interval-wheel',
  'circle-of-fifths',
  'piano',
]

describe('lesson curriculum', () => {
  it('has 35 lessons', () => {
    expect(LESSONS.length).toBe(35)
  })

  it('every lesson has a non-empty id, slug, title, summary', () => {
    for (const l of LESSONS) {
      expect(l.id.length).toBeGreaterThan(0)
      expect(l.slug.length).toBeGreaterThan(0)
      expect(l.title.length).toBeGreaterThan(0)
      expect(l.summary.length).toBeGreaterThan(0)
      expect(l.minutes).toBeGreaterThan(0)
      expect(l.blocks.length).toBeGreaterThan(0)
    }
  })

  it('ids are unique', () => {
    const ids = LESSONS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('slugs are unique', () => {
    const slugs = LESSONS.map((l) => l.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('slugs are URL-safe', () => {
    for (const l of LESSONS) {
      expect(l.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it('every widget references a valid WidgetKind', () => {
    for (const l of LESSONS) {
      for (const b of l.blocks) {
        if (b.kind === 'widget') {
          for (const w of b.widgets) {
            expect(VALID_WIDGETS).toContain(w)
          }
        }
      }
    }
  })

  it('every widget block has at least one widget', () => {
    for (const l of LESSONS) {
      for (const b of l.blocks) {
        if (b.kind === 'widget') {
          expect(b.widgets.length).toBeGreaterThan(0)
        }
      }
    }
  })

  it('lessonBySlug finds each lesson', () => {
    for (const l of LESSONS) {
      expect(lessonBySlug(l.slug)?.id).toBe(l.id)
    }
  })

  it('lessonBySlug returns undefined for unknown slugs', () => {
    expect(lessonBySlug('does-not-exist')).toBeUndefined()
  })

  it('prevLesson is undefined for the first lesson only', () => {
    expect(prevLesson(LESSONS[0]!)).toBeUndefined()
    for (let i = 1; i < LESSONS.length; i++) {
      expect(prevLesson(LESSONS[i]!)?.id).toBe(LESSONS[i - 1]!.id)
    }
  })

  it('nextLesson is undefined for the last lesson only', () => {
    expect(nextLesson(LESSONS[LESSONS.length - 1]!)).toBeUndefined()
    for (let i = 0; i < LESSONS.length - 1; i++) {
      expect(nextLesson(LESSONS[i]!)?.id).toBe(LESSONS[i + 1]!.id)
    }
  })

  it('total estimated minutes is reasonable (90–440)', () => {
    const total = LESSONS.reduce((s, l) => s + l.minutes, 0)
    expect(total).toBeGreaterThanOrEqual(90)
    expect(total).toBeLessThanOrEqual(440)
  })
})
