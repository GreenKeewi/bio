import type { Metadata } from "next";
import TreeWorld from "./components/tree/TreeWorld";
import { buildTree } from "./components/tree/content";
import { worldHTML } from "./components/tree/world";
import { getAllPosts } from "./blog/lib";
import { PROFILE, SITE_URL } from "./profile";

export const metadata: Metadata = { alternates: { canonical: SITE_URL } };

export default function Home() {
  const posts = getAllPosts().map(({ slug, title, date }) => ({ slug, title, date }));
  const { signs, stations } = buildTree(posts);
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: PROFILE.title,
    description: PROFILE.description,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#harsh`,
      name: PROFILE.name,
      image: `${SITE_URL}/portrait.png`,
      alternateName: ["GreenKeewi", "harshTalksAI"],
      url: SITE_URL,
      description: PROFILE.description,
      homeLocation: { "@type": "City", name: "Toronto, Canada" },
      sameAs: ["https://x.com/harshTalksAI", "https://github.com/GreenKeewi"],
    },
  };
  return (
    <main id="main-content">
      <h1 className="sr-only">{PROFILE.title}</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, "\u003c") }} />
      <TreeWorld html={worldHTML()} signs={signs} stations={stations} />
    </main>
  );
}
