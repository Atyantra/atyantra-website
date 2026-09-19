import { LABEL } from "../layout";

const ITEMS = [
  "WAN / SD-WAN",
  "Routing",
  "Switching",
  "Wireless",
  "Firewalls",
  "Cloud Networking",
  "Application Experience",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {ITEMS.map((item) => (
        <span
          key={item}
          className={`whitespace-nowrap px-6 text-ink/70 ${LABEL}`}
        >
          {item} <span className="pl-6 text-ink/40">•</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee border-y border-ink/15 bg-panel/40 py-4 backdrop-blur-md">
      <p className="sr-only">Coverage: {ITEMS.join(", ")}.</p>
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
