"use client";

import { useEffect, useState } from "react";
import { RippleWord } from "./components/PixelRipple";

const formatTorontoTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .toLowerCase();

function LiveClock() {
  const [time, setTime] = useState(formatTorontoTime);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTorontoTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  );
}

function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <a href={href} {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
    </a>
  );
}

export default function Home() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[560px] flex-col justify-center px-5 py-16 sm:px-8">
      <div className={`t-fade ${shown ? "is-shown" : ""}`}>
        <p className="max-w-lg text-[15px] leading-[1.85] text-[var(--ink-dim)]">
          I&apos;m harsh, a software engineer in <RippleWord>Toronto</RippleWord>. I ship{" "}
          <InlineLink href="https://folia-notes.vercel.app/">Folia</InlineLink>,{" "}
          <InlineLink href="https://heysolin.com">Solin</InlineLink>,{" "}
          <InlineLink href="https://usefable.ca">Fable</InlineLink>, and whatever else seems worth building
          that week. GTM Engineer Intern at @<InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
          My DMs are open on{" "}
          <InlineLink href="https://x.com/dndharsh0">X</InlineLink>, my code is on{" "}
          <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>, my hackathon stuff is on{" "}
          <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>, and I write occasionally on
          the <InlineLink href="/blog">blog</InlineLink>. Reach me by{" "}
          <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> any time.
        </p>

        <p className="mt-10 text-[12px] tracking-wide text-[var(--ink-soft)]">
          Toronto, Ontario · <LiveClock />
        </p>
      </div>
    </main>
  );
}
