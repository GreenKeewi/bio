# harsh's bio site

Personal landing page / portfolio for GreenKeewi, built with Next.js App Router. Single-page "desktop" UI (`MacWindow` chrome, ASCII background, menu bar) plus a small MDX-powered blog.

## Structure

- `app/page.tsx` — the whole landing page: bio, project cards (`PROJECTS`) with live iframe previews (`ScaledPreview`/tilt cards), a "side quests" list of minor projects (`MINOR_PROJECTS`), and social links (`LINKS`). Content is defined as plain data arrays at the top of the file — edit those, not the render logic, when adding/removing a project or link.
- `app/layout.tsx` — root layout, fonts (Geist + Playfair Display), global `MenuBar` and `AsciiBackground`.
- `app/components/` — `MacWindow` (window chrome shell used by every page), `AsciiBackground`, `MenuBar`, `FadeIn`, `Mermaid` (renders Mermaid diagrams in MDX), `MdxCodeBlock`.
- `app/blog/` — blog index (`page.tsx`) and post route (`[slug]/page.tsx`); `lib.ts` reads posts from `content/blog/*.mdx` via `gray-matter` + `next-mdx-remote`, with `remark-gfm`, `remark-math`/`rehype-katex` for LaTeX, and Mermaid support.
- `content/blog/*.mdx` — blog post source files (frontmatter: title, date, excerpt, etc. — see an existing post for the shape).

## Notes for future edits

- Some project cards preview the live site in a scaled iframe (`preview` defaults to true); set `preview: false` when a site blocks framing (X-Frame-Options/CSP) — see the Solin entry for the pattern — and it falls back to `NoPreview`.
- Styling uses Tailwind v4 with CSS custom properties for theme colors (`--ink`, `--ink-soft`, `--plate`, `--line`, etc.) defined in `globals.css` — reuse these tokens rather than hardcoding colors.
- No test suite or CI config in this repo; verify changes with `npm run dev` and `npm run lint`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
