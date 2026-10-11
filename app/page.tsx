import type { ReactNode } from "react";
import LiveClock from "./components/LiveClock";
import { RippleWord } from "./components/PixelRipple";

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <a className="inline-link" href={href}>{children}</a>;
}

export default function Home() {
  return (
    <main className="home-shell">
      <article className="home-content">
        <header className="home-intro">
          <h1>harsh.</h1>
          <span className="home-domain">harshs.dev</span>
        </header>

        <div className="home-copy">
          <p>
            I&apos;m Harsh. I&apos;m 15.
            I build websites and apps, and I&apos;ve been coding since I was 9.
          </p>

          <p>
            I&apos;m an engineering intern at <InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
            I&apos;ve also worked with <InlineLink href="https://x.com/HomeDepot">The Home Depot</InlineLink> and{" "}
            <InlineLink href="https://x.com/NEEIOnline">NEE</InlineLink>.
          </p>

          <p>
            A few things I&apos;ve made: <InlineLink href="https://lumee.harshs.dev">Lumee</InlineLink>,{" "}
            <InlineLink href="https://heysolin.com">Solin</InlineLink>, and{" "}
            <InlineLink href="https://usefable.ca">Fable</InlineLink>.
          </p>

          <p>
            Got a fun idea? Say hi by <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> or on{" "}
            <InlineLink href="https://x.com/harshTalksAI">X</InlineLink>.
          </p>
          <p>
            Find me on <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>,{" "}
            <InlineLink href="https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ">YouTube</InlineLink>,{" "}
            <InlineLink href="https://www.instagram.com/harshtalksai/">Instagram</InlineLink>, and{" "}
            <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>. Sometimes I{" "}
            <InlineLink href="/blog">write</InlineLink>, too.
          </p>
        </div>

        <footer className="home-footer">
          <div className="home-location">
            <RippleWord>Toronto, Canada</RippleWord>
            <span aria-hidden="true">·</span>
            <LiveClock />
          </div>
        </footer>
      </article>
      <div className="home-landscape" aria-hidden="true" />
    </main>
  );
}
