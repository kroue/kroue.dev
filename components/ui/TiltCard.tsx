"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function TiltCard({ children, className = "", glowColor = "#4fc3f7" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), springConfig);
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x);
      rawY.set(y);
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative cursor-pointer ${className}`}
    >
      {/* Dynamic spotlight */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, ${glowColor}20 0%, transparent 60%)`
          ),
        }}
      />
      {children}
    </motion.div>
  );
}
