import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Reuse the site's typeface and artwork; export a static image for all hosts.
const font = await readFile(new URL("../public/fonts/inter-latin-variable.woff2", import.meta.url));
const panda = await readFile(new URL("../public/art/red-panda-ascii.png", import.meta.url));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html>
    <html lang="en"><head><style>
      @font-face { font-family: Inter; src: url(data:font/woff2;base64,${font.toString("base64")}) format('woff2'); font-weight: 100 900; }
      * { box-sizing: border-box; }
      body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #fdfcf9; color: #392820; font-family: Inter, sans-serif; }
      main { position: relative; width: 100%; height: 100%; padding: 64px; }
      .copy { position: relative; z-index: 1; padding-top: 80px; }
      h1 { margin: 0 0 24px; font-size: 64px; line-height: 1.08; letter-spacing: -3px; font-weight: 500; }
      p { margin: 0; font-size: 30px; line-height: 1.45; letter-spacing: -0.7px; }
      .location { margin-top: 26px; font-size: 20px; color: #735847; letter-spacing: 0; }
      .domain { position: absolute; bottom: 56px; left: 64px; font-size: 22px; color: #9c4524; }
      img { position: absolute; width: 550px; height: 550px; right: 4px; top: 40px; mix-blend-mode: multiply; }
    </style></head><body><main>
      <div class="copy"><h1>hey, i'm harsh.</h1><p>i build websites<br>and apps.</p><p class="location">based in Toronto, Canada</p></div>
      <img alt="my ASCII red panda" src="data:image/png;base64,${panda.toString("base64")}">
      <p class="domain">harshs.dev</p>
    </main></body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
  });
  await page.screenshot({ path: fileURLToPath(new URL("../public/og-image.png", import.meta.url)), type: "png" });
} finally {
  await browser.close();
}
