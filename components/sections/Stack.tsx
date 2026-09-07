"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import TechIcon from "@/components/ui/TechIcon";
import { getTechUrl } from "@/components/ui/techUrls";

const SkillOrb = dynamic(
  () => import("@/components/three/SkillOrb"),
  { ssr: false }
);

// Mirrors the résumé's skill groupings.
const TIERS = [
  {
    label: "Web",
    color: "#865DFF",
    skills: ["React", "Next.js", "Angular", "Vue", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
  },
  {
    label: "Mobile",
    color: "#E384FF",
    skills: ["Kotlin", "Jetpack Compose", "Material 3", "Hilt", "Room", "WorkManager", "React Native", "Expo"],
  },
  {
    label: "Backend / Data",
    color: "#FFA3FD",
    skills: ["Firebase", "Supabase", "PostgreSQL", "FastAPI", "Django", "Python", "SQL", "REST APIs"],
  },
  {
    label: "Tools & Practices",
    color: "#5EC8FF",
    skills: ["Vercel", "Vite", "Git", "VS Code", "Offline-first", "Clean arch.", "PWA", "RLS", "Testing"],
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

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  return (
    <section 
      id="stack" 
      className="section scroll-mt-16" 
      ref={containerRef}
    >
      <div className="backdrop backdrop-rings" aria-hidden="true" />

      <ShapeTransition color="var(--accent-2)" direction="diamond" delay={0.2}>
        <motion.div
          style={{ opacity }}
          className="w-full flex flex-col items-center justify-center"
        >
      <div className="shell relative z-10">
        <SectionHeader
          index="02"
          label="// tools of the trade"
          title="The Stack I Reach For."
          lede="Every tool chosen with intention. Every line written with purpose."
          inView={inView}
          accent="var(--accent-1)"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* 3D Orb */}
          <motion.div
            custom={2}
            variants={flipIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="w-full h-[320px] md:h-[380px] flex justify-center mb-10 relative"
          >
            <SkillOrb />
            {/* Legend */}
            {/* Derived from TIERS so the legend can never drift from the data. */}
            <ul
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center z-20 mono list-none"
              style={{ fontSize: "0.65rem" }}
            >
              {TIERS.map((tier) => (
                <li
                  key={tier.label}
                  className="flex items-center gap-1.5"
                  style={{ color: tier.color }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "var(--radius-pill)",
                      background: tier.color,
                    }}
                  />
                  {tier.label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tier breakdown */}
          <div className="flex flex-col gap-3.5" style={{ perspective: 1000 }}>
            {TIERS.map((tier, idx) => (
              <motion.div
                key={tier.label}
                custom={3 + idx}
                variants={flipIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="card p-5"
                style={{
                  // Tier colour carried on the left edge instead of the whole
                  // border, so four differently-tinted boxes stop competing.
                  borderLeft: `3px solid ${tier.color}`,
                }}
              >
                <h3
                  className="mono flex items-center gap-2 mb-3"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    color: tier.color,
                    textTransform: "uppercase",
                  }}
                >
                  {tier.label}
                  <span
                    aria-hidden="true"
                    className="flex-1"
                    style={{
                      height: 1,
                      background: `color-mix(in srgb, ${tier.color} 30%, transparent)`,
                    }}
                  />
                  <span style={{ color: "var(--text-subtle)" }}>
                    {String(tier.skills.length).padStart(2, "0")}
                  </span>
                </h3>
                <ul className="flex flex-wrap gap-2.5 list-none">
                  {tier.skills.map((skill) => (
                    <li key={skill}>
                      <motion.a
                        href={getTechUrl(skill)}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="chip chip-accent"
                        style={{ "--chip-color": tier.color } as React.CSSProperties}
                      >
                        <TechIcon name={skill} size={14} />
                        {skill}
                      </motion.a>
                    </li>
                  ))}
                </ul>
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
