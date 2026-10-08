"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { useLenis } from "lenis/react";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa6";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import TechIcon from "@/components/ui/TechIcon";
import CaseFile from "@/components/projects/CaseFile";
import { pad } from "@/components/projects/ScreenTile";
import { projects, Project } from "@/lib/projects";

/** One base colour per accent key; tints are derived rather than hand-written. */
const ACCENT: Record<Project["color"], string> = {
  cyan: "#a58aff",
  gold: "#ffa3fd",
  purple: "#a58aff",
};

const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

/* The open case file lives in the URL (?project=lantaw), so it can be linked
   to directly and the back button closes it. The URL is the only copy of
   that state; React reads it through useSyncExternalStore. */
const PARAM = "project";
const URL_EVENT = "casefilechange";

function readOpenId() {
  const id = new URLSearchParams(window.location.search).get(PARAM);
  return projects.some((p) => p.id === id) ? id : null;
}

function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}

function writeOpenId(id: string | null, mode: "push" | "replace") {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set(PARAM, id);
  else url.searchParams.delete(PARAM);
  const next = url.pathname + url.search;
  if (mode === "push") window.history.pushState(null, "", next);
  else window.history.replaceState(null, "", next);
  window.dispatchEvent(new Event(URL_EVENT));
}

const screenCount = (n: number) => `${pad(n)} ${n === 1 ? "screen" : "screens"}`;

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (rect: DOMRect) => void;
}) {
  const accent = ACCENT[project.color];
  const coverRef = useRef<HTMLButtonElement>(null);
  const screens = project.screens ?? [];
  const desk = screens.find((s) => s.device === "desktop");
  const phones = screens.filter((s) => s.device === "mobile");

  // The sheet always grows out of the cover when there is one, whichever
  // control was used.
  const open = (fallback: HTMLElement) =>
    onOpen((coverRef.current ?? fallback).getBoundingClientRect());

  const linkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: accent,
    textDecoration: "none",
    fontSize: "0.78rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "var(--font-mono), monospace",
    transition: "opacity var(--dur) var(--ease-out)",
  };

  const hasAside = Boolean(screens.length || project.highlights);

  return (
    /* An editorial spread: the numeral overlaps the title, the write-up sits
       in a narrow measure, and the project's own UI takes the other half. */
    <article
      className={`relative grid grid-cols-1 gap-6 lg:gap-10 items-center ${
        hasAside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,47%)]" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="mono absolute select-none"
        style={{
          top: 0,
          left: "-0.05em",
          fontSize: "clamp(4.5rem, 13vw, 11rem)",
          fontWeight: 800,
          lineHeight: 0.72,
          letterSpacing: "-0.06em",
          color: "transparent",
          WebkitTextStroke: `1.5px ${tint(accent, 20)}`,
          zIndex: 0,
        }}
      >
        {pad(index + 1)}
      </span>

      <div className="relative min-w-0" style={{ zIndex: 1, paddingLeft: "clamp(1.25rem, 5vw, 4.5rem)" }}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3
            className="font-bold"
            style={{ fontSize: "var(--step-2)", letterSpacing: "-0.03em", lineHeight: 1 }}
          >
            {project.title}
          </h3>
          {project.client && (
            <span
              className="mono"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                padding: "3px 8px",
                border: `1px solid ${tint(accent, 45)}`,
                color: accent,
              }}
            >
              CLIENT WORK
            </span>
          )}
        </div>

        <p
          className="mono mt-1.5"
          style={{ fontSize: "0.74rem", color: accent, letterSpacing: "0.05em" }}
        >
          {project.tagline}
        </p>

        <p
          className="measure-wide mt-4"
          style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.7 }}
        >
          {project.description}
        </p>

        <h4 className="sr-only">Built with</h4>
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 list-none mt-4">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="mono inline-flex items-center gap-1.5"
              style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}
            >
              <TechIcon name={tag} size={12} />
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-x-6 gap-y-2 mt-5 flex-wrap">
          <button
            type="button"
            className="btn btn-primary"
            data-case-trigger={project.id}
            onClick={(e) => open(e.currentTarget)}
            style={{ padding: "0.7rem 1.2rem", fontSize: "0.85rem" }}
          >
            <FaExpand size={12} aria-hidden="true" />
            Open case file
            {screens.length > 0 && (
              <span className="mono" style={{ fontSize: "0.68rem" }}>
                {screenCount(screens.length)}
              </span>
            )}
          </button>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the live ${project.title} site (opens in a new tab)`}
              className="hit-44"
              style={linkStyle}
            >
              <FaArrowUpRightFromSquare size={13} aria-hidden="true" />
              Live site
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the ${project.title} repository on GitHub (opens in a new tab)`}
              className="hit-44"
              style={linkStyle}
            >
              <FaGithub size={14} aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      </div>

      {screens.length > 0 ? (
        /* Pointer shortcut into the case file. It is out of the tab order and
           hidden from assistive tech because "Open case file" is the same
           action, already reachable and named. */
        <button
          ref={coverRef}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="cover min-w-0"
          style={{ zIndex: 1 }}
          onClick={(e) => open(e.currentTarget)}
        >
          <span className="cover-desk">
            {desk?.url && <span className="shot-url">{desk.url}</span>}
            <span className="cover-frame">
              {desk ? (
                <Image
                  src={desk.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              ) : (
                // A phone-only project fans three of its screens across the
                // frame rather than letterboxing one inside a desktop shape.
                <span className="cover-fan">
                  {phones.slice(0, 3).map((p) => (
                    <span key={p.src}>
                      <Image
                        src={p.src}
                        alt=""
                        fill
                        sizes="150px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </span>
                  ))}
                </span>
              )}
              <span className="cover-count">{screenCount(screens.length)}</span>
            </span>
          </span>
          {desk && phones[0] && (
            <span className="cover-phone">
              <span className="shot-frame" style={{ aspectRatio: "390 / 844" }}>
                <Image
                  src={phones[0].src}
                  alt=""
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </span>
            </span>
          )}
        </button>
      ) : (
        project.highlights && (
          <ul
            className="rail relative min-w-0"
            style={{ zIndex: 1, borderTopColor: tint(accent, 35) }}
          >
            {project.highlights.map((item, i) => (
              <li key={item} style={{ borderBottomColor: tint(accent, 20) }}>
                <span className="rail-num" style={{ color: accent }}>
                  {pad(i + 1)}
                </span>
                <span
                  style={{
                    color: "var(--text-subtle)",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )
      )}
    </article>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 back, 1 forward

  const lenis = useLenis();
  const openId = useSyncExternalStore(subscribeToUrl, readOpenId, () => null);
  const openProject = projects.find((p) => p.id === openId) ?? null;
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  // True when this page added the ?project history entry, so closing can
  // step back off it instead of leaving a duplicate entry behind.
  const pushedRef = useRef(false);

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

  const openCase = (id: string, rect: DOMRect) => {
    setOrigin(rect);
    pushedRef.current = true;
    writeOpenId(id, "push");
  };

  // Moving between case files swaps the entry in place and keeps the
  // carousel underneath on the same project, so closing lands on it.
  const navigateCase = (dir: 1 | -1) => {
    const from = projects.findIndex((p) => p.id === openId);
    const to = (from + dir + total) % total;
    goTo(to, dir);
    writeOpenId(projects[to].id, "replace");
  };

  const closeCase = () => {
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
      return;
    }
    // Arrived on a shared link, so there is no entry of ours to step back to.
    const idx = projects.findIndex((p) => p.id === openId);
    if (idx >= 0) goTo(idx, 1);
    writeOpenId(null, "replace");
    lenis?.scrollTo("#projects", { immediate: true, force: true });
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
              lede="Client systems and builds of my own. Open any one to see every screen."
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
                    {pad(currentIndex + 1)}
                  </span>{" "}
                  / {pad(total)}
                  <span className="sr-only">. Use the arrow keys to browse.</span>
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
                // Clipped sideways only, for the slide animation. Clipping
                // both axes cut the top off the card's numeral.
                className="relative overflow-x-clip w-full min-h-[330px] flex items-center justify-center"
                style={{ paddingBottom: "0.75rem", paddingRight: "0.75rem" }}
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
                    <ProjectCard
                      project={activeProject}
                      index={currentIndex}
                      onOpen={(rect) => openCase(activeProject.id, rect)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-6">
                {projects.map((project, idx) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => goTo(idx, idx > currentIndex ? 1 : -1)}
                    aria-label={`Show ${project.title}`}
                    aria-current={idx === currentIndex ? "true" : undefined}
                    className="cursor-pointer grid place-items-center"
                    style={{
                      width: 44,
                      height: 44,
                      background: "none",
                      border: "none",
                    }}
                  >
                    {/* The 44px button is the touch target; this is the mark. */}
                    <span
                      aria-hidden="true"
                      className="transition-all duration-200"
                      style={{
                        display: "block",
                        width: idx === currentIndex ? 30 : 10,
                        height: 4,
                        background:
                          idx === currentIndex
                            ? "var(--accent-1)"
                            : "var(--border-strong)",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <a
                href="https://github.com/kroue"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mono"
                style={{ fontSize: "0.9rem" }}
              >
                <FaGithub size={16} aria-hidden="true" />
                See all repositories on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </ShapeTransition>

      {/* Portalled to <body> so the section's scroll-linked opacity and
          clip-path curtain can't reach the case file. */}
      {openProject &&
        createPortal(
          <CaseFile
            project={openProject}
            origin={origin}
            onClosed={closeCase}
            onNavigate={navigateCase}
          />,
          document.body
        )}
    </section>
  );
}
