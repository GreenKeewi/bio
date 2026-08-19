"use client";

import { useEffect, useRef, useState } from "react";

type Link = { label: string; href: string; icon?: "email" | "github" };

type Project = {
  name: string;
  tagline: string;
  url: string;
  links: Link[];
};

type Node = { x: number; y: number };

const NAME = "Harshith Seeta";
const ROLE = "Software Engineer";
const BIO =
  "Coding since nine — an itch to fix what's broken around me. Solin, Fable, and Folia are that itch, scratched.";

const LINKS: (Link & Node)[] = [
  { label: "Email", href: "mailto:harshithseta@gmail.com", icon: "email", x: 17, y: 32 },
  { label: "GitHub", href: "https://github.com/GreenKeewi", icon: "github", x: 84, y: 60 },
];

const PROJECTS: (Project & Node)[] = [
  {
    name: "Folia",
    tagline: "Lorem ipsum dolor sit amet.",
    url: "https://folia-thodore.iso-nord.ca",
    x: 26,
    y: 76,
    links: [{ label: "Site", href: "https://folia-thodore.iso-nord.ca" }],
  },
  {
    name: "Solin",
    tagline: "Lorem ipsum dolor sit amet.",
    url: "https://heysolin.com",
    x: 50,
    y: 86,
    links: [{ label: "Site", href: "https://heysolin.com" }],
  },
  {
    name: "Fable",
    tagline: "Lorem ipsum dolor sit amet.",
    url: "https://usefable.ca",
    x: 74,
    y: 76,
    links: [{ label: "Site", href: "https://usefable.ca" }],
  },
];

const CENTER: Node = { x: 50, y: 48 };

// deterministic squiggle: cubic bezier from center to target with two
// perpendicular-offset control points, alternating direction by index
function squigglePath(from: Node, to: Node, seed: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const wob = Math.max(2.5, len * 0.14);
  const dir = seed % 2 === 0 ? 1 : -1;

  const p1x = from.x + dx * 0.32 + nx * wob * dir;
  const p1y = from.y + dy * 0.32 + ny * wob * dir;
  const p2x = from.x + dx * 0.68 - nx * wob * dir;
  const p2y = from.y + dy * 0.68 - ny * wob * dir;

  return `M ${from.x} ${from.y} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${to.x} ${to.y}`;
}

// renders the bio with each project name as a shimmering, hoverable
// span that spotlights the matching node on the board
function BioText({
  text,
  onHoverProject,
}: {
  text: string;
  onHoverProject: (key: string | null) => void;
}) {
  const names = PROJECTS.map((p) => p.name);
  const regex = new RegExp(`(${names.join("|")})`, "g");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        names.includes(part) ? (
          <span
            key={i}
            className="t-shimmer cursor-default"
            data-text={part}
            onMouseEnter={() => onHoverProject(`proj-${part}`)}
            onMouseLeave={() => onHoverProject(null)}
          >
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
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.79.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.2-1.27-5.2-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.68 5.34-5.22 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23 11.52C23 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function Pill({ label, href, icon }: Link) {
  const isMailto = href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
      className="t-pill relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[var(--ink)]/20 bg-[var(--plate)]/90 px-3 py-1.5 text-[11px] tracking-wide text-[var(--ink-soft)] backdrop-blur-[1px] hover:border-[var(--ink)] hover:text-[var(--ink)]"
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
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-[var(--ink)]/5">
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

function TiltCard({
  project,
  onSpotlight,
}: {
  project: Project;
  onSpotlight: (on: boolean) => void;
}) {
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
    <div ref={wrapRef} className="t-tilt w-[190px] sm:w-[220px]">
      <div
        ref={cardRef}
        className="t-tilt-card rounded-sm border-[1.5px] border-[var(--ink)]/20 bg-[var(--plate)]/95 shadow-[0_3px_16px_rgba(42,33,25,0.14)] backdrop-blur-[1px]"
      >
        <div className="relative aspect-[16/10] w-full overflow-visible">
          <ScaledPreview url={project.url} />
          <span className="t-frame-corner t-frame-corner--tl" />
          <span className="t-frame-corner t-frame-corner--tr" />
          <span className="t-frame-corner t-frame-corner--bl" />
          <span className="t-frame-corner t-frame-corner--br" />
        </div>
        <div className="px-2.5 py-2">
          <div className="flex items-center justify-between gap-2">
            <h3
              className="t-shimmer cursor-default text-[12.5px] font-medium"
              data-text={project.name}
              onMouseEnter={() => onSpotlight(true)}
              onMouseLeave={() => onSpotlight(false)}
            >
              {project.name}
            </h3>
            <div className="flex shrink-0 gap-1">
              {project.links.map((l) => (
                <Pill key={l.label} {...l} />
              ))}
            </div>
          </div>
          <p className="truncate text-[10.5px] text-[var(--ink-soft)]">{project.tagline}</p>
        </div>
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-14 text-center">
      <h1 className="font-[family-name:var(--font-serif)] italic text-3xl leading-none tracking-tight text-[var(--ink)]">
        {NAME}
      </h1>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">{ROLE}</p>
      <p className="mx-auto mt-3 max-w-xs text-[12px] leading-relaxed text-[var(--ink-soft)]">
        <BioText text={BIO} onHoverProject={() => {}} />
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {LINKS.map((l) => (
          <Pill key={l.label} {...l} />
        ))}
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-6">
        {PROJECTS.map((p) => (
          <TiltCard key={p.name} project={p} onSpotlight={() => {}} />
        ))}
      </div>

      <p className="mt-12 text-[10px] tracking-wide text-[var(--ink-soft)]">
        © {new Date().getFullYear()} {NAME}
      </p>
    </div>
  );
}

// a fixed mind-map node (no dragging) that spotlights itself and dims
// the rest of the board when hovered
function MapNode({
  x,
  y,
  delayMs,
  children,
  dim = false,
  raised = false,
  onHover,
}: {
  x: number;
  y: number;
  delayMs: number;
  children: React.ReactNode;
  dim?: boolean;
  raised?: boolean;
  onHover: (hovering: boolean) => void;
}) {
  return (
    <div
      className="t-node absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transitionDelay: `${delayMs}ms`,
        zIndex: raised ? 30 : undefined,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div
        className={`transition-[opacity,filter,transform] duration-300 ${
          dim ? "opacity-30 blur-[1px]" : "opacity-100"
        } ${raised ? "scale-105" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

const ALL_NODES: (Node & { key: string })[] = [
  ...LINKS.map((l) => ({ x: l.x, y: l.y, key: `link-${l.label}` })),
  ...PROJECTS.map((p) => ({ x: p.x, y: p.y, key: `proj-${p.name}` })),
];

export default function Home() {
  const [shown, setShown] = useState(false);
  const [spotlightKey, setSpotlightKey] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  const nodeKeys = ALL_NODES.map((n) => n.key);

  return (
    <>
      {/* Mobile: simple stacked layout, natural scroll */}
      <div className="sm:hidden">
        <MobileLayout />
      </div>

      {/* Desktop / tablet: mind-map layout, fits viewport, no scroll */}
      <div
        className={`relative z-10 hidden h-screen w-screen overflow-hidden sm:block ${
          shown ? "is-shown" : ""
        }`}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {ALL_NODES.map((n, i) => {
            const d = squigglePath(CENTER, n, i);
            return (
              <g key={n.key}>
                <path
                  d={d}
                  pathLength={1}
                  className="t-squiggle"
                  style={{ transitionDelay: `${180 + i * 90}ms` }}
                  fill="none"
                  stroke="var(--ink)"
                  strokeOpacity={0.62}
                  strokeWidth={0.42}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={d}
                  pathLength={1}
                  className="t-squiggle-flow"
                  style={{ transitionDelay: `${180 + i * 90 + 700}ms`, animationDelay: `${180 + i * 90 + 700}ms` }}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth={0.42}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* spotlight overlay: darkens everything except the hovered project node */}
        <div
          className="pointer-events-none absolute inset-0 z-20 bg-black transition-opacity duration-300"
          style={{ opacity: spotlightKey ? 0.75 : 0 }}
        />

        {/* center: name + bio — fixed in place, never draggable */}
        <div
          className="t-node absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transitionDelay: "0ms" }}
        >
          <div
            className={`w-[260px] px-6 py-5 text-center transition-[opacity,filter] duration-300 sm:w-[300px] ${
              spotlightKey ? "opacity-30 blur-[1px]" : "opacity-100"
            }`}
          >
            <h1 className="t-center-shadow font-[family-name:var(--font-serif)] italic text-3xl leading-none tracking-tight text-[var(--ink)] sm:text-4xl">
              {NAME}
            </h1>
            <p className="t-center-shadow mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ink-soft)]">{ROLE}</p>
            <p className="t-center-shadow mx-auto mt-3 text-[12px] leading-relaxed text-[var(--ink)]">
              <BioText text={BIO} onHoverProject={setSpotlightKey} />
            </p>
          </div>
        </div>

        {LINKS.map((l, i) => {
          const key = `link-${l.label}`;
          const isSpotlit = spotlightKey === key;
          return (
            <MapNode
              key={key}
              x={l.x}
              y={l.y}
              delayMs={100 + i * 70}
              dim={spotlightKey !== null && !isSpotlit}
              raised={isSpotlit}
              onHover={(hovering) => setSpotlightKey(hovering ? key : null)}
            >
              <Pill {...l} />
            </MapNode>
          );
        })}

        {PROJECTS.map((p, i) => {
          const key = `proj-${p.name}`;
          const isSpotlit = spotlightKey === key;
          return (
            <MapNode
              key={key}
              x={p.x}
              y={p.y}
              delayMs={100 + (LINKS.length + i) * 70}
              dim={spotlightKey !== null && !isSpotlit}
              raised={isSpotlit}
              onHover={(hovering) => setSpotlightKey(hovering ? key : null)}
            >
              <TiltCard project={p} onSpotlight={(on) => setSpotlightKey(on ? key : null)} />
            </MapNode>
          );
        })}

        <p
          className="t-node absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-wide text-[var(--ink-soft)]"
          style={{ transitionDelay: `${100 + nodeKeys.length * 70 + 100}ms` }}
        >
          © {new Date().getFullYear()} {NAME}
        </p>
      </div>
    </>
  );
}
