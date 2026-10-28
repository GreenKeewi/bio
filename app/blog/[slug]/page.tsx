import "katex/dist/katex.min.css";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Pre } from "../../components/MdxCodeBlock";
import { getAllPosts, getPostBySlug } from "../lib";
import { OG_IMAGE, PROFILE, SITE_URL } from "../../profile";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { title, excerpt, date } = post.frontmatter;
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title,
    description: excerpt,
    alternates: { canonical: url },
    openGraph: { title, description: excerpt, url, type: "article", publishedTime: date, authors: [SITE_URL], images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description: excerpt, images: [OG_IMAGE] },
  };
}

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
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    url: `${SITE_URL}/blog/${slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    author: { "@type": "Person", "@id": `${SITE_URL}/#harsh`, name: PROFILE.name, url: SITE_URL },
  };

  return (
    <main className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 py-16 sm:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} />
      <Link href="/blog" className="text-sm text-[var(--ink-soft)]">
        All writing
      </Link>

      <header className="mt-8">
        <h1 className="text-2xl leading-tight tracking-tight text-[var(--ink)] sm:text-3xl">
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
    </main>
  );
}
