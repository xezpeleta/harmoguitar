import { describe, it, expect, beforeEach } from 'vitest'
import { app } from './app.svelte'
import { toPitchClass } from '$lib/theory/notes'

describe('AppStore — defaults', () => {
  beforeEach(() => app.reset())

  it('starts on C with no chord/scale', () => {
    expect(app.rootNote).toBe('C')
    expect(app.chordType).toBeNull()
    expect(app.scaleType).toBeNull()
    expect(app.mode).toBe('free')
  })

  it('defaults to standard tuning and 15 frets', () => {
    expect(app.tuning.name).toContain('Standard')
    expect(app.fretCount).toBe(15)
  })
})

describe('AppStore — chord selection', () => {
  beforeEach(() => app.reset())

  it('selectChord sets root, type, mode', () => {
    app.selectChord('G', 'dom7')
    expect(app.rootNote).toBe('G')
    expect(app.chordType).toBe('dom7')
    expect(app.mode).toBe('chord')
  })

  it('currentChordNotes derives G7 = G B D F', () => {
    app.selectChord('G', 'dom7')
    expect(app.currentChordNotes).toEqual(['G', 'B', 'D', 'F'])
  })

  it('highlightNotes follows the chord', () => {
    app.selectChord('C', 'maj7')
    expect(app.highlightNotes).toEqual(['C', 'E', 'G', 'B'])
  })

  it('selectChord clears any scale and free selection', () => {
    app.selectScale('D', 'dorian')
    app.toggleNote('A')
    app.selectChord('C', 'major')
    expect(app.scaleType).toBeNull()
    expect(app.selectedNotes).toEqual([])
    expect(app.mode).toBe('chord')
  })
})

describe('AppStore — scale selection', () => {
  beforeEach(() => app.reset())

  it('selectScale sets root, type, mode', () => {
    app.selectScale('A', 'natural-minor')
    expect(app.rootNote).toBe('A')
    expect(app.scaleType).toBe('natural-minor')
    expect(app.mode).toBe('scale')
  })

  it('currentScaleNotes derives A natural minor', () => {
    app.selectScale('A', 'natural-minor')
    expect(app.currentScaleNotes).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
  })

  it('highlightNotes follows the scale', () => {
    app.selectScale('C', 'major')
    expect(app.highlightNotes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })
})

describe('AppStore — free exploration', () => {
  beforeEach(() => app.reset())

  it('toggleNote adds and removes by pitch class', () => {
    app.toggleNote('C')
    app.toggleNote('E')
    expect(app.selectedNotes).toEqual(['C', 'E'])
    // enharmonic toggle removes
    app.toggleNote('B#')
    expect(app.selectedNotes).toEqual(['E'])
  })

  it('highlightNotes falls back to selectedNotes in free mode', () => {
    app.toggleNote('G')
    expect(app.mode).toBe('free')
    expect(app.highlightNotes).toEqual(['G'])
  })

  it('chord/scale takes priority over free selection for highlights', () => {
    app.toggleNote('F')
    app.selectChord('C', 'major')
    expect(app.highlightNotes).toEqual(['C', 'E', 'G'])
  })
})

describe('AppStore — highlight helpers', () => {
  beforeEach(() => app.reset())

  it('isHighlighted matches by pitch class', () => {
    app.selectChord('C', 'major')
    expect(app.isHighlighted('C')).toBe(true)
    expect(app.isHighlighted('E')).toBe(true)
    expect(app.isHighlighted('B#')).toBe(true) // enharmonic of C
    expect(app.isHighlighted('F#')).toBe(false)
  })

  it('isRoot matches the root pitch class', () => {
    app.selectChord('G', 'dom7')
    expect(app.isRoot('G')).toBe(true)
    expect(app.isRoot('G#')).toBe(false)
    expect(app.isRoot('B')).toBe(false)
  })

  it('highlightPitchClasses is a set of pitch classes', () => {
    app.selectScale('C', 'major')
    expect(app.highlightPitchClasses.has(toPitchClass('C'))).toBe(true)
    expect(app.highlightPitchClasses.has(toPitchClass('B'))).toBe(true)
    expect(app.highlightPitchClasses.has(toPitchClass('F#'))).toBe(false)
  })
})

describe('AppStore — key / diatonic context', () => {
  beforeEach(() => app.reset())

  it('setKey updates key and scale type', () => {
    app.setKey('G', 'major')
    expect(app.key).toBe('G')
    expect(app.keyScaleType).toBe('major')
  })

  it('setKey defaults to current key scale type', () => {
    app.setKey('A', 'natural-minor')
    app.setKey('E')
    expect(app.keyScaleType).toBe('natural-minor')
  })
})

describe('AppStore — setRoot keeps active type', () => {
  beforeEach(() => app.reset())

  it('changing root transposes the active chord', () => {
    app.selectChord('C', 'maj7')
    app.setRoot('G')
    expect(app.chordType).toBe('maj7')
    expect(app.currentChordNotes).toEqual(['G', 'B', 'D', 'F#'])
  })
})

describe('AppStore — clear & reset', () => {
  it('clearSelection empties chord/scale/free but keeps prefs', () => {
    app.reset()
    app.selectChord('C', 'major')
    app.showSolfege = true
    app.clearSelection()
    expect(app.chordType).toBeNull()
    expect(app.scaleType).toBeNull()
    expect(app.selectedNotes).toEqual([])
    expect(app.mode).toBe('free')
    expect(app.showSolfege).toBe(true) // prefs preserved
  })

  it('reset restores all defaults', () => {
    app.selectScale('Eb', 'locrian')
    app.showSolfege = true
    app.preferFlats = true
    app.fretCount = 22
    app.reset()
    expect(app.rootNote).toBe('C')
    expect(app.scaleType).toBeNull()
    expect(app.showSolfege).toBe(false)
    expect(app.preferFlats).toBe(false)
    expect(app.fretCount).toBe(15)
  })
})
