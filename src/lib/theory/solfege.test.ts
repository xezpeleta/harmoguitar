import { describe, it, expect } from 'vitest'
import {
  toSolfege,
  fromSolfege,
  FIXED_DO,
  SOLFEGE_SHARPS,
  SOLFEGE_FLATS,
} from './solfege'

describe('toSolfege (fixed-Do)', () => {
  it('maps naturals', () => {
    expect(toSolfege('C')).toBe('Do')
    expect(toSolfege('D')).toBe('Re')
    expect(toSolfege('E')).toBe('Mi')
    expect(toSolfege('F')).toBe('Fa')
    expect(toSolfege('G')).toBe('Sol')
    expect(toSolfege('A')).toBe('La')
    expect(toSolfege('B')).toBe('Si')
  })
  it('carries accidentals', () => {
    expect(toSolfege('C#')).toBe('Do#')
    expect(toSolfege('Db')).toBe('Reb')
    expect(toSolfege('F#')).toBe('Fa#')
    expect(toSolfege('Bb')).toBe('Sib')
    expect(toSolfege('Eb')).toBe('Mib')
  })
  it('FIXED_DO covers all 7 letters', () => {
    expect(Object.keys(FIXED_DO).sort()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  })
})

describe('fromSolfege', () => {
  it('maps syllables back to notes', () => {
    expect(fromSolfege('Do')).toBe('C')
    expect(fromSolfege('Re')).toBe('D')
    expect(fromSolfege('Si')).toBe('B')
  })
  it('carries accidentals back', () => {
    expect(fromSolfege('Do#')).toBe('C#')
    expect(fromSolfege('Reb')).toBe('Db')
    expect(fromSolfege('Sib')).toBe('Bb')
  })
  it('throws on invalid syllables', () => {
    expect(() => fromSolfege('Ti')).toThrow()
    expect(() => fromSolfege('XYZ')).toThrow()
  })
})

describe('round-trip', () => {
  it('toSolfege ↔ fromSolfege for all 12 sharp notes', () => {
    const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    sharps.forEach((n) => {
      expect(fromSolfege(toSolfege(n))).toBe(n)
    })
  })
})

describe('solfège scale arrays', () => {
  it('SOLFEGE_SHARPS has 12 entries starting with Do', () => {
    expect(SOLFEGE_SHARPS).toHaveLength(12)
    expect(SOLFEGE_SHARPS[0]).toBe('Do')
  })
  it('SOLFEGE_FLATS spells the tritone as Solb/Gb', () => {
    expect(SOLFEGE_FLATS[6]).toBe('Solb')
    expect(SOLFEGE_SHARPS[6]).toBe('Fa#')
  })
})
