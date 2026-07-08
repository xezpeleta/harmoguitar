import { describe, it, expect } from 'vitest'
import {
  scaleNotes,
  scaleIntervals,
  scaleIntervalObjects,
  modeOf,
  modesOf,
  SCALE_FORMULAS,
} from './scales'

describe('scaleNotes — major', () => {
  it('C major has no accidentals', () => {
    expect(scaleNotes('C', 'major')).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })
  it('G major has F#', () => {
    expect(scaleNotes('G', 'major')).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#'])
  })
  it('D major has F# and C#', () => {
    expect(scaleNotes('D', 'major')).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#'])
  })
  it('F major has Bb', () => {
    expect(scaleNotes('F', 'major')).toEqual(['F', 'G', 'A', 'Bb', 'C', 'D', 'E'])
  })
  it('Eb major has 3 flats', () => {
    expect(scaleNotes('Eb', 'major')).toEqual(['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'])
  })
  it('A major has 3 sharps', () => {
    expect(scaleNotes('A', 'major')).toEqual(['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'])
  })
})

describe('scaleNotes — minor scales', () => {
  it('A natural minor has no accidentals', () => {
    expect(scaleNotes('A', 'natural-minor')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  })
  it('A harmonic minor has G#', () => {
    expect(scaleNotes('A', 'harmonic-minor')).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G#'])
  })
  it('A melodic minor has F# and G#', () => {
    expect(scaleNotes('A', 'melodic-minor')).toEqual(['A', 'B', 'C', 'D', 'E', 'F#', 'G#'])
  })
  it('C natural minor has 3 flats', () => {
    expect(scaleNotes('C', 'natural-minor')).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'])
  })
  it('E harmonic minor has D#', () => {
    expect(scaleNotes('E', 'harmonic-minor')).toEqual(['E', 'F#', 'G', 'A', 'B', 'C', 'D#'])
  })
})

describe('scaleNotes — pentatonic & blues', () => {
  it('C major pentatonic', () => {
    expect(scaleNotes('C', 'major-pentatonic')).toEqual(['C', 'D', 'E', 'G', 'A'])
  })
  it('A minor pentatonic', () => {
    expect(scaleNotes('A', 'minor-pentatonic')).toEqual(['A', 'C', 'D', 'E', 'G'])
  })
  it('C minor pentatonic spells Eb and Bb', () => {
    expect(scaleNotes('C', 'minor-pentatonic')).toEqual(['C', 'Eb', 'F', 'G', 'Bb'])
  })
  it('C blues adds the flat-5 (Gb)', () => {
    expect(scaleNotes('C', 'blues')).toEqual(['C', 'Eb', 'F', 'Gb', 'G', 'Bb'])
  })
  it('A blues', () => {
    expect(scaleNotes('A', 'blues')).toEqual(['A', 'C', 'D', 'Eb', 'E', 'G'])
  })
})

describe('scaleNotes — modes', () => {
  it('D dorian (2nd mode of C major)', () => {
    expect(scaleNotes('D', 'dorian')).toEqual(['D', 'E', 'F', 'G', 'A', 'B', 'C'])
  })
  it('E phrygian has a flat-2', () => {
    expect(scaleNotes('E', 'phrygian')).toEqual(['E', 'F', 'G', 'A', 'B', 'C', 'D'])
  })
  it('F lydian has a #4', () => {
    expect(scaleNotes('F', 'lydian')).toEqual(['F', 'G', 'A', 'B', 'C', 'D', 'E'])
  })
  it('G mixolydian has a b7', () => {
    expect(scaleNotes('G', 'mixolydian')).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F'])
  })
  it('B locrian', () => {
    expect(scaleNotes('B', 'locrian')).toEqual(['B', 'C', 'D', 'E', 'F', 'G', 'A'])
  })
})

describe('scaleIntervals', () => {
  it('major scale intervals', () => {
    expect(scaleIntervals('major')).toEqual(['1', '2', '3', '4', '5', '6', '7'])
  })
  it('harmonic minor intervals', () => {
    expect(scaleIntervals('harmonic-minor')).toEqual(['1', '2', 'b3', '4', '5', 'b6', '7'])
  })
  it('minor pentatonic intervals', () => {
    expect(scaleIntervals('minor-pentatonic')).toEqual(['1', 'b3', '4', '5', 'b7'])
  })
  it('blues intervals include the b5', () => {
    expect(scaleIntervals('blues')).toEqual(['1', 'b3', '4', 'b5', '5', 'b7'])
  })
  it('scaleIntervalObjects returns full objects', () => {
    const objs = scaleIntervalObjects('major')
    expect(objs[2]!.name).toBe('M3')
    expect(objs[6]!.name).toBe('M7')
  })
})

describe('modes', () => {
  it('modeOf finds the dorian mode of C major', () => {
    expect(modeOf('C', 2)).toEqual({ type: 'dorian', root: 'D', name: 'Dorian' })
  })
  it('modeOf finds the mixolydian mode of C major', () => {
    expect(modeOf('C', 5)).toEqual({ type: 'mixolydian', root: 'G', name: 'Mixolydian' })
  })
  it('modesOf returns all 7 modes with correct roots', () => {
    const m = modesOf('C')
    expect(m).toHaveLength(7)
    expect(m.map((x) => x.root)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    expect(m.map((x) => x.type)).toEqual([
      'ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian',
    ])
  })
  it('modesOf for G major', () => {
    const m = modesOf('G')
    expect(m.map((x) => x.root)).toEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F#'])
  })
})

describe('SCALE_FORMULAS completeness', () => {
  it('every scale type has a formula', () => {
    const types: (keyof typeof SCALE_FORMULAS)[] = [
      'major', 'natural-minor', 'harmonic-minor', 'melodic-minor',
      'major-pentatonic', 'minor-pentatonic', 'blues',
      'ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian',
    ]
    types.forEach((t) => expect(SCALE_FORMULAS[t].length).toBeGreaterThan(0))
  })
})
