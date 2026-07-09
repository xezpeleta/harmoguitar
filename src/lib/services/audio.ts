/**
 * audio.ts — Synthesized guitar-like playback via the Web Audio API.
 *
 * A singleton `AudioEngine` that lazily creates an `AudioContext` (browsers
 * suspend it until a user gesture; `playNote` resumes it). Timbre is a
 * subtractive pluck: a triangle + detuned sawtooth oscillator pair through a
 * lowpass filter whose cutoff sweeps down, shaped by a fast-attack exponential
 * gain envelope — cheap, but recognisably string-like.
 *
 * The engine degrades gracefully: if `AudioContext` is unavailable (jsdom,
 * disabled APIs), every method is a silent no-op. All calls are wrapped in
 * try/catch so a playback failure never breaks the UI.
 *
 * Reference: PLAN.md Task 2.2, PROJECT.md ("Synthesized Web Audio").
 */
import { noteToMidi } from '$lib/theory/midi'
import { toPitchClass, type NoteName } from '$lib/theory/notes'
import { STANDARD_TUNING, buildFretboard } from '$lib/theory/fretboard'

/** How a chord's notes are spread in time. */
export type ChordMode = 'block' | 'arpeggio' | 'strum'

export interface PlayNoteOptions {
  /** Duration in seconds (default ~1.4). */
  duration?: number
  /** Gain 0–1 (default 0.6). */
  velocity?: number
  /** Delay before onset, in seconds (default 0). */
  when?: number
}

export interface PlayChordOptions {
  mode?: ChordMode
  /** Per-note stagger for arpeggio/strum, in seconds (default 0.09). */
  stagger?: number
  duration?: number
  velocity?: number
}

/** Options for interval playback (a root + a second note above it). */
export interface PlayIntervalOptions {
  /** Delay between the root and the interval note, in seconds (default 0.32). */
  melodicGap?: number
  /** Delay between the start of consecutive intervals, in seconds (default 0.62). */
  intervalGap?: number
  /** How long each note rings, in seconds (default 0.9). */
  duration?: number
  velocity?: number
}

/** Convert a MIDI note number to its frequency in Hz (A4 = 440). */
export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  /** Active voices, tracked so `stopAll` can silence them. */
  private active = new Set<OscillatorNode>()
  private volume = 0.6

  /** True if the Web Audio API is available in this environment. */
  get available(): boolean {
    return typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined'
  }

  /** Master output volume (0–1). */
  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v))
    if (this.master) this.master.gain.value = this.volume
  }

  /**
   * Lazily create (and resume) the AudioContext. Returns null if unavailable.
   * Safe to call repeatedly.
   */
  private ensureContext(): AudioContext | null {
    if (!this.available) return null
    if (!this.ctx) {
      const Ctor: typeof AudioContext =
        typeof AudioContext !== 'undefined' ? AudioContext : webkitAudioContext!
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.volume
      this.master.connect(this.ctx.destination)
    }
    // Browsers suspend the context until a user gesture; resume on every call.
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
    return this.ctx
  }

  /** Build one plucked voice (oscillators → filter → gain envelope). */
  private voice(midi: number, when: number, duration: number, velocity: number): void {
    const ctx = this.ctx
    const master = this.master
    if (!ctx || !master) return

    const freq = midiToFreq(midi)

    // Two oscillators: triangle (mellow body) + detuned sawtooth (brightness).
    const tri = ctx.createOscillator()
    tri.type = 'triangle'
    tri.frequency.value = freq

    const saw = ctx.createOscillator()
    saw.type = 'sawtooth'
    saw.frequency.value = freq
    saw.detune.value = 6 // slight chorusing

    const triGain = ctx.createGain()
    triGain.gain.value = 0.6
    const sawGain = ctx.createGain()
    sawGain.gain.value = 0.4

    // Lowpass that sweeps from bright to dark over the note's life.
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.Q.value = 1
    const startCut = Math.min(6000, freq * 8)
    const endCut = Math.max(400, freq * 1.5)
    filter.frequency.setValueAtTime(startCut, when)
    filter.frequency.exponentialRampToValueAtTime(endCut, when + duration)

    // Pluck envelope: ~6ms attack, exponential decay.
    const env = ctx.createGain()
    const peak = Math.max(0.0001, velocity)
    env.gain.setValueAtTime(0.0001, when)
    env.gain.exponentialRampToValueAtTime(peak, when + 0.006)
    env.gain.exponentialRampToValueAtTime(0.0001, when + duration)

    tri.connect(triGain).connect(filter)
    saw.connect(sawGain).connect(filter)
    filter.connect(env).connect(master)

    tri.start(when)
    saw.start(when)
    tri.stop(when + duration + 0.05)
    saw.stop(when + duration + 0.05)

    this.active.add(tri)
    this.active.add(saw)
    const cleanup = (): void => {
      this.active.delete(tri)
      this.active.delete(saw)
    }
    tri.onended = cleanup
    saw.onended = cleanup
  }

  /** Play a single note (by MIDI number). */
  playNote(midi: number, opts: PlayNoteOptions = {}): void {
    try {
      const ctx = this.ensureContext()
      if (!ctx) return
      const when = ctx.currentTime + (opts.when ?? 0)
      const duration = opts.duration ?? 1.4
      const velocity = (opts.velocity ?? 0.6) * 0.5 // voice blends two oscs
      this.voice(midi, when, duration, velocity)
    } catch (err) {
      console.error('AudioEngine.playNote failed:', err)
    }
  }

  /** Play a note by name + octave-less convenience (uses a mid-range octave). */
  playNoteName(note: NoteName, octave = 4, opts: PlayNoteOptions = {}): void {
    try {
      this.playNote(noteToMidi(note, octave), opts)
    } catch {
      /* invalid note — ignore */
    }
  }

  /** Play several MIDI notes together with a chosen time spread. */
  playChord(midis: number[], opts: PlayChordOptions = {}): void {
    try {
      const ctx = this.ensureContext()
      if (!ctx || midis.length === 0) return
      const mode = opts.mode ?? 'block'
      const stagger = opts.stagger ?? 0.09
      const duration = opts.duration ?? 1.6
      const velocity = (opts.velocity ?? 0.6) * 0.5

      midis.forEach((midi, i) => {
        const offset =
          mode === 'block' ? 0
          : mode === 'arpeggio' ? i * stagger
          : /* strum */ i * (stagger * 0.6)
        this.voice(midi, ctx.currentTime + offset, duration, velocity)
      })
    } catch (err) {
      console.error('AudioEngine.playChord failed:', err)
    }
  }

  /** Play notes in sequence (e.g. a scale), ascending in time. */
  playSequence(midis: number[], opts: PlayChordOptions = {}): void {
    try {
      const ctx = this.ensureContext()
      if (!ctx || midis.length === 0) return
      const stagger = opts.stagger ?? 0.16
      const duration = opts.duration ?? 0.7
      const velocity = (opts.velocity ?? 0.6) * 0.5
      midis.forEach((midi, i) => {
        this.voice(midi, ctx.currentTime + i * stagger, duration, velocity)
      })
    } catch (err) {
      console.error('AudioEngine.playSequence failed:', err)
    }
  }

  /**
   * Play a single interval: the root, then the note `semitones` above it,
   * overlapping so the listener hears the distance melodically and then
   * harmonically. `semitones` may be 0 (unison) or 12 (octave).
   */
  playInterval(
    rootMidi: number,
    semitones: number,
    opts: PlayIntervalOptions = {},
  ): void {
    this.playIntervals(rootMidi, [semitones], opts)
  }

  /**
   * Play a series of intervals from a root. Each offset is played as a
   * (root, root + offset) pair; pairs are spaced `intervalGap` apart so the
   * listener can tell where one interval ends and the next begins. Used to
   * demo every interval in turn (do–do, do–do♯, do–re, …).
   */
  playIntervals(
    rootMidi: number,
    offsets: number[],
    opts: PlayIntervalOptions = {},
  ): void {
    try {
      const ctx = this.ensureContext()
      if (!ctx || offsets.length === 0) return
      const melodicGap = opts.melodicGap ?? 0.32
      const intervalGap = opts.intervalGap ?? 0.62
      const duration = opts.duration ?? 0.9
      const velocity = (opts.velocity ?? 0.55) * 0.5
      offsets.forEach((offset, i) => {
        const t0 = ctx.currentTime + i * intervalGap
        this.voice(rootMidi, t0, duration, velocity)
        this.voice(rootMidi + offset, t0 + melodicGap, duration, velocity)
      })
    } catch (err) {
      console.error('AudioEngine.playIntervals failed:', err)
    }
  }

  /**
   * Play a chord by name using a simple playable voicing across the fretboard:
   * the lowest position of each chord tone per string. This gives a usable
   * guitar voicing without a full voicing database.
   */
  playChordByName(
    notes: NoteName[],
    opts: PlayChordOptions = {},
  ): void {
    try {
      const ctx = this.ensureContext()
      if (!ctx || notes.length === 0) return
      // Find a fret position for each note, lowest playable, on distinct
      // strings where possible. Fall back to a fixed octave if not found.
      const board = buildFretboard(STANDARD_TUNING, 12)
      const usedStrings = new Set<number>()
      const midis: number[] = []
      for (const note of notes) {
        const pc = toPitchClass(note)
        let chosen: number | null = null
        for (const string of board) {
          if (usedStrings.has(string[0]!.stringNumber)) continue
          const pos = string.find((p) => p.pitchClass === pc && p.fret <= 12)
          if (pos) {
            chosen = pos.midi
            usedStrings.add(string[0]!.stringNumber)
            break
          }
        }
        midis.push(chosen ?? noteToMidi(note, 4))
      }
      // Ensure ascending (low → high) for a natural strum order.
      midis.sort((a, b) => a - b)
      this.playChord(midis, opts)
    } catch (err) {
      console.error('AudioEngine.playChordByName failed:', err)
    }
  }

  /** Reset the engine: closes the AudioContext and clears cached state. */
  dispose(): void {
    const ctx = this.ctx
    this.ctx = null
    this.master = null
    this.active.clear()
    if (ctx && typeof ctx.close === 'function') {
      try {
        void ctx.close().catch(() => {})
      } catch {
        /* ignore */
      }
    }
  }

  /** Immediately silence all sounding voices. */
  stopAll(): void {
    try {
      for (const osc of this.active) {
        try {
          osc.stop()
        } catch {
          /* already stopped */
        }
      }
      this.active.clear()
    } catch (err) {
      console.error('AudioEngine.stopAll failed:', err)
    }
  }
}

/** Catches the legacy `webkitAudioContext` global on older Safari. */
declare global {
  var webkitAudioContext: typeof AudioContext | undefined
}

/** The application-wide audio singleton. Import this everywhere. */
export const audio = new AudioEngine()
