<script lang="ts">
  /**
   * Lessons.svelte — The lesson list / table of contents.
   *
   * Shows the ordered v1 learning path with completion status, total minutes,
   * and a progress bar. Clicking a lesson navigates to its reader page.
   */
  import { LESSONS } from '$lib/content/lessons'
  import { navigate } from '$lib/router.svelte'
  import { isComplete, completedCount, resetProgress } from '$lib/services/progress.svelte'

  // Reactive over the progress module's reactive list.
  const doneCount = $derived(completedCount())
  function done(id: string): boolean {
    return isComplete(id)
  }

  const totalMinutes = LESSONS.reduce((sum, l) => sum + l.minutes, 0)

  function open(slug: string): void {
    navigate(`/lessons/${slug}`)
  }

  function reset(): void {
    resetProgress()
  }
</script>

<svelte:head>
  <title>Lessons · HarmoGuitar</title>
</svelte:head>

<section class="lessons">
  <header>
    <h1>Lessons</h1>
    <p class="lede">
      A guided path from the notes on the fretboard to functional harmony and
      the ii–V–I. Each lesson pairs concise theory with live, interactive
      fretboards, staves, and wheels.
    </p>
  </header>

  <div class="progress-card">
    <div class="progress-info">
      <span class="count">{doneCount} / {LESSONS.length}</span>
      <span class="label">lessons completed</span>
    </div>
    <div class="progress-bar" role="progressbar"
      aria-label="Lessons completed: {doneCount} of {LESSONS.length}"
      aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={LESSONS.length}>
      <div class="progress-fill" style="width: {(doneCount / LESSONS.length) * 100}%"></div>
    </div>
    {#if doneCount > 0}
      <button type="button" class="reset" onclick={reset}>Reset progress</button>
    {/if}
  </div>

  <ol class="lesson-list">
    {#each LESSONS as lesson, i (lesson.id)}
      <li>
        <button
          type="button"
          class="lesson-card"
          class:done={done(lesson.id)}
          onclick={() => open(lesson.slug)}
        >
          <span class="number">{String(i + 1).padStart(2, '0')}</span>
          <div class="body">
            <h2>{lesson.title}</h2>
            <p>{lesson.summary}</p>
          </div>
          <div class="side">
            {#if done(lesson.id)}
              <span class="check" aria-label="completed">✓</span>
            {/if}
            <span class="minutes">{lesson.minutes}m</span>
          </div>
        </button>
      </li>
    {/each}
  </ol>

  <footer class="total">
    <span>≈ {totalMinutes} minutes total</span>
    <span class="dot">·</span>
    <span>14 lessons · v1 curriculum</span>
  </footer>
</section>

<style>
  .lessons {
    max-width: 46rem;
    margin: 0 auto;
  }
  header {
    margin-bottom: 1.5rem;
  }
  h1 {
    font-size: 1.8rem;
    margin: 0 0 0.5rem;
  }
  .lede {
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0;
  }

  .progress-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem 1.2rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.7rem;
    margin-bottom: 1.5rem;
  }
  .progress-info {
    display: flex;
    flex-direction: column;
  }
  .count {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-accent);
    line-height: 1;
  }
  .label {
    font-size: 0.8rem;
    color: var(--color-muted);
  }
  .progress-bar {
    flex: 1 1 200px;
    height: 0.6rem;
    background: var(--color-raised);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--color-accent);
    border-radius: 999px;
    transition: width 0.3s ease;
  }
  .reset {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-muted);
    border-radius: 0.4rem;
    padding: 0.3rem 0.7rem;
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }
  .reset:hover {
    color: var(--color-ink);
    border-color: var(--color-muted);
  }

  .lesson-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .lesson-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    text-align: left;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.6rem;
    padding: 0.9rem 1rem;
    cursor: pointer;
    font: inherit;
    transition: border-color 0.15s, transform 0.06s;
  }
  .lesson-card:hover {
    border-color: var(--color-accent);
  }
  .lesson-card:active {
    transform: scale(0.997);
  }
  .lesson-card.done {
    border-left: 4px solid var(--color-accent);
  }
  .number {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-accent);
    flex-shrink: 0;
    width: 2rem;
  }
  .body {
    flex: 1;
    min-width: 0;
  }
  .body h2 {
    font-size: 1.02rem;
    margin: 0 0 0.15rem;
    color: var(--color-ink);
  }
  .body p {
    margin: 0;
    font-size: 0.86rem;
    color: var(--color-muted);
    line-height: 1.45;
  }
  .side {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-shrink: 0;
  }
  .check {
    color: var(--color-accent);
    font-weight: 700;
  }
  .minutes {
    font-size: 0.78rem;
    color: var(--color-muted);
    white-space: nowrap;
  }

  .total {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--color-muted);
  }
  .dot {
    margin: 0 0.4rem;
  }
</style>
