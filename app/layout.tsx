import type { Metadata } from "next";
import "./globals.css";
import { PROFILE, SITE_URL } from "./profile";

const TITLE = "Harsh — developer and builder in Toronto";

export const metadata: Metadata = {
  title: { default: "harsh", template: "%s | harsh" },
  description: PROFILE.description,
  metadataBase: new URL(SITE_URL),
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: TITLE,
    description: PROFILE.description,
    siteName: "Harsh",
    url: SITE_URL,
    locale: "en_CA",
    type: "profile",
  },
  twitter: {
    card: "summary",
    site: "@harshTalksAI",
    creator: "@harshTalksAI",
    title: TITLE,
    description: PROFILE.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
