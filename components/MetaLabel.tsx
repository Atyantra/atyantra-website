export function MetaLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[11px] uppercase tracking-[0.2em] text-ink-faint font-medium ${className}`}>
      {children}
    </span>
  )
}
