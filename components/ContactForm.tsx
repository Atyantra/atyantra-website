'use client'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { buildMailto, type ContactInput } from '@/lib/mailto'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ to }: { to: string }) {
  const [f, setF] = useState<ContactInput>({ name: '', email: '', org: '', message: '' })
  const [touchedEmail, setTouchedEmail] = useState(false)
  const emailValid = EMAIL_RE.test(f.email)
  const valid = Boolean(f.name.trim()) && emailValid && Boolean(f.message.trim())

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!valid) return
    window.location.href = buildMailto(to, f)
  }

  const field =
    'mt-1 w-full border border-hairline bg-white px-3 py-2 text-sm outline-none focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
  const emailShowsError = touchedEmail && !emailValid

  return (
    <form onSubmit={submit} className="space-y-5">
      <label htmlFor="name" className="block text-sm">
        Name
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className={field}
          value={f.name}
          onChange={(e) => setF({ ...f, name: e.target.value })}
        />
      </label>
      <label htmlFor="email" className="block text-sm">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={field}
          value={f.email}
          aria-describedby="email-error"
          aria-invalid={emailShowsError}
          onBlur={() => setTouchedEmail(true)}
          onChange={(e) => setF({ ...f, email: e.target.value })}
        />
        {emailShowsError && (
          <span id="email-error" className="mt-1 block text-xs text-red-700">
            Enter a valid email.
          </span>
        )}
      </label>
      <label htmlFor="org" className="block text-sm">
        Organization
        <input
          id="org"
          name="org"
          autoComplete="organization"
          className={field}
          value={f.org}
          onChange={(e) => setF({ ...f, org: e.target.value })}
        />
      </label>
      <label htmlFor="message" className="block text-sm">
        Message
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field}
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
        />
      </label>
      <button
        type="submit"
        disabled={!valid}
        className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send message
      </button>
    </form>
  )
}
