import { useState, type FormEvent } from "react";
import { BTN_PRIMARY, CONTAINER, FOCUS, H2, LABEL, SUB } from "../layout";

type Props = {
  label: string;
  title: string;
  intro: string;
  to: string;
  subject: string;
};

const FIELD = `w-full rounded-md border border-ink/25 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 ${FOCUS}`;

export default function ContactPage({ label, title, intro, to, subject }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("name")}`,
      `Work email: ${f.get("email")}`,
      `Company: ${f.get("company")}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="border-b border-ink/15">
        <div className={`${CONTAINER} flex items-center justify-between py-4`}>
          <a
            href="/"
            className={`text-lg font-semibold uppercase tracking-[0.23em] sm:text-xl ${FOCUS}`}
          >
            Atyantra
          </a>
          <a
            href="/"
            className={`text-sm text-ink/70 transition-colors hover:text-ink ${FOCUS}`}
          >
            ← Back to home
          </a>
        </div>
      </header>

      <main className={`${CONTAINER} py-16 md:py-24`}>
        <p className={`${LABEL} text-ink/60`}>{label}</p>
        <h1 className={`mt-4 max-w-3xl ${H2}`}>{title}</h1>
        <p className={`mt-6 max-w-[62ch] text-ink/80 ${SUB}`}>{intro}</p>

        <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-4">
          <label className="grid gap-1.5 text-sm text-ink/80">
            Name
            <input name="name" required autoComplete="name" className={FIELD} />
          </label>
          <label className="grid gap-1.5 text-sm text-ink/80">
            Work email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={FIELD}
            />
          </label>
          <label className="grid gap-1.5 text-sm text-ink/80">
            Company
            <input
              name="company"
              required
              autoComplete="organization"
              className={FIELD}
            />
          </label>
          <label className="grid gap-1.5 text-sm text-ink/80">
            Message
            <textarea name="message" required rows={5} className={FIELD} />
          </label>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className={BTN_PRIMARY}>
              Send message
            </button>
            <a
              href={`mailto:${to}`}
              className={`text-sm text-ink/70 hover:text-ink ${FOCUS}`}
            >
              or email {to}
            </a>
          </div>
          {sent && (
            <p role="status" className="text-sm text-ink/70">
              Your email app should open with the message ready to send. If it
              didn’t, write to {to}.
            </p>
          )}
        </form>
      </main>

      <footer className="border-t border-ink/15">
        <div className={`${CONTAINER} py-8 text-sm text-ink/70`}>
          © 2026 Atyantra Technologies LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
