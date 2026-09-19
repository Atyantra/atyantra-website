// Shared layout + type tokens. Source of truth for the rules in DESIGN.md.

export const CONTAINER = "mx-auto w-full max-w-[1180px] px-5 sm:px-8 md:px-12";

export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink";

// Fluid type scale (DESIGN.md → Typography).
export const H1 =
  "text-[clamp(28px,6.2vw,80px)] font-normal leading-[1.05] tracking-[-0.03em]";
export const H2 =
  "text-[clamp(28px,4.4vw,56px)] font-normal leading-[1.08] tracking-[-0.03em]";
export const SUB =
  "text-[clamp(15.5px,calc(1.55vw+2pt),18.5px)] leading-relaxed";
export const LABEL =
  "font-mono text-[clamp(11px,0.9vw,12.5px)] uppercase tracking-[0.15em]";
export const CTA_TEXT = "text-[clamp(13px,1.1vw,15px)]";

export const CHIP = `inline-block border-l-2 border-ink bg-ink/10 px-3 py-1.5 backdrop-blur-md text-ink ${LABEL}`;

// The one bold element: glow on the primary CTA (DESIGN.md → Color).
export const BTN_PRIMARY = `inline-flex items-center rounded-full bg-ink px-5 py-2.5 font-medium text-inkfg ${CTA_TEXT} shadow-[0_0_22px_rgb(var(--ink)/0.3),0_0_44px_rgb(var(--ink)/0.12)] transition-[opacity,transform] duration-300 hover:scale-[1.03] hover:opacity-90 ${FOCUS}`;

export const BTN_SECONDARY = `inline-flex items-center rounded-full border border-ink/25 bg-ink/5 px-5 py-2.5 text-ink backdrop-blur-md ${CTA_TEXT} transition-[background-color,transform] duration-300 hover:scale-[1.03] hover:bg-ink/15 ${FOCUS}`;

export const SECTION_PAD = "py-24 md:py-32 bg-white/25";
