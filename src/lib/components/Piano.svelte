<script lang="ts">
  /**
   * Piano.svelte — Interactive piano keyboard.
   *
   * Renders `octaves` octaves of a piano (C upward). Each key is a button:
   * click to hear the note. Highlighted keys are filled with their pitch-class
   * colour and labelled; non-highlighted keys are plain (white / black).
   *
   * Two modes:
   *   - **Standalone** (`highlightNotes` prop given): shows exactly those notes
   *     (e.g. all 12 pitch classes), spelling accidentals per the flats
   *     preference. Does not read or write the shared store. Used by the
   *     `piano` lesson block for reference diagrams.
   *   - **Store-driven** (no `highlightNotes`): mirrors the shared store's
   *     current selection (the chord/scale the rest of the app shows), using
   *     contextual spelling to match the Fretboard. Used when embedded as a
   *     synchronised widget.
   *
   * White keys carry the 7 natural notes (vivid colours); black keys carry the
   * 5 accidentals (gray) — see colors.ts. This makes the diatonic foundation
   * pop and maps directly onto the "7 white-key notes / 5 black-key notes"
   * language used in the lessons.
   *
   * Reference: PLAN.md, colors.ts, Fretboard.svelte (mirrors its patterns).
   */
  import {
    type NoteName,
    toPitchClass,
    SHARPS,
    FLATS,
  } from '$lib/theory/notes'
  import { noteToMidi } from '$lib/theory/midi'
  import { toSolfege } from '$lib/theory/solfege'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { noteColor, readableForeground } from '$lib/utils/colors'

  interface Props {
    /** Number of octaves to render (default 2 — shows the octave repeat). */
    octaves?: number
    /** Starting octave (scientific pitch; C4 = middle C). Default 4. */
    startOctave?: number
    /** Notes to highlight. Given → standalone mode; omitted → store-driven. */
    highlightNotes?: NoteName[]
    /** Root note (gets a ring). Omit in standalone mode for no root marker. */
    rootNote?: NoteName
    /** Show fixed-Do solfège labels. Falls back to the store. */
    showSolfege?: boolean
    /** Spell accidentals with flats. Falls back to the store. */
    preferFlats?: boolean
    /** Fired on click with the note + midi. Defaults to playing + toggling. */
    onselectnote?: (note: NoteName, midi: number) => void
  }

  let {
    octaves = 2,
    startOctave = 4,
    highlightNotes,
    rootNote,
    showSolfege,
    preferFlats,
    onselectnote,
  }: Props = $props()

  /** True when an explicit note set was given (standalone reference mode). */
  const standalone = $derived(highlightNotes !== undefined)

  // Reactive props with store fallbacks (store-driven mode only).
  const effHighlight = $derived(highlightNotes ?? app.highlightNotes)
  const effRoot = $derived(
    standalone ? (rootNote ?? null) : (rootNote ?? app.rootNote),
  )
  const effSolfege = $derived(showSolfege ?? app.showSolfege)
  const effFlats = $derived(preferFlats ?? app.preferFlats)

  const highlightPcs = $derived(
    new Set(effHighlight.map((n) => toPitchClass(n))),
  )
  const rootPc = $derived(effRoot ? toPitchClass(effRoot) : -1)

  /**
   * Contextual spelling from the selection (store-driven): a C Dorian scale
   * spells its third "Eb", so every Eb key shows "Eb" — not "D#". In
   * standalone mode this is bypassed (accidentals follow the flats preference).
   */
  const pcToNoteName = $derived.by<Record<number, NoteName>>(() => {
    const m: Record<number, NoteName> = {}
    for (const n of effHighlight) m[toPitchClass(n)] = n
    return m
  })

  /** The note name to display for a pitch class. */
  function displayNote(pc: number): NoteName {
    if (standalone) return effFlats ? FLATS[pc]! : SHARPS[pc]!
    return pcToNoteName[pc] ?? (effFlats ? FLATS[pc]! : SHARPS[pc]!)
  }

  /** Display label: note name or fixed-Do solfège. */
  function keyLabel(pc: number): string {
    return effSolfege ? toSolfege(displayNote(pc)) : displayNote(pc)
  }

  function isHighlighted(pc: number): boolean {
    return highlightPcs.has(pc)
  }
  function isRoot(pc: number): boolean {
    return pc === rootPc
  }
  /** True while this exact key's MIDI is currently sounding (playback). */
  function isSounding(midi: number): boolean {
    return app.soundingMidis.has(midi)
  }
  function keyColors(pc: number): { bg: string; fg: string } {
    const bg = noteColor(displayNote(pc))
    return { bg, fg: readableForeground(bg) }
  }

  /** White-key letters per octave (C D E F G A B) with their pitch classes. */
  const WHITES: ReadonlyArray<{ letter: NoteName; pc: number }> = [
    { letter: 'C', pc: 0 },
    { letter: 'D', pc: 2 },
    { letter: 'E', pc: 4 },
    { letter: 'F', pc: 5 },
    { letter: 'G', pc: 7 },
    { letter: 'A', pc: 9 },
    { letter: 'B', pc: 11 },
  ]

  /**
   * Black keys per octave. `after` is the index of the white key that precedes
   * the black key (0=C, 1=D, 3=F, 4=G, 5=A). There are no black keys between
   * E/F (after would be 2) or B/C (after would be 6) — hence the gaps.
   */
  const BLACKS: ReadonlyArray<{ pc: number; after: number }> = [
    { pc: 1, after: 0 }, // C♯ (after C)
    { pc: 3, after: 1 }, // D♯ (after D)
    { pc: 6, after: 3 }, // F♯ (after F)
    { pc: 8, after: 4 }, // G♯ (after G)
    { pc: 10, after: 5 }, // A♯ (after A)
  ]

  interface KeyInfo {
    midi: number
    pc: number
    /** White-key index within its octave (blacks use the preceding white). */
    after: number
  }

  /** Per-octave white + black key metadata (midi, pc, layout position). */
  const octavesData = $derived.by<
    ReadonlyArray<{
      whites: KeyInfo[]
      blacks: KeyInfo[]
    }>
  >(() => {
    const out: { whites: KeyInfo[]; blacks: KeyInfo[] }[] = []
    for (let o = 0; o < octaves; o++) {
      const octave = startOctave + o
      const whites: KeyInfo[] = WHITES.map((w, i) => ({
        midi: noteToMidi(w.letter, octave),
        pc: w.pc,
        after: i,
      }))
      const blacks: KeyInfo[] = BLACKS.map((b) => ({
        midi: noteToMidi(SHARPS[b.pc]!, octave),
        pc: b.pc,
        after: b.after,
      }))
      out.push({ whites, blacks })
    }
    return out
  })

  /** CSS `left` for a black key, as a calc() using white-key + black-key vars. */
  function blackLeft(after: number): string {
    return `calc(var(--wk) * ${after + 1} - var(--bw) / 2)`
  }

  function handleClick(pc: number, midi: number): void {
    const note = displayNote(pc)
    if (onselectnote) {
      onselectnote(note, midi)
      return
    }
    // Default: play the note. In store-driven free mode, also toggle it.
    audio.playNote(midi, { duration: 1.1 })
    if (!standalone && app.mode === 'free') {
      app.toggleNote(note)
    }
  }
</script>

<div
  class="piano"
  role="group"
  aria-label="Piano keyboard. Highlighted keys show the current selection."
>
  {#each octavesData as oct, oi (oi)}
    <div class="octave">
      {#each oct.whites as wk (wk.midi)}
        {@const hi = isHighlighted(wk.pc) || isSounding(wk.midi)}
        {@const col = keyColors(wk.pc)}
        <button
          type="button"
          class="key white"
          class:highlighted={hi}
          class:root={isRoot(wk.pc)}
          class:sounding={isSounding(wk.midi)}
          aria-label="{keyLabel(wk.pc)} (pitch class {wk.pc})"
          aria-pressed={hi}
          onclick={() => handleClick(wk.pc, wk.midi)}
        >
          {#if hi}
            <span
              class="dot"
              class:sounding={isSounding(wk.midi)}
              style:--dot-color={col.bg}
              style:--dot-fg={col.fg}>{keyLabel(wk.pc)}</span
            >
          {/if}
        </button>
      {/each}

      {#each oct.blacks as bk (bk.midi)}
        {@const hi = isHighlighted(bk.pc) || isSounding(bk.midi)}
        {@const col = keyColors(bk.pc)}
        <button
          type="button"
          class="key black"
          class:highlighted={hi}
          class:root={isRoot(bk.pc)}
          class:sounding={isSounding(bk.midi)}
          style:left={blackLeft(bk.after)}
          aria-label="{keyLabel(bk.pc)} (pitch class {bk.pc})"
          aria-pressed={hi}
          onclick={() => handleClick(bk.pc, bk.midi)}
        >
          {#if hi}
            <span
              class="dot"
              class:sounding={isSounding(bk.midi)}
              style:--dot-color={col.bg}
              style:--dot-fg={col.fg}>{keyLabel(bk.pc)}</span
            >
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .piano {
    display: flex;
    width: 100%;
    overflow-x: auto;
    /* Subtle scrollbar */
    padding-bottom: 0.1rem;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .octave {
    position: relative;
    flex: 1 1 0;
    min-width: calc(7 * var(--min-white, 1.8rem));
    display: flex;
    --wk: calc(100% / 7);
    --bw: calc(var(--wk) * 0.62);
  }

  .key {
    border: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    font: inherit;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    transition:
      filter 0.08s ease,
      transform 0.08s ease;
  }

  .key.white {
    flex: 1 1 0;
    height: var(--piano-h, 6.5rem);
    background: var(--piano-white);
    border: 1px solid var(--piano-white-edge, #c4c9d0);
    border-radius: 0 0 0.35rem 0.35rem;
    box-shadow: inset 0 -3px 6px rgba(0, 0, 0, 0.06);
    z-index: 0;
  }

  .key.black {
    position: absolute;
    top: 0;
    width: var(--bw);
    height: calc(var(--piano-h, 6.5rem) * 0.62);
    background: var(--piano-black);
    border-radius: 0 0 0.28rem 0.28rem;
    box-shadow:
      inset 0 -3px 4px rgba(255, 255, 255, 0.08),
      0 2px 3px rgba(0, 0, 0, 0.35);
    z-index: 1;
  }

  .key:hover {
    filter: brightness(1.06);
  }
  .key:active {
    transform: translateY(1px);
    filter: brightness(0.94);
  }
  .key:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 1px;
    z-index: 2;
  }

  /* Note marker: a coloured circle tag sitting on the key surface. The key
   * itself stays piano-white / piano-black; the colour lives in the tag, so
   * the keyboard reads as a real piano with note badges on it. Single-char
   * labels render as a circle; two-char (C#, Do) as a pill. */
  .dot {
    position: relative;
    bottom: 0.34rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.6rem;
    height: 1.6rem;
    padding: 0 0.32rem;
    border-radius: 9999px;
    background: var(--dot-color);
    color: var(--dot-fg);
    font-size: 0.68rem;
    font-weight: 700;
    font-family: var(--font-mono);
    line-height: 1;
    pointer-events: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }
  .key.black .dot {
    bottom: 0.24rem;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 0.2rem;
    font-size: 0.58rem;
  }

  /* Root note: accent ring around the tag, with a surface-coloured gap so it
   * reads on both white and black keys. */
  .key.root .dot {
    box-shadow:
      0 0 0 2px var(--color-surface),
      0 0 0 4px var(--color-accent),
      0 1px 2px rgba(0, 0, 0, 0.25);
  }
  /* Sounding note: a pulsing accent ring while this exact key rings out. */
  .key.sounding .dot {
    animation: key-pulse 0.5s ease-in-out infinite alternate;
    box-shadow:
      0 0 0 2px var(--color-surface),
      0 0 0 4.5px var(--color-accent),
      0 1px 2px rgba(0, 0, 0, 0.25);
  }
  @keyframes key-pulse {
    from { transform: scale(1); }
    to   { transform: scale(1.18); }
  }
  @media (prefers-reduced-motion: reduce) {
    .key.sounding .dot {
      animation: none;
      transform: scale(1.14);
    }
  }
</style>
