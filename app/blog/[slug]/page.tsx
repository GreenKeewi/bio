import "katex/dist/katex.min.css";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
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
    <main className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 py-16 sm:px-8">
      <FadeIn>
        <Link href="/blog" className="text-[13px] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">
          ← blog
        </Link>

        {frontmatter.image && (
          <Image
            src={frontmatter.image}
            alt=""
            width={128}
            height={72}
            sizes="128px"
            className="blog-cover mx-auto mt-8 mb-2 aspect-[16/9] w-full max-w-xl rounded-[2rem] border border-[var(--line)] object-cover shadow-[0_12px_32px_rgba(0,0,0,0.28)] grayscale contrast-125 brightness-90"
          />
        )}

        <header className="mt-8">
          <h1 className="font-[family-name:var(--font-serif)] text-2xl leading-tight tracking-tight text-[var(--ink-dim)] sm:text-3xl">
            {frontmatter.title}
          </h1>
          <p className="mt-1.5 text-[12px] text-[var(--ink-soft)]">{frontmatter.date}</p>
        </header>

        <div className="prose-blog mx-auto max-w-[68ch] pt-7 text-[14px] leading-7 text-[var(--ink-dim)] sm:text-[15px] sm:leading-8">
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
    </main>
  );
}
