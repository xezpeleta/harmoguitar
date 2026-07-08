/**
 * markdown.ts — Tiny inline-markdown renderer.
 *
 * Lessons use a deliberately small markdown subset inside `text`, `callout`,
 * and `list` blocks: **bold**, *italic*, `code`, and [links](url). There are
 * no headings (those are `HeadingBlock`s), no images, no nested lists. This
 * keeps the renderer dependency-free, auditable, and XSS-safe (all user
 * content is escaped before formatting).
 *
 * Returns an HTML string; the component renders it with {@html}.
 */
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
 * Render an inline-markdown string to safe HTML.
 */
export function renderInline(markdown: string): string {
  return formatInline(escapeHtml(markdown))
}

/**
 * Render a multi-line markdown string (paragraphs + simple lists) to HTML.
 * Blank lines separate paragraphs. Lines starting with `- ` or `* ` become
 * bullet items; `1. ` / `2. ` become ordered items. Consecutive list lines
 * merge into a single <ul>/<ol>.
 */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const parts: string[] = []
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
      parts.push(`<ul>${items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ul>`)
      continue
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]!)) {
        items.push(lines[i]!.replace(/^\s*\d+\.\s+/, ''))
        i++
      }
      parts.push(`<ol>${items.map((it) => `<li>${renderInline(it)}</li>`).join('')}</ol>`)
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
    parts.push(`<p>${renderInline(para.join(' '))}</p>`)
  }

  return parts.join('\n')
}
