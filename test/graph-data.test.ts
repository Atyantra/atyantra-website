import { describe, it, expect } from 'vitest'
import { nodes, edges, pulsePath, VIEWBOX } from '@/components/topology/graph-data'

describe('graph-data', () => {
  it('has a stable node set inside the viewbox', () => {
    expect(nodes.length).toBeGreaterThanOrEqual(12)
    for (const n of nodes) {
      expect(n.x).toBeGreaterThanOrEqual(0)
      expect(n.x).toBeLessThanOrEqual(VIEWBOX.w)
      expect(n.y).toBeGreaterThanOrEqual(0)
      expect(n.y).toBeLessThanOrEqual(VIEWBOX.h)
    }
  })
  it('every edge references real nodes', () => {
    const ids = new Set(nodes.map((n) => n.id))
    for (const e of edges) {
      expect(ids.has(e.from)).toBe(true)
      expect(ids.has(e.to)).toBe(true)
    }
  })
  it('pulse path is a connected walk along edges', () => {
    const adj = new Set(edges.flatMap((e) => [`${e.from}|${e.to}`, `${e.to}|${e.from}`]))
    for (let i = 0; i < pulsePath.length - 1; i++) {
      expect(adj.has(`${pulsePath[i]}|${pulsePath[i + 1]}`)).toBe(true)
    }
  })
})
