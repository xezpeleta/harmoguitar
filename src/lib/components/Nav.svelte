<script lang="ts">
  import { route, navigate, NAV_ITEMS } from '$lib/router.svelte'
  import { app } from '$lib/stores/app.svelte'

  function isActive(path: string): boolean {
    if (path === '/') return route.path === '/' || route.path === ''
    return route.path === path
  }

  // Settings toggles live in the nav for quick access from any page.
  let menuOpen = $state(false)
</script>

<nav class="nav" aria-label="Main navigation">
  <a class="brand" href="#/" onclick={() => navigate('/')}>
    <span class="brand-mark" aria-hidden="true">♩</span>
    <span class="brand-text">HarmoGuitar</span>
  </a>

  <button
    class="menu-toggle"
    aria-expanded={menuOpen}
    aria-label="Toggle navigation menu"
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
  </button>

  <ul class="nav-links" class:open={menuOpen}>
    {#each NAV_ITEMS as item (item.path)}
      <li>
        <a
          href={'#' + item.path}
          class:active={isActive(item.path)}
          aria-current={isActive(item.path) ? 'page' : undefined}
          onclick={() => (menuOpen = false)}
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ul>

  <div class="nav-tools" class:open={menuOpen}>
    <div class="seg" role="group" aria-label="Note naming system">
      <button
        type="button"
        class:active={!app.showSolfege}
        aria-pressed={!app.showSolfege}
        title="Alphabetic note names (C D E…)"
        onclick={() => (app.showSolfege = false)}
      >C D E</button>
      <button
        type="button"
        class:active={app.showSolfege}
        aria-pressed={app.showSolfege}
        title="Fixed-Do solfège (Do Re Mi…)"
        onclick={() => (app.showSolfege = true)}
      >Do Re Mi</button>
    </div>
  </div>
</nav>

<style>
  .nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 1rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-surface);
    flex-wrap: wrap;
  }
  .brand {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--color-ink);
    text-decoration: none;
    margin-right: auto;
  }
  .brand-mark {
    color: var(--color-accent);
    font-size: 1.3rem;
  }
  .menu-toggle {
    display: none;
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 0.4rem;
    padding: 0.25rem 0.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    color: var(--color-ink);
  }
  .nav-links {
    display: flex;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-links a {
    display: inline-block;
    padding: 0.35rem 0.7rem;
    border-radius: 0.4rem;
    text-decoration: none;
    color: var(--color-muted);
    font-weight: 500;
  }
  .nav-links a:hover {
    background: var(--color-bg);
    color: var(--color-ink);
  }
  .nav-links a.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }
  .nav-tools {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .seg {
    display: inline-flex;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .seg button {
    background: var(--color-surface);
    border: 0;
    border-right: 1px solid var(--color-border);
    padding: 0.3rem 0.55rem;
    cursor: pointer;
    font: inherit;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--color-muted);
    line-height: 1.2;
  }
  .seg button:last-child {
    border-right: 0;
  }
  .seg button:hover {
    color: var(--color-ink);
  }
  .seg button.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-weight: 600;
  }

  /* Collapse to a hamburger menu on narrow screens. */
  @media (max-width: 640px) {
    .menu-toggle {
      display: inline-flex;
    }
    .nav-links,
    .nav-tools {
      display: none;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
    .nav-links.open,
    .nav-tools.open {
      display: flex;
    }
    .brand {
      margin-right: 0;
    }
  }
</style>
