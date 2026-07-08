import { describe, it, expect } from 'vitest'
import { NOTE_COLORS, noteColor, luminance, readableForeground } from './colors'

describe('NOTE_COLORS', () => {
  it('has exactly 12 colors', () => {
    expect(NOTE_COLORS).toHaveLength(12)
  })
})

describe('noteColor', () => {
  it('C maps to the first color', () => {
    expect(noteColor('C')).toBe(NOTE_COLORS[0])
  })
  it('B maps to the last color', () => {
    expect(noteColor('B')).toBe(NOTE_COLORS[11])
  })
  it('is consistent by pitch class (enharmonic)', () => {
    expect(noteColor('B#')).toBe(noteColor('C'))
    expect(noteColor('Db')).toBe(noteColor('C#'))
  })
  it('each pitch class gets a color', () => {
    for (let pc = 0; pc < 12; pc++) {
      expect(NOTE_COLORS[pc]).toBeTruthy()
    }
  })
})

describe('luminance', () => {
  it('white is ~1', () => {
    expect(luminance('#ffffff')).toBeCloseTo(1, 2)
  })
  it('black is ~0', () => {
    expect(luminance('#000000')).toBeCloseTo(0, 2)
  })
  it('returns 1 for an invalid hex (safe fallback)', () => {
    expect(luminance('not-a-color')).toBe(1)
  })
})

describe('readableForeground', () => {
  it('picks dark text on a light background', () => {
    expect(readableForeground('#ffffff')).toBe('#1a1a1a')
  })
  it('picks light text on a dark background', () => {
    expect(readableForeground('#000000')).toBe('#ffffff')
  })
  it('is deterministic per color', () => {
    expect(readableForeground('#e63946')).toBe(readableForeground('#e63946'))
  })
})
