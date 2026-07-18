# HarmoGuitar — Interactive Guitar Harmony Tutor

> A free, static, client-side web app that teaches Western tonal harmony to
> experienced guitarists through interactive widgets: a playable fretboard,
> live staff notation, reactive visualizations, and synthesized audio.

**Status:** ✅ v1 released — [**Live site →**](https://xezpeleta.github.io/harmoguitar/)

[![CI](https://github.com/xezpeleta/harmoguitar/actions/workflows/ci.yml/badge.svg)](https://github.com/xezpeleta/harmoguitar/actions/workflows/ci.yml)
[![Deploy](https://github.com/xezpeleta/harmoguitar/actions/workflows/deploy.yml/badge.svg)](https://github.com/xezpeleta/harmoguitar/actions/workflows/deploy.yml)

---

## What it is

HarmoGuitar takes guitarists who already play but never learned theory from
*"I can play chords but don't understand them"* to confidently building triads,
mapping diatonic harmony to a key, and recognizing common progressions —
entirely through hands-on, audible, visual interaction.

Every concept is paired with a playable widget rather than a wall of text.

## Features

### Interactive explorer (Home)

Pick a root note and a chord or scale type; everything updates in sync:

- **Playable fretboard** — click any fret to hear the note; chord/scale tones
  are highlighted with per-note colors and text labels (never color-only)
- **Staff notation** — VexFlow-rendered treble clef with explicit accidentals
  (no key signature, so every sharp/flat is visible — educational)
- **Interval wheel** — 12-segment donut rooted at your selection; click a
  segment to hear the root → interval
- **Circle of fifths** — clickable two-ring circle (major + relative minor);
  select a key to see its 7 diatonic chords as Roman numerals
- **Audio playback** — strum, arpeggiate, or play as a scale (Web Audio API,
  synthesized pluck — no audio files)

### Structured lessons (31 lessons)

A guided path from first principles through deep jazz harmony, each lesson
embedding live interactive widgets:

1. Notes & the fretboard
2. Intervals
3. The major scale
4. The fretboard landscape: green lights & red tonic
5. Minor scales
6. Modes of the major scale
7. Triads
8. Seventh chords
9. Extended & altered chords
10. Diatonic harmony
11. Functional harmony
12. Circle of fifths
13. Progressions & Roman numerals
14. Cadences & turnarounds
15. The blues & ii–V–I
16. Secondary dominants
17. Tritone substitution
18. Voice leading & guide tones
19. Passing chords, inversions & walking bass
20. Jazz comping voicings
21. Pentatonics & blue notes
22. The minor ii–V–i
23. The altered scale
24. Borrowed chords & modal mixture
25. Chord-scale theory
26. Modal jazz & quartal harmony
27. Harmonic & melodic minor modes
28. Reharmonization & substitutions
29. Associative voicing inversions
30. The phrase dictionary
31. How to practice: the multisensory method

Progress is saved to `localStorage` (optional; degrades gracefully).

### Chord & scale builder

A scratchpad for exploring any chord or scale: pick root + type, see the
formula, notes, intervals, fretboard shape, staff notation, and interval wheel
side by side, with playback controls.

### Design & accessibility

- **Color-blind aware** — color is always supplementary; every note is paired
  with a text label
- **WCAG 2.1 AA** — 0 axe-core violations; full keyboard navigation; visible
  focus rings; ARIA labels on all interactive elements
- **Dark mode** — follows OS `prefers-color-scheme`
- **Responsive** — works from 360 px phones to ultrawide desktops
- **Reduced motion** — respects `prefers-reduced-motion`

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Svelte 5 (runes) + Vite |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Staff notation | VexFlow 5 (lazy-loaded) |
| Diagrams | D3 v7 (`arc()` math; Svelte owns the DOM) |
| Audio | Web Audio API (synthesized, no samples) |
| Testing | Vitest (421 tests, ~91% statement coverage) |
| CI/CD | GitHub Actions (lint → typecheck → test → build → deploy) |
| Hosting | GitHub Pages (static, `.nojekyll`) |

## Architecture

```
src/
├── lib/
│   ├── theory/          # Pure, UI-agnostic theory engine (notes, intervals,
│   │                    #   scales, chords, diatonic, fretboard, solfège, MIDI)
│   ├── stores/          # Shared app state (Svelte 5 runes singleton)
│   ├── services/        # Audio engine + progress tracking
│   ├── components/      # Fretboard, Staff, IntervalWheel, CircleOfFifths,
│   │                    #   NoteBadge, Nav, Layout, LessonView
│   ├── content/         # Lesson schema + 30 authored lessons
│   └── utils/           # Colors, markdown renderer, VexFlow bridge
├── routes/              # Home, Lessons, Lesson, Builder
├── App.svelte           # Hash-based router + route → component mapping
└── app.css              # Design tokens (@theme) + dark mode
```

The **theory engine** (`src/lib/theory/`) is 100% pure and UI-agnostic — it
knows nothing about Svelte, the DOM, or audio. Every function is unit-tested.
The UI layer subscribes to a shared store that wraps the engine's output.

## Local development

```bash
git clone https://github.com/xezpeleta/harmoguitar.git
cd harmoguitar
npm install
npm run dev          # start dev server (http://localhost:5173)
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run test` | Run unit tests (watch mode) |
| `npm run test:run` | Run unit tests once (CI mode) |
| `npm run coverage` | Run tests with coverage report |
| `npm run lint` | ESLint |
| `npm run check` | TypeScript + Svelte type checking |

> Requires Node 18+ (developed on Node 24).

## Project documents

- [`PROMPT.md`](./PROMPT.md) — refined prompt, scope, requirements, success criteria
- [`PROJECT.md`](./PROJECT.md) — full project definition, architecture, milestones, risks
- [`RESEARCH.md`](./RESEARCH.md) — content base (28 sections, foundations → jazz harmony)
- [`PLAN.md`](./PLAN.md) — execution-ready implementation plan (5 epics, 24 tasks)

## Deployment

The site auto-deploys to GitHub Pages via the [`deploy.yml`](./.github/workflows/deploy.yml)
workflow on every push to `main`. The pipeline runs the full quality gate
(lint → typecheck → test → build) before deploying.

**Live URL:** <https://xezpeleta.github.io/harmoguitar/>

## Roadmap

**v1 (current)** — Foundations through functional harmony and the ii–V–I.

**v1.1 (current)** — Deep jazz harmony: secondary dominants, tritone
substitution, voice leading & guide tones, passing chords & inversions (with
walking bass), jazz comping voicings (shell + extension, Drop 2 / Drop 3),
pentatonics & blue notes, the minor ii–V–i, the altered scale, borrowed
chords & modal mixture, chord-scale theory, modal jazz & quartal harmony,
harmonic & melodic minor modes, and reharmonization; plus the mastery &
practice capstones — associative voicing inversions, the phrase dictionary,
and the multisensory practice method. 31 lessons
total. Includes **progression playback** (hear any chord sequence in time),
**fretboard voicing markers** (diagram exact grips), **open-string playback**
(strum strings 6→1 with per-string highlighting), **+/− steppers** (cycle the
root note or shift the fretboard window), **phrase playback** (hear an ordered
lick note-by-note with each dot lighting as it sounds), **sounding-note
rings** (a pulsing accent on the exact fret/key ringing now),
**green-lights & red-tonic visualization** (the Metheny whole-neck landscape:
every scale tone lit green, the tonic lit red — the cure for box-thinking), and
cross-instrument highlighting (click a piano key or fret and the note lights
up everywhere).

**Planned:**
- Movable-Do solfège alongside fixed-Do
- Left-handed fretboard view
- Save custom chord/scale presets
- Additional tunings (Drop D, DADGAD, Open G)

## License

[MIT](./LICENSE)
