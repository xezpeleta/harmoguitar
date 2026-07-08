import { describe, it, expect } from 'vitest'
import {
  noteToVexKey,
  assignAscendingOctaves,
  toVexKeys,
} from './vexflow'

describe('vexflow utils', () => {
  describe('noteToVexKey', () => {
    it('lowercases the note name and appends the octave', () => {
      expect(noteToVexKey('C', 4)).toBe('c/4')
      expect(noteToVexKey('E', 3)).toBe('e/3')
    })

    it('preserves sharps and flats', () => {
      expect(noteToVexKey('C#', 4)).toBe('c#/4')
      expect(noteToVexKey('Bb', 3)).toBe('bb/3')
      expect(noteToVexKey('Eb', 4)).toBe('eb/4')
    })

    it('handles double accidentals (e.g. Bbb in a dim7 chord)', () => {
      expect(noteToVexKey('Bbb', 4)).toBe('bbb/4')
      expect(noteToVexKey('F##', 4)).toBe('f##/4')
    })
  })

  describe('assignAscendingOctaves', () => {
    it('keeps a major scale in one octave then wraps on the repeat', () => {
      const pitches = assignAscendingOctaves(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
      expect(pitches.map((p) => p.octave)).toEqual([4, 4, 4, 4, 4, 4, 4, 5])
    })

    it('keeps a triad in a single octave', () => {
      const pitches = assignAscendingOctaves(['C', 'E', 'G'])
      expect(pitches.map((p) => p.octave)).toEqual([4, 4, 4])
    })

    it('bumps the 9th of a maj9 chord up an octave', () => {
      // Cmaj9 = C E G B D — the D (degree 9) wraps past B.
      const pitches = assignAscendingOctaves(['C', 'E', 'G', 'B', 'D'])
      expect(pitches.map((p) => p.octave)).toEqual([4, 4, 4, 4, 5])
    })

    it('respects a custom starting octave', () => {
      const pitches = assignAscendingOctaves(['A', 'B', 'C'], 3)
      expect(pitches.map((p) => p.octave)).toEqual([3, 3, 4])
    })

    it('handles an empty list', () => {
      expect(assignAscendingOctaves([])).toEqual([])
    })
  })

  describe('toVexKeys', () => {
    it('produces VexFlow key strings with ascending octaves', () => {
      expect(toVexKeys(['C', 'E', 'G'])).toEqual(['c/4', 'e/4', 'g/4'])
      expect(toVexKeys(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])).toEqual([
        'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5',
      ])
    })

    it('keeps accidentals in the key string', () => {
      expect(toVexKeys(['C', 'Eb', 'G', 'Bb'])).toEqual([
        'c/4', 'eb/4', 'g/4', 'bb/4',
      ])
    })
  })
})
