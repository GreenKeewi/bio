"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Sign, { type SignData } from "./Sign";
import type { Station } from "./content";
import ThemeToggle from "./ThemeToggle";

const ARROW: Record<string, string> = { left: "<-", right: "->", up: "^", down: "v" };
const PHONE = 640;
const CW = 0.6; // column width in em
const LH = 1.143; // row height in em

const onHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const onResize = (cb: () => void) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};

export default function TreeWorld({ html, signs, stations }: { html: string; signs: SignData[]; stations: Station[] }) {
  const hash = useSyncExternalStore(onHash, () => location.hash.slice(1), () => "");
  const vw = useSyncExternalStore(onResize, () => window.innerWidth, () => 1440);
  const phone = vw < PHONE;
  const at = stations.some((s) => s.id === hash) ? hash : "start";
  const base = stations.find((s) => s.id === at) ?? stations[0];
  const st = phone && base.phone ? { ...base, ...base.phone } : base;

  const font = phone ? 11 : 15;
  const scale = phone ? Math.min(1.3, (vw - 24) / (st.fit * CW * font)) : 1;

  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  // First paint lands on the right branch with no pan, then motion turns on.
  useEffect(() => {
    const el = worldRef.current;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => el?.classList.add("is-ready")));
    return () => cancelAnimationFrame(id);
  }, []);

  const go = useCallback((id: string) => {
    setDrag({ x: 0, y: 0 });
    const url = id === "start" ? location.pathname : `#${id}`;
    history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" }[e.key];
      const n = dir && st.nav.find((x) => x.dir === dir);
      if (n) {
        e.preventDefault();
        go(n.to);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [st.nav, go]);

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button")) return;
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: drag.x, oy: drag.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const clamp = (v: number) => Math.max(-500, Math.min(500, v));
    setDrag({ x: clamp(d.ox + e.clientX - d.sx), y: clamp(d.oy + e.clientY - d.sy) });
  };
  const onUp = () => {
    dragRef.current = null;
    setDragging(false);
  };

  const tx = -st.cx * CW * font;
  const ty = -st.cy * LH * font;

  return (
    <div className="tree-shell" style={{ fontSize: font }} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <div
        ref={worldRef}
        className={`tree-world${dragging ? " is-dragging" : ""}`}
        style={{
          transform: `translate(calc(50vw + ${drag.x}px), calc(${phone ? "45svh" : "50svh"} + ${drag.y}px)) scale(${scale}) translate(${tx}px, ${ty}px)`,
        }}
      >
        <pre className="tree-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
        {signs.map((s) => (
          <Sign key={s.id} s={s} onFocus={() => s.station !== at && go(s.station)} />
        ))}
      </div>

      <header className="tree-top">
        <span className="tree-mark">harshs.dev</span>
        <span className="tree-where">/ {at === "start" ? "trunk" : at}</span>
        <ThemeToggle />
      </header>

      <nav className="tree-nav" aria-label="branches">
        {st.nav.map((n) => (
          <button key={n.to} type="button" className={`tree-go tree-go-${n.dir}`} onClick={() => go(n.to)}>
            {n.dir === "left" || n.dir === "up" ? `${ARROW[n.dir]} ${n.label}` : `${n.label} ${ARROW[n.dir]}`}
          </button>
        ))}
      </nav>
    </div>
  );
}
