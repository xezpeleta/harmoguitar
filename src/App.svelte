<script lang="ts">
  // Placeholder shell — replaced by real layout/nav in Task 2.4.
  let count = $state(0)
</script>

<main class="mx-auto max-w-3xl px-6 py-16 text-center">
  <h1 class="text-4xl font-semibold tracking-tight">HarmoGuitar</h1>
  <p class="mt-3 text-lg" style="color: var(--color-muted)">
    Interactive guitar harmony tutor
  </p>
  <p class="mt-8">
    The theory engine and interactive widgets are being built. Check back soon.
  </p>

  <button
    class="mt-8 rounded-lg px-4 py-2 font-mono"
    style="background: var(--color-accent-soft); color: var(--color-accent)"
    onclick={() => count++}
  >
    scaffold check: {count}
  </button>
</main>
