"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";

interface SectionHeaderProps {
  /** Two-digit sequence marker, e.g. "01". */
  index: string;
  /** The `// lowercase` kicker above the title. */
  label: string;
  title: string;
  lede?: string;
  inView: boolean;
  /** Accent used for the kicker. */
  accent?: string;
}

/**
 * The numeral is a graphic element, not a label: it sits oversized behind and
 * to the left of the headline so the two overlap. Previously it was a small
 * outlined number in its own grid column, which read as a list marker.
 */
export default function SectionHeader({
  index,
  label,
  title,
  lede,
  inView,
  accent = "var(--accent-2)",
}: SectionHeaderProps) {
  return (
    <header className="relative w-full">
      <motion.span
        aria-hidden="true"
        className="index-huge absolute"
        style={{ left: "-0.06em", top: "-0.22em", zIndex: 0 }}
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {index}
      </motion.span>

      <div
        className="relative"
        style={{ zIndex: 1, paddingLeft: "clamp(1.5rem, 6vw, 5.5rem)" }}
      >
        <motion.span
          className="section-label"
          style={{ color: accent, display: "block", marginBottom: "0.4rem" }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {label}
        </motion.span>

        <RevealText
          text={title}
          elementType="h2"
          delay={0.12}
          className="section-title gradient-text-accent"
        />
      </div>

      {lede && (
        <motion.p
          className="section-lede measure-wide mt-5"
          style={{ paddingLeft: "clamp(1.5rem, 6vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {lede}
        </motion.p>
      )}

      <motion.hr
        className="rule mt-6"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ transformOrigin: "left", marginLeft: "clamp(1.5rem, 6vw, 5.5rem)" }}
      />
    </header>
  );
}
