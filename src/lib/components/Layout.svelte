<script lang="ts">
  import Nav from './Nav.svelte'
  import { navigate } from '$lib/router.svelte'

  let { children }: { children?: import('svelte').Snippet } = $props()

  const year = new Date().getFullYear()
</script>

<div class="app-shell">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <Nav />

  <main id="main-content" class="main">
    {@render children?.()}
  </main>

  <footer class="footer">
    <p>
      HarmoGuitar — interactive guitar harmony tutor.
      <a href="#/about" onclick={() => navigate('/about')}>About</a> ·
      <button
        type="button"
        class="link-button"
        onclick={() => navigate('/')}
      >Home</button>
    </p>
    <p class="muted">© {year} · Built with Svelte, Vite, VexFlow &amp; D3.</p>
  </footer>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main {
    flex: 1 0 auto;
    width: 100%;
    max-width: 56rem;
    margin: 0 auto;
    padding: 1.5rem 1rem 3rem;
  }
  .footer {
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
    padding: 1.25rem 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: var(--color-muted);
  }
  .footer a {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .link-button {
    color: var(--color-accent);
    text-decoration: none;
  }
  .link-button {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    font: inherit;
  }
  .skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    z-index: 100;
    background: var(--color-accent);
    color: var(--color-surface);
    padding: 0.5rem 1rem;
    border-radius: 0 0 0.4rem 0;
    text-decoration: none;
  }
  .skip-link:focus {
    left: 0;
  }
  .muted {
    color: var(--color-muted);
    font-size: 0.8rem;
  }
</style>
