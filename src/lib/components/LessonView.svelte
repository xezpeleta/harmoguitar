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
  import type { Lesson, Block } from '$lib/content/schema'
  import { prevLesson, nextLesson } from '$lib/content/lessons'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { notesToAscendingMidis } from '$lib/theory/midi'
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

  function playSelection(): void {
    const notes = app.highlightNotes
    if (notes.length === 0) return
    if (app.mode === 'chord') {
      audio.playChordByName(notes, { mode: 'strum' })
    } else {
      audio.playSequence(notesToAscendingMidis(notes), { mode: 'block' })
    }
  }
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
              <li><InlineText source={item} /></li>
            {/each}
          </ol>
        {:else}
          <ul class="prose-list">
            {#each block.items as item, i (item + i)}
              <li><InlineText source={item} /></li>
            {/each}
          </ul>
        {/if}
      {:else if block.kind === 'table'}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>{#each block.headers as h (h)}<th>{h}</th>{/each}</tr>
            </thead>
            <tbody>
              {#each block.rows as row, ri (ri)}
                <tr>{#each row as cell, ci (ri + ci)}<td><InlineText source={cell} /></td>{/each}</tr>
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
                  <Fretboard fretCount={app.fretCount} />
                </div>
              {:else if w === 'staff'}
                <div class="widget-cell">
                  <Staff />
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
            <button type="button" class="play-btn" onclick={playSelection}>
              ▶ Play
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
  td :global(code) {
    font-family: var(--font-mono);
    font-size: 0.85em;
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
