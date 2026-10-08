"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let frame = 0;

    // An IntersectionObserver cannot drive this: #hero is `position: sticky`,
    // so it stays pinned across the viewport for the entire scroll and reports
    // as intersecting the whole way down, which pinned the indicator to
    // "Home". Resolving against the scrolled sections' own rects instead, and
    // treating hero as the fallback, is unambiguous.
    const resolveActive = () => {
      const line = window.innerHeight * 0.4;
      let current = "#hero";

      for (const link of NAV_LINKS) {
        if (link.href === "#hero") continue;
        const el = document.getElementById(link.href.slice(1));
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line && bottom > line) current = link.href;
      }

      // The last section can't reach the line once the page bottoms out.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) current = NAV_LINKS[NAV_LINKS.length - 1].href;

      setActive(current);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Coalesce to one resolve per frame; Lenis emits scroll events densely.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolveActive();
      });
    };

    onScroll();
    resolveActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resolveActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resolveActive);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // An open mobile menu should close the way users expect it to: Escape, or a
  // tap anywhere outside it.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

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
    } else if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      aria-label="Primary"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] w-full"
      style={{
        height: "var(--nav-h)",
        // Solid at the top of the page (over the 3D hero), glass once scrolled
        // so section content reads through it instead of being clipped.
        background: scrolled ? "var(--surface-glass)" : "var(--background)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "border-color 0.3s, background-color 0.3s",
      }}
    >
      <div className="nav-shell">
        {/* Logo, revealed once you leave the hero. */}
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
                aria-label="Back to top"
                className="mono cursor-pointer hit-44"
                style={{
                  fontSize: "0.9rem",
                  color: "var(--accent-1)",
                  background: "none",
                  border: "none",
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

        {/* Desktop links. */}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleClick(link.href)}
                className="nav-link"
                aria-current={active === link.href ? "true" : undefined}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
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
            </li>
          ))}
        </ul>

        {/* Mobile toggle. */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
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
                display: "block",
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
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 flex flex-col md:hidden list-none"
              style={{
                background: "var(--surface-glass)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--border)",
                padding: "0.5rem 1.5rem 1rem",
              }}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="flex">
                  <button
                    onClick={() => handleClick(link.href)}
                    className="nav-link-mobile w-full"
                    aria-current={active === link.href ? "true" : undefined}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
