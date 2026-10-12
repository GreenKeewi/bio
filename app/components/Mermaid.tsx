"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function ensureInit() {
  if (initialized) return;
  const theme = getComputedStyle(document.documentElement);
  const color = (token: string) => theme.getPropertyValue(token).trim();
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    fontFamily: "Lora, Georgia, serif",
    themeVariables: {
      background: color("--plate"),
      primaryColor: color("--bg-base"),
      primaryTextColor: color("--ink"),
      primaryBorderColor: color("--line"),
      lineColor: color("--ink-soft"),
      secondaryColor: color("--plate"),
      tertiaryColor: color("--plate"),
      fontSize: "13px",
    },
  });
  initialized = true;
}

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    ensureInit();
    let cancelled = false;
    mermaid
      .render(`mermaid-${id}`, chart.trim())
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Mermaid render failed:", err);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="mermaid-diagram my-5 flex justify-center overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--plate)] p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
