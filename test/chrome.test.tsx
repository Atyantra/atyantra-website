import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

describe('Nav', () => {
  it('renders wordmark, the four links, and the CTA', () => {
    render(<Nav />)
    expect(screen.getByText('Atyantra')).toBeInTheDocument()
    for (const label of ['Platform', 'How It Works', 'Whitepaper', 'About']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Talk to Us' })).toHaveAttribute('href', '/contact')
  })
  it('is fixed and transparent (no bg/blur/border classes)', () => {
    const { container } = render(<Nav />)
    const header = container.querySelector('header')!
    expect(header.className).toContain('fixed')
    expect(header.className).not.toMatch(/bg-|backdrop-blur|border-b/)
  })
})

describe('Footer', () => {
  it('shows the contact email and a copyright line', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /contact@atyantra\.io/ })).toHaveAttribute(
      'href', 'mailto:contact@atyantra.io',
    )
    expect(screen.getByText(/©/)).toBeInTheDocument()
  })
})
