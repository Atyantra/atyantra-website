import { render, screen } from '@testing-library/react'
import { Logo } from '@/components/Logo'
import { MetaLabel } from '@/components/MetaLabel'
import { CtaButton } from '@/components/CtaButton'
import { SectionHeading } from '@/components/SectionHeading'
import { PillarCard } from '@/components/PillarCard'

describe('primitives', () => {
  it('Logo renders a 256 viewBox svg using currentColor', () => {
    const { container } = render(<Logo className="w-6 h-6" />)
    const svg = container.querySelector('svg')!
    expect(svg).toHaveAttribute('viewBox', '0 0 256 256')
    expect(svg).toHaveAttribute('fill', 'currentColor')
    expect(svg).toHaveClass('w-6', 'h-6')
  })
  it('MetaLabel renders its text', () => {
    render(<MetaLabel>THE PROBLEM</MetaLabel>)
    expect(screen.getByText('THE PROBLEM')).toBeInTheDocument()
  })
  it('CtaButton is a link to the given href', () => {
    render(<CtaButton href="/contact">Talk to Us</CtaButton>)
    const link = screen.getByRole('link', { name: 'Talk to Us' })
    expect(link).toHaveAttribute('href', '/contact')
  })
  it('SectionHeading renders kicker + each line', () => {
    render(<SectionHeading kicker="THE PLATFORM" lines={['One', 'Two']} id="platform" />)
    expect(screen.getByText('THE PLATFORM')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
  })
  it('PillarCard exposes its anchor id and content', () => {
    const { container } = render(
      <PillarCard n="01" id="discovery" name="Discovery" body="continuous discovery" />,
    )
    expect(container.querySelector('#discovery')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Discovery' })).toBeInTheDocument()
  })
})
