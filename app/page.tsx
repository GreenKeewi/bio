import type { ReactNode } from "react";
import LiveClock from "./components/LiveClock";
import { RippleWord } from "./components/PixelRipple";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href}>{children}</a>;
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col justify-center px-6 py-16 sm:px-8">
      <header>
        <h1 className="text-xl font-medium text-[var(--ink)]">harsh</h1>
        <p className="mt-4">
          I&apos;m 15 and I build websites and apps. I&apos;ve been coding since I was 9.
        </p>
      </header>

      <section className="mt-8" aria-labelledby="work-heading">
        <h2 id="work-heading" className="font-medium text-[var(--ink)]">Work</h2>
        <p className="mt-2">
          I&apos;m an engineering intern at <InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
          I&apos;ve also worked with <InlineLink href="https://x.com/HomeDepot">The Home Depot</InlineLink> and{" "}
          <InlineLink href="https://x.com/NEEIOnline">NEE</InlineLink>.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="font-medium text-[var(--ink)]">Projects</h2>
        <p className="mt-2">
          <InlineLink href="https://folia-notes.vercel.app/">Folia</InlineLink>,{" "}
          <InlineLink href="https://heysolin.com">Solin</InlineLink>, and{" "}
          <InlineLink href="https://usefable.ca">Fable</InlineLink>.
        </p>
      </section>

      <section className="mt-8" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="font-medium text-[var(--ink)]">Say hello</h2>
        <p className="mt-2">
          Send me an <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> or a message on{" "}
          <InlineLink href="https://x.com/harshTalksAI">X</InlineLink>.
        </p>
        <nav aria-label="More about me" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>
          <InlineLink href="https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ">YouTube</InlineLink>
          <InlineLink href="https://www.instagram.com/harshtalksai/">Instagram</InlineLink>
          <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>
          <InlineLink href="/blog">Writing</InlineLink>
        </nav>
      </section>

      <footer className="mt-10 flex flex-wrap gap-x-2 text-sm text-[var(--ink-soft)]">
        <span><RippleWord>Toronto, Canada</RippleWord></span>
        <span aria-hidden="true">·</span>
        <LiveClock />
      </footer>
    </main>
  );
}
