"use client";

import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { ReactNode, useEffect } from "react";

function SnapManager() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "proximity",
      duration: 0.8,
      velocityThreshold: 0.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const elements = Array.from(document.querySelectorAll("#hero, #about, #stack, #projects"));
    elements.forEach((el) => {
      snap.addElement(el as HTMLElement, { offset: 0 });
    });

    return () => {
      snap.destroy();
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 0.9,
        smoothWheel: true,
      }}
    >
      <SnapManager />
      {children}
    </ReactLenis>
  );
}
