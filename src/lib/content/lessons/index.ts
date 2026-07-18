/**
 * lessons/index.ts — The learning path.
 *
 * Lessons are ordered here (the array order = the path order). Prev/next
 * navigation is derived from this list, so reordering or inserting a lesson
 * is just moving an entry in the array — no manual link surgery.
 *
 * Foundations (lessons 1–15) map to RESEARCH.md §1–§14 plus the fretboard-
 * landscape visualization (Lesson 4). Lessons 16–28 cover the full deep jazz
 * harmony path of §15–§28 — secondary dominants, tritone substitution, voice
 * leading & guide tones, passing chords & inversions, comping voicings,
 * pentatonics & blue notes, the minor ii–V–i, the altered scale, borrowed
 * chords & modal mixture, chord-scale theory, modal jazz & quartal harmony,
 * harmonic & melodic minor modes, and reharmonization. Lessons 29–31 are the
 * mastery & practice capstones — associative voicing inversions, the phrase
 * dictionary, and the multisensory practice method (RESEARCH.md §29).
 */
import type { Lesson } from '$lib/content/schema'
import { notesFretboard } from './01-notes-fretboard'
import { intervals } from './02-intervals'
import { majorScale } from './03-major-scale'
import { fretboardLandscape } from './04-fretboard-landscape'
import { minorScales } from './05-minor-scales'
import { modes } from './06-modes'
import { triads } from './07-triads'
import { seventhChords } from './08-seventh-chords'
import { extendedChords } from './09-extended-chords'
import { diatonicHarmony } from './10-diatonic-harmony'
import { functionalHarmony } from './11-functional-harmony'
import { circleOfFifths } from './12-circle-of-fifths'
import { progressions } from './13-progressions'
import { cadences } from './14-cadences'
import { bluesAndIIVI } from './15-blues-ii-v-i'
import { secondaryDominants } from './16-secondary-dominants'
import { tritoneSubstitution } from './17-tritone-substitution'
import { voiceLeadingGuideTones } from './18-voice-leading-guide-tones'
import { passingChordsInversions } from './19-passing-chords-inversions'
import { jazzCompingVoicings } from './20-jazz-comping-voicings'
import { pentatonicBlueNotes } from './21-pentatonic-blue-notes'
import { minorIIVi } from './22-minor-ii-v-i'
import { alteredScale } from './23-altered-scale'
import { borrowedChords } from './24-borrowed-chords'
import { chordScaleTheory } from './25-chord-scale-theory'
import { modalJazz } from './26-modal-jazz-quartal'
import { harmonicMelodicMinor } from './27-harmonic-melodic-minor'
import { reharmonization } from './28-reharmonization'
import { associativeVoicingInversions } from './29-associative-voicing-inversions'
import { phraseDictionary } from './30-phrase-dictionary'
import { howToPractice } from './31-how-to-practice'

/**
 * The learning path, in order. Adding a lesson = adding an entry here.
 * Source: RESEARCH.md §1–§14 (foundations) + §15–§28 (jazz) + §29 (practice).
 */
export const LESSONS: readonly Lesson[] = [
  notesFretboard,
  intervals,
  majorScale,
  fretboardLandscape,
  minorScales,
  modes,
  triads,
  seventhChords,
  extendedChords,
  diatonicHarmony,
  functionalHarmony,
  circleOfFifths,
  progressions,
  cadences,
  bluesAndIIVI,
  secondaryDominants,
  tritoneSubstitution,
  voiceLeadingGuideTones,
  passingChordsInversions,
  jazzCompingVoicings,
  pentatonicBlueNotes,
  minorIIVi,
  alteredScale,
  borrowedChords,
  chordScaleTheory,
  modalJazz,
  harmonicMelodicMinor,
  reharmonization,
  associativeVoicingInversions,
  phraseDictionary,
  howToPractice,
]

/** Look up a lesson by its slug (for hash-route resolution). */
export function lessonBySlug(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug)
}

/** The lesson before the given one (or undefined for the first). */
export function prevLesson(lesson: Lesson): Lesson | undefined {
  const i = LESSONS.indexOf(lesson)
  return i > 0 ? LESSONS[i - 1] : undefined
}

/** The lesson after the given one (or undefined for the last). */
export function nextLesson(lesson: Lesson): Lesson | undefined {
  const i = LESSONS.indexOf(lesson)
  return i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : undefined
}
