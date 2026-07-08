import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      // All {@html} content flows through src/lib/utils/markdown.ts, which
      // escapes every HTML-significant character before formatting. There is
      // no user-generated HTML anywhere in this static site, so {@html} is
      // safe. Kept as a warning (not off) to flag any future direct use.
      'svelte/no-at-html-tags': 'warn',
    },
  },
  {
    // Svelte 5 runes modules (.svelte.ts/.svelte.js): the svelte plugin parses
    // these for rune awareness, but it must delegate TypeScript syntax to the
    // TS parser (inline `type` imports, annotations, etc.).
    files: ['**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'coverage/', '.svelte-kit/'],
  },
  prettier,
)
