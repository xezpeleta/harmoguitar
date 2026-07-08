import { describe, it, expect } from 'vitest'
import {
  chordNotes,
  chordIntervals,
  chordSymbol,
  parseChordSymbol,
  CHORD_TYPES,
  CHORD_FORMULAS,
} from './chords'

describe('chordNotes — triads', () => {
  it('major triad', () => {
    expect(chordNotes('C', 'major')).toEqual(['C', 'E', 'G'])
    expect(chordNotes('G', 'major')).toEqual(['G', 'B', 'D'])
    expect(chordNotes('F', 'major')).toEqual(['F', 'A', 'C'])
  })
  it('minor triad', () => {
    expect(chordNotes('A', 'minor')).toEqual(['A', 'C', 'E'])
    expect(chordNotes('C', 'minor')).toEqual(['C', 'Eb', 'G'])
    expect(chordNotes('E', 'minor')).toEqual(['E', 'G', 'B'])
  })
  it('diminished triad', () => {
    expect(chordNotes('B', 'dim')).toEqual(['B', 'D', 'F'])
    expect(chordNotes('C', 'dim')).toEqual(['C', 'Eb', 'Gb'])
  })
  it('augmented triad', () => {
    expect(chordNotes('C', 'aug')).toEqual(['C', 'E', 'G#'])
  })
  it('sus chords', () => {
    expect(chordNotes('C', 'sus2')).toEqual(['C', 'D', 'G'])
    expect(chordNotes('C', 'sus4')).toEqual(['C', 'F', 'G'])
  })
})

describe('chordNotes — sevenths', () => {
  it('major 7', () => {
    expect(chordNotes('C', 'maj7')).toEqual(['C', 'E', 'G', 'B'])
    expect(chordNotes('G', 'maj7')).toEqual(['G', 'B', 'D', 'F#'])
  })
  it('dominant 7', () => {
    expect(chordNotes('C', 'dom7')).toEqual(['C', 'E', 'G', 'Bb'])
    expect(chordNotes('G', 'dom7')).toEqual(['G', 'B', 'D', 'F'])
  })
  it('minor 7', () => {
    expect(chordNotes('A', 'm7')).toEqual(['A', 'C', 'E', 'G'])
    expect(chordNotes('C', 'm7')).toEqual(['C', 'Eb', 'G', 'Bb'])
  })
  it('minor 7 flat 5 (half-diminished)', () => {
    expect(chordNotes('B', 'm7b5')).toEqual(['B', 'D', 'F', 'A'])
    expect(chordNotes('C', 'm7b5')).toEqual(['C', 'Eb', 'Gb', 'Bb'])
  })
  it('diminished 7 (double-flat 7)', () => {
    expect(chordNotes('C', 'dim7')).toEqual(['C', 'Eb', 'Gb', 'Bbb'])
  })
  it('minor-major 7', () => {
    expect(chordNotes('C', 'mMaj7')).toEqual(['C', 'Eb', 'G', 'B'])
  })
})

describe('chordNotes — extensions', () => {
  it('major 9', () => {
    expect(chordNotes('C', 'maj9')).toEqual(['C', 'E', 'G', 'B', 'D'])
  })
  it('dominant 9', () => {
    expect(chordNotes('G', 'dom9')).toEqual(['G', 'B', 'D', 'F', 'A'])
  })
  it('minor 9', () => {
    expect(chordNotes('C', 'm9')).toEqual(['C', 'Eb', 'G', 'Bb', 'D'])
  })
  it('dominant 13', () => {
    expect(chordNotes('C', 'dom13')).toEqual(['C', 'E', 'G', 'Bb', 'D', 'A'])
  })
  it('minor 11', () => {
    expect(chordNotes('C', 'm11')).toEqual(['C', 'Eb', 'G', 'Bb', 'D', 'F'])
  })
})

describe('chordNotes — alterations', () => {
  it('7b9', () => {
    expect(chordNotes('C', '7b9')).toEqual(['C', 'E', 'G', 'Bb', 'Db'])
  })
  it('7#9 (Hendrix)', () => {
    expect(chordNotes('C', '7#9')).toEqual(['C', 'E', 'G', 'Bb', 'D#'])
  })
  it('7#11', () => {
    expect(chordNotes('C', '7#11')).toEqual(['C', 'E', 'G', 'Bb', 'F#'])
  })
  it('7b13', () => {
    expect(chordNotes('C', '7b13')).toEqual(['C', 'E', 'G', 'Bb', 'Ab'])
  })
})

describe('chordIntervals', () => {
  it('major triad intervals', () => {
    expect(chordIntervals('major')).toEqual(['1', '3', '5'])
  })
  it('dom7 intervals', () => {
    expect(chordIntervals('dom7')).toEqual(['1', '3', '5', 'b7'])
  })
  it('maj7 intervals', () => {
    expect(chordIntervals('maj7')).toEqual(['1', '3', '5', '7'])
  })
  it('m7b5 intervals', () => {
    expect(chordIntervals('m7b5')).toEqual(['1', 'b3', 'b5', 'b7'])
  })
  it('dim7 intervals', () => {
    expect(chordIntervals('dim7')).toEqual(['1', 'b3', 'b5', 'bb7'])
  })
  it('7#9 intervals', () => {
    expect(chordIntervals('7#9')).toEqual(['1', '3', '5', 'b7', '#9'])
  })
})

describe('chordSymbol', () => {
  it('builds canonical symbols', () => {
    expect(chordSymbol('C', 'maj7')).toBe('Cmaj7')
    expect(chordSymbol('G', 'dom7')).toBe('G7')
    expect(chordSymbol('A', 'm7')).toBe('Am7')
    expect(chordSymbol('B', 'm7b5')).toBe('Bm7b5')
    expect(chordSymbol('C', 'major')).toBe('C')
    expect(chordSymbol('F#', 'dom9')).toBe('F#9')
  })
})

describe('parseChordSymbol', () => {
  it('parses basic triads', () => {
    expect(parseChordSymbol('C')).toEqual({ root: 'C', type: 'major' })
    expect(parseChordSymbol('Am')).toEqual({ root: 'A', type: 'minor' })
    expect(parseChordSymbol('Bdim')).toEqual({ root: 'B', type: 'dim' })
    expect(parseChordSymbol('Caug')).toEqual({ root: 'C', type: 'aug' })
  })
  it('parses sevenths', () => {
    expect(parseChordSymbol('Cmaj7')).toEqual({ root: 'C', type: 'maj7' })
    expect(parseChordSymbol('G7')).toEqual({ root: 'G', type: 'dom7' })
    expect(parseChordSymbol('Am7')).toEqual({ root: 'A', type: 'm7' })
    expect(parseChordSymbol('Bm7b5')).toEqual({ root: 'B', type: 'm7b5' })
    expect(parseChordSymbol('C#dim7')).toEqual({ root: 'C#', type: 'dim7' })
  })
  it('parses sharps and flats in root', () => {
    expect(parseChordSymbol('F#7')).toEqual({ root: 'F#', type: 'dom7' })
    expect(parseChordSymbol('Bbmaj7')).toEqual({ root: 'Bb', type: 'maj7' })
    expect(parseChordSymbol('Db')).toEqual({ root: 'Db', type: 'major' })
  })
  it('parses extensions and alterations', () => {
    expect(parseChordSymbol('C9')).toEqual({ root: 'C', type: 'dom9' })
    expect(parseChordSymbol('C7#9')).toEqual({ root: 'C', type: '7#9' })
    expect(parseChordSymbol('G7b9')).toEqual({ root: 'G', type: '7b9' })
    expect(parseChordSymbol('C13')).toEqual({ root: 'C', type: 'dom13' })
  })
  it('handles aliases (M, m, -, Δ, °, ø)', () => {
    expect(parseChordSymbol('CM7')).toEqual({ root: 'C', type: 'maj7' })
    expect(parseChordSymbol('D-7')).toEqual({ root: 'D', type: 'm7' })
    expect(parseChordSymbol('CΔ')).toEqual({ root: 'C', type: 'maj7' })
    expect(parseChordSymbol('B°7')).toEqual({ root: 'B', type: 'dim7' })
    expect(parseChordSymbol('Bø7')).toEqual({ root: 'B', type: 'm7b5' })
  })
  it('round-trips via chordSymbol', () => {
    for (const root of ['C', 'F#', 'Bb', 'A', 'Eb']) {
      for (const type of CHORD_TYPES) {
        const sym = chordSymbol(root, type)
        const parsed = parseChordSymbol(sym)
        expect(parsed).toEqual({ root, type })
      }
    }
  })
  it('throws on invalid symbols', () => {
    expect(() => parseChordSymbol('')).toThrow()
    expect(() => parseChordSymbol('H7')).toThrow()
    expect(() => parseChordSymbol('Cxyz')).toThrow()
  })
})

describe('CHORD_FORMULAS completeness', () => {
  it('every chord type has a formula with at least a root + third + fifth', () => {
    for (const type of CHORD_TYPES) {
      const formula = CHORD_FORMULAS[type]
      expect(formula.length).toBeGreaterThanOrEqual(3)
      expect(formula[0]!.degree).toBe(1)
    }
  })
})
