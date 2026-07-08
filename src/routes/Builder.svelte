<script lang="ts">
  /**
   * Builder.svelte — Chord & scale builder / experiment tool.
   *
   * A focused workbench: pick a root and a chord OR scale type, and instantly
   * see the formula, intervals, notes, fretboard, staff, and interval wheel —
   * plus buttons to play the chord (strummed), the arpeggio, or the scale.
   *
   * Bound to the shared `app` store, so it stays in sync with every other
   * widget in the app.
   *
   * Reference: PLAN.md Task 4.4, PROMPT.md FR6.
   */
  import { allNotes, type NoteName } from '$lib/theory/notes'
  import {
    CHORD_NAMES,
    chordIntervals,
    chordSymbol,
    type ChordType,
  } from '$lib/theory/chords'
  import {
    SCALE_NAMES,
    scaleIntervals,
    type ScaleType,
  } from '$lib/theory/scales'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { notesToAscendingMidis } from '$lib/theory/midi'
  import Fretboard from '$lib/components/Fretboard.svelte'
  import Staff from '$lib/components/Staff.svelte'
  import IntervalWheel from '$lib/components/IntervalWheel.svelte'
  import NoteBadge from '$lib/components/NoteBadge.svelte'

  const roots = $derived(allNotes(app.preferFlats))
  const chordTypes = $derived(Object.keys(CHORD_NAMES) as ChordType[])
  const scaleTypes = $derived(Object.keys(SCALE_NAMES) as ScaleType[])

  // Which family is active.
  const isChord = $derived(app.chordType !== null)

  // Formula + intervals + notes for the active selection.
  const intervals = $derived.by<string[]>(() => {
    if (app.chordType) return chordIntervals(app.chordType)
    if (app.scaleType) return scaleIntervals(app.scaleType)
    return []
  })

  const notes = $derived(app.highlightNotes)

  const heading = $derived(
    isChord && app.chordType
      ? chordSymbol(app.rootNote, app.chordType)
      : app.scaleType
        ? `${app.rootNote} ${SCALE_NAMES[app.scaleType]}`
        : 'Free selection',
  )

  function pickRoot(n: NoteName): void {
    app.setRoot(n)
  }
  function pickChord(t: ChordType): void {
    app.selectChord(app.rootNote, t)
  }
  function pickScale(t: ScaleType): void {
    app.selectScale(app.rootNote, t)
  }
  function goChord(): void {
    if (app.chordType === null) app.selectChord(app.rootNote, 'major')
  }
  function goScale(): void {
    if (app.scaleType === null) app.selectScale(app.rootNote, 'major')
  }

  // --- Audio ---
  function playChord(): void {
    if (notes.length === 0) return
    audio.playChordByName(notes, { mode: 'strum' })
  }
  function playArpeggio(): void {
    if (notes.length === 0) return
    audio.playSequence(notesToAscendingMidis(notes), { mode: 'block' })
  }
  function playScale(): void {
    if (notes.length === 0) return
    audio.playSequence(notesToAscendingMidis(notes), { stagger: 0.13 })
  }
</script>

<svelte:head>
  <title>Builder · HarmoGuitar</title>
</svelte:head>

<section class="builder">
  <header>
    <h1>Builder</h1>
    <p class="lede">
      Pick a root and a chord or scale type. See its formula, intervals, and
      notes — and hear it as a chord, an arpeggio, or a rising scale.
    </p>
  </header>

  <!-- Family toggle -->
  <div class="seg" role="tablist" aria-label="Family">
    <button
      type="button"
      role="tab"
      aria-selected={isChord}
      class:active={isChord}
      onclick={goChord}>Chord</button
    >
    <button
      type="button"
      role="tab"
      aria-selected={!isChord && app.scaleType !== null}
      class:active={!isChord && app.scaleType !== null}
      onclick={goScale}>Scale</button
    >
  </div>

  <!-- Root selector -->
  <div class="control">
    <span class="label">Root</span>
    <div class="pills">
      {#each roots as n (n)}
        <button
          type="button"
          class="pill"
          class:active={app.rootNote === n}
          onclick={() => pickRoot(n)}>{n}</button
        >
      {/each}
    </div>
  </div>

  <!-- Type selector -->
  <div class="control">
    <span class="label">{isChord ? 'Chord type' : 'Scale type'}</span>
    <div class="pills wrap">
      {#if isChord}
        {#each chordTypes as t (t)}
          <button
            type="button"
            class="pill"
            class:active={app.chordType === t}
            onclick={() => pickChord(t)}>{CHORD_NAMES[t]}</button
          >
        {/each}
      {:else}
        {#each scaleTypes as t (t)}
          <button
            type="button"
            class="pill"
            class:active={app.scaleType === t}
            onclick={() => pickScale(t)}>{SCALE_NAMES[t]}</button
          >
        {/each}
      {/if}
    </div>
  </div>

  <!-- Readout: formula, intervals, notes -->
  <div class="readout">
    <h2 class="readout-title">{heading}</h2>

    <div class="readout-row">
      <span class="rk">Formula</span>
      <span class="rv formula">
        {#each intervals as sym, i (sym + i)}
          <span class="chip">{sym}</span>
        {/each}
      </span>
    </div>

    <div class="readout-row">
      <span class="rk">Notes</span>
      <span class="rv notes">
        {#each notes as note, i (note + i)}
          <NoteBadge {note} variant={i === 0 ? 'root' : 'plain'} />
        {/each}
      </span>
    </div>

    <div class="readout-row">
      <span class="rk">Intervals</span>
      <span class="rv">{intervals.join(' · ')}</span>
    </div>
  </div>

  <!-- Playback -->
  <div class="play-row">
    {#if isChord}
      <button type="button" class="btn" onclick={playChord}>▶ Strum</button>
      <button type="button" class="btn ghost" onclick={playArpeggio}>▶ Arpeggio</button>
    {:else}
      <button type="button" class="btn" onclick={playScale}>▶ Play scale</button>
      <button type="button" class="btn ghost" onclick={playArpeggio}>▶ Arpeggio</button>
    {/if}
  </div>

  <!-- Visualisations -->
  <div class="viz">
    <div class="viz-card full">
      <Fretboard fretCount={app.fretCount} />
    </div>
    <div class="viz-card full">
      <Staff />
    </div>
    <div class="viz-card wheel">
      <IntervalWheel size={300} />
    </div>
  </div>
</section>

<style>
  .builder {
    max-width: 56rem;
    margin: 0 auto;
  }
  header {
    margin-bottom: 1.25rem;
  }
  h1 {
    font-size: 1.8rem;
    margin: 0 0 0.4rem;
  }
  .lede {
    color: var(--color-muted);
    line-height: 1.55;
    margin: 0;
  }

  /* Segmented family toggle */
  .seg {
    display: inline-flex;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
  }
  .seg button {
    background: transparent;
    border: 0;
    padding: 0.45rem 1.1rem;
    font: inherit;
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--color-muted);
    cursor: pointer;
  }
  .seg button.active {
    background: var(--color-accent);
    color: var(--color-surface);
  }

  /* Controls */
  .control {
    margin-bottom: 1rem;
  }
  .label {
    display: block;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-muted);
    margin-bottom: 0.4rem;
  }
  .pills {
    display: flex;
    gap: 0.35rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 0.2rem;
  }
  .pills.wrap {
    flex-wrap: wrap;
    overflow: visible;
  }
  .pill {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-ink);
    border-radius: 0.45rem;
    padding: 0.35rem 0.6rem;
    font: inherit;
    font-size: 0.84rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .pill:hover {
    border-color: var(--color-accent);
  }
  .pill.active {
    background: var(--color-accent);
    color: var(--color-surface);
    border-color: var(--color-accent);
  }

  /* Readout */
  .readout {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.7rem;
    padding: 1rem 1.1rem;
    margin-bottom: 1rem;
  }
  .readout-title {
    font-size: 1.3rem;
    margin: 0 0 0.7rem;
    color: var(--color-ink);
  }
  .readout-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.35rem 0;
    border-top: 1px solid var(--color-border);
  }
  .readout-row:first-of-type {
    border-top: 0;
  }
  .rk {
    flex: 0 0 5.5rem;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-muted);
  }
  .rv {
    color: var(--color-ink);
    font-size: 0.95rem;
  }
  .formula {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  .chip {
    font-family: var(--font-mono);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 0.35rem;
    padding: 0.1rem 0.45rem;
    font-size: 0.85rem;
  }
  .notes {
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
    align-items: center;
  }

  /* Play row */
  .play-row {
    display: flex;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  }
  .btn {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem 1.1rem;
    font: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .btn:hover {
    filter: brightness(1.08);
  }
  .btn.ghost {
    background: transparent;
    color: var(--color-accent);
    border: 1px solid var(--color-accent);
  }
  .btn.ghost:hover {
    background: var(--color-accent-soft);
  }

  /* Viz */
  .viz {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .viz-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.7rem;
    padding: 0.9rem;
  }
  .viz-card.wheel {
    display: flex;
    justify-content: center;
  }
</style>
