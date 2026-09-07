"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import TechIcon from "@/components/ui/TechIcon";
import { projects, Project } from "@/lib/projects";

/** One base colour per accent key; tints are derived rather than hand-written. */
const ACCENT: Record<Project["color"], string> = {
  cyan: "#865DFF",
  gold: "#E384FF",
  purple: "#FFA3FD",
};

const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = ACCENT[project.color];

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    flexShrink: 0,
    border: `1px solid ${tint(accent, 45)}`,
    background: tint(accent, 12),
    color: accent,
    textDecoration: "none",
    transition: "background-color var(--dur), color var(--dur)",
  };

  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = accent;
    e.currentTarget.style.color = "#191825";
  };
  const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = tint(accent, 12);
    e.currentTarget.style.color = accent;
  };

  return (
    <article
      className="card card-bracket h-full flex flex-col justify-between relative overflow-hidden"
      style={{
        borderColor: tint(accent, 35),
        padding: "2rem 2.25rem",
        minHeight: 340,
        // Accent bleeds in from the top-left corner instead of sitting as a
        // flat bar, so the card reads as part of the section rather than a box.
        backgroundImage: `radial-gradient(ellipse 60% 90% at 0% 0%, ${tint(accent, 12)}, transparent 70%)`,
      }}
    >
      {/* Oversized ghost index, echoing the section marker */}
      <span
        aria-hidden="true"
        className="mono absolute select-none"
        style={{
          top: "0.75rem",
          right: "1.25rem",
          fontSize: "clamp(3.5rem, 9vw, 6rem)",
          fontWeight: 800,
          lineHeight: 0.8,
          letterSpacing: "-0.05em",
          color: "transparent",
          WebkitTextStroke: `1.5px ${tint(accent, 22)}`,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3
              className="font-bold mb-1"
              style={{ fontSize: "var(--step-2)", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>
            <p
              className="mono flex items-center gap-2 flex-wrap"
              style={{ fontSize: "0.74rem", color: accent, letterSpacing: "0.05em" }}
            >
              {project.tagline}
              {project.client && (
                <span
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    padding: "2px 7px",
                    border: `1px solid ${tint(accent, 45)}`,
                    background: tint(accent, 12),
                  }}
                >
                  CLIENT WORK
                </span>
              )}
            </p>
          </div>

        </div>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.92rem",
            lineHeight: 1.65,
            marginBottom: project.highlights ? "1rem" : "1.5rem",
          }}
        >
          {project.description}
        </p>

        {/* Concrete outcomes from the résumé, kept as a scannable strip */}
        {project.highlights && (
          <ul className="flex flex-col gap-1.5 list-none mb-5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-2.5"
                style={{
                  color: "var(--text-subtle)",
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                }}
              >
                <span aria-hidden="true" style={{ color: accent, flexShrink: 0 }}>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: tech stack left, repo/live links right.
          The links used to sit top-right, where the oversized ghost index
          number overlapped them. */}
      <div
        className="pt-4 flex items-end justify-between gap-4 flex-wrap"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="min-w-0">
          <h4 className="sr-only">Built with</h4>
          <ul className="flex flex-wrap items-center gap-2.5 list-none">
            {project.tags.map((tag) => (
              <li
                key={tag}
                title={tag}
                className="inline-flex items-center justify-center transition-transform duration-200 hover:scale-110"
                style={{
                  width: 34,
                  height: 34,
                  background: tint(accent, 12),
                  border: `1px solid ${tint(accent, 35)}`,
                  color: accent,
                }}
              >
                <TechIcon name={tag} size={18} />
                <span className="sr-only">{tag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the live ${project.title} site (opens in a new tab)`}
              title="Live site"
              style={linkStyle}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              <FaArrowUpRightFromSquare size={15} aria-hidden="true" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the ${project.title} repository on GitHub (opens in a new tab)`}
              title="GitHub repository"
              style={linkStyle}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              <FaGithub size={17} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 back, 1 forward

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  const total = projects.length;

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex((index + total) % total);
  };

  const nextSlide = () => goTo(currentIndex + 1, 1);
  const prevSlide = () => goTo(currentIndex - 1, -1);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
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
    <section id="projects" className="section scroll-mt-16" ref={containerRef}>
      <div className="backdrop backdrop-grid" aria-hidden="true" />

      <ShapeTransition color="var(--accent-3)" direction="blinds" delay={0.2}>
        <motion.div
          style={{ opacity }}
          className="w-full flex flex-col items-center justify-center"
        >

          <div className="shell relative z-10">
            <SectionHeader
              index="04"
              label="// featured showcase"
              title="Featured Projects."
              lede="Open-source applications, client deliverables, and system architectures on GitHub."
              inView={inView}
              accent="var(--accent-3)"
            />

            {/* Carousel */}
            <div
              role="group"
              aria-roledescription="carousel"
              aria-label="Featured projects"
              tabIndex={0}
              onKeyDown={onKeyDown}
              className="w-full"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <p
                  className="mono"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  PROJECT{" "}
                  <span style={{ color: "var(--accent-1)", fontWeight: 700 }}>
                    {String(currentIndex + 1).padStart(2, "0")}
                  </span>{" "}
                  / {String(total).padStart(2, "0")}
                  <span className="sr-only"> — use the arrow keys to browse</span>
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous project"
                    aria-controls="project-slide"
                    className="icon-btn"
                  >
                    <FaChevronLeft size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next project"
                    aria-controls="project-slide"
                    className="icon-btn"
                  >
                    <FaChevronRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div
                id="project-slide"
                aria-live="polite"
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
                    <ProjectCard project={activeProject} index={currentIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-10">
                {projects.map((project, idx) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                    aria-label={`Show ${project.title}`}
                    aria-current={idx === currentIndex ? "true" : undefined}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      width: idx === currentIndex ? 32 : 10,
                      height: 10,
                      borderRadius: "var(--radius-pill)",
                      background:
                        idx === currentIndex ? "var(--accent-1)" : "var(--border)",
                      border: "none",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <a
                href="https://github.com/kroue"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mono"
                style={{ fontSize: "0.9rem" }}
              >
                <FaGithub size={16} aria-hidden="true" />
                Explore All Repositories on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
