import type { ReactNode, ElementType } from "react";
import { useReveal, revealClass } from "../hooks/useReveal";

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`will-change-transform transition-all duration-700 ease-out ${revealClass(
        visible
      )} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
