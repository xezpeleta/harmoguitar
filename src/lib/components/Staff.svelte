<script lang="ts">
  import { onMount } from 'svelte'
  import { type NoteName } from '$lib/theory/notes'
  import { app } from '$lib/stores/app.svelte'
  import { toVexKeys } from '$lib/utils/vexflow'

  /**
   * VexFlow is ~688 kB (gzip) and only needed when a stave actually draws.
   * Lazy-load it on first render so the chunk is deferred until the Staff is
   * visible (below the fold on Home, inline on lesson pages). The module is
   * cached after the first load. Reference: PLAN.md Task 5.3.
   */
  type VexFlow = typeof import('vexflow')
  let vexflowPromise: Promise<VexFlow> | null = null
  function loadVexFlow(): Promise<VexFlow> {
    if (!vexflowPromise) {
      vexflowPromise = import('vexflow')
    }
    return vexflowPromise
  }

  interface Props {
    /** Notes to notate. Falls back to the store highlight. */
    notes?: NoteName[]
    /** Render as a sequence (scale) vs a stacked chord. Falls back to store mode. */
    asScale?: boolean
    /** Fixed pixel height of the stave. */
    height?: number
    /** Caption shown above the stave. */
    caption?: string
  }

  let {
    notes,
    asScale,
    height = 150,
    caption,
  }: Props = $props()

  const effNotes = $derived(notes ?? app.highlightNotes)
  const effAsScale = $derived(asScale ?? app.mode === 'scale')
  const effCaption = $derived(
    caption ?? (effNotes.length === 0 ? '' : 'Staff notation'),
  )

  let container: HTMLDivElement
  let width = $state(640)
  // True while the VexFlow chunk is downloading (first render only).
  let loading = $state(true)

  let ro: ResizeObserver | null = null
  onMount(() => {
    // Guard for jsdom (no ResizeObserver); real browsers always have it.
    if (typeof ResizeObserver === 'undefined') return
    ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w && Math.abs(w - width) > 1) width = w
    })
    if (container) ro.observe(container)
    return () => ro?.disconnect()
  })

  function ariaLabel(): string {
    if (effNotes.length === 0) return 'Empty staff'
    return `Staff notation: ${effNotes.join(', ')}`
  }

  /**
   * Redraw the stave whenever the notes or width change. Debounced with
   * requestAnimationFrame so rapid store updates coalesce into one render
   * (mitigates the VexFlow redraw-perf risk flagged in PLAN.md).
   */
  let raf = 0
  let drawSeq = 0 // guards against stale async draws racing a newer render
  $effect(() => {
    // Track these as dependencies.
    const keys = toVexKeys(effNotes)
    const w = width
    const h = height
    const scale = effAsScale
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => void draw(keys, w, h, scale))
  })

  /** Attach an explicit accidental glyph when the key carries one. We use no
   * key signature so every alteration must be drawn explicitly (educational:
   * the reader sees exactly which notes are sharp/flat). */
  function addAccidental(
    vf: VexFlow,
    note: import('vexflow').StaveNote,
    key: string,
    index = 0,
  ): void {
    if (key.includes('#')) note.addModifier(new vf.Accidental('#'), index)
    else if (key.includes('b')) note.addModifier(new vf.Accidental('b'), index)
  }

  async function draw(keys: string[], w: number, h: number, asScale: boolean): Promise<void> {
    if (!container) return
    const mySeq = ++drawSeq
    loading = true
    const vf = await loadVexFlow()
    // A newer draw may have superseded us; bail out.
    if (mySeq !== drawSeq || !container) return
    // Clear any previous render. VexFlow is an imperative library that
    // owns its SVG output, so direct DOM manipulation is required here.
    // eslint-disable-next-line svelte/no-dom-manipulating
    container.innerHTML = ''
    if (keys.length === 0) {
      loading = false
      return
    }

    const { Renderer, Stave, StaveNote, Voice, Formatter } = vf
    const renderer = new Renderer(container, Renderer.Backends.SVG)
    renderer.resize(w, h)
    const ctx = renderer.getContext()

    const staveX = 8
    const staveWidth = Math.max(120, w - staveX - 8)
    const stave = new Stave(staveX, 20, staveWidth)
    stave.addClef('treble')
    stave.setContext(ctx).draw()

    if (asScale && keys.length > 1) {
      // A sequence of quarter notes (one per scale degree).
      const notes = keys.map((k) => {
        const n = new StaveNote({ keys: [k], duration: 'q', autoStem: true })
        addAccidental(vf, n, k)
        return n
      })
      const voice = new Voice({ numBeats: notes.length, beatValue: 4 })
      voice.setStrict(false)
      voice.addTickables(notes)
      new Formatter().joinVoices([voice]).format([voice], staveWidth - 60)
      voice.setStave(stave)
      voice.draw(ctx)
    } else {
      // A single stacked chord (half note, auto-stemmed).
      const note = new StaveNote({ keys, duration: 'h', autoStem: true })
      keys.forEach((k, i) => addAccidental(vf, note, k, i))
      const voice = new Voice({ numBeats: 2, beatValue: 4 })
      voice.setStrict(false)
      voice.addTickables([note])
      new Formatter().joinVoices([voice]).format([voice], staveWidth - 60)
      voice.setStave(stave)
      voice.draw(ctx)
    }
    loading = false
  }
</script>

<div class="staff-wrap">
  {#if effCaption}
    <span class="caption">{effCaption}</span>
  {/if}
  <div class="staff-canvas" bind:this={container} role="img" aria-label={ariaLabel()}>
    {#if loading && effNotes.length > 0}
      <div class="skeleton" aria-hidden="true"></div>
    {/if}
  </div>
  {#if effNotes.length === 0}
    <p class="empty">Select a chord or scale to see it on the staff.</p>
  {/if}
</div>

<style>
  .staff-wrap {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.6rem;
    padding: 0.6rem 0.75rem 0.4rem;
  }
  .caption {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-muted);
    margin-bottom: 0.2rem;
  }
  .staff-canvas {
    width: 100%;
    min-height: 60px;
    overflow: hidden;
  }
  .staff-canvas :global(svg) {
    width: 100%;
    height: auto;
    display: block;
    /* The staff is display-only (no interaction); let clicks pass through to
     * any element it might overlap, and clip VexFlow overflow. */
    pointer-events: none;
  }
  .empty {
    color: var(--color-muted);
    font-style: italic;
    margin: 0;
    padding: 0.5rem 0 0.75rem;
  }
  /* Loading skeleton shown while the VexFlow chunk downloads. */
  .skeleton {
    height: 90px;
    background: linear-gradient(
      90deg,
      var(--color-raised) 0%,
      var(--color-border) 50%,
      var(--color-raised) 100%
    );
    background-size: 200% 100%;
    border-radius: 0.4rem;
    animation: shimmer 1.3s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }
</style>
