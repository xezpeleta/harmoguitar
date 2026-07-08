<script lang="ts">
  import { arc } from 'd3-shape'
  import {
    type NoteName,
    toPitchClass,
    mod,
    SHARPS,
    FLATS,
  } from '$lib/theory/notes'
  import { SIMPLE_INTERVALS } from '$lib/theory/intervals'
  import { noteToMidi } from '$lib/theory/midi'
  import { toSolfege } from '$lib/theory/solfege'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { noteColor, readableForeground } from '$lib/utils/colors'

  interface Props {
    /** Root note (interval 1, drawn at the top). Falls back to the store. */
    rootNote?: NoteName
    /** Notes to highlight (by pitch class). Falls back to the store. */
    highlightNotes?: NoteName[]
    /** Show fixed-Do solfège labels. Falls back to the store. */
    showSolfege?: boolean
    /** Pixel size of the wheel (square). */
    size?: number
  }

  let {
    rootNote,
    highlightNotes,
    showSolfege,
    size = 320,
  }: Props = $props()

  const effRoot = $derived(rootNote ?? app.rootNote)
  const effHighlight = $derived(highlightNotes ?? app.highlightNotes)
  const effSolfege = $derived(showSolfege ?? app.showSolfege)

  const rootPc = $derived(toPitchClass(effRoot))
  const highlightPcs = $derived(new Set(effHighlight.map((n) => toPitchClass(n))))

  /** A contextual spelling map (pitch class → note name) from the selection. */
  const pcToName = $derived.by(() => {
    const m: Record<number, NoteName> = {}
    for (const n of effHighlight) m[toPitchClass(n)] = n
    return m
  })

  const R_OUTER = $derived(size / 2)
  const R_LABEL = $derived(size / 2 - 38)
  const R_NOTE = $derived(size / 2 - 20)
  const R_INNER = $derived(size / 2 - 64)
  const SEG = (Math.PI * 2) / 12

  const arcGen = arc()

  /** Path `d` for the segment at semitone offset `s` from the root. */
  function segmentPath(s: number): string {
    const center = -Math.PI / 2 + s * SEG // root at 12 o'clock, clockwise
    return arcGen({
      innerRadius: R_INNER,
      outerRadius: R_OUTER,
      startAngle: center - SEG / 2,
      endAngle: center + SEG / 2,
    }) ?? ''
  }

  /** Cartesian position for a label at semitone offset `s`, radius `r`. */
  function labelPos(s: number, r: number): { x: number; y: number } {
    const a = -Math.PI / 2 + s * SEG
    return { x: Math.cos(a) * r, y: Math.sin(a) * r }
  }

  interface Segment {
    semitone: number
    semitones: number
    character: string
    note: NoteName
    color: string
    fg: string
    highlighted: boolean
    isRoot: boolean
    symbol: string
    intervalName: string
    path: string
    sym: { x: number; y: number }
    notePos: { x: number; y: number }
  }

  const segments = $derived.by<Segment[]>(() => {
    return SIMPLE_INTERVALS.map((info) => {
      const s = info.semitones
      const pc = mod(rootPc + s, 12)
      const contextual = pcToName[pc]
      const note: NoteName = contextual ?? (app.preferFlats ? FLATS[pc]! : SHARPS[pc]!)
      const color = noteColor(note)
      const highlighted = highlightPcs.has(pc)
      return {
        semitone: s,
        semitones: info.semitones,
        character: info.character,
        note,
        color,
        fg: readableForeground(color),
        highlighted,
        isRoot: s === 0,
        symbol: info.symbol,
        intervalName: info.name,
        path: segmentPath(s),
        sym: labelPos(s, R_LABEL),
        notePos: labelPos(s, R_NOTE),
      }
    })
  })

  // Currently focused/hovered interval for the info readout.
  let active = $state<Segment | null>(null)

  function activate(seg: Segment): void {
    active = seg
  }

  function playInterval(seg: Segment): void {
    const rootMidi = noteToMidi(effRoot, 4)
    const noteMidi = rootMidi + seg.semitone
    // Play the root, then the interval note, so the distance is audible.
    audio.playNote(rootMidi, { duration: 0.5, velocity: 0.5 })
    setTimeout(() => audio.playNote(noteMidi, { duration: 0.7, velocity: 0.55 }), 320)
  }

  function handleClick(seg: Segment): void {
    activate(seg)
    playInterval(seg)
  }

  function onKeydown(e: KeyboardEvent, seg: Segment): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(seg)
    }
  }
</script>

<div class="wheel-wrap">
  <svg
    viewBox="{-size / 2} {-size / 2} {size} {size}"
    width={size}
    height={size}
    class="wheel"
    role="group"
    aria-label="Interval wheel rooted at {effRoot}"
  >
    {#each segments as seg (seg.semitone)}
      <path
        d={seg.path}
        class="seg"
        class:highlighted={seg.highlighted}
        class:root={seg.isRoot}
        class:active={active?.semitone === seg.semitone}
        fill={seg.highlighted ? seg.color : 'var(--color-raised)'}
        stroke="var(--color-surface)"
        stroke-width="2"
        tabindex="0"
        role="button"
        aria-label="{seg.intervalName}: {seg.note} ({seg.semitones} semitones)"
        onclick={() => handleClick(seg)}
        onkeydown={(e) => onKeydown(e, seg)}
        onmouseenter={() => activate(seg)}
        onfocus={() => activate(seg)}
      />
      <text
        x={seg.sym.x}
        y={seg.sym.y}
        class="sym"
        text-anchor="middle"
        dominant-baseline="middle"
        fill={seg.highlighted ? seg.fg : 'var(--color-ink)'}
      >{seg.symbol}</text>
      <text
        x={seg.notePos.x}
        y={seg.notePos.y}
        class="note-label"
        text-anchor="middle"
        dominant-baseline="middle"
      >{effSolfege ? toSolfege(seg.note) : seg.note}</text>
    {/each}
  </svg>
  <div class="readout" aria-live="polite">
    {#if active}
      <strong>{active.intervalName}</strong>
      <span>{active.note}{effSolfege ? ` · ${toSolfege(active.note)}` : ''}</span>
      <span class="muted">{active.semitones} semitones — {active.character}</span>
    {:else}
      <span class="muted">Hover or tap an interval to hear it from {effRoot}.</span>
    {/if}
  </div>
</div>

<style>
  .wheel-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .wheel {
    max-width: 100%;
    height: auto;
  }
  .seg {
    cursor: pointer;
    transition: filter 0.1s, opacity 0.1s;
  }
  .seg:hover,
  .seg:focus-visible {
    filter: brightness(1.1);
    outline: none;
  }
  .seg:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -3px;
  }
  .seg.root {
    stroke: var(--color-accent);
    stroke-width: 3.5;
  }
  .seg.active {
    filter: brightness(1.12);
  }
  .sym {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 700;
    pointer-events: none;
  }
  .note-label {
    font-size: 11px;
    font-weight: 600;
    fill: var(--color-muted);
    pointer-events: none;
  }
  .readout {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    min-height: 1.4rem;
    font-size: 0.85rem;
  }
  .readout .muted {
    color: var(--color-muted);
  }
</style>
