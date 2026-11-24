"use client";

import { useState, useSyncExternalStore } from "react";

const sub = () => () => {};

export default function ThemeToggle() {
  const initial = useSyncExternalStore(sub, () => document.documentElement.dataset.theme === "dark", () => false);
  const [over, setOver] = useState<boolean | null>(null);
  const dark = over ?? initial;
  const flip = () => {
    const next = !dark;
    setOver(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <button type="button" className="tree-theme" onClick={flip} aria-label={dark ? "switch to light" : "switch to dark"}>
      {dark ? "[ light ]" : "[ dark ]"}
    </button>
  );
}
