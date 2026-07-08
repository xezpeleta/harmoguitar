# HarmoGuitar — Interactive Guitar Harmony Tutor

## Original Intent (short)

A static website that teaches musical harmony to experienced guitar players who lack formal harmony grounding but have basic solfège knowledge. Visitors experiment interactively with notes, intervals, chords, and progressions to build an intuitive understanding of harmony. Built with rich JS visualization libraries (D3.js, VexFlow), styled with Tailwind CSS, and deployed as a static site on GitHub Pages.

## Refined Prompt

Build **HarmoGuitar**, an interactive, single-page-style static website that teaches the foundations of musical harmony through the lens of the guitar fretboard. The site targets experienced guitarists (comfortable with the instrument and tab/positions) who nevertheless lack grounding in harmony theory, while assuming some basic solfège familiarity (Do–Re–Mi, note names).

The site should guide learners from the simplest concepts (notes, intervals) up through chords, scales, diatonic harmony, and common progressions — always pairing a concise written explanation with a hands-on, interactive visualization on a virtual fretboard and/or staff. The experience should feel less like reading a textbook and more like a playable instrument that reveals theory through experimentation.

Core interactions let users select notes/chords on the fretboard, hear them (via Web Audio), see them notated on a staff (VexFlow), and explore relationships on visual diagrams (D3.js) — e.g., interval wheels, chord-construction breakdowns, or the circle of fifths.

The site is static (no backend), styled with Tailwind CSS for a polished, responsive UX, and deployable directly to GitHub Pages.

## Scope

**In scope:**
- A static multi-section site (SPA-style navigation, no server).
- Interactive fretboard component (clickable frets/strings, note highlighting).
- Interactive staff notation rendering via VexFlow.
- Data-driven visualizations via D3.js (interval wheel, circle of fifths, chord/scale maps).
- Web Audio playback for notes, intervals, chords, and progressions.
- A guided learning path: notes → intervals → triads/chords → scales → keys & diatonic harmony → progressions.
- Responsive, mobile-friendly layout via Tailwind CSS.
- GitHub Pages deployment configuration.

**Out of scope (for v1):**
- User accounts, persistence, or server-side logic.
- Backend analytics or dynamic content generation.
- Full ear-training games (may be a follow-up).
- Video or audio asset hosting beyond synthesized Web Audio.
- Multi-instrument support (guitar only).

## Functional Requirements

1. **Learning path / content sections.** Organize content as a progressive set of lessons or modules, each combining explanatory text with an interactive widget. Topics, in order: notes on the fretboard, intervals, triads & chord construction, seventh chords, scales (major, natural/harmonic minor, modes), keys & diatonic harmony, and common progressions (e.g., I–IV–V, ii–V–I).
2. **Interactive fretboard.** A configurable fretboard (default EADGBE, adjustable fret count). Clicking a fret position highlights that note everywhere it occurs, plays it, and reports its name (with movable Do/solfège option).
3. **Staff notation (VexFlow).** Render selected notes, intervals, chords, and scales on a musical staff in real time, with correct accidentals and clef.
4. **Visualizations (D3.js).** At minimum: an interval/relationship wheel and a circle of fifths. Visualizations must update reactively to user selections.
5. **Audio playback (Web Audio).** Synthesize guitar-like tones for individual notes, chords (strummed/arpeggiated), and progressions. Provide a tempo/duration control where relevant.
6. **Experimentation tools.** Let users build custom chords/scales by selecting root + type, see the formula (intervals), hear it, and view it on both fretboard and staff.
7. **Navigation & UX.** Clear top/side navigation, progress indication through lessons, responsive layout (works on phone, tablet, desktop), accessible controls (keyboard navigable, sufficient contrast).
8. **Static deployment.** Build output is plain HTML/CSS/JS deployable to GitHub Pages; include the necessary config (e.g., `.nojekyll` or a GitHub Actions workflow).

## Non-Functional Requirements

- **Performance:** First meaningful paint fast on a typical connection; interactive widgets remain responsive (animations at 60fps where applicable). Lazy-load lesson content/assets as needed.
- **Accessibility:** Keyboard-navigable interactive elements, ARIA labels on fretboard/staff controls, color-blind-safe palettes (never rely on color alone to distinguish notes/intervals).
- **Responsiveness:** Layout adapts cleanly from ~360px mobile up to wide desktops; fretboard remains usable on small screens (scrollable or zoomable).
- **Maintainability:** Clean separation of concerns — theory/engine (note math, chord/scale definitions) decoupled from UI components. Well-commented, modular code.
- **Browser support:** Modern evergreen browsers (latest Chrome, Firefox, Safari, Edge). Web Audio + ES modules baseline.
- **Build/tooling:** A simple, reproducible build (e.g., Vite + Tailwind) producing static assets; minified for production.
- **Design quality:** Polished, modern, calm aesthetic appropriate for learning; consistent typography and spacing; legible notation.

## Constraints & Assumptions

### Constraints
- Static site only — no server, no runtime database. All logic runs client-side.
- Hosted on GitHub Pages (so no custom server routing; use hash- or client-side routing).
- Must rely on open libraries: D3.js, VexFlow, Tailwind CSS, Web Audio API.
- No copyrighted sheet music or audio assets — all notation is generated programmatically and audio is synthesized.

### Assumptions made
- **Tuning:** Standard guitar tuning E2–A2–D3–G3–B3–E4 by default, with the option to change tuning later.
- **Language:** UI and lesson content in English (localization is a future concern).
- **Solfège flavor:** Fixed-Do mapping shown alongside note names; a movable-Do view may be added but note names are primary.
- **Theory scope:** Western tonal harmony (major/minor tonality) is the focus; jazz/mode-heavy content is light in v1.
- **No accounts:** Progress tracking uses local storage only (optional, non-essential).
- **Audio synthesis:** Web Audio oscillators/sampling are acceptable; no need for a full sampled guitar instrument in v1, though a guitar-like timbre is preferred.
- **Build stack:** Assumed Vite + vanilla JS (or a lightweight framework such as Svelte/Vue) with Tailwind CSS; the exact framework can be confirmed with the user.
- **Audience baseline:** Users know open chords/positions and basic solfège, but not interval names, chord construction, or functional harmony.

## Success Criteria

- A visitor can complete the lesson path and, by the end, explain what an interval is, build a major/minor triad from a root, identify the diatonic chords of a key, and recognize a I–IV–V progression.
- Every concept has a paired interactive widget that lets the user *hear and see* it, not just read about it.
- The fretboard, staff (VexFlow), and D3 visualizations stay synchronized for any selection the user makes.
- The site loads and runs entirely client-side on GitHub Pages with no build errors, and passes basic accessibility/contrast checks.
- The UX is clean and responsive across mobile and desktop.
- Theory logic (e.g., "what notes are in Cmaj7?") is implemented in a reusable, testable module independent of the UI.

## Open Questions

1. **Framework preference:** Vanilla JS + Vite, or a component framework (Svelte/Vue/React)? VexFlow + D3 integrate cleanly with any, but component model affects maintainability.
2. **Solfège depth:** Should we support movable-Do (and key-relative solfège) in v1, or only fixed-Do alongside note names?
3. **Guitar audio timbre:** Accept synthesized oscillator tones for v1, or integrate sampled guitar notes (heavier assets)?
4. **Progress tracking:** Use localStorage to remember lesson progress, or keep it purely stateless for v1?
5. **Left-handed / fretboard orientation:** Provide a left-handed fretboard view toggle in v1?
6. **Language:** English only for v1, or plan for i18n from the start?
7. **Lesson authoring:** Should lesson content live in structured data files (JSON/MD) for easy editing, or be hardcoded into components?
