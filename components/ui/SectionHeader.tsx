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
  /** Accent used for the kicker and the rule. */
  accent?: string;
}

/**
 * Shared editorial header for About / Stack / Projects / Contact. Every section
 * previously repeated a centred kicker + centred gradient headline, which made
 * them indistinguishable while scrolling. Numbering them and pushing everything
 * left gives the page a spine.
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
    <header className="w-full">
      <div className="section-head">
        <motion.span
          aria-hidden="true"
          className="section-index"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {index}
        </motion.span>

        <div className="min-w-0">
          <motion.span
            className="section-label"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {label}
          </motion.span>

          <RevealText
            text={title}
            elementType="h2"
            delay={0.15}
            className="section-title gradient-text-accent"
          />

          {lede && (
            <motion.p
              className="section-lede mt-4"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {lede}
            </motion.p>
          )}
        </div>
      </div>

      <motion.hr
        className="rule"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ transformOrigin: "left" }}
      />
    </header>
  );
}
