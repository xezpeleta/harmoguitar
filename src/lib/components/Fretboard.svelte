<script lang="ts">
  import { toPitchClass, type NoteName } from '$lib/theory/notes'
  import { midiToNote } from '$lib/theory/midi'
  import { toSolfege } from '$lib/theory/solfege'
  import {
    buildFretboard,
    type Tuning,
    type FretPosition,
    INLAY_FRETS,
  } from '$lib/theory/fretboard'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { noteColor, readableForeground } from '$lib/utils/colors'

  interface Props {
    /** Number of frets (excludes the open string). Falls back to the store. */
    fretCount?: number
    /** Tuning. Falls back to the store. */
    tuning?: Tuning
    /** Notes to highlight (by pitch class). Falls back to the store. */
    highlightNotes?: NoteName[]
    /** Root note (gets a distinct marker). Falls back to the store. */
    rootNote?: NoteName
    /** Show fixed-Do solfège labels. Falls back to the store. */
    showSolfege?: boolean
    /** Spell notes with flats. Falls back to the store. */
    preferFlats?: boolean
    /** Fired on click with the note + midi. Defaults to toggling the store. */
    onselectnote?: (note: NoteName, midi: number) => void
  }

  let {
    fretCount,
    tuning,
    highlightNotes,
    rootNote,
    showSolfege,
    preferFlats,
    onselectnote,
  }: Props = $props()

  // Reactive props with store fallbacks (override when provided).
  const effFretCount = $derived(fretCount ?? app.fretCount)
  const effTuning = $derived(tuning ?? app.tuning)
  const effHighlight = $derived(highlightNotes ?? app.highlightNotes)
  const effRoot = $derived(rootNote ?? app.rootNote)
  const effSolfege = $derived(showSolfege ?? app.showSolfege)
  const effFlats = $derived(preferFlats ?? app.preferFlats)

  // The fretboard matrix, low string (6) → high string (1).
  const board = $derived(buildFretboard(effTuning, effFretCount))

  // Pitch-class sets for O(1) matching.
  const highlightPcs = $derived(new Set(effHighlight.map((n) => toPitchClass(n))))
  const rootPc = $derived(toPitchClass(effRoot))

  /**
   * Pitch-class → contextually-spelled note name, built from the selection.
   * This keeps fretboard labels consistent with the summary (e.g. a C Dorian
   * scale spells the third as "Eb", so every Eb position shows "Eb" — not "D#"
   * — even when the global flats preference is off).
   */
  const pcToNoteName = $derived.by(() => {
    const m: Record<number, NoteName> = {}
    for (const n of effHighlight) m[toPitchClass(n)] = n
    return m
  })

  // Render high string (1) at the top → low string (6) at the bottom.
  const stringsTopToBottom = $derived([...board].reverse())

  /** Spelling for a highlighted position: prefer the selection's spelling. */
  function displayNote(pos: FretPosition): NoteName {
    const contextual = pcToNoteName[pos.pitchClass]
    if (contextual) return contextual
    return midiToNote(pos.midi, effFlats).note
  }

  /** Display label for a position: note name or fixed-Do solfège. */
  function positionLabel(pos: FretPosition): string {
    const note = displayNote(pos)
    return effSolfege ? toSolfege(note) : note
  }

  /** Open-string tuning label (always natural notes, so no spelling issue). */
  function openStringLabel(pos: FretPosition): string {
    const note = midiToNote(pos.midi, effFlats).note
    return effSolfege ? toSolfege(note) : note
  }

  function isHighlighted(pos: FretPosition): boolean {
    return highlightPcs.has(pos.pitchClass)
  }
  function isRoot(pos: FretPosition): boolean {
    return pos.pitchClass === rootPc
  }
  function hasInlay(fret: number): boolean {
    return INLAY_FRETS.includes(fret)
  }
  function isDoubleDot(fret: number): boolean {
    return fret % 12 === 0 && fret !== 0
  }

  /** CSS color values for a highlighted position's dot. */
  function dotColors(pos: FretPosition): { bg: string; fg: string } {
    const note = displayNote(pos)
    const bg = noteColor(note)
    return { bg, fg: readableForeground(bg) }
  }

  function handleSelect(pos: FretPosition): void {
    const note = displayNote(pos)
    audio.playNote(pos.midi, { duration: 0.9, velocity: 0.5 })
    if (onselectnote) {
      onselectnote(note, pos.midi)
    } else {
      app.toggleNote(note)
    }
  }
</script>

<div
  class="fretboard-scroll overflow-x-auto"
  role="group"
  aria-label="Interactive fretboard"
>
  <div
    class="fretboard-grid select-none"
    style="grid-template-columns: var(--label-w) var(--open-w) repeat({effFretCount}, var(--cell-w));"
  >
    <!-- Fret numbers + inlay markers (header) -->
    <div class="fret-number label-cell" aria-hidden="true"></div>
    <div class="fret-number open-cell" aria-hidden="true">0</div>
    {#each Array.from({ length: effFretCount }, (_, i) => i + 1) as fret (fret)}
      <div class="fret-number" aria-hidden="true">
        <span>{fret}</span>
        {#if hasInlay(fret)}
          <span class="inlay-row">
            {#if isDoubleDot(fret)}
              <span class="inlay-dot"></span><span class="inlay-dot"></span>
            {:else}
              <span class="inlay-dot"></span>
            {/if}
          </span>
        {/if}
      </div>
    {/each}

    <!-- Strings: high E (top) → low E (bottom) -->
    {#each stringsTopToBottom as stringPositions, stringIdx (stringIdx)}
      {@const openPos = stringPositions[0]!}
      <!-- String label gutter: number + open tuning note -->
      <div class="string-label" aria-hidden="true">
        <span class="str-num">{openPos.stringNumber}</span>
        <span class="str-note">{openStringLabel(openPos)}</span>
      </div>
      {#each stringPositions as pos (pos.midi)}
        {@const highlighted = isHighlighted(pos)}
        {@const root = isRoot(pos)}
        {@const open = pos.fret === 0}
        {@const colors = highlighted ? dotColors(pos) : null}
        <button
          type="button"
          class="fret-cell"
          class:open-cell={open}
          class:highlighted
          class:root
          aria-label="String {pos.stringNumber} fret {pos.fret}: {displayNote(pos)}"
          aria-pressed={highlighted}
          style:--dot-bg={colors?.bg}
          style:--dot-fg={colors?.fg}
          onclick={() => handleSelect(pos)}
        >
          {#if highlighted}
            <span class="dot" class:solfege={effSolfege} class:root>
              {positionLabel(pos)}
            </span>
          {/if}
        </button>
      {/each}
    {/each}
  </div>
</div>

<style>
  .fretboard-scroll {
    --cell-w: 3rem;
    --open-w: 2.1rem;
    --label-w: 2.4rem;
    --string-color: #9a938a;
    --fretboard-bg: #efe9df;
    --nut-color: #2a2a2a;
    --fret-wire: #c9c2b8;
    padding: 0.25rem 0 0.75rem;
  }
  :global(.dark) .fretboard-scroll,
  :global([data-theme='dark']) .fretboard-scroll {
    --string-color: #6b6660;
    --fretboard-bg: #23251b;
    --nut-color: #e8e2d6;
    --fret-wire: #555049;
  }
  @media (prefers-color-scheme: dark) {
    .fretboard-scroll {
      --string-color: #6b6660;
      --fretboard-bg: #23251b;
      --nut-color: #e8e2d6;
      --fret-wire: #555049;
    }
  }

  .fretboard-grid {
    display: grid;
    gap: 0;
    width: max-content;
    /* The fretted surface starts at the open column and spans all frets. */
    background: linear-gradient(
      to right,
      transparent 0,
      transparent var(--label-w),
      var(--fretboard-bg) var(--label-w)
    );
    border-radius: 0.4rem;
  }

  /* Fret numbers + inlay header */
  .fret-number {
    height: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.72rem;
    color: var(--color-muted);
    padding-bottom: 0.2rem;
  }
  .fret-number.label-cell {
    width: var(--label-w);
  }
  .inlay-row {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.1rem;
    min-height: 0.4rem;
  }
  .inlay-dot {
    width: 0.38rem;
    height: 0.38rem;
    border-radius: 9999px;
    background: var(--color-border);
  }

  /* String label gutter: number + open tuning note. */
  .string-label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    height: 2.4rem;
    font-size: 0.68rem;
    color: var(--color-muted);
    font-family: var(--font-mono);
  }
  .str-num {
    font-weight: 700;
    color: var(--color-ink);
  }

  /* A fret cell is a clickable position on a string. */
  .fret-cell {
    position: relative;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    /* The string line runs horizontally through the cell centre. */
    border-top: 3px solid var(--string-color);
  }
  /* Fret wire: a vertical divider on the left of each fretted cell. */
  .fret-cell:not(.open-cell) {
    border-left: 2px solid var(--fret-wire);
  }
  /* The nut: a thicker divider after the open-string column. */
  .open-cell + .fret-cell {
    border-left: 4px solid var(--nut-color);
  }

  .dot {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 1.9rem;
    border-radius: 9999px;
    background: var(--dot-bg, var(--color-surface));
    color: var(--dot-fg, var(--color-ink));
    border: 2px solid rgba(0, 0, 0, 0.25);
    font-size: 0.74rem;
    font-weight: 700;
    line-height: 1;
    transition: transform 0.08s ease;
  }
  .dot.solfege {
    font-size: 0.64rem;
  }
  /* Root note: a bright ring around the dot for clear distinction. */
  .dot.root {
    box-shadow:
      0 0 0 2px var(--fretboard-bg),
      0 0 0 4px var(--dot-bg);
  }

  .fret-cell:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: -2px;
  }
  .fret-cell:hover .dot {
    transform: scale(1.08);
  }

  @media (prefers-reduced-motion: reduce) {
    .fret-cell:hover .dot {
      transform: none;
    }
  }
</style>
