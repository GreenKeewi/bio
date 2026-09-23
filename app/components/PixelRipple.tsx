"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const DURATION = 900;
const CELL = 22;
const BAND = 90;

// small deterministic hash so each cell's flicker looks random but is stable frame-to-frame
function cellNoise(cx: number, cy: number) {
  const n = Math.sin(cx * 12.9898 + cy * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function usePixelRippleCanvas() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const originRef = useRef<{ x: number; y: number; start: number } | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;
    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [mounted]);

  const trigger = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    originRef.current = { x, y, start: performance.now() };
    if (rafRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = devicePixelRatio;
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#ededec";
    const w = window.innerWidth;
    const h = window.innerHeight;
    const maxRadius = Math.hypot(w, h) / 2 + BAND;

    const draw = () => {
      const origin = originRef.current;
      if (!origin) {
        rafRef.current = null;
        return;
      }
      const elapsed = performance.now() - origin.start;
      const progress = elapsed / DURATION;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (progress < 1.15) {
        const radius = progress * maxRadius;
        const cols = Math.ceil(w / CELL);
        const rows = Math.ceil(h / CELL);
        for (let cy = 0; cy < rows; cy++) {
          for (let cx = 0; cx < cols; cx++) {
            const px = cx * CELL + CELL / 2;
            const py = cy * CELL + CELL / 2;
            const dist = Math.hypot(px - origin.x, py - origin.y);
            const delta = Math.abs(dist - radius);
            if (delta > BAND / 2) continue;
            const falloff = 1 - delta / (BAND / 2);
            const flicker = 0.4 + cellNoise(cx, cy) * 0.6;
            const alpha = falloff * flicker * 0.4 * Math.max(0, 1 - progress * 0.7);
            if (alpha <= 0.01) continue;
            ctx.fillStyle = ink;
            ctx.globalAlpha = alpha;
            ctx.fillRect(cx * CELL * dpr, cy * CELL * dpr, (CELL - 2) * dpr, (CELL - 2) * dpr);
          }
        }
        rafRef.current = requestAnimationFrame(draw);
      } else {
        originRef.current = null;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const canvas =
    mounted &&
    createPortal(
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
        style={{ width: "100vw", height: "100vh" }}
        aria-hidden="true"
      />,
      document.body
    );

  return { canvas, trigger };
}

export function DarkWord({ children }: { children: ReactNode }) {
  const wordRef = useRef<HTMLButtonElement | null>(null);
  const { canvas, trigger } = usePixelRippleCanvas();

  const fire = () => {
    const rect = wordRef.current?.getBoundingClientRect();
    if (!rect) return;
    trigger(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  return (
    <>
      <button
        ref={wordRef}
        type="button"
        onMouseEnter={fire}
        onClick={fire}
        className="cursor-pointer border-none bg-transparent p-0 text-inherit underline decoration-[var(--line)] decoration-dotted underline-offset-2 transition-colors hover:decoration-[var(--ink)]"
        style={{ font: "inherit" }}
      >
        {children}
      </button>
      {canvas}
    </>
  );
}
