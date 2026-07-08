import { describe, it, expect } from 'vitest'
import {
  buildFretboard,
  findPositions,
  STANDARD_TUNING,
  TUNINGS,
  isOctaveMarker,
  INLAY_FRETS,
} from './fretboard'
import { toPitchClass } from './notes'

describe('buildFretboard', () => {
  it('returns 6 strings', () => {
    const board = buildFretboard()
    expect(board).toHaveLength(6)
  })

  it('open strings are E A D G B E (low to high)', () => {
    const board = buildFretboard()
    const openNotes = board.map((s) => s[0]!.note)
    expect(openNotes).toEqual(['E', 'A', 'D', 'G', 'B', 'E'])
  })

  it('open string MIDI values match standard tuning', () => {
    const board = buildFretboard()
    const openMidis = board.map((s) => s[0]!.midi)
    expect(openMidis).toEqual([40, 45, 50, 55, 59, 64])
  })

  it('string numbers go 6 (low) to 1 (high)', () => {
    const board = buildFretboard()
    const numbers = board.map((s) => s[0]!.stringNumber)
    expect(numbers).toEqual([6, 5, 4, 3, 2, 1])
  })

  it('fret 0 of low string is E2', () => {
    const board = buildFretboard()
    expect(board[0]![0]).toMatchObject({ note: 'E', octave: 2, fret: 0 })
  })

  it('fret 1 of low E string is F2 (one semitone up)', () => {
    const board = buildFretboard()
    expect(board[0]![1]).toMatchObject({ note: 'F', octave: 2, fret: 1 })
  })

  it('fret 12 is the octave (same note, +1 octave)', () => {
    const board = buildFretboard()
    const open = board[0]![0]!
    const fret12 = board[0]![12]!
    expect(fret12.note).toBe(open.note)
    expect(fret12.octave).toBe(open.octave + 1)
    expect(fret12.midi).toBe(open.midi + 12)
  })

  it('each string has fretCount+1 positions', () => {
    const board = buildFretboard(STANDARD_TUNING, 12)
    board.forEach((s) => expect(s).toHaveLength(13))
  })

  it('pitch class wraps correctly across the octave', () => {
    const board = buildFretboard()
    const lowE = board[0]!
    // fret 0 = E (pc 4), fret 12 = E (pc 4)
    expect(lowE[0]!.pitchClass).toBe(toPitchClass('E'))
    expect(lowE[12]!.pitchClass).toBe(toPitchClass('E'))
  })
})

describe('findPositions', () => {
  it('finds all C notes on a 12-fret standard board', () => {
    const positions = findPositions('C', STANDARD_TUNING, 12)
    // Every position should be a C (pitch class 0)
    positions.forEach((p) => expect(p.pitchClass).toBe(0))
    // There should be several C notes across 6 strings × 13 frets
    expect(positions.length).toBeGreaterThan(4)
  })

  it('matches by pitch class (enharmonic)', () => {
    const c = findPositions('C', STANDARD_TUNING, 5)
    const bsharp = findPositions('B#', STANDARD_TUNING, 5)
    expect(c.length).toBe(bsharp.length)
  })

  it('finds the open G on string 3', () => {
    const positions = findPositions('G', STANDARD_TUNING, 0)
    expect(positions.some((p) => p.stringNumber === 3 && p.fret === 0)).toBe(true)
  })
})

describe('tunings', () => {
  it('drop-d lowers the low E to D', () => {
    const board = buildFretboard(TUNINGS['drop-d']!, 0)
    expect(board[0]![0]!.note).toBe('D')
  })
  it('dadgad open notes', () => {
    const board = buildFretboard(TUNINGS['dadgad']!, 0)
    expect(board.map((s) => s[0]!.note)).toEqual(['D', 'A', 'D', 'G', 'A', 'D'])
  })
})

describe('markers', () => {
  it('isOctaveMarker for 0 and 12', () => {
    expect(isOctaveMarker(0)).toBe(true)
    expect(isOctaveMarker(12)).toBe(true)
    expect(isOctaveMarker(24)).toBe(true)
    expect(isOctaveMarker(5)).toBe(false)
  })
  it('INLAY_FRETS includes 3,5,7,9,12', () => {
    expect(INLAY_FRETS).toContain(3)
    expect(INLAY_FRETS).toContain(12)
  })
})
