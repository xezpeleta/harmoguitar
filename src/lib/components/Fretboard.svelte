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

  // Render high string (1) at the top → low string (6) at the bottom.
  const stringsTopToBottom = $derived([...board].reverse())

  /** Re-spell a position's note for display, honouring the flats preference. */
  function displayNote(pos: FretPosition, preferFlats: boolean): NoteName {
    return midiToNote(pos.midi, preferFlats).note
  }

  /** Display label for a position: note name or fixed-Do solfège. */
  function positionLabel(
    pos: FretPosition,
    preferFlats: boolean,
    showSolfege: boolean,
  ): string {
    const note = displayNote(pos, preferFlats)
    return showSolfege ? toSolfege(note) : note
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

  function handleSelect(pos: FretPosition): void {
    const note = displayNote(pos, effFlats)
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
    style="grid-template-columns: var(--open-w) repeat({effFretCount}, var(--cell-w));"
  >
    <!-- Fret numbers + inlay markers (header) -->
    <div class="fret-number open-cell" aria-hidden="true"></div>
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
      {#each stringPositions as pos (pos.midi)}
        {@const highlighted = isHighlighted(pos)}
        {@const root = isRoot(pos)}
        {@const open = pos.fret === 0}
        <button
          type="button"
          class="fret-cell"
          class:open-cell={open}
          class:highlighted
          class:root
          class:root-not-root={highlighted && !root}
          aria-label="String {pos.stringNumber} fret {pos.fret}: {displayNote(pos, effFlats)}"
          aria-pressed={highlighted}
          onclick={() => handleSelect(pos)}
        >
          {#if highlighted}
            <span class="dot" class:solfege={effSolfege}>
              {positionLabel(pos, effFlats, effSolfege)}
            </span>
          {/if}
        </button>
      {/each}
    {/each}
  </div>
</div>

<style>
  .fretboard-scroll {
    --cell-w: 2.6rem;
    --open-w: 1.8rem;
    --string-color: var(--color-muted);
    --dot-bg: var(--color-surface);
    --dot-fg: var(--color-ink);
    --root-bg: var(--color-accent);
    --root-fg: var(--color-surface);
    padding-bottom: 0.5rem;
  }

  .fretboard-grid {
    display: grid;
    gap: 0;
    width: max-content;
  }

  /* Fret numbers + inlay header */
  .fret-number {
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.7rem;
    color: var(--color-muted);
    padding-bottom: 0.15rem;
  }
  .inlay-row {
    display: flex;
    gap: 0.35rem;
    margin-top: 0.1rem;
    min-height: 0.4rem;
  }
  .inlay-dot {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 9999px;
    background: var(--color-border);
  }

  /* A fret cell is a clickable position on a string. */
  .fret-cell {
    position: relative;
    height: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    /* The string line runs horizontally through the cell centre. */
    border-top: 2px solid var(--string-color);
  }
  /* Fret wire: a vertical divider on the left of each fretted cell. */
  .fret-cell:not(.open-cell) {
    border-left: 1px solid var(--color-border);
  }
  /* The nut: a thicker divider after the open-string column. */
  .open-cell + .fret-cell {
    border-left: 3px solid var(--color-ink);
  }

  .dot {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 9999px;
    background: var(--dot-bg);
    color: var(--dot-fg);
    border: 2px solid var(--color-ink);
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1;
  }
  .dot.solfege {
    font-size: 0.62rem;
  }

  /* Non-root highlighted notes: outlined dot. */
  .fret-cell.root-not-root .dot {
    background: var(--dot-bg);
    color: var(--color-ink);
  }
  /* Root note: solid accent fill. */
  .fret-cell.root .dot {
    background: var(--root-bg);
    color: var(--root-fg);
    border-color: var(--root-bg);
  }

  .fret-cell:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }
  .fret-cell:hover .dot {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    .fret-cell:hover .dot {
      transform: none;
    }
  }
</style>
