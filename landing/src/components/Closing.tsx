import Reveal from "./Reveal";
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  CONTAINER,
  FOCUS,
  H2,
  LABEL,
  SECTION_PAD,
} from "../layout";

const LINK = `text-[clamp(13px,1.1vw,14px)] text-ink/70 transition-colors duration-300 hover:text-ink ${FOCUS}`;
const HEAD = `mb-4 ${LABEL} text-ink`;

export default function Closing() {
  return (
    <>
      <section className={SECTION_PAD}>
        <div className={CONTAINER}>
          <Reveal delay={100}>
            <h2 className={`max-w-3xl text-ink ${H2}`}>
              Let’s redefine your Network operations around AI.
            </h2>
          </Reveal>
          <Reveal delay={300} className="mt-8 flex flex-wrap gap-3">
            <a href="#company" className={BTN_PRIMARY}>
              Read Whitepaper
            </a>
            <a href="#platform" className={BTN_SECONDARY}>
              How it works
            </a>
          </Reveal>
        </div>
      </section>

      <footer
        id="company"
        className="border-t border-ink/15 bg-white/60 pt-16 pb-8"
      >
        <div className={CONTAINER}>
          <div className="grid gap-12 md:grid-cols-[3fr_1fr]">
            <div>
              <span className="text-lg font-semibold tracking-[0.23em] uppercase text-ink">
                Atyantra
              </span>
              <p className="mt-3 text-sm text-ink/70">India &amp; USA</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className={HEAD}>Contact</h4>
              <a href="/contact/sales" className={LINK}>
                Sales
              </a>
              <a href="/contact/security" className={LINK}>
                Security
              </a>
            </div>
          </div>
          <p className="mt-12 border-t border-ink/15 pt-6 font-mono text-[11px] tracking-wide text-ink/60">
            © 2026 Atyantra Technologies LLC. All rights reserved. “TruVigil”
            is a trademark of Atyantra Technologies.
          </p>
        </div>
      </footer>
    </>
  );
}
