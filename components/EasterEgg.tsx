"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const clicksRef = useRef(0);

  // Three clicks on the hero name opens it. The count lives in a ref so the
  // threshold is checked in the event handler rather than in an effect.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).id !== "hero-name") return;
      clicksRef.current += 1;
      if (clicksRef.current >= 3) {
        clicksRef.current = 0;
        setActive(true);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // A full-screen overlay has to be dismissible from the keyboard.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Konami code
  useEffect(() => {
    const sequence = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let pos = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === sequence[pos]) {
        pos++;
        if (pos === sequence.length) {
          setActive(true);
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Easter egg. Press Escape to close."
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "rgba(25, 24, 37, 0.97)", backdropFilter: "blur(12px)" }}
          onClick={() => setActive(false)}
        >
          {/* Ink splash rings */}
          {[1, 1.5, 2].map((s, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: s * 8, opacity: 0 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                border: `2px solid ${i === 0 ? "var(--accent-2)" : i === 1 ? "var(--accent-1)" : "var(--accent-1)"}`,
              }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
            className="text-center select-none"
          >
            <div
              style={{
                fontSize: "clamp(5rem, 15vw, 10rem)",
                fontFamily: "serif",
                background: "linear-gradient(135deg, var(--accent-1), var(--accent-2), var(--accent-1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                lineHeight: 1,
                filter: "drop-shadow(0 0 40px var(--accent-1-a40))",
              }}
            >
              黑風
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "1.1rem",
                  letterSpacing: "0.5em",
                  color: "var(--accent-1)",
                  textTransform: "uppercase",
                  textShadow: "0 0 20px var(--accent-1-a40)",
                }}
              >
                Black Storm
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: "var(--text-subtle)",
                }}
              >
                {"// you found the hidden identity"}
              </div>
            </motion.div>

            {/* Decorative lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-8 mx-auto"
              style={{
                height: 1,
                width: 240,
                background: "linear-gradient(90deg, transparent, var(--accent-1), transparent)",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-6"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.65rem",
                color: "var(--border)",
                letterSpacing: "0.2em",
              }}
            >
              click anywhere to return
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
