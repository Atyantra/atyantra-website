import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TopologyHero } from '@/components/TopologyHero'

describe('TopologyHero', () => {
  it('renders the coded SVG graph when no video URL is set', () => {
    delete process.env.NEXT_PUBLIC_HERO_VIDEO_URL
    const { container } = render(<TopologyHero />)
    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('video')).toBeNull()
  })

  it('renders the video pathway when a URL is set', () => {
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL = 'https://example.com/x.mp4'
    const { container } = render(<TopologyHero />)
    expect(container.querySelector('video')).not.toBeNull()
    delete process.env.NEXT_PUBLIC_HERO_VIDEO_URL
  })
})
