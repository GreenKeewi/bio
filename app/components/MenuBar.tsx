"use client";

import { useEffect, useState } from "react";

interface MenuDef {
  label: string;
  items: string[];
}

const MENUS: MenuDef[] = [
  { label: "File", items: ["New Excuse", "Save (never)"] },
  { label: "Edit", items: ["Undo Regret", "Redo Regret"] },
  { label: "View", items: ["Zoom Into Feelings", "Toggle Reality"] },
  { label: "Window", items: ["Minimize Expectations", "Bring All to Front (of the queue)"] },
  { label: "Help", items: ["It's fine, probably", "Ask again later"] },
];

export default function MenuBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const timeLabel = now
    ? now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex h-[27px] items-center justify-between border-b border-white/[0.08] bg-[#1c1c1c]/70 px-3 text-white backdrop-blur-md"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="flex items-center gap-4">
        <span className="text-[14px] leading-none"></span>
        {MENUS.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu((current) => (current === menu.label ? null : menu.label))
              }
              className={`rounded-[4px] px-2 py-[3px] text-[13px] transition-colors ${
                openMenu === menu.label ? "bg-white/15" : "hover:bg-white/10"
              }`}
            >
              {menu.label}
            </button>

            {openMenu === menu.label && (
              <div className="absolute left-0 top-[calc(100%+4px)] min-w-[190px] animate-mac-dropdown rounded-[8px] border border-white/10 bg-[#2a2a2a]/95 p-1 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-md">
                {menu.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOpenMenu(null)}
                    className="block w-full rounded-[5px] px-2.5 py-1.5 text-left text-[13px] text-white/85 hover:bg-white/10"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 text-[13px]">
        <WifiGlyph />
        <BatteryGlyph />
        <span className="tabular-nums">{timeLabel}</span>
      </div>
    </div>
  );
}

function WifiGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="text-white/85"
    >
      <path
        d="M1 6.5C4.5 3 11.5 3 15 6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M3.3 9.2C5.9 6.8 10.1 6.8 12.7 9.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M5.6 11.8C6.9 10.6 9.1 10.6 10.4 11.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg
      width="22"
      height="12"
      viewBox="0 0 24 12"
      fill="none"
      className="text-white/85"
    >
      <rect
        x="0.75"
        y="0.75"
        width="19.5"
        height="10.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="2.5" y="2.5" width="14" height="7" rx="1.2" fill="currentColor" />
      <rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}
