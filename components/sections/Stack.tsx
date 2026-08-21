"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import ShapeTransition from "@/components/ui/ShapeTransition";
import TechIcon from "@/components/ui/TechIcon";
import { getTechUrl } from "@/components/ui/techUrls";

const SkillOrb = dynamic(
  () => import("@/components/three/SkillOrb"),
  { ssr: false }
);

const TIERS = [
  {
    label: "Frontend",
    color: "#865DFF",
    skills: ["React", "Next.js", "Vue", "Angular", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Backend / DB",
    color: "#E384FF",
    skills: ["Firebase", "Supabase", "PostgreSQL", "MySQL", "NoSQL", "Python", "Django"],
  },
  {
    label: "Systems",
    color: "#FFA3FD",
    skills: ["Rust", "Java", "C++", "C#", "Android SDK", "Web3"],
  },
  {
    label: "Tooling",
    color: "#FFA3FD",
    skills: ["Vercel", "Expo", "Vite", "VS Code", "Git", "ESLint", "Framer Motion"],
  },
];

const flipIn = {
  hidden: { opacity: 0, rotateX: -90, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" as const, damping: 15 },
  }),
};

export default function Stack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0.6, 1], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.85]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  return (
    <section 
      id="stack" 
      className="section scroll-mt-16" 
      ref={containerRef}
    >
      <ShapeTransition color="var(--accent-2)" direction="left" delay={0.2}>
        <motion.div style={{ opacity, scale, rotateX, perspective: 1000 }} className="w-full h-full flex flex-col items-center justify-center">
        {/* Ambient glow removed for flat design */}
      <div className="absolute pointer-events-none" />

      <div className="relative z-10 w-full px-6 mx-auto" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <motion.div
          custom={0}
          variants={flipIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="section-label mb-4 text-center"
        >
          // tools of the trade
        </motion.div>

        <RevealText
          text="The Stack I Reach For."
          elementType="h2"
          delay={0.2}
          className="text-center font-bold mb-4 gradient-text-accent"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
          }}
        />

        <motion.p
          custom={1}
          variants={flipIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            color: "var(--text-muted)",
            fontSize: "0.97rem",
            marginBottom: "4rem",
            textAlign: "center",
            maxWidth: 600,
            margin: "0 auto 4rem",
          }}
        >
          Every tool chosen with intention. Every line written with purpose.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Orb */}
          <motion.div
            custom={2}
            variants={flipIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="w-full h-[420px] md:h-[480px] flex justify-center mb-8 relative"
          >
            <SkillOrb />
            {/* Legend */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center z-20"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem" }}
            >
              {[
                { color: "#865DFF", label: "Frontend" },
                { color: "#E384FF", label: "Backend" },
                { color: "#FFA3FD", label: "Systems" },
                { color: "#FFA3FD", label: "Tooling" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1.5" style={{ color: t.color }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: t.color,
                    }}
                  />
                  {t.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tier breakdown */}
          <div className="flex flex-col gap-5" style={{ perspective: 1000 }}>
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.label}
                custom={3 + idx}
                variants={flipIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flat-card rounded-none"
                style={{ border: `1px solid ${tier.color}40`, padding: "1.25rem 1.5rem" }}
              >
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    color: tier.color,
                    textTransform: "uppercase",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "0%",
                      background: tier.color,
                    }}
                  />
                  {tier.label}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tier.skills.map((skill) => (
                    <motion.a
                      key={skill}
                      href={getTechUrl(skill)}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="inline-flex items-center gap-2"
                      style={{
                        background: `${tier.color}12`,
                        border: `1px solid ${tier.color}30`,
                        color: "#d1d5db",
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        textDecoration: "none",
                        fontFamily: "JetBrains Mono, monospace",
                        transition: "box-shadow 0.2s, background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = tier.color;
                        (e.currentTarget as HTMLElement).style.color = "#191825";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${tier.color}12`;
                        (e.currentTarget as HTMLElement).style.color = "#d1d5db";
                      }}
                    >
                      <TechIcon name={skill} size={14} />
                      {skill}
                    </motion.a>
                  ))}
                </div>
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
