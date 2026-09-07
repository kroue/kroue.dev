"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ShapeTransition from "@/components/ui/ShapeTransition";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  submitContact,
  validateContact,
  LIMITS,
  type ContactErrors,
  type ContactForm,
} from "@/lib/contact";
import {
  FaFacebookF,
  FaInstagram,
  FaDiscord,
  FaTiktok,
  FaGithub,
  FaWhatsapp,
  FaTelegram,
  FaCheck,
  FaLocationDot,
  FaLinkedinIn,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  /** Dark foreground on hover, for platforms whose brand colour is light. */
  darkOnHover?: boolean;
  href?: string;
  copyText?: string;
}

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { name: "Facebook", icon: <FaFacebookF size={18} />, href: "https://www.facebook.com/aljohnarranguez", color: "#1877F2" },
  { name: "Instagram", icon: <FaInstagram size={19} />, href: "https://www.instagram.com/k_al.173", color: "#E4405F" },
  { name: "Discord", icon: <FaDiscord size={19} />, href: "https://discord.gg/HPp4gsPnKy", color: "#5865F2" },
  { name: "TikTok", icon: <FaTiktok size={18} />, href: "https://www.tiktok.com/@ahahahahahahwahahahaw", color: "#ffffff", darkOnHover: true },
  { name: "GitHub", icon: <FaGithub size={19} />, href: "https://github.com/kroue", color: "#ffffff", darkOnHover: true },
  { name: "LinkedIn", icon: <FaLinkedinIn size={19} />, href: "https://linkedin.com/in/aljohn-arranguez", color: "#0A66C2" },
  { name: "Gmail", icon: <SiGmail size={18} />, copyText: "arranguez.aljohn0130@gmail.com", color: "#EA4335" },
  { name: "WhatsApp", icon: <FaWhatsapp size={19} />, copyText: "+639535383369", color: "#25D366" },
  { name: "Telegram", icon: <FaTelegram size={19} />, copyText: "@kroueshi", color: "#229ED9" },
];

const AVAILABILITY = [
  "Full-stack and mobile roles — remote or Cagayan de Oro",
  "Offline-first Android and web platform builds",
  "Freelance client work, proposal through deployment and training",
];

const EMPTY_FORM: ContactForm = { name: "", email: "", message: "" };

export default function Contact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bot traps: a field only an automated filler will touch, and the time the
  // form first rendered.
  const [honeypot, setHoneypot] = useState("");
  // Stamped in an effect rather than during render, so the clock read stays out
  // of the render path. Until it lands the elapsed time reads as very large,
  // which fails open for real users.
  const startedAtRef = useRef(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const messageLeft = LIMITS.message.max - form.message.length;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(
        () => setCopiedId((current) => (current === id ? null : current)),
        2000
      );
    } catch {
      setFormError(`Couldn't copy automatically. ${id}: ${text}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    // Only re-validate a field the user has already left once, so errors don't
    // appear while they are still typing their first pass.
    if (touched[name]) {
      setErrors(validateContact({ ...form, [name]: value }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validateContact(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    const result = await submitContact(form, {
      honeypot,
      startedAt: startedAtRef.current,
    });
    setSending(false);

    if (result.ok) {
      setSent(true);
      setForm(EMPTY_FORM);
      setTouched({});
      setErrors({});
    } else {
      setFormError(result.error);
    }
  };

  const resetForm = () => {
    setSent(false);
    setFormError(null);
    setHoneypot("");
  };

  const fieldProps = (name: keyof ContactForm) => ({
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: sending,
    className: "field",
    "aria-invalid": Boolean(touched[name] && errors[name]),
    "aria-describedby":
      touched[name] && errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="section scroll-mt-16" ref={containerRef}>
      <div className="backdrop backdrop-bloom" aria-hidden="true" />

      <ShapeTransition color="var(--accent-1)" direction="diagonal" delay={0.2}>
        <motion.div
          style={{ opacity }}
          className="w-full flex flex-col items-center justify-center"
        >

          <div className="shell relative z-10">
            <SectionHeader
              index="05"
              label="// let's connect"
              title="Ready to Build Something Great?"
              inView={inView}
              accent="var(--accent-3)"
            />

            {/* Two columns: the pitch and contact details on the left, the form
                on the right. The old single centred column left a large dead
                band under the navbar and stacked a redundant card above the
                form. */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,30rem)] gap-10 lg:gap-14 items-start">
              {/* ---------- Left: pitch, availability, socials ---------- */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col gap-8 min-w-0"
              >
                <p className="section-lede">
                  Whether you have a project in mind, a role to fill, or just
                  want to talk code — my inbox is always open.
                </p>

                <div>
                  <h3
                    className="mono mb-3"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-1)",
                    }}
                  >
                    Currently open for
                  </h3>
                  <ul className="flex flex-col gap-2.5 list-none">
                    {AVAILABILITY.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3"
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="mono"
                          style={{ color: "var(--accent-2)", flexShrink: 0 }}
                        >
                          ▸
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3
                    className="mono mb-3"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-1)",
                    }}
                  >
                    Find me elsewhere
                  </h3>
                  <ul className="flex flex-wrap items-center gap-2.5 list-none">
                    {SOCIAL_PLATFORMS.map((social) => {
                      const isCopied = copiedId === social.name;
                      const label = social.copyText
                        ? `Copy ${social.name} — ${social.copyText}`
                        : `${social.name} (opens in a new tab)`;

                      const content = (
                        <>
                          <motion.span
                            initial={false}
                            animate={{
                              opacity: isCopied ? 0 : 1,
                              scale: isCopied ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: "absolute",
                              display: "grid",
                              placeItems: "center",
                            }}
                            aria-hidden="true"
                          >
                            {social.icon}
                          </motion.span>
                          <motion.span
                            initial={false}
                            animate={{
                              opacity: isCopied ? 1 : 0,
                              scale: isCopied ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: "absolute",
                              display: "grid",
                              placeItems: "center",
                            }}
                            aria-hidden="true"
                          >
                            <FaCheck size={17} />
                          </motion.span>
                        </>
                      );

                      const shared = {
                        className:
                          "relative flex items-center justify-center w-11 h-11 cursor-pointer",
                        style: {
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          color: "var(--text-muted)",
                        },
                        whileHover: {
                          y: -4,
                          backgroundColor: social.color,
                          borderColor: social.color,
                          color: social.darkOnHover ? "#191825" : "#ffffff",
                        },
                        whileTap: { scale: 0.94 },
                        transition: {
                          type: "spring" as const,
                          stiffness: 400,
                          damping: 17,
                        },
                      };

                      return (
                        <li key={social.name}>
                          {social.copyText ? (
                            <motion.button
                              type="button"
                              onClick={() =>
                                handleCopy(social.copyText!, social.name)
                              }
                              aria-label={label}
                              title={isCopied ? "Copied!" : label}
                              {...shared}
                            >
                              {content}
                            </motion.button>
                          ) : (
                            <motion.a
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              title={social.name}
                              {...shared}
                            >
                              {content}
                            </motion.a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div
                  className="mono flex flex-wrap gap-x-6 gap-y-2 pt-2"
                  style={{ fontSize: "0.75rem" }}
                >
                  <a
                    href="https://github.com/kroue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    style={{ textDecoration: "none" }}
                  >
                    <FaGithub size={13} style={{ color: "var(--accent-1)" }} aria-hidden="true" />
                    <span style={{ color: "var(--text-muted)" }}>GitHub:</span>
                    <span style={{ color: "var(--text-primary)" }}>kroue</span>
                  </a>
                  <span className="flex items-center gap-2">
                    <FaLocationDot size={13} style={{ color: "var(--accent-1)" }} aria-hidden="true" />
                    <span style={{ color: "var(--text-muted)" }}>Location:</span>
                    <span style={{ color: "var(--text-primary)" }}>
                      Cagayan de Oro, PH
                    </span>
                  </span>
                </div>
              </motion.div>

              {/* ---------- Right: the form ---------- */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                /* Not sticky. A sticky item shifts visually without moving in
                   flow, which pushed the form out of alignment with the left
                   column and let it overlap the footer below the grid. */
                className="card card-bracket w-full p-7"
              >
                <div aria-live="polite" className="sr-only">
                  {sending
                    ? "Sending message"
                    : sent
                      ? "Message sent"
                      : (formError ?? "")}
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}
                      aria-hidden="true"
                    >
                      🚀
                    </div>
                    <p className="font-bold" style={{ fontSize: "1.15rem" }}>
                      Message sent!
                    </p>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        marginTop: "0.35rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      I&apos;ll get back to you soon.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-ghost mt-6"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                    noValidate
                  >
                    <h3
                      className="mono"
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--accent-1)",
                      }}
                    >
                      Send a message
                    </h3>

                    {/* Honeypot. Hidden from sighted users and screen readers. */}
                    <div className="honeypot" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="field-label">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        maxLength={LIMITS.name.max}
                        placeholder="Your name"
                        {...fieldProps("name")}
                      />
                      {touched.name && errors.name && (
                        <span id="name-error" className="field-error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="field-label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        maxLength={LIMITS.email.max}
                        placeholder="your@email.com"
                        {...fieldProps("email")}
                      />
                      {touched.email && errors.email && (
                        <span id="email-error" className="field-error">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <label htmlFor="message" className="field-label">
                          Message
                        </label>
                        <span
                          className="mono"
                          style={{
                            fontSize: "0.65rem",
                            color:
                              messageLeft < 100
                                ? "var(--danger)"
                                : "var(--text-subtle)",
                          }}
                        >
                          {messageLeft}
                        </span>
                      </div>
                      <textarea
                        id="message"
                        rows={5}
                        maxLength={LIMITS.message.max}
                        placeholder="Tell me about your project..."
                        style={{ resize: "vertical" }}
                        {...fieldProps("message")}
                      />
                      {touched.message && errors.message && (
                        <span id="message-error" className="field-error">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn btn-primary w-full mt-1"
                    >
                      {sending ? (
                        <>
                          <span className="spin" aria-hidden="true">
                            ◌
                          </span>
                          Sending...
                        </>
                      ) : (
                        "Send It →"
                      )}
                    </button>

                    {formError && (
                      <p
                        className="text-center px-3 py-2"
                        style={{
                          color: "var(--danger)",
                          background: "var(--danger-bg)",
                          border: "1px solid var(--danger)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {formError}
                      </p>
                    )}
                  </form>
                )}
              </motion.div>
            </div>

            <footer
              className="mono text-center mt-16 pt-6"
              style={{
                borderTop: "1px solid var(--border-subtle)",
                fontSize: "0.68rem",
                color: "var(--text-subtle)",
                letterSpacing: "0.08em",
              }}
            >
              © {new Date().getFullYear()} kuroe — built with Next.js & React
              Three Fiber
            </footer>
          </div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
