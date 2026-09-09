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

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!valid) return
    window.location.href = buildMailto(to, f)
  }

  const field = 'mt-1 w-full border border-hairline bg-white px-3 py-2 text-sm outline-none focus:border-ink'

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block text-sm">
        Name
        <input className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      </label>
      <label className="block text-sm">
        Email
        <input
          className={field}
          value={f.email}
          onBlur={() => setTouchedEmail(true)}
          onChange={(e) => setF({ ...f, email: e.target.value })}
        />
        {touchedEmail && !emailValid && (
          <span className="mt-1 block text-xs text-red-700">Enter a valid email.</span>
        )}
      </label>
      <label className="block text-sm">
        Organization
        <input className={field} value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} />
      </label>
      <label className="block text-sm">
        Message
        <textarea
          rows={5}
          className={field}
          value={f.message}
          onChange={(e) => setF({ ...f, message: e.target.value })}
        />
      </label>
      <button
        type="submit"
        disabled={!valid}
        className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send message
      </button>
    </form>
  )
}
