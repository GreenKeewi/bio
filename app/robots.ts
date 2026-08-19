import type { MetadataRoute } from "next";

// Block known AI crawlers/scrapers from indexing or training on this
// site. Standard search engines are left alone (no blanket disallow).
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Bytespider",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot-Extended",
  "Diffbot",
  "cohere-ai",
  "Omgilibot",
  "Omgili",
  "FacebookBot",
  "meta-externalagent",
  "Amazonbot",
  "YouBot",
  "ImagesiftBot",
  "Timpibot",
  "Webzio-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: AI_BOTS.map((agent) => ({
      userAgent: agent,
      disallow: "/",
    })),
  };
}
