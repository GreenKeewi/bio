"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Sign, { type SignData } from "./Sign";
import type { Station } from "./content";
import ThemeToggle from "./ThemeToggle";

const ARROW: Record<string, string> = { left: "<-", right: "->", up: "^", down: "v" };

export default function TreeWorld({ html, signs, stations }: { html: string; signs: SignData[]; stations: Station[] }) {
  const [at, setAt] = useState(() => {
    if (typeof window === "undefined") return "start";
    const h = window.location.hash.slice(1);
    return stations.some((s) => s.id === h) ? h : "start";
  });
  const [dragging, setDragging] = useState(false);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const st = stations.find((s) => s.id === at) ?? stations[0];

  const go = useCallback((id: string) => {
    setDrag({ x: 0, y: 0 });
    setAt(id);
    if (typeof history !== "undefined") history.replaceState(null, "", id === "start" ? "/" : `/#${id}`);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dir = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" }[e.key];
      if (!dir) return;
      const n = st.nav.find((x) => x.dir === dir);
      if (n) {
        e.preventDefault();
        go(n.to);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [st, go]);

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

  return (
    <div className="tree-shell" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <div
        className={`tree-world${dragging ? " is-dragging" : ""}`}
        style={{
          transform: `translate(calc(50vw - ${st.cx} * var(--cw) + ${drag.x}px), calc(50svh - ${st.cy} * var(--lh) + ${drag.y}px))`,
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
