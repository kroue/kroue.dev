"use client";

import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect } from "react";

const SNAP_TARGETS =
  "#hero, #about, #stack, #experience, #projects, #contact";

function SnapManager({ enabled }: { enabled: boolean }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !enabled) return;

    let snap: Snap | null = null;

    const build = () => {
      snap?.destroy();

      snap = new Snap(lenis, {
        type: "proximity",
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      document
        .querySelectorAll<HTMLElement>(SNAP_TARGETS)
        .forEach((el) => {
          // Only snap sections that fit on screen. Snapping one that is taller
          // than the viewport strands everything below the fold: the snap point
          // at its top wins every scroll attempt, so the lower cards (the
          // Stack section's last tier) can never be reached.
          if (el.offsetHeight <= window.innerHeight) {
            snap?.addElement(el);
          }
        });
    };

    build();

    // Debounced: rebuilding synchronously on resize measures mid-reflow, where
    // a section can momentarily look short enough to snap and gets registered
    // anyway. Waiting for layout to settle keeps the measurement honest.
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(build, 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      snap?.destroy();
    };
  }, [lenis, enabled]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  // Hijacked scrolling and magnetic section snapping are exactly what the
  // reduced-motion preference is meant to switch off, so collapse Lenis to a
  // pass-through instead of ripping it out of the tree (which would remount
  // the WebGL canvases below it).
  const lenisOptions = prefersReducedMotion
    ? { lerp: 1, duration: 0, smoothWheel: false, syncTouch: false }
    : { lerp: 0.1, duration: 0.9, smoothWheel: true };

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={lenisOptions}>
        <SnapManager enabled={!prefersReducedMotion} />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
