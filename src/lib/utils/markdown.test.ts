/**
 * markdown.test.ts — Tests for the tiny inline-markdown renderer.
 *
 * Covers: escaping (XSS safety), bold/italic/code, links, list + paragraph
 * parsing. The renderer is the sole source of {@html} content in the app, so
 * its escaping guarantees are security-relevant.
 */
import { describe, it, expect } from 'vitest'
import { renderInline, renderMarkdown } from '$lib/utils/markdown'

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
