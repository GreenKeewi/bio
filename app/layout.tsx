import type { Metadata } from "next";
import "./globals.css";

const NAME = "harsh";
const DESCRIPTION = "I’m Harsh. I build websites and apps in Toronto, Canada.";

export const metadata: Metadata = {
  title: NAME,
  description: DESCRIPTION,
  metadataBase: new URL("https://harshs.dev"),
  openGraph: {
    title: NAME,
    description: DESCRIPTION,
    url: "https://harshs.dev",
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
