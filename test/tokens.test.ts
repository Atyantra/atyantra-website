import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const css = readFileSync(resolve(__dirname, '../app/globals.css'), 'utf8')

describe('design tokens', () => {
  it('defines every color token verbatim', () => {
    expect(css).toContain('--ground: #FBFBFA')
    expect(css).toContain('--ink: #191919')
    expect(css).toContain('--ink-muted: rgb(25 25 25 / 0.60)')
    expect(css).toContain('--ink-faint: rgb(25 25 25 / 0.40)')
    expect(css).toContain('--hairline: rgb(25 25 25 / 0.12)')
    expect(css).toContain('--accent: #1F4B3F')
    expect(css).toContain('--panel: rgb(255 255 255 / 0.90)')
  })
  it('exposes tokens to Tailwind via @theme', () => {
    expect(css).toMatch(/@theme[^{]*\{[\s\S]*?--color-ground:\s*var\(--ground\)/)
  })
  it('does not reintroduce dark mode', () => {
    expect(css).not.toContain('prefers-color-scheme: dark')
  })
})
