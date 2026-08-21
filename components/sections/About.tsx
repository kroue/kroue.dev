"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TerminalCard from "@/components/ui/TerminalCard";
import TiltCard from "@/components/ui/TiltCard";
import RevealText from "@/components/ui/RevealText";
import ShapeTransition from "@/components/ui/ShapeTransition";

const STATS = [
  { value: "2+", label: "Professional Clients" },
  { value: "3+", label: "Frameworks Shipped" },
  { value: "∞", label: "Curiosity" },
];

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);
  const x = useTransform(scrollYProgress, [0.6, 1], ["0%", "-15%"]);
  const inView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <section 
      id="about" 
      className="section scroll-mt-16" 
      ref={containerRef}
    >
      <ShapeTransition color="var(--accent-1)" direction="circle" delay={0.2}>
        <motion.div style={{ opacity, scale, x }} className="w-full h-full flex flex-col items-center justify-center">
        {/* Grid floor backdrop (flattened to solid accent lines) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      <div
        className="relative z-10 w-full px-6 mx-auto"
        style={{ maxWidth: 1100 }}
      >
        {/* Section label */}
          <motion.div
            custom={3}
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="section-label mb-4 text-center"
          >
          // about me
        </motion.div>

        <RevealText
          text="Crafted by Curiosity. Refined by Code."
          elementType="h2"
          delay={0.2}
          className="text-center font-bold mb-12 gradient-text-accent"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Left — Terminal */}
          <motion.div
            custom={1}
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <TiltCard glowColor="var(--accent-1)">
              <TerminalCard />
            </TiltCard>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            custom={2}
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >  
            <TiltCard glowColor="var(--accent-2)">
                <div
                  className="flat-card rounded-none"
                  style={{ border: "1px solid var(--border)", padding: "1.5rem 1.75rem" }}
                >
                  <p
                    style={{
                      color: "#a1a1aa",
                      lineHeight: 1.85,
                      fontSize: "0.97rem",
                    }}
                  >
                    I&apos;m an IT graduate from the{" "}
                    <span style={{ color: "#f0eeee" }}>
                      University of Science and Technology of Southern
                      Philippines
                    </span>{" "}
                    — but my real education happened at the keyboard.
                  </p>
                  <p
                    style={{
                      color: "#a1a1aa",
                      lineHeight: 1.85,
                      fontSize: "0.97rem",
                      marginTop: "1rem",
                    }}
                  >
                    I&apos;ve built React, Next.js, and Angular applications
                    across a range of real-world contexts: from helping students
                    ship their{" "}
                    <span style={{ color: "#f0eeee" }}>capstone projects</span>{" "}
                    to delivering for professional clients — including{" "}
                    <span style={{ color: "var(--accent-1)" }}>MEEDO</span>, a water
                    billing system, and{" "}
                    <span style={{ color: "var(--accent-2)" }}>LANTAW</span>.
                  </p>
                  <div
                    className="mt-6 pt-6"
                    style={{
                      borderTop: "1px solid var(--border)",
                      fontStyle: "italic",
                      color: "var(--text-subtle)",
                      fontSize: "0.9rem",
                    }}
                  >
                    &quot;I don&apos;t just implement designs. I make them feel
                    alive.&quot;
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={4 + i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <TiltCard glowColor="var(--accent-3)">
                    <div
                      className="flat-card rounded-none p-4 text-center"
                      style={{ border: "1px solid var(--border)" }}
                    >
                      <div
                        style={{
                          fontSize: "2rem",
                          fontWeight: 800,
                          background:
                            "linear-gradient(135deg, var(--accent-1), var(--accent-3))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--text-subtle)",
                          marginTop: "0.25rem",
                          fontFamily: "JetBrains Mono, monospace",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
