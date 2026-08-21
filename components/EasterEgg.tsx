"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Triple-click on name triggers easter egg
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === "hero-name") {
        setClickCount((c) => c + 1);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (clickCount >= 3) {
      setActive(true);
      setClickCount(0);
    }
  }, [clickCount]);

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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "rgba(4,4,12,0.97)", backdropFilter: "blur(12px)" }}
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
                border: `2px solid ${i === 0 ? "#4fc3f7" : i === 1 ? "#c8a96e" : "#a78bfa"}`,
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
                background: "linear-gradient(135deg, #c8a96e, #f0c97a, #c8a96e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                lineHeight: 1,
                filter: "drop-shadow(0 0 40px rgba(200,169,110,0.6))",
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
                  color: "#c8a96e",
                  textTransform: "uppercase",
                  textShadow: "0 0 20px rgba(200,169,110,0.5)",
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
                  color: "#6b6b8a",
                }}
              >
                // you found the hidden identity
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
                background: "linear-gradient(90deg, transparent, #c8a96e, transparent)",
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
                color: "#3a3a5c",
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
