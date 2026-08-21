"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ShapeTransitionProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down" | "circle" | "polygon";
}

export default function ShapeTransition({
  children,
  color = "var(--accent-1)",
  delay = 0,
  direction = "down",
}: ShapeTransitionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.1, once: false });

  // Pure clip-path shape curtain variants with seamless full-bleed coverage
  const variants = {
    circle: {
      hidden: { clipPath: "circle(150% at 50% 50%)" },
      visible: { clipPath: "circle(0% at 50% 50%)" },
    },
    polygon: {
      hidden: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
      visible: { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
    },
    up: {
      hidden: { clipPath: "inset(0% 0% 0% 0%)" },
      visible: { clipPath: "inset(0% 0% 100% 0%)" },
    },
    left: {
      hidden: { clipPath: "inset(0% 0% 0% 0%)" },
      visible: { clipPath: "inset(0% 100% 0% 0%)" },
    },
    right: {
      hidden: { clipPath: "inset(0% 0% 0% 0%)" },
      visible: { clipPath: "inset(0% 0% 0% 100%)" },
    },
    down: {
      hidden: { clipPath: "inset(0% 0% 0% 0%)" },
      visible: { clipPath: "inset(100% 0% 0% 0%)" },
    },
  };

  return (
    <div ref={ref} className="relative w-full h-full flex-1 flex flex-col items-center justify-center overflow-hidden">
      {/* Seamless full-bleed shape curtain covering section 100% with zero gaps */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ backgroundColor: color }}
        variants={variants[direction]}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
      {children}
    </div>
  );
}
