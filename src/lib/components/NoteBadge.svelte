<script lang="ts">
  import { type NoteName, toPitchClass } from '$lib/theory/notes'
  import { toSolfege } from '$lib/theory/solfege'
  import { noteColor, readableForeground } from '$lib/utils/colors'
  import { app } from '$lib/stores/app.svelte'

  interface Props {
    note: NoteName
    /** Visual emphasis. */
    variant?: 'plain' | 'root' | 'muted'
    /** Show fixed-Do solfège instead of (or with) the note name. */
    showSolfege?: boolean
    /** Render a small color dot before the label (default true). */
    dot?: boolean
    /** Fill the whole badge with the note color (default false). */
    filled?: boolean
  }

  let {
    note,
    variant = 'plain',
    showSolfege,
    dot = true,
    filled = false,
  }: Props = $props()

  const effSolfege = $derived(showSolfege ?? app.showSolfege)
  const color = $derived(noteColor(note))
  const fg = $derived(readableForeground(color))
  const label = $derived(effSolfege ? toSolfege(note) : note)
  const pc = $derived(toPitchClass(note))
</script>

<span
  class="note-badge"
  class:root={variant === 'root'}
  class:muted={variant === 'muted'}
  class:filled
  style:--note-color={color}
  style:--note-fg={fg}
  title="Note {note} (pitch class {pc})"
>
  {#if dot && !filled}
    <span class="dot" aria-hidden="true"></span>
  {/if}
  <span class="label">{label}</span>
</span>

<style>
  .note-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.12rem 0.45rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.3;
    font-family: var(--font-mono);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-ink);
    white-space: nowrap;
  }
  .dot {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 9999px;
    background: var(--note-color);
    flex-shrink: 0;
  }
  .note-badge.muted {
    color: var(--color-muted);
    font-weight: 500;
  }
  .note-badge.root {
    border-color: var(--color-accent);
    background: var(--color-accent-soft);
  }
  .note-badge.filled {
    background: var(--note-color);
    color: var(--note-fg);
    border-color: var(--note-color);
  }
  .note-badge.filled .label {
    color: var(--note-fg);
  }
</style>
