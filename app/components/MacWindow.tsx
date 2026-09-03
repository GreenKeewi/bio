"use client";

import { useState, type ReactNode } from "react";

type TrafficLightState = "idle" | "shake" | "minimize" | "zoom";

interface MacWindowProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function MacWindow({
  title = "harsh.txt — probably shipping something",
  children,
  className = "",
  bodyClassName = "",
}: MacWindowProps) {
  const [state, setState] = useState<TrafficLightState>("idle");
  const [showTooltip, setShowTooltip] = useState(false);

  function handleRedClick() {
    setState("shake");
    setShowTooltip(true);
    window.setTimeout(() => setState("idle"), 500);
    window.setTimeout(() => setShowTooltip(false), 1200);
  }

  function handleYellowClick() {
    setState("minimize");
    window.setTimeout(() => setState("idle"), 400);
  }

  function handleGreenClick() {
    setState("zoom");
    window.setTimeout(() => setState("idle"), 400);
  }

  const windowMotionClass =
    state === "shake"
      ? "animate-mac-shake"
      : state === "minimize"
        ? "animate-mac-minimize"
        : state === "zoom"
          ? "animate-mac-zoom"
          : "";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-y-auto pointer-events-none px-3 py-6 sm:px-6 sm:py-10 ${className}`}
    >
      <div
        className={`pointer-events-auto relative flex max-h-full w-full flex-col overflow-hidden rounded-[12px] border border-white/[0.08] bg-[#1e1e1e] shadow-[0_30px_80px_rgba(0,0,0,0.55),0_10px_30px_rgba(0,0,0,0.4)] ${windowMotionClass}`}
      >
        <div className="relative flex h-[40px] shrink-0 items-center border-b border-white/[0.08] bg-[#2a2a2a] px-3">
          <div className="flex items-center gap-2">
            <TrafficLight
              color="#ff5f57"
              glyph="×"
              onClick={handleRedClick}
            />
            <TrafficLight
              color="#febc2e"
              glyph="−"
              onClick={handleYellowClick}
            />
            <TrafficLight
              color="#28c840"
              glyph="+"
              onClick={handleGreenClick}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="select-none text-[13px] font-medium text-white/50">
              {title}
            </span>
          </div>

          {showTooltip && (
            <div className="absolute left-3 top-[calc(100%+6px)] z-10 animate-mac-tooltip rounded-md bg-[#3a3a3a] px-2.5 py-1 text-[11px] text-white/85 shadow-lg">
              nice try
            </div>
          )}
        </div>

        <div
          className={`min-h-0 flex-1 overflow-auto ${bodyClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function TrafficLight({
  color,
  glyph,
  onClick,
}: {
  color: string;
  glyph: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-[12px] w-[12px] items-center justify-center rounded-full"
      style={{
        backgroundColor: color,
        boxShadow: "inset 0 0.5px 0.5px rgba(255,255,255,0.35)",
      }}
    >
      <span
        className="pointer-events-none select-none text-[9px] leading-none text-black/60 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ transform: "translateY(-0.5px)" }}
      >
        {glyph}
      </span>
    </button>
  );
}
