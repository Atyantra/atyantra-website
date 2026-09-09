export interface Pillar {
  n: string
  id: string
  name: string
  body: string
}

export const pillars: Pillar[] = [
  {
    n: '01',
    id: 'discovery',
    name: 'Autonomous Discovery & Topology Intelligence',
    body:
      'Continuous, protocol-native discovery (SNMP, CDP/LLDP) builds and maintains a living topology and device-health model at enterprise scale — eliminating manual CMDB maintenance as an operational dependency.',
  },
  {
    n: '02',
    id: 'authorization',
    name: 'AI-Prepared, Human-Authorized Execution',
    body:
      'The platform performs end-to-end diagnosis, risk assessment, and change preparation; execution authority remains exclusively with the human operator. AI never acts autonomously — every action is prepared, reviewed, and released under an explicit authorization token.',
  },
  {
    n: '03',
    id: 'lifecycle',
    name: 'Full ITIL Lifecycle Orchestration',
    body:
      'AutoNaaS spans pre-work (ticketing, risk scoring, CAB alignment), in-process execution, and post-work closure (documentation, CMDB reconciliation, root-cause analysis) as a single automated continuum — not a point tool bolted onto existing process.',
  },
]
