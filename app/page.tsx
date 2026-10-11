import type { ReactNode } from "react";
import LiveClock from "./components/LiveClock";
import { RippleWord } from "./components/PixelRipple";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href}>{children}</a>;
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-6 py-12 sm:px-8">
      <h1 className="sr-only">Harsh</h1>
      <div className="space-y-3">
        <p>
          I&apos;m Harsh, 15. I build websites and apps. I&apos;ve been coding since I was 9.
        </p>

        <p>
          I&apos;m an engineering intern at <InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
          I&apos;ve also worked with <InlineLink href="https://x.com/HomeDepot">The Home Depot</InlineLink> and{" "}
          <InlineLink href="https://x.com/NEEIOnline">NEE</InlineLink>.
        </p>

        <p>
          I&apos;ve built <InlineLink href="https://lumee.harshs.dev">Lumee</InlineLink>,{" "}
          <InlineLink href="https://heysolin.com">Solin</InlineLink>, and{" "}
          <InlineLink href="https://usefable.ca">Fable</InlineLink>.
        </p>

        <p>
          Send me an <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> or a message on{" "}
          <InlineLink href="https://x.com/harshTalksAI">X</InlineLink>.
        </p>
        <p>
          I&apos;m also on <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>,{" "}
          <InlineLink href="https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ">YouTube</InlineLink>,{" "}
          <InlineLink href="https://www.instagram.com/harshtalksai/">Instagram</InlineLink>, and{" "}
          <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>. I write{" "}
          <InlineLink href="/blog">here</InlineLink> sometimes.
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
