"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < window.innerHeight * 0.3) {
        setActive("#hero");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    
    if (href === "#contact") {
      if (lenis) {
        lenis.scrollTo(document.body.scrollHeight, { duration: 1.2 });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      return;
    }

    if (lenis) {
      if (href === "#hero") {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        lenis.scrollTo(href, { duration: 1.2, offset: 0 });
      }
    } else {
      if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] w-full"
      style={{
        height: 64,
        background: "var(--background)",
        borderBottom: scrolled
          ? "1px solid rgba(59,58,90,0.6)"
          : "1px solid transparent",
        transition: "border-color 0.3s",
      }}
    >
      <div
        className="w-full h-full flex items-center justify-between relative"
        style={{
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
      >
        {/* Left — Logo (Only visible when scrolled past Hero section) */}
        <div className="flex items-center min-w-[100px]">
          <AnimatePresence>
            {active !== "#hero" && (
              <motion.button
                key="nav-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => handleClick("#hero")}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.9rem",
                  color: "var(--accent-1)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                }}
              >
                <span style={{ color: "var(--accent-2)" }}>{"<"}</span>
                kuroe
                <span style={{ color: "var(--accent-2)" }}>{"/>"}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Center — Desktop links */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: active === link.href ? "var(--text-primary)" : "var(--text-subtle)",
                transition: "color 0.2s",
                position: "relative",
                padding: "4px 0",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  active === link.href ? "var(--text-primary)" : "var(--text-subtle)")
              }
            >
              {link.label}
              {active === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, transparent, var(--accent-1), transparent)",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right — Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 9 }
                    : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -9 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                width: 22,
                height: 1.5,
                background: "var(--accent-1)",
                borderRadius: 2,
              }}
            />
          ))}
        </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 flex flex-col md:hidden"
            style={{
              background: "rgba(8,8,16,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(30,30,53,0.8)",
              padding: "1rem 1.5rem",
              gap: 4,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "0.75rem 0",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: active === link.href ? "var(--accent-1)" : "var(--text-subtle)",
                  borderBottom: "1px solid rgba(30,30,53,0.4)",
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.nav>
  );
}
