import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from '@/lib/useReducedMotion'

describe('useReducedMotion', () => {
  it('defaults to false when matchMedia is unavailable', () => {
    const orig = window.matchMedia
    // @ts-expect-error force-undefined for the test
    delete window.matchMedia
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    window.matchMedia = orig
  })
  it('reads the reduce preference when matchMedia reports it', () => {
    window.matchMedia = ((q: string) => ({
      matches: q.includes('reduce'),
      media: q, addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })
})
