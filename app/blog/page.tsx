import Link from "next/link";
import Texture from "../components/tree/Texture";
import type { Metadata } from "next";
import { getAllPosts } from "./lib";
import { OG_IMAGE, SITE_URL } from "../profile";

const TITLE = "my writing";
const DESCRIPTION = "i write about the websites and apps i'm building, what i'm learning at startups, and how i work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title: `${TITLE} | harsh`, description: DESCRIPTION, url: `${SITE_URL}/blog`, type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} | harsh`, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[640px] flex-col px-5 py-16 sm:px-8">
      <Texture />
      <Link href="/" className="text-sm text-[var(--ink-soft)]">
        {"<- trunk"}
      </Link>

      <div className="board mt-8 px-6 py-5">
      <h1 className="text-sm font-semibold tracking-[.08em] text-[var(--ink)]">WRITING <span className="text-[var(--ink-soft)]">{String(posts.length).padStart(2, "0")}</span></h1>
      <div className="mt-3 border-t border-dashed border-[var(--line)]">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group block py-4 no-underline ${i > 0 ? "border-t border-[var(--line)]" : ""}`}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h2 className="text-[15px] font-medium text-[var(--ink)]">
                {post.title}
              </h2>
              <span className="shrink-0 text-[12px] text-[var(--ink-soft)]">{post.date}</span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-soft)]">{post.excerpt}</p>
          </Link>
        ))}
      </div>
      </div>
    </main>
  );
}
