import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CONTAINER, LABEL, SECTION_PAD } from "../layout";

const MODES = [
  {
    tag: "Mode 01",
    title: "Observe",
    body: "Investigate only — the agent watches and reports. No actions are taken.",
    level: 1,
  },
  {
    tag: "Mode 02",
    title: "Assist",
    body: "Recommend, human approves. The AI proposes a validated fix; an engineer authorizes it.",
    level: 2,
  },
  {
    tag: "Mode 03",
    title: "Autonomous",
    body: "Pre-approved actions execute automatically, inside guardrails your team sets.",
    level: 3,
  },
];

const DEPLOYMENTS = [
  {
    tag: "A / Hosted",
    title: "Hosted / Cloud",
    body: "Multi-tenant cloud environment for fast deployment and ongoing platform updates.",
  },
  {
    tag: "B / On-Prem",
    title: "On-Premises",
    body: "Private data center deployment via containerized infrastructure inside your boundary.",
  },
  {
    tag: "C / Air-Gapped",
    title: "Air-Gapped",
    body: "Fully isolated deployment with no external outbound dependencies.",
  },
];

const STACK = `${CONTAINER} flex flex-col gap-12`;
const CARD =
  "h-full rounded-2xl border border-ink/15 bg-white/50 backdrop-blur-md p-6";
const TAG = `${LABEL} text-ink/60`;

export default function Control() {
  return (
    <>
      <section className={SECTION_PAD}>
        <div className={STACK}>
          <SectionHead
            label="04 — Human Control"
            title="Three operating modes."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {MODES.map((m, i) => (
              <Reveal key={m.tag} delay={100 + i * 100}>
                <div className={CARD}>
                  <span className={TAG}>{m.tag}</span>
                  <h3 className="mt-3 text-[clamp(20px,2vw,24px)] font-medium text-ink">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[clamp(14px,1.2vw,15px)] leading-relaxed text-ink/70">
                    {m.body}
                  </p>
                  <div
                    className="mt-5 flex gap-1"
                    role="img"
                    aria-label={`Autonomy level ${m.level} of 3`}
                  >
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`h-1 w-6 ${
                          n <= m.level ? "bg-ink" : "bg-ink/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="deployment" className={SECTION_PAD}>
        <div className={STACK}>
          <SectionHead label="05 — Deployment" title="Deploy on your terms." />
          <div className="grid gap-4 md:grid-cols-3">
            {DEPLOYMENTS.map((d, i) => (
              <Reveal key={d.tag} delay={100 + i * 100}>
                <div className={CARD}>
                  <span className={TAG}>{d.tag}</span>
                  <h3 className="mt-3 text-[clamp(18px,1.8vw,20px)] font-medium text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[clamp(14px,1.2vw,15px)] leading-relaxed text-ink/70">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
