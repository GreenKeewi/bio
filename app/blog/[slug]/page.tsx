import "katex/dist/katex.min.css";
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
        {frontmatter.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frontmatter.image}
            alt=""
            className="mb-6 w-full rounded-md border border-[var(--line)] object-cover"
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

        <div className="prose-blog pt-6 text-[13.5px] leading-relaxed text-[var(--ink)]">
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
