import type { JSX } from 'react'
import { nodes, edges, pulsePath, VIEWBOX } from './graph-data'

export function SvgGraph(props: { animate: boolean }): JSX.Element {
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  // Build the motion path from pulsePath
  const motionPathD = pulsePath
    .map((id, index) => {
      const node = nodeMap.get(id)
      if (!node) return null
      const command = index === 0 ? 'M' : 'L'
      return `${command} ${node.x},${node.y}`
    })
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className="h-full w-full"
      viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Edges */}
      {edges.map((edge, i) => {
        const fromNode = nodeMap.get(edge.from)
        const toNode = nodeMap.get(edge.to)
        if (!fromNode || !toNode) return null
        return (
          <line
            key={`edge-${i}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="var(--ink)"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
        )
      })}

      {/* Nodes */}
      {nodes.map(node => (
        <circle
          key={`node-${node.id}`}
          cx={node.x}
          cy={node.y}
          r={node.core ? 8 : 5}
          fill="var(--ink)"
          opacity={node.core ? 0.8 : 0.5}
        />
      ))}

      {/* Pulse animation */}
      {props.animate && (
        <g data-pulse>
          <circle r="4" fill="var(--accent)" opacity="0.8">
            <animateMotion dur="6s" repeatCount="indefinite" path={motionPathD} />
          </circle>
        </g>
      )}
    </svg>
  )
}
