/**
 * router.svelte.ts — Tiny hash-based router.
 *
 * Hash routing (`#/path`) is required for GitHub Pages, which has no server to
 * rewrite URLs. This module exposes a reactive `route` (Svelte 5 `$state`) that
 * tracks `location.hash`, plus a `navigate()` helper. Routes:
 *   #/          Home
 *   #/lessons   Lessons (M4)
 *   #/builder   Chord/scale builder (M4)
 *   #/about     About
 *
 * Reference: PLAN.md Task 2.4, PROJECT.md (hash-based routing).
 */

export interface RouteState {
  /** Normalised path without the leading `#`, e.g. "/lessons". */
  path: string
}

/** Parse the current location hash into a normalised path. */
function parseHash(): string {
  if (typeof window === 'undefined') return '/'
  const raw = window.location.hash.replace(/^#/, '')
  if (!raw) return '/'
  // Ensure a leading slash.
  return raw.startsWith('/') ? raw : `/${raw}`
}

/** The reactive current route. Read `route.path` in components. */
export const route = $state<RouteState>({ path: parseHash() })

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    route.path = parseHash()
  })
}

/** Navigate to a path (sets the hash, which fires `hashchange`). */
export function navigate(path: string): void {
  if (typeof window === 'undefined') return
  const normalised = path.startsWith('/') ? path : `/${path}`
  window.location.hash = normalised
}

/** The list of nav links, in display order. */
export interface NavItem {
  path: string
  label: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/lessons', label: 'Lessons' },
  { path: '/builder', label: 'Builder' },
  { path: '/about', label: 'About' },
]
