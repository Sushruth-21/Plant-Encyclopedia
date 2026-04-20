import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBubble from "@/components/chat/ChatBubble";
import AgriMitraWidget from "@/components/chat/AgriMitraWidget";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FloraBase — Plant Encyclopedia",
    template: "%s | FloraBase",
  },
  description:
    "Explore 10,000+ plant species with detailed care guides, growth predictions, disease solutions, and AI-powered assistance. Your complete botanical companion.",
  keywords: [
    "plants",
    "encyclopedia",
    "gardening",
    "botanical",
    "care guide",
    "plant diseases",
    "fertilizer",
    "indoor plants",
    "outdoor plants",
  ],
  openGraph: {
    title: "FloraBase — Plant Encyclopedia",
    description:
      "Explore 10,000+ plant species with detailed care guides, growth predictions, and AI assistance.",
    type: "website",
    locale: "en_US",
    siteName: "FloraBase",
  },
  twitter: {
    card: "summary_large_image",
    title: "FloraBase — Plant Encyclopedia",
    description:
      "Explore 10,000+ plant species with detailed care guides and AI assistance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 relative z-[1]">{children}</main>
          <Footer />
          <ChatBubble />
          <AgriMitraWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
