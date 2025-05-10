import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protophysica | スーパーキャパシタの新たな可能性",
  description: "Protophysicaは、スーパーキャパシタの新しい可能性を提示し、デジタルアートの未来を切り開きます。4ZIGENが制作した、高速充放電・環境にやさしい・長寿命のスーパーキャパシタ技術を活用した革新的な作品です。",
  keywords: ["Protophysica", "スーパーキャパシタ", "4ZIGEN", "デジタルアート", "メディアアート", "東京大学制作展", "Protozoa", "Protofly"],
  authors: [
    { name: "4ZIGEN" }
  ],
  creator: "4ZIGEN",
  publisher: "4ZIGEN",
  category: "Art & Technology",
  openGraph: {
    title: "Protophysica | スーパーキャパシタの新たな可能性",
    description: "Protophysicaは、スーパーキャパシタの新しい可能性を提示し、デジタルアートの未来を切り開きます。4ZIGENが制作した革新的な作品です。",
    url: "https://protophysicahp.vercel.app",
    siteName: "Protophysica",
    images: [
      {
        url: "/00.jpeg",
        width: 1200,
        height: 630,
        alt: "Protophysica展示イメージ",
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protophysica | スーパーキャパシタの新たな可能性",
    description: "Protophysicaは、スーパーキャパシタの新しい可能性を提示し、デジタルアートの未来を切り開きます。",
    images: ["/00.jpeg"],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL("https://protophysicahp.vercel.app"),
  alternates: {
    canonical: "https://protophysicahp.vercel.app",
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
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}