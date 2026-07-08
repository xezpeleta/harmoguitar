# PLAN.md — HarmoGuitar Implementation Plan

> **Status:** Execution-ready · **Source docs:** `PROMPT.md`, `PROJECT.md`, `RESEARCH.md` · **Target:** v1 static site on GitHub Pages
> **Repo:** `xezpeleta/harmoguitar` (not yet a git repo — initialization is Task 1.1)

---

## 1. Plan Overview

HarmoGuitar is a static, client-side single-page app that teaches Western tonal harmony to experienced guitarists through interactive widgets (fretboard, staff, circle of fifths) and synthesized audio. This plan turns the three planning documents into a sequenced, testable build.

**Approach in one paragraph:** Build a pure, UI-agnostic, fully unit-tested **TypeScript theory engine** first (it is the heart of the product and the riskiest logic). Scaffold the Svelte 5 + Vite + Tailwind v4 app and deploy an empty shell to GitHub Pages immediately to prove the pipeline. Then layer interactive widgets (fretboard → audio → store → staff → D3 viz) that all subscribe to a single shared state. Finally author lesson content as structured data (sourced from `RESEARCH.md`) rendered by a generic reader, add the chord/scale builder tool, and finish with a responsive/accessibility/performance polish pass for v1 release.

**Architecture principle (from PROJECT.md):** the theory engine is pure and UI-agnostic; UI never recomputes theory; a shared store keeps fretboard, staff, and D3 views synchronized to one source of truth; lesson content lives in data files.

### Epics (mapped to PROJECT.md milestones)

| Epic | Milestone | Theme | Exit signal |
|------|-----------|-------|-------------|
| **E1** | M1 | Repo + tooling + theory engine + deploy pipeline | Empty shell live on Pages; theory engine 100% unit-tested |
| **E2** | M2 | Core widgets: store, audio, fretboard, layout/nav | Fretboard clickable, plays notes, syncs to store |
| **E3** | M3 | Notation + D3 visualizations | Staff (VexFlow) + interval wheel + circle of fifths reactive |
| **E4** | M4 | Learning content + chord/scale builder | Full lesson path navigable; builder tool works |
| **E5** | M5 | Polish & ship v1 | a11y/perf/responsive pass; v1 tagged & deployed |

### v1 content scope (resolves PROMPT/PROJECT tension)

v1 covers **foundations through functional harmony and common progressions**, with *light* treatment of modes (the 7 modes introduced) and the **ii–V–I** as a progression. Deep jazz harmony (altered scales, tritone subs, drop voicings, quartal harmony, melodic-minor modes) is explicitly **v1.1+** — it exists in `RESEARCH.md` as a content reserve but is not built into v1 lessons. v1 lesson path maps to `RESEARCH.md` §1–§14 (lightly).

---

## 2. Assumptions

- **Tooling available:** Node v24.16.0 + npm 11.17.0 (no pnpm/bun present → use **npm**). `gh` CLI authenticated as `xezpeleta` (SSH protocol).
- **Stack versions (pinned to reduce guesswork):** Svelte 5 (runes), Vite 6+, TypeScript 5.5+ (strict), Tailwind CSS v4 (`@tailwindcss/vite`), VexFlow 5, D3 v7, Vitest 2+. Svelte Testing Library + jsdom for component tests.
- **Hosting:** GitHub Pages at `https://xezpeleta.github.io/harmoguitar/` → Vite `base: "/harmoguitar/"` (overridable via env for custom domain).
- **Routing:** Hash-based (`#/path`) — required because GitHub Pages has no server rewrites.
- **Audio:** Web Audio API synthesized tones only (oscillator + lowpass + pluck envelope). No sampled assets.
- **Solfège:** Fixed-Do alongside note names; movable-Do deferred.
- **Tuning:** Standard EADGBE (E2 A2 D3 G3 B3 E4), right-handed only in v1.
- **Progress tracking:** Optional, localStorage, degrades gracefully.
- **Language:** English-only v1; content in data files to ease future i18n.
- **Browser support:** Latest evergreen Chrome/Firefox/Safari/Edge.
- **Content source:** `RESEARCH.md` (58 KB, 28 sections) is the canonical content base; v1 lessons are distilled from its §1–§14.

---

## 3. Work Breakdown Structure (Epics → Tasks)

### Epic E1 — Foundation (M1)

#### Task 1.1 — Initialize git repo + scaffolding
- **Objective:** Make the project a version-controlled repo with baseline files.
- **Actions:**
  1. `git init` in `/home/xezpeleta/Dev/xezpeleta/harmoguitar`.
  2. Create `.gitignore` (node_modules, dist, .DS_Store, *.local, coverage/).
  3. Create `LICENSE` (MIT).
  4. Create initial `README.md` (project blurb + "under construction" + link to PROJECT.md/PROMPT.md/RESEARCH.md).
  5. `git add -A && git commit -m "chore: init repo with planning docs"`.
  6. `gh repo create xezpeleta/harmoguitar --public --source=. --remote=origin --push` (if remote not present).
- **Artifacts:** `.gitignore`, `LICENSE`, `README.md`, `.git/`, GitHub repo.
- **Validation:** `git log --oneline` shows commit; `gh repo view` confirms remote.

#### Task 1.2 — Scaffold Vite + Svelte 5 + TypeScript
- **Objective:** Runnable dev server with TS strict mode.
- **Actions:**
  1. `npm create vite@latest . -- --template svelte-ts` (in current dir; merge with existing files).
  2. Set package `"type": "module"`, name `harmoguitar`.
  3. Enable `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true` in `tsconfig.json`.
  4. Add path alias `$lib` → `src/lib` in `tsconfig.json` paths **and** `vite.config.ts` resolve.alias.
  5. `npm install && npm run dev` → verify default page loads at localhost.
- **Artifacts:** `package.json`, `vite.config.ts`, `tsconfig.json`, `src/`, `index.html`.
- **Validation:** `npm run build` succeeds; `tsc --noEmit` passes.

#### Task 1.3 — Add Tailwind CSS v4 + lint/format
- **Objective:** Styling pipeline + code-quality tooling.
- **Actions:**
  1. `npm install -D tailwindcss @tailwindcss/vite`; add plugin in `vite.config.ts`.
  2. `@import "tailwindcss";` in `src/app.css`; import in root component.
  3. Define design tokens (colors, note→color map, spacing) in CSS `@theme` block (Tailwind v4 approach).
  4. `npm install -D eslint @eslint/js typescript-eslint eslint-plugin-svelte prettier eslint-config-prettier`; add `.eslintrc`, `.prettierrc`.
  5. Add npm scripts: `lint`, `format`, `check` (svelte-check / tsc).
- **Artifacts:** `vite.config.ts` (updated), `src/app.css`, `.eslintrc`, `.prettierrc`.
- **Validation:** `npm run lint` clean; a `<div class="text-blue-500">` renders styled.

#### Task 1.4 — Theory engine: `notes`
- **Objective:** Pure note/pitch-class module.
- **Actions:** Create `src/lib/theory/notes.ts` with: `PITCH_CLASSES` (12), `NoteName` type (with enharmonic), `sharps`/`flats` arrays, `toPitchClass(note)`, `normalizeEnharmonic()`, `transposeNote(note, semitones)`, `noteToSolfège` bridge (fixed-Do), octave handling (`FretPosition` pitch with octave number).
- **Artifacts:** `src/lib/theory/notes.ts`.
- **Validation:** Unit tests pass (Task 1.11).

#### Task 1.5 — Theory engine: `intervals`
- **Objective:** Interval math.
- **Actions:** Create `intervals.ts` with: `INTERVALS` table (semitone→name+symbol), `Interval` type, `intervalBetween(a,b)`, `intervalSemitones(name)`, `quality` (major/minor/perfect/dim/aug), compound intervals (9/11/13 mapping). Reference: RESEARCH.md §2.
- **Artifacts:** `src/lib/theory/intervals.ts`.
- **Validation:** e.g., intervalBetween(C,G)=P5, intervalBetween(C,F♯)=aug4/tritone.

#### Task 1.6 — Theory engine: `scales`
- **Objective:** Scale definitions + note generation.
- **Actions:** Create `scales.ts` with: `SCALE_FORMULAS` (major, natural/harmonic/melodic minor, major/minor pentatonic, blues; 7 modes), `scaleNotes(root, type)` returning ordered notes, `modeOf(parentKey, degree)`. Reference: RESEARCH.md §3–§4.
- **Artifacts:** `src/lib/theory/scales.ts`.
- **Validation:** scaleNotes(C,'major') = C D E F G A B; scaleNotes(A,'harmonic-minor') includes G♯.

#### Task 1.7 — Theory engine: `chords`
- **Objective:** Chord construction from formulas.
- **Actions:** Create `chords.ts` with: `CHORD_FORMULAS` (triads: maj/min/dim/aug; 7ths: maj7/dom7/m7/m7b5/dim7; common extensions: maj9/9/m9/maj13/13/m11; alterations: 7b9/7#9/7#11/7b13/7alt), `chordNotes(root,type)`, `chordIntervals(type)`, `parseChordSymbol("Cmaj7")` → {root, type}. Reference: RESEARCH.md §5–§7.
- **Artifacts:** `src/lib/theory/chords.ts`.
- **Validation:** chordNotes(C,'maj7')=C E G B; chordNotes(C,'dom7')=C E G B♭; parseChordSymbol("G7") works.

#### Task 1.8 — Theory engine: `diatonic`
- **Objective:** Diatonic harmony + Roman numerals.
- **Actions:** Create `diatonic.ts` with: `diatonicChords(key, scaleType)` → 7 chords with qualities + Roman numerals (maj7/m7/m7/maj7/dom7/m7/m7b5 for major), minor-key sequence, `romanNumeralOf(degree, quality)`, `relativeMinor(key)`, `keySignature(key)`. Reference: RESEARCH.md §8, §10.
- **Artifacts:** `src/lib/theory/diatonic.ts`.
- **Validation:** diatonicChords(C,'major')[4] = G7 (V); [6] = Bm7♭5 (vii°).

#### Task 1.9 — Theory engine: `fretboard`
- **Objective:** Map notes to fret positions for a tuning.
- **Actions:** Create `fretboard.ts` with: `TUNINGS` (standard + a few), `FretPosition {string, fret, note, octave, midi}`, `buildFretboard(tuning, fretCount)` → matrix, `notesOnFretboard(noteName)` → positions, `isRootMarker`. Default 22 frets. Reference: RESEARCH.md §1.
- **Artifacts:** `src/lib/theory/fretboard.ts`.
- **Validation:** buildFretboard(standard,12)[0][0].note = E2; C appears at expected positions.

#### Task 1.10 — Theory engine: `solfège`
- **Objective:** Fixed-Do note↔solfège mapping.
- **Actions:** Create `solfege.ts` with: `FIXED_DO` map (C=Do, D=Ré, …), `toSolfege(note)`, `fromSolfege(syllable)`. Reference: PROJECT.md key decision #2.
- **Artifacts:** `src/lib/theory/solfege.ts`.
- **Validation:** toSolfege(C)=Do; round-trip for all 12.

#### Task 1.11 — Vitest setup + engine test suite
- **Objective:** Full unit coverage for the pure engine.
- **Actions:**
  1. `npm install -D vitest @testing-library/svelte jsdom @testing-library/jest-dom`.
  2. Add `vitest.config.ts` (jsdom env, alias `$lib`).
  3. Write `src/lib/theory/*.test.ts` for every module above — include edge cases: enharmonics, negative transposes, all 12 roots, minor-key borrow.
  4. Add npm script `test` (watch) and `test:run` (CI), `coverage`.
- **Artifacts:** `vitest.config.ts`, `src/lib/theory/*.test.ts`.
- **Validation:** `npm run test:run` all green; coverage ≥ 90% on `src/lib/theory`.

#### Task 1.12 — GitHub Actions: CI + Pages deploy (empty shell)
- **Objective:** Automated quality gate + deployment pipeline.
- **Actions:**
  1. Create `.github/workflows/ci.yml`: on PR/push → `npm ci`, lint, `tsc --noEmit`, `npm run test:run`, `npm run build`.
  2. Create `.github/workflows/deploy.yml`: on push to `main` → build with `base=/harmoguitar/` → `actions/upload-pages-artifact` of `dist/` → `actions/deploy-pages`.
  3. Add `public/.nojekyll`.
  4. In repo Settings → Pages: source = GitHub Actions (`gh api` or manual note).
  5. Push; verify empty shell loads at the Pages URL.
- **Artifacts:** `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `public/.nojekyll`.
- **Validation:** CI green on PR; deploy workflow succeeds; site reachable.

---

### Epic E2 — Core Widgets (M2)

#### Task 2.1 — Application store (shared selection state)
- **Objective:** Single source of truth for all widgets.
- **Actions:** Create `src/lib/stores/app.svelte.ts` (Svelte 5 runes module) holding: `rootNote`, `chordType`, `scaleType`, `key`, `tuning`, `fretCount`, `selectedNotes`, `playback` state. Expose `reset()`. Derive `currentChordNotes`, `currentScaleNotes` via `$derived`.
- **Artifacts:** `src/lib/stores/app.svelte.ts`.
- **Validation:** Importing in two components reads same values; mutating updates both.

#### Task 2.2 — Web Audio engine service
- **Objective:** Synthesized guitar-like playback.
- **Actions:** Create `src/lib/services/audio.ts` (singleton `AudioEngine`): lazy `AudioContext` (resume on first user gesture), `playNote(midi, duration)`, `playChord(midi[], {arpeggio|strum})`, `playProgression(chords[], tempo)`. Timbre: oscillator (sawtooth/triangle blend) → lowpass filter → pluck envelope (fast attack, exp decay). Map note→MIDI.
- **Artifacts:** `src/lib/services/audio.ts`, `src/lib/theory/midi.ts` (note↔midi).
- **Validation:** Manual: click plays sound; chord strums; no console errors; AudioContext resumes after gesture.

#### Task 2.3 — Interactive fretboard component
- **Objective:** Clickable, highlightable fretboard bound to store.
- **Actions:** Create `src/lib/components/Fretboard.svelte`: render strings×frets grid from `buildFretboard()`; click cell → set selected note, call `AudioEngine.playNote`, highlight all positions of that note; show note labels + solfège toggle; root markers (open strings, fret 12); ARIA: each cell is a `<button>` with `aria-label="String N fret F: NOTE"`. Props: `fretCount`, `tuning`, `highlightNotes`.
- **Artifacts:** `src/lib/components/Fretboard.svelte`.
- **Validation:** Click C → all Cs highlighted + audible; keyboard tab reaches cells; store updates.

#### Task 2.4 — App shell: layout, nav, hash routing
- **Objective:** Navigable SPA shell.
- **Actions:** Create `src/App.svelte`, `src/lib/components/Nav.svelte`, `src/lib/components/Layout.svelte`; tiny hash router in `src/lib/router.ts` (`#/`, `#/lessons`, `#/builder`, `#/about`). Routes lazy-load where heavy. Top nav + footer; "Home / Lessons / Builder / About".
- **Artifacts:** `src/App.svelte`, `src/lib/router.ts`, `src/lib/components/{Nav,Layout}.svelte`.
- **Validation:** Nav between routes updates view + URL hash; deep-link `#/lessons` works on reload.

#### Task 2.5 — Tailwind theme + base design
- **Objective:** Cohesive visual foundation.
- **Actions:** Finalize `@theme` tokens (color-blind-safe note palette — never color-only; pair with labels), typography, spacing; build a `NoteBadge` component; ensure dark mode (static site, prefer `prefers-color-scheme`).
- **Artifacts:** `src/app.css`, `src/lib/components/NoteBadge.svelte`.
- **Validation:** Visual review; contrast ≥ 4.5:1 on text.

---

### Epic E3 — Notation + Visualizations (M3)

#### Task 3.1 — VexFlow staff component
- **Objective:** Live staff notation bound to store.
- **Actions:** Create `src/lib/components/Staff.svelte`: render a `Renderer` on a `<canvas>`/`<div>`; draw treble clef + notes (single note, interval, chord, scale) from store selection; correct accidentals. Use Svelte 5 `$effect` to redraw on store change; **debounce** rapid updates; clear/redraw only when selection changes. Reference: PROJECT.md risk mitigation for VexFlow perf.
- **Artifacts:** `src/lib/components/Staff.svelte`.
- **Validation:** Selecting Cmaj7 shows C E G B on staff with correct clef; changing root redraws; no flicker.

#### Task 3.2 — D3 interval wheel
- **Objective:** Reactive interval visualization.
- **Actions:** Create `src/lib/components/IntervalWheel.svelte`: 12-position clock wheel; selected root at top; show all intervals labeled; highlight a chosen interval. SVG via D3, redraw in `$effect`. Color-blind-safe + text labels.
- **Artifacts:** `src/lib/components/IntervalWheel.svelte`.
- **Validation:** Selecting root rotates/relabels; hovering interval shows name + semitones.

#### Task 3.3 — D3 circle of fifths (reactive)
- **Objective:** Interactive circle of fifths.
- **Actions:** Create `src/lib/components/CircleOfFifths.svelte`: 12 keys around circle (majors + relative minors inner); click a key → sets store.key; highlight diatonic chords of current key; show key signature count. Reference: RESEARCH.md §10.
- **Artifacts:** `src/lib/components/CircleOfFifths.svelte`.
- **Validation:** Click G → store.key=G, diatonic chords update, fretboard/staff follow.

---

### Epic E4 — Learning Content + Builder (M4)

#### Task 4.1 — Lesson data schema + types
- **Objective:** Editable, code-free lesson authoring.
- **Actions:** Define `src/lib/content/schema.ts` types: `Lesson { id, title, slug, summary, blocks: Block[], widgetRef?, prev?, next? }`; `Block = TextBlock | HeadingBlock | ExampleBlock | WidgetBlock`. Widget block references a widget + initial selection. Author lessons as `.ts`/`.md` data under `src/lib/content/lessons/`.
- **Artifacts:** `src/lib/content/schema.ts`, `src/lib/content/lessons/index.ts`.
- **Validation:** Type-checks; a sample lesson renders.

#### Task 4.2 — Generic lesson reader component
- **Objective:** Render any lesson from data.
- **Actions:** Create `src/lib/components/LessonView.svelte`: render blocks; embed widgets (Fretboard/Staff/IntervalWheel) for `WidgetBlock`s with initial store state; prev/next nav; progress mark to localStorage. Markdown text via a tiny MD renderer (or `marked`).
- **Artifacts:** `src/lib/components/LessonView.svelte`, `src/lib/components/Markdown.svelte`.
- **Validation:** Navigate lessons; widgets inside lessons sync to store; progress persists on reload.

#### Task 4.3 — Author v1 learning path (from RESEARCH.md §1–§14)
- **Objective:** Complete teachable curriculum.
- **Actions:** Author ~12–14 lesson data files distilling RESEARCH.md:
  1. Notes & the fretboard · 2. Intervals · 3. The major scale · 4. Natural/harmonic/melodic minor · 5. Modes (intro) · 6. Triads · 7. Seventh chords · 8. Extended chords (light) · 9. Diatonic harmony · 10. Functional harmony · 11. Circle of fifths · 12. Progressions & Roman numerals · 13. Cadences · 14. The blues & ii–V–I (light). Each lesson pairs text + a `WidgetBlock`.
- **Artifacts:** `src/lib/content/lessons/*.ts` (or `.md` + frontmatter).
- **Validation:** All lessons render; learning path flows 1→14; no broken widget refs.

#### Task 4.4 — Chord/scale builder experiment tool
- **Objective:** Free-form experimentation.
- **Actions:** Create `src/routes/builder/` page: root selector + type selector (chord & scale) → shows formula/intervals, fretboard, staff, audio play (chord + arpeggio + scale). Bound to store. Reference: PROMPT.md FR6.
- **Artifacts:** `src/lib/components/Builder.svelte` (+ route).
- **Validation:** Pick C + maj7 → fretboard shows voicing, staff shows notes, audio plays; switching type updates all three.

#### Task 4.5 — Optional progress tracking
- **Objective:** localStorage lesson progress.
- **Actions:** `src/lib/services/progress.ts`: `markComplete(lessonId)`, `isComplete()`, `getProgress()`. UI: checkmarks in nav; "reset progress" button. Degrades gracefully if storage blocked (try/catch).
- **Artifacts:** `src/lib/services/progress.ts`.
- **Validation:** Complete a lesson → checkmark persists; reset clears.

---

### Epic E5 — Polish & Ship (M5)

#### Task 5.1 — Responsive pass
- **Objective:** Usable 360px → wide desktop.
- **Actions:** Fretboard horizontal scroll + reduced fret count on narrow viewports (media query / container query); nav collapses to hamburger; test at 360/414/768/1024/1440 widths.
- **Artifacts:** Updated components, `app.css`.
- **Validation:** No horizontal overflow except fretboard; all controls reachable on phone.

#### Task 5.2 — Accessibility audit + fixes
- **Objective:** Meet a11y success criteria.
- **Actions:** Run `@axe-core` (devtool/script); fix: keyboard nav on all widgets, ARIA labels, focus visibility, color-contrast, color-not-sole-indicator. Add `aria-live` for audio/selection feedback. 
- **Artifacts:** Fixes across components; `a11y` notes in README.
- **Validation:** axe reports 0 critical/serious; full keyboard-only walkthrough completes a lesson.

#### Task 5.3 — Performance optimization
- **Objective:** Fast load + 60fps interactions.
- **Actions:** Lazy-load lesson data + heavy widgets (dynamic import); debounce VexFlow/D3 redraws; code-split routes; verify bundle size; add `dist` size budget. 
- **Artifacts:** Updated router/imports, `vite.config.ts` manualChunks.
- **Validation:** Lighthouse: FMP < 2s, perf ≥ 90 on desktop; interactions smooth.

#### Task 5.4 — Design refinement
- **Objective:** Polished, calm aesthetic.
- **Actions:** Consistent spacing/typography; loading skeletons; empty/error states; favicon + meta tags; 404 hash route.
- **Artifacts:** UI polish, `public/favicon.svg`, `index.html` meta.
- **Validation:** Visual QA across routes; meta previews correct.

#### Task 5.5 — v1 release
- **Objective:** Ship.
- **Actions:** Finalize `README.md` (dev + deploy + content-authoring guide); tag `v1.0.0`; deploy via Actions; smoke-test live site; announce.
- **Artifacts:** `README.md`, git tag, live site.
- **Validation:** Live site fully navigable; all v1 success criteria from PROJECT.md met.

---

## 4. Task Dependencies

```
1.1 ──► 1.2 ──► 1.3 ──► 1.4..1.10 (parallel) ──► 1.11 ──► 1.12
                                                    │
                                                    ▼
                          2.1 ──► 2.2 ──► 2.3 ──► 2.4 ──► 2.5
                            │       │       │
                            │       │       └──► 3.1 (needs store+audio)
                            │       └──────► 3.2, 3.3 (need store)
                            └────────────────► 4.1 ──► 4.2 ──► 4.3
                                                            │
                                                            ▼
                                                          4.4 ──► 4.5
                                                                    │
                                                                    ▼
                                              5.1, 5.2, 5.3 (parallel) ──► 5.4 ──► 5.5
```

**Critical path:** 1.1→1.2→1.3→1.4→1.11→1.12→2.1→2.3→3.1→4.2→4.3→5.2→5.5.
**Parallelizable:** 1.4–1.10 (all theory modules independent); 3.1/3.2/3.3 (after store); 5.1/5.2/5.3.

**Hard prerequisites:**
- Store (2.1) must exist before any widget that syncs (2.3, 3.x, 4.4).
- Theory engine (E1) must be tested before widgets consume it.
- Lesson schema (4.1) before content authoring (4.3) and reader (4.2).

---

## 5. Step-by-Step Implementation Sequence

1. **E1.1–1.3:** Init repo, scaffold Vite+Svelte+TS, add Tailwind+lint. Commit after each.
2. **E1.4–1.10:** Build theory modules one at a time, each with its test file (TDD encouraged: write test first).
3. **E1.11:** Wire Vitest config; ensure `npm run test:run` green with coverage.
4. **E1.12:** Add CI + deploy workflows; push; confirm empty shell live on Pages. **(M1 gate)**
5. **E2.1:** Build store; verify with a tiny throwaway consumer.
6. **E2.2:** Audio engine; manual click-to-play test.
7. **E2.3:** Fretboard bound to store+audio.
8. **E2.4–2.5:** App shell + nav + routing + theme. **(M2 gate)**
9. **E3.1:** VexFlow staff (debounced redraw).
10. **E3.2–3.3:** D3 interval wheel + circle of fifths. **(M3 gate)**
11. **E4.1–4.2:** Schema + reader; render one sample lesson.
12. **E4.3:** Author full lesson path from RESEARCH.md.
13. **E4.4–4.5:** Builder tool + progress tracking. **(M4 gate)**
14. **E5.1–5.3 (parallel):** Responsive, a11y, perf.
15. **E5.4–5.5:** Design polish, README, tag v1.0.0, deploy. **(M5 / release gate)**

**Commit cadence:** one commit per task (or sub-task); PRs optional per epic. Keep `main` always deployable.

---

## 6. Testing Strategy

### Unit tests (Vitest) — primary safety net
- **Scope:** all of `src/lib/theory/*` and `src/lib/services/*` (pure logic).
- **Coverage target:** ≥ 90% lines on theory engine.
- **Cases:** all 12 roots, enharmonic equivalence, negative/large transposes, every chord/scale formula, diatonic sequences in major + minor, fretboard positions, solfège round-trip, MIDI conversions.

### Component/integration tests (Testing Library + jsdom)
- **Scope:** store wiring, Fretboard click→highlight→audio mock, Staff redraw on store change, Builder end-to-end (select→render→play stub).
- **Approach:** mock `AudioEngine` (no real AudioContext in jsdom); assert DOM/ARIA and store values.

### End-to-end (Playwright, lightweight)
- **Scope (smoke):** site loads, hash routes navigate, a lesson renders with a widget, fretboard click updates staff, builder plays (audio mocked/allowed), no console errors.
- **Run:** locally + optional CI job (can be manual for v1 to keep CI fast).

### Manual / qualitative
- **Cross-browser:** Chrome, Firefox, Safari (desktop + mobile Safari).
- **Responsive:** 360/414/768/1024/1440 widths.
- **Accessibility:** axe DevTools + keyboard-only walkthrough + screen-reader spot check (VoiceOver).
- **Performance:** Lighthouse (FMP, TBT, perf score) on production build.

### CI gates (`.github/workflows/ci.yml`)
`npm ci` → lint → `tsc --noEmit` → `vitest run` → `vite build`. PR must be green to merge.

---

## 7. Rollout Strategy

- **Environment:** single production target = GitHub Pages (`xezpeleta.github.io/harmoguitar`). No staging server needed (static).
- **Deploy trigger:** push to `main` → `deploy.yml` builds with `base=/harmoguitar/` and publishes `dist/` via `actions/deploy-pages`.
- **Pre-release validation:** preview production build locally (`npm run build && npm run preview`) with correct `base`; run full test + Lighthouse + axe before tagging.
- **Versioning:** semantic tags `v1.0.0`, `v1.0.1`, …; Releases on GitHub.
- **Rollback:** revert the merge commit on `main` (or re-run deploy workflow from a prior commit); GitHub Pages serves the last successful deploy. Keep `main` green so rollback = redeploy previous good commit.
- **Feature gating:** v1.1+ features (jazz deep-dive, movable-Do, left-handed, i18n, ear-training) tracked as separate issues; not merged until v1 ships.

---

## 8. Monitoring & Observability

Static site, no backend → observability is build-time + client-side resilience:

- **CI as the first monitor:** every PR/push runs typecheck, lint, unit/component tests, build. A red CI blocks deploy.
- **Client-side error boundary:** a Svelte `ErrorBoundary`-style wrapper catches render errors in widgets, logs to `console.error` with context, and shows a friendly fallback so one broken widget never blanks the page.
- **Defensive audio:** `AudioEngine` wraps all calls in try/catch; if `AudioContext` unavailable, silently degrades (UI still works, just silent).
- **Build size budget:** `vite.config.ts` reports chunk sizes; warn if main bundle exceeds threshold (e.g., 250 KB gzip) → triggers code-splitting review.
- **Optional (post-v1):** if analytics desired later, integrate a privacy-respecting, static-friendly option (e.g., Plausible self-host or GitHub-based) — explicitly **not** in v1 per PROJECT.md (no analytics).

---

## 9. Risks, Unknowns, and Fallbacks

| Risk | Likelihood | Impact | Mitigation / Fallback |
|------|-----------|--------|------------------------|
| VexFlow redraw perf (frequent store updates) | Med | Med | Debounce redraws; diff/clear only changed staves; render off-DOM; cap update rate. |
| Imperative D3/VexFlow vs Svelte 5 runes reactivity desync | Med | High | Components own imperative refs; subscribe to store; redraw only in `$effect` keyed on explicit dependencies; single source of truth. |
| Svelte 5 runes + shared `.svelte.ts` store pitfalls | Med | Med | Follow Svelte 5 docs for `.svelte.ts` state modules; add component tests for store sharing. |
| Fretboard unusable on small screens | High | Med | Horizontal scroll + reduced fret count on narrow viewports; pinch-zoom. |
| Synthesized audio sounds poor | Med | Low-Med | Layer oscillators + lowpass + pluck envelope; if rejected, defer to sampled assets in v1.1 (out of v1 scope). |
| GitHub Pages base path / asset 404s | Med | High | Set `base: "/harmoguitar/"` (env-overridable); hash routing; verify via `vite preview` with same base before deploy. |
| a11y gaps on custom widgets (fretboard, wheel) | Med | Med | Treat cells as buttons with ARIA labels; keyboard map; axe in CI/manual; never color-only. |
| Tailwind v4 migration/config unfamiliarity | Low | Low | Use official `@tailwindcss/vite` + `@import "tailwindcss"`; tokens in `@theme`. |
| Deep-jazz scope creep into v1 | Med | Med | Hard v1 content boundary (§1–§14 light); jazz deep-dive is v1.1+; `RESEARCH.md` stays as reserve. |
| `gh repo create` permissions / existing repo | Low | Low | If repo exists, just `git remote add origin`; verify with `gh repo view`. |
| Theory edge cases (enharmonic spelling, key signatures) | Med | Med | Extensive unit tests; favor sharps-by-default with explicit flat handling; match RESEARCH.md conventions. |

**Unknowns to resolve during build:**
- Exact VexFlow 5 API shape for reactive redraw (confirm in Task 3.1 spike).
- Whether Svelte 5 `.svelte.ts` shared state behaves as expected across lazy-loaded routes (confirm in Task 2.1).
- Final note-color palette for color-blind safety (confirm in Task 2.5 with a simulator).

---

## 10. Definition of Done

**v1 is done when ALL of the following hold:**

- [ ] Repo initialized, on GitHub, with `main` green and deploying via Actions to GitHub Pages.
- [ ] Theory engine (`src/lib/theory/*`) complete with ≥90% unit-test coverage; `npm run test:run` green.
- [ ] Fretboard, Staff (VexFlow), IntervalWheel, and CircleOfFifths all render and stay synchronized to the shared store for any selection.
- [ ] Web Audio engine plays notes, chords (strum/arpeggio), and progressions without errors after a user gesture.
- [ ] Hash routing works; deep-links survive reload.
- [ ] Full v1 lesson path (≈14 lessons, RESEARCH.md §1–§14 light) authored as data and rendered by the generic reader; adding a lesson requires only a data file.
- [ ] Chord/scale builder tool fully functional (select → formula + fretboard + staff + audio).
- [ ] Optional localStorage progress tracking works and degrades gracefully.
- [ ] Responsive: usable at 360px–1440px+; fretboard usable on mobile.
- [ ] Accessibility: axe shows 0 critical/serious; full keyboard-only walkthrough completes a lesson; contrast ≥ 4.5:1; not color-only.
- [ ] Performance: FMP < 2s on typical connection; interactions smooth (≥60fps); Lighthouse perf ≥ 90 desktop.
- [ ] `README.md` documents local dev, deploy, and content-authoring.
- [ ] Tagged `v1.0.0`; live site fully navigable; PROJECT.md success criteria met.
