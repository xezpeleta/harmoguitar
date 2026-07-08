/**
 * scales.ts — Scale definitions & note generation.
 *
 * Every scale is a list of {degree, semitones} steps fed to the shared
 * spelling engine, so enharmonic spelling is always correct (e.g. F major →
 * Bb, A harmonic minor → G#). Pentatonic/blues scales use explicit degree
 * formulas so they inherit correct letter spelling too.
 *
 * Pure & UI-agnostic. Reference: RESEARCH.md §3 (scales), §4 (modes).
 */
import {
  type FormulaStep,
  type NoteName,
  spellFromFormula,
} from './notes'
import { interval, type Interval } from './intervals'

export type ScaleType =
  | 'major'
  | 'natural-minor'
  | 'harmonic-minor'
  | 'melodic-minor'
  | 'major-pentatonic'
  | 'minor-pentatonic'
  | 'blues'
  | 'ionian'
  | 'dorian'
  | 'phrygian'
  | 'lydian'
  | 'mixolydian'
  | 'aeolian'
  | 'locrian'

/** The {degree, semitones} formula for each scale type. */
export const SCALE_FORMULAS: Record<ScaleType, readonly FormulaStep[]> = {
  major: f(1, [0, 2, 4, 5, 7, 9, 11]),
  'natural-minor': f(1, [0, 2, 3, 5, 7, 8, 10]),
  'harmonic-minor': f(1, [0, 2, 3, 5, 7, 8, 11]),
  'melodic-minor': f(1, [0, 2, 3, 5, 7, 9, 11]),
  'major-pentatonic': [
    { degree: 1, semitones: 0 },
    { degree: 2, semitones: 2 },
    { degree: 3, semitones: 4 },
    { degree: 5, semitones: 7 },
    { degree: 6, semitones: 9 },
  ],
  'minor-pentatonic': [
    { degree: 1, semitones: 0 },
    { degree: 3, semitones: 3 },
    { degree: 4, semitones: 5 },
    { degree: 5, semitones: 7 },
    { degree: 7, semitones: 10 },
  ],
  blues: [
    { degree: 1, semitones: 0 },
    { degree: 3, semitones: 3 },
    { degree: 4, semitones: 5 },
    { degree: 5, semitones: 6 },
    { degree: 5, semitones: 7 },
    { degree: 7, semitones: 10 },
  ],
  // Modes of the major scale
  ionian: f(1, [0, 2, 4, 5, 7, 9, 11]),
  dorian: f(1, [0, 2, 3, 5, 7, 9, 10]),
  phrygian: f(1, [0, 1, 3, 5, 7, 8, 10]),
  lydian: f(1, [0, 2, 4, 6, 7, 9, 11]),
  mixolydian: f(1, [0, 2, 4, 5, 7, 9, 10]),
  aeolian: f(1, [0, 2, 3, 5, 7, 8, 10]),
  locrian: f(1, [0, 1, 3, 5, 6, 8, 10]),
}

/** Helper: build consecutive-degree steps (1..n) from a semitone list. */
function f(startDegree: number, semitones: number[]): FormulaStep[] {
  return semitones.map((s, i) => ({
    degree: startDegree + i,
    semitones: s,
  }))
}

/** Human-readable names for each scale type. */
export const SCALE_NAMES: Record<ScaleType, string> = {
  major: 'Major (Ionian)',
  'natural-minor': 'Natural Minor (Aeolian)',
  'harmonic-minor': 'Harmonic Minor',
  'melodic-minor': 'Melodic Minor',
  'major-pentatonic': 'Major Pentatonic',
  'minor-pentatonic': 'Minor Pentatonic',
  blues: 'Blues',
  ionian: 'Ionian',
  dorian: 'Dorian',
  phrygian: 'Phrygian',
  lydian: 'Lydian',
  mixolydian: 'Mixolydian',
  aeolian: 'Aeolian',
  locrian: 'Locrian',
}

/** Generate the notes of a scale from a root and scale type. */
export function scaleNotes(root: NoteName, type: ScaleType): NoteName[] {
  return spellFromFormula(root, SCALE_FORMULAS[type])
}

/** The interval symbols of a scale relative to its root, e.g. major → ["1","2","3","4","5","6","7"]. */
export function scaleIntervals(type: ScaleType): string[] {
  return SCALE_FORMULAS[type].map(({ degree, semitones }) =>
    interval(degree, semitones).symbol,
  )
}

/** The full Interval objects of a scale relative to its root. */
export function scaleIntervalObjects(type: ScaleType): Interval[] {
  return SCALE_FORMULAS[type].map(({ degree, semitones }) =>
    interval(degree, semitones),
  )
}

/** The 7 modes of the major scale, in degree order. */
export const MODE_DEGREES: readonly { degree: number; type: ScaleType; name: string }[] = [
  { degree: 1, type: 'ionian', name: 'Ionian' },
  { degree: 2, type: 'dorian', name: 'Dorian' },
  { degree: 3, type: 'phrygian', name: 'Phrygian' },
  { degree: 4, type: 'lydian', name: 'Lydian' },
  { degree: 5, type: 'mixolydian', name: 'Mixolydian' },
  { degree: 6, type: 'aeolian', name: 'Aeolian' },
  { degree: 7, type: 'locrian', name: 'Locrian' },
]

/**
 * The mode built on a given degree of a parent major scale.
 * e.g. modeOf('C', 2) → { type: 'dorian', root: 'D', name: 'Dorian' }.
 */
export function modeOf(
  parentKey: NoteName,
  degree: number,
): { type: ScaleType; root: NoteName; name: string } {
  const notes = scaleNotes(parentKey, 'major')
  const idx = ((degree - 1) % 7 + 7) % 7
  const entry = MODE_DEGREES[idx]
  if (!entry) throw new Error(`modeOf: invalid degree ${degree}`)
  return {
    type: entry.type,
    root: notes[idx]!,
    name: entry.name,
  }
}

/** All 7 modes of a parent major key, with their roots. */
export function modesOf(
  parentKey: NoteName,
): { type: ScaleType; root: NoteName; name: string }[] {
  return MODE_DEGREES.map((_, i) => modeOf(parentKey, i + 1))
}
