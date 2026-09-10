'use client'
import type { JSX } from 'react'
import { SvgGraph } from './topology/SvgGraph'
import { BoomerangVideo } from './topology/BoomerangVideo'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function TopologyHero(): JSX.Element {
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL
  const reduced = useReducedMotion()

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {typeof videoUrl === 'string' && videoUrl.length > 0 ? (
        <BoomerangVideo src={videoUrl} reduced={reduced} />
      ) : (
        <SvgGraph animate={!reduced} />
      )}
    </div>
  )
}
