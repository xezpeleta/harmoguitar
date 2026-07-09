<script lang="ts">
  /**
   * InlineText.svelte — Reactive inline-markdown renderer with note chips.
   *
   * Parses an inline-markdown string into text segments and `{{note}}` tokens
   * (via `parseInline`). Text segments render as escaped, formatted HTML; each
   * note token renders as a `NoteBadge` chip that:
   *   - shows the note's pitch-class colour,
   *   - follows the CDE/DoReMi toggle (NoteBadge reads `app.showSolfege`),
   *   - is clickable to play the note (when `interactive`).
   *
   * This is what makes lesson prose notation adapt to the naming toggle.
   * Reference: markdown.ts, NoteBadge.svelte.
   */
  import { parseInline } from '$lib/utils/markdown'
  import NoteBadge from './NoteBadge.svelte'
  import { audio } from '$lib/services/audio'
  import type { NoteName } from '$lib/theory/notes'

  interface Props {
    /** Inline markdown (may contain `{{C}}` note tokens). */
    source: string
    /** Make note chips clickable to play the note (default true). */
    interactive?: boolean
  }

  let { source, interactive = true }: Props = $props()

  const nodes = $derived(parseInline(source))

  function play(note: NoteName): void {
    audio.playNoteName(note, 4, { duration: 0.9, velocity: 0.6 })
  }
</script>

{#each nodes as node, i (i)}
  {#if node.kind === 'text'}
    {@html node.html}
  {:else if interactive}
    <button
      type="button"
      class="note-chip-btn"
      title="Play {node.note}"
      aria-label="Play note {node.note}"
      onclick={() => play(node.note)}
    >
      <NoteBadge note={node.note} dot={false} filled />
    </button>
  {:else}
    <NoteBadge note={node.note} dot={false} filled />
  {/if}
{/each}

<style>
  /* A note chip sits inline in prose; the wrapper is a transparent button so
   * the chip is keyboard-focusable and clickable without breaking flow. */
  .note-chip-btn {
    display: inline-flex;
    align-items: center;
    vertical-align: baseline;
    background: none;
    border: 0;
    padding: 0;
    margin: 0 1px;
    cursor: pointer;
    line-height: inherit;
    font: inherit;
  }
  .note-chip-btn :global(.note-badge) {
    font-size: 0.82em;
    padding: 0.05rem 0.4rem;
  }
</style>
