<script lang="ts">
  import { allNotes, type NoteName, letterIndexOf } from '$lib/theory/notes'
  import { CHORD_NAMES, type ChordType, chordSymbol } from '$lib/theory/chords'
  import {
    SCALE_NAMES,
    type ScaleType,
  } from '$lib/theory/scales'
  import { noteToMidi } from '$lib/theory/midi'
  import { app } from '$lib/stores/app.svelte'
  import { audio } from '$lib/services/audio'
  import Fretboard from '$lib/components/Fretboard.svelte'
  import NoteBadge from '$lib/components/NoteBadge.svelte'

  // A curated, pedagogically useful subset for the explorer.
  const CHORD_SUBSET: ChordType[] = [
    'major', 'minor', 'aug', 'dim', 'sus4', 'sus2',
    'maj7', 'dom7', 'm7', 'm7b5', 'dim7', 'mMaj7',
  ]
  const SCALE_SUBSET: ScaleType[] = [
    'major', 'natural-minor', 'harmonic-minor', 'melodic-minor',
    'major-pentatonic', 'minor-pentatonic', 'blues',
    'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian',
  ]

  const roots = $derived(allNotes(app.preferFlats))
  const mode = $derived(app.mode)

  const selectionTitle = $derived.by(() => {
    if (mode === 'chord' && app.chordType) return chordSymbol(app.rootNote, app.chordType)
    if (mode === 'scale' && app.scaleType) return `${app.rootNote} ${SCALE_NAMES[app.scaleType]}`
    if (mode === 'free') return 'Free selection'
    return app.rootNote
  })

  /** Convert note names to ascending MIDI numbers (bumping octave on letter wrap). */
  function notesToAscendingMidis(notes: NoteName[], startOctave = 4): number[] {
    let octave = startOctave
    let prevLetter = -1
    const midis: number[] = []
    for (const n of notes) {
      const li = letterIndexOf(n)
      if (prevLetter >= 0 && li <= prevLetter) octave += 1
      midis.push(noteToMidi(n, octave))
      prevLetter = li
    }
    return midis
  }

  function pickRoot(note: NoteName): void {
    app.setRoot(note)
  }
  function pickChord(type: ChordType): void {
    app.selectChord(app.rootNote, type)
  }
  function pickScale(type: ScaleType): void {
    app.selectScale(app.rootNote, type)
  }
  function goFree(): void {
    app.clearSelection()
  }
  function playChord(): void {
    if (app.currentChordNotes.length) {
      audio.playChordByName(app.currentChordNotes, { mode: 'strum' })
    }
  }
  function playScale(): void {
    if (app.currentScaleNotes.length) {
      audio.playSequence(notesToAscendingMidis(app.currentScaleNotes), {
        stagger: 0.18,
      })
    }
  }
  function playArpeggio(): void {
    if (app.currentChordNotes.length) {
      audio.playSequence(notesToAscendingMidis(app.currentChordNotes), {
        stagger: 0.14,
      })
    }
  }
</script>

<section class="home">
  <header class="home-header">
    <h1>HarmoGuitar</h1>
    <p class="lede">
      Learn the harmony behind the fretboard. Pick a root and a chord or scale,
      see every position light up, and hear how it sounds.
    </p>
  </header>

  <!-- Root selector -->
  <div class="control-group">
    <span class="control-label" id="root-label">Root</span>
    <div class="chips" role="group" aria-labelledby="root-label">
      {#each roots as note (note)}
        <button
          type="button"
          class="chip"
          class:active={app.rootNote === note}
          aria-pressed={app.rootNote === note}
          onclick={() => pickRoot(note)}
        >
          <NoteBadge {note} dot={false} filled />
        </button>
      {/each}
    </div>
  </div>

  <!-- Mode tabs -->
  <div class="control-group">
    <span class="control-label">Explore</span>
    <div class="tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'chord'}
        class:active={mode === 'chord'}
        onclick={() => pickChord(app.chordType ?? 'major')}
      >Chords</button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'scale'}
        class:active={mode === 'scale'}
        onclick={() => pickScale(app.scaleType ?? 'major')}
      >Scales</button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'free'}
        class:active={mode === 'free'}
        onclick={goFree}
      >Free</button>
    </div>
  </div>

  <!-- Type selector -->
  {#if mode === 'chord'}
    <div class="control-group">
      <span class="control-label">Chord type</span>
      <div class="chips">
        {#each CHORD_SUBSET as type (type)}
          <button
            type="button"
            class="chip type-chip"
            class:active={app.chordType === type}
            aria-pressed={app.chordType === type}
            onclick={() => pickChord(type)}
          >
            {CHORD_NAMES[type]}
          </button>
        {/each}
      </div>
    </div>
  {:else if mode === 'scale'}
    <div class="control-group">
      <span class="control-label">Scale type</span>
      <div class="chips">
        {#each SCALE_SUBSET as type (type)}
          <button
            type="button"
            class="chip type-chip"
            class:active={app.scaleType === type}
            aria-pressed={app.scaleType === type}
            onclick={() => pickScale(type)}
          >
            {SCALE_NAMES[type]}
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <p class="hint">
      Free mode — click any fret to highlight every position of that note and
      build up your own set.
    </p>
  {/if}

  <!-- Current selection summary -->
  <div class="summary">
    <span class="control-label">{selectionTitle}</span>
    <div class="note-badges" aria-live="polite">
      {#if app.highlightNotes.length === 0}
        <span class="muted">No notes selected — pick a chord or scale above.</span>
      {:else}
        {#each app.highlightNotes as note, i (note + i)}
          <NoteBadge {note} variant={i === 0 && mode !== 'free' ? 'root' : 'plain'} />
        {/each}
      {/if}
    </div>

    {#if mode === 'chord'}
      <div class="play-buttons">
        <button type="button" class="btn" onclick={playChord}>▶ Strum</button>
        <button type="button" class="btn" onclick={playArpeggio}>▶ Arpeggio</button>
      </div>
    {:else if mode === 'scale'}
      <div class="play-buttons">
        <button type="button" class="btn" onclick={playScale}>▶ Play scale</button>
      </div>
    {/if}
  </div>

  <!-- The fretboard -->
  <div class="fretboard-wrap">
    <Fretboard fretCount={12} />
  </div>
</section>

<style>
  .home-header {
    margin-bottom: 1.5rem;
  }
  .home-header h1 {
    font-size: 2rem;
    margin: 0 0 0.4rem;
    letter-spacing: -0.02em;
  }
  .lede {
    color: var(--color-muted);
    max-width: 40rem;
    margin: 0;
  }
  .control-group {
    margin-bottom: 1.25rem;
  }
  .control-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-muted);
    margin-bottom: 0.4rem;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .chip {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 0.15rem 0.3rem;
    cursor: pointer;
    font: inherit;
    color: var(--color-ink);
    transition: border-color 0.1s;
  }
  .chip:hover {
    border-color: var(--color-accent);
  }
  .chip.active {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-soft);
  }
  .chip.type-chip {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
  }
  .tabs {
    display: inline-flex;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .tabs button {
    background: var(--color-surface);
    border: 0;
    border-right: 1px solid var(--color-border);
    padding: 0.4rem 1rem;
    cursor: pointer;
    font: inherit;
    color: var(--color-muted);
  }
  .tabs button:last-child {
    border-right: 0;
  }
  .tabs button.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-weight: 600;
  }
  .hint {
    color: var(--color-muted);
    font-style: italic;
  }
  .summary {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.6rem;
    padding: 0.9rem 1rem;
    margin-bottom: 1.25rem;
  }
  .note-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
    margin-top: 0.3rem;
  }
  .muted {
    color: var(--color-muted);
  }
  .play-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.8rem;
  }
  .btn {
    background: var(--color-accent);
    color: var(--color-surface);
    border: 0;
    border-radius: 0.5rem;
    padding: 0.45rem 0.9rem;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
  }
  .btn:hover {
    filter: brightness(1.08);
  }
  .fretboard-wrap {
    margin-top: 0.5rem;
  }
</style>
