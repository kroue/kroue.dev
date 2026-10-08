"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import { ROLES } from "@/lib/resume";

const FloatingGeometry = dynamic(
  () => import("@/components/three/FloatingGeometry"),
  { ssr: false }
);

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  // One pass through the roles, then it rests on the primary title. An endless
  // loop would compete with the page for attention and overshoot MOTION 2.
  const [settled, setSettled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (settled) return;
    const current = ROLES[roleIndex];

    if (!deleting && displayed === current) {
      // Word complete, so hold it and then start erasing.
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (!deleting) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60
      );
    } else if (displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        35
      );
    } else if (roleIndex < ROLES.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => i + 1);
      }, 200);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(ROLES[0]);
        setDeleting(false);
        setSettled(true);
      }, 200);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIndex, settled]);

  return (
    <>
      {/* The animation is decorative; assistive tech gets the full list once
          instead of a character-by-character stream. */}
      <span className="sr-only">{ROLES.join(", ")}</span>
      <span
        aria-hidden="true"
        className="mono"
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          color: "var(--accent-1)",
        }}
      >
        {displayed}
        {!settled && <span className="cursor-blink">|</span>}
      </span>
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="sticky top-0 z-0 h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ opacity, scale, filter }}
    >
      {/* 3D Background */}
      <div
        className="absolute inset-0"
      >
        <FloatingGeometry />
      </div>

      {/* Flat base background behind 3D if needed */}
      <div className="absolute inset-0 pointer-events-none bg-[var(--background)] opacity-10" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-8 w-full mx-auto" style={{ maxWidth: 720 }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 mono"
          style={{
            border: "1px solid var(--border)",
            background: "var(--surface)",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            padding: "6px 16px",
          }}
        >
          <span
            className="w-2 h-2"
            style={{
              background: "var(--accent-2)",
              borderRadius: "var(--radius-pill)",
            }}
            aria-hidden="true"
          />
          Available for work
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          id="hero-name"
          style={{
            fontSize: "var(--step-4)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            cursor: "default",
            userSelect: "none",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, var(--accent-1) 50%, var(--accent-3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            kuroe
          </span>
        </motion.h1>

        {/* Full Name Subtitle */}
        <RevealText
          text="Aljohn Arranguez"
          elementType="h2"
          delay={0.4}
          stagger={0.05}
          className="text-muted"
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 500,
            color: "var(--text-subtle)",
            marginTop: "0.35rem",
            marginBottom: "0.5rem",
            letterSpacing: "0.05em",
            display: "flex",
            justifyContent: "center",
          }}
        />

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 mb-6"
          style={{ minHeight: 32 }}
        >
          <TypewriterText />
        </motion.div>

        {/* Tagline */}
        <RevealText
          text="I ship production systems for paying clients: offline-first Android field apps, POS and inventory platforms, and the web consoles behind them. Cagayan de Oro, open to remote."
          elementType="p"
          delay={0.8}
          stagger={0.01}
          className="text-center"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto 2.5rem",
          }}
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#projects" className="btn btn-primary">
            See the projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a conversation
          </a>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.6rem",
            color: "var(--text-subtle)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-12"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent-1), transparent)",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
