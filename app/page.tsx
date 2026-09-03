"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import MacWindow from "./components/MacWindow";

type Link = { label: string; href: string; icon?: "email" | "github" | "x" };

type Project = {
  name: string;
  tagline: string;
  url: string;
  links: Link[];
  /** false when the site blocks iframe embedding (X-Frame-Options/CSP) */
  preview?: boolean;
};

const NAME = "harsh";
const ROLE = "Software Engineer";
const BIO =
  "Been breaking and un-breaking computers since I was nine — turns out that's a personality trait now, not a phase. Folia, Solin, and Fable are the evidence.";

const LINKS: Link[] = [
  { label: "Email", href: "mailto:harshithseeta@gmail.com", icon: "email" },
  { label: "GitHub", href: "https://github.com/GreenKeewi", icon: "github" },
  { label: "X", href: "https://x.com/dndharsh0", icon: "x" },
];

const PROJECTS: Project[] = [
  {
    name: "Folia",
    tagline: "Leafing through ideas so you don't have to. Pun fully intended.",
    url: "https://folia-thodore.iso-nord.ca",
    links: [{ label: "Site", href: "https://folia-thodore.iso-nord.ca" }],
  },
  {
    name: "Solin",
    tagline: "Quietly solving a problem you didn't know you'd stopped noticing.",
    url: "https://heysolin.com",
    preview: false,
    links: [{ label: "Site", href: "https://heysolin.com" }],
  },
  {
    name: "Fable",
    tagline: "A story with an actual ending, unlike most of my side projects.",
    url: "https://usefable.ca",
    links: [{ label: "Site", href: "https://usefable.ca" }],
  },
];

type MinorProject = {
  name: string;
  url: string;
  blurb: string;
  why: string;
};

const MINOR_PROJECTS: MinorProject[] = [
  {
    name: "Solin (archived)",
    url: "https://solin-archived.vercel.app",
    blurb: "An earlier build of Solin, kept around as a museum piece.",
    why: "Shelved once the current version outgrew it, but it taught me most of what made the rebuild worth doing.",
  },
  {
    name: "Feedora",
    url: "https://feedora-simple-feedback-for-simple.vercel.app",
    blurb: "Simple feedback widget for people who don't want a whole platform.",
    why: "Wanted a way to collect thoughts from users without dragging in a survey tool built for enterprises.",
  },
  {
    name: "Arc UI",
    url: "https://arc-ui.vercel.app",
    blurb: "A small component set for interfaces that lean more curve than corner.",
    why: "Kept rebuilding the same rounded button and card everywhere, so I gave the habit a home.",
  },
];

// renders the bio with each project name as a shimmering span
function BioText({ text }: { text: string }) {
  const names = PROJECTS.map((p) => p.name);
  const regex = new RegExp(`(${names.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        names.includes(part) ? (
          <span key={i} className="t-shimmer cursor-default" data-text={part}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function LinkIcon({ icon }: { icon: NonNullable<Link["icon"]> }) {
  if (icon === "email") {
    return (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    );
  }
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
        <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.79.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.2-1.27-5.2-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.68 5.34-5.22 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23 11.52C23 5.24 18.27.5 12 .5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Pill({ label, href, icon }: Link) {
  const isMailto = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
      className="t-pill relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--plate)] px-3 py-1.5 text-[11px] tracking-wide text-[var(--ink-soft)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]"
    >
      {icon && <LinkIcon icon={icon} />}
      {label}
    </a>
  );
}

// virtual desktop viewport the site is rendered at, then scaled down to
// exactly fill the preview box — so the whole page layout is visible
// (not just a cropped top-left corner at near-1:1 zoom)
const PREVIEW_VW = 1440;
const PREVIEW_VH = 900;

function ScaledPreview({ url }: { url: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / PREVIEW_VW);
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-black/40">
      {scale > 0 && (
        <iframe
          src={url}
          title={url}
          loading="lazy"
          tabIndex={-1}
          className="pointer-events-none absolute top-0 left-0 origin-top-left"
          style={{
            width: `${PREVIEW_VW}px`,
            height: `${PREVIEW_VH}px`,
            transform: `scale(${scale})`,
            border: "none",
          }}
        />
      )}
      <div className="t-tilt-glare" />
    </div>
  );
}

// fallback for sites that refuse to be framed (X-Frame-Options/CSP) —
// a styled monogram card instead of a permanently blank iframe
function NoPreview({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--plate)] to-black/60">
      <span
        className="font-[family-name:var(--font-serif)] italic text-4xl text-[var(--ink)]/25 select-none"
        aria-hidden
      >
        {name[0]}
      </span>
      <div className="t-tilt-glare" />
    </div>
  );
}

function TiltCard({ project }: { project: Project }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const MAX = 6;

    function reset() {
      wrap!.classList.remove("is-hover");
      card!.classList.remove("is-tilting");
      card!.style.setProperty("--tilt-rx", "0deg");
      card!.style.setProperty("--tilt-ry", "0deg");
    }
    function track(e: PointerEvent) {
      if (reduce.matches) return;
      const r = wrap!.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      wrap!.classList.add("is-hover");
      card!.classList.add("is-tilting");
      card!.style.setProperty("--tilt-ry", ((px - 0.5) * MAX).toFixed(2) + "deg");
      card!.style.setProperty("--tilt-rx", ((0.5 - py) * MAX).toFixed(2) + "deg");
      card!.style.setProperty("--tilt-gx", (px * 100).toFixed(1) + "%");
      card!.style.setProperty("--tilt-gy", (py * 100).toFixed(1) + "%");
    }
    wrap.addEventListener("pointermove", track);
    wrap.addEventListener("pointerleave", reset);
    return () => {
      wrap.removeEventListener("pointermove", track);
      wrap.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div ref={wrapRef} className="t-tilt w-full sm:w-[220px] sm:shrink-0">
      <div
        ref={cardRef}
        className="t-tilt-card overflow-hidden rounded-md border border-[var(--line)] bg-[var(--plate)] shadow-[0_3px_16px_rgba(0,0,0,0.35)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-visible">
          {project.preview === false ? (
            <NoPreview name={project.name} />
          ) : (
            <ScaledPreview url={project.url} />
          )}
          <span className="t-frame-corner t-frame-corner--tl" />
          <span className="t-frame-corner t-frame-corner--tr" />
          <span className="t-frame-corner t-frame-corner--bl" />
          <span className="t-frame-corner t-frame-corner--br" />
        </div>
      </div>
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--line)] py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-5">
      <TiltCard project={project} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="t-shimmer cursor-default text-[15px] font-medium" data-text={project.name}>
            {project.name}
          </h3>
          <div className="flex shrink-0 gap-1.5">
            {project.links.map((l) => (
              <Pill key={l.label} {...l} />
            ))}
          </div>
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--ink-soft)]">{project.tagline}</p>
      </div>
    </div>
  );
}

function MinorPreview({ project }: { project: MinorProject }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--line)] bg-[var(--plate)]">
        <ScaledPreview url={project.url} />
      </div>
      <div>
        <p className="text-[12px] font-medium text-[var(--ink)]">{project.name}</p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-[var(--ink-soft)]">{project.blurb}</p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--ink-soft)]/70">{project.why}</p>
      </div>
    </div>
  );
}

function MinorProjects() {
  const [active, setActive] = useState(MINOR_PROJECTS[0].name);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const activeProject = MINOR_PROJECTS.find((p) => p.name === active) ?? MINOR_PROJECTS[0];

  return (
    <div className="pt-6">
      {/* desktop / tablet: hover-driven preview + list */}
      <div className="hidden sm:flex sm:gap-6">
        <div className="w-[58%] shrink-0 transition-opacity duration-300">
          <MinorPreview project={activeProject} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]/70">side quests</p>
          <div className="mt-3 flex flex-col">
            {MINOR_PROJECTS.map((p) => (
              <button
                key={p.name}
                type="button"
                onMouseEnter={() => setActive(p.name)}
                onFocus={() => setActive(p.name)}
                className={`rounded-sm px-2 py-1.5 text-left text-[12px] transition-colors duration-200 ${
                  active === p.name
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* mobile: tap to expand */}
      <div className="sm:hidden">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]/70">side quests</p>
        <div className="mt-3 flex flex-col gap-1">
          {MINOR_PROJECTS.map((p) => {
            const isOpen = openMobile === p.name;
            return (
              <div key={p.name} className="border-b border-[var(--line)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenMobile(isOpen ? null : p.name)}
                  className="flex w-full items-center justify-between py-2 text-left text-[12px] text-[var(--ink-soft)]"
                >
                  <span className={isOpen ? "text-[var(--ink)]" : ""}>{p.name}</span>
                  <span className="text-[10px]">{isOpen ? "–" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    <MinorPreview project={p} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <MacWindow title="harsh.notes" className="[&>div]:max-w-2xl">
      <div className={`t-fade ${shown ? "is-shown" : ""} px-5 py-6 sm:px-8 sm:py-8`}>
        <header className="border-b border-[var(--line)] pb-6">
          <h1 className="font-[family-name:var(--font-serif)] italic text-2xl leading-none tracking-tight text-[var(--ink)] sm:text-3xl">
            {NAME}
          </h1>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{ROLE}</p>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[var(--ink)]">
            <BioText text={BIO} />
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {LINKS.map((l) => (
              <Pill key={l.label} {...l} />
            ))}
            <NextLink
              href="/blog"
              className="t-pill relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--plate)] px-3 py-1.5 text-[11px] tracking-wide text-[var(--ink-soft)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)]"
            >
              Blog
            </NextLink>
          </div>
        </header>

        <div className="pt-2">
          {PROJECTS.map((p) => (
            <ProjectEntry key={p.name} project={p} />
          ))}
        </div>

        <MinorProjects />

        <p className="pt-6 text-[10px] tracking-wide text-[var(--ink-soft)]">
          © {new Date().getFullYear()} {NAME} — built, mostly on purpose.
        </p>
      </div>
    </MacWindow>
  );
}
