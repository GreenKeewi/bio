"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MenuDef {
  label: string;
  items: Array<{ label: string; action: () => void }>;
}

export default function MenuBar() {
  const router = useRouter();
  const [now, setNow] = useState<Date | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [asciiPaused, setAsciiPaused] = useState(false);

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

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 2200);
  }

  async function copy(text: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(text);
      showNotice(successMessage);
    } catch {
      showNotice("Could not copy that just now");
    }
  }

  function toggleAscii() {
    setAsciiPaused((paused) => {
      window.dispatchEvent(new Event("toggle-ascii-background"));
      const next = !paused;
      showNotice(next ? "Background paused" : "Background resumed");
      return next;
    });
  }

  const menus: MenuDef[] = [
    {
      label: "File",
      items: [
        { label: "Home", action: () => router.push("/") },
        { label: "Open blog", action: () => router.push("/blog") },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Copy email", action: () => void copy("harshithseeta@gmail.com", "Email copied") },
        { label: "Copy page link", action: () => void copy(window.location.href, "Page link copied") },
      ],
    },
    {
      label: "View",
      items: [
        { label: asciiPaused ? "Resume background" : "Pause background", action: toggleAscii },
        { label: "Scroll to top", action: () => document.querySelector<HTMLElement>("[data-window-body]")?.scrollTo({ top: 0, behavior: "smooth" }) },
      ],
    },
    {
      label: "Window",
      items: [
        {
          label: "Toggle fullscreen",
          action: () => {
            if (document.fullscreenElement) void document.exitFullscreen();
            else void document.documentElement.requestFullscreen();
          },
        },
        { label: "Focus window", action: () => document.querySelector<HTMLElement>("[data-window-body]")?.focus() },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Email Harsh", action: () => window.location.assign("mailto:harshithseeta@gmail.com") },
        { label: "Show keyboard tip", action: () => showNotice("Tip: previews load only while fully in view") },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex h-[27px] items-center justify-between border-b border-white/[0.08] bg-[#1c1c1c]/70 px-3 text-white backdrop-blur-md"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="flex items-center gap-4">
        <span className="text-[14px] leading-none"></span>
        {menus.map((menu) => (
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
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.action();
                      setOpenMenu(null);
                    }}
                    className="block w-full rounded-[5px] px-2.5 py-1.5 text-left text-[13px] text-white/85 hover:bg-white/10"
                  >
                    {item.label}
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
      {notice && (
        <div className="absolute right-3 top-[calc(100%+7px)] animate-mac-dropdown rounded-md border border-white/10 bg-[#2a2a2a]/95 px-3 py-1.5 text-[11px] text-white/85 shadow-lg backdrop-blur-md">
          {notice}
        </div>
      )}
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
