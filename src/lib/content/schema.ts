/**
 * schema.ts — Lesson data schema & types.
 *
 * Lessons are authored as structured data (plain TypeScript objects), not as
 * free-form prose. This makes them editable without touching component code,
 * type-checkable, and renderable by the generic `LessonView` component.
 *
 * A lesson is an ordered list of `Block`s. A `Block` is one of:
 *   - heading      (section sub-heading inside a lesson)
 *   - text         (a paragraph or short markdown snippet)
 *   - callout      (highlighted tip / note / warning box)
 *   - table        (rows of strings — used for interval/chord/scale tables)
 *   - widget       (embeds interactive widgets bound to the shared store)
 *   - piano        (interactive piano keyboard — standalone or store-driven)
 *
 * The widget block specifies an *initial* store selection (root, chord/scale
 * type, key…) and which widgets to show. The reader applies the selection to
 * the shared store so every embedded widget stays synchronized.
 *
 * Reference: PLAN.md Task 4.1, PROJECT.md ("lesson authoring: structured data
 * files rendered by generic component").
 */
import type { NoteName } from '$lib/theory/notes'
import type { ChordType } from '$lib/theory/chords'
import type { ScaleType } from '$lib/theory/scales'

/** Which interactive widgets can be embedded in a lesson. */
export type WidgetKind =
  | 'fretboard'
  | 'staff'
  | 'interval-wheel'
  | 'circle-of-fifths'

/**
 * Initial store state to apply when a widget block renders. Only the fields
 * you specify are changed; others keep their current value. This lets a lesson
 * say "show C major on the fretboard" without re-specifying tuning, solfège,
 * etc.
 */
export interface WidgetSelection {
  /** Root note for the chord/scale being explored. */
  root?: NoteName
  /** Explore this chord type (sets mode to 'chord'). */
  chordType?: ChordType
  /** Explore this scale type (sets mode to 'scale'). */
  scaleType?: ScaleType
  /** Tonal centre for diatonic views (circle of fifths). */
  key?: NoteName
  /** Major or minor key context for diatonic chords. */
  keyScaleType?: ScaleType
  /** Override the fretboard length for this widget (default 12). */
  fretCount?: number
  /**
   * Clear any active chord/scale, entering free-exploration mode. Use when a
   * widget should start with no preset (e.g. "click frets freely").
   */
  clear?: boolean
}

/**
 * Optional override for a widget block's Play button. By default the button
 * plays the current store selection (chord/scale). When `play` is set, it
 * plays this instead — e.g. demo every interval from a root rather than the
 * scale itself.
 */
export type WidgetPlay =
  | {
      /** Play every interval from the root, 0..maxSemitones semitones. */
      kind: 'intervals-from-root'
      root: NoteName
      /** Highest semitone offset to play (default 12 = up to the octave). */
      maxSemitones?: number
    }

/** A callout variant, controlling its colour/affordance. */
export type CalloutVariant = 'tip' | 'note' | 'warning'

/** The building blocks of a lesson body, in display order. */
export type Block =
  | {
      kind: 'heading'
      /** Heading level inside the lesson (2 = section, 3 = sub-section). */
      level: 2 | 3
      text: string
    }
  | {
      kind: 'text'
      /** Inline markdown: **bold**, *italic*, `code`, and inline links. */
      markdown: string
    }
  | {
      kind: 'callout'
      variant: CalloutVariant
      markdown: string
    }
  | {
      kind: 'list'
      /** `true` = ordered (1. 2. 3.), `false` = bullet. */
      ordered?: boolean
      /** Each item is inline markdown. */
      items: string[]
    }
  | {
      kind: 'table'
      headers: string[]
      rows: string[][]
      /**
       * If given, renders a Play button at the end of every row. Each row
       * plays `root` followed by the note `semitones[i]` above it, so the
       * listener hears that interval against the root. Aligned with `rows`
       * by index.
       */
      playable?: {
        root: NoteName
        semitones: number[]
      }
    }
  | {
      kind: 'widget'
      /** Initial selection applied to the shared store on render. */
      selection: WidgetSelection
      /** Which widgets to render, left-to-right / stacked on mobile. */
      widgets: WidgetKind[]
      /** Optional caption beneath the widget cluster. */
      caption?: string
      /**
       * Overrides the Play button's default behaviour (which plays the
       * current store selection). When set, the button plays this instead.
       */
      play?: WidgetPlay
    }
  | {
      kind: 'piano'
      /**
       * Notes to highlight. Given → standalone reference (shows exactly
       * these notes, e.g. all 12 pitch classes). Omitted → store-driven
       * (mirrors the current chord/scale selection).
       */
      notes?: NoteName[]
      /** Number of octaves to render (default 2). */
      octaves?: number
      /** Optional caption beneath the keyboard. */
      caption?: string
    }

/** A single lesson in the learning path. */
export interface Lesson {
  /** Stable identifier (e.g. "notes-fretboard"). */
  id: string
  /** URL-safe slug used in the hash route (#/lessons/:slug). */
  slug: string
  /** Display title. */
  title: string
  /** One-sentence summary shown in the lesson list. */
  summary: string
  /** Estimated minutes to read + play through. */
  minutes: number
  /** The lesson body, rendered top-to-bottom. */
  blocks: Block[]
}
