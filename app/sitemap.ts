import type { MetadataRoute } from "next";
import { getAllPosts } from "./blog/lib";
import { SITE_URL } from "./profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/blog` },
    ...getAllPosts().map((post) => ({ url: `${SITE_URL}/blog/${post.slug}` })),
  ];
}
