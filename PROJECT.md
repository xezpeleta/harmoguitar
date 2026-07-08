# PROJECT.md — HarmoGuitar

## Project Title

**HarmoGuitar** — Interactive Guitar Harmony Tutor (static web app)

## Executive Summary

HarmoGuitar is a static, client-side website that teaches the foundations of Western tonal harmony to experienced guitarists who never learned theory. Instead of a text-heavy course, every concept is paired with a playable, interactive widget: a virtual fretboard, live staff notation (VexFlow), reactive data visualizations (D3.js), and synthesized audio (Web Audio). The result feels like an instrument that reveals theory through experimentation. The site ships as static assets on GitHub Pages, styled with Tailwind CSS.

## Objective

Deliver a polished, responsive, single-page static site that takes a guitarist from "I can play chords but don't understand them" to confidently explaining intervals, constructing triads/seventh chords, mapping diatonic harmony to a key, and recognizing common progressions — entirely through hands-on interaction, with zero backend.

## Target Users / Stakeholders

- **Primary users:** Experienced guitar players (know open chords, positions, basic tab) who lack formal harmony grounding; assume basic solfège (Do–Re–Mi, note names).
- **Secondary users:** Self-taught musicians and curious learners wanting a visual, audible, fretboard-centric explanation of theory.
- **Stakeholders:** Project owner/author (content + maintenance), open-source contributors (future), end visitors (consumers of lessons).

## Scope

### In scope (v1)
- SPA-style static site with client-side (hash) routing.
- Interactive fretboard component (standard EADGBE, clickable, note highlighting + playback).
- Live staff notation via VexFlow (notes, intervals, chords, scales).
- D3.js reactive visualizations: interval wheel + circle of fifths.
- Web Audio synthesized playback (notes, chords, progressions).
- Guided learning path: notes → intervals → triads → seventh chords → scales → keys/diatonic harmony → progressions.
- Chord/scale builder experiment tool (root + type → intervals, audio, fretboard, staff).
- Responsive Tailwind UI, keyboard-navigable, color-blind-safe.
- GitHub Pages deployment (GitHub Actions workflow + `.nojekyll`).

### Out of scope (v1)
- User accounts, server, runtime database, analytics.
- Ear-training games, multi-instrument support, full jazz/mode-heavy curriculum.
- Sampled/recorded audio assets (synthesis only).
- Movable-Do solfège, left-handed fretboard, i18n (structured for future addition, not shipped).

## Proposed Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Svelte + Vite** | Lightweight component model ideal for interactive widgets; clean static build output; low runtime overhead; pairs well with imperative D3/VexFlow. |
| Language | **TypeScript** | Type safety for the theory engine (note/interval/chord math) reduces bugs in the most logic-heavy area. |
| Styling | **Tailwind CSS** | Rapid, consistent, responsive design; small production CSS via JIT. |
| Notation | **VexFlow** | De-facto open library for correct engraving with accidentals/clefs. |
| Visualizations | **D3.js** | Best-in-class for custom reactive diagrams (interval wheel, circle of fifths). |
| Audio | **Web Audio API** (native) | No assets to host; synthesized guitar-like tones via oscillators + filtering. |
| Routing | Hash-based client routing | Required constraint for GitHub Pages (no server rewrites). |
| Testing | **Vitest** | Unit tests for theory engine; runs in Vite ecosystem. |
| Deployment | **GitHub Pages** via GitHub Actions | Matches hosting constraint; automated on push. |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Static SPA (Vite build → dist/)  →  GitHub Pages        │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  UI Layer (Svelte components, Tailwind)           │  │
│  │  - Fretboard  - Staff (VexFlow)  - D3 charts      │  │
│  │  - Chord/scale builder  - Lesson reader  - Nav    │  │
│  └───────────────▲───────────────────▲───────────────┘  │
│                  │ reactive state     │ imperative refs  │
│  ┌───────────────┴───────────────────┴───────────────┐  │
│  │  Application Store (shared selection state)       │  │
│  │  root note, chord/scale type, key, tuning, ...    │  │
│  └───────────────▲───────────────────────────────────┘  │
│                  │                                       │
│  ┌───────────────┴───────────────────────────────────┐  │
│  │  Theory Engine (TS, pure, testable, UI-agnostic)  │  │
│  │  note math · intervals · chord/scale definitions  │  │
│  │  diatonic harmony · fretboard mapping · solfège   │  │
│  └───────────────▲───────────────────────────────────┘  │
│                  │                                       │
│  ┌───────────────┴───────────────────────────────────┐  │
│  │  Services                                         │  │
│  │  AudioEngine (Web Audio) · Content (JSON/MD data)  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

Key principle: **theory engine is pure and UI-agnostic** — all note/chord/scale logic lives in a standalone module with unit tests, consumed by components. UI never recomputes theory. A shared store keeps fretboard, staff, and D3 views synchronized to a single source of truth.

Lesson content is authored as **structured data files** (JSON/MD), rendered by a generic lesson component — keeps content editable without touching code.

## Milestones / Phases

1. **M1 — Foundation (theory engine + build).** Vite+TS+Tailwind+GitHub Actions skeleton; theory engine (notes, intervals, chords, scales, diatonic harmony, fretboard mapping) with Vitest unit tests; deploy empty shell to Pages.
2. **M2 — Core widgets.** Interactive fretboard component (highlight + select); Web Audio engine (notes/chords); Svelte store wiring; basic layout/nav.
3. **M3 — Notation + viz.** VexFlow staff rendering bound to store; D3 interval wheel; D3 circle of fifths (reactive).
4. **M4 — Learning content.** Lesson data structure + reader component; author full learning path (notes → progressions); chord/scale builder tool.
5. **M5 — Polish & ship.** Responsive pass, accessibility audit (keyboard, contrast, ARIA), performance/lazy-loading, design refinement; v1 release.

## Deliverables

- Source repo with Vite/TS/Svelte/Tailwind setup, theory engine + tests.
- Interactive fretboard, staff (VexFlow), D3 visualizations, Web Audio engine.
- Full lesson path content (structured data) + lesson reader UI.
- Chord/scale builder experiment tool.
- Responsive, accessible UI.
- GitHub Actions workflow deploying static build to GitHub Pages.
- `README.md` with local dev + deploy instructions.

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| VexFlow rendering perf with frequent updates | Sluggish staff redraw | Debounce updates; diff/clear only changed staves; render off-DOM where possible. |
| Fretboard unusable on small screens | Poor mobile UX | Horizontal scroll + pinch-zoom; reduced fret count on narrow viewports. |
| Imperative D3/VexFlow vs Svelte reactivity | Desync/bugs | Components own imperative refs; subscribe to store, redraw in `$effect`/lifecycle; single source of truth. |
| Synthesized audio sounds poor | Reduced engagement | Layer oscillator + lowpass + short pluck envelope; defer to sampled assets only if v1 timbre rejected. |
| GitHub Pages base path / routing | Broken assets/links | Set Vite `base`; use hash routing; verify with production build preview. |
| Accessibility of custom widgets | a11y gaps | Treat fretboard cells as buttons with ARIA labels; keyboard map; test contrast with automated tools. |
| Scope creep (modes, ear-training, i18n) | Delayed v1 | Hard out-of-scope list; defer to v1.1+. |

## Success Metrics

- **Functional:** all v1 lessons and widgets shipped; fretboard/staff/D3 stay synchronized for any selection.
- **Learning outcome:** end-of-path user can define an interval, build major/minor triads, list diatonic chords of a key, recognize I–IV–V / ii–V–I.
- **Quality:** theory engine passes full unit test suite; zero build errors on deploy; automated a11y/contrast checks pass.
- **Performance:** first meaningful paint < ~2s on typical connection; widget interactions ≥ 60fps.
- **Reach:** site live and navigable on mobile + desktop via GitHub Pages URL.
- **Maintainability:** adding a new lesson requires only a data file (no component code changes).

## Key Decisions (resolved from PROMPT.md open questions)

1. **Framework:** Svelte + Vite + TypeScript (over vanilla JS) for maintainable component model.
2. **Solfège:** Fixed-Do alongside note names in v1; movable-Do deferred.
3. **Audio:** Synthesized Web Audio (guitar-like via oscillator + filtering); no sampled assets in v1.
4. **Progress tracking:** Optional localStorage-based; non-essential, degrades gracefully.
5. **Left-handed view:** Deferred to v1.1; v1 right-handed only.
6. **Language:** English-only v1; content in data files to ease future i18n.
7. **Lesson authoring:** Structured JSON/MD data files rendered by a generic component.
