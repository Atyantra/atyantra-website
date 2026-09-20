import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Reveal from "./Reveal";
import { CONTAINER, CTA_TEXT, FOCUS } from "../layout";

const LINKS = [
  { label: "Platform", id: "platform" },
  { label: "AI Operations", id: "ai-operations" },
  { label: "Security", id: "security" },
  { label: "Deployment", id: "deployment" },
  { label: "Company", id: "company" },
];

// Three-dot marker: encodes which section is in view.
function Marker() {
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-[3px]"
    >
      <i className="h-[3px] w-[3px] rounded-full bg-ink" />
      <i className="h-[3px] w-[3px] rounded-full bg-ink" />
      <i className="h-[3px] w-[3px] rounded-full bg-ink" />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      className={`hero-over fixed top-0 left-0 right-0 z-50 border-b border-ink/15 transition-colors duration-300 ${
        scrolled ? "nav-blur backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className={`${CONTAINER} flex items-center justify-between py-4`}>
        <Reveal delay={0}>
          <a href="#top" className={`flex items-center ${FOCUS}`}>
            <span className="text-lg sm:text-xl font-semibold tracking-[0.23em] uppercase text-ink">
              Atyantra
            </span>
          </a>
        </Reveal>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {LINKS.map((link, i) => (
            <Reveal key={link.id} delay={100 + i * 100}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={`relative flex items-center text-ink/85 transition-colors duration-300 hover:text-ink ${CTA_TEXT} ${FOCUS}`}
              >
                {link.label}
                {active === link.id && <Marker />}
              </a>
            </Reveal>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Reveal delay={500}>
            <a
              href="#company"
              className={`rounded-md border border-ink/20 bg-ink/10 px-4 py-2 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink/15 sm:px-5 ${CTA_TEXT} ${FOCUS}`}
            >
              Request Demo
            </a>
          </Reveal>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full border border-ink/20 bg-ink/10 p-2 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-ink/15 md:hidden ${FOCUS}`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="nav-sheet absolute left-4 right-4 top-full mt-2 rounded-[28px] border border-ink/15 bg-ground p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`block rounded-full px-3 py-3 text-ink transition-colors duration-300 hover:bg-ink/10 ${CTA_TEXT} ${FOCUS} ${
                    active === link.id ? "font-medium" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
