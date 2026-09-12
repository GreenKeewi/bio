import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import MenuBar from "./components/MenuBar";
import AsciiBackground from "./components/AsciiBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const NAME = "harsh";

export const metadata: Metadata = {
  title: NAME,
  openGraph: {
    title: NAME,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AsciiBackground />
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
