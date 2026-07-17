<script lang="ts">
  /**
   * LessonView.svelte — Generic lesson reader.
   *
   * Renders any `Lesson` from its structured `Block[]`. Widget blocks apply
   * their `selection` to the shared store and embed the requested widgets, so
   * every fretboard/staff/wheel inside a lesson stays synchronized with the
   * rest of the app.
   *
   * Reference: PLAN.md Task 4.2, PROJECT.md ("structured data files rendered
   * by generic component").
   */
  import type { Lesson, Block, WidgetPlay } from '$lib/content/schema'
  import { prevLesson, nextLesson } from '$lib/content/lessons'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { notesToAscendingMidis, noteToMidi } from '$lib/theory/midi'
  import { parseChordSymbol, chordNotes, type ChordType } from '$lib/theory/chords'
  import { scaleNotes, type ScaleType } from '$lib/theory/scales'
  import type { NoteName } from '$lib/theory/notes'
  import { simpleInterval } from '$lib/theory/intervals'
  import { onDestroy } from 'svelte'
  import type { WidgetSelection } from '$lib/content/schema'
  import Markdown from '$lib/components/Markdown.svelte'
  import InlineText from '$lib/components/InlineText.svelte'
  import {
    markComplete,
    markIncomplete,
    isComplete,
  } from '$lib/services/progress.svelte'
  import { navigate } from '$lib/router.svelte'
  import Fretboard from '$lib/components/Fretboard.svelte'
  import Staff from '$lib/components/Staff.svelte'
  import IntervalWheel from '$lib/components/IntervalWheel.svelte'
  import CircleOfFifths from '$lib/components/CircleOfFifths.svelte'
  import Piano from '$lib/components/Piano.svelte'

  interface Props {
    lesson: Lesson
  }

  let { lesson }: Props = $props()

  // Completion state — reactive over the progress module's reactive list,
  // so the checkmark flips instantly when marked and re-syncs on navigation.
  const complete = $derived(isComplete(lesson.id))

  /** Apply a widget block's initial selection to the shared store. */
  function applySelection(block: Block): void {
    if (block.kind !== 'widget') return
    const s = block.selection
    if (s.clear) {
      app.clearSelection()
    }
    if (s.fretCount !== undefined) app.fretCount = s.fretCount
    if (s.key !== undefined) {
      app.key = s.key
      if (s.keyScaleType !== undefined) app.keyScaleType = s.keyScaleType
    }
    // Chord / scale / free mode.
    if (s.chordType !== undefined) {
      app.selectChord(s.root ?? app.rootNote, s.chordType)
    } else if (s.scaleType !== undefined) {
      app.selectScale(s.root ?? app.rootNote, s.scaleType)
    } else if (s.root !== undefined) {
      app.setRoot(s.root)
    }
  }

  // The first widget block in the lesson sets the store's initial state so
  // the first example the reader encounters is what renders. Subsequent
  // widgets are display-only (they share the same store).
  let firstWidgetApplied = false

  /** Svelte action: apply a widget block's selection when its figure mounts. */
  function applyWidget(node: HTMLElement, block: Block): void {
    if (!firstWidgetApplied) {
      applySelection(block)
      firstWidgetApplied = true
    }
  }

  function toggleComplete(): void {
    if (complete) {
      markIncomplete(lesson.id)
    } else {
      markComplete(lesson.id)
    }
  }

  const prev = $derived(prevLesson(lesson))
  const next = $derived(nextLesson(lesson))


  /** Play a single interval row: root then root+semitones, both ringing. */
  function playIntervalRow(root: NoteName, semitones: number): void {
    audio.playInterval(noteToMidi(root, 4), semitones)
  }

  /** Common name for a semitone offset (handles 0–12; 12 = octave). */
  function intervalName(semitones: number): string {
    if (semitones === 12) return 'Octave'
    return simpleInterval(semitones).name
  }

  /** Play a comparison of intervals from a root (a list item's example). */
  function playComparison(root: NoteName, offsets: number[]): void {
    audio.playIntervals(noteToMidi(root, 4), offsets)
  }

  /** Accessible label for a comparison button (e.g. "Play C Major 3rd, then C Minor 3rd"). */
  function comparisonLabel(root: NoteName, offsets: number[]): string {
    return `Play ${offsets.map((o) => `${root} ${intervalName(o)}`).join(', then ')}`
  }

  /**
   * Compute the highlight notes for a widget block's own selection, so each
   * widget displays the chord/scale its caption describes — instead of all
   * widgets sharing the store's single selection (which left every diagram
   * showing the first block's chord). Returns [] when the selection clears.
   */
  function selectionNotes(s: WidgetSelection): NoteName[] {
    if (s.clear) return []
    const root = s.root ?? app.rootNote
    if (s.chordType) return chordNotes(root, s.chordType)
    if (s.scaleType) return scaleNotes(root, s.scaleType)
    return []
  }

  /** Root note for a widget block's own selection (falls back to the store). */
  function selectionRoot(s: WidgetSelection): NoteName {
    return s.root ?? app.rootNote
  }

  /** True while a progression is actively playing on this specific block. */
  function isProgressingHere(block: Block): boolean {
    return (
      block.kind === 'widget' &&
      block.play?.kind === 'progression' &&
      activeProgression === block.play
    )
  }

  /** Play a widget block's own selection (chord or scale), not the store. */
  function playBlockSelection(block: Block): void {
    if (block.kind !== 'widget') return
    const notes = selectionNotes(block.selection)
    if (notes.length === 0) return
    if (block.selection.chordType) {
      audio.playChordByName(notes, { mode: 'strum' })
    } else {
      audio.playSequence(notesToAscendingMidis(notes), { mode: 'block' })
    }
  }

  /** Play a widget block's Play button, honouring an optional override. */
  function playWidget(block: Block, play?: WidgetPlay): void {
    if (play?.kind === 'progression') {
      // Toggle: if this progression is already playing, stop it.
      if (activeProgression === play) {
        stopProgression()
      } else {
        playProgression(play)
      }
      return
    }
    if (play?.kind === 'intervals-from-root') {
      const max = play.maxSemitones ?? 12
      const offsets = Array.from({ length: max + 1 }, (_, i) => i)
      audio.playIntervals(noteToMidi(play.root, 4), offsets)
      return
    }
    // No override: play this block's own selection (not the shared store).
    playBlockSelection(block)
  }

  // --- Progression playback -------------------------------------------------
  // A progression plays a sequence of chords in time, animating the shared
  // store through each chord so the fretboard/staff move in sync with the
  // audio. The original selection is restored when the progression ends.

  /**
   * The progression WidgetPlay currently playing, or null. Uses `$state.raw`
   * so the value is not proxied — identity comparison (`=== block.play`) works
   * for the toggle check and the button label.
   */
  let activeProgression = $state.raw<WidgetPlay | null>(null)
  /** Pending setTimeout handles for the store-animation + final restore. */
  let progressionTimers: ReturnType<typeof setTimeout>[] = []
  /** Snapshot of the store selection to restore after a progression. */
  let savedSelection:
    | { root: NoteName; chordType: ChordType | null; scaleType: ScaleType | null }
    | null = null

  /** Stop any playing progression: clear timers, silence audio, restore store. */
  function stopProgression(): void {
    for (const t of progressionTimers) clearTimeout(t)
    progressionTimers = []
    audio.stopAll()
    if (savedSelection) {
      if (savedSelection.scaleType !== null) {
        app.selectScale(savedSelection.root, savedSelection.scaleType)
      } else if (savedSelection.chordType !== null) {
        app.selectChord(savedSelection.root, savedSelection.chordType)
      } else {
        app.clearSelection()
        app.setRoot(savedSelection.root)
      }
      savedSelection = null
    }
    activeProgression = null
  }

  /** Play a progression: schedule audio + animate the store through each chord. */
  function playProgression(play: Extract<WidgetPlay, { kind: 'progression' }>): void {
    stopProgression()
    let chords: { root: NoteName; type: ChordType; notes: NoteName[] }[]
    try {
      chords = play.chords.map((sym) => {
        const { root, type } = parseChordSymbol(sym)
        return { root, type, notes: chordNotes(root, type) }
      })
    } catch {
      return
    }
    if (chords.length === 0) return

    const tempo = play.tempo ?? 100
    const beatsPerChord = play.beatsPerChord ?? 2
    const chordDurMs = ((60 / tempo) * beatsPerChord) * 1000

    savedSelection = {
      root: app.rootNote,
      chordType: app.chordType,
      scaleType: app.scaleType,
    }
    activeProgression = play

    // Animate the store through each chord in sync with the audio.
    chords.forEach((c, i) => {
      progressionTimers.push(
        setTimeout(() => app.selectChord(c.root, c.type), i * chordDurMs),
      )
    })
    // Restore the original selection after the last chord rings.
    progressionTimers.push(
      setTimeout(() => stopProgression(), chords.length * chordDurMs + 250),
    )

    audio.playProgression(
      chords.map((c) => c.notes),
      { tempo, beatsPerChord },
    )
  }

  onDestroy(() => stopProgression())
</script>

<svelte:head>
  <title>{lesson.title} · HarmoGuitar</title>
  <meta name="description" content={lesson.summary} />
</svelte:head>

<article class="lesson">
  <header class="lesson-head">
    <p class="kicker">Lesson</p>
    <h1>{lesson.title}</h1>
    <p class="summary">{lesson.summary}</p>
    <div class="meta">
      <span class="minutes">⏱ {lesson.minutes} min</span>
    </div>
  </header>

  <div class="blocks">
    {#each lesson.blocks as block (block)}
      {#if block.kind === 'heading'}
        {#if block.level === 2}
          <h2>{block.text}</h2>
        {:else}
          <h3>{block.text}</h3>
        {/if}
      {:else if block.kind === 'text'}
        <div class="prose"><Markdown source={block.markdown} /></div>
      {:else if block.kind === 'callout'}
        <aside class="callout {block.variant}">
          <span class="callout-icon" aria-hidden="true">
            {block.variant === 'tip' ? '💡' : block.variant === 'warning' ? '⚠️' : '📝'}
          </span>
          <div class="prose"><InlineText source={block.markdown} /></div>
        </aside>
      {:else if block.kind === 'list'}
        {#if block.ordered}
          <ol class="prose-list">
            {#each block.items as item, i (item + i)}
              <li class:has-play={block.playable}>
                {#if block.playable}
                  <div class="li-row">
                    <span class="li-text"><InlineText source={item} /></span>
                    <button
                      type="button"
                      class="row-play"
                      aria-label={comparisonLabel(
                        block.playable.root,
                        block.playable.offsets[i] ?? [],
                      )}
                      onclick={() =>
                        playComparison(
                          block.playable!.root,
                          block.playable!.offsets[i] ?? [],
                        )}
                    >▶</button>
                  </div>
                {:else}
                  <InlineText source={item} />
                {/if}
              </li>
            {/each}
          </ol>
        {:else}
          <ul class="prose-list">
            {#each block.items as item, i (item + i)}
              <li class:has-play={block.playable}>
                {#if block.playable}
                  <div class="li-row">
                    <span class="li-text"><InlineText source={item} /></span>
                    <button
                      type="button"
                      class="row-play"
                      aria-label={comparisonLabel(
                        block.playable.root,
                        block.playable.offsets[i] ?? [],
                      )}
                      onclick={() =>
                        playComparison(
                          block.playable!.root,
                          block.playable!.offsets[i] ?? [],
                        )}
                    >▶</button>
                  </div>
                {:else}
                  <InlineText source={item} />
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      {:else if block.kind === 'table'}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                {#each block.headers as h (h)}<th>{h}</th>{/each}
                {#if block.playable}<th class="play-col"><span class="sr-only">Play</span></th>{/if}
              </tr>
            </thead>
            <tbody>
              {#each block.rows as row, ri (ri)}
                <tr>
                  {#each row as cell, ci (ri + ci)}<td><InlineText source={cell} /></td>{/each}
                  {#if block.playable}
                    <td class="play-col">
                      <button
                        type="button"
                        class="row-play"
                        aria-label="Play {block.playable.root} to {row[1] ?? 'interval'}"
                        onclick={() =>
                          playIntervalRow(
                            block.playable!.root,
                            block.playable!.semitones[ri] ?? 0,
                          )}
                      >▶</button>
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else if block.kind === 'piano'}
        <figure class="widget-block piano-block">
          <Piano
            octaves={block.octaves ?? 2}
            highlightNotes={block.notes}
          />
          {#if block.caption}
            <figcaption><InlineText source={block.caption} /></figcaption>
          {/if}
        </figure>
      {:else if block.kind === 'widget'}
        <figure class="widget-block" use:applyWidget={block}>
          <div class="widget-grid {block.widgets.length === 1 ? 'single' : 'multi'}">
            {#each block.widgets as w (w)}
              {#if w === 'fretboard'}
                <div class="widget-cell">
                  <Fretboard
                    fretCount={app.fretCount}
                    markPositions={block.voicing}
                    highlightNotes={isProgressingHere(block) ? undefined : selectionNotes(block.selection)}
                    rootNote={isProgressingHere(block) ? undefined : selectionRoot(block.selection)}
                  />
                </div>
              {:else if w === 'staff'}
                <div class="widget-cell">
                  <Staff
                    notes={isProgressingHere(block) ? undefined : selectionNotes(block.selection)}
                    asScale={isProgressingHere(block) ? undefined : !!block.selection.scaleType}
                  />
                </div>
              {:else if w === 'interval-wheel'}
                <div class="widget-cell wheel-cell">
                  <IntervalWheel size={280} />
                </div>
              {:else if w === 'circle-of-fifths'}
                <div class="widget-cell wheel-cell">
                  <CircleOfFifths size={280} />
                </div>
              {/if}
            {/each}
          </div>
          {#if block.caption}
            <figcaption><InlineText source={block.caption} /></figcaption>
          {/if}
          <div class="widget-actions">
            <button type="button" class="play-btn" onclick={() => playWidget(block, block.play)}>
              {#if block.play?.kind === 'progression' && activeProgression === block.play}
                ■ Stop
              {:else if block.play?.kind === 'progression'}
                ▶ Play progression
              {:else}
                ▶ Play
              {/if}
            </button>
          </div>
        </figure>
      {/if}
    {/each}
  </div>

  <footer class="lesson-foot">
    <button
      type="button"
      class="complete-btn"
      class:done={complete}
      onclick={toggleComplete}
    >
      {complete ? '✓ Completed' : 'Mark as complete'}
    </button>

    <nav class="lesson-nav">
      {#if prev}
        <button type="button" class="nav-btn prev" onclick={() => navigate(`/lessons/${prev.slug}`)}>
          ← {prev.title}
        </button>
      {:else}
        <span></span>
      {/if}
      {#if next}
        <button type="button" class="nav-btn next" onclick={() => navigate(`/lessons/${next.slug}`)}>
          {next.title} →
        </button>
      {/if}
    </nav>
  </footer>
</article>

<style>
  .lesson {
    max-width: 46rem;
    margin: 0 auto;
  }

  /* Header */
  .lesson-head {
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }
  .kicker {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-accent);
    margin: 0 0 0.3rem;
  }
  .lesson-head h1 {
    font-size: 1.85rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    color: var(--color-ink);
  }
  .summary {
    color: var(--color-muted);
    line-height: 1.55;
    margin: 0 0 0.6rem;
    font-size: 1.02rem;
  }
  .meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--color-muted);
  }

  /* Prose */
  .blocks {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .blocks h2 {
    font-size: 1.35rem;
    margin: 1.5rem 0 0;
    color: var(--color-ink);
  }
  .blocks h3 {
    font-size: 1.1rem;
    margin: 1rem 0 0;
    color: var(--color-ink);
  }
  .prose {
    line-height: 1.65;
    color: var(--color-ink);
  }
  .prose :global(p) {
    margin: 0 0 0.7rem;
  }
  .prose :global(p:last-child) {
    margin-bottom: 0;
  }
  .prose :global(strong) {
    font-weight: 700;
  }
  .prose :global(em) {
    font-style: italic;
  }
  .prose :global(code) {
    font-family: var(--font-mono);
    background: var(--color-bg);
    padding: 0.1rem 0.35rem;
    border-radius: 0.3rem;
    font-size: 0.88em;
  }
  .prose :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
  }
  .prose :global(ul),
  .prose :global(ol) {
    margin: 0 0 0.7rem;
    padding-left: 1.3rem;
  }
  .prose :global(li) {
    margin: 0.25rem 0;
  }
  .prose-list {
    margin: 0;
    padding-left: 1.4rem;
    line-height: 1.65;
    color: var(--color-ink);
  }
  .prose-list li {
    margin: 0.3rem 0;
  }
  /* List items with a comparison Play button: text on the left, button on
   * the right (never wraps mid-text). The flex lives on an inner wrapper so
   * the <li> keeps its default list-marker (bullet / number). */
  .prose-list li.has-play .li-row {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .prose-list li.has-play .li-text {
    flex: 1 1 auto;
  }
  .prose-list li.has-play .row-play {
    flex: 0 0 auto;
    margin-top: 0.1rem;
  }

  /* Callout */
  .callout {
    display: flex;
    gap: 0.7rem;
    align-items: flex-start;
    padding: 0.85rem 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid var(--color-accent);
    background: var(--color-accent-soft);
    line-height: 1.6;
  }
  .callout.note {
    border-left-color: var(--color-muted);
    background: var(--color-raised);
  }
  .callout.warning {
    border-left-color: var(--color-warning);
    background: var(--color-warning-soft);
  }
  .callout :global(p) {
    margin: 0;
  }
  .callout-icon {
    font-size: 1.1rem;
    line-height: 1.4;
    flex-shrink: 0;
  }

  /* Table */
  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  th,
  td {
    padding: 0.5rem 0.7rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
  thead th {
    background: var(--color-raised);
    font-weight: 700;
    color: var(--color-ink);
    white-space: nowrap;
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  /* Per-row Play button column (playable tables, e.g. intervals). */
  .play-col {
    width: 2.6rem;
    text-align: center;
    white-space: nowrap;
  }
  .row-play {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.4rem;
    width: 2rem;
    height: 2rem;
    line-height: 1;
    cursor: pointer;
    font: inherit;
    font-size: 0.8rem;
    padding: 0;
  }
  .row-play:hover {
    filter: brightness(1.1);
  }
  .row-play:active {
    transform: translateY(1px);
  }
  td :global(code) {
    font-family: var(--font-mono);
    font-size: 0.85em;
  }

  /* Compact the intervals table on small screens so the per-row Play
   * buttons stay visible without horizontal scrolling. */
  @media (max-width: 480px) {
    table {
      font-size: 0.8rem;
    }
    th,
    td {
      padding: 0.35rem 0.4rem;
    }
    .play-col {
      width: 2.2rem;
    }
    .row-play {
      width: 1.7rem;
      height: 1.7rem;
      font-size: 0.72rem;
    }
  }

  /* Widget block */
  .widget-block {
    margin: 1.4rem 0 0.5rem;
    padding: 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.7rem;
  }
  .widget-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .widget-grid.multi {
    gap: 1.25rem;
  }
  .widget-cell {
    width: 100%;
  }
  .wheel-cell {
    display: flex;
    justify-content: center;
  }
  figcaption {
    margin-top: 0.75rem;
    font-size: 0.83rem;
    color: var(--color-muted);
    text-align: center;
    line-height: 1.5;
  }
  .widget-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.6rem;
  }
  .play-btn {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.5rem;
    padding: 0.4rem 1.1rem;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
  }
  .play-btn:hover {
    filter: brightness(1.08);
  }

  /* Footer */
  .lesson-foot {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  .complete-btn {
    display: block;
    width: 100%;
    padding: 0.7rem;
    border: 2px solid var(--color-accent);
    background: transparent;
    color: var(--color-accent);
    border-radius: 0.6rem;
    font: inherit;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: background 0.15s, color 0.15s;
  }
  .complete-btn:hover {
    background: var(--color-accent-soft);
  }
  .complete-btn.done {
    background: var(--color-accent);
    color: var(--color-surface);
  }
  .lesson-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .nav-btn {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-ink);
    padding: 0.6rem 0.9rem;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    max-width: 48%;
    text-align: center;
  }
  .nav-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .nav-btn.next {
    margin-left: auto;
  }

  @media (min-width: 760px) {
    .widget-grid.multi {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .widget-grid.multi .widget-cell {
      flex: 1 1 300px;
    }
    .widget-grid.multi .wheel-cell {
      flex: 0 1 300px;
    }
  }
</style>
