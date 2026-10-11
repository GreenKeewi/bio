import type { ReactNode } from "react";
import Image from "next/image";
import LiveClock from "./components/LiveClock";
import { RippleWord } from "./components/PixelRipple";

const LINK_ICONS: Record<string, string> = {
  "https://lumee.harshs.dev": "lumee",
  "https://x.com/HomeDepot": "homedepot",
  "https://github.com/GreenKeewi": "github",
  "https://www.instagram.com/harshtalksai/": "instagram",
  "https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ": "youtube",
  "https://x.com/harshTalksAI": "x",
  "https://devpost.com/GreenKeewi": "devpost",
};

function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const icon = LINK_ICONS[href];
  return (
    <a className={`inline-link${icon ? " has-icon" : ""}`} href={href}>
      {children}
      {icon && (
        <span className="link-icon" aria-hidden="true">
          <Image src={`/link-icons/${icon}.svg`} width={24} height={24} alt="" unoptimized />
        </span>
      )}
    </a>
  );
}

export default function Home() {
  return (
    <main className="home-shell">
      <div className="big-dipper" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => <span key={index} />)}
      </div>
      <article className="home-content">
        <header className="home-intro">
          <h1>harsh.</h1>
          <span className="home-domain">harshs.dev</span>
        </header>

        <div className="home-copy">
          <p>
            I&apos;m Harsh, a 15-year-old who builds websites and apps.
            I&apos;ve been coding since I was 9.
          </p>

          <p>
            I&apos;m currently an engineering intern at <InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
            I&apos;ve also worked with <InlineLink href="https://x.com/HomeDepot">The Home Depot</InlineLink> and{" "}
            <InlineLink href="https://x.com/NEEIOnline">NEE</InlineLink>.
          </p>

          <p>
            I&apos;ve built <InlineLink href="https://lumee.harshs.dev">Lumee</InlineLink>,{" "}
            <InlineLink href="https://heysolin.com">Solin</InlineLink>, and{" "}
            <InlineLink href="https://usefable.ca">Fable</InlineLink>.
          </p>

          <p>
            Have an idea? Say hi by <InlineLink href="mailto:harshithseeta@gmail.com">email</InlineLink> or on{" "}
            <InlineLink href="https://x.com/harshTalksAI">X</InlineLink>.
          </p>
          <p>
            Elsewhere: <InlineLink href="https://github.com/GreenKeewi">GitHub</InlineLink>,{" "}
            <InlineLink href="https://www.youtube.com/channel/UCUSQ134t1G9XRf3x9oY-1wQ">YouTube</InlineLink>,{" "}
            <InlineLink href="https://www.instagram.com/harshtalksai/">Instagram</InlineLink>, and{" "}
            <InlineLink href="https://devpost.com/GreenKeewi">Devpost</InlineLink>. I also{" "}
            <InlineLink href="/blog">write</InlineLink>.
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
    </main>
  );
}
