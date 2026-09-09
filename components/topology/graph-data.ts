export interface GraphNode {
  id: string
  x: number
  y: number
  core: boolean
}

export interface GraphEdge {
  from: string
  to: string
}

export const VIEWBOX = { w: 1200, h: 800 } as const

export const nodes: GraphNode[] = [
  { id: 'c1', x: 380, y: 300, core: true },
  { id: 'c2', x: 620, y: 260, core: true },
  { id: 'c3', x: 840, y: 360, core: true },
  { id: 'a1', x: 180, y: 180, core: false },
  { id: 'a2', x: 210, y: 440, core: false },
  { id: 'a3', x: 120, y: 320, core: false },
  { id: 'b1', x: 500, y: 120, core: false },
  { id: 'b2', x: 700, y: 110, core: false },
  { id: 'd1', x: 980, y: 220, core: false },
  { id: 'd2', x: 1040, y: 460, core: false },
  { id: 'e1', x: 560, y: 520, core: false },
  { id: 'e2', x: 760, y: 560, core: false },
  { id: 'e3', x: 420, y: 600, core: false },
  { id: 'e4', x: 900, y: 620, core: false },
]

export const edges: GraphEdge[] = [
  { from: 'c1', to: 'c2' }, { from: 'c2', to: 'c3' }, { from: 'c1', to: 'c3' },
  { from: 'a1', to: 'c1' }, { from: 'a2', to: 'c1' }, { from: 'a3', to: 'a1' }, { from: 'a3', to: 'a2' },
  { from: 'b1', to: 'c2' }, { from: 'b2', to: 'c2' }, { from: 'b1', to: 'b2' },
  { from: 'd1', to: 'c3' }, { from: 'd2', to: 'c3' }, { from: 'd1', to: 'd2' },
  { from: 'e1', to: 'c1' }, { from: 'e1', to: 'e3' }, { from: 'e2', to: 'c3' },
  { from: 'e2', to: 'e1' }, { from: 'e4', to: 'e2' }, { from: 'e3', to: 'a2' }, { from: 'e4', to: 'd2' },
]

export const pulsePath: string[] = [
  'a3', 'a1', 'c1', 'c2', 'c3', 'd1', 'd2', 'e4', 'e2', 'e1', 'e3', 'a2', 'c1',
]
