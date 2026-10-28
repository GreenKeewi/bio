import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import AsciiRedPanda from "./components/AsciiRedPanda";
import LiveClock from "./components/LiveClock";
import ProjectDetails from "./components/ProjectDetails";
import { RippleWord } from "./components/PixelRipple";
import { PROFILE, SITE_URL } from "./profile";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const PROJECTS = [
  { name: "Lumee", href: "https://lumee.harshs.dev" },
  { name: "Solin", href: "https://heysolin.com" },
  { name: "Fable", href: "https://usefable.ca" },
  {
    name: "i need investors",
    href: "https://ineedinvestors.vercel.app/",
    description: "i got tired of digging through OpenVC and investor spreadsheets, so i built a database of 15k investors for startups across stages and sectors. filter by check size, export to CSV, or connect your AI agent with MCP.",
  },
];

const SOCIAL_LINKS = [
  { name: "x", href: "https://x.com/harshTalksAI" },
  { name: "github", href: "https://github.com/GreenKeewi" },
  { name: "blog", href: "/blog" },
];

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="inline-link" href={href}>{children}</a>;
}

export default function Home() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: PROFILE.title,
    description: PROFILE.description,
    mentions: PROJECTS.map((project) => ({ "@type": "WebSite", name: project.name, url: project.href })),
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#harsh`,
      name: PROFILE.name,
      image: `${SITE_URL}/portrait.png`,
      alternateName: ["GreenKeewi", "harshTalksAI"],
      url: SITE_URL,
      description: PROFILE.description,
      homeLocation: { "@type": "City", name: "Toronto, Canada" },
      sameAs: SOCIAL_LINKS.filter((link) => link.href.startsWith("https:")).map((link) => link.href),
    },
  };
  return (
    <div className="home-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\\u003c") }} />
      <main id="main-content" className="home-stage">
        <article className="home-content" aria-label="about me" data-ui-content data-ui-stack>
          <div className="home-portrait">
            <Image src="/portrait.png" alt="a photo of me" width={72} height={72} loading="eager" unoptimized />
          </div>
          <h1>{PROFILE.title}</h1>
          <p>i&apos;m {PROFILE.age}, based in Toronto, and i&apos;ve been coding since i was 9.</p>
          <p>
            i&apos;m currently a GTM intern at{" "}
            <InlineLink href="https://x.com/dreamworkhq">Dreamwork</InlineLink>.
          </p>
          <p>
            before that, i worked with{" "}
            <InlineLink href="https://x.com/homedepot">@homedepot</InlineLink> and{" "}
            <InlineLink href="https://x.com/neeonline">@neeonline</InlineLink>.
          </p>

          <section className="home-projects" aria-label="my projects">
            <p>things i&apos;ve built:</p>
            <ul>
              {PROJECTS.map((project) => (
                <li key={project.name}>
                  {project.description ? (
                    <ProjectDetails name={project.name} href={project.href} description={project.description} />
                  ) : (
                    <InlineLink href={project.href}>{project.name}</InlineLink>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <p>have an idea? i&apos;d love to hear it.</p>
          <p>
            email me: <span className="home-email">harshithseeta[@]gmail[.]com</span>
          </p>
        </article>
        <AsciiRedPanda />
      </main>

      <footer className="home-footer">
        <nav className="home-socials" aria-label="Elsewhere" data-ui-actions>
          {SOCIAL_LINKS.map((link) => (
            <a key={link.name} href={link.href}>{link.name}</a>
          ))}
        </nav>
        <div className="home-location">
          <RippleWord>Toronto, Canada</RippleWord>
          <span aria-hidden="true">·</span>
          <LiveClock />
        </div>
      </footer>
    </div>
  );
}
