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
 * 12 colors indexed by pitch class (C=0 … B=11). Chosen for hue spread and
 * reasonable contrast on both light and dark surfaces.
 */
export const NOTE_COLORS: readonly string[] = [
  '#e63946', // C  – red
  '#f4a261', // C# – orange
  '#e9c46a', // D  – amber
  '#90a955', // D# – olive
  '#2a9d8f', // E  – teal
  '#43aa8b', // F  – green-teal
  '#577590', // F# – slate-blue
  '#5e60ce', // G  – indigo
  '#7b2cbf', // G# – purple
  '#b5179e', // A  – magenta
  '#d62828', // A# – crimson
  '#06a77d', // B  – green
]

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

/** A readable foreground color (dark or light) for a given background. */
export function readableForeground(hex: string): string {
  return luminance(hex) > 0.45 ? '#1a1a1a' : '#ffffff'
}
