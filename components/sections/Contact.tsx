"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import ShapeTransition from "@/components/ui/ShapeTransition";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaDiscord, 
  FaTiktok, 
  FaGithub, 
  FaWhatsapp, 
  FaTelegram,
  FaCheck
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const zoomIn = {
  hidden: { opacity: 0, scale: 1.05, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] },
  }),
};

const SOCIAL_PLATFORMS = [
  { name: "Facebook", icon: <FaFacebookF size={24} />, href: "https://www.facebook.com/aljohnarranguez", color: "#1877F2" },
  { name: "Instagram", icon: <FaInstagram size={26} />, href: "https://www.instagram.com/k_al.173", color: "#E4405F" },
  { name: "Discord", icon: <FaDiscord size={26} />, href: "https://discord.gg/HPp4gsPnKy", color: "#5865F2" },
  { name: "TikTok", icon: <FaTiktok size={24} />, href: "https://www.tiktok.com/@ahahahahahahwahahahaw", color: "#ffffff" },
  { name: "GitHub", icon: <FaGithub size={26} />, href: "https://github.com/kroue", color: "#ffffff" },
  { name: "Gmail", icon: <SiGmail size={24} />, copyText: "arranguez.aljohn0130@gmail.com", color: "#EA4335" },
  { name: "WhatsApp", icon: <FaWhatsapp size={26} />, copyText: "+639535383369", color: "#25D366" },
  { name: "Telegram", icon: <FaTelegram size={26} />, copyText: "@kroueshi", color: "#229ED9" },
];

const SOCIAL_LINKS = [
  { label: "GitHub", value: "kroue", href: "https://github.com/kroue", icon: "⌥" },
  { label: "Location", value: "Cagayan de Oro, PH 🇵🇭", href: null, icon: "◎" },
];

export default function Contact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 0,
    padding: "10px 14px",
    color: "var(--text-primary)",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.88rem",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-1)";
    e.currentTarget.style.background = "var(--surface-2)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.background = "var(--surface)";
  };

  return (
    <section 
      id="contact" 
      className="section relative scroll-mt-16" 
      ref={containerRef}
    >
      <ShapeTransition color="var(--accent-1)" direction="up" delay={0.2}>
        <motion.div style={{ opacity }} className="w-full h-full flex flex-col items-center justify-between pt-10 pb-20">
          
          {/* Header & Form Block */}
          <div className="relative z-10 w-full px-6 mx-auto flex flex-col items-center flex-shrink-0" style={{ maxWidth: 660 }}>
            {/* Header */}
            <motion.div
              custom={0}
              variants={zoomIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="section-label mb-1.5 text-center"
            >
              // let&apos;s connect
            </motion.div>

            <RevealText
              text="Ready to Build Something Great?"
              elementType="h2"
              delay={0.2}
              className="text-center font-bold mb-2 gradient-text-accent"
              style={{
                fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
                lineHeight: 1.1,
              }}
            />

            <motion.p
              custom={1}
              variants={zoomIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                color: "var(--text-muted)",
                textAlign: "center",
                marginBottom: "1.25rem",
                lineHeight: 1.45,
                fontSize: "0.88rem",
              }}
            >
              Whether you have a project in mind, a role to fill, or just want to
              talk code — my inbox is always open.
            </motion.p>

            {/* Subcard & Form Container */}
            <motion.div
              custom={2}
              variants={zoomIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="w-full flex flex-col gap-3.5"
            >
              <div
                className="flat-card rounded-none text-center"
                style={{ padding: "0.85rem 1.15rem", border: "1px solid var(--border)" }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.05rem, 1.9vw, 1.4rem)",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.2rem",
                  }}
                >
                  Let&apos;s build something together.
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    maxWidth: 460,
                    margin: "0 auto",
                  }}
                >
                  Open for front-end roles, capstone project collaboration, and freelance opportunities.
                </p>
              </div>

              <div
                className="flat-card rounded-none"
                style={{ padding: "1.15rem 1.35rem", border: "1px solid var(--border)" }}
              >
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <div style={{ fontSize: "2.8rem", marginBottom: "0.75rem" }}>🚀</div>
                    <div
                      style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}
                    >
                      Message sent!
                    </div>
                    <div style={{ color: "var(--text-muted)", marginTop: "0.4rem", fontSize: "0.9rem" }}>
                      I&apos;ll get back to you soon.
                    </div>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "0.65rem",
                            color: "var(--accent-1)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          NAME
                        </label>
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="Your name"
                          style={inputStyle}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "0.65rem",
                            color: "var(--accent-1)",
                            letterSpacing: "0.1em",
                          }}
                        >
                          EMAIL
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          placeholder="your@email.com"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          fontSize: "0.65rem",
                          color: "var(--accent-1)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Tell me about your project..."
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      style={{
                        background: sending
                          ? "var(--surface-2)"
                          : "var(--accent-1)",
                        color: sending ? "var(--text-muted)" : "#ffffff",
                        border: "none",
                        borderRadius: 0,
                        padding: "10px 22px",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        cursor: sending ? "wait" : "pointer",
                        width: "100%",
                        transition: "background 0.3s",
                        fontFamily: "Inter, sans-serif",
                        boxShadow: "none",
                      }}
                    >
                      {sending ? (
                        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{ display: "inline-block" }}
                          >
                            ◌
                          </motion.span>
                          Sending...
                        </span>
                      ) : (
                        "Send It →"
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* NEW HORIZONTAL SOCIAL MEDIA DOCK (Centered between form and footer) */}
          <motion.div
            custom={3}
            variants={zoomIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex-1 flex items-center justify-center w-full min-h-[120px]"
          >
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4">
              {SOCIAL_PLATFORMS.map((social) => {
                const isCopied = copiedId === social.name;
                
                const content = (
                  <>
                    <motion.div
                      initial={false}
                      animate={{ opacity: isCopied ? 0 : 1, scale: isCopied ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute" }}
                    >
                      {social.icon}
                    </motion.div>
                    <motion.div
                      initial={false}
                      animate={{ opacity: isCopied ? 1 : 0, scale: isCopied ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: "absolute" }}
                    >
                      <FaCheck size={24} />
                    </motion.div>
                  </>
                );

                const commonProps = {
                  className: "relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full cursor-pointer",
                  style: {
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  },
                  whileHover: { 
                    scale: 1.25, 
                    y: -6,
                    backgroundColor: social.color,
                    borderColor: social.color,
                    color: social.name === "TikTok" || social.name === "GitHub" ? "#000" : "#fff",
                  },
                  whileTap: { scale: 0.95 },
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                  title: isCopied ? "Copied!" : social.name,
                };

                return social.copyText ? (
                  <motion.button
                    key={social.name}
                    type="button"
                    onClick={() => handleCopy(social.copyText!, social.name)}
                    {...(commonProps as any)}
                  >
                    {content}
                  </motion.button>
                ) : (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(commonProps as any)}
                  >
                    {content}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Social links & Copyright Footer pinned to absolute bottom edge */}
          <motion.div
            custom={4}
            variants={zoomIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-1.5 px-6 text-center"
          >
            <div className="flex flex-wrap justify-center gap-6">
              {SOCIAL_LINKS.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors duration-200"
                    style={{
                      color: "var(--text-subtle)",
                      textDecoration: "none",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.78rem",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--accent-1)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--text-subtle)")
                    }
                  >
                    <span>{s.icon}</span>
                    <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                    <span style={{ color: "var(--text-primary)" }}>{s.value}</span>
                  </a>
                ) : (
                  <div
                    key={s.label}
                    className="flex items-center gap-2"
                    style={{
                      color: "var(--text-subtle)",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "0.78rem",
                    }}
                  >
                    <span>{s.icon}</span>
                    <span style={{ color: "var(--text-muted)" }}>{s.label}:</span>
                    <span style={{ color: "var(--text-primary)" }}>{s.value}</span>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.7rem",
                color: "var(--text-subtle)",
                letterSpacing: "0.1em",
              }}
            >
              © {new Date().getFullYear()} kuroe — built with Next.js & React Three Fiber
            </div>
          </motion.div>
        </motion.div>
      </ShapeTransition>
    </section>
  );
}
