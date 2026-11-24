// Social preview: a screenshot of the real tree homepage (trunk view) from the
// static export. Run `npm run build` first, then `node scripts/generate-og.mjs`.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const OUT = fileURLToPath(new URL("../out", import.meta.url));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png" };

const server = createServer(async (req, res) => {
  let p = join(OUT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  try {
    if ((await stat(p)).isDirectory()) p = join(p, "index.html");
  } catch {
    p += ".html";
  }
  try {
    res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
    res.end(await readFile(p));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, r));
const { port } = server.address();

const browser = await chromium.launch({ channel: process.env.OG_BROWSER_CHANNEL || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: ".tree-nav, .tree-theme, .tree-where, .tree-cursor { display: none !important; } .tree-top { top: 32px; left: 40px; font-size: 18px; }" });
  await page.waitForSelector(".tree-world.is-ready");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: fileURLToPath(new URL("../public/og-image.png", import.meta.url)), type: "png" });
} finally {
  await browser.close();
  server.close();
}
