import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { CHIP, H2, SUB } from "../layout";

export default function SectionHead({
  label,
  title,
  lede,
}: {
  label: string;
  title: ReactNode;
  lede?: string;
}) {
  return (
    <div>
      <Reveal delay={100} className="inline-block">
        <span className={CHIP}>{label}</span>
      </Reveal>
      <Reveal delay={200}>
        <h2 className={`mt-5 max-w-3xl text-ink ${H2}`}>{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={300} className="mt-5 max-w-[62ch]">
          <p className={`text-ink/80 ${SUB}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
