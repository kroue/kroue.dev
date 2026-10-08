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

// Mirrors the résumé's skill groupings. Tiers share one accent: the label
// names the tier, so colour has nothing left to encode.
const TIERS = [
  {
    label: "Web",
    skills: ["React", "Next.js", "Angular", "Vue", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Recharts"],
  },
  {
    label: "Mobile",
    skills: ["Kotlin", "Jetpack Compose", "Material 3", "Hilt", "Room", "WorkManager", "React Native", "Expo"],
  },
  {
    label: "Backend / Data",
    skills: ["Firebase", "Supabase", "PostgreSQL", "FastAPI", "Django", "Python", "SQL", "REST APIs"],
  },
  {
    label: "Tools & Practices",
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,46%)] gap-8 lg:gap-6 items-center mt-10">
          {/* Tiers as a hairline rail. Four bordered cards gave every tier the
              same weight and repeated the card grid used by every section. */}
          <ol className="rail">
            {TIERS.map((tier, idx) => (
              <motion.li
                key={tier.label}
                custom={idx}
                variants={flipIn}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <span className="rail-num">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3
                    className="mono flex items-baseline gap-3 mb-2"
                    style={{
                      fontSize: "0.74rem",
                      letterSpacing: "0.16em",
                      color: "var(--text-primary)",
                      textTransform: "uppercase",
                    }}
                  >
                    {tier.label}
                    <span style={{ color: "var(--text-subtle)", fontSize: "0.66rem" }}>
                      {String(tier.skills.length).padStart(2, "0")}
                    </span>
                  </h3>

                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5 list-none">
                    {tier.skills.map((skill) => (
                      <li key={skill}>
                        <a
                          href={getTechUrl(skill)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono hit-44 inline-flex items-center gap-1.5"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            transition: "color var(--dur) var(--ease-out)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--accent-1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-muted)";
                          }}
                        >
                          <TechIcon name={skill} size={13} />
                          {skill}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* The orb runs past the shell to the viewport edge instead of sitting
              boxed in a half-width column. */}
          <motion.div
            custom={0}
            variants={flipIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="h-[300px] md:h-[380px] lg:h-[520px] relative order-first lg:order-none bleed-right"
          >
            <SkillOrb />
          </motion.div>
        </div>
      </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
