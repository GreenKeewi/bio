import { getAllPosts } from "../blog/lib";
import { PROFILE, SITE_URL } from "../profile";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const markdown = `# Harsh

> ${PROFILE.description}

this is my personal website. i also go by GreenKeewi and harshTalksAI. this is where i keep my bio, projects, and writing.

i've been coding since i was 9, and i've worked with @homedepot and @neeonline. you can reach me at harshithseeta[@]gmail[.]com.

## Profile

- [About me](${SITE_URL}/): My bio, work, projects, and contact details.
- [GitHub](https://github.com/GreenKeewi): My code.
- [X](https://x.com/harshTalksAI): My updates and DMs.
- [My writing](${SITE_URL}/blog): What I'm building and learning.

## Projects

- [Lumee](https://lumee.harshs.dev)
- [Solin](https://heysolin.com)
- [Fable](https://usefable.ca)
- [i need investors](https://ineedinvestors.vercel.app/)

## Articles

${posts.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): Canonical URLs for public pages.
`;
  return new Response(markdown, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
