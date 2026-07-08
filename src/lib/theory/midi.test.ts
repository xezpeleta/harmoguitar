import { describe, it, expect } from 'vitest'
import {
  noteToMidi,
  midiToNote,
  parseNoteWithOctave,
  noteWithOctaveToMidi,
  formatNoteWithOctave,
  notesToAscendingMidis,
} from './midi'

describe('noteToMidi', () => {
  it('middle C (C4) = 60', () => {
    expect(noteToMidi('C', 4)).toBe(60)
  })
  it('guitar open strings', () => {
    expect(noteToMidi('E', 2)).toBe(40) // low E
    expect(noteToMidi('A', 2)).toBe(45)
    expect(noteToMidi('D', 3)).toBe(50)
    expect(noteToMidi('G', 3)).toBe(55)
    expect(noteToMidi('B', 3)).toBe(59)
    expect(noteToMidi('E', 4)).toBe(64) // high E
  })
  it('handles sharps and flats', () => {
    expect(noteToMidi('F#', 4)).toBe(66)
    expect(noteToMidi('Bb', 3)).toBe(58)
  })
})

describe('midiToNote', () => {
  it('60 → C4', () => {
    expect(midiToNote(60)).toEqual({ note: 'C', octave: 4 })
  })
  it('40 → E2', () => {
    expect(midiToNote(40)).toEqual({ note: 'E', octave: 2 })
  })
  it('prefers flats when asked', () => {
    expect(midiToNote(58, true)).toEqual({ note: 'Bb', octave: 3 })
    expect(midiToNote(58, false)).toEqual({ note: 'A#', octave: 3 })
  })
  it('round-trips noteToMidi ↔ midiToNote', () => {
    for (let m = 36; m <= 84; m++) {
      const { note, octave } = midiToNote(m)
      expect(noteToMidi(note, octave)).toBe(m)
    }
  })
})

describe('parseNoteWithOctave', () => {
  it('parses "E2"', () => {
    expect(parseNoteWithOctave('E2')).toEqual({ note: 'E', octave: 2 })
  })
  it('parses "Bb3"', () => {
    expect(parseNoteWithOctave('Bb3')).toEqual({ note: 'Bb', octave: 3 })
  })
  it('parses "F#4"', () => {
    expect(parseNoteWithOctave('F#4')).toEqual({ note: 'F#', octave: 4 })
  })
  it('noteWithOctaveToMidi matches noteToMidi', () => {
    expect(noteWithOctaveToMidi('E2')).toBe(40)
    expect(noteWithOctaveToMidi('C4')).toBe(60)
  })
  it('throws on invalid input', () => {
    expect(() => parseNoteWithOctave('E')).toThrow()
    expect(() => parseNoteWithOctave('H2')).toThrow()
  })
  it('formatNoteWithOctave', () => {
    expect(formatNoteWithOctave('E', 2)).toBe('E2')
    expect(formatNoteWithOctave('Bb', 3)).toBe('Bb3')
  })
})

describe('notesToAscendingMidis', () => {
  it('maps a C major scale to ascending MIDI numbers', () => {
    // C4 D4 E4 F4 G4 A4 B4 C5
    const midis = notesToAscendingMidis(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'])
    expect(midis).toEqual([60, 62, 64, 65, 67, 69, 71, 72])
  })

  it('bumps the octave when the letter wraps', () => {
    // A B C → A4 B4 C5
    expect(notesToAscendingMidis(['A', 'B', 'C'])).toEqual([69, 71, 72])
  })

  it('respects the startOctave argument', () => {
    const midis = notesToAscendingMidis(['C', 'D'], 3)
    expect(midis).toEqual([48, 50])
  })

  it('handles accidentals (keeps the same octave until letter wraps)', () => {
    // C C# D D# E — all letters ascend, so same octave.
    expect(notesToAscendingMidis(['C', 'C#', 'D', 'D#', 'E'])).toEqual([
      60, 61, 62, 63, 64,
    ])
  })

  it('returns an empty array for no notes', () => {
    expect(notesToAscendingMidis([])).toEqual([])
  })
})
