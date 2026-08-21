"use client";

import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  elementType?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

export default function RevealText({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  elementType = "div",
  style,
}: RevealTextProps) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1], // cubic-bezier matching Lando's vibe
      },
    },
    hidden: {
      opacity: 0,
      y: "120%",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const MotionTag = motion[elementType as keyof typeof motion] as any;

  const isCentered = className.includes("text-center");
  const isRight = className.includes("text-right");
  const defaultJustify = isCentered ? "center" : isRight ? "flex-end" : "flex-start";

  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: defaultJustify,
        overflow: "hidden",
        ...style,
      }}
    >
      {words.map((word, idx) => (
        <span key={idx} style={{ display: "inline-block", overflow: "hidden" }}>
          <motion.span
            variants={child}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
