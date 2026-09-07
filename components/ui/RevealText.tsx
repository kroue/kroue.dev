"use client";

import { motion, Variants } from "framer-motion";

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
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
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

  // Indexing `motion` with a union collapses the props to `never`, so pin the
  // props to motion.div's — every allowed elementType takes the same HTML
  // attributes we pass here.
  const MotionTag = motion[elementType] as typeof motion.div;

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
      /* Splitting into per-word spans leaves no whitespace between them, so
         the accessible name came out as "CraftedbyCuriosity.RefinedbyCode."
         Label the element with the real string and hide the pieces. */
      aria-label={text}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: defaultJustify,
        overflow: "hidden",
        ...style,
      }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          style={{ display: "inline-block", overflow: "hidden" }}
        >
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
