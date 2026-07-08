import { describe, it, expect } from 'vitest'
import {
  parseNote,
  toPitchClass,
  letterIndexOf,
  spellNote,
  spellFromFormula,
  transposeNote,
  enharmonicSpelling,
  isEnharmonic,
  SHARPS,
  FLATS,
} from './notes'

describe('parseNote', () => {
  it('parses naturals', () => {
    expect(parseNote('C')).toEqual({ letterIndex: 0, accidentalShift: 0, pitchClass: 0 })
    expect(parseNote('E')).toEqual({ letterIndex: 2, accidentalShift: 0, pitchClass: 4 })
    expect(parseNote('B')).toEqual({ letterIndex: 6, accidentalShift: 0, pitchClass: 11 })
  })

  it('parses sharps and flats', () => {
    expect(parseNote('C#').pitchClass).toBe(1)
    expect(parseNote('Db').pitchClass).toBe(1)
    expect(parseNote('F#').pitchClass).toBe(6)
    expect(parseNote('Bb').pitchClass).toBe(10)
    expect(parseNote('G#').pitchClass).toBe(8)
    expect(parseNote('Ab').pitchClass).toBe(8)
  })

  it('parses double accidentals', () => {
    expect(parseNote('C##').pitchClass).toBe(2)
    expect(parseNote('Bbb').pitchClass).toBe(9)
  })

  it('accepts unicode accidentals', () => {
    expect(parseNote('C♯').pitchClass).toBe(1)
    expect(parseNote('D♭').pitchClass).toBe(1)
  })

  it('is case-insensitive on the letter', () => {
    expect(parseNote('c').pitchClass).toBe(0)
    expect(parseNote('f#').pitchClass).toBe(6)
  })

  it('throws on invalid notes', () => {
    expect(() => parseNote('')).toThrow()
    expect(() => parseNote('H')).toThrow()
    expect(() => parseNote('Cx')).toThrow()
  })
})

describe('toPitchClass', () => {
  it('maps all 12 sharp notes 0–11', () => {
    SHARPS.forEach((n, i) => expect(toPitchClass(n)).toBe(i))
  })
  it('maps all 12 flat notes 0–11', () => {
    FLATS.forEach((n, i) => expect(toPitchClass(n)).toBe(i))
  })
  it('enharmonic equivalents share a pitch class', () => {
    expect(toPitchClass('C#')).toBe(toPitchClass('Db'))
    expect(toPitchClass('F#')).toBe(toPitchClass('Gb'))
  })
})

describe('spellNote (enharmonic correctness)', () => {
  it('spells naturals', () => {
    expect(spellNote(0, 0)).toBe('C') // C
    expect(spellNote(2, 4)).toBe('E') // E
    expect(spellNote(3, 5)).toBe('F') // F
  })
  it('picks the right accidental for the letter', () => {
    expect(spellNote(6, 10)).toBe('Bb') // B -> Bb for pc 10
    expect(spellNote(3, 6)).toBe('F#') // F -> F# for pc 6
    expect(spellNote(2, 3)).toBe('Eb') // E -> Eb for pc 3
    expect(spellNote(5, 8)).toBe('Ab') // A -> Ab for pc 8
    expect(spellNote(4, 8)).toBe('G#') // G -> G# for pc 8
  })
})

describe('spellFromFormula', () => {
  // major scale formula: degrees 1-7, semitone offsets W-W-H-W-W-W-H
  const MAJOR = [
    { degree: 1, semitones: 0 },
    { degree: 2, semitones: 2 },
    { degree: 3, semitones: 4 },
    { degree: 4, semitones: 5 },
    { degree: 5, semitones: 7 },
    { degree: 6, semitones: 9 },
    { degree: 7, semitones: 11 },
  ]

  it('spells C major with no accidentals', () => {
    expect(spellFromFormula('C', MAJOR)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })

  it('spells F major with a Bb (not A#)', () => {
    expect(spellFromFormula('F', MAJOR)).toEqual(['F', 'G', 'A', 'Bb', 'C', 'D', 'E'])
  })

  it('spells G major with an F# (not Gb)', () => {
    expect(spellFromFormula('G', MAJOR)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#'])
  })

  it('spells D major with two sharps', () => {
    expect(spellFromFormula('D', MAJOR)).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#'])
  })

  it('spells Eb major with flats', () => {
    expect(spellFromFormula('Eb', MAJOR)).toEqual(['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'])
  })

  it('spells A harmonic minor with a G#', () => {
    const HARM_MIN = [
      { degree: 1, semitones: 0 },
      { degree: 2, semitones: 2 },
      { degree: 3, semitones: 3 },
      { degree: 4, semitones: 5 },
      { degree: 5, semitones: 7 },
      { degree: 6, semitones: 8 },
      { degree: 7, semitones: 11 },
    ]
    expect(spellFromFormula('A', HARM_MIN)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G#'])
  })

  it('spells a C7 chord (C E G Bb) via odd degrees', () => {
    const DOM7 = [
      { degree: 1, semitones: 0 },
      { degree: 3, semitones: 4 },
      { degree: 5, semitones: 7 },
      { degree: 7, semitones: 10 },
    ]
    expect(spellFromFormula('C', DOM7)).toEqual(['C', 'E', 'G', 'Bb'])
  })
})

describe('transposeNote', () => {
  it('transposes upward', () => {
    expect(transposeNote('C', 7)).toBe('G')
    expect(transposeNote('C', 4)).toBe('E')
    expect(transposeNote('A', 3)).toBe('C')
  })
  it('wraps at the octave', () => {
    expect(transposeNote('C', 12)).toBe('C')
    expect(transposeNote('E', 12)).toBe('E')
  })
  it('handles negative transposes', () => {
    expect(transposeNote('C', -1)).toBe('B')
    expect(transposeNote('C', -5)).toBe('G')
    expect(transposeNote('G', -7)).toBe('C')
  })
  it('preserves flat preference', () => {
    expect(transposeNote('Db', 2)).toBe('Eb')
    expect(transposeNote('Bb', 2, true)).toBe('C')
  })
})

describe('enharmonic helpers', () => {
  it('enharmonicSpelling re-spells', () => {
    expect(enharmonicSpelling('Db', false)).toBe('C#')
    expect(enharmonicSpelling('C#', true)).toBe('Db')
    expect(enharmonicSpelling('C', false)).toBe('C')
  })
  it('isEnharmonic detects equivalence', () => {
    expect(isEnharmonic('C#', 'Db')).toBe(true)
    expect(isEnharmonic('F#', 'Gb')).toBe(true)
    expect(isEnharmonic('C', 'C#')).toBe(false)
  })
  it('letterIndexOf returns the letter position', () => {
    expect(letterIndexOf('C')).toBe(0)
    expect(letterIndexOf('Bb')).toBe(6)
    expect(letterIndexOf('F#')).toBe(3)
  })
})
