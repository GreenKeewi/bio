import { mkdir, readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { checkUrl, checkPage, checkInteractions } from "lintapple";

const base = process.env.UI_BASE_URL || "http://127.0.0.1:3001";
const policy = JSON.parse(await readFile("ui-policy.json", "utf8"));
const routes = ["/", "/blog", "/blog/parallel-agents", "/blog/how-i-got-my-first-startup-internship"];
const reports = [];

for (const route of routes) {
  const home = route === "/";
  const report = await checkUrl(new URL(route, base).href, policy, {
    ready: home ? ".home-content" : route === "/blog/parallel-agents" ? ".mermaid-diagram svg" : ".blog-page h1",
  });
  reports.push({ route, ...report });
  console.log(`${route}: ${report.findings.length} findings`);
  for (const finding of report.findings) console.log(`  ${finding.rule}: ${finding.selector}\n  ${finding.message}`);
}

// The CLI checks reduced motion. Exercise live motion separately on desktop.
const browser = await chromium.launch();
try {
  const mathPage = await browser.newPage();
  await mathPage.goto(new URL("/blog/parallel-agents", base).href);
  const mathColors = await mathPage.locator(".katex-html").evaluateAll((nodes) => nodes.map((node) => ({ ink: getComputedStyle(node).color, paper: getComputedStyle(document.documentElement).backgroundColor })));
  assert.ok(mathColors.length, "The math route must render its equations.");
  for (const colors of mathColors) {
    assert.equal(colors.ink, "rgb(57, 40, 32)", "Math symbols must use the approved chocolate ink.");
    assert.equal(colors.paper, "rgb(251, 245, 235)", "Math symbols must use the cream page background (12.92:1 contrast).");
  }
  await mathPage.close();
  for (const viewport of policy.viewports) {
    const context = await browser.newContext({ viewport, colorScheme: "light", reducedMotion: "no-preference" });
    const page = await context.newPage();
    const artworkRequests = [];
    page.on("request", (request) => {
      if (request.url().includes("/art/red-panda-ascii")) artworkRequests.push(request.url());
    });
    await page.goto(base);
    await page.locator(".home-content").waitFor();
    assert.equal(await page.locator('a[href^="mailto:"]').count(), 0, "Contact must not be an email link.");
    assert.equal(await page.locator(".home-email").textContent(), "harshithseeta[@]gmail[.]com");
    if (viewport.width <= 768) {
      assert.ok(await page.locator(".home-art").isHidden(), "ASCII artwork must stay hidden on phones.");
      const initial = await checkPage(page, policy);
      const interaction = await checkInteractions(page, { focus: [{ selector: '.home-socials a[href="/blog"]' }, { selector: ".home-location button" }] }, policy);
      assert.equal(artworkRequests.length, 0, "Phones should not download the ASCII image or data.");
      const findings = [...initial.findings, ...interaction.findings];
      reports.push({ route: "/ (phone footer and contact)", viewport, findings, initial, interaction });
      console.log(`Phone footer (${viewport.width}px): ${findings.length} findings; no ASCII download, obfuscated contact, and keyboard focus verified.`);
      await context.close();
      continue;
    }
    await page.locator(".panda-canvas.is-ready").waitFor();
    assert.equal(await page.locator(".home-art button").count(), 0, "The panda must have no pause/play button.");
    const initial = await checkPage(page, policy);
    const interaction = await checkInteractions(page, {
      focus: [{ selector: '.home-socials a[href="/blog"]' }, { selector: ".home-location button" }],
    }, policy);
    const capture = () => page.locator(".panda-canvas").evaluate((canvas) => canvas.toDataURL());
    const moving = await capture();
    await page.waitForTimeout(300);
    assert.notEqual(await capture(), moving, "The colored ASCII panda must animate.");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(100);
    const still = await capture();
    await page.waitForTimeout(300);
    assert.equal(await capture(), still, "Reduced motion must keep the panda still.");
    const findings = [...initial.findings, ...interaction.findings];
    reports.push({ route: "/ (animation and footer focus)", viewport, findings, initial, interaction });
    console.log(`Panda (${viewport.width}px): ${findings.length} findings; motion, reduced motion, no playback button, and footer focus verified.`);
    await context.close();
  }
} finally {
  await browser.close();
}

await mkdir(".playwright-mcp", { recursive: true });
await writeFile(".playwright-mcp/lintapple-routes.json", JSON.stringify(reports, null, 2));
const count = reports.reduce((sum, report) => sum + report.findings.length, 0);
console.log(`${count ? "Failed" : "Passed"}: ${count} findings across ${routes.length} routes at phone and desktop sizes, including motion and footer focus.`);
process.exitCode = count ? 1 : 0;
