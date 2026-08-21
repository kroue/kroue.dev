import type { Metadata } from "next";
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
  title: "Aljohn Arranguez | Creative Front-End Developer",
  description:
    "Portfolio of Aljohn Arranguez — a creative front-end developer from Cagayan de Oro specializing in React, Next.js, TypeScript, and Tailwind CSS. Building performant, beautiful web experiences.",
  keywords: [
    "front-end developer",
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
  openGraph: {
    title: "Aljohn Arranguez | Creative Front-End Developer",
    description:
      "Creative front-end developer building clean, performant UIs with React, Next.js, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
