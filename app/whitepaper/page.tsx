import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { whitepaper } from '@/content/whitepaper'

export const metadata: Metadata = {
  title: 'Technical Whitepaper — Atyantra',
  description: 'The AutoNaaS architecture paper — an in-depth look at the autonomous network operations platform. Coming soon.',
}

export default function Whitepaper() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <MetaLabel>{whitepaper.kicker}</MetaLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-6xl">
        {whitepaper.title}
      </h1>
      <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{whitepaper.abstract}</p>
      <p className="mt-12 font-serif text-2xl text-ink-faint">{whitepaper.state}</p>
      <a
        href={`mailto:${whitepaper.notifyEmail}?subject=${encodeURIComponent('Notify me: AutoNaaS whitepaper')}`}
        className="mt-4 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
      >
        Ask to be notified →
      </a>
    </section>
  )
}
