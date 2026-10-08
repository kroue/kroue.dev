"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaGithub,
  FaXmark,
} from "react-icons/fa6";
import TechIcon from "@/components/ui/TechIcon";
import Lightbox from "@/components/projects/Lightbox";
import ScreenTile, { pad } from "@/components/projects/ScreenTile";
import { projects, type Project, type Screen } from "@/lib/projects";

const FULL = "inset(0px 0px 0px 0px)";
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/** A clip-path that crops the full-screen sheet down to the card it came from. */
function insetFrom(rect: DOMRect) {
  const { innerWidth: w, innerHeight: h } = window;
  return `inset(${rect.top}px ${w - rect.right}px ${h - rect.bottom}px ${rect.left}px)`;
}

/** Screens grouped by product surface, in order of first appearance. */
function groupBySurface(screens: Screen[]) {
  const groups = new Map<string, { screen: Screen; index: number }[]>();
  screens.forEach((screen, index) => {
    const group = groups.get(screen.surface) ?? [];
    group.push({ screen, index });
    groups.set(screen.surface, group);
  });
  return [...groups.entries()];
}

const linkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  color: "var(--accent-1)",
  textDecoration: "none",
  fontSize: "0.78rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: "var(--font-mono), monospace",
};

interface CaseFileProps {
  project: Project;
  /** Where the sheet expands from and collapses back to. Null on a deep link. */
  origin: DOMRect | null;
  onClosed: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

export default function CaseFile({ project, origin, onClosed, onNavigate }: CaseFileProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const doneRef = useRef(false);
  const shownId = useRef(project.id);

  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [shot, setShot] = useState<number | null>(null);
  const [openedOn] = useState(project.id);

  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const screens = project.screens ?? [];
  const groups = groupBySurface(screens);

  // showModal makes the page behind inert and turns Escape into a cancel event.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    doneRef.current = false;
    dialog.showModal();
    closeRef.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      // Unmounting is itself the close (the back button, say), so the
      // close event this fires must not report back to the parent again.
      doneRef.current = true;
      if (dialog.open) dialog.close();
      root.style.overflow = previous;
      // Return focus to the card for whichever project was showing last,
      // which may not be the one that opened the case file.
      const lastId = shownId.current;
      requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>(`[data-case-trigger="${lastId}"]`)
          ?.focus({ preventScroll: true });
      });
    };
  }, []);

  // Lenis drives the page scroll from wheel events on window, which the
  // dialog's own scrolling would otherwise feed. Kept separate from the
  // effect above because the instance arrives after first render.
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  // Switching project in place: start the new one from its top, and move
  // focus to its title so the footer button that triggered it isn't left
  // focused far below the fold.
  useEffect(() => {
    if (shownId.current === project.id) return;
    shownId.current = project.id;
    scrollRef.current?.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onClosed();
  };

  const requestClose = () => {
    if (closing) return;
    if (reduce) finish();
    else setClosing(true);
  };

  const collapsed = origin ? { clipPath: insetFrom(origin) } : { opacity: 0 };

  return (
    <dialog
      ref={dialogRef}
      className="case-file"
      aria-labelledby={`case-title-${project.id}`}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      // Some browsers refuse to cancel a repeated Escape and close the
      // dialog outright; treat that as a finished close. The event is
      // queued, so one from an earlier close() can land after the dialog
      // has been shown again (Strict Mode remounts do exactly this); a
      // dialog that is open has not closed.
      onClose={() => {
        if (!dialogRef.current?.open) finish();
      }}
    >
      <motion.div
        className="case-sheet"
        initial={reduce ? false : collapsed}
        animate={closing ? collapsed : { clipPath: FULL, opacity: 1 }}
        transition={{ duration: closing ? 0.45 : 0.6, ease: EASE }}
        onAnimationComplete={() => {
          if (closing) finish();
        }}
      >
        <header className="case-bar">
          <p className="mono min-w-0 flex items-baseline gap-3" style={{ fontSize: "0.72rem" }}>
            <span style={{ color: "var(--accent-1)" }}>{"// case file"}</span>
            <span style={{ color: "var(--text-subtle)" }}>
              {pad(index + 1)} / {pad(projects.length)}
            </span>
            <span className="truncate hidden sm:inline" style={{ color: "var(--text-primary)" }}>
              {project.title}
            </span>
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              className="icon-btn hidden sm:inline-flex"
              onClick={() => onNavigate(-1)}
              aria-label="Previous project"
            >
              <FaArrowLeft size={14} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-btn hidden sm:inline-flex"
              onClick={() => onNavigate(1)}
              aria-label="Next project"
            >
              <FaArrowRight size={14} aria-hidden="true" />
            </button>
            <button
              ref={closeRef}
              type="button"
              className="icon-btn"
              onClick={requestClose}
              aria-label="Close case file"
            >
              <FaXmark size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="case-scroll" data-lenis-prevent>
          <motion.div
            key={project.id}
            className="case-grid"
            // On open the content is already in place, so the expanding clip
            // reveals it like a window opening. Only a project switch fades.
            initial={reduce || project.id === openedOn ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <aside className="case-aside min-w-0">
              <span aria-hidden="true" className="index-huge absolute" style={{ top: "-0.2em", left: "-0.06em" }}>
                {pad(index + 1)}
              </span>

              <div className="relative" style={{ paddingTop: "clamp(2.5rem, 7vw, 5.5rem)" }}>
                {project.client && (
                  <span
                    className="mono inline-block mb-3"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.14em",
                      padding: "3px 8px",
                      border: "1px solid var(--accent-1-a40)",
                      color: "var(--accent-1)",
                    }}
                  >
                    CLIENT WORK
                  </span>
                )}
                <h2
                  id={`case-title-${project.id}`}
                  ref={titleRef}
                  tabIndex={-1}
                  className="gradient-text-accent"
                  style={{
                    fontSize: "clamp(2.4rem, 1.6rem + 3vw, 4rem)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "-0.045em",
                  }}
                >
                  {project.title}
                </h2>
                <p className="mono mt-3" style={{ fontSize: "0.74rem", color: "var(--accent-1)", letterSpacing: "0.04em" }}>
                  {project.tagline}
                </p>

                <p className="mt-5" style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.7 }}>
                  {project.description}
                </p>

                {project.highlights && (
                  <ul className="rail mt-6">
                    {project.highlights.map((item, i) => (
                      <li key={item}>
                        <span className="rail-num">{pad(i + 1)}</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: "0.8rem", lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <h3 className="sr-only">Built with</h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 list-none mt-6">
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

                <div className="flex items-center gap-6 mt-6 flex-wrap">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hit-44"
                      style={linkStyle}
                      aria-label={`Open the live ${project.title} site (opens in a new tab)`}
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
                      className="hit-44"
                      style={linkStyle}
                      aria-label={`View the ${project.title} repository on GitHub (opens in a new tab)`}
                    >
                      <FaGithub size={14} aria-hidden="true" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              {groups.length === 0 ? (
                <div className="case-empty">
                  <p className="mono" style={{ fontSize: "0.74rem", color: "var(--accent-1)" }}>
                    {"// no screens published yet"}
                  </p>
                  <p className="mt-3 measure-wide" style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                    {project.title} has no public build to capture, so this case file is
                    the write-up only.
                    {project.github ? " The source is linked alongside." : ""}
                  </p>
                </div>
              ) : (
                groups.map(([surface, items]) => {
                  const desktops = items.filter((it) => it.screen.device === "desktop");
                  const phones = items.filter((it) => it.screen.device === "mobile");
                  return (
                    <section key={surface} className="case-group" aria-label={surface}>
                      <h3 className="case-group-title">
                        {`// ${surface.toLowerCase()}`}
                        <span>
                          {pad(items.length)} {items.length === 1 ? "screen" : "screens"}
                        </span>
                      </h3>

                      {desktops.length > 0 && (
                        <div className="case-desktops">
                          {desktops.map(({ screen, index: n }, i) => {
                            // The lead capture runs full width; so does a last
                            // one left alone on its row.
                            const wide =
                              i === 0 || (i === desktops.length - 1 && (desktops.length - 1) % 2 === 1);
                            return (
                              <ScreenTile
                                key={screen.src}
                                screen={screen}
                                number={n + 1}
                                wide={wide}
                                sizes={wide ? "(min-width: 1024px) 1000px, 100vw" : "(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"}
                                onOpen={() => setShot(n)}
                              />
                            );
                          })}
                        </div>
                      )}

                      {phones.length > 0 && (
                        <div className="case-phones">
                          {phones.map(({ screen, index: n }) => (
                            <ScreenTile
                              key={screen.src}
                              screen={screen}
                              number={n + 1}
                              sizes="250px"
                              onOpen={() => setShot(n)}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })
              )}
            </div>
          </motion.div>

          <button type="button" className="case-next" onClick={() => onNavigate(1)}>
            <span className="mono block mb-3" style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}>
              {"// next case file"} · {pad(((index + 1) % projects.length) + 1)}
            </span>
            <span className="case-next-title">
              {next.title}
              <FaArrowRight
                aria-hidden="true"
                style={{ display: "inline", marginLeft: "0.3em", fontSize: "0.5em", verticalAlign: "middle" }}
              />
            </span>
          </button>
        </div>
      </motion.div>

      {shot !== null && (
        <Lightbox
          screens={screens}
          index={shot}
          projectTitle={project.title}
          onIndex={setShot}
          onClose={() => setShot(null)}
        />
      )}
    </dialog>
  );
}
