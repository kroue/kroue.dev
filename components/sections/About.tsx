"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TerminalCard from "@/components/ui/TerminalCard";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import { STATS, LANGUAGES } from "@/lib/resume";

const rise = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section id="about" className="section scroll-mt-16" ref={containerRef}>
      <ShapeTransition color="var(--accent-1)" direction="circle" delay={0.2}>
        <motion.div
          style={{ opacity }}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="shell relative z-10">
            <SectionHeader
              index="01"
              label="// about me"
              title="Crafted by Curiosity. Refined by Code."
              inView={inView}
              accent="var(--accent-2)"
            />

            {/* Prose left, terminal bleeding right. The bio used to sit in a
                bordered card mirroring the terminal, which gave two unrelated
                things the same weight. */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,42%)_1fr] gap-8 lg:gap-10 items-start mt-8 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0">
              <motion.div
                custom={0}
                variants={rise}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="min-w-0"
              >
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    fontSize: "0.95rem",
                  }}
                >
                  I&apos;m a full-stack developer who ships production systems
                  for paying clients: a{" "}
                  <span style={{ color: "var(--accent-1)" }}>
                    point-of-sale and inventory platform
                  </span>
                  , a{" "}
                  <span style={{ color: "var(--accent-2)" }}>
                    water utility billing system
                  </span>{" "}
                  pairing an offline-first Android field app with a web admin
                  console, and a booking and POS platform.
                </p>

                <blockquote
                  className="spine mt-5"
                  style={{
                    fontStyle: "italic",
                    color: "var(--text-subtle)",
                    fontSize: "0.87rem",
                    lineHeight: 1.65,
                  }}
                >
                  My recurring specialty is offline-first architecture: systems
                  that keep working through the connectivity outages routine for
                  clients outside major cities, then reconcile cleanly on
                  reconnect.
                </blockquote>

                <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-5 list-none">
                  {LANGUAGES.map((lang) => (
                    <li
                      key={lang.name}
                      className="mono"
                      style={{ fontSize: "0.7rem", color: "var(--text-subtle)" }}
                    >
                      <span style={{ color: "var(--text-primary)" }}>
                        {lang.name}
                      </span>{" "}
                      {lang.level}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                custom={1}
                variants={rise}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="min-w-0 lg:justify-self-end"
              >
                <TerminalCard />
              </motion.div>
            </div>

            {/* Stats as a rule-separated row rather than three equal boxes. */}
            <ul
              className="grid grid-cols-3 mt-8 list-none"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {STATS.map((stat, i) => (
                <motion.li
                  key={stat.label}
                  custom={2 + i}
                  variants={rise}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="pt-4"
                  style={{
                    borderLeft: i === 0 ? "none" : "1px solid var(--border)",
                    paddingLeft: i === 0 ? 0 : "clamp(0.75rem, 2vw, 1.5rem)",
                  }}
                >
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
