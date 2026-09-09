import type { Metadata } from 'next'
import { MetaLabel } from '@/components/MetaLabel'
import { ContactForm } from '@/components/ContactForm'
import { contact } from '@/content/contact'

export const metadata: Metadata = { title: 'Talk to Us — Atyantra' }

export default function Contact() {
  return (
    <section className="px-6 pb-24 pt-40 sm:px-10 md:px-14">
      <div className="grid gap-16 md:grid-cols-2">
        <div>
          <MetaLabel>{contact.kicker}</MetaLabel>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-[1.1] tracking-tighter md:text-5xl">
            Talk to us about your estate.
          </h1>
          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-block text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            {contact.email}
          </a>
          <p className="mt-2 text-sm text-ink-muted">{contact.address}</p>
          <p className="mt-2 text-sm text-ink-muted">{contact.responseTime}</p>
        </div>
        <ContactForm to={contact.email} />
      </div>
    </section>
  )
}
