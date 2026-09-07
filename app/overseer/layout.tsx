import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overseer",
  // Keep the admin console out of search results and link previews.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function OverseerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
