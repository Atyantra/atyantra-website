import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SvgGraph } from '@/components/topology/SvgGraph'
import { edges, nodes } from '@/components/topology/graph-data'

describe('SvgGraph', () => {
  it('renders edges and nodes when animate is false', () => {
    const { container } = render(<SvgGraph animate={false} />)

    const lines = container.querySelectorAll('line')
    const circles = container.querySelectorAll('circle')

    expect(lines.length).toBe(edges.length)
    expect(circles.length).toBeGreaterThanOrEqual(nodes.length)
  })

  it('does not render pulse element when animate is false', () => {
    const { container } = render(<SvgGraph animate={false} />)

    const pulseElement = container.querySelector('[data-pulse]')
    expect(pulseElement).toBeNull()
  })

  it('renders pulse element when animate is true', () => {
    const { container } = render(<SvgGraph animate={true} />)

    const pulseElement = container.querySelector('[data-pulse]')
    expect(pulseElement).not.toBeNull()
  })
})
