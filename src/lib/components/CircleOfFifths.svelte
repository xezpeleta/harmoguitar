<script lang="ts">
  import { arc } from 'd3-shape'
  import { type NoteName, toPitchClass } from '$lib/theory/notes'
  import {
    relativeMinor,
    relativeMajor,
    keySignatureCount,
    diatonicChords,
    type DiatonicChord,
  } from '$lib/theory/diatonic'
  import { chordSymbol } from '$lib/theory/chords'
  import { app } from '$lib/stores/app.svelte'
  import { noteColor, readableForeground } from '$lib/utils/colors'

  interface Props {
    /** Pixel size of the wheel (square). */
    size?: number
  }

  let { size = 340 }: Props = $props()

  /** The 12 keys clockwise around the circle of fifths, C at the top. */
  const CIRCLE_MAJOR: readonly NoteName[] = [
    'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F',
  ]

  const SEG = (Math.PI * 2) / 12
  const arcGen = arc()

  const R_OUTER_OUT = $derived(size / 2 - 4)
  const R_OUTER_IN = $derived(size / 2 - 44)
  const R_INNER_OUT = $derived(size / 2 - 50)
  const R_INNER_IN = $derived(size / 2 - 92)

  /** Path for a ring segment at clockwise position `p`. */
  function ringPath(p: number, rIn: number, rOut: number): string {
    // d3 arc() uses the pie convention: angle 0 = 12 o'clock, increasing
    // clockwise. (The -π/2 offset is only for the cos/sin math in labelPos.)
    const center = p * SEG
    return arcGen({
      innerRadius: rIn,
      outerRadius: rOut,
      startAngle: center - SEG / 2,
      endAngle: center + SEG / 2,
    }) ?? ''
  }

  function labelPos(p: number, r: number): { x: number; y: number } {
    const a = -Math.PI / 2 + p * SEG
    return { x: Math.cos(a) * r, y: Math.sin(a) * r }
  }

  interface KeySeg {
    pos: number
    major: NoteName
    minor: NoteName
    fifths: number
    majorPath: string
    minorPath: string
    majorPos: { x: number; y: number }
    minorPos: { x: number; y: number }
    color: string
    fg: string
  }

  const segments = $derived.by<KeySeg[]>(() =>
    CIRCLE_MAJOR.map((major, p) => {
      const minor = relativeMinor(major)
      return {
        pos: p,
        major,
        minor,
        fifths: keySignatureCount(major),
        majorPath: ringPath(p, R_OUTER_IN, R_OUTER_OUT),
        minorPath: ringPath(p, R_INNER_IN, R_INNER_OUT),
        majorPos: labelPos(p, (R_OUTER_IN + R_OUTER_OUT) / 2),
        minorPos: labelPos(p, (R_INNER_IN + R_INNER_OUT) / 2),
        color: noteColor(major),
        fg: readableForeground(noteColor(major)),
      }
    }),
  )

  // Which key is currently active in the store?
  const activeMajorPc = $derived.by(() => {
    if (app.keyScaleType === 'natural-minor' || app.keyScaleType === 'harmonic-minor' || app.keyScaleType === 'melodic-minor') {
      return toPitchClass(relativeMajor(app.key))
    }
    return toPitchClass(app.key)
  })
  const activeMinorPc = $derived.by(() => {
    if (app.keyScaleType === 'natural-minor' || app.keyScaleType === 'harmonic-minor' || app.keyScaleType === 'melodic-minor') {
      return toPitchClass(app.key)
    }
    return toPitchClass(relativeMinor(app.key))
  })

  function isMajorActive(seg: KeySeg): boolean {
    return toPitchClass(seg.major) === activeMajorPc
  }
  function isMinorActive(seg: KeySeg): boolean {
    return toPitchClass(seg.minor) === activeMinorPc
  }

  /** The 7 diatonic chords of the current key (triads). */
  const diatonic = $derived.by<DiatonicChord[]>(() => {
    try {
      return diatonicChords(app.key, app.keyScaleType, false)
    } catch {
      return []
    }
  })

  function keySigLabel(fifths: number): string {
    if (fifths === 0) return 'no sharps or flats'
    if (fifths > 0) return `${fifths} sharp${fifths > 1 ? 's' : ''}`
    const n = -fifths
    return `${n} flat${n > 1 ? 's' : ''}`
  }

  function selectMajor(seg: KeySeg): void {
    app.setKey(seg.major, 'major')
    app.selectScale(seg.major, 'major')
  }
  function selectMinor(seg: KeySeg): void {
    app.setKey(seg.minor, 'natural-minor')
    app.selectScale(seg.minor, 'natural-minor')
  }

  function onKeydown(e: KeyboardEvent, fn: () => void): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fn()
    }
  }

  const center = $derived.by(() => {
    const f = keySignatureCount(
      app.keyScaleType.startsWith('minor') || app.keyScaleType === 'aeolian'
        ? relativeMajor(app.key)
        : app.key,
    )
    const label = app.keyScaleType === 'major' ? `${app.key} major` : `${app.key} minor`
    return { label, sig: keySigLabel(f) }
  })

  // Whether a diatonic chord matches the currently-explored chord.
  function isChordActive(dc: DiatonicChord): boolean {
    return (
      app.chordType !== null &&
      dc.type === app.chordType &&
      toPitchClass(dc.root) === toPitchClass(app.rootNote)
    )
  }
</script>

<div class="cof-wrap">
  <svg
    viewBox="{-size / 2} {-size / 2} {size} {size}"
    width={size}
    height={size}
    class="cof"
    role="group"
    aria-label="Circle of fifths"
  >
    {#each segments as seg (seg.pos)}
      <!-- Major (outer) key -->
      <path
        d={seg.majorPath}
        class="seg"
        class:active={isMajorActive(seg)}
        fill={isMajorActive(seg) ? seg.color : 'var(--color-raised)'}
        stroke="var(--color-surface)"
        stroke-width="2"
        tabindex="0"
        role="button"
        aria-label="{seg.major} major — {keySigLabel(seg.fifths)}"
        aria-pressed={isMajorActive(seg)}
        onclick={() => selectMajor(seg)}
        onkeydown={(e) => onKeydown(e, () => selectMajor(seg))}
      />
      <text
        x={seg.majorPos.x}
        y={seg.majorPos.y}
        class="key-label"
        class:active={isMajorActive(seg)}
        text-anchor="middle"
        dominant-baseline="middle"
      >{seg.major}</text>

      <!-- Minor (inner) key -->
      <path
        d={seg.minorPath}
        class="seg"
        class:active={isMinorActive(seg)}
        fill={isMinorActive(seg) ? seg.color : 'var(--color-bg)'}
        stroke="var(--color-surface)"
        stroke-width="2"
        tabindex="0"
        role="button"
        aria-label="{seg.minor} minor — relative of {seg.major} major"
        aria-pressed={isMinorActive(seg)}
        onclick={() => selectMinor(seg)}
        onkeydown={(e) => onKeydown(e, () => selectMinor(seg))}
      />
      <text
        x={seg.minorPos.x}
        y={seg.minorPos.y}
        class="key-label minor"
        class:active={isMinorActive(seg)}
        text-anchor="middle"
        dominant-baseline="middle"
      >{seg.minor}</text>
    {/each}

    <!-- Centre readout -->
    <text
      x={0}
      y={-6}
      class="center-label"
      text-anchor="middle"
      dominant-baseline="middle"
    >{center.label}</text>
    <text
      x={0}
      y={14}
      class="center-sig"
      text-anchor="middle"
      dominant-baseline="middle"
    >{center.sig}</text>
  </svg>

  <!-- Diatonic chords of the current key -->
  <div class="diatonic">
    <span class="caption">Diatonic chords</span>
    <div class="roman-row">
      {#each diatonic as dc (dc.degree)}
        <button
          type="button"
          class="roman"
          class:active={isChordActive(dc)}
          title="{chordSymbol(dc.root, dc.type)} — {dc.notes.join(' ')}"
          onclick={() => app.selectChord(dc.root, dc.type)}
        >
          <span class="rn">{dc.romanNumeral}</span>
          <span class="sym">{chordSymbol(dc.root, dc.type)}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .cof-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  .cof {
    max-width: 100%;
    height: auto;
  }
  .seg {
    cursor: pointer;
    transition: filter 0.1s;
  }
  .seg:hover {
    filter: brightness(1.08);
  }
  .seg:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -3px;
  }
  .seg.active {
    stroke: var(--color-accent);
    stroke-width: 3;
  }
  .key-label {
    font-size: 15px;
    font-weight: 700;
    fill: var(--color-ink);
    pointer-events: none;
  }
  .key-label.minor {
    font-size: 13px;
    font-weight: 600;
    fill: var(--color-muted);
    font-style: italic;
  }
  .key-label.active {
    fill: var(--color-surface);
  }
  .key-label.minor.active {
    fill: var(--color-ink);
  }
  .center-label {
    font-size: 14px;
    font-weight: 700;
    fill: var(--color-ink);
    text-transform: capitalize;
    pointer-events: none;
  }
  .center-sig {
    font-size: 11px;
    fill: var(--color-muted);
    pointer-events: none;
  }
  .diatonic {
    width: 100%;
    max-width: 30rem;
  }
  .caption {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-muted);
    margin-bottom: 0.35rem;
    text-align: center;
  }
  .roman-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    justify-content: center;
  }
  .roman {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.3rem 0.55rem;
    cursor: pointer;
    font: inherit;
    min-width: 3rem;
  }
  .roman:hover {
    border-color: var(--color-accent);
  }
  .roman.active {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-soft);
  }
  .rn {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--color-ink);
  }
  .sym {
    font-size: 0.7rem;
    color: var(--color-muted);
  }
</style>
