import "katex/dist/katex.min.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import MacWindow from "../../components/MacWindow";
import FadeIn from "../../components/FadeIn";
import { Pre } from "../../components/MdxCodeBlock";
import { getAllPosts, getPostBySlug } from "../lib";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <MacWindow title={frontmatter.title} className="[&>div]:max-w-2xl">
      <FadeIn className="px-5 py-6 sm:px-8 sm:py-8">
        <Link
          href="/blog"
          className="mb-5 inline-flex text-[11px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ink)]"
          >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m14 6-6 6 6 6" />
            <path d="M8 12h11" />
          </svg>
          Back to blog
        </Link>
        {frontmatter.image && (
          <Image
            src={frontmatter.image}
            alt=""
            width={128}
            height={72}
            sizes="128px"
            className="blog-cover mx-auto mb-8 aspect-[16/9] w-full max-w-xl rounded-[2rem] border border-[var(--line)] object-cover shadow-[0_12px_32px_rgba(0,0,0,0.28)] grayscale contrast-125 brightness-90"
          />
        )}

        <header className="border-b border-[var(--line)] pb-6">
          <h1 className="font-[family-name:var(--font-serif)] italic text-2xl leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            {frontmatter.date}
          </p>
        </header>

        <div className="prose-blog mx-auto max-w-[68ch] pt-7 text-[14px] leading-7 text-[var(--ink)] sm:text-[15px] sm:leading-8">
          <MDXRemote
            source={content}
            components={{ pre: Pre }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>
      </FadeIn>
    </MacWindow>
  );
}
