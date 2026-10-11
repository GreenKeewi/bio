import type { ReactNode } from "react";
import Link from "next/link";
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
  return <a className={`inline-link link-${tone}`} href={href}>{children}</a>;
}

export default function Home() {
  return (
    <main className="home-shell">
      <div className="home-margin-note" aria-hidden="true">a little space<br />for big ideas.</div>
      <article className="home-paper">
        <header className="home-topline">
          <Link href="/" className="home-wordmark">harshs.dev</Link>
          <span>always a work in progress</span>
        </header>

        <div className="home-letter">
          <div className="home-intro">
            <span className="home-eyebrow">a little corner of the internet</span>
            <h1>harsh<span>.</span></h1>
            <span className="home-salutation" aria-hidden="true">hey, you!</span>
          </div>
          <div className="home-copy">
            <p>
              I&apos;m Harsh. I&apos;m 15.
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
        </div>

        <footer className="home-footer">
          <div className="home-location">
            <RippleWord>Toronto, Canada</RippleWord>
            <span aria-hidden="true">·</span>
            <LiveClock />
          </div>
          <span className="home-ripple-note">tap Toronto. make a little ripple.</span>
        </footer>
      </article>
      <p className="home-signoff">made with curiosity. still growing.</p>
    </main>
  );
}
