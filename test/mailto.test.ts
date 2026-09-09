import { describe, it, expect } from 'vitest'
import { buildMailto } from '@/lib/mailto'

describe('buildMailto', () => {
  it('builds an encoded mailto with subject and body', () => {
    const url = buildMailto('contact@atyantra.io', {
      name: 'Dana Ops', email: 'dana@acme.com', org: 'Acme NOC', message: 'We run 40k devices.',
    })
    expect(url.startsWith('mailto:contact@atyantra.io?')).toBe(true)
    expect(url).toContain('subject=')
    expect(url).toContain(encodeURIComponent('Dana Ops'))
    expect(url).toContain(encodeURIComponent('dana@acme.com'))
    expect(url).toContain(encodeURIComponent('Acme NOC'))
    expect(url).toContain(encodeURIComponent('We run 40k devices.'))
  })
})
