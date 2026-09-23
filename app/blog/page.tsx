import Link from "next/link";
import FadeIn from "../components/FadeIn";
import { getAllPosts } from "./lib";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 py-16 sm:px-8">
      <FadeIn>
        <Link href="/" className="text-[13px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">
          ← harsh
        </Link>

        <div className="mt-10">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group block py-4 no-underline ${i > 0 ? "border-t border-[var(--line)]" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-[15px] font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--ink-soft)]">
                  {post.title}
                </h2>
                <span className="shrink-0 text-[12px] text-[var(--ink-soft)]">{post.date}</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ink-soft)]">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}
