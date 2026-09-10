import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import Whitepaper from '@/app/whitepaper/page'
import About from '@/app/about/page'
import Contact from '@/app/contact/page'
import * as homeMod from '@/app/page'
import * as whitepaperMod from '@/app/whitepaper/page'
import * as aboutMod from '@/app/about/page'
import * as contactMod from '@/app/contact/page'

describe('routes', () => {
  it('Home renders the h1 and exposes metadata', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Remove the ceiling')
    expect(homeMod.metadata.title).toBeTruthy()
  })

  it('Whitepaper renders kicker + coming soon and exposes metadata', () => {
    render(<Whitepaper />)
    expect(screen.getByText('TECHNICAL WHITEPAPER')).toBeInTheDocument()
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
    expect(whitepaperMod.metadata.title).toBeTruthy()
  })

  it('About renders kicker + mission heading and exposes metadata', () => {
    render(<About />)
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Our mission' })).toBeInTheDocument()
    expect(aboutMod.metadata.title).toBeTruthy()
  })

  it('Contact renders kicker + send button and exposes metadata', () => {
    render(<Contact />)
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
    expect(contactMod.metadata.title).toBeTruthy()
  })
})
