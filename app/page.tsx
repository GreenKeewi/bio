import type { ReactNode } from "react";
import LiveClock from "./components/LiveClock";
import { RippleWord } from "./components/PixelRipple";

function InlineLink({
  href,
  children,
  tone = "blue",
}: {
  href: string;
  children: ReactNode;
  tone?: "blue" | "coral" | "green" | "purple";
}) {
  return <a className={`link-${tone}`} href={href}>{children}</a>;
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-6 py-12 sm:px-8">
      <h1 className="sr-only">Harsh</h1>
      <div className="space-y-3">
        <p className="text-base">
          hey, I&apos;m <span className="text-[var(--accent-coral)] font-medium">Harsh</span>. I&apos;m 15.
          I build websites and apps, and I&apos;ve been coding since I was 9.
        </p>

        <p>
          I&apos;m an engineering intern at <InlineLink tone="purple" href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
          I&apos;ve also worked with <InlineLink href="https://x.com/HomeDepot">The Home Depot</InlineLink> and{" "}
          <InlineLink href="https://x.com/NEEIOnline">NEE</InlineLink>.
        </p>

        <p>
          A few things I&apos;ve made: <InlineLink tone="green" href="https://lumee.harshs.dev">Lumee</InlineLink>,{" "}
          <InlineLink tone="purple" href="https://heysolin.com">Solin</InlineLink>, and{" "}
          <InlineLink tone="coral" href="https://usefable.ca">Fable</InlineLink>.
        </p>

        <p>
          Got a fun idea? Say hi by <InlineLink tone="coral" href="mailto:harshithseeta@gmail.com">email</InlineLink> or on{" "}
          <InlineLink href="https://x.com/harshTalksAI">X</InlineLink>.
        </p>
        <p>
          Find me on <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>,{" "}
          <InlineLink tone="coral" href="https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ">YouTube</InlineLink>,{" "}
          <InlineLink tone="purple" href="https://www.instagram.com/harshtalksai/">Instagram</InlineLink>, and{" "}
          <InlineLink tone="green" href="https://devpost.com/GreenKeewi">Devpost</InlineLink>. Sometimes I{" "}
          <InlineLink tone="green" href="/blog">write</InlineLink>, too.
        </p>
      </div>

      <footer className="mt-5 flex flex-wrap gap-x-2 text-sm text-[var(--ink-soft)]">
        <span><RippleWord>Toronto, Canada</RippleWord></span>
        <span aria-hidden="true">·</span>
        <LiveClock />
      </footer>
    </main>
  );
}
