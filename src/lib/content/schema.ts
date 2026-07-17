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
  | 'piano'

/**
 * A specific fret position to mark on the fretboard — used to diagram an exact
 * voicing/grip (e.g. the four notes of an A13 shape) rather than lighting up
 * every chord tone across the neck. String numbers follow guitar convention:
 * 6 = low E … 1 = high E; fret 0 = open.
 */
export interface VoicingPosition {
  /** String number 6 (low E) … 1 (high E). */
  string: number
  /** Fret number (0 = open). */
  fret: number
  /** Optional label override (e.g. a finger number or interval). */
  label?: string
}

/**
 * Optional +/− stepper controls for a widget block. Each enabled control
 * renders a small button group beside the Play button.
 */
export interface WidgetSteppers {
  /** Cycle the root note chromatically (A → A♯ → B → …), keeping any type. */
  root?: boolean
  /** Shift the fretboard's visible window one fret up (▶) or down (◀). */
  position?: boolean
}

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
   * widget should start with no preset (e.g. "click frets freely"). A cleared
   * widget follows the shared store live, so clicks on the piano/fretboard
   * highlight everywhere in real time.
   */
  clear?: boolean
  /**
   * Highlight all 12 pitch classes (a fully-labeled chromatic reference). Use
   * for "every note on these strings" diagrams. Incompatible with chord/scale.
   */
  showAllNotes?: boolean
  /**
   * Highlight just the root note (every occurrence on the neck). Pair with a
   * root stepper to cycle through note names and watch the highlight move —
   * the "find any note" explorer.
   */
  followRoot?: boolean
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
  | {
      /** Play each open string in turn, highlighting one string at a time. */
      kind: 'open-strings'
      /** Playback order. Default 'low-to-high' (string 6 → 1). */
      order?: 'low-to-high' | 'high-to-low'
      /** Seconds between successive strings (default 0.55). */
      stagger?: number
    }
  | {
      /** Play a sequence of chords (a progression) in time. */
      kind: 'progression'
      /**
       * Chord symbols to play in order, e.g. ['Dm7','G7','Cmaj7']. Each is
       * parsed with the theory engine's `parseChordSymbol`, so any symbol the
       * Builder accepts works (Cmaj7, G7, Am7b5, Bb13, F#7b9, …).
       */
      chords: string[]
      /** Tempo in BPM (default 100). */
      tempo?: number
      /** Beats per chord (default 2). */
      beatsPerChord?: number
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
      /**
       * If given, renders a Play button after each item. Each entry plays the
       * listed intervals (semitone offsets from root) in sequence, so the
       * listener can A/B-compare them (e.g. major 3rd then minor 3rd).
       * Aligned with `items` by index.
       */
      playable?: { root: NoteName; offsets: number[][] }
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
       * Specific fret positions to mark as an exact voicing/grip on the
       * fretboard. When set, the fretboard diagrams just these positions
       * (instead of lighting every chord tone across the neck).
       */
      voicing?: VoicingPosition[]
      /**
       * Render only these string numbers (6 = low E … 1 = high E). When
       * omitted, all strings render. Use to focus a diagram on, say, the
       * root strings (6 & 5) for a "finding any note" reference.
       */
      strings?: number[]
      /**
       * Optional +/− controls rendered beside the Play button. `root` cycles
       * the root note chromatically (keeping any chord/scale type); `position`
       * shifts the fretboard's visible window up/down the neck.
       */
      steppers?: WidgetSteppers
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
