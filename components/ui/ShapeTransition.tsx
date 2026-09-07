"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export type ShapeDirection =
  | "left"
  | "right"
  | "up"
  | "down"
  | "circle"
  | "diamond"
  | "diagonal"
  | "split"
  | "blinds"
  | "shutter";

interface ShapeTransitionProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  direction?: ShapeDirection;
}

/**
 * Single-panel clip-path curtains. Each one starts covering the section and
 * retracts along its own geometry when the section scrolls into view.
 */
const CLIP: Record<string, Variants> = {
  up: {
    hidden: { clipPath: "inset(0% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 100% 0%)" },
  },
  down: {
    hidden: { clipPath: "inset(0% 0% 0% 0%)" },
    visible: { clipPath: "inset(100% 0% 0% 0%)" },
  },
  left: {
    hidden: { clipPath: "inset(0% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 100% 0% 0%)" },
  },
  right: {
    hidden: { clipPath: "inset(0% 0% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 0% 100%)" },
  },
  circle: {
    hidden: { clipPath: "circle(150% at 50% 50%)" },
    visible: { clipPath: "circle(0% at 50% 50%)" },
  },
  // Rhombus collapsing to a point in the middle.
  diamond: {
    hidden: { clipPath: "polygon(50% -70%, 170% 50%, 50% 170%, -70% 50%)" },
    visible: { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" },
  },
  // Corner-to-corner sweep, retreating to the top-left.
  diagonal: {
    hidden: { clipPath: "polygon(0 0, 220% 0, 0 220%)" },
    visible: { clipPath: "polygon(0 0, 0 0, 0 0)" },
  },
  // Parts down the middle like stage curtains.
  split: {
    hidden: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    visible: { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
  },
  // Opens from the horizontal centre line outward.
  shutter: {
    hidden: { clipPath: "inset(0% 0% 0% 0%)" },
    visible: { clipPath: "inset(50% 0% 50% 0%)" },
  },
};

/** Number of slats for the multi-panel "blinds" reveal. */
const BLIND_COUNT = 7;

export default function ShapeTransition({
  children,
  color = "var(--accent-1)",
  delay = 0,
  direction = "down",
}: ShapeTransitionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: false });

  return (
    <div
      ref={ref}
      className="relative w-full min-h-full flex-1 flex flex-col items-center justify-center"
    >
      {direction === "blinds" ? (
        // Vertical slats retracting upward, staggered across the section.
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: BLIND_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                backgroundColor: color,
                left: `${(i * 100) / BLIND_COUNT}%`,
                // Slight overlap avoids sub-pixel seams between slats.
                width: `calc(${100 / BLIND_COUNT}% + 1px)`,
                // Alternating origins make the slats interleave rather than
                // all sliding the same way.
                transformOrigin: i % 2 === 0 ? "top" : "bottom",
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { scaleY: 1 },
                visible: { scaleY: 0 },
              }}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ backgroundColor: color }}
          variants={CLIP[direction] ?? CLIP.down}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      )}
      {children}
    </div>
  );
}
