/**
 * solfege.ts — Fixed-Do solfège mapping.
 *
 * Fixed-Do: each letter always maps to the same syllable regardless of key.
 * C=Do, D=Ré, E=Mi, F=Fa, G=Sol, A=La, B=Si. Accidentals carry over
 * (C# = Do#, Db = Réb). Shown alongside note names in v1; movable-Do deferred.
 *
 * Pure & UI-agnostic. Reference: PROJECT.md key decision #2.
 */
import { type NoteName, LETTERS, parseNote } from './notes'

/** Fixed-Do syllable for each letter A–G (indexed by letter). */
export const FIXED_DO: Record<string, string> = {
  C: 'Do',
  D: 'Re',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol',
  A: 'La',
  B: 'Si',
}

/** Reverse lookup: syllable → letter. */
const DO_TO_LETTER: Record<string, string> = Object.fromEntries(
  Object.entries(FIXED_DO).map(([letter, syllable]) => [syllable, letter]),
)

/** ASCII accidental symbols carried over from the note. */
function accidentalSymbol(shift: number): string {
  if (shift > 0) return '#'.repeat(Math.min(shift, 2))
  if (shift < 0) return 'b'.repeat(Math.min(-shift, 2))
  return ''
}

/** Convert a note name to its fixed-Do syllable (e.g. "C#" → "Do#"). */
export function toSolfege(note: NoteName): string {
  const { letterIndex, accidentalShift } = parseNote(note)
  const letter = LETTERS[letterIndex]!
  const syllable = FIXED_DO[letter]
  if (!syllable) throw new Error(`toSolfege: no syllable for "${note}"`)
  return syllable + accidentalSymbol(accidentalShift)
}

/** Convert a fixed-Do syllable back to a note name (e.g. "Reb" → "Db"). */
export function fromSolfege(syllable: string): NoteName {
  const trimmed = syllable.trim()
  const match = /^(Do|Re|Mi|Fa|Sol|La|Si)(#|b|##|bb)?$/.exec(trimmed)
  if (!match) {
    throw new Error(`fromSolfege: invalid syllable "${syllable}"`)
  }
  const base = match[1]!
  const accidental = match[2] ?? ''
  const letter = DO_TO_LETTER[base]
  if (!letter) throw new Error(`fromSolfege: no letter for "${base}"`)
  return letter + accidental
}

/** All 12 pitch classes as solfège syllables (sharp spelling). */
export const SOLFEGE_SHARPS: readonly string[] = [
  'Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si',
]

/** All 12 pitch classes as solfège syllables (flat spelling). */
export const SOLFEGE_FLATS: readonly string[] = [
  'Do', 'Reb', 'Re', 'Mib', 'Mi', 'Fa', 'Solb', 'Sol', 'Lab', 'La', 'Sib', 'Si',
]
