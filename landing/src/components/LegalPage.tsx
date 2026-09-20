import { CONTAINER, FOCUS, H2, LABEL, SUB } from "../layout";

export type LegalSection = {
  h: string;
  p?: string[];
  ul?: string[];
};

type Props = {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const PAGES = [
  { href: "/trust", label: "Trust Center" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
}: Props) {
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
        <p className={`mt-3 ${LABEL} text-ink/50`}>Last updated {updated}</p>
        <p className={`mt-8 max-w-[68ch] text-ink/80 ${SUB}`}>{intro}</p>

        <div className="mt-12 max-w-[68ch] border-t border-ink/15">
          {sections.map((s, i) => (
            <section key={s.h} className="border-b border-ink/15 py-8">
              <h2 className="text-[clamp(17px,1.6vw,20px)] font-medium">
                <span className="mr-3 font-mono text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.h}
              </h2>
              {s.p?.map((t) => (
                <p
                  key={t}
                  className="mt-3 text-[clamp(14px,1.2vw,16px)] leading-relaxed text-ink/75"
                >
                  {t}
                </p>
              ))}
              {s.ul && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[clamp(14px,1.2vw,16px)] leading-relaxed text-ink/75">
                  {s.ul.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-ink/15">
        <div
          className={`${CONTAINER} flex flex-col gap-4 py-8 text-sm text-ink/70 sm:flex-row sm:items-center sm:justify-between`}
        >
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {PAGES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className={`transition-colors hover:text-ink ${FOCUS}`}
              >
                {p.label}
              </a>
            ))}
          </nav>
          <p>© 2026 Atyantra Technologies LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
