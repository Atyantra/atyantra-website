import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { FeatureRow } from '@/components/FeatureRow'

describe('FeatureRow', () => {
  it('renders number, label, and links to href', () => {
    render(<FeatureRow n="01" label="Autonomous" href="#discovery" />)
    const link = screen.getByRole('link', { name: /Autonomous/ })
    expect(link).toHaveAttribute('href', '#discovery')
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('Autonomous')).toBeInTheDocument()
  })
})
