import { useEffect, useRef } from "react";

const CELL = 26;
const LEVELS = [-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4];
const TIME_STEP = 0.0035;

// Marching-squares edges: 0 top, 1 right, 2 bottom, 3 left.
// Case bits: tl=8, tr=4, br=2, bl=1 (corner value above level).
const SEGMENTS: number[][][] = [
  [],
  [[3, 2]],
  [[2, 1]],
  [[3, 1]],
  [[0, 1]],
  [
    [0, 3],
    [2, 1],
  ],
  [[0, 2]],
  [[0, 3]],
  [[0, 3]],
  [[0, 2]],
  [
    [0, 1],
    [3, 2],
  ],
  [[0, 1]],
  [[3, 1]],
  [[2, 1]],
  [[3, 2]],
  [],
];

function field(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.0061 + t * 1.1) +
    Math.sin(y * 0.0083 - t * 0.8) +
    Math.sin((x + y) * 0.0042 + t * 0.6) +
    Math.sin(Math.hypot(x - 700, y - 400) * 0.0072 - t * 1.3)
  );
}

export default function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);
    let t = 4;
    let raf: number | null = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 2;
      rows = Math.ceil(h / CELL) + 2;
      grid = new Float32Array(cols * rows);
      draw();
    }

    function draw() {
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          grid[j * cols + i] = field(i * CELL, j * CELL, t);
        }
      }

      ctx!.clearRect(0, 0, w, h);
      ctx!.lineWidth = 1;

      for (const major of [false, true]) {
        ctx!.strokeStyle = major
          ? "rgba(11,14,20,0.2)"
          : "rgba(11,14,20,0.1)";
        ctx!.beginPath();
        LEVELS.forEach((level, li) => {
          if ((li % 2 === 0) !== major) return;
          for (let j = 0; j < rows - 1; j++) {
            for (let i = 0; i < cols - 1; i++) {
              const tl = grid[j * cols + i];
              const tr = grid[j * cols + i + 1];
              const br = grid[(j + 1) * cols + i + 1];
              const bl = grid[(j + 1) * cols + i];
              const idx =
                (tl > level ? 8 : 0) |
                (tr > level ? 4 : 0) |
                (br > level ? 2 : 0) |
                (bl > level ? 1 : 0);
              const segs = SEGMENTS[idx];
              if (segs.length === 0) continue;
              const x0 = i * CELL;
              const y0 = j * CELL;
              const point = (edge: number): [number, number] => {
                switch (edge) {
                  case 0:
                    return [x0 + CELL * ((level - tl) / (tr - tl)), y0];
                  case 1:
                    return [x0 + CELL, y0 + CELL * ((level - tr) / (br - tr))];
                  case 2:
                    return [x0 + CELL * ((level - bl) / (br - bl)), y0 + CELL];
                  default:
                    return [x0, y0 + CELL * ((level - tl) / (bl - tl))];
                }
              };
              for (const [a, b] of segs) {
                const [ax, ay] = point(a);
                const [bx, by] = point(b);
                ctx!.moveTo(ax, ay);
                ctx!.lineTo(bx, by);
              }
            }
          }
        });
        ctx!.stroke();
      }
    }

    function step() {
      t += TIME_STEP;
      draw();
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      if (!reduced.matches) raf = requestAnimationFrame(step);
    }

    resize();
    start();
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", start);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      reduced.removeEventListener("change", start);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-ground"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
