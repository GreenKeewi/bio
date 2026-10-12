"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AsciiData = {
  columns: number;
  rows: number;
  glyphs: string;
  palette: string[];
  cells: string;
};

const SIZE = 960;

export default function AsciiRedPanda() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const paintRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const viewport = window.matchMedia("(min-width: 769px)");
    const update = () => setDesktop(viewport.matches);
    const frame = requestAnimationFrame(update);
    viewport.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const controller = new AbortController();
    fetch("/art/red-panda-ascii.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("ASCII asset unavailable");
        return response.json() as Promise<AsciiData>;
      })
      .then((data) => {
        const bytes = Uint8Array.from(atob(data.cells), (character) => character.charCodeAt(0));
        const cells = new DataView(bytes.buffer);
        const painting = document.createElement("canvas");
        painting.width = SIZE;
        painting.height = SIZE;
        const context = painting.getContext("2d");
        if (!context) return;
        const cellWidth = SIZE / data.columns;
        const cellHeight = SIZE / data.rows;
        context.font = `${cellWidth / 0.6}px "Courier New", monospace`;
        context.textBaseline = "top";
        for (let index = 0; index < data.columns * data.rows; index++) {
          const cell = cells.getUint16(index * 2, true);
          if (!cell) continue;
          context.fillStyle = data.palette[(cell >> 4) - 1];
          context.fillText(data.glyphs[cell & 15], (index % data.columns) * cellWidth, Math.floor(index / data.columns) * cellHeight);
        }
        paintRef.current = painting;
        setReady(true);
      })
      .catch(() => {
        // The pre-rendered colored ASCII stays visible if fetch is unavailable.
      });
    return () => controller.abort();
  }, [desktop]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    const frame = requestAnimationFrame(update);
    preference.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const painting = paintRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !painting || !context || !ready || !desktop) return;

    let frame = 0;
    let lastPaint = 0;
    let visible = true;
    const drawStill = () => {
      context.clearRect(0, 0, SIZE, SIZE);
      context.drawImage(painting, 0, 0);
    };
    drawStill();
    if (reducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const draw = (time: number) => {
      // Paint at 24 fps. The glyphs are cached once; only thin strips move.
      if (visible && !document.hidden && time - lastPaint > 1000 / 24) {
        lastPaint = time;
        const phase = time / 1000;
        context.clearRect(0, 0, SIZE, SIZE);
        for (let y = 0; y < SIZE; y += 4) {
          const head = Math.max(0, 1 - y / (SIZE * 0.6));
          const breath = Math.sin(phase * 1.25) * 2;
          const headSway = Math.sin(phase * 0.65) * 6 * head;
          const tailSway = Math.sin(phase * 1.1 + y / SIZE * 2) * 3 * (1 - head);
          context.drawImage(painting, 0, y, SIZE, 4, headSway + tailSway, y + breath * head, SIZE, 4);
        }
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [ready, reducedMotion, desktop]);

  return (
    <figure className="home-art">
      <div className="panda-scene" role="img" aria-label="A red panda made of detailed coloured ASCII characters" data-ascii-ready={ready}>
        <picture>
          <source media="(max-width: 768px)" srcSet={`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>')}`} />
          <Image src="/art/red-panda-ascii.png" alt="" width={1920} height={1920} loading="eager" unoptimized className={`panda-fallback${ready ? " is-hidden" : ""}`} />
        </picture>
        <canvas ref={canvasRef} width={SIZE} height={SIZE} className={`panda-canvas${ready ? " is-ready" : ""}`} aria-hidden="true" />
      </div>
    </figure>
  );
}
