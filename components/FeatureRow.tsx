import type { JSX } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FeatureRow({ n, label, href }: { n: string; label: string; href: string }): JSX.Element {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between bg-[#F4F3F3] px-4 py-3.5 transition-all duration-200 hover:bg-[#EAEAEA] sm:px-6 sm:py-4"
    >
      <span className="text-sm">
        <span className="text-ink-faint">{n}</span>
        <span className="mx-2 text-ink/30">/</span>
        <span className="font-medium">{label}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-700" />
    </Link>
  )
}
