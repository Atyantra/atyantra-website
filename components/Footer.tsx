import Link from 'next/link'
import { site } from '@/content/site'
import { MetaLabel } from './MetaLabel'

export function Footer() {
  return (
    <footer className="border-t border-hairline px-6 py-16 sm:px-10 md:px-14">
      <div className="grid gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <MetaLabel>{site.legalName}</MetaLabel>
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.address}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            {site.email}
          </a>
        </div>
        <ul className="flex gap-6 md:flex-col md:gap-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-12 text-xs text-ink-faint">{site.copyright}</p>
    </footer>
  )
}
