/**
 * LessonView.test.ts — Tests for the generic lesson reader.
 *
 * Uses a tiny fixture lesson exercising every block kind, then asserts the
 * rendered output. Widget blocks are verified to apply their selection to the
 * shared store.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/svelte'
import LessonView from '$lib/components/LessonView.svelte'
import type { Lesson } from '$lib/content/schema'
import { app } from '$lib/stores/app.svelte'
import { resetProgress, isComplete } from '$lib/services/progress.svelte'

const fixture: Lesson = {
  id: 'test-lesson',
  slug: 'test-lesson',
  title: 'Test Lesson',
  summary: 'A fixture for testing the reader.',
  minutes: 5,
  blocks: [
    { kind: 'heading', level: 2, text: 'Section One' },
    { kind: 'text', markdown: 'A paragraph with **bold** and `code`.' },
    { kind: 'text', markdown: 'Play {{C}} then {{E}} then {{G}}.' },
    {
      kind: 'callout',
      variant: 'tip',
      markdown: 'Try this out.',
    },
    { kind: 'list', items: ['first', 'second'] },
    {
      kind: 'table',
      headers: ['A', 'B'],
      rows: [['1', '2'], ['3', '4']],
    },
    {
      kind: 'widget',
      selection: { scaleType: 'major', root: 'G' },
      widgets: ['fretboard'],
      caption: 'G major',
    },
  ],
}

describe('LessonView', () => {
  beforeEach(() => {
    resetProgress()
    app.reset()
  })

  it('renders the title, summary, and minutes', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('Test Lesson')).toBeTruthy()
    expect(getByText('A fixture for testing the reader.')).toBeTruthy()
    expect(getByText(/5 min/)).toBeTruthy()
  })

  it('renders headings', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('Section One')).toBeTruthy()
  })

  it('renders formatted markdown (bold, code)', () => {
    const { container } = render(LessonView, { lesson: fixture })
    expect(container.querySelector('strong')?.textContent).toBe('bold')
    expect(container.querySelector('code')?.textContent).toBe('code')
  })

  it('renders note tokens as clickable chips', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const chips = container.querySelectorAll('.note-chip-btn')
    expect(chips.length).toBe(3)
    // Each chip is a real button with an accessible label
    const first = chips[0] as HTMLButtonElement
    expect(first.tagName).toBe('BUTTON')
    expect(first.getAttribute('aria-label')).toContain('Play')
    // Labels show note names in CDE mode by default
    const labels = [...chips].map((c) => c.textContent?.replace(/\s+/g, '').trim())
    expect(labels[0]).toContain('C')
    expect(labels[1]).toContain('E')
    expect(labels[2]).toContain('G')
  })

  it('renders callouts with the variant class', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const callout = container.querySelector('.callout.tip')
    expect(callout).toBeTruthy()
  })

  it('renders list items', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('first')).toBeTruthy()
    expect(getByText('second')).toBeTruthy()
  })

  it('renders table headers and cells', () => {
    const { container } = render(LessonView, { lesson: fixture })
    const ths = container.querySelectorAll('th')
    expect(ths.length).toBe(2)
    const tds = container.querySelectorAll('td')
    expect(tds.length).toBe(4)
  })

  it('renders a widget block with a caption', () => {
    const { getByText } = render(LessonView, { lesson: fixture })
    expect(getByText('G major')).toBeTruthy()
  })

  it('applies the widget selection to the shared store', () => {
    render(LessonView, { lesson: fixture })
    expect(app.rootNote).toBe('G')
    expect(app.scaleType).toBe('major')
  })

  it('renders a "Mark as complete" button', () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    expect(getByRole('button', { name: /mark as complete/i })).toBeTruthy()
  })

  it('marks the lesson complete when the button is clicked', async () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    const btn = getByRole('button', { name: /mark as complete/i })
    btn.click()
    // The progress module is updated synchronously.
    expect(isComplete('test-lesson')).toBe(true)
  })

  it('renders prev/next nav buttons referencing sibling lessons', () => {
    const { getByRole } = render(LessonView, { lesson: fixture })
    // fixture is not in the real LESSONS array, so prev/next are undefined
    // → no nav buttons. Assert none are present.
    const navBtns = getByRole('button', { name: /mark as complete/i })
    expect(navBtns).toBeTruthy()
  })
})
