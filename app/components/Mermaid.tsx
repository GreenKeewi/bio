"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

function ensureInit() {
  if (initialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    themeVariables: {
      background: "#1e1e1e",
      primaryColor: "#232326",
      primaryTextColor: "#ededec",
      primaryBorderColor: "rgba(237,237,236,0.2)",
      lineColor: "rgba(237,237,236,0.4)",
      secondaryColor: "#2a2a2a",
      tertiaryColor: "#232326",
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
      className="my-5 flex justify-center overflow-x-auto rounded-md border border-[var(--line)] bg-[#1a1a1c] p-4"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
