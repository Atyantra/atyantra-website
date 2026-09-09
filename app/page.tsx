import type { JSX } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TopologyHero } from '@/components/TopologyHero'
import { SectionHeading } from '@/components/SectionHeading'
import { PillarCard } from '@/components/PillarCard'
import { MetaLabel } from '@/components/MetaLabel'
import { CtaButton } from '@/components/CtaButton'
import { FeatureRow } from '@/components/FeatureRow'
import { hero, problem, problemRows, gap, platform, whitepaperTeaser, homeCta } from '@/content/home'
import { pillars } from '@/content/pillars'

export default function Home(): JSX.Element {
  return (
    <>
      <section className="relative flex h-screen flex-col items-center overflow-hidden">
        <TopologyHero />
        <div className="z-10 flex flex-col items-center px-4 pt-24 text-center sm:px-6 sm:pt-28 md:pt-32">
          <h1 className="font-serif text-4xl font-normal leading-[1.1] tracking-tighter text-ink sm:text-5xl md:text-7xl lg:text-8xl">
            {hero.h1Lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-6 md:mt-8 md:text-base">
            {hero.sub}
          </p>
          <CtaButton href={hero.cta.href} size="hero" className="mt-6 sm:mt-8 md:mt-10">
            {hero.cta.label}
          </CtaButton>
        </div>

        <div className="z-10 mt-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="border border-b-0 border-hairline bg-panel px-5 pb-0 pt-8 shadow-sm backdrop-blur-sm sm:px-8 sm:pt-12 md:px-12 md:pt-16">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-16">
              <div>
                <MetaLabel>{problem.kicker}</MetaLabel>
                <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight sm:text-3xl md:text-4xl">
                  {problem.headingLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
              <p className="flex items-end text-sm leading-relaxed text-ink-muted md:text-[15px]">
                {problem.body}
              </p>
            </div>
            <div className="mt-6 h-px w-full bg-hairline sm:mt-8 md:mt-10" />
            <div className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-3">
              {problemRows.map((r) => (
                <FeatureRow key={r.n} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 md:px-14 md:py-36">
        <blockquote className="max-w-4xl font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {gap.quote}
        </blockquote>
        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{gap.body}</p>
      </section>

      <section
        id="platform"
        className="scroll-mt-24 border-t border-hairline px-6 py-24 sm:px-10 md:px-14 md:py-36"
      >
        <div className="grid gap-6 md:grid-cols-2 md:gap-16">
          <SectionHeading kicker={platform.kicker} lines={platform.headingLines} />
          <p className="flex items-start text-[15px] leading-relaxed text-ink-muted">{platform.body}</p>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-hairline px-6 py-24 sm:px-10 md:px-14 md:py-36"
      >
        <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-faint">
          How it works
        </h2>
        <div className="mt-8">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.id}
              n={p.n}
              id={p.id}
              name={p.name}
              body={p.body}
              last={i === pillars.length - 1}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline px-6 py-16 sm:px-10 md:px-14">
        <Link href={whitepaperTeaser.href} className="group flex items-center justify-between">
          <span>
            <MetaLabel>{whitepaperTeaser.kicker}</MetaLabel>
            <span className="mt-2 block font-serif text-xl tracking-tight md:text-2xl">
              {whitepaperTeaser.title} — {whitepaperTeaser.state}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
        </Link>
      </section>

      <section className="border-t border-hairline px-6 py-24 text-center sm:px-10 md:px-14 md:py-32">
        <p className="font-serif text-3xl tracking-tight md:text-4xl">{homeCta.line}</p>
        <CtaButton href={homeCta.cta.href} size="hero" className="mt-8">
          {homeCta.cta.label}
        </CtaButton>
      </section>
    </>
  )
}
