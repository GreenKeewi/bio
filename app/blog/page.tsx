import Link from "next/link";
import { getAllPosts } from "./lib";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 py-16 sm:px-8">
      <Link href="/" className="text-sm text-[var(--ink-soft)]">
        Home
      </Link>

      <h1 className="mt-8 text-xl font-medium text-[var(--ink)]">Writing</h1>
      <div className="mt-4">
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
    </main>
  );
}
