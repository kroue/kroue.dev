"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin reading-progress bar pinned under the navbar. The page is a long
 * single-scroll document with full-viewport sections, so there is otherwise no
 * cue for how far through it you are.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 origin-left pointer-events-none"
      style={{
        scaleX,
        top: "var(--nav-h)",
        height: 2,
        zIndex: 101,
        background:
          "linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3))",
      }}
    />
  );
}
