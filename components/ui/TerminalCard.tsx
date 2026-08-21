"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandOutput {
  command: string;
  output: string[];
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami     → About me",
    "  skills     → My tech stack",
    "  projects   → My work",
    "  contact    → Get in touch",
    "  clear      → Clear terminal",
  ],
  whoami: [
    "Aljohn Arranguez",
    "─────────────────────────────────",
    "Role:     Creative Front-End Developer",
    "Location: Cagayan de Oro, PH 🇵🇭",
    "School:   USTP — BS Information Technology",
    "Status:   Open to work ✅",
  ],
  skills: [
    "Frontend  → React · Next.js · Angular · TypeScript",
    "Styling   → Tailwind CSS · shadcn/ui",
    "Backend   → Firebase · Supabase · Python",
    "Systems   → Rust · Java · C++ · C#",
    "Tooling   → Git · Vite · Framer Motion",
  ],
  projects: [
    "Professional clients:",
    "  [1] MEEDO    — Water billing system",
    "  [2] LANTAW   — Web application",
    "",
    "Capstone work:",
    "  [3] React, Next.js & Angular projects",
    "      for student developers",
    "",
    "GitHub: github.com/kroue",
  ],
  contact: [
    "Let's build something great.",
    "─────────────────────────────────",
    "Email:    available on request",
    "GitHub:   github.com/kroue",
    "Location: Cagayan de Oro, PH",
  ],
};

const MOTD = [
  "  ╔══════════════════════════════════════╗",
  "  ║     kroue.dev ~ terminal      ║",
  "  ╚══════════════════════════════════════╝",
  "",
  '  Type "help" to see available commands.',
  "",
];

export default function TerminalCard() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      setCommandHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);

      let output: string[];
      if (cmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } else if (COMMANDS[cmd]) {
        output = COMMANDS[cmd];
      } else {
        output = [
          `Command not found: ${cmd}`,
          'Try "help" for a list of commands.',
        ];
      }

      setHistory((prev) => [...prev, { command: cmd, output }]);
      setInput("");
    },
    [input]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : commandHistory[next]);
    }
  };

  return (
    <div
      className="glass rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(79,195,247,0.2)", maxWidth: 580 }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-6 py-4"
        style={{
          background: "rgba(13,13,26,0.9)",
          borderBottom: "1px solid rgba(79,195,247,0.15)",
        }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#c8a96e" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "#4fc3f7" }} />
        <span
          className="ml-2 text-xs"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#6b6b8a" }}
        >
          kuroe.dev
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={terminalBodyRef}
        className="overflow-y-auto"
        style={{
          height: 320,
          padding: "1.75rem",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.78rem",
          lineHeight: 1.6,
          color: "#e2d9c5",
        }}
      >
        {/* MOTD */}
        {MOTD.map((line, i) => (
          <div key={i} style={{ color: "#4fc3f7" }}>
            {line}
          </div>
        ))}

        {/* History */}
        <AnimatePresence>
          {history.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div style={{ color: "#4fc3f7" }}>
                <span style={{ color: "#c8a96e" }}>~</span>
                <span style={{ color: "#6b6b8a" }}> $ </span>
                {entry.command}
              </div>
              {entry.output.map((line, j) => (
                <div key={j} style={{ color: "#a1a1aa", paddingLeft: "0.5rem" }}>
                  {line}
                </div>
              ))}
              <br />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input row */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          <span style={{ color: "#c8a96e" }}>~</span>
          <span style={{ color: "#6b6b8a" }}> $ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f0eeee",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.78rem",
              flex: 1,
              caretColor: "#4fc3f7",
            }}
          />
          <span className="cursor-blink" style={{ color: "#4fc3f7" }}>
            ▊
          </span>
        </form>
      </div>
    </div>
  );
}
