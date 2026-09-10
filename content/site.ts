// TODO: placeholder content — owner (director@atyantra.io) to supply final copy.

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'About', href: '/about' },
]

export const cta = {
  label: 'Talk to Us',
  href: '/contact',
}

export const site = {
  legalName: 'Atyantra, Inc.',
  address: '[Address — TODO]',
  email: 'contact@atyantra.io',
  socials: [
    { label: 'LinkedIn', href: '#' },
    { label: 'X', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
  copyright: '© 2025 Atyantra, Inc. All rights reserved.',
}
