/**
 * notes.ts — Core note primitives & enharmonic spelling.
 *
 * This is the foundation of the HarmoGuitar theory engine. It is **pure and
 * UI-agnostic**: no Svelte, no DOM, no audio. Every other theory module
 * (intervals, scales, chords, diatonic, fretboard) builds on these primitives.
 *
 * The key insight: to spell notes *correctly* (e.g. F major = F G A Bb C D E,
 * never F G A A# C D E) we assign one letter per scale degree and derive the
 * accidental. The same primitive spells scales and chords.
 *
 * Reference: RESEARCH.md §1 (notes), §2 (intervals/accidentals).
 */

/** A note name such as "C", "C#", "Db", "F##", "Bb". */
export type NoteName = string

/** A pitch class 0–11, where C = 0. */
export type PitchClass = number

/** A step in a scale or chord formula: scale degree (1–13) + semitone offset from root. */
export interface FormulaStep {
  /** Scale degree: 1, 2, 3, … 13 (odd for chords, 1–7 for heptatonic scales). */
  degree: number
  /** Semitones above the root. */
  semitones: number
}

/** The 7 natural-note letters, in circle-of-thirds / scale-degree order. */
export const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const
export type Letter = (typeof LETTERS)[number]

/** Pitch class of each natural (white-key) letter. */
export const LETTER_PC: Record<Letter, PitchClass> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
}

/** The 12 pitch classes spelled with sharps (C = index 0). */
export const SHARPS: readonly NoteName[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

/** The 12 pitch classes spelled with flats (C = index 0). */
export const FLATS: readonly NoteName[] = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
]

/** Parsed representation of a note name. */
export interface ParsedNote {
  /** Index into LETTERS (0–6). */
  letterIndex: number
  /** Accidental shift in semitones: 0 natural, +1 sharp, +2 double-sharp, −1 flat, −2 double-flat. */
  accidentalShift: number
  /** Pitch class 0–11. */
  pitchClass: PitchClass
}

/** Maps an accidental string to its semitone shift. */
const ACCIDENTAL_SHIFT: Record<string, number> = {
  '': 0,
  '#': 1,
  '##': 2,
  'b': -1,
  'bb': -2,
}

/** Unicode-friendly aliases accepted on input (output always uses ASCII). */
const INPUT_ALIASES: Record<string, string> = {
  '♯': '#',
  '♭': 'b',
  '𝄪': '##',
  '𝄫': 'bb',
  '♮': '',
}

/**
 * Parse a note name into its letter, accidental shift, and pitch class.
 * Throws on an unrecognised note.
 */
export function parseNote(note: NoteName): ParsedNote {
  const cleaned = note.trim()
  if (cleaned.length === 0) {
    throw new Error(`parseNote: empty note name`)
  }
  const letter = cleaned[0]!.toUpperCase()
  const letterIndex = LETTERS.indexOf(letter as Letter)
  if (letterIndex === -1) {
    throw new Error(`parseNote: "${note}" — invalid letter "${letter}"`)
  }
  let rest = cleaned.slice(1)
  for (const [from, to] of Object.entries(INPUT_ALIASES)) {
    rest = rest.replaceAll(from, to)
  }
  if (!(rest in ACCIDENTAL_SHIFT)) {
    throw new Error(`parseNote: "${note}" — invalid accidental "${rest}"`)
  }
  const accidentalShift = ACCIDENTAL_SHIFT[rest]!
  const pitchClass = mod(
    LETTER_PC[letter as Letter] + accidentalShift,
    12,
  )
  return { letterIndex, accidentalShift, pitchClass }
}

/** Return the pitch class (0–11, C = 0) of any note name. */
export function toPitchClass(note: NoteName): PitchClass {
  return parseNote(note).pitchClass
}

/** Return the letter index (0–6) of a note name. */
export function letterIndexOf(note: NoteName): number {
  return parseNote(note).letterIndex
}

/** Mathematical modulo that always returns a non-negative result. */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

/** Maps an accidental shift to its ASCII symbol ("" for natural). */
function accidentalSymbol(shift: number): string {
  switch (shift) {
    case 0:
      return ''
    case 1:
      return '#'
    case 2:
      return '##'
    case -1:
      return 'b'
    case -2:
      return 'bb'
    default:
      // Clamp exotic shifts to the nearest representable.
      if (shift > 0) return '#'.repeat(Math.min(shift, 2))
      return 'b'.repeat(Math.min(-shift, 2))
  }
}

/**
 * Spell a note given a target letter (index 0–6) and a target pitch class.
 * Picks the accidental that lands the letter on the pitch class.
 */
export function spellNote(letterIndex: number, targetPC: PitchClass): NoteName {
  const li = mod(letterIndex, 7)
  const letter = LETTERS[li]!
  const naturalPC = LETTER_PC[letter]
  // Shift in [-2, 2] for any valid diatonic spelling.
  let shift = targetPC - naturalPC
  if (shift > 6) shift -= 12
  if (shift < -6) shift += 12
  return letter + accidentalSymbol(shift)
}

/**
 * The core spelling engine: spell a list of notes from a root + a formula
 * (list of {degree, semitones}). Each degree maps to one letter so enharmonic
 * spelling is always correct.
 *
 * Used by scales (degrees 1–7) and chords (odd degrees 1,3,5,7,9,11,13).
 */
export function spellFromFormula(
  root: NoteName,
  formula: readonly FormulaStep[],
): NoteName[] {
  const { letterIndex: rootLetter, pitchClass: rootPC } = parseNote(root)
  return formula.map(({ degree, semitones }) => {
    const letterOffset = mod(degree - 1, 7) // degree 1→0, 3→2, 5→4, 7→6, 9→1, 11→3, 13→5
    const targetPC = mod(rootPC + semitones, 12)
    return spellNote(rootLetter + letterOffset, targetPC)
  })
}

/**
 * Transpose a note by a number of semitones. Uses simple sharp/flat spelling
 * (preserve the input's accidental preference). For correct contextual
 * spelling inside a scale or chord, use {@link spellFromFormula}.
 */
export function transposeNote(
  note: NoteName,
  semitones: number,
  preferFlats: boolean = note.includes('b'),
): NoteName {
  const pc = toPitchClass(note)
  const newPC = mod(pc + semitones, 12)
  return preferFlats ? FLATS[newPC]! : SHARPS[newPC]!
}

/**
 * Return the enharmonic equivalent of a note, preferring sharps or flats.
 * e.g. enharmonicSpelling('Db', false) → 'C#'.
 */
export function enharmonicSpelling(
  note: NoteName,
  preferFlats: boolean,
): NoteName {
  const pc = toPitchClass(note)
  return preferFlats ? FLATS[pc]! : SHARPS[pc]!
}

/** True if two note names are enharmonically equivalent (same pitch class). */
export function isEnharmonic(a: NoteName, b: NoteName): boolean {
  return toPitchClass(a) === toPitchClass(b)
}

/** All 12 pitch classes in the preferred spelling. */
export function allNotes(preferFlats = false): readonly NoteName[] {
  return preferFlats ? FLATS : SHARPS
}
