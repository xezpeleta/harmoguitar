/**
 * vexflow.ts — Pure helpers bridging the theory engine's note names to
 * VexFlow's staff-notation key strings.
 *
 * VexFlow keys look like `c/4`, `eb/4`, `f#/4`, `bbb/4` (letter + accidental +
 * `/` + octave). Our `NoteName` type already matches that letter+accidental
 * shape, so the conversion is mostly a case fold — kept here as an explicit,
 * unit-tested boundary so the Staff component stays declarative.
 *
 * Pure & UI-agnostic. Reference: PLAN.md Task 3.1.
 */
import { type NoteName, letterIndexOf } from '$lib/theory/notes'

/** A note paired with the octave it should be drawn at. */
export interface NotedPitch {
  note: NoteName
  octave: number
}

/**
 * Convert a note name + octave to a VexFlow key string.
 * e.g. ('C#', 4) → 'c#/4', ('Bb', 3) → 'bb/4', ('Bbb', 4) → 'bbb/4'.
 */
export function noteToVexKey(note: NoteName, octave: number): string {
  return `${note.toLowerCase()}/${octave}`
}

/**
 * Assign ascending octaves to a list of notes, bumping the octave whenever the
 * letter wraps around (so a scale or an extended chord climbs the staff rather
 * than collapsing into one octave). e.g. C D E F G A B C → octaves 4 4 4 4 4 4 4 5.
 */
export function assignAscendingOctaves(
  notes: readonly NoteName[],
  startOctave = 4,
): NotedPitch[] {
  let octave = startOctave
  let prevLetter = -1
  const out: NotedPitch[] = []
  for (const note of notes) {
    const li = letterIndexOf(note)
    if (prevLetter >= 0 && li <= prevLetter) octave += 1
    out.push({ note, octave })
    prevLetter = li
  }
  return out
}

/** VexFlow key strings for a list of notes drawn in ascending octaves. */
export function toVexKeys(
  notes: readonly NoteName[],
  startOctave = 4,
): string[] {
  return assignAscendingOctaves(notes, startOctave).map(({ note, octave }) =>
    noteToVexKey(note, octave),
  )
}
