import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import About from '@/app/about/page'

describe('About', () => {
  it('renders mission, story, and founder sections', () => {
    render(<About />)
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /mission/i })).toBeInTheDocument()
  })
})
