"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export default function ScrollReset() {
  const lenis = useLenis();

  useEffect(() => {
    // Force browser to start at top of page on reload
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      
      // Clear hash if present to prevent anchor jumping
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      // Small delay to ensure layout is ready before forcing top
      requestAnimationFrame(() => {
        lenis.scrollTo(0, { immediate: true });
      });
    }
  }, [lenis]);

  return null;
}
