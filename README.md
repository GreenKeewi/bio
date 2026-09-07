# harsh.bio

Personal landing page and portfolio, built with Next.js (App Router) and Tailwind CSS v4. A single-page "desktop" style UI with a small MDX-powered blog.

## Features

- Bio + social links, with live scaled-iframe previews of featured projects (falls back gracefully for sites that block embedding)
- "Side quests" list of smaller/archived projects
- Blog at `/blog`, written in MDX with GitHub-flavored markdown, LaTeX (via `remark-math`/`rehype-katex`), and Mermaid diagram support
- Custom "Mac window" chrome, ASCII background, and a menu bar shared across pages

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
  page.tsx           # landing page (bio, project cards, links — edit the data arrays here)
  layout.tsx          # root layout, fonts, global chrome
  components/         # MacWindow, AsciiBackground, MenuBar, FadeIn, Mermaid, MdxCodeBlock
  blog/
    page.tsx          # blog index
    [slug]/page.tsx   # individual post route
    lib.ts            # reads/parses posts from content/blog
content/
  blog/*.mdx           # blog post source files
```

To add or edit a project, social link, or "side quest," edit the `PROJECTS` / `LINKS` / `MINOR_PROJECTS` arrays at the top of `app/page.tsx`. To add a blog post, drop a new `.mdx` file into `content/blog/` with the same frontmatter shape as the existing posts.

## Deployment

Deployed on [Vercel](https://vercel.com); pushing to the main branch triggers a deploy.
