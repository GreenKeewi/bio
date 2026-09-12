import Link from "next/link";
import MacWindow from "../components/MacWindow";
import FadeIn from "../components/FadeIn";
import { getAllPosts } from "./lib";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <MacWindow title="harsh.blog" className="[&>div]:max-w-2xl">
      <FadeIn className="px-5 py-6 sm:px-8 sm:py-8">
        <header className="border-b border-[var(--line)] pb-6">
          <Link
            href="/"
            className="mb-5 inline-flex text-[11px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m14 6-6 6 6 6" />
              <path d="M8 12h11" />
            </svg>
            Back to home
          </Link>
          <h1 className="font-[family-name:var(--font-serif)] italic text-2xl leading-none tracking-tight text-[var(--ink)] sm:text-3xl">
            Blog
          </h1>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            Notes, mostly true
          </p>
        </header>

        <div className="pt-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border-b border-[var(--line)] py-5 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="t-shimmer cursor-default text-[15px] font-medium" data-text={post.title}>
                  {post.title}
                </h2>
                <span className="shrink-0 text-[10px] tracking-wide text-[var(--ink-soft)]">
                  {post.date}
                </span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--ink-soft)]">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </FadeIn>
    </MacWindow>
  );
}
