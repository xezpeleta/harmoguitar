/**
 * chords.ts — Chord construction & symbol parsing.
 *
 * Chords are stacks of thirds, modelled as {degree, semitones} formulas with
 * odd degrees (1, 3, 5, 7, 9, 11, 13). The shared spelling engine gives correct
 * enharmonics (C7 → C E G Bb, Cdim7 → C Eb Gb Bbb).
 *
 * Pure & UI-agnostic. Reference: RESEARCH.md §5 (triads), §6 (7ths), §7 (extensions).
 */
import {
  type FormulaStep,
  type NoteName,
  spellFromFormula,
  LETTERS,
} from './notes'
import { interval, type Interval } from './intervals'

export type ChordType =
  | 'major' | 'minor' | 'dim' | 'aug' | 'sus2' | 'sus4'
  | 'maj7' | 'dom7' | 'm7' | 'm7b5' | 'dim7' | 'mMaj7' | '7sus4'
  | 'maj9' | 'dom9' | 'm9' | 'maj13' | 'dom13' | 'm11'
  | '7b9' | '7#9' | '7#11' | '7b13' | '7alt'

/** The {degree, semitones} formula for each chord type. */
export const CHORD_FORMULAS: Record<ChordType, readonly FormulaStep[]> = {
  // Triads
  major: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }],
  minor: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 7 }],
  dim: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 6 }],
  aug: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 8 }],
  sus2: [{ degree: 1, semitones: 0 }, { degree: 2, semitones: 2 }, { degree: 5, semitones: 7 }],
  sus4: [{ degree: 1, semitones: 0 }, { degree: 4, semitones: 5 }, { degree: 5, semitones: 7 }],
  // Sevenths
  maj7: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 11 }],
  dom7: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }],
  m7: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }],
  m7b5: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 6 }, { degree: 7, semitones: 10 }],
  dim7: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 6 }, { degree: 7, semitones: 9 }],
  mMaj7: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 11 }],
  '7sus4': [{ degree: 1, semitones: 0 }, { degree: 4, semitones: 5 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }],
  // Extensions
  maj9: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 11 }, { degree: 9, semitones: 14 }],
  dom9: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 14 }],
  m9: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 14 }],
  maj13: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 11 }, { degree: 9, semitones: 14 }, { degree: 13, semitones: 21 }],
  dom13: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 14 }, { degree: 13, semitones: 21 }],
  m11: [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 3 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 14 }, { degree: 11, semitones: 17 }],
  // Alterations
  '7b9': [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 13 }],
  '7#9': [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 15 }],
  '7#11': [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 11, semitones: 18 }],
  '7b13': [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 7 }, { degree: 7, semitones: 10 }, { degree: 13, semitones: 20 }],
  '7alt': [{ degree: 1, semitones: 0 }, { degree: 3, semitones: 4 }, { degree: 5, semitones: 6 }, { degree: 5, semitones: 8 }, { degree: 7, semitones: 10 }, { degree: 9, semitones: 13 }, { degree: 9, semitones: 15 }],
}

/** Common chord-symbol suffix for each type (for display, e.g. Cmaj7). */
export const CHORD_SYMBOLS: Record<ChordType, string> = {
  major: '', minor: 'm', dim: 'dim', aug: 'aug', sus2: 'sus2', sus4: 'sus4',
  maj7: 'maj7', dom7: '7', m7: 'm7', m7b5: 'm7b5', dim7: 'dim7', mMaj7: 'mMaj7', '7sus4': '7sus4',
  maj9: 'maj9', dom9: '9', m9: 'm9', maj13: 'maj13', dom13: '13', m11: 'm11',
  '7b9': '7b9', '7#9': '7#9', '7#11': '7#11', '7b13': '7b13', '7alt': '7alt',
}

/** Full human-readable name for each chord type. */
export const CHORD_NAMES: Record<ChordType, string> = {
  major: 'Major', minor: 'Minor', dim: 'Diminished', aug: 'Augmented',
  sus2: 'Sus2', sus4: 'Sus4',
  maj7: 'Major 7', dom7: 'Dominant 7', m7: 'Minor 7', m7b5: 'Minor 7 Flat 5',
  dim7: 'Diminished 7', mMaj7: 'Minor-Major 7', '7sus4': '7 Sus4',
  maj9: 'Major 9', dom9: 'Dominant 9', m9: 'Minor 9',
  maj13: 'Major 13', dom13: 'Dominant 13', m11: 'Minor 11',
  '7b9': '7 Flat 9', '7#9': '7 Sharp 9', '7#11': '7 Sharp 11', '7b13': '7 Flat 13', '7alt': 'Altered',
}

/** All chord types, in pedagogical order (triads → 7ths → extensions → alterations). */
export const CHORD_TYPES: ChordType[] = [
  'major', 'minor', 'dim', 'aug', 'sus2', 'sus4',
  'maj7', 'dom7', 'm7', 'm7b5', 'dim7', 'mMaj7', '7sus4',
  'maj9', 'dom9', 'm9', 'maj13', 'dom13', 'm11',
  '7b9', '7#9', '7#11', '7b13', '7alt',
]

/** Generate the notes of a chord from a root and chord type. */
export function chordNotes(root: NoteName, type: ChordType): NoteName[] {
  return spellFromFormula(root, CHORD_FORMULAS[type])
}

/** Interval symbols of a chord relative to its root, e.g. dom7 → ["1","3","5","b7"]. */
export function chordIntervals(type: ChordType): string[] {
  return CHORD_FORMULAS[type].map(({ degree, semitones }) =>
    interval(degree, semitones).symbol,
  )
}

/** Full Interval objects of a chord relative to its root. */
export function chordIntervalObjects(type: ChordType): Interval[] {
  return CHORD_FORMULAS[type].map(({ degree, semitones }) =>
    interval(degree, semitones),
  )
}

/** Build the canonical symbol for a chord, e.g. chordSymbol('C','maj7') → "Cmaj7". */
export function chordSymbol(root: NoteName, type: ChordType): string {
  return `${root}${CHORD_SYMBOLS[type]}`
}

export interface ParsedChord {
  root: NoteName
  type: ChordType
}

/** Alias map: many written suffixes → canonical ChordType. */
const SUFFIX_ALIASES: Record<string, ChordType> = {
  '': 'major', M: 'major', maj: 'major', Maj: 'major',
  m: 'minor', min: 'minor', '-': 'minor',
  dim: 'dim', '°': 'dim', o: 'dim',
  aug: 'aug', '+': 'aug',
  sus2: 'sus2', sus4: 'sus4', sus: 'sus4',
  maj7: 'maj7', M7: 'maj7', Maj7: 'maj7', Δ: 'maj7', 'Δ7': 'maj7',
  '7': 'dom7',
  m7: 'm7', min7: 'm7', '-7': 'm7',
  m7b5: 'm7b5', '-7b5': 'm7b5', 'm7-5': 'm7b5', 'ø7': 'm7b5', 'ø': 'm7b5',
  dim7: 'dim7', '°7': 'dim7',
  mMaj7: 'mMaj7', mM7: 'mMaj7', '-Maj7': 'mMaj7', '-M7': 'mMaj7', mΔ: 'mMaj7', 'mΔ7': 'mMaj7',
  '7sus4': '7sus4',
  maj9: 'maj9', M9: 'maj9', Maj9: 'maj9',
  '9': 'dom9',
  m9: 'm9', '-9': 'm9', min9: 'm9',
  maj13: 'maj13', M13: 'maj13', Maj13: 'maj13',
  '13': 'dom13',
  m11: 'm11', '-11': 'm11', min11: 'm11',
  '7b9': '7b9',
  '7#9': '7#9', '7♯9': '7#9',
  '7#11': '7#11', '7♯11': '7#11',
  '7b13': '7b13',
  '7alt': '7alt', alt: '7alt',
}

/** Normalise unicode accidentals in a suffix to ASCII (ø/°/Δ handled as aliases). */
function normalizeSuffix(s: string): string {
  return s.replaceAll('♯', '#').replaceAll('♭', 'b')
}

/**
 * Parse a chord symbol like "Cmaj7", "G7", "Am7b5", "F#7#9", "Bb" into
 * { root, type }. Throws on an unrecognised symbol.
 */
export function parseChordSymbol(symbol: string): ParsedChord {
  const s = symbol.trim()
  if (s.length === 0) throw new Error(`parseChordSymbol: empty symbol`)
  const letter = s[0]!.toUpperCase()
  if (!LETTERS.includes(letter as (typeof LETTERS)[number])) {
    throw new Error(`parseChordSymbol: invalid root letter "${letter}" in "${symbol}"`)
  }
  let i = 1
  let root = letter
  const next = s[1]
  if (next === '#' || next === 'b' || next === '♯' || next === '♭') {
    root += next === '♯' ? '#' : next === '♭' ? 'b' : next
    i = 2
  }
  const rawSuffix = normalizeSuffix(s.slice(i))
  const type = SUFFIX_ALIASES[rawSuffix]
  if (!type) {
    throw new Error(`parseChordSymbol: unrecognised suffix "${rawSuffix}" in "${symbol}"`)
  }
  return { root, type }
}
