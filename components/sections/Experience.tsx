"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  EXPERIENCE,
  EARLIER_ROLES,
  EARLIER_NOTE,
  EDUCATION,
} from "@/lib/resume";

const FREELANCE = EXPERIENCE[0];
const OJT = EXPERIENCE[1];
const SYSTEMS = FREELANCE.work ?? [];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  // Tabs keep every résumé bullet on the page while the section still fits one
  // screen, which is also what lets the scroll snapping engage here.
  const [active, setActive] = useState(0);
  const system = SYSTEMS[active];

  return (
    <section id="experience" className="section scroll-mt-16" ref={containerRef}>
      <ShapeTransition color="var(--accent-2)" direction="split" delay={0.2}>
        <motion.div
          style={{ opacity }}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="shell relative z-10">
            <SectionHeader
              index="03"
              label="// where I've shipped"
              title="Experience."
              inView={inView}
              accent="var(--accent-1)"
            />

            {/* The client systems are a vertical rail rather than a horizontal
                pill strip, so the section reads as an index with a detail pane
                instead of another card grid. */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,15rem)_1fr] gap-6 lg:gap-10 items-start mt-8">
              <div className="min-w-0">
                <p
                  className="mono mb-2"
                  style={{
                    fontSize: "0.64rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-subtle)",
                  }}
                >
                  {FREELANCE.title}, {FREELANCE.period}
                </p>

                <div role="tablist" aria-label="Client systems" className="rail">
                  {SYSTEMS.map((s, i) => (
                    <button
                      key={s.name}
                      role="tab"
                      id={`exp-tab-${i}`}
                      aria-selected={i === active}
                      aria-controls={`exp-panel-${i}`}
                      onClick={() => setActive(i)}
                      className="w-full text-left"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2.5rem 1fr",
                        gap: "0.75rem",
                        alignItems: "baseline",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid var(--border)",
                        paddingBlock: "0.9rem",
                        cursor: "pointer",
                        minHeight: 44,
                      }}
                    >
                      <span
                        className="rail-num"
                        style={{
                          color: i === active ? "var(--accent-1)" : "var(--text-subtle)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.8rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color:
                            i === active
                              ? "var(--text-primary)"
                              : "var(--text-subtle)",
                          transition: "color var(--dur) var(--ease-out)",
                        }}
                      >
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className="min-w-0"
                role="tabpanel"
                id={`exp-panel-${active}`}
                aria-labelledby={`exp-tab-${active}`}
                style={{ minHeight: 250 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={system.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      className="measure-wide"
                      style={{
                        color: "var(--text-subtle)",
                        fontSize: "0.82rem",
                        fontStyle: "italic",
                      }}
                    >
                      {system.blurb}
                    </p>
                    <ul className="flex flex-col gap-2.5 list-none mt-3">
                      {system.points.map((point) => (
                        <li
                          key={point}
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                            borderLeft: "1px solid var(--border)",
                            paddingLeft: "0.9rem",
                          }}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Earlier roles and schooling as one rule-separated strip. */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 mt-8 pt-5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div>
                <h3
                  className="mono mb-2"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-1)",
                  }}
                >
                  {OJT.title}, {OJT.period}
                </h3>
                <p style={{ color: "var(--text-subtle)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                  {OJT.company}
                </p>
              </div>

              <div>
                <h3
                  className="mono mb-2"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-1)",
                  }}
                >
                  Earlier
                </h3>
                <ul className="flex flex-col gap-1 list-none">
                  {EARLIER_ROLES.map((role) => (
                    <li
                      key={role.company}
                      style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}
                    >
                      {role.title}
                      <span
                        className="mono"
                        style={{ color: "var(--text-subtle)", fontSize: "0.64rem" }}
                      >
                        {" "}
                        {role.period}
                      </span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-2"
                  style={{
                    color: "var(--text-subtle)",
                    fontSize: "0.7rem",
                    lineHeight: 1.45,
                    fontStyle: "italic",
                  }}
                >
                  {EARLIER_NOTE}
                </p>
              </div>

              <div>
                <h3
                  className="mono mb-2"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--accent-1)",
                  }}
                >
                  Education
                </h3>
                <ul className="flex flex-col gap-2 list-none">
                  {EDUCATION.map((school) => (
                    <li key={school.school}>
                      <p style={{ fontSize: "0.78rem", lineHeight: 1.35 }}>
                        {school.school}
                      </p>
                      <p
                        className="mono"
                        style={{ color: "var(--text-subtle)", fontSize: "0.64rem" }}
                      >
                        {school.credential}, {school.period}
                      </p>
                    </li>
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
