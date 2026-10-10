# harshs.dev

Personal website at https://harshs.dev, built with Next.js (App Router) and Tailwind CSS v4. A simple text page with a small MDX-powered blog.

## Features

- Short bio, work experience, project links, and contact links
- Live local time in Toronto, Canada, using the America/Toronto time zone
- Blog at `/blog`, written in MDX with GitHub-flavored markdown, LaTeX (via `remark-math`/`rehype-katex`), and Mermaid diagram support
- A pixel ripple on the location text; no other page animations

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
```

## Project structure

```
app/
  page.tsx           # landing page (bio, work experience, project and contact links)
  layout.tsx          # root layout and metadata for harshs.dev
  components/         # LiveClock, PixelRipple, Mermaid, MdxCodeBlock
  blog/
    page.tsx          # blog index
    [slug]/page.tsx   # individual post route
    lib.ts            # reads/parses posts from content/blog
content/
  blog/*.mdx           # blog post source files
```

To edit the bio, work experience, projects, or links, edit `app/page.tsx`. To add a blog post, drop a new `.mdx` file into `content/blog/` with the same frontmatter shape as the existing posts.

## Deployment

Deploy on Cloudflare Workers with these build settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Production branch: `master`

Next.js is configured with `output: "export"`, so each build generates the static HTML, CSS, JavaScript, and public assets in `out/`. `wrangler.jsonc` deploys that directory as static assets for the `bio` Worker, with clean HTML URLs and the exported 404 page. No OpenNext adapter is needed.

To preview the production export locally, run `npm run build` followed by `npx wrangler dev`; `next start` does not support static exports. To deploy manually, run `npm run build` followed by `npx wrangler deploy`.

Cloudflare Pages can also host the export: use `npm run build` as the build command and `out` as the build output directory, with no Wrangler deploy command.
