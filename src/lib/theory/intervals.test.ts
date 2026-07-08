import { describe, it, expect } from 'vitest'
import {
  intervalBetween,
  interval,
  parseInterval,
  intervalSemitones,
  transposeByInterval,
  semitonesBetween,
  qualityFor,
  simpleInterval,
  SIMPLE_INTERVALS,
} from './intervals'

describe('intervalBetween (enharmonic-correct)', () => {
  it('names perfect intervals', () => {
    expect(intervalBetween('C', 'G').name).toBe('P5')
    expect(intervalBetween('C', 'F').name).toBe('P4')
    expect(intervalBetween('C', 'C').name).toBe('P1')
  })

  it('names major/minor thirds', () => {
    expect(intervalBetween('C', 'E').name).toBe('M3')
    expect(intervalBetween('C', 'Eb').name).toBe('m3')
    expect(intervalBetween('A', 'C').name).toBe('m3')
    expect(intervalBetween('A', 'C#').name).toBe('M3')
  })

  it('distinguishes A4 from d5 by spelling', () => {
    expect(intervalBetween('C', 'F#').name).toBe('A4')
    expect(intervalBetween('C', 'Gb').name).toBe('d5')
  })

  it('names sevenths', () => {
    expect(intervalBetween('C', 'B').name).toBe('M7')
    expect(intervalBetween('C', 'Bb').name).toBe('m7')
    expect(intervalBetween('G', 'F').name).toBe('m7')
    expect(intervalBetween('G', 'F#').name).toBe('M7')
  })

  it('reports semitones and symbols', () => {
    const i = intervalBetween('C', 'Bb')
    expect(i.semitones).toBe(10)
    expect(i.symbol).toBe('b7')
    expect(i.degree).toBe(7)
    expect(i.quality).toBe('m')
  })
})

describe('interval() builder', () => {
  it('builds from degree + semitones', () => {
    expect(interval(5, 7).name).toBe('P5')
    expect(interval(3, 4).name).toBe('M3')
    expect(interval(3, 3).name).toBe('m3')
    expect(interval(4, 6).name).toBe('A4')
    expect(interval(5, 6).name).toBe('d5')
  })
})

describe('qualityFor', () => {
  it('perfect family', () => {
    expect(qualityFor(5, 7)).toBe('P')
    expect(qualityFor(5, 8)).toBe('A')
    expect(qualityFor(5, 6)).toBe('d')
    expect(qualityFor(1, 0)).toBe('P')
    expect(qualityFor(4, 6)).toBe('A')
    expect(qualityFor(4, 5)).toBe('P')
  })
  it('major/minor family', () => {
    expect(qualityFor(3, 4)).toBe('M')
    expect(qualityFor(3, 3)).toBe('m')
    expect(qualityFor(3, 5)).toBe('A')
    expect(qualityFor(3, 2)).toBe('d')
    expect(qualityFor(7, 11)).toBe('M')
    expect(qualityFor(7, 10)).toBe('m')
  })
})

describe('parseInterval / intervalSemitones', () => {
  it('parses simple intervals', () => {
    expect(intervalSemitones('P5')).toBe(7)
    expect(intervalSemitones('M3')).toBe(4)
    expect(intervalSemitones('m3')).toBe(3)
    expect(intervalSemitones('m7')).toBe(10)
    expect(intervalSemitones('M7')).toBe(11)
    expect(intervalSemitones('P1')).toBe(0)
    expect(intervalSemitones('A4')).toBe(6)
    expect(intervalSemitones('d5')).toBe(6)
  })

  it('parses compound intervals (9/11/13)', () => {
    expect(intervalSemitones('M9')).toBe(14)
    expect(intervalSemitones('m9')).toBe(13)
    expect(intervalSemitones('P11')).toBe(17)
    expect(intervalSemitones('M13')).toBe(21)
  })

  it('throws on invalid names', () => {
    expect(() => parseInterval('X5')).toThrow()
    expect(() => parseInterval('M')).toThrow()
  })
})

describe('transposeByInterval', () => {
  it('transposes by interval name', () => {
    expect(transposeByInterval('C', 'M3')).toBe('E')
    expect(transposeByInterval('C', 'm3')).toBe('Eb')
    expect(transposeByInterval('C', 'P5')).toBe('G')
    expect(transposeByInterval('G', 'M7')).toBe('F#')
    expect(transposeByInterval('A', 'P4')).toBe('D')
  })
})

describe('semitonesBetween', () => {
  it('is always ascending 0–11', () => {
    expect(semitonesBetween('C', 'G')).toBe(7)
    expect(semitonesBetween('G', 'C')).toBe(5)
    expect(semitonesBetween('C', 'C')).toBe(0)
  })
})

describe('SIMPLE_INTERVALS table', () => {
  it('has 12 entries indexed by semitone', () => {
    expect(SIMPLE_INTERVALS).toHaveLength(12)
    SIMPLE_INTERVALS.forEach((info, i) => expect(info.semitones).toBe(i))
  })
  it('simpleInterval wraps modulo 12', () => {
    expect(simpleInterval(7).name).toBe('Perfect 5th')
    expect(simpleInterval(19).name).toBe('Perfect 5th') // 19 % 12 = 7
    expect(simpleInterval(6).name).toBe('Tritone')
  })
})
