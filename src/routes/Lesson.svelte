<script lang="ts">
  /**
   * Lesson.svelte — Lesson detail route.
   *
   * Parses the slug from the hash route (`/lessons/<slug>`) and renders the
   * generic LessonView for the matching lesson, or a not-found message.
   */
  import { route, navigate } from '$lib/router.svelte'
  import { lessonBySlug } from '$lib/content/lessons'
  import LessonView from '$lib/components/LessonView.svelte'

  // Derive the slug from the path: "/lessons/notes-fretboard" → "notes-fretboard".
  const slug = $derived(route.path.replace(/^\/lessons\//, ''))
  const lesson = $derived(lessonBySlug(slug))
</script>

{#if lesson}
  {#key lesson.id}
    <LessonView {lesson} />
  {/key}
{:else}
  <section class="not-found">
    <h1>Lesson not found</h1>
    <p>There's no lesson at <code>{route.path}</code>.</p>
    <button type="button" class="btn" onclick={() => navigate('/lessons')}>
      ← Back to all lessons
    </button>
  </section>
{/if}

<style>
  .not-found {
    max-width: 42rem;
  }
  .not-found h1 {
    font-size: 1.6rem;
  }
  p {
    line-height: 1.6;
  }
  code {
    font-family: var(--font-mono);
    background: var(--color-bg);
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
  }
  .btn {
    margin-top: 1rem;
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
  }
</style>
