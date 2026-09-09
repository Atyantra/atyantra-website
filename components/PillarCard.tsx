export function PillarCard({
  n, id, name, body, last = false,
}: { n: string; id: string; name: string; body: string; last?: boolean }) {
  return (
    <div
      id={id}
      className={`scroll-mt-24 grid gap-4 py-10 md:grid-cols-[6rem_1fr] md:gap-10 md:py-14 ${
        last ? '' : 'border-b border-hairline'
      }`}
    >
      <div className="font-serif text-4xl text-ink-faint md:text-5xl">{n}</div>
      <div>
        <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">{name}</h3>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{body}</p>
      </div>
    </div>
  )
}
