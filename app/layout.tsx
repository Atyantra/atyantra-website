import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const title = "Atyantra — Remove the ceiling on network operations";
const description =
  "AutoNaaS is an AI-native NOC engineering platform: autonomous discovery, diagnosis, and change preparation across the full ITIL lifecycle, with human authorization as the immutable control point.";

export const metadata: Metadata = {
  metadataBase: new URL("https://atyantra.io"),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Atyantra" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable}`}
    >
      <body className="bg-ground text-ink font-sans antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
