# HarmoGuitar — Interactive Guitar Harmony Tutor

> A static, client-side web app that teaches Western tonal harmony to
> experienced guitarists through interactive widgets: a virtual fretboard,
> live staff notation, reactive visualizations, and synthesized audio.

**Status:** 🚧 Under construction (v1 in progress)

## What it is

HarmoGuitar takes guitarists who already play but never learned theory from
"I can play chords but don't understand them" to confidently building triads,
mapping diatonic harmony to a key, and recognizing common progressions —
entirely through hands-on, audible, visual interaction.

Every concept is paired with a playable widget rather than a wall of text.

## Tech stack

- **Svelte 5 + Vite + TypeScript** — component model + type-safe theory engine
- **Tailwind CSS v4** — responsive styling
- **VexFlow** — correct musical staff notation
- **D3.js** — reactive diagrams (interval wheel, circle of fifths)
- **Web Audio API** — synthesized guitar-like playback
- **Vitest** — unit tests for the pure theory engine
- **GitHub Pages** — static hosting

## Project documents

- [`PROMPT.md`](./PROMPT.md) — refined prompt, scope, requirements
- [`PROJECT.md`](./PROJECT.md) — full project definition, architecture, milestones
- [`RESEARCH.md`](./RESEARCH.md) — content base (28 sections, foundations → jazz harmony)
- [`PLAN.md`](./PLAN.md) — execution-ready implementation plan

## Local development

```bash
npm install
npm run dev          # start dev server
npm run test         # run unit tests (watch)
npm run test:run     # run unit tests once (CI)
npm run lint         # eslint
npm run build        # production build to dist/
npm run preview      # preview the production build
```

> Requires Node 18+ (developed on Node 24).

## Deployment

Static build deployed to GitHub Pages via GitHub Actions on push to `main`.
The site lives at `https://xezpeleta.github.io/harmoguitar/`.

## License

[MIT](./LICENSE)
