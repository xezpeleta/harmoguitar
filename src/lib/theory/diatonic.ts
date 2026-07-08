/**
 * diatonic.ts — Diatonic harmony, Roman numerals & keys.
 *
 * Rather than hardcoding "major key = maj7,m7,m7,maj7,7,m7,m7b5", this module
 * *derives* each diatonic chord by stacking thirds within the scale and reading
 * off the intervals. That makes it correct for any 7-note scale (major, minor,
 * modes) without a lookup table per scale.
 *
 * Pure & UI-agnostic. Reference: RESEARCH.md §8 (diatonic harmony), §10 (circle
 * of fifths), §11 (progressions/roman numerals).
 */
import { type NoteName, toPitchClass, mod } from './notes'
import { semitonesBetween } from './intervals'
import { type ChordType, chordNotes, CHORD_FORMULAS } from './chords'
import { scaleNotes, type ScaleType } from './scales'

export interface DiatonicChord {
  /** Scale degree 1–7. */
  degree: number
  /** Root note of the chord. */
  root: NoteName
  /** Chord type (e.g. maj7, m7, dom7, m7b5). */
  type: ChordType
  /** Notes of the chord. */
  notes: NoteName[]
  /** Roman-numeral label, e.g. "Imaj7", "ii7", "viiø7", "V". */
  romanNumeral: string
}

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const

/** Chord types whose root-quality is minor-ish (lowercase Roman numeral). */
const MINORISH: ReadonlySet<ChordType> = new Set<ChordType>([
  'minor', 'm7', 'dim', 'dim7', 'm7b5', 'mMaj7', 'm9', 'm11',
])

/** True if the chord formula includes a 7th-degree step. */
function hasSeventh(type: ChordType): boolean {
  return CHORD_FORMULAS[type].some((s) => s.degree === 7)
}

/** Derive a triad type from its third & fifth semitone intervals. */
function triadType(third: number, fifth: number): ChordType {
  if (third === 4 && fifth === 7) return 'major'
  if (third === 3 && fifth === 7) return 'minor'
  if (third === 3 && fifth === 6) return 'dim'
  if (third === 4 && fifth === 8) return 'aug'
  // Non-diatonic fallbacks (shouldn't occur in standard major/minor).
  return 'major'
}

/** Derive a 7th-chord type from its third, fifth & seventh semitone intervals. */
function seventhChordType(third: number, fifth: number, seventh: number): ChordType {
  if (third === 4 && fifth === 7 && seventh === 11) return 'maj7'
  if (third === 4 && fifth === 7 && seventh === 10) return 'dom7'
  if (third === 3 && fifth === 7 && seventh === 10) return 'm7'
  if (third === 3 && fifth === 6 && seventh === 10) return 'm7b5'
  if (third === 3 && fifth === 6 && seventh === 9) return 'dim7'
  if (third === 3 && fifth === 7 && seventh === 11) return 'mMaj7'
  // Fallback: match the triad with a b7.
  return seventh === 11 ? 'maj7' : 'dom7'
}

/** Build the Roman-numeral label for a diatonic chord. */
export function romanNumeralFor(degree: number, type: ChordType): string {
  const idx = mod(degree - 1, 7)
  let base: string = ROMAN_NUMERALS[idx]!
  if (MINORISH.has(type)) base = base.toLowerCase()

  let mark = ''
  if (type === 'dim' || type === 'dim7') mark = '°'
  else if (type === 'm7b5') mark = 'ø'
  else if (type === 'aug') mark = '+'

  let suffix = ''
  if (hasSeventh(type)) {
    suffix = type === 'maj7' || type === 'mMaj7' ? 'maj7' : '7'
  }
  return `${base}${mark}${suffix}`
}

/**
 * The diatonic chords of a key, derived by stacking thirds within the scale.
 * Set `useSevenths` for 7th chords (the jazz default) instead of triads.
 */
export function diatonicChords(
  key: NoteName,
  scaleType: ScaleType = 'major',
  useSevenths = false,
): DiatonicChord[] {
  const notes = scaleNotes(key, scaleType)
  if (notes.length < 7) {
    throw new Error(`diatonicChords: scale "${scaleType}" is not heptatonic`)
  }
  return notes.map((root, i) => {
    const third = notes[mod(i + 2, 7)]!
    const fifth = notes[mod(i + 4, 7)]!
    const thirdS = semitonesBetween(root, third)
    const fifthS = semitonesBetween(root, fifth)
    let type: ChordType
    if (useSevenths) {
      const seventh = notes[mod(i + 6, 7)]!
      const seventhS = semitonesBetween(root, seventh)
      type = seventhChordType(thirdS, fifthS, seventhS)
    } else {
      type = triadType(thirdS, fifthS)
    }
    const degree = i + 1
    return {
      degree,
      root,
      type,
      notes: chordNotes(root, type),
      romanNumeral: romanNumeralFor(degree, type),
    }
  })
}

/** Relative minor of a major key (6th degree), e.g. C → A. */
export function relativeMinor(key: NoteName): NoteName {
  return scaleNotes(key, 'major')[5]!
}

/** Relative major of a minor key (3rd degree), e.g. A → C. */
export function relativeMajor(key: NoteName): NoteName {
  return scaleNotes(key, 'natural-minor')[2]!
}

/**
 * Position on the circle of fifths relative to C, in [-5, 6].
 * Positive = sharps, negative = flats, 0 = C. e.g. G → 1, F → -1, Bb → -2.
 */
export function fifthsFromC(key: NoteName): number {
  const pc = toPitchClass(key)
  for (let f = -5; f <= 6; f++) {
    if (mod(7 * f, 12) === pc) return f
  }
  return 0 // unreachable for valid pitch classes
}

/** Number of sharps (positive) or flats (negative) in a key's signature. */
export function keySignatureCount(key: NoteName): number {
  return fifthsFromC(key)
}

/** The 12 keys around the circle of fifths, spelled with sharps (f >= 0) or flats (f < 0). */
export function circleOfFifths(): { fifths: number; sharp: NoteName; flat: NoteName }[] {
  const sharpSide: NoteName[] = ['C', 'G', 'D', 'A', 'E', 'B', 'F#']
  const flatSide: NoteName[] = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']
  const result: { fifths: number; sharp: NoteName; flat: NoteName }[] = []
  for (let f = 0; f <= 6; f++) {
    result.push({
      fifths: f,
      sharp: sharpSide[f]!,
      flat: f === 6 ? 'Gb' : sharpSide[f]!,
    })
  }
  for (let f = -1; f >= -5; f--) {
    const idx = -f
    result.push({
      fifths: f,
      sharp: flatSide[idx]!,
      flat: flatSide[idx]!,
    })
  }
  return result
}
