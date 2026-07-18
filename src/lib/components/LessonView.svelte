<script lang="ts">
  /**
   * LessonView.svelte — Generic lesson reader.
   *
   * Renders any `Lesson` from its structured `Block[]`. Widget blocks apply
   * their `selection` to the shared store and embed the requested widgets, so
   * every fretboard/staff/wheel inside a lesson stays synchronized with the
   * rest of the app.
   *
   * Reference: PLAN.md Task 4.2, PROJECT.md ("structured data files rendered
   * by generic component").
   */
  import type {
    Lesson,
    Block,
    WidgetPlay,
    WidgetSelection,
    VoicingPosition,
  } from '$lib/content/schema'
  import { prevLesson, nextLesson } from '$lib/content/lessons'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import { notesToAscendingMidis, noteToMidi } from '$lib/theory/midi'
  import { parseChordSymbol, chordNotes, type ChordType } from '$lib/theory/chords'
  import { scaleNotes, type ScaleType } from '$lib/theory/scales'
  import { transposeNote, allNotes, type NoteName } from '$lib/theory/notes'
  import { simpleInterval } from '$lib/theory/intervals'
  import { onDestroy } from 'svelte'
  import Markdown from '$lib/components/Markdown.svelte'
  import InlineText from '$lib/components/InlineText.svelte'
  import {
    markComplete,
    markIncomplete,
    isComplete,
  } from '$lib/services/progress.svelte'
  import { navigate } from '$lib/router.svelte'
  import Fretboard from '$lib/components/Fretboard.svelte'
  import Staff from '$lib/components/Staff.svelte'
  import IntervalWheel from '$lib/components/IntervalWheel.svelte'
  import CircleOfFifths from '$lib/components/CircleOfFifths.svelte'
  import Piano from '$lib/components/Piano.svelte'

  interface Props {
    lesson: Lesson
  }

  let { lesson }: Props = $props()

  // Completion state — reactive over the progress module's reactive list,
  // so the checkmark flips instantly when marked and re-syncs on navigation.
  const complete = $derived(isComplete(lesson.id))

  /** Apply a widget block's initial selection to the shared store. */
  function applySelection(block: Block): void {
    if (block.kind !== 'widget') return
    const s = block.selection
    if (s.clear) {
      app.clearSelection()
    }
    if (s.fretCount !== undefined) app.fretCount = s.fretCount
    if (s.key !== undefined) {
      app.key = s.key
      if (s.keyScaleType !== undefined) app.keyScaleType = s.keyScaleType
    }
    // Chord / scale / free mode.
    if (s.chordType !== undefined) {
      app.selectChord(s.root ?? app.rootNote, s.chordType)
    } else if (s.scaleType !== undefined) {
      app.selectScale(s.root ?? app.rootNote, s.scaleType)
    } else if (s.root !== undefined) {
      app.setRoot(s.root)
    }
  }

  // The first widget block in the lesson sets the store's initial state so
  // the first example the reader encounters is what renders. Subsequent
  // widgets are display-only (they share the same store).
  let firstWidgetApplied = false

  /** Svelte action: apply a widget block's selection when its figure mounts. */
  function applyWidget(node: HTMLElement, block: Block): void {
    if (!firstWidgetApplied) {
      applySelection(block)
      firstWidgetApplied = true
      return
    }
    // A `clear` (free-exploration) widget resets the store to free mode on
    // mount so its piano/fretboard clicks toggle notes live. Other widgets
    // are display-only (each renders its own selection, decoupled from the
    // store), so they don't touch the shared state.
    if (block.kind === 'widget' && block.selection.clear) {
      applySelection(block)
    }
  }

  function toggleComplete(): void {
    if (complete) {
      markIncomplete(lesson.id)
    } else {
      markComplete(lesson.id)
    }
  }

  const prev = $derived(prevLesson(lesson))
  const next = $derived(nextLesson(lesson))


  /** Play a single interval row: root then root+semitones, both ringing. */
  function playIntervalRow(root: NoteName, semitones: number): void {
    audio.playInterval(noteToMidi(root, 4), semitones)
  }

  /** Common name for a semitone offset (handles 0–12; 12 = octave). */
  function intervalName(semitones: number): string {
    if (semitones === 12) return 'Octave'
    return simpleInterval(semitones).name
  }

  /** Play a comparison of intervals from a root (a list item's example). */
  function playComparison(root: NoteName, offsets: number[]): void {
    audio.playIntervals(noteToMidi(root, 4), offsets)
  }

  /** Accessible label for a comparison button (e.g. "Play C Major 3rd, then C Minor 3rd"). */
  function comparisonLabel(root: NoteName, offsets: number[]): string {
    return `Play ${offsets.map((o) => `${root} ${intervalName(o)}`).join(', then ')}`
  }

  /**
   * Compute the highlight notes for a widget block's own selection, so each
   * widget displays the chord/scale its caption describes — instead of all
   * widgets sharing the store's single selection. Returns `undefined` for a
   * `clear` (free-exploration) selection so the widget follows the shared
   * store live: clicks on the piano/fretboard then highlight everywhere.
   */
  function selectionNotes(s: WidgetSelection): NoteName[] | undefined {
    if (s.showAllNotes) return [...allNotes(app.preferFlats)]
    if (s.followRoot) return [app.rootNote]
    if (s.clear) return undefined
    const root = s.root ?? app.rootNote
    if (s.chordType) return chordNotes(root, s.chordType)
    if (s.scaleType) return scaleNotes(root, s.scaleType)
    return []
  }

  /** Root note for a widget block's own selection (`undefined` → store root). */
  function selectionRoot(s: WidgetSelection): NoteName | undefined {
    if (s.clear || s.showAllNotes) return undefined
    return s.root ?? app.rootNote
  }

  /**
   * The block currently playing (any kind: progression, open-strings, scale
   * run, chord strum, or standalone piano). Drives the Play/Stop button label
   * and the toggle (clicking Play on the active block stops it). Uses
   * `$state.raw` so identity comparison (`=== block`) is not proxied.
   */
  let playingBlock = $state.raw<Block | null>(null)
  /**
   * The WidgetPlay override currently running (progression / open-strings),
   * for `fretMarks` dispatch and the progression store-clobber. `$state.raw`
   * so `=== block.play` works.
   */
  let activePlay = $state.raw<WidgetPlay | null>(null)
  /** Animated single-string marks while an open-strings play runs. */
  let activeMarks = $state<VoicingPosition[]>([])
  /** Per-block fretboard window offsets (keyed by block index). */
  let fretOffsets = $state<Record<number, number>>({})
  /** Pending setTimeout handles for the store-animation + final restore. */
  let playbackTimers: ReturnType<typeof setTimeout>[] = []
  /** Snapshot of the store selection to restore after a progression. */
  let savedSelection:
    | { root: NoteName; chordType: ChordType | null; scaleType: ScaleType | null }
    | null = null

  /** True while any playback is actively running on this specific block. */
  function isActiveHere(block: Block): boolean {
    return playingBlock === block
  }

  /**
   * True only while a *progression* runs on this block. During a progression
   * the shared store is animated through each chord, so the fretboard/staff
   * must follow the store (highlightNotes = undefined) rather than the
   * block's own static selection. Other play kinds (scale runs, voicing
   * arpeggios) keep the block's own notes displayed and add a transient
   * sounding ring on top — so they do NOT clobber the selection.
   */
  function isProgressingHere(block: Block): boolean {
    return (
      block.kind === 'widget' &&
      block.play?.kind === 'progression' &&
      activePlay === block.play
    )
  }

  /**
   * Marked fret positions for a block's fretboard: the animated single-string
   * mark while an open-strings play runs here, otherwise the block's static
   * `voicing` grip. During a progression the store drives, so no marks.
   */
  function fretMarks(block: Block): VoicingPosition[] | undefined {
    if (block.kind !== 'widget') return undefined
    if (block.play?.kind === 'open-strings' && activePlay === block.play) {
      return activeMarks
    }
    if (block.play?.kind === 'progression' && activePlay === block.play) {
      return undefined
    }
    return block.voicing
  }

  /** MIDI numbers for a block's voicing grip (one per marked position). */
  function voicingMidis(block: Block): number[] {
    if (block.kind !== 'widget' || !block.voicing) return []
    return block.voicing.map((v) => openStringMidi(v.string) + v.fret)
  }

  /**
   * Play a sequence of single notes in turn, highlighting each as it sounds.
   * Each note's MIDI is pushed to `app.soundingMidis` so the fretboard/piano
   * draw a pulsing ring on the exact position ringing now. Staggered so the
   * listener can follow each note visually.
   */
  function playNoteSequence(
    block: Block,
    midis: number[],
    opts: { stagger?: number; duration?: number } = {},
  ): void {
    if (midis.length === 0) return
    stopPlayback()
    playingBlock = block
    const stagger = opts.stagger ?? 0.45
    const duration = opts.duration ?? Math.max(0.55, stagger * 1.3)
    midis.forEach((m, i) => {
      playbackTimers.push(
        setTimeout(() => {
          app.setSounding([m])
          audio.playNote(m, { duration, velocity: 0.5 })
        }, i * stagger * 1000),
      )
    })
    playbackTimers.push(
      setTimeout(
        () => stopPlayback(),
        midis.length * stagger * 1000 + duration * 1000 + 250,
      ),
    )
  }

  /**
   * Play a widget block's own selection (chord, scale, or voicing grip), not
   * the shared store. A `clear` (free) widget with a voicing grip plays the
   * grip's notes; a `clear` widget with no grip plays the chromatic scale from
   * its root — so the Play button always makes sound.
   */
  function playBlockSelection(block: Block): void {
    if (block.kind !== 'widget') return
    // Voicing grip: arpeggiate the marked positions (unique pitches, ascending).
    if (block.voicing && block.voicing.length > 0) {
      const midis = [...new Set(voicingMidis(block))].sort((a, b) => a - b)
      playNoteSequence(block, midis)
      return
    }
    const notes = selectionNotes(block.selection)
    if (!notes || notes.length === 0) {
      // Free widget with no grip: run the chromatic scale from the root.
      if (block.selection.clear) {
        const chromatic = allNotes(app.preferFlats)
        playNoteSequence(block, chromatic.map((n) => noteToMidi(n, 4)))
      }
      return
    }
    if (block.selection.chordType) {
      // Chord: strum all notes at once, ring them all together.
      const midis = notesToAscendingMidis(notes)
      stopPlayback()
      playingBlock = block
      app.setSounding(midis)
      audio.playChordByName(notes, { mode: 'strum' })
      playbackTimers.push(setTimeout(() => stopPlayback(), 1800))
    } else {
      // Scale: ascend through the notes, highlighting each.
      playNoteSequence(block, notesToAscendingMidis(notes))
    }
  }

  /** Play a standalone `piano` block's notes as an ascending run. */
  function playPianoBlock(block: Block): void {
    if (block.kind !== 'piano') return
    if (playingBlock === block) {
      stopPlayback()
      return
    }
    const notes = block.notes ?? app.highlightNotes
    if (notes.length === 0) return
    playNoteSequence(block, notesToAscendingMidis(notes))
  }

  /** Play a widget block's Play button, honouring an optional override. */
  function playWidget(block: Block, play?: WidgetPlay): void {
    // Toggle: clicking Play on the block already playing stops it.
    if (playingBlock === block) {
      stopPlayback()
      return
    }
    if (play?.kind === 'progression') {
      playProgression(play, block)
      return
    }
    if (play?.kind === 'open-strings') {
      playOpenStrings(play, block)
      return
    }
    if (play?.kind === 'phrase') {
      // An ordered melodic line: play the block's own voicing positions in
      // array order (not sorted), lighting each dot as it sounds.
      const midis = voicingMidis(block)
      if (midis.length === 0) {
        playBlockSelection(block)
        return
      }
      playNoteSequence(block, midis, {
        stagger: play.stagger,
        duration: play.duration,
      })
      return
    }
    if (play?.kind === 'intervals-from-root') {
      stopPlayback()
      playingBlock = block
      const max = play.maxSemitones ?? 12
      const offsets = Array.from({ length: max + 1 }, (_, i) => i)
      const rootMidi = noteToMidi(play.root, 4)
      // Ring each scale degree in turn as the intervals demo plays.
      offsets.forEach((o, i) => {
        playbackTimers.push(
          setTimeout(
            () => app.setSounding([rootMidi + o]),
            i * 620,
          ),
        )
      })
      audio.playIntervals(rootMidi, offsets)
      playbackTimers.push(
        setTimeout(() => stopPlayback(), offsets.length * 620 + 900),
      )
      return
    }
    // No override: play this block's own selection (not the shared store).
    playBlockSelection(block)
  }

  // --- Progression playback -------------------------------------------------
  // A progression plays a sequence of chords in time, animating the shared
  // store through each chord so the fretboard/staff move in sync with the
  // audio. The original selection is restored when the progression ends.

  /** Stop any running playback: clear timers, silence audio, restore store. */
  function stopPlayback(): void {
    for (const t of playbackTimers) clearTimeout(t)
    playbackTimers = []
    audio.stopAll()
    app.clearSounding()
    if (savedSelection) {
      if (savedSelection.scaleType !== null) {
        app.selectScale(savedSelection.root, savedSelection.scaleType)
      } else if (savedSelection.chordType !== null) {
        app.selectChord(savedSelection.root, savedSelection.chordType)
      } else {
        app.clearSelection()
        app.setRoot(savedSelection.root)
      }
      savedSelection = null
    }
    activeMarks = []
    activePlay = null
    playingBlock = null
  }

  /** Play a progression: schedule audio + animate the store through each chord. */
  function playProgression(
    play: Extract<WidgetPlay, { kind: 'progression' }>,
    block: Block,
  ): void {
    stopPlayback()
    let chords: { root: NoteName; type: ChordType; notes: NoteName[] }[]
    try {
      chords = play.chords.map((sym) => {
        const { root, type } = parseChordSymbol(sym)
        return { root, type, notes: chordNotes(root, type) }
      })
    } catch {
      return
    }
    if (chords.length === 0) return

    const tempo = play.tempo ?? 100
    const beatsPerChord = play.beatsPerChord ?? 2
    const chordDurMs = ((60 / tempo) * beatsPerChord) * 1000

    savedSelection = {
      root: app.rootNote,
      chordType: app.chordType,
      scaleType: app.scaleType,
    }
    activePlay = play
    playingBlock = block

    // Animate the store through each chord in sync with the audio.
    chords.forEach((c, i) => {
      playbackTimers.push(
        setTimeout(() => {
          app.selectChord(c.root, c.type)
          app.setSounding(notesToAscendingMidis(c.notes))
        }, i * chordDurMs),
      )
    })
    // Restore the original selection after the last chord rings.
    playbackTimers.push(
      setTimeout(() => stopPlayback(), chords.length * chordDurMs + 250),
    )

    audio.playProgression(
      chords.map((c) => c.notes),
      { tempo, beatsPerChord },
    )
  }

  /** MIDI number of a string's open note (from the current tuning). */
  function openStringMidi(stringNumber: number): number {
    const tuning = app.tuning
    const idx = tuning.strings.length - stringNumber
    const open = tuning.strings[idx]
    return open ? noteToMidi(open.note, open.octave) : noteToMidi('E', 4)
  }

  /** Play each open string in turn, animating a single-string mark each time. */
  function playOpenStrings(
    play: Extract<WidgetPlay, { kind: 'open-strings' }>,
    block: Block,
  ): void {
    stopPlayback()
    const order = play.order ?? 'low-to-high'
    const stagger = play.stagger ?? 0.55
    const strings =
      order === 'low-to-high' ? [6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6]
    activePlay = play
    playingBlock = block
    const noteDur = Math.max(0.4, stagger * 0.9)
    strings.forEach((s, i) => {
      const midi = openStringMidi(s)
      playbackTimers.push(
        setTimeout(() => {
          activeMarks = [{ string: s, fret: 0 }]
          app.setSounding([midi])
          audio.playNote(midi, {
            duration: noteDur,
            velocity: 0.5,
          })
        }, i * stagger * 1000),
      )
    })
    playbackTimers.push(
      setTimeout(
        () => stopPlayback(),
        strings.length * stagger * 1000 + 300,
      ),
    )
  }

  /** Cycle the root note chromatically (keeps any active chord/scale type). */
  function stepRoot(dir: 1 | -1): void {
    app.setRoot(transposeNote(app.rootNote, dir, app.preferFlats))
  }

  /** Shift a block's fretboard window by one fret (clamped to 0–12). */
  function stepPosition(blockIndex: number, dir: 1 | -1): void {
    const cur = fretOffsets[blockIndex] ?? 0
    fretOffsets[blockIndex] = Math.max(0, Math.min(12, cur + dir))
  }

  onDestroy(() => stopPlayback())
</script>

<svelte:head>
  <title>{lesson.title} · HarmoGuitar</title>
  <meta name="description" content={lesson.summary} />
</svelte:head>

<article class="lesson">
  <header class="lesson-head">
    <p class="kicker">Lesson</p>
    <h1>{lesson.title}</h1>
    <p class="summary">{lesson.summary}</p>
    <div class="meta">
      <span class="minutes">⏱ {lesson.minutes} min</span>
    </div>
  </header>

  <div class="blocks">
    {#each lesson.blocks as block, i (block)}
      {#if block.kind === 'heading'}
        {#if block.level === 2}
          <h2>{block.text}</h2>
        {:else}
          <h3>{block.text}</h3>
        {/if}
      {:else if block.kind === 'text'}
        <div class="prose"><Markdown source={block.markdown} /></div>
      {:else if block.kind === 'callout'}
        <aside class="callout {block.variant}">
          <span class="callout-icon" aria-hidden="true">
            {block.variant === 'tip' ? '💡' : block.variant === 'warning' ? '⚠️' : '📝'}
          </span>
          <div class="prose"><InlineText source={block.markdown} /></div>
        </aside>
      {:else if block.kind === 'list'}
        {#if block.ordered}
          <ol class="prose-list">
            {#each block.items as item, i (item + i)}
              <li class:has-play={block.playable}>
                {#if block.playable}
                  <div class="li-row">
                    <span class="li-text"><InlineText source={item} /></span>
                    <button
                      type="button"
                      class="row-play"
                      aria-label={comparisonLabel(
                        block.playable.root,
                        block.playable.offsets[i] ?? [],
                      )}
                      onclick={() =>
                        playComparison(
                          block.playable!.root,
                          block.playable!.offsets[i] ?? [],
                        )}
                    >▶</button>
                  </div>
                {:else}
                  <InlineText source={item} />
                {/if}
              </li>
            {/each}
          </ol>
        {:else}
          <ul class="prose-list">
            {#each block.items as item, i (item + i)}
              <li class:has-play={block.playable}>
                {#if block.playable}
                  <div class="li-row">
                    <span class="li-text"><InlineText source={item} /></span>
                    <button
                      type="button"
                      class="row-play"
                      aria-label={comparisonLabel(
                        block.playable.root,
                        block.playable.offsets[i] ?? [],
                      )}
                      onclick={() =>
                        playComparison(
                          block.playable!.root,
                          block.playable!.offsets[i] ?? [],
                        )}
                    >▶</button>
                  </div>
                {:else}
                  <InlineText source={item} />
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      {:else if block.kind === 'table'}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                {#each block.headers as h (h)}<th>{h}</th>{/each}
                {#if block.playable}<th class="play-col"><span class="sr-only">Play</span></th>{/if}
              </tr>
            </thead>
            <tbody>
              {#each block.rows as row, ri (ri)}
                <tr>
                  {#each row as cell, ci (ri + ci)}<td><InlineText source={cell} /></td>{/each}
                  {#if block.playable}
                    <td class="play-col">
                      <button
                        type="button"
                        class="row-play"
                        aria-label="Play {block.playable.root} to {row[1] ?? 'interval'}"
                        onclick={() =>
                          playIntervalRow(
                            block.playable!.root,
                            block.playable!.semitones[ri] ?? 0,
                          )}
                      >▶</button>
                    </td>
                  {/if}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else if block.kind === 'piano'}
        <figure class="widget-block piano-block">
          <Piano
            octaves={block.octaves ?? 2}
            highlightNotes={block.notes}
          />
          {#if block.caption}
            <figcaption><InlineText source={block.caption} /></figcaption>
          {/if}
          <div class="widget-actions">
            <button type="button" class="play-btn" onclick={() => playPianoBlock(block)}>
              {#if isActiveHere(block)}
                ■ Stop
              {:else}
                ▶ Play notes
              {/if}
            </button>
          </div>
        </figure>
      {:else if block.kind === 'widget'}
        <figure class="widget-block" use:applyWidget={block}>
          <div class="widget-grid {block.widgets.length === 1 ? 'single' : 'multi'}">
            {#each block.widgets as w (w)}
              {#if w === 'fretboard'}
                <div class="widget-cell">
                  <Fretboard
                    fretCount={app.fretCount}
                    strings={block.strings}
                    startFret={fretOffsets[i] ?? 0}
                    markPositions={fretMarks(block)}
                    highlightNotes={isProgressingHere(block) ? undefined : selectionNotes(block.selection)}
                    rootNote={isProgressingHere(block) ? undefined : selectionRoot(block.selection)}
                  />
                </div>
              {:else if w === 'staff'}
                <div class="widget-cell">
                  <Staff
                    notes={isProgressingHere(block) ? undefined : selectionNotes(block.selection)}
                    asScale={isProgressingHere(block) ? undefined : !!block.selection.scaleType}
                  />
                </div>
              {:else if w === 'piano'}
                <div class="widget-cell">
                  <Piano />
                </div>
              {:else if w === 'interval-wheel'}
                <div class="widget-cell wheel-cell">
                  <IntervalWheel size={280} />
                </div>
              {:else if w === 'circle-of-fifths'}
                <div class="widget-cell wheel-cell">
                  <CircleOfFifths size={280} />
                </div>
              {/if}
            {/each}
          </div>
          {#if block.caption}
            <figcaption><InlineText source={block.caption} /></figcaption>
          {/if}
          <div class="widget-actions">
            {#if block.steppers?.root}
              <span class="stepper">
                <span class="stepper-label">Root {app.rootNote}</span>
                <button type="button" class="step-btn" aria-label="Lower root by one semitone" onclick={() => stepRoot(-1)}>−</button>
                <button type="button" class="step-btn" aria-label="Raise root by one semitone" onclick={() => stepRoot(1)}>+</button>
              </span>
            {/if}
            {#if block.steppers?.position}
              <span class="stepper">
                <button type="button" class="step-btn" aria-label="Shift fretboard window down one fret" onclick={() => stepPosition(i, -1)}>◀</button>
                <span class="stepper-label">Fret {fretOffsets[i] ?? 0}+</span>
                <button type="button" class="step-btn" aria-label="Shift fretboard window up one fret" onclick={() => stepPosition(i, 1)}>▶</button>
              </span>
            {/if}
            <button type="button" class="play-btn" onclick={() => playWidget(block, block.play)}>
              {#if isActiveHere(block)}
                ■ Stop
              {:else if block.play?.kind === 'progression'}
                ▶ Play progression
              {:else if block.play?.kind === 'open-strings'}
                ▶ Play strings
              {:else}
                ▶ Play
              {/if}
            </button>
          </div>
        </figure>
      {/if}
    {/each}
  </div>

  <footer class="lesson-foot">
    <button
      type="button"
      class="complete-btn"
      class:done={complete}
      onclick={toggleComplete}
    >
      {complete ? '✓ Completed' : 'Mark as complete'}
    </button>

    <nav class="lesson-nav">
      {#if prev}
        <button type="button" class="nav-btn prev" onclick={() => navigate(`/lessons/${prev.slug}`)}>
          ← {prev.title}
        </button>
      {:else}
        <span></span>
      {/if}
      {#if next}
        <button type="button" class="nav-btn next" onclick={() => navigate(`/lessons/${next.slug}`)}>
          {next.title} →
        </button>
      {/if}
    </nav>
  </footer>
</article>

<style>
  .lesson {
    max-width: 46rem;
    margin: 0 auto;
  }

  /* Header */
  .lesson-head {
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--color-border);
  }
  .kicker {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-accent);
    margin: 0 0 0.3rem;
  }
  .lesson-head h1 {
    font-size: 1.85rem;
    line-height: 1.2;
    margin: 0 0 0.5rem;
    color: var(--color-ink);
  }
  .summary {
    color: var(--color-muted);
    line-height: 1.55;
    margin: 0 0 0.6rem;
    font-size: 1.02rem;
  }
  .meta {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--color-muted);
  }

  /* Prose */
  .blocks {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .blocks h2 {
    font-size: 1.35rem;
    margin: 1.5rem 0 0;
    color: var(--color-ink);
  }
  .blocks h3 {
    font-size: 1.1rem;
    margin: 1rem 0 0;
    color: var(--color-ink);
  }
  .prose {
    line-height: 1.65;
    color: var(--color-ink);
  }
  .prose :global(p) {
    margin: 0 0 0.7rem;
  }
  .prose :global(p:last-child) {
    margin-bottom: 0;
  }
  .prose :global(strong) {
    font-weight: 700;
  }
  .prose :global(em) {
    font-style: italic;
  }
  .prose :global(code) {
    font-family: var(--font-mono);
    background: var(--color-bg);
    padding: 0.1rem 0.35rem;
    border-radius: 0.3rem;
    font-size: 0.88em;
  }
  .prose :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
  }
  .prose :global(ul),
  .prose :global(ol) {
    margin: 0 0 0.7rem;
    padding-left: 1.3rem;
  }
  .prose :global(li) {
    margin: 0.25rem 0;
  }
  .prose-list {
    margin: 0;
    padding-left: 1.4rem;
    line-height: 1.65;
    color: var(--color-ink);
  }
  .prose-list li {
    margin: 0.3rem 0;
  }
  /* List items with a comparison Play button: text on the left, button on
   * the right (never wraps mid-text). The flex lives on an inner wrapper so
   * the <li> keeps its default list-marker (bullet / number). */
  .prose-list li.has-play .li-row {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .prose-list li.has-play .li-text {
    flex: 1 1 auto;
  }
  .prose-list li.has-play .row-play {
    flex: 0 0 auto;
    margin-top: 0.1rem;
  }

  /* Callout */
  .callout {
    display: flex;
    gap: 0.7rem;
    align-items: flex-start;
    padding: 0.85rem 1rem;
    border-radius: 0.6rem;
    border-left: 4px solid var(--color-accent);
    background: var(--color-accent-soft);
    line-height: 1.6;
  }
  .callout.note {
    border-left-color: var(--color-muted);
    background: var(--color-raised);
  }
  .callout.warning {
    border-left-color: var(--color-warning);
    background: var(--color-warning-soft);
  }
  .callout :global(p) {
    margin: 0;
  }
  .callout-icon {
    font-size: 1.1rem;
    line-height: 1.4;
    flex-shrink: 0;
  }

  /* Table */
  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  th,
  td {
    padding: 0.5rem 0.7rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
  thead th {
    background: var(--color-raised);
    font-weight: 700;
    color: var(--color-ink);
    white-space: nowrap;
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  /* Per-row Play button column (playable tables, e.g. intervals). */
  .play-col {
    width: 2.6rem;
    text-align: center;
    white-space: nowrap;
  }
  .row-play {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.4rem;
    width: 2rem;
    height: 2rem;
    line-height: 1;
    cursor: pointer;
    font: inherit;
    font-size: 0.8rem;
    padding: 0;
  }
  .row-play:hover {
    filter: brightness(1.1);
  }
  .row-play:active {
    transform: translateY(1px);
  }
  td :global(code) {
    font-family: var(--font-mono);
    font-size: 0.85em;
  }

  /* Compact the intervals table on small screens so the per-row Play
   * buttons stay visible without horizontal scrolling. */
  @media (max-width: 480px) {
    table {
      font-size: 0.8rem;
    }
    th,
    td {
      padding: 0.35rem 0.4rem;
    }
    .play-col {
      width: 2.2rem;
    }
    .row-play {
      width: 1.7rem;
      height: 1.7rem;
      font-size: 0.72rem;
    }
  }

  /* Widget block */
  .widget-block {
    margin: 1.4rem 0 0.5rem;
    padding: 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.7rem;
  }
  .widget-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .widget-grid.multi {
    gap: 1.25rem;
  }
  .widget-cell {
    width: 100%;
  }
  .wheel-cell {
    display: flex;
    justify-content: center;
  }
  figcaption {
    margin-top: 0.75rem;
    font-size: 0.83rem;
    color: var(--color-muted);
    text-align: center;
    line-height: 1.5;
  }
  .widget-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.6rem;
  }
  .stepper {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    color: var(--color-muted);
  }
  .stepper-label {
    font-family: var(--font-mono);
    min-width: 3.2rem;
    text-align: center;
  }
  .step-btn {
    background: var(--color-raised);
    color: var(--color-ink);
    border: 1px solid var(--color-border);
    border-radius: 0.4rem;
    width: 1.9rem;
    height: 1.9rem;
    line-height: 1;
    cursor: pointer;
    font: inherit;
    font-size: 0.8rem;
    padding: 0;
  }
  .step-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .step-btn:active {
    transform: translateY(1px);
  }
  .play-btn {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.5rem;
    padding: 0.4rem 1.1rem;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    font-size: 0.85rem;
  }
  .play-btn:hover {
    filter: brightness(1.08);
  }

  /* Footer */
  .lesson-foot {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--color-border);
  }
  .complete-btn {
    display: block;
    width: 100%;
    padding: 0.7rem;
    border: 2px solid var(--color-accent);
    background: transparent;
    color: var(--color-accent);
    border-radius: 0.6rem;
    font: inherit;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    margin-bottom: 1.5rem;
    transition: background 0.15s, color 0.15s;
  }
  .complete-btn:hover {
    background: var(--color-accent-soft);
  }
  .complete-btn.done {
    background: var(--color-accent);
    color: var(--color-surface);
  }
  .lesson-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .nav-btn {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-ink);
    padding: 0.6rem 0.9rem;
    border-radius: 0.5rem;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    max-width: 48%;
    text-align: center;
  }
  .nav-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
  .nav-btn.next {
    margin-left: auto;
  }

  @media (min-width: 760px) {
    .widget-grid.multi {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .widget-grid.multi .widget-cell {
      flex: 1 1 300px;
    }
    .widget-grid.multi .wheel-cell {
      flex: 0 1 300px;
    }
  }
</style>
