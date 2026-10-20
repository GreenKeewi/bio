"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function ProjectDetails({ name, href, description }: {
  name: string;
  href: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);
  const pointerFocus = useRef(false);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <span
      ref={root}
      className="project-details t-tt-wrap"
      data-open={open}
      onPointerDown={() => { pointerFocus.current = true; }}
      onPointerCancel={() => { pointerFocus.current = false; }}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
      onFocus={(event) => {
        if (!pointerFocus.current && event.target.matches(":focus-visible")) setOpen(true);
        pointerFocus.current = false;
      }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    >
      <a className="inline-link" href={href} aria-describedby={open ? id : undefined}>{name}</a>
      <button
        className="project-details-trigger t-tt-trigger"
        type="button"
        aria-label={`About ${name}`}
        aria-expanded={open}
        aria-controls={id}
        aria-describedby={open ? id : undefined}
        onClick={() => {
          pointerFocus.current = false;
          setOpen((value) => !value);
        }}
      >
        <span className="project-hover-label">(hover on me)</span>
        <span className="project-tap-label">(tap for info)</span>
      </button>
      <span className="project-details-popover t-tt" id={id} role="tooltip" aria-hidden={!open}>
        <span className="project-details-paper">{description}</span>
      </span>
    </span>
  );
}
