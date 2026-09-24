import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { CONTAINER, LABEL, SECTION_PAD } from "../layout";

const DISCIPLINES = [
  {
    n: "01",
    title: "Continuous Observation",
    body: "AI agents watch every circuit, route and device around the clock, correlating signals before they become outages.",
  },
  {
    n: "02",
    title: "AI Reasoning",
    body: "When something looks wrong, the AI traces root cause across routing, application and device layers automatically.",
  },
  {
    n: "03",
    title: "Governed Remediation",
    body: "Fixes are validated against real network context and executed deterministically — never guessed.",
  },
  {
    n: "04",
    title: "Human Oversight",
    body: "Every autonomous action operates inside guardrails your team defines and can review at any time.",
  },
];

const LEGACY_FLOW = [
  "Telemetry",
  "Alert",
  "Ticket",
  "Engineer",
  "Reasoning",
  "CLI",
];
const NEW_FLOW = [
  "Telemetry",
  "AI Reasoning",
  "Root Cause",
  "Validation",
  "Action",
];
const GOVERNED_FLOW = [
  "Intent",
  "AI Reasoning",
  "Network Context",
  "Validation",
  "Approval",
  "Deterministic Execution",
  "Verification",
];

const STACK = `${CONTAINER} flex flex-col gap-12`;
const FLOW = `${LABEL} tracking-[0.15em]`;

export default function Operations() {
  return (
    <>
      <section id="platform" className={SECTION_PAD}>
        <div className={STACK}>
          <SectionHead
            label="01 — How Operations Change"
            title={
              <>
                We didn’t automate the legacy workflow.
                <br />
                We transformed it.
              </>
            }
          />
          <Reveal delay={150}>
            <p className={`${FLOW} mb-4 text-ink`}>Let’s compare</p>
            <div className="grid max-w-4xl gap-10 sm:grid-cols-2 sm:gap-8">
              {[
                { title: "Legacy Workflow", steps: LEGACY_FLOW, legacy: true },
                { title: <>Atyantra TruVigil<sup className="text-[0.65em]">TM</sup> Workflow</>, steps: NEW_FLOW, legacy: false },
              ].map((col) => (
                <div
                  key={col.legacy ? "legacy" : "new"}
                  className={col.legacy ? "" : "rounded-2xl bg-ink p-6 text-inkfg"}
                >
                  <p className={`${FLOW} border-b pb-3 ${col.legacy ? "border-ink/30 text-ink/60" : "border-inkfg/30 text-inkfg"}`}>
                    {col.title}
                  </p>
                  <ol className="mt-6 flex flex-col items-stretch">
                    {col.steps.map((step, i) => (
                      <li key={step} className="flex flex-col items-center">
                        <span
                          className={`w-full px-5 py-4 text-center text-[clamp(14px,1.2vw,16px)] ${
                            col.legacy
                              ? "border border-ink/15 text-ink/60"
                              : "border border-inkfg/40 bg-inkfg/10 font-medium text-inkfg"
                          }`}
                        >
                          {step}
                        </span>
                        {i < col.steps.length - 1 && (
                          <span
                            aria-hidden="true"
                            className={`py-2 text-lg leading-none ${col.legacy ? "text-ink/30" : "text-inkfg"}`}
                          >
                            ↓
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ai-operations" className={SECTION_PAD}>
        <div className={STACK}>
          <SectionHead
            label="02 — What TruVigil Does"
            title="One AI layer, four disciplines."
          />
          <ol className="max-w-4xl border-t border-ink/15">
            {DISCIPLINES.map((d, i) => (
              <Reveal
                as="li"
                key={d.n}
                delay={100 + i * 80}
                className="flex items-baseline gap-6 border-b border-ink/15 py-8 sm:gap-10"
              >
                <span className="w-12 shrink-0 font-mono text-[clamp(24px,3vw,36px)] tracking-tight text-ink/50">
                  {d.n}
                </span>
                <div className="flex-1">
                  <h3 className="text-[clamp(17px,1.6vw,20px)] font-medium text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[clamp(14px,1.2vw,16px)] leading-relaxed text-ink/70">
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="security" className={SECTION_PAD}>
        <div className={STACK}>
          <SectionHead
            label="03 — Governed Automation"
            title={
              <>
                AI can reason.
                <br />
                Infrastructure changes remain governed.
              </>
            }
            lede="Every recommendation is validated against real network state and requires explicit sign-off before execution."
          />
          <Reveal delay={200} className="max-w-4xl">
            <p
              className={`${FLOW} flex flex-wrap items-center gap-x-3 gap-y-3 text-ink/70`}
            >
              {GOVERNED_FLOW.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  <span
                    className={
                      step === "Approval"
                        ? "border border-ink px-2.5 py-1 text-ink"
                        : ""
                    }
                  >
                    {step}
                  </span>
                  {i < GOVERNED_FLOW.length - 1 && (
                    <span className="text-ink/60" aria-hidden="true">
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
