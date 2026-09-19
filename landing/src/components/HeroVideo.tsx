import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

// Fraction of one viewport of scroll over which the video fades out.
const FADE_VIEWPORTS = 0.9;
// Scroll progress below which hero + nav use light text over the video.
const OVER_THRESHOLD = 0.45;
const MOBILE_QUERY = "(max-width: 767px)";

type NetworkInfo = { saveData?: boolean };

function shouldSkipVideo() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia(MOBILE_QUERY).matches;
  const conn = (navigator as Navigator & { connection?: NetworkInfo })
    .connection;
  return reduced || mobile || Boolean(conn?.saveData);
}

export default function HeroVideo() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide once whether to use video at all, and start loading after page load.
  useEffect(() => {
    if (shouldSkipVideo()) return;
    const start = () => setEnabled(true);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Fade with scroll; pause once fully hidden.
  useEffect(() => {
    if (!enabled) return;
    function update() {
      const layer = layerRef.current;
      const video = videoRef.current;
      if (!layer || !video) return;
      const p = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * FADE_VIEWPORTS))
      );
      layer.style.opacity = String(ready ? 1 - p : 0);
      const over = ready && p < OVER_THRESHOLD;
      document.documentElement.dataset.over = String(over);
      layer.style.visibility = ready && p >= 1 ? "hidden" : "visible";
      if (p >= 1) {
        if (!video.paused) video.pause();
      } else if (video.paused && ready) {
        video.play().catch(() => undefined);
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete document.documentElement.dataset.over;
    };
  }, [enabled, ready]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-0 transition-opacity duration-700"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        className="absolute inset-0 h-full w-full object-cover saturate-[0.7]"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
