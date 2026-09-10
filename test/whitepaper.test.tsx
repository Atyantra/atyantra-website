import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Whitepaper from '@/app/whitepaper/page'

describe('Whitepaper', () => {
  it('shows the kicker, a title, and a coming-soon state', () => {
    render(<Whitepaper />)
    expect(screen.getByText('TECHNICAL WHITEPAPER')).toBeInTheDocument()
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /notified/i })).toHaveAttribute(
      'href', expect.stringContaining('mailto:contact@atyantra.io'),
    )
  })
})
