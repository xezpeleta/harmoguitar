/**
 * markdown.test.ts — Tests for the tiny inline-markdown renderer.
 *
 * Covers: escaping (XSS safety), bold/italic/code, links, list + paragraph
 * parsing. The renderer is the sole source of {@html} content in the app, so
 * its escaping guarantees are security-relevant.
 */
import { describe, it, expect } from 'vitest'
import {
  renderInline,
  renderMarkdown,
  parseInline,
  parseBlocks,
} from '$lib/utils/markdown'

describe('renderInline', () => {
  it('escapes HTML-significant characters', () => {
    expect(renderInline('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    )
  })

  it('escapes quotes and ampersands', () => {
    expect(renderInline('"a & b"')).toBe('&quot;a &amp; b&quot;')
  })

  it('renders bold', () => {
    expect(renderInline('**hi**')).toBe('<strong>hi</strong>')
  })

  it('renders italic', () => {
    expect(renderInline('a *b* c')).toBe('a <em>b</em> c')
  })

  it('renders inline code', () => {
    expect(renderInline('see `code` here')).toBe('see <code>code</code> here')
  })

  it('does not format inside code spans', () => {
    // The ** inside the code span must survive unformatted.
    expect(renderInline('`a **b** c`')).toBe('<code>a **b** c</code>')
  })

  it('renders http links with a safe target', () => {
    const out = renderInline('[ex](https://example.com)')
    expect(out).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener noreferrer">ex</a>',
    )
  })

  it('renders hash links without target', () => {
    expect(renderInline('[go](#/lessons)')).toBe('<a href="#/lessons">go</a>')
  })

  it('rejects javascript: URLs', () => {
    // The href is neutralised to '#'; the XSS vector is removed.
    expect(renderInline('[x](javascript:alert)')).toBe('<a href="#">x</a>')
  })

  it('does not treat a lone * as italic', () => {
    expect(renderInline('3 * 4')).toBe('3 * 4')
  })
})

describe('renderMarkdown', () => {
  it('wraps plain text in a paragraph', () => {
    expect(renderMarkdown('Hello world')).toBe('<p>Hello world</p>')
  })

  it('splits paragraphs on blank lines', () => {
    expect(renderMarkdown('One\n\nTwo')).toBe('<p>One</p>\n<p>Two</p>')
  })

  it('joins wrapped lines within a paragraph', () => {
    expect(renderMarkdown('line one\nline two')).toBe('<p>line one line two</p>')
  })

  it('renders a bullet list', () => {
    expect(renderMarkdown('- a\n- b')).toBe('<ul><li>a</li><li>b</li></ul>')
  })

  it('renders an ordered list', () => {
    expect(renderMarkdown('1. a\n2. b')).toBe('<ol><li>a</li><li>b</li></ol>')
  })

  it('formats inline markdown inside list items', () => {
    expect(renderMarkdown('- **x**')).toBe('<ul><li><strong>x</strong></li></ul>')
  })

  it('escapes HTML in paragraphs', () => {
    expect(renderMarkdown('<b>x</b>')).toBe('<p>&lt;b&gt;x&lt;/b&gt;</p>')
  })
})

describe('parseInline — note tokens', () => {
  it('returns a single text node when there are no tokens', () => {
    const nodes = parseInline('just text')
    expect(nodes).toHaveLength(1)
    expect(nodes[0]).toEqual({ kind: 'text', html: 'just text' })
  })

  it('extracts a note token into a note node', () => {
    const nodes = parseInline('rooted at {{C}}')
    expect(nodes).toEqual([
      { kind: 'text', html: 'rooted at ' },
      { kind: 'note', note: 'C' },
    ])
  })

  it('handles accidentals (sharps and flats)', () => {
    const nodes = parseInline('{{F#}} and {{Bb}}')
    expect(nodes.filter((n) => n.kind === 'note')).toEqual([
      { kind: 'note', note: 'F#' },
      { kind: 'note', note: 'Bb' },
    ])
  })

  it('handles double flats/sharps', () => {
    const nodes = parseInline('{{Bbb}}')
    expect(nodes).toEqual([{ kind: 'note', note: 'Bbb' }])
  })

  it('keeps note names verbatim (not HTML-escaped) — # is not special', () => {
    const nodes = parseInline('{{C#}}')
    expect(nodes[0]).toEqual({ kind: 'note', note: 'C#' })
  })

  it('does not match {{CODE0}} stash tokens or arbitrary braces', () => {
    // {{CODE0}} is the internal code-span stash; must not become a note.
    const nodes = parseInline('{{CODE0}} done')
    expect(nodes.some((n) => n.kind === 'note')).toBe(false)
  })

  it('still formats markdown in the text segments around tokens', () => {
    const nodes = parseInline('**bold** {{D}} *it*')
    expect(nodes[0]).toEqual({ kind: 'text', html: '<strong>bold</strong> ' })
    expect(nodes[1]).toEqual({ kind: 'note', note: 'D' })
    expect(nodes[2]).toEqual({ kind: 'text', html: ' <em>it</em>' })
  })

  it('escapes HTML in text segments adjacent to tokens', () => {
    const nodes = parseInline('{{C}} <script>')
    expect(nodes[1]).toEqual({ kind: 'text', html: ' &lt;script&gt;' })
  })
})

describe('renderInline — note chips (HTML fallback)', () => {
  it('serializes a note token to a plain chip span', () => {
    expect(renderInline('see {{C}}')).toBe(
      'see <span class="note-chip" data-note="C">C</span>',
    )
  })
})

describe('parseBlocks', () => {
  it('parses paragraphs, bullet and ordered lists', () => {
    const blocks = parseBlocks('intro\n\n- a\n- b\n\n1. x\n2. y')
    expect(blocks).toEqual([
      { kind: 'p', text: 'intro' },
      { kind: 'ul', items: ['a', 'b'] },
      { kind: 'ol', items: ['x', 'y'] },
    ])
  })

  it('joins wrapped lines within a paragraph', () => {
    const blocks = parseBlocks('line one\nline two')
    expect(blocks).toEqual([{ kind: 'p', text: 'line one line two' }])
  })
})
