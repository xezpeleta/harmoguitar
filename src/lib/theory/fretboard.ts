/**
 * fretboard.ts — Map notes to fret positions for a given tuning.
 *
 * Standard guitar tuning is E-A-D-G-B-E (low to high), with a perfect-4th
 * interval between adjacent strings except the major-3rd "kink" between G and B.
 * String numbering follows convention: string 6 = low E (thickest), string 1 =
 * high E (thinnest).
 *
 * Pure & UI-agnostic. Reference: RESEARCH.md §1.
 */
import { type NoteName, type PitchClass, toPitchClass } from './notes'
import { noteToMidi, type NoteWithOctave, midiToNote } from './midi'

export interface Tuning {
  name: string
  /** Open-string pitches, low (string 6) to high (string 1). */
  strings: NoteWithOctave[]
}

/** A single fret position on the fretboard. */
export interface FretPosition {
  /** String number 6 (low E) … 1 (high E). */
  stringNumber: number
  /** Index into the low-to-high string array (0 = lowest string). */
  stringIndex: number
  /** Fret number (0 = open string). */
  fret: number
  /** Note name (sharps by default; use Fretboard component for display prefs). */
  note: NoteName
  /** Pitch class 0–11. */
  pitchClass: PitchClass
  /** Scientific octave. */
  octave: number
  /** MIDI note number. */
  midi: number
}

/** Standard tuning E2 A2 D3 G3 B3 E4 (low → high). */
export const STANDARD_TUNING: Tuning = {
  name: 'Standard (EADGBE)',
  strings: [
    { note: 'E', octave: 2 }, // string 6
    { note: 'A', octave: 2 }, // string 5
    { note: 'D', octave: 3 }, // string 4
    { note: 'G', octave: 3 }, // string 3
    { note: 'B', octave: 3 }, // string 2
    { note: 'E', octave: 4 }, // string 1
  ],
}

/** A few common alternate tunings. */
export const TUNINGS: Record<string, Tuning> = {
  standard: STANDARD_TUNING,
  'drop-d': {
    name: 'Drop D',
    strings: [
      { note: 'D', octave: 2 },
      { note: 'A', octave: 2 },
      { note: 'D', octave: 3 },
      { note: 'G', octave: 3 },
      { note: 'B', octave: 3 },
      { note: 'E', octave: 4 },
    ],
  },
  dadgad: {
    name: 'DADGAD',
    strings: [
      { note: 'D', octave: 2 },
      { note: 'A', octave: 2 },
      { note: 'D', octave: 3 },
      { note: 'G', octave: 3 },
      { note: 'A', octave: 3 },
      { note: 'D', octave: 4 },
    ],
  },
  'open-g': {
    name: 'Open G',
    strings: [
      { note: 'D', octave: 2 },
      { note: 'G', octave: 2 },
      { note: 'D', octave: 3 },
      { note: 'G', octave: 3 },
      { note: 'B', octave: 3 },
      { note: 'D', octave: 4 },
    ],
  },
}

/** Default fret count for the fretboard component. */
export const DEFAULT_FRET_COUNT = 15

/**
 * Build the full fretboard matrix for a tuning. Returns an array indexed
 * low-to-high (string 6 first), each a list of FretPosition for frets 0..fretCount.
 */
export function buildFretboard(
  tuning: Tuning = STANDARD_TUNING,
  fretCount: number = DEFAULT_FRET_COUNT,
): FretPosition[][] {
  const stringCount = tuning.strings.length
  return tuning.strings.map((open, stringIndex) => {
    const stringNumber = stringCount - stringIndex // low string = 6
    const openMidi = noteToMidi(open.note, open.octave)
    const positions: FretPosition[] = []
    for (let fret = 0; fret <= fretCount; fret++) {
      const midi = openMidi + fret
      const { note, octave } = midiToNote(midi, false)
      positions.push({
        stringNumber,
        stringIndex,
        fret,
        note,
        pitchClass: toPitchClass(note),
        octave,
        midi,
      })
    }
    return positions
  })
}

/** All fret positions matching a given note (by pitch class), anywhere on the board. */
export function findPositions(
  note: NoteName,
  tuning: Tuning = STANDARD_TUNING,
  fretCount: number = DEFAULT_FRET_COUNT,
): FretPosition[] {
  const pc = toPitchClass(note)
  const board = buildFretboard(tuning, fretCount)
  return board.flat().filter((p) => p.pitchClass === pc)
}

/** True for open strings and the octave fret (fret 12, 24, …). */
export function isOctaveMarker(fret: number): boolean {
  return fret === 0 || fret % 12 === 0
}

/** Frets that typically get an inlay dot on a standard guitar neck. */
export const INLAY_FRETS: readonly number[] = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
