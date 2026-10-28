import type { Metadata } from "next";
import "./globals.css";
import { OG_IMAGE, PROFILE, SITE_URL } from "./profile";

export const metadata: Metadata = {
  title: { default: PROFILE.title, template: "%s | harsh" },
  description: PROFILE.description,
  metadataBase: new URL(SITE_URL),
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: PROFILE.title,
    description: PROFILE.description,
    siteName: "Harsh",
    url: SITE_URL,
    locale: "en_CA",
    type: "profile",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: "@harshTalksAI",
    creator: "@harshTalksAI",
    title: PROFILE.title,
    description: PROFILE.description,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
