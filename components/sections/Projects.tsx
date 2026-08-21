"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import ShapeTransition from "@/components/ui/ShapeTransition";
import TechIcon from "@/components/ui/TechIcon";
import { projects, Project } from "@/lib/projects";

const COLOR_MAP = {
  cyan: {
    border: "#865DFF",
    glow: "#865DFF",
    tag: "rgba(134,93,255,0.1)",
    tagBorder: "rgba(134,93,255,0.3)",
    tagText: "#865DFF",
    gradient: "#865DFF",
  },
  gold: {
    border: "#E384FF",
    glow: "#E384FF",
    tag: "rgba(227,132,255,0.1)",
    tagBorder: "rgba(227,132,255,0.3)",
    tagText: "#E384FF",
    gradient: "#E384FF",
  },
  purple: {
    border: "#FFA3FD",
    glow: "#FFA3FD",
    tag: "rgba(255,163,253,0.1)",
    tagBorder: "rgba(255,163,253,0.3)",
    tagText: "#FFA3FD",
    gradient: "#FFA3FD",
  },
};

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const colors = COLOR_MAP[project.color];

  return (
    <div
      className="flat-card rounded-none overflow-hidden h-full flex flex-col justify-between"
      style={{
        border: `1px solid ${colors.border}40`,
        padding: "1.75rem 2rem",
        minHeight: 340,
        background: "var(--surface)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {/* Card top accent line */}
        <div
          style={{
            height: 3,
            background: colors.gradient,
            transition: "opacity 0.3s",
            opacity: hovered ? 1 : 0.6,
            marginBottom: "1.25rem",
            borderRadius: "2px",
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#f0eeee",
                marginBottom: "0.2rem",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.74rem",
                color: colors.tagText,
                letterSpacing: "0.05em",
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* GitHub Link */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: 6,
                border: `1px solid ${colors.border}50`,
                color: colors.tagText,
                transition: "all 0.2s",
                background: `${colors.border}15`,
                fontSize: "1.1rem",
                textDecoration: "none",
                shrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#191825";
                (e.currentTarget as HTMLElement).style.background = colors.border;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = colors.tagText;
                (e.currentTarget as HTMLElement).style.background = `${colors.border}15`;
              }}
            >
              ⌥
            </a>
          )}
        </div>

        {/* Description */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.92rem",
            lineHeight: 1.65,
            marginBottom: "1.5rem",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Tech Stack Logos Only */}
      <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
        {project.tags.map((tag) => (
          <div
            key={tag}
            title={tag}
            className="inline-flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: colors.tag,
              border: `1px solid ${colors.tagBorder}`,
              color: colors.tagText,
            }}
          >
            <TechIcon name={tag} size={18} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.9]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  const totalProjects = projects.length;
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  };

  const activeProject = projects[currentIndex];

  return (
    <section
      id="projects"
      className="section scroll-mt-16"
      ref={containerRef}
    >
      <ShapeTransition color="var(--accent-3)" direction="down" delay={0.2}>
        <motion.div style={{ opacity, scale }} className="w-full h-full flex flex-col items-center justify-center">
          <div className="relative z-10 w-full px-6 mx-auto" style={{ maxWidth: 1100 }}>
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="section-label mb-3 text-center"
            >
              // featured showcase
            </motion.div>

            <RevealText
              text="Featured Projects."
              elementType="h2"
              delay={0.2}
              className="text-center font-bold mb-4 gradient-text-accent"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.1,
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                color: "var(--text-muted)",
                fontSize: "0.97rem",
                marginBottom: "3.5rem",
                textAlign: "center",
                maxWidth: 600,
                margin: "0 auto 3.5rem",
              }}
            >
              Open-source applications, client deliverables, and system architectures on GitHub.
            </motion.p>

            {/* Carousel Controls Header */}
            <div className="flex items-center justify-between mb-6 px-1">
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}
              >
                PROJECT <span style={{ color: "var(--accent-1)", fontWeight: 700 }}>{String(currentIndex + 1).padStart(2, "0")}</span> / {String(totalProjects).padStart(2, "0")}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous Project"
                  className="flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text-primary)",
                    fontSize: "1.1rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-1)";
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-1)";
                    (e.currentTarget as HTMLElement).style.color = "#191825";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Project"
                  className="flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    color: "var(--text-primary)",
                    fontSize: "1.1rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-1)";
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-1)";
                    (e.currentTarget as HTMLElement).style.color = "#191825";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }}
                >
                  →
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="relative overflow-hidden w-full min-h-[360px] flex items-center justify-center"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <ProjectCard project={activeProject} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicator Dots & GitHub CTA with clear gap */}
            <div className="flex flex-col items-center gap-10 mt-12">
              {/* Indicator Dots */}
              <div className="flex items-center justify-center gap-3">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    aria-label={`Go to project ${p.title}`}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      width: idx === currentIndex ? 32 : 10,
                      height: 10,
                      borderRadius: 5,
                      background: idx === currentIndex ? "var(--accent-1)" : "var(--border)",
                      border: "none",
                    }}
                  />
                ))}
              </div>

              {/* GitHub CTA Button */}
              <div>
                <a
                  href="https://github.com/kroue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-none transition-all duration-200 hover:scale-105"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    fontFamily: "JetBrains Mono, monospace",
                    background: "var(--surface)",
                    textDecoration: "none",
                    padding: "12px 24px",
                  }}
                >
                  <span>⌥</span> Explore All Repositories on GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
