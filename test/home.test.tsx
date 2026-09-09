import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('renders the hero headline and sub', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Remove the ceiling')
    expect(screen.getAllByText(/immutable control point/).length).toBeGreaterThan(0)
  })

  it('renders the gap pull-quote', () => {
    render(<Home />)
    expect(screen.getByText(/They do not diagnose, prepare, or act\./)).toBeInTheDocument()
  })

  it('has the three pillar anchors', () => {
    const { container } = render(<Home />)
    for (const id of ['discovery', 'authorization', 'lifecycle']) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument()
    }
  })

  it('has section anchors for nav', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#platform')).toBeInTheDocument()
    expect(container.querySelector('#how-it-works')).toBeInTheDocument()
  })
})
