import Reveal from "./Reveal";
import Marquee from "./Marquee";
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  CHIP,
  CONTAINER,
  H1,
  SUB,
} from "../layout";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero-over min-h-screen supports-[height:100svh]:min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28"
    >
      <div className={`${CONTAINER} mt-auto pb-12 md:pb-16`}>
        <Reveal delay={150} className="mb-5 inline-block">
          <span className={CHIP}>Autonomous Network as a Service</span>
        </Reveal>
        <Reveal delay={280}>
          <h1 className={`max-w-4xl text-ink ${H1}`}>
            Network Operations
            <br />
            Reimagined with AI
          </h1>
        </Reveal>
        <Reveal delay={380} className="mt-6 max-w-[62ch]">
          <p className={`text-ink/85 ${SUB}`}>
            AI agents continuously observe, investigate and operate your
            network — backed by deterministic automation, engineering
            guardrails and human control.
          </p>
        </Reveal>
        <Reveal delay={480} className="mt-8 flex flex-wrap gap-3">
          <a href="#platform" className={BTN_PRIMARY}>
            How it works
          </a>
          <a href="#company" className={BTN_SECONDARY}>
            Read Whitepaper
          </a>
        </Reveal>
      </div>

      <Marquee />
    </section>
  );
}
