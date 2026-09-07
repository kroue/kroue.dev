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
  // screen — which is also what lets the scroll snapping engage here.
  const [active, setActive] = useState(0);
  const system = SYSTEMS[active];

  return (
    <section id="experience" className="section scroll-mt-16" ref={containerRef}>
      <div className="backdrop backdrop-diagonal" aria-hidden="true" />

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

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,20rem)_1fr] gap-5 lg:gap-6 items-start">
              {/* ---------- Left: roles ---------- */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-3 min-w-0"
              >
                <div
                  className="card p-4"
                  style={{ borderLeft: "3px solid var(--accent-1)" }}
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-bold" style={{ fontSize: "0.98rem" }}>
                      {FREELANCE.title}
                    </h3>
                    <span
                      className="mono"
                      style={{ fontSize: "0.68rem", color: "var(--accent-2)" }}
                    >
                      {FREELANCE.period}
                    </span>
                  </div>
                  <p
                    className="mono mt-1"
                    style={{ fontSize: "0.68rem", color: "var(--text-subtle)" }}
                  >
                    {FREELANCE.location}
                  </p>
                  <p
                    className="mt-3"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.83rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {FREELANCE.summary}
                  </p>
                </div>

                <div className="card p-4">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-bold" style={{ fontSize: "0.92rem" }}>
                      {OJT.title}
                    </h3>
                    <span
                      className="mono"
                      style={{ fontSize: "0.68rem", color: "var(--accent-2)" }}
                    >
                      {OJT.period}
                    </span>
                  </div>
                  <p
                    className="mono mt-1"
                    style={{ fontSize: "0.68rem", color: "var(--text-subtle)" }}
                  >
                    {OJT.company}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.8rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {OJT.points?.[0]}
                  </p>
                </div>

                <div className="card p-4">
                  <h3
                    className="mono mb-2"
                    style={{
                      fontSize: "0.66rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-1)",
                    }}
                  >
                    Earlier
                  </h3>
                  {/* Two lines per role. Squeezing the title and the period
                      onto one row in this narrow column made both wrap, which
                      broke the years across lines ("2023 —" / "2024"). */}
                  <ul className="flex flex-col gap-2 list-none">
                    {EARLIER_ROLES.map((role) => (
                      <li key={role.company} className="flex flex-col">
                        <span
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "0.78rem",
                            lineHeight: 1.35,
                          }}
                        >
                          {role.title}
                        </span>
                        <span
                          className="mono"
                          style={{
                            fontSize: "0.64rem",
                            color: "var(--text-subtle)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {role.company} · {role.period}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--text-subtle)",
                      fontSize: "0.75rem",
                      lineHeight: 1.5,
                      fontStyle: "italic",
                    }}
                  >
                    {EARLIER_NOTE}
                  </p>
                </div>
              </motion.div>

              {/* ---------- Right: client systems, tabbed ---------- */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col gap-3 min-w-0"
              >
                <div
                  role="tablist"
                  aria-label="Client systems"
                  className="flex flex-wrap gap-2"
                >
                  {SYSTEMS.map((s, i) => (
                    <button
                      key={s.name}
                      role="tab"
                      id={`exp-tab-${i}`}
                      aria-selected={i === active}
                      aria-controls={`exp-panel-${i}`}
                      onClick={() => setActive(i)}
                      className="mono cursor-pointer"
                      style={{
                        padding: "0.5rem 1.1rem",
                        fontSize: "0.74rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        border: `1px solid ${i === active ? "var(--accent-1)" : "var(--border)"}`,
                        background: i === active ? "var(--accent-1)" : "var(--surface)",
                        color: i === active ? "#ffffff" : "var(--text-muted)",
                        transition: "all var(--dur) var(--ease-out)",
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>

                <div
                  className="card card-bracket p-6"
                  style={{ minHeight: 288 }}
                  role="tabpanel"
                  id={`exp-panel-${active}`}
                  aria-labelledby={`exp-tab-${active}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={system.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3
                        className="mono"
                        style={{
                          fontSize: "0.82rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "var(--accent-3)",
                        }}
                      >
                        {system.name}
                      </h3>
                      <p
                        className="mt-1 mb-4"
                        style={{
                          color: "var(--text-subtle)",
                          fontSize: "0.82rem",
                          fontStyle: "italic",
                        }}
                      >
                        {system.blurb}
                      </p>
                      <ul className="flex flex-col gap-2.5 list-none">
                        {system.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2.5"
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "0.85rem",
                              lineHeight: 1.6,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{ color: "var(--accent-2)", flexShrink: 0 }}
                            >
                              ▸
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Education strip */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none">
                  {EDUCATION.map((school) => (
                    <li key={school.school} className="card p-4">
                      <p
                        className="font-semibold"
                        style={{ fontSize: "0.82rem", lineHeight: 1.35 }}
                      >
                        {school.school}
                      </p>
                      <p
                        className="mt-1"
                        style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}
                      >
                        {school.credential}
                      </p>
                      <p
                        className="mono mt-1"
                        style={{ fontSize: "0.64rem", color: "var(--text-subtle)" }}
                      >
                        {school.period}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
