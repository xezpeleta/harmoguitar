import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [svelte(), tailwindcss()],

  resolve: {
    alias: {
      $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
    // Activate the `browser` export condition so packages like `svelte` resolve
    // to their client (DOM) build instead of the `default` (server) build when
    // running in vitest's jsdom environment.
    conditions: ['browser'],
  },

  // GitHub Pages serves the site at /harmoguitar/, so the production build
  // must use that base path. Local dev uses '/' for convenience.
  // Override for a custom domain: BASE_PATH='/' npm run build
  base: command === 'build' ? (process.env.BASE_PATH ?? '/harmoguitar/') : '/',

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    // Inline `svelte` so vitest processes it through the vite pipeline (which
    // applies the browser/client export condition). Without this, vitest loads
    // the `default` (server) build and `mount(...)` throws "not available on
    // the server" in component tests.
    server: {
      deps: {
        inline: ['svelte'],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/lib/**/*.{ts,svelte}'],
      exclude: ['src/lib/**/*.test.ts', 'src/tests/**', 'src/lib/**/*.d.ts'],
    },
  },
}))
