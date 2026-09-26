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
    <main className="mx-auto flex min-h-full w-full max-w-[540px] flex-col px-5 py-10 sm:px-8 sm:py-12">
      <div className={`t-fade my-auto ${shown ? "is-shown" : ""}`}>
        <div className="max-w-lg space-y-4 text-[14px] leading-[1.75] text-[var(--ink-dim)]">
          <p>
            I&apos;m harsh👋, a 15-year-old founder/engineer based in <RippleWord>Toronto</RippleWord>. I&apos;ve been a
            dev since I was 9, started with HTML &amp; CSS, then to python, and now I&apos;m stuck with React and
            NextJS.
          </p>

          <p>
            I&apos;ve shipped <InlineLink href="https://folia-notes.vercel.app/">Folia</InlineLink>,{" "}
            <InlineLink href="https://heysolin.com">Solin</InlineLink>,{" "}
            <InlineLink href="https://usefable.ca">Fable</InlineLink>, and whatever else seems worth building
            that week.
          </p>

          <p>
            Currently GTM Engineer Intern at @<InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
            Worked with <InlineLink href="https://x.com/HomeDepot">@TheHomeDepot</InlineLink>, and{" "}
            <InlineLink href="https://x.com/NEEIOnline">@NEE</InlineLink>.
          </p>

          <p>
            My DMs are open on <InlineLink href="https://x.com/dndharsh0">X</InlineLink>, my code is on{" "}
            <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>, my hackathon stuff on{" "}
            <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>, and I write occasionally on
            the <InlineLink href="/blog">blog</InlineLink>. Reach me by{" "}
            <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> any time.
          </p>
        </div>

        <p className="mt-7 text-[11px] tracking-wide text-[var(--ink-soft)]">
          Toronto, Ontario · <LiveClock />
        </p>
      </div>
    </main>
  );
}
