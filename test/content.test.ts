import { describe, it, expect } from 'vitest'
import { navLinks, cta, site } from '@/content/site'
import { hero, problem, gap, platform, problemRows } from '@/content/home'
import { pillars } from '@/content/pillars'
import { whitepaper } from '@/content/whitepaper'
import { contact } from '@/content/contact'

describe('content', () => {
  it('nav has the four routes + Talk to Us CTA', () => {
    expect(navLinks.map(l => l.label)).toEqual(['Platform', 'How It Works', 'Whitepaper', 'About'])
    expect(cta).toEqual({ label: 'Talk to Us', href: '/contact' })
  })
  it('footer email is the real contact address', () => {
    expect(site.email).toBe('contact@atyantra.io')
    expect(contact.email).toBe('contact@atyantra.io')
  })
  it('hero copy is verbatim from the spec', () => {
    expect(hero.h1Lines).toEqual(['Remove the ceiling', 'on network operations.'])
    expect(hero.sub).toContain('AI-native NOC engineering platform')
    expect(hero.sub).toContain('immutable control point')
  })
  it('problem + gap + platform copy present', () => {
    expect(problem.kicker).toBe('THE PROBLEM')
    expect(problem.body).toContain('capped by headcount rather than capability')
    expect(gap.quote).toBe('Ticketing systems record what should happen. They do not diagnose, prepare, or act.')
    expect(platform.body).toContain('Human authorization')
  })
  it('exactly three pillars with stable ids', () => {
    expect(pillars).toHaveLength(3)
    expect(pillars.map(p => p.id)).toEqual(['discovery', 'authorization', 'lifecycle'])
    expect(pillars[1].body).toContain('authorization token')
  })
  it('problem rows link to pillar anchors', () => {
    expect(problemRows.map(r => r.href)).toEqual(['#discovery', '#authorization', '#lifecycle'])
  })
  it('whitepaper + about are marked coming soon / placeholder', () => {
    expect(whitepaper.state.toLowerCase()).toContain('coming soon')
  })
})
