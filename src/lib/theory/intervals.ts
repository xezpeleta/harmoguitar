/**
 * intervals.ts — Interval naming & transposition.
 *
 * An interval is the distance between two notes, measured in semitones but
 * *named* by combining a quality (perfect/major/minor/augmented/diminished)
 * with a generic number derived from the letter names. This is why C→F# is an
 * augmented 4th while C→Gb is a diminished 5th — same 6 semitones, different
 * spelling.
 *
 * Pure & UI-agnostic. Reference: RESEARCH.md §2.
 */
import {
  type NoteName,
  letterIndexOf,
  mod,
  parseNote,
  spellNote,
  toPitchClass,
} from './notes'

export type IntervalQuality = 'P' | 'M' | 'm' | 'A' | 'd'

export interface Interval {
  /** Full name, e.g. "P5", "M3", "m7", "A4", "d5". */
  name: string
  quality: IntervalQuality
  /** Generic interval number (1 = unison … 7 = seventh). */
  degree: number
  /** Semitone count (0–11 within an octave). */
  semitones: number
  /** Short symbol used in chord/scale formulas: "5", "3", "b7", "#4", "b5". */
  symbol: string
}

/** Generic intervals (1–7) that are "perfect" rather than major/minor. */
const PERFECT_DEGREES = new Set([1, 4, 5])

/** Semitone size of the perfect/major version of each generic interval 1–7. */
const EXPECTED_SEMITONES: Record<number, number> = {
  1: 0,
  2: 2,
  3: 4,
  4: 5,
  5: 7,
  6: 9,
  7: 11,
}

/** Reduce a (possibly compound) degree to its simple equivalent 1–7. */
function simpleDegreeOf(degree: number): number {
  return mod(degree - 1, 7) + 1
}

/** Number of octave wraps in a compound degree (0 for 1–7, 1 for 8–14, …). */
function octaveWrapsOf(degree: number): number {
  return Math.floor((degree - 1) / 7)
}

/** Expected semitone size of the perfect/major version of a (compound) degree. */
function expectedSemitones(degree: number): number {
  const simple = simpleDegreeOf(degree)
  const expected = EXPECTED_SEMITONES[simple]
  if (expected === undefined) {
    throw new Error(`expectedSemitones: invalid degree ${degree}`)
  }
  return expected + octaveWrapsOf(degree) * 12
}

/** Symbol prefix from an alteration (semitones away from perfect/major): '' , '#…', or 'b…'. */
function symbolFromAlteration(alteration: number): string {
  if (alteration === 0) return ''
  if (alteration > 0) return '#'.repeat(alteration)
  return 'b'.repeat(-alteration)
}

/** Derive the interval quality from a simple degree and an alteration. */
function qualityFromAlteration(
  simpleDegree: number,
  alteration: number,
): IntervalQuality {
  if (PERFECT_DEGREES.has(simpleDegree)) {
    if (alteration === 0) return 'P'
    if (alteration > 0) return 'A'
    return 'd'
  }
  // major/minor family
  if (alteration === 0) return 'M'
  if (alteration === -1) return 'm'
  if (alteration > 0) return 'A'
  return 'd' // alteration <= -2
}

/** Derive the interval quality from a (compound) degree and actual semitone count. */
export function qualityFor(
  degree: number,
  semitones: number,
): IntervalQuality {
  const simple = simpleDegreeOf(degree)
  const alteration = semitones - expectedSemitones(degree)
  return qualityFromAlteration(simple, alteration)
}

/** Build a full Interval object from a (possibly compound) degree and a semitone count. */
export function interval(degree: number, semitones: number): Interval {
  const simple = simpleDegreeOf(degree)
  const alteration = semitones - expectedSemitones(degree)
  const quality = qualityFromAlteration(simple, alteration)
  return {
    name: `${quality}${degree}`,
    quality,
    degree,
    semitones,
    symbol: `${symbolFromAlteration(alteration)}${degree}`,
  }
}

/**
 * The ascending interval from `a` to `b` (within one octave). Quality is
 * derived from the letter distance, so enharmonic spelling is respected:
 * intervalBetween('C','F#') → A4, intervalBetween('C','Gb') → d5.
 */
export function intervalBetween(a: NoteName, b: NoteName): Interval {
  const semitones = mod(toPitchClass(b) - toPitchClass(a), 12)
  const letterDistance = mod(
    letterIndexOf(b) - letterIndexOf(a),
    7,
  )
  const degree = letterDistance + 1
  return interval(degree, semitones)
}

/** Semitone distance from `a` up to `b` (0–11). */
export function semitonesBetween(a: NoteName, b: NoteName): number {
  return mod(toPitchClass(b) - toPitchClass(a), 12)
}

/** Parse an interval name like "m3", "P5", "A4" into an Interval. */
export function parseInterval(name: string): Interval {
  const match = /^([PMAmd])(\d+)$/.exec(name.trim())
  if (!match) {
    throw new Error(`parseInterval: invalid name "${name}"`)
  }
  const quality = match[1] as IntervalQuality
  const degree = Number.parseInt(match[2]!, 10)
  // Reduce compound intervals (9,11,13) to their simple equivalent for the
  // semitone lookup, then add octaves back.
  const simpleDegree = ((degree - 1) % 7) + 1
  const octaves = Math.floor((degree - 1) / 7)
  const expected = EXPECTED_SEMITONES[simpleDegree]
  if (expected === undefined) {
    throw new Error(`parseInterval: invalid degree ${degree}`)
  }
  let semitones = expected + octaves * 12
  if (PERFECT_DEGREES.has(simpleDegree)) {
    if (quality === 'A') semitones += 1
    else if (quality === 'd') semitones -= 1
  } else {
    if (quality === 'm') semitones -= 1
    else if (quality === 'A') semitones += 1
    else if (quality === 'd') semitones -= 2
  }
  return { ...interval(degree, semitones), name }
}

/** Semitones for an interval name. Shortcut for `parseInterval(name).semitones`. */
export function intervalSemitones(name: string): number {
  return parseInterval(name).semitones
}

/**
 * Transpose a note by an interval name, preserving correct enharmonic spelling
 * (e.g. transposeByInterval('C','m3') → 'Eb', not 'D#'). Uses the interval's
 * degree to pick the target letter.
 */
export function transposeByInterval(
  note: NoteName,
  name: string,
): NoteName {
  const iv = parseInterval(name)
  const simpleDegree = ((iv.degree - 1) % 7) + 1
  const { letterIndex, pitchClass } = parseNote(note)
  const targetLetter = letterIndex + (simpleDegree - 1)
  const targetPC = mod(pitchClass + iv.semitones, 12)
  return spellNote(targetLetter, targetPC)
}

/**
 * The 12 simple intervals indexed by semitone count (0–11), using the most
 * common spelling. Semitone 6 is the tritone, shown as both A4 and d5.
 * Matches the table in RESEARCH.md §2.
 */
export interface SimpleIntervalInfo {
  semitones: number
  name: string
  symbol: string
  character: string
}

export const SIMPLE_INTERVALS: readonly SimpleIntervalInfo[] = [
  { semitones: 0, name: 'Unison', symbol: '1', character: 'same note' },
  { semitones: 1, name: 'Minor 2nd', symbol: 'b2', character: 'tense, dissonant' },
  { semitones: 2, name: 'Major 2nd', symbol: '2', character: 'step' },
  { semitones: 3, name: 'Minor 3rd', symbol: 'b3', character: 'minor sound (sad)' },
  { semitones: 4, name: 'Major 3rd', symbol: '3', character: 'major sound (happy)' },
  { semitones: 5, name: 'Perfect 4th', symbol: '4', character: 'open, suspended' },
  { semitones: 6, name: 'Tritone', symbol: '#4/b5', character: 'dissonant, dominant tension' },
  { semitones: 7, name: 'Perfect 5th', symbol: '5', character: 'stable, power chord' },
  { semitones: 8, name: 'Minor 6th', symbol: 'b6', character: 'dark' },
  { semitones: 9, name: 'Major 6th', symbol: '6', character: 'bright' },
  { semitones: 10, name: 'Minor 7th', symbol: 'b7', character: 'bluesy, dominant' },
  { semitones: 11, name: 'Major 7th', symbol: '7', character: 'jazzy, major 7' },
]

/** Look up the common-name info for a semitone count (0–11). */
export function simpleInterval(semitones: number): SimpleIntervalInfo {
  return SIMPLE_INTERVALS[mod(semitones, 12)]!
}
