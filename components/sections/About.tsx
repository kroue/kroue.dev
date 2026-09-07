"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TerminalCard from "@/components/ui/TerminalCard";
import TiltCard from "@/components/ui/TiltCard";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import { STATS, LANGUAGES } from "@/lib/resume";

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
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
      {/* Direct child of <section> so it spans the full height. Nested inside
          the content wrapper it started at the section's padding edge, leaving
          a hard line where the grid began. */}
      <div className="backdrop backdrop-dots" aria-hidden="true" />

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

            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-8 items-start">
              {/* Terminal */}
              <motion.div
                custom={0}
                variants={slideLeft}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="min-w-0"
              >
                <TiltCard glowColor="var(--accent-1)">
                  <TerminalCard />
                </TiltCard>
              </motion.div>

              {/* Bio + stats */}
              <div className="flex flex-col gap-4 min-w-0">
                <motion.div
                  custom={1}
                  variants={slideRight}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <div className="card card-bracket p-6">
                    <p
                      style={{
                        color: "var(--text-muted)",
                        lineHeight: 1.8,
                        fontSize: "0.97rem",
                      }}
                    >
                      I&apos;m a full-stack developer who ships production
                      systems for paying clients — a{" "}
                      <span style={{ color: "var(--accent-1)" }}>
                        point-of-sale and inventory platform
                      </span>
                      , a{" "}
                      <span style={{ color: "var(--accent-2)" }}>
                        water utility billing system
                      </span>{" "}
                      pairing an offline-first Android field app with a web
                      admin console, and a booking and POS platform.
                    </p>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        lineHeight: 1.8,
                        fontSize: "0.97rem",
                        marginTop: "1rem",
                      }}
                    >
                      I work across TypeScript (React/Next.js, Angular) and{" "}
                      <span style={{ color: "var(--text-primary)" }}>
                        Kotlin (Jetpack Compose)
                      </span>{" "}
                      with Firebase, Supabase, and PostgreSQL. BS Information
                      Technology from the{" "}
                      <span style={{ color: "var(--text-primary)" }}>
                        University of Science and Technology of Southern
                        Philippines
                      </span>
                      , 2026.
                    </p>

                    <blockquote
                      className="spine mt-6"
                      style={{
                        fontStyle: "italic",
                        color: "var(--text-subtle)",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                      }}
                    >
                      My recurring specialty is offline-first architecture:
                      systems that keep working through the connectivity
                      outages routine for clients outside major cities, then
                      reconcile cleanly on reconnect.
                    </blockquote>

                    {/* Spoken languages — a differentiator for remote work */}
                    <ul className="flex flex-wrap gap-2 mt-6 list-none">
                      {LANGUAGES.map((lang) => (
                        <li
                          key={lang.name}
                          className="chip"
                          style={{ fontSize: "0.72rem" }}
                        >
                          <span style={{ color: "var(--text-primary)" }}>
                            {lang.name}
                          </span>
                          <span style={{ color: "var(--text-subtle)" }}>
                            {lang.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Stats */}
                <ul className="grid grid-cols-3 gap-3 list-none">
                  {STATS.map((stat, i) => (
                    <motion.li
                      key={stat.label}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="card card-interactive p-4 text-center"
                    >
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
