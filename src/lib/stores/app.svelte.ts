/**
 * app.svelte.ts — Shared application store (single source of truth).
 *
 * Every interactive widget (Fretboard, Staff, IntervalWheel, CircleOfFifths,
 * Builder) reads from and writes to this one store, so a selection made in one
 * place instantly updates every other view.
 *
 * Uses Svelte 5 runes in a `.svelte.ts` module. Import the singleton `app`;
 * read fields directly (do not destructure — that breaks reactivity).
 *
 * Reference: PLAN.md Task 2.1, PROJECT.md architecture ("shared store keeps
 * fretboard, staff, and D3 views synchronized to one source of truth").
 */
import { type NoteName, toPitchClass } from '$lib/theory/notes'
import { type ChordType, chordNotes } from '$lib/theory/chords'
import { type ScaleType, scaleNotes } from '$lib/theory/scales'
import { type Tuning, STANDARD_TUNING, DEFAULT_FRET_COUNT } from '$lib/theory/fretboard'

/** What the fretboard/staff are currently visualising. */
export type SelectionMode = 'chord' | 'scale' | 'free'

/** Default root for chord/scale exploration. */
export const DEFAULT_ROOT: NoteName = 'C'

class AppStore {
  // --- Core selection -------------------------------------------------------

  /** Root note of the chord/scale being explored (also the highlight "root"). */
  rootNote = $state<NoteName>(DEFAULT_ROOT)

  /** Active chord type, or null when not exploring a chord. */
  chordType = $state<ChordType | null>(null)

  /** Active scale type, or null when not exploring a scale. */
  scaleType = $state<ScaleType | null>(null)

  /** Manually-selected notes (free-exploration mode, no chord/scale chosen). */
  selectedNotes = $state<NoteName[]>([])

  // --- Key / diatonic context ----------------------------------------------

  /** Tonal centre for diatonic-harmony views (set by CircleOfFifths). */
  key = $state<NoteName>(DEFAULT_ROOT)

  /** Whether `key` is a major or minor key (drives diatonic chords). */
  keyScaleType = $state<ScaleType>('major')

  // --- Fretboard / display preferences -------------------------------------

  tuning = $state<Tuning>(STANDARD_TUNING)
  fretCount = $state<number>(DEFAULT_FRET_COUNT)

  /** Show fixed-Do solfège alongside note names. */
  showSolfege = $state<boolean>(false)

  /** Spell notes with flats instead of sharps where applicable. */
  preferFlats = $state<boolean>(false)

  // --- Playback -------------------------------------------------------------

  /** True while audio is actively sounding (for UI affordances). */
  isPlaying = $state<boolean>(false)

  /**
   * MIDI numbers currently sounding — a transient "ringing" set used to draw
   * a pulsing highlight on the exact keys/frets being played during a
   * sequence (e.g. a scale run or an open-string strum). Cleared when sound
   * stops. Driven by LessonView's playback timers, not the audio engine, so
   * the engine stays decoupled from the store.
   */
  soundingMidis = $state<Set<number>>(new Set())

  /** Replace the set of sounding MIDIs (the notes ringing right now). */
  setSounding(midis: number[]): void {
    this.soundingMidis = new Set(midis)
  }

  /** Clear all sounding highlights. */
  clearSounding(): void {
    this.soundingMidis = new Set()
  }

  // --- Derived --------------------------------------------------------------

  /** Which mode is driving the highlights. */
  get mode(): SelectionMode {
    if (this.chordType !== null) return 'chord'
    if (this.scaleType !== null) return 'scale'
    return 'free'
  }

  /** Notes of the active chord (empty if none). */
  currentChordNotes = $derived(
    this.chordType !== null ? chordNotes(this.rootNote, this.chordType) : [],
  )

  /** Notes of the active scale (empty if none). */
  currentScaleNotes = $derived(
    this.scaleType !== null ? scaleNotes(this.rootNote, this.scaleType) : [],
  )

  /**
   * The notes to highlight on the fretboard/staff. Chord takes priority, then
   * scale, then the manually-selected free-exploration set.
   */
  highlightNotes = $derived.by<NoteName[]>(() => {
    if (this.chordType !== null) return this.currentChordNotes
    if (this.scaleType !== null) return this.currentScaleNotes
    return this.selectedNotes
  })

  /** Pitch classes of the highlighted notes, for O(1) fret matching. */
  highlightPitchClasses = $derived(
    new Set(this.highlightNotes.map((n) => toPitchClass(n))),
  )

  /** Pitch class of the root (for distinct root markers). */
  rootPitchClass = $derived(toPitchClass(this.rootNote))

  /** True if a note (by pitch class) is among the highlighted notes. */
  isHighlighted(note: NoteName): boolean {
    return this.highlightPitchClasses.has(toPitchClass(note))
  }

  /** True if a note (by pitch class) is the root. */
  isRoot(note: NoteName): boolean {
    return toPitchClass(note) === this.rootPitchClass
  }

  // --- Mutations ------------------------------------------------------------

  /** Explore a chord: sets root + chord type, clears scale & free selection. */
  selectChord(root: NoteName, type: ChordType): void {
    this.rootNote = root
    this.chordType = type
    this.scaleType = null
    this.selectedNotes = []
  }

  /** Explore a scale: sets root + scale type, clears chord & free selection. */
  selectScale(root: NoteName, type: ScaleType): void {
    this.rootNote = root
    this.scaleType = type
    this.chordType = null
    this.selectedNotes = []
  }

  /** Change only the root (keeps the active chord/scale type). */
  setRoot(root: NoteName): void {
    this.rootNote = root
  }

  /**
   * Toggle a note in the free-exploration selection. Used when no chord/scale
   * is active — clicking frets builds up a set of notes to highlight.
   */
  toggleNote(note: NoteName): void {
    const pc = toPitchClass(note)
    const idx = this.selectedNotes.findIndex((n) => toPitchClass(n) === pc)
    if (idx >= 0) {
      this.selectedNotes = this.selectedNotes.filter((_, i) => i !== idx)
    } else {
      this.selectedNotes = [...this.selectedNotes, note]
    }
  }

  /** Clear the active chord/scale and the free selection. */
  clearSelection(): void {
    this.chordType = null
    this.scaleType = null
    this.selectedNotes = []
  }

  /** Set the diatonic key (and optionally major/minor). */
  setKey(key: NoteName, scaleType: ScaleType = this.keyScaleType): void {
    this.key = key
    this.keyScaleType = scaleType
  }

  /** Restore every field to its default. */
  reset(): void {
    this.rootNote = DEFAULT_ROOT
    this.chordType = null
    this.scaleType = null
    this.selectedNotes = []
    this.key = DEFAULT_ROOT
    this.keyScaleType = 'major'
    this.tuning = STANDARD_TUNING
    this.fretCount = DEFAULT_FRET_COUNT
    this.showSolfege = false
    this.preferFlats = false
    this.isPlaying = false
  }
}

/** The application-wide singleton store. Import this everywhere. */
export const app = new AppStore()
