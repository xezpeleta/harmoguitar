/**
 * midi.ts — Note ↔ MIDI number conversions.
 *
 * MIDI numbers: C-1 = 0, so middle C (C4) = 60, low E on a guitar (E2) = 40.
 * Pure & UI-agnostic.
 */
import { type NoteName, toPitchClass, SHARPS, FLATS, parseNote } from './notes'

/** A note name with its scientific octave, e.g. { note: 'E', octave: 2 }. */
export interface NoteWithOctave {
  note: NoteName
  octave: number
}

/** Convert a note + scientific octave to a MIDI number (C4 = 60). */
export function noteToMidi(note: NoteName, octave: number): number {
  return (octave + 1) * 12 + toPitchClass(note)
}

/** Convert a MIDI number to a note name + octave, preferring sharps or flats. */
export function midiToNote(midi: number, preferFlats = false): NoteWithOctave {
  const pc = ((midi % 12) + 12) % 12
  const octave = Math.floor(midi / 12) - 1
  return {
    note: preferFlats ? FLATS[pc]! : SHARPS[pc]!,
    octave,
  }
}

/** Parse a note string like "E2" or "Bb3" into { note, octave }. */
export function parseNoteWithOctave(s: string): NoteWithOctave {
  const trimmed = s.trim()
  // The octave is the trailing integer; the rest is the note name.
  const match = /^([A-Ga-g][#b♯♭]{0,2})(-?\d+)$/.exec(trimmed)
  if (!match) {
    throw new Error(`parseNoteWithOctave: invalid "${s}"`)
  }
  const note = match[1]!
  const octave = Number.parseInt(match[2]!, 10)
  // Validate the note name itself.
  parseNote(note)
  return { note, octave }
}

/** Parse "E2" and return its MIDI number. */
export function noteWithOctaveToMidi(s: string): number {
  const { note, octave } = parseNoteWithOctave(s)
  return noteToMidi(note, octave)
}

/** Format a note + octave as a string, e.g. "E2". */
export function formatNoteWithOctave(note: NoteName, octave: number): string {
  return `${note}${octave}`
}
