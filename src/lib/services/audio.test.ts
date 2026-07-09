import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { audio, midiToFreq } from './audio'

/** A writable view of globalThis for injecting/removing a fake AudioContext. */
const g = globalThis as unknown as Record<string, unknown>

/** Minimal stub of a Web Audio node, tagged with a `kind` for assertions. */
interface MockNode {
  kind: string
  type: string
  frequency: {
    value: number
    setValueAtTime: ReturnType<typeof vi.fn>
    exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
  }
  detune: { value: number }
  gain: {
    value: number
    setValueAtTime: ReturnType<typeof vi.fn>
    exponentialRampToValueAtTime: ReturnType<typeof vi.fn>
  }
  Q: { value: number }
  connect: ReturnType<typeof vi.fn>
  start: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
  onended: null | (() => void)
}

/** Build a fake AudioContext that records every node it creates. */
function makeMockContext() {
  const nodes: MockNode[] = []
  const makeNode = (kind: string): MockNode => ({
    kind,
    // OscillatorNode.type (waveform) is written by the engine; we must not
    // reuse `type` as our node-kind tag, or it gets overwritten to 'triangle'.
    type: '',
    frequency: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    detune: { value: 0 },
    gain: {
      value: 0,
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    Q: { value: 0 },
    connect: vi.fn().mockReturnThis(),
    start: vi.fn(),
    stop: vi.fn(),
    onended: null,
  })
  return {
    state: 'running' as 'running' | 'suspended',
    currentTime: 0,
    destination: { connect: vi.fn() },
    resume: vi.fn().mockResolvedValue(undefined),
    createGain: () => {
      const n = makeNode('gain')
      nodes.push(n)
      return n
    },
    createOscillator: () => {
      const n = makeNode('oscillator')
      nodes.push(n)
      return n
    },
    createBiquadFilter: () => {
      const n = makeNode('filter')
      nodes.push(n)
      return n
    },
    _nodes: nodes,
  }
}

describe('midiToFreq', () => {
  it('A4 (midi 69) = 440 Hz', () => {
    expect(midiToFreq(69)).toBeCloseTo(440, 1)
  })
  it('C4 (midi 60) ≈ 261.63 Hz', () => {
    expect(midiToFreq(60)).toBeCloseTo(261.63, 1)
  })
  it('an octave doubles the frequency', () => {
    expect(midiToFreq(72) / midiToFreq(60)).toBeCloseTo(2, 3)
  })
  it('low E (midi 40) ≈ 82.41 Hz', () => {
    expect(midiToFreq(40)).toBeCloseTo(82.41, 1)
  })
})

describe('AudioEngine — graceful degradation (no AudioContext)', () => {
  beforeEach(() => {
    delete g.AudioContext
    delete g.webkitAudioContext
  })

  it('reports unavailable when no AudioContext', () => {
    expect(audio.available).toBe(false)
  })
  it('playNote does not throw without AudioContext', () => {
    expect(() => audio.playNote(60)).not.toThrow()
  })
  it('playChord does not throw without AudioContext', () => {
    expect(() => audio.playChord([60, 64, 67])).not.toThrow()
  })
  it('playSequence does not throw without AudioContext', () => {
    expect(() => audio.playSequence([60, 62, 64, 65])).not.toThrow()
  })
  it('playInterval does not throw without AudioContext', () => {
    expect(() => audio.playInterval(60, 7)).not.toThrow()
  })
  it('playIntervals does not throw without AudioContext', () => {
    expect(() => audio.playIntervals(60, [0, 7, 12])).not.toThrow()
  })
  it('playChordByName does not throw without AudioContext', () => {
    expect(() => audio.playChordByName(['C', 'E', 'G'])).not.toThrow()
  })
  it('stopAll does not throw without AudioContext', () => {
    expect(() => audio.stopAll()).not.toThrow()
  })
})

describe('AudioEngine — setVolume clamps', () => {
  it('clamps above 1', () => {
    expect(() => audio.setVolume(5)).not.toThrow()
  })
  it('clamps below 0', () => {
    expect(() => audio.setVolume(-1)).not.toThrow()
  })
})

describe('AudioEngine — with mocked AudioContext', () => {
  let mock: ReturnType<typeof makeMockContext>

  beforeEach(() => {
    mock = makeMockContext()
    audio.dispose()
    // A regular function (not arrow) so it can be invoked with `new`.
    // Returning an object from a constructor overrides `this`.
    g.AudioContext = function () {
      return mock
    }
  })
  afterEach(() => {
    audio.dispose()
    delete g.AudioContext
  })

  it('creates oscillators, filter & gain for a single note', () => {
    audio.playNote(60)
    const kinds = mock._nodes.map((n) => n.kind)
    expect(kinds.filter((k) => k === 'oscillator').length).toBe(2)
    expect(kinds.filter((k) => k === 'filter').length).toBe(1)
    expect(kinds.filter((k) => k === 'gain').length).toBeGreaterThanOrEqual(3)
  })

  it('starts both oscillators', () => {
    mock._nodes.length = 0
    audio.playNote(64)
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(2)
    oscs.forEach((o) => expect(o.start).toHaveBeenCalled())
  })

  it('playChord builds 2 oscillators per note', () => {
    mock._nodes.length = 0
    audio.playChord([60, 64, 67], { mode: 'block' })
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(6) // 3 notes × 2 oscillators
  })

  it('playInterval builds a voice for root and interval note (4 osc)', () => {
    mock._nodes.length = 0
    audio.playInterval(60, 7) // C → G (perfect 5th)
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(4) // 2 notes × 2 oscillators
    // Frequencies: 60 (C4) and 67 (G4).
    const freqs = oscs.map((o) => o.frequency.value).sort((a, b) => a - b)
    expect(freqs[0]).toBeCloseTo(midiToFreq(60), 1)
    expect(freqs[2]).toBeCloseTo(midiToFreq(67), 1)
  })

  it('playIntervals builds 2 voices per interval (root + offset)', () => {
    mock._nodes.length = 0
    audio.playIntervals(60, [0, 7, 12]) // unison, 5th, octave
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(12) // 3 intervals × 2 notes × 2 osc
  })

  it('playIntervals handles empty offsets', () => {
    mock._nodes.length = 0
    audio.playIntervals(60, [])
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(0)
  })

  it('resume is called when context is suspended', () => {
    mock.state = 'suspended'
    audio.playNote(60)
    expect(mock.resume).toHaveBeenCalled()
  })

  it('stopAll calls stop on active oscillators', () => {
    mock._nodes.length = 0
    audio.playNote(60)
    audio.playNote(64)
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    audio.stopAll()
    oscs.forEach((o) => expect(o.stop).toHaveBeenCalled())
  })
})

describe('AudioEngine — playChordByName', () => {
  let mock: ReturnType<typeof makeMockContext>

  beforeEach(() => {
    mock = makeMockContext()
    audio.dispose()
    g.AudioContext = function () {
      return mock
    }
  })
  afterEach(() => {
    audio.dispose()
    delete g.AudioContext
  })

  it('builds a voice per chord tone', () => {
    audio.playChordByName(['C', 'E', 'G'])
    const oscs = mock._nodes.filter((n) => n.kind === 'oscillator')
    expect(oscs.length).toBe(6) // 3 tones × 2 osc
  })

  it('handles empty input without error', () => {
    expect(() => audio.playChordByName([])).not.toThrow()
  })
})
