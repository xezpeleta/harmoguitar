/**
 * progress.svelte.ts — Reactive localStorage lesson-progress tracking.
 *
 * Records which lessons a user has marked complete. Degrades gracefully: if
 * localStorage is unavailable or blocked (private mode, etc.), every call
 * silently no-ops / returns empty — the app still works, just without
 * persistence.
 *
 * Implemented as a Svelte 5 runes module with a reactive `$state` array, so
 * the UI can derive completion state reactively:
 *   `const done = $derived(isComplete(id))`
 * updates the instant a lesson is marked (no manual `$effect` syncing).
 *
 * Reference: PLAN.md Task 4.5, PROJECT.md ("progress tracking: localStorage,
 * optional, degrades gracefully").
 */

const STORAGE_KEY = 'harmoguitar:progress'

/** True if localStorage is accessible (it can throw in some browsers/modes). */
function storageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    const test = '__hg_test__'
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

const hasStorage = storageAvailable()

/** Read the list of completed lesson IDs from localStorage. */
function readList(): string[] {
  if (!hasStorage) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

/** Persist the list to localStorage. */
function writeList(list: string[]): void {
  if (!hasStorage) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    /* quota / disabled — ignore */
  }
}

/**
 * The reactive list of completed lesson IDs. `$state` makes arrays deeply
 * reactive, so any `$derived` reading `isComplete()` / `completedCount()`
 * re-runs the instant this list changes.
 */
export const completed = $state<string[]>(readList())

/** Mark a lesson (by ID) as complete. */
export function markComplete(lessonId: string): void {
  if (!completed.includes(lessonId)) {
    completed.push(lessonId)
    writeList(completed)
  }
}

/** Remove the "complete" mark from a lesson (toggle off). */
export function markIncomplete(lessonId: string): void {
  const i = completed.indexOf(lessonId)
  if (i >= 0) {
    completed.splice(i, 1)
    writeList(completed)
  }
}

/** True if the lesson is marked complete. Reactive when read in `$derived`. */
export function isComplete(lessonId: string): boolean {
  return completed.includes(lessonId)
}

/** The number of completed lessons. Reactive when read in `$derived`. */
export function completedCount(): number {
  return completed.length
}

/** Clear all progress. */
export function resetProgress(): void {
  completed.length = 0
  writeList(completed)
}
