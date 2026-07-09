<script lang="ts">
  /**
   * Markdown.svelte — Reactive multi-line markdown renderer.
   *
   * Mirrors `renderMarkdown`'s block parsing (paragraphs + bullet/ordered
   * lists) but renders each block's inline content through `InlineText`, so
   * `{{note}}` tokens become reactive, coloured, clickable chips. Replaces the
   * old `{@html renderMarkdown(...)}` text-block rendering in LessonView.
   */
  import { parseBlocks } from '$lib/utils/markdown'
  import InlineText from './InlineText.svelte'

  interface Props {
    /** Multi-line markdown (paragraphs separated by blank lines; lists). */
    source: string
    /** Pass-through to InlineText (clickable note chips). */
    interactive?: boolean
  }

  let { source, interactive = true }: Props = $props()

  const blocks = $derived(parseBlocks(source))
</script>

{#each blocks as blk, i (i)}
  {#if blk.kind === 'p'}
    <p><InlineText source={blk.text} {interactive} /></p>
  {:else if blk.kind === 'ul'}
    <ul>
      {#each blk.items as it, j (i + '-' + j)}
        <li><InlineText source={it} {interactive} /></li>
      {/each}
    </ul>
  {:else if blk.kind === 'ol'}
    <ol>
      {#each blk.items as it, j (i + '-' + j)}
        <li><InlineText source={it} {interactive} /></li>
      {/each}
    </ol>
  {/if}
{/each}
