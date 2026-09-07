import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aljohn Arranguez | Full-Stack & Mobile Developer",
  description:
    "Portfolio of Aljohn Arranguez — a full-stack and mobile developer from Cagayan de Oro shipping production systems in TypeScript (React, Next.js, Angular) and Kotlin (Jetpack Compose), with a specialty in offline-first architecture.",
  keywords: [
    "full-stack developer",
    "mobile developer",
    "Kotlin",
    "Jetpack Compose",
    "offline-first",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Cagayan de Oro",
    "web developer",
    "Angular",
    "portfolio",
  ],
  authors: [{ name: "Aljohn Arranguez" }],
  creator: "Aljohn Arranguez",
  openGraph: {
    title: "Aljohn Arranguez | Full-Stack & Mobile Developer",
    description:
      "Full-stack and mobile developer shipping production systems: offline-first Android field apps, POS and inventory platforms, and the web consoles behind them.",
    type: "website",
    locale: "en_US",
    siteName: "Aljohn Arranguez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aljohn Arranguez | Full-Stack & Mobile Developer",
    description:
      "Full-stack and mobile developer shipping production systems: offline-first Android field apps, POS and inventory platforms, and the web consoles behind them.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#191825",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
