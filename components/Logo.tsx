// TODO: placeholder mark — owner to supply final Atyantra identity.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true">
      <path d="M128 16 L240 128 L128 240 L16 128 Z" opacity="0.15" />
      <path d="M128 56 L200 128 L128 200 L56 128 Z" opacity="0.4" />
      <path d="M128 96 L160 128 L128 160 L96 128 Z" />
    </svg>
  )
}
