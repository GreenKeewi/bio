"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import MacWindow from "./components/MacWindow";

type Link = { label: string; href: string; icon?: "email" | "github" | "devpost" | "x"; onClick?: () => void };

type Project = {
  name: string;
  tagline: string;
  url: string;
  links: Link[];
  /** false when the site blocks iframe embedding (X-Frame-Options/CSP) */
  preview?: boolean;
  /** "phone" renders the card as a mobile viewport in a phone-shaped frame; defaults to "desktop" */
  viewport?: "desktop" | "phone";
};

const NAME = "harsh";
const ROLE = "Software Engineer";
const BIO =
  "Been breaking and un-breaking computers since I was nine. Turns out that's a personality trait now, not a phase. Folia, Solin, and Fable are the evidence.";

const LINKS: Link[] = [
  { label: "Email", href: "mailto:harshithseeta@gmail.com", icon: "email" },
  { label: "GitHub", href: "https://github.com/GreenKeewi", icon: "github" },
  { label: "Devpost", href: "https://devpost.com/GreenKeewi", icon: "devpost" },
  { label: "X", href: "https://x.com/dndharsh0", icon: "x" },
];

const PROJECTS: Project[] = [
  {
    name: "Folia",
    tagline: "Turns spoken meetings and lectures into structured notes with math, diagrams, and to-dos.",
    url: "https://folia-thodore.iso-nord.ca",
    links: [{ label: "Site", href: "https://folia-thodore.iso-nord.ca" }],
  },
  {
    name: "Solin",
    tagline: "Daily public-speaking practice with AI feedback on filler words, pacing, confidence, and structure.",
    url: "https://heysolin.com",
    preview: false,
    viewport: "phone",
    links: [{ label: "Site", href: "https://heysolin.com" }],
  },
  {
    name: "Fable",
    tagline: "An AI consulting agency for strategy, automation, and intelligent systems in fast-moving businesses.",
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

type Experience = {
  company: string;
  role: string;
  url: string;
  logo: string;
  description: string;
  current?: boolean;
};

const EXPERIENCE: Experience[] = [
  {
    company: "Dreamwork",
    role: "GTM Engineer Intern",
    url: "https://www.dreamworkhq.com",
    logo: "https://www.dreamworkhq.com/favicon.ico",
    description: "Currently building tools that help people spend less time applying and more time interviewing.",
    current: true,
  },
];

const MINOR_PROJECTS: MinorProject[] = [
  {
    name: "Solin (archived)",
    url: "https://solin-archived.vercel.app",
    blurb: "A personal AI assistant that learns what matters over time and acts across connected tools.",
    why: "It connected services like Gmail, Calendar, Slack, texts, and tasks into one personal operating layer.",
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
    blurb: "A professional website service with a one-time setup and a monthly maintenance plan.",
    why: "Built to give businesses a straightforward path to a polished web presence without an agency-sized commitment.",
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
  if (icon === "devpost") {
    return (
      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
        <path d="M6.002 1.61 0 12l6.002 10.39h11.996L24 12 17.998 1.61H6.002zm1.593 4.083h4.705c3.21 0 5.42 2.03 5.42 6.307 0 4.29-2.21 6.32-5.42 6.32H7.595V5.693zm3.25 3.155v6.304h1.455c1.47 0 2.29-.988 2.29-3.15 0-2.17-.82-3.154-2.29-3.154h-1.455z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Pill({ label, href, icon, onClick }: Link) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="t-pill relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--plate)] px-3 py-1.5 text-[11px] tracking-wide text-[var(--ink-soft)] hover:border-[var(--ink)]/40 hover:text-[var(--ink)] cursor-pointer"
      >
        {icon && <LinkIcon icon={icon} />}
        {label}
      </button>
    );
  }

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

// virtual viewport the site is rendered at, then scaled down to exactly
// fill the preview box — so the whole page layout is visible (not just a
// cropped top-left corner at near-1:1 zoom). "phone" mimics a mobile
// screen so mobile-first products don't get squeezed into a desktop layout.
const PREVIEW_VIEWPORTS = {
  desktop: { vw: 1440, vh: 900 },
  phone: { vw: 390, vh: 844 },
} as const;

function ScaledPreview({ url, viewport = "desktop" }: { url: string; viewport?: "desktop" | "phone" }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const { vw, vh } = PREVIEW_VIEWPORTS[viewport];

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setScale(w / vw);
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [vw]);

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
            width: `${vw}px`,
            height: `${vh}px`,
            transform: `scale(${scale})`,
            border: "none",
          }}
        />
      )}
      <div className="t-tilt-glare" />
    </div>
  );
}

// fallback for sites that refuse to be framed (X-Frame-Options/CSP):
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

function DeferredPreview({ name, url, viewport }: { name: string; url: string; viewport?: "desktop" | "phone" }) {
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = viewportRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.95 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <>
      <div ref={viewportRef} className="absolute inset-0" />
      {inViewport && pageVisible ? <ScaledPreview url={url} viewport={viewport} /> : <NoPreview name={name} />}
    </>
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

  const isPhone = project.viewport === "phone";

  return (
    <div
      ref={wrapRef}
      className={isPhone ? "t-tilt w-[132px] shrink-0 self-center sm:self-auto" : "t-tilt w-full sm:w-[220px] sm:shrink-0"}
    >
      <div
        ref={cardRef}
        className={
          isPhone
            ? "t-tilt-card overflow-hidden rounded-[22px] border-[3px] border-[var(--line)] bg-[var(--plate)] p-1 shadow-[0_3px_16px_rgba(0,0,0,0.35)]"
            : "t-tilt-card overflow-hidden rounded-md border border-[var(--line)] bg-[var(--plate)] shadow-[0_3px_16px_rgba(0,0,0,0.35)]"
        }
      >
        <div
          className={
            isPhone
              ? "relative aspect-[9/19.5] w-full overflow-hidden rounded-[16px]"
              : "relative aspect-[16/10] w-full overflow-visible"
          }
        >
          {isPhone && (
            <span className="absolute top-1.5 left-1/2 z-10 h-1 w-8 -translate-x-1/2 rounded-full bg-black/50" />
          )}
          {project.preview === false ? (
            <NoPreview name={project.name} />
          ) : (
            <DeferredPreview name={project.name} url={project.url} viewport={project.viewport} />
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

function ExperienceEntry({ experience }: { experience: Experience }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--line)] py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-5">
      <div className="t-tilt w-full sm:w-[220px] sm:shrink-0">
        <div className="t-tilt-card overflow-hidden rounded-md border border-[var(--line)] bg-[var(--plate)] shadow-[0_3px_16px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[16/10] w-full overflow-visible">
            <DeferredPreview name={experience.company} url={experience.url} />
            <span className="t-frame-corner t-frame-corner--tl" />
            <span className="t-frame-corner t-frame-corner--tr" />
            <span className="t-frame-corner t-frame-corner--bl" />
            <span className="t-frame-corner t-frame-corner--br" />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--line)] bg-white p-1">
              <img src={experience.logo} alt="" className="size-full object-contain" />
            </span>
            <div className="min-w-0">
              <h3 className="t-shimmer cursor-default text-[15px] font-medium" data-text={experience.company}>
                {experience.company}
              </h3>
              <p className="mt-0.5 text-[10px] text-[var(--ink-soft)]">{experience.role}</p>
            </div>
            {experience.current && (
              <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[9px] tracking-wide text-[var(--ink-soft)]">
                now
              </span>
            )}
          </div>
          <Pill label="Visit" href={experience.url} />
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--ink-soft)]">{experience.description}</p>
      </div>
    </div>
  );
}

function MinorPreview({ project }: { project: MinorProject }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--line)] bg-[var(--plate)]">
        <DeferredPreview name={project.name} url={project.url} />
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
  const [showEmailModal, setShowEmailModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleEmailClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowEmailModal(true);
    timerRef.current = setTimeout(() => {
      setShowEmailModal(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
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
                <Pill
                  key={l.label}
                  {...l}
                  {...(l.icon === "email" ? { onClick: handleEmailClick } : {})}
                />
              ))}
              <NextLink
                href="/blog"
                className="t-pill relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--ink)]/25 bg-white/[0.06] px-3 py-1.5 text-[11px] tracking-wide text-[var(--ink)] hover:border-[var(--ink)]/50"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M5 4.75A2.75 2.75 0 0 1 7.75 2h9.5A1.75 1.75 0 0 1 19 3.75v16.5a1.75 1.75 0 0 0-1.75-1.75h-9.5A2.75 2.75 0 0 0 5 21.25V4.75Z" />
                  <path d="M5 4.75v16.5" />
                </svg>
                Blog
              </NextLink>
            </div>
          </header>

        <div className="pt-2">
          {PROJECTS.map((p) => (
            <ProjectEntry key={p.name} project={p} />
          ))}
        </div>

        <section className="mt-2 border-t border-[var(--line)] pt-5" aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-[10px] tracking-[0.2em] text-[var(--ink-soft)]/70">
            Professional experience
          </h2>
          <div className="mt-1">
            {EXPERIENCE.map((experience) => (
              <ExperienceEntry key={experience.company} experience={experience} />
            ))}
          </div>
        </section>

        <MinorProjects />

        <p className="pt-6 text-[10px] tracking-wide text-[var(--ink-soft)]">
          © {new Date().getFullYear()} {NAME}. Built, mostly on purpose.
        </p>
      </div>
    </MacWindow>

    {showEmailModal && (
      <div
        role="dialog"
        aria-label="Email Address"
        className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[#1c1c1c]/90 px-4 py-3 text-xs text-[var(--ink)] shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md animate-mac-dropdown"
      >
        <span className="font-mono selection:bg-white/20">harshithseeta at gmail dot com</span>
        <button
          type="button"
          onClick={() => setShowEmailModal(false)}
          className="ml-1 text-[var(--ink-soft)] hover:text-[var(--ink)] text-sm leading-none"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    )}
  </>
  );
}
