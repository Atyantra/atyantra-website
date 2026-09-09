import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { about } from '@/content/about'

export const metadata: Metadata = { title: 'About — Atyantra' }

export default function About() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <MetaLabel>{about.kicker}</MetaLabel>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-6xl">
        {about.mission}
      </h1>
      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Our mission</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.mission}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Story</h2>
          {about.story.map((p, i) => (
            <p key={i} className="mt-4 text-[15px] leading-relaxed text-ink-muted">{p}</p>
          ))}
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">Team & location</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.team}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{about.location}</p>
        </div>
        <div>
          <h2 className="font-serif text-2xl tracking-tight">{about.founder.role}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{about.founder.bio}</p>
        </div>
      </div>
    </section>
  )
}
