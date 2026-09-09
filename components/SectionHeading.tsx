import { MetaLabel } from './MetaLabel'

export function SectionHeading({
  kicker, lines, className = '', id,
}: { kicker: string; lines: string[]; className?: string; id?: string }) {
  return (
    <div className={className} id={id}>
      <MetaLabel>{kicker}</MetaLabel>
      <h2 className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight sm:text-3xl md:text-4xl">
        {lines.map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </h2>
    </div>
  )
}
