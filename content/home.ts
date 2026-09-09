export const hero: {
  h1Lines: string[]
  sub: string
  cta: { label: string; href: string }
} = {
  h1Lines: ['Remove the ceiling', 'on network operations.'],
  sub:
    'AutoNaaS is an AI-native NOC engineering platform — an autonomous operations layer that discovers, diagnoses, and prepares network changes end-to-end across the full ITIL lifecycle, while human authorization stays the immutable control point for execution.',
  cta: { label: 'Talk to Us', href: '/contact' },
}

export const problem: {
  kicker: string
  headingLines: string[]
  body: string
} = {
  kicker: 'THE PROBLEM',
  headingLines: ['Operations that scale with', 'capability, not headcount'],
  body:
    'Enterprise network operations remain fundamentally manual — human-executed CLI workflows, tribal runbook knowledge, and fragmented ITSM tooling. As estates scale into the tens or hundreds of thousands of endpoints, MTTR degrades, operational risk compounds, and organizations are capped by headcount rather than capability.',
}

export interface ProblemRow {
  n: string
  label: string
  href: string
}

export const problemRows: ProblemRow[] = [
  { n: '01', label: 'Autonomous', href: '#discovery' },
  { n: '02', label: 'Authorized', href: '#authorization' },
  { n: '03', label: 'End-to-end', href: '#lifecycle' },
]

export const gap: {
  quote: string
  body: string
} = {
  quote:
    'Ticketing systems record what should happen. They do not diagnose, prepare, or act.',
  body:
    "Today's incumbent approach pairs manual device-level operations with disconnected ITSM platforms that log intent but never execute it. The result is an operational gap — full accountability for outcomes, without automation of the underlying work — that legacy tooling has never closed.",
}

export const platform: {
  kicker: string
  headingLines: string[]
  body: string
} = {
  kicker: 'THE PLATFORM',
  headingLines: ['An autonomous operations layer,', 'not another point tool'],
  body:
    'AutoNaaS discovers, diagnoses, and prepares network changes end-to-end across the full ITIL lifecycle. Human authorization stays the immutable control point: every action is prepared and reviewed, then released by an operator under an explicit authorization token.',
}

export const whitepaperTeaser: {
  kicker: string
  title: string
  state: string
  href: string
} = {
  kicker: 'TECHNICAL WHITEPAPER',
  title: 'The AutoNaaS Architecture',
  state: 'Coming soon',
  href: '/whitepaper',
}

export const homeCta: {
  line: string
  cta: { label: string; href: string }
} = {
  line: 'Talk to us about your estate.',
  cta: { label: 'Talk to Us', href: '/contact' },
}
