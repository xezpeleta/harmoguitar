import { describe, it, expect } from 'vitest'
import {
  diatonicChords,
  romanNumeralFor,
  relativeMinor,
  relativeMajor,
  fifthsFromC,
  keySignatureCount,
  circleOfFifths,
} from './diatonic'

describe('diatonicChords — major key triads', () => {
  it('C major triads: I ii iii IV V vi vii°', () => {
    const chords = diatonicChords('C', 'major', false)
    expect(chords.map((c) => c.romanNumeral)).toEqual([
      'I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°',
    ])
    expect(chords.map((c) => c.root)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    expect(chords.map((c) => c.type)).toEqual([
      'major', 'minor', 'minor', 'major', 'major', 'minor', 'dim',
    ])
  })

  it('G major triads include F# diminished', () => {
    const chords = diatonicChords('G', 'major', false)
    expect(chords[6]!.root).toBe('F#')
    expect(chords[6]!.type).toBe('dim')
    expect(chords[6]!.romanNumeral).toBe('vii°')
  })

  it('chord notes are correct for C major V (G major)', () => {
    const chords = diatonicChords('C', 'major', false)
    expect(chords[4]!.notes).toEqual(['G', 'B', 'D'])
  })
})

describe('diatonicChords — major key 7ths', () => {
  it('C major 7ths: Imaj7 ii7 iii7 IVmaj7 V7 vi7 viiø7', () => {
    const chords = diatonicChords('C', 'major', true)
    expect(chords.map((c) => c.romanNumeral)).toEqual([
      'Imaj7', 'ii7', 'iii7', 'IVmaj7', 'V7', 'vi7', 'viiø7',
    ])
    expect(chords.map((c) => c.type)).toEqual([
      'maj7', 'm7', 'm7', 'maj7', 'dom7', 'm7', 'm7b5',
    ])
  })

  it('V7 of C major is G7 (G B D F)', () => {
    const chords = diatonicChords('C', 'major', true)
    expect(chords[4]!.root).toBe('G')
    expect(chords[4]!.type).toBe('dom7')
    expect(chords[4]!.notes).toEqual(['G', 'B', 'D', 'F'])
  })

  it('viiø7 of C major is Bm7b5 (B D F A)', () => {
    const chords = diatonicChords('C', 'major', true)
    expect(chords[6]!.notes).toEqual(['B', 'D', 'F', 'A'])
  })

  it('F major 7ths spell Bb (not A#) on IV7', () => {
    const chords = diatonicChords('F', 'major', true)
    expect(chords[3]!.romanNumeral).toBe('IVmaj7')
    expect(chords[3]!.notes).toEqual(['Bb', 'D', 'F', 'A'])
  })
})

describe('diatonicChords — natural minor', () => {
  it('A natural minor triads: i ii° III iv v VI VII', () => {
    const chords = diatonicChords('A', 'natural-minor', false)
    expect(chords.map((c) => c.romanNumeral)).toEqual([
      'i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII',
    ])
  })

  it('A natural minor 7ths', () => {
    const chords = diatonicChords('A', 'natural-minor', true)
    expect(chords.map((c) => c.romanNumeral)).toEqual([
      'i7', 'iiø7', 'IIImaj7', 'iv7', 'v7', 'VImaj7', 'VII7',
    ])
  })
})

describe('diatonicChords — modes (derivation works generically)', () => {
  it('D dorian 7ths: i7 II7 IIImaj7 iv7 v7ø... (derived, not named)', () => {
    // D dorian is the 2nd mode of C; its diatonic 7ths should match C major's
    // but starting from D: Dm7 Em7 Fmaj7 G7 Am7 Bm7b5 Cmaj7.
    const chords = diatonicChords('D', 'dorian', true)
    expect(chords.map((c) => c.root)).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C'])
    expect(chords.map((c) => c.type)).toEqual([
      'm7', 'm7', 'maj7', 'dom7', 'm7', 'm7b5', 'maj7',
    ])
  })
})

describe('romanNumeralFor', () => {
  it('marks diminished and half-diminished', () => {
    expect(romanNumeralFor(7, 'dim')).toBe('vii°')
    expect(romanNumeralFor(7, 'm7b5')).toBe('viiø7')
    expect(romanNumeralFor(7, 'dim7')).toBe('vii°7')
  })
  it('marks augmented', () => {
    expect(romanNumeralFor(3, 'aug')).toBe('III+')
  })
  it('maj7 vs dom7 suffix', () => {
    expect(romanNumeralFor(1, 'maj7')).toBe('Imaj7')
    expect(romanNumeralFor(5, 'dom7')).toBe('V7')
    expect(romanNumeralFor(2, 'm7')).toBe('ii7')
  })
})

describe('relative keys', () => {
  it('relative minor of C is A', () => {
    expect(relativeMinor('C')).toBe('A')
    expect(relativeMinor('G')).toBe('E')
    expect(relativeMinor('F')).toBe('D')
  })
  it('relative major of A is C', () => {
    expect(relativeMajor('A')).toBe('C')
    expect(relativeMajor('E')).toBe('G')
  })
})

describe('circle of fifths', () => {
  it('fifthsFromC gives sharp/flat counts', () => {
    expect(fifthsFromC('C')).toBe(0)
    expect(fifthsFromC('G')).toBe(1)
    expect(fifthsFromC('D')).toBe(2)
    expect(fifthsFromC('A')).toBe(3)
    expect(fifthsFromC('E')).toBe(4)
    expect(fifthsFromC('B')).toBe(5)
    expect(fifthsFromC('F#')).toBe(6)
    expect(fifthsFromC('F')).toBe(-1)
    expect(fifthsFromC('Bb')).toBe(-2)
    expect(fifthsFromC('Eb')).toBe(-3)
    expect(fifthsFromC('Ab')).toBe(-4)
    expect(fifthsFromC('Db')).toBe(-5)
  })
  it('keySignatureCount matches fifths', () => {
    expect(keySignatureCount('G')).toBe(1)
    expect(keySignatureCount('Bb')).toBe(-2)
  })
  it('circleOfFifths has 12 entries', () => {
    const c = circleOfFifths()
    expect(c).toHaveLength(12)
    expect(c[0]!.sharp).toBe('C')
    expect(c[1]!.sharp).toBe('G')
  })
})
