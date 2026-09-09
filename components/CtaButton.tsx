import Link from 'next/link'

const sizes = {
  nav: 'px-5 py-2.5 text-sm',
  hero: 'px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base',
} as const

export function CtaButton({
  href, children, size = 'nav', className = '',
}: { href: string; children: React.ReactNode; size?: keyof typeof sizes; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg bg-ink font-medium text-white transition-colors duration-200 hover:bg-ink/90 ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  )
}
