import Link from 'next/link'
import { Logo } from './Logo'
import { CtaButton } from './CtaButton'
import { navLinks, cta } from '@/content/site'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 py-4 sm:px-10 sm:py-5 md:px-14">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <Logo className="h-6 w-6" />
          <span className="text-base font-semibold tracking-tight">Atyantra</span>
        </Link>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-sm text-sm text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <CtaButton href={cta.href}>{cta.label}</CtaButton>
      </nav>
    </header>
  )
}
