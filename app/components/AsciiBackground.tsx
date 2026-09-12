"use client";

import { useEffect, useRef, useState } from "react";

const CHAR_RAMP = " .:-=+*#%@";

const BG_COLOR = "#0a0a0a";
const FG_R = 150;
const FG_G = 165;
const FG_B = 170;

/**
 * Simple deterministic 2D value-noise field (no external deps).
 * Cheap smoothstep interpolation over a pseudo-random lattice, animated
 * by offsetting the sample time coordinate.
 */
function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const xf = x - x0;
  const yf = y - y0;

  const tl = hash(x0, y0);
  const tr = hash(x0 + 1, y0);
  const bl = hash(x0, y0 + 1);
  const br = hash(x0 + 1, y0 + 1);

  const sx = smoothstep(xf);
  const sy = smoothstep(yf);

  const top = tl + (tr - tl) * sx;
  const bottom = bl + (br - bl) * sx;
  return top + (bottom - top) * sy;
}

/**
 * Fractal sum of a few octaves of value noise for a more organic flow field.
 */
function fbm(x: number, y: number): number {
  let total = 0;
  let amplitude = 0.6;
  let frequency = 1;
  let max = 0;
  for (let i = 0; i < 3; i++) {
    total += valueNoise(x * frequency, y * frequency) * amplitude;
    max += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return total / max;
}

/**
 * Brightness sampler for a single grid cell, in the range [0, 1].
 *
 * SWAP POINT: this is the only function that needs to change to drive the
 * effect from a video instead of noise: replace the fbm() call with a read
 * of the average luminance of the corresponding region of a <video> frame
 * drawn to an offscreen canvas (ctx.getImageData over the cell's pixel
 * bounds), keeping the same (col, row, time) -> [0,1] contract.
 */
function sampleBrightness(col: number, row: number, time: number): number {
  const nx = col * 0.09;
  const ny = row * 0.09;
  const flow = fbm(nx + time * 0.06, ny - time * 0.04);
  const ripple = Math.sin(nx * 1.4 + ny * 1.1 + time * 0.8) * 0.08;
  return Math.min(1, Math.max(0, flow + ripple));
}

interface AsciiBackgroundProps {
  className?: string;
}

export default function AsciiBackground({ className }: AsciiBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const cellSize = lowPowerDevice ? 15 : 12;
    const frameInterval = 1000 / (lowPowerDevice ? 8 : 18);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = 0;
    let rows = 0;
    let animationFrameId = 0;
    let lastFrameTime = 0;
    const startTime = performance.now();
    let cancelled = false;

    function resize() {
      if (!canvas || !ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
      ctx.font = `${cellSize}px monospace`;
      ctx.textBaseline = "top";
    }

    function drawFrame(time: number) {
      if (!ctx || !canvas) return;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const brightness = sampleBrightness(col, row, time);
          if (brightness < 0.08) continue;
          const charIndex = Math.min(
            CHAR_RAMP.length - 1,
            Math.floor(brightness * CHAR_RAMP.length)
          );
          const char = CHAR_RAMP[charIndex];
          if (char === " ") continue;
          const alpha = 0.15 + brightness * 0.5;
          ctx.fillStyle = `rgba(${FG_R}, ${FG_G}, ${FG_B}, ${alpha.toFixed(3)})`;
          ctx.fillText(char, col * cellSize, row * cellSize);
        }
      }
    }

    function tick(now: number) {
      if (cancelled) return;
      animationFrameId = requestAnimationFrame(tick);
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;
      const elapsedSeconds = (now - startTime) / 1000;
      drawFrame(elapsedSeconds);
    }

    resize();

    if (reduceMotion || paused) {
      drawFrame(0);
    } else {
      animationFrameId = requestAnimationFrame(tick);
    }

    function handleResize() {
      resize();
      if (reduceMotion || paused) {
        drawFrame(0);
      }
    }

    window.addEventListener("resize", handleResize);

    function togglePaused() {
      setPaused((current) => !current);
    }

    window.addEventListener("toggle-ascii-background", togglePaused);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("toggle-ascii-background", togglePaused);
      cancelAnimationFrame(animationFrameId);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 -z-10 pointer-events-none ${className ?? ""}`}
    />
  );
}
