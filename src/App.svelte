<script lang="ts">
  import Layout from '$lib/components/Layout.svelte'
  import Home from './routes/Home.svelte'
  import Lessons from './routes/Lessons.svelte'
  import Lesson from './routes/Lesson.svelte'
  import Builder from './routes/Builder.svelte'
  import { route, navigate } from '$lib/router.svelte'
</script>

<Layout>
  {#if route.path === '/' || route.path === ''}
    <Home />
  {:else if route.path === '/lessons'}
    <Lessons />
  {:else if route.path.startsWith('/lessons/')}
    <Lesson />
  {:else if route.path === '/builder'}
    <Builder />
  {:else if route.path === '/about'}
    <section class="placeholder">
      <h1>About HarmoGuitar</h1>
      <p>
        HarmoGuitar is a free, static, interactive tutor that teaches Western
        tonal harmony to experienced guitarists who play well but want the
        theory grounding behind what they already feel.
      </p>
      <p>
        Everything runs in your browser — no account, no backend. The theory
        engine is a pure, unit-tested TypeScript library; the fretboard, staff
        and circle-of-fifths all stay synchronized to one shared selection.
      </p>
      <p class="muted">
        v1 covers foundations through functional harmony and the ii–V–I; v1.1
        extends into deep jazz harmony — from secondary dominants and tritone
        substitution through modal jazz, chord-scale theory, and reharmonization.
        Every progression is playable in time, and key grips are diagrammed on
        the fretboard.
      </p>
    </section>
  {:else}
    <section class="placeholder">
      <h1>Page not found</h1>
      <p>There's nothing at <code>{route.path}</code>.</p>
      <button type="button" class="btn" onclick={() => navigate('/')}>
        ← Go home
      </button>
    </section>
  {/if}
</Layout>

<style>
  .placeholder {
    max-width: 42rem;
  }
  .placeholder h1 {
    font-size: 1.8rem;
    margin-top: 0;
  }
  .placeholder p {
    line-height: 1.6;
    color: var(--color-ink);
  }
  .muted {
    color: var(--color-muted);
  }
  code {
    font-family: var(--font-mono);
    background: var(--color-bg);
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
    font-size: 0.9em;
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
  .btn:hover {
    filter: brightness(1.08);
  }
</style>
