/**
 * colors.ts — Pitch-class → color mapping (color-blind-aware).
 *
 * Color is always SUPPLEMENTARY: every note is also shown with a text label, so
 * the UI is never color-only. The palette spreads hues across the 12 pitch
 * classes with roughly consistent lightness so adjacent notes stay distinct.
 *
 * Reference: PLAN.md Task 2.5, PROJECT.md a11y requirement (not color-only).
 */
import { toPitchClass, type NoteName } from '$lib/theory/notes'

/**
 * 12 colors indexed by pitch class (C=0 … B=11).
 *
 * Design: the 7 NATURAL notes (C D E F G A B) get 7 vivid, maximally distinct
 * hues (min CIE76 ΔE = 30 between any two). The 5 accidentals (C# D# F# G# A#)
 * share a single neutral gray, grouping them visually as the "chromatic" notes.
 *
 * This makes the diatonic foundation pop: on a C-major fretboard the 7 scale
 * tones are instantly distinguishable, while accidentals read as a unified
 * secondary tier. (Color is always supplementary to the text label — see the
 * a11y note at the top of this file.)
 */
export const NOTE_COLORS: readonly string[] = [
  '#d62828', // C  – red
  '#6c757d', // C# – gray (accidental)
  '#f77f00', // D  – orange
  '#6c757d', // D# – gray (accidental)
  '#2a9d8f', // E  – teal
  '#1d72b8', // F  – blue
  '#6c757d', // F# – gray (accidental)
  '#7209b7', // G  – purple
  '#6c757d', // G# – gray (accidental)
  '#d6336c', // A  – pink
  '#6c757d', // A# – gray (accidental)
  '#386641', // B  – forest green
]

/** Neutral gray used for all accidental (sharp/flat) pitch classes. */
export const ACCIDENTAL_COLOR = '#6c757d'

/** The color for a given note (by pitch class). */
export function noteColor(note: NoteName): string {
  return NOTE_COLORS[toPitchClass(note)] ?? NOTE_COLORS[0]!
}

/**
 * Approximate relative luminance of a hex color (0–1), per the WCAG formula.
 * Used to pick readable foreground text on a colored background.
 */
export function luminance(hex: string): number {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return 1
  const n = parseInt(m[1]!, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  const ch = (c: number): number => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
}

/** A readable foreground color (dark or light) for a given background.
 * Computes the actual WCAG contrast ratio for both black and white and picks
 * the higher one, so medium-luminance backgrounds (e.g. slate-blue, crimson)
 * correctly get white text instead of failing with dark text. */
export function readableForeground(hex: string): string {
  const bg = luminance(hex)
  const dark = '#1a1a1a'
  const light = '#ffffff'
  const dLum = luminance(dark)
  const lLum = luminance(light)
  const ratio = (a: number, b: number): number =>
    (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
  return ratio(bg, dLum) >= ratio(bg, lLum) ? dark : light
}
