# harshs.dev

Personal website at https://harshs.dev, built with Next.js (App Router) and Tailwind CSS v4. A simple text page with a small MDX-powered blog.

## Features

- Short bio, work experience, project links, and contact links
- Text-first layout with a barely tinted off-white background, brown/rust palette, self-hosted Inter typography, and a single-row social/location footer
- Animated coloured ASCII red panda, converted from an original high-resolution image, with no playback button, reduced-motion support, and a static fallback
- Compact mobile footer; ASCII artwork and its downloads are disabled on phones
- Crawlable HTML, canonical page metadata, ProfilePage/Person and BlogPosting structured data, a generated sitemap, and `llms.txt`
- Live local time in Toronto, Canada, using the America/Toronto time zone
- Custom 404 with a sleepy 3D asterisk, a message bubble, and a blue home link
- Blog at `/blog`, written in MDX with GitHub-flavored markdown, LaTeX (via `remark-math`/`rehype-katex`), and Mermaid diagram support
- A pixel ripple on the location text

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # export the production site to out/
npm run lint    # eslint
npm run lint:ui # lintapple: all routes, phone/desktop, panda interaction states
```

## Project structure

```
app/
  page.tsx           # landing page (bio, work experience, project and contact links)
  layout.tsx          # root layout and metadata for harshs.dev
  components/         # AsciiRedPanda, LiveClock, PixelRipple, Mermaid, MDX renderers
  blog/
    page.tsx          # blog index
    [slug]/page.tsx   # individual post route
    lib.ts            # reads/parses posts from content/blog
content/
  blog/*.mdx           # blog post source files
```

To edit the bio, work experience, projects, or links, edit `app/page.tsx`. To add a blog post, drop a new `.mdx` file into `content/blog/` with the same frontmatter shape as the existing posts.

For rendered UI checks, run `npm run dev -- --port 3001`, then `npm run lint:ui`. Set `UI_BASE_URL` to check a different local URL. Reports are saved in `.playwright-mcp/lintapple-routes.json`. The policy includes narrow exceptions for KaTeX's fonts and non-text math glyphs, with mathematical foreground contrast checked separately. The original panda source and conversion details are in `assets/red-panda/README.md`; the ASCII converter requires Python and Pillow but is not needed to build or deploy the site.

Bio age and machine-readable description live in `app/profile.ts`. Public crawlers are allowed through `robots.txt`; `/sitemap.xml` lists all pages and `/llms.txt` provides a concise Markdown profile and article index. These make the published content accessible for discovery; they do not guarantee ranking or AI citations. The obfuscated email is retained in visible copy and the AI index, with no raw address in JSON-LD. References: [OpenAI crawler guidance](https://developers.openai.com/api/docs/bots), [Google ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page), and [llms.txt proposal](https://llmstxt.org/).

## Deployment

Deploy on Cloudflare Workers with these build settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `master`

Next.js is configured with `output: "export"`, so each build generates the static HTML, CSS, JavaScript, and public assets in `out/`. `wrangler.jsonc` deploys that directory as static assets for the `bio` Worker, with clean HTML URLs and the exported 404 page. No OpenNext adapter is needed.

To preview the production export locally, run `npm run build` followed by `npx wrangler dev`; `next start` does not support static exports. To deploy manually, run `npm run build` followed by `npx wrangler deploy`.

Cloudflare Pages can also host the export: use `npm run build` as the build command and `out` as the build output directory, with no Wrangler deploy command.
