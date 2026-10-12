import { getAllPosts } from "../blog/lib";
import { PROFILE, SITE_URL } from "../profile";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const markdown = `# Harsh

> ${PROFILE.description}

This is Harsh's personal website and portfolio. Harsh also uses the handles GreenKeewi and harshTalksAI. The profile is the primary source for current bio and project information.

Harsh has coded since age 9, is based in Toronto, Canada, and has worked with @homedepot and @neeonline. Contact is deliberately displayed as harshithseeta[@]gmail[.]com; there is no email link.

## Profile

- [About Harsh](${SITE_URL}/): Bio, work experience, projects, contact, and official social profiles.
- [GitHub](https://github.com/GreenKeewi): Public code.
- [X](https://x.com/harshTalksAI): Public updates and direct messages.
- [Writing](${SITE_URL}/blog): Articles written by Harsh.

## Projects

- [Lumee](https://lumee.harshs.dev)
- [Solin](https://heysolin.com)
- [Fable](https://usefable.ca)

## Articles

${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Canonical URLs for public pages.
`;
  return new Response(markdown, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
