/**
 * markdown.ts — Tiny inline-markdown renderer + node parser.
 *
 * Lessons use a deliberately small markdown subset inside `text`, `callout`,
 * and `list` blocks: **bold**, *italic*, `code`, [links](url), and note-chip
 * tokens `{{C}}`. There are no headings (those are `HeadingBlock`s), no
 * images, no nested lists. This keeps the renderer dependency-free, auditable,
 * and XSS-safe (all content is escaped before formatting).
 *
 * Two layers:
 *   - `parseInline` / `parseBlocks` return a node tree used by the Svelte
 *     components (`InlineText.svelte`, `Markdown.svelte`) so that note tokens
 *     render as real, reactive `NoteBadge` chips (adapting to the solfège
 *     toggle) instead of static HTML.
 *   - `renderInline` / `renderMarkdown` serialize the same tree to an HTML
 *     string (notes become plain `<span>` chips) — kept for tests and as a
 *     non-reactive fallback. No production path uses `{@html}` anymore.
 */
import type { NoteName } from '$lib/theory/notes'

const ESC: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Escape HTML-significant characters. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
}

/**
 * A note-chip token: `{{C}}`, `{{F#}}`, `{{Bb}}`, `{{Bbb}}`. Authors opt in to
 * a coloured, toggle-aware chip by wrapping a note name in double braces.
 * The letter class [A-G] avoids matching the internal `{{CODE{n}}}` stash and
 * arbitrary braced prose.
 */
const NOTE_TOKEN = /\{\{([A-G][#b]*)\}\}/g

/** An inline node: either formatted HTML text or a note reference. */
export type InlineNode =
  | { kind: 'text'; html: string }
  | { kind: 'note'; note: NoteName }

/** A block-level node produced from multi-line markdown. */
export type BlockNode =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }

/**
 * Apply inline markdown to an *already-escaped* string. We run formatters
 * back-to-front so their delimiters do not collide. Order matters: code spans
 * are extracted first (so their contents are not re-formatted), then bold
 * (must precede italic because ** contains *).
 */
function formatInline(escaped: string): string {
  let out = escaped

  // `code` — protect contents from further formatting using a token that
  // cannot appear in escaped lesson text (no <, >, &, ", or markdown chars).
  const codeStash: string[] = []
  out = out.replace(/`([^`]+)`/g, (_m, code: string) => {
    codeStash.push(code)
    return `{{CODE${codeStash.length - 1}}}`
  })

  // **bold**
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // *italic*
  out = out.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>')

  // [text](url) — only http(s) and hash links, to be safe.
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, text: string, url: string) => {
      const safe = /^(https?:\/\/|#|\/)/.test(url) ? url : '#'
      return `<a href="${safe}"${safe.startsWith('#') || safe.startsWith('/') ? '' : ' target="_blank" rel="noopener noreferrer"'}>${text}</a>`
    },
  )

  // Restore code spans.
  out = out.replace(/{{CODE(\d+)}}/g, (_m, i: string) => {
    return `<code>${codeStash[Number(i)] ?? ''}</code>`
  })

  return out
}

/**
 * Parse inline markdown into an ordered list of text segments (formatted,
 * escaped HTML) and note references. Note tokens are extracted from the raw
 * string *before* escaping so their names are preserved verbatim.
 */
export function parseInline(markdown: string): InlineNode[] {
  const nodes: InlineNode[] = []
  let last = 0
  NOTE_TOKEN.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = NOTE_TOKEN.exec(markdown)) !== null) {
    if (m.index > last) {
      nodes.push({
        kind: 'text',
        html: formatInline(escapeHtml(markdown.slice(last, m.index))),
      })
    }
    nodes.push({ kind: 'note', note: m[1] as NoteName })
    last = m.index + m[0].length
  }
  if (last < markdown.length) {
    nodes.push({ kind: 'text', html: formatInline(escapeHtml(markdown.slice(last))) })
  }
  return nodes
}

/** Serialize a single note node to a plain (non-reactive) HTML chip. */
function noteChipHtml(note: NoteName): string {
  const n = escapeHtml(note)
  return `<span class="note-chip" data-note="${n}">${n}</span>`
}

/** Render an inline-markdown string to safe HTML (notes become plain chips). */
export function renderInline(markdown: string): string {
  return parseInline(markdown)
    .map((n) => (n.kind === 'text' ? n.html : noteChipHtml(n.note)))
    .join('')
}

/**
 * Parse multi-line markdown into block nodes (paragraphs + simple lists).
 * Blank lines separate paragraphs. Lines starting with `- ` or `* ` become
 * bullet items; `1. ` / `2. ` become ordered items. Consecutive list lines
 * merge into a single list. Inline content is kept raw for the component to
 * parse via `parseInline`.
 */
export function parseBlocks(markdown: string): BlockNode[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const blocks: BlockNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]!

    if (line.trim() === '') {
      i++
      continue
    }

    // Bullet list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\s*[-*]\s+/, ''))
        i++
      }
      blocks.push({ kind: 'ul', items })
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      blocks.push({ kind: 'ol', items })
      continue
    }

    // Paragraph (collect consecutive non-empty, non-list lines)
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i]!.trim() !== '' &&
      !/^\s*[-*]\s+/.test(lines[i]!) &&
      !/^\s*\d+\.\s+/.test(lines[i]!)
    ) {
      para.push(lines[i]!)
      i++
    }
    blocks.push({ kind: 'p', text: para.join(' ') })
  }

  return blocks
}

/**
 * Render a multi-line markdown string to HTML (paragraphs + lists). Notes
 * become plain chips. Kept for tests / non-reactive fallback.
 */
export function renderMarkdown(markdown: string): string {
  return parseBlocks(markdown)
    .map((b) => {
      if (b.kind === 'ul') {
        return `<ul>${b.items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ul>`
      }
      if (b.kind === 'ol') {
        return `<ol>${b.items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ol>`
      }
      return `<p>${renderInline(b.text)}</p>`
    })
    .join('\n')
}
