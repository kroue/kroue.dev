"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "firebase/auth";
import {
  watchAuth,
  signIn,
  signOutAdmin,
  isAdmin,
  fetchMessages,
  setMessageStatus,
  type InboxMessage,
  type MessageStatus,
} from "@/lib/overseer";

type Filter = "all" | "new" | "read" | "archived";

const FILTERS: Filter[] = ["all", "new", "read", "archived"];

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OverseerPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [admin, setAdmin] = useState<boolean | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // The admin check is awaited first on purpose: every setState below therefore
  // runs in an async continuation rather than synchronously inside the caller.
  const load = useCallback(async (current: User) => {
    const allowed = await isAdmin(current);

    setAdmin(allowed);
    setLoadError(null);

    if (!allowed) {
      setLoadError(
        "This account isn't an admin. Add a document to the `admins` collection whose ID is this account's UID, then reload."
      );
      return;
    }

    setLoading(true);
    const result = await fetchMessages();
    if (result.ok) setMessages(result.messages);
    else setLoadError(result.error);
    setLoading(false);
  }, []);

  // Loading happens inside the auth subscription callback rather than in a
  // second effect keyed on `user`. That is the shape this hook is meant to
  // have — subscribe to an external system, set state when it reports a change
  // — and it avoids the cascading render a separate effect would cause.
  useEffect(() => {
    return watchAuth((next) => {
      setUser(next);
      setCheckingAuth(false);
      if (next) {
        void load(next);
      } else {
        setAdmin(null);
        setMessages([]);
        setOpenId(null);
      }
    });
  }, [load]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSigningIn(true);
    const result = await signIn(email, password);
    setSigningIn(false);
    if (result.ok) {
      setPassword("");
    } else {
      setAuthError(result.error);
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    setMessages([]);
    setOpenId(null);
    setLoadError(null);
  };

  const updateStatus = async (id: string, status: MessageStatus) => {
    const previous = messages;
    setMessages((list) =>
      list.map((m) => (m.id === id ? { ...m, status } : m))
    );
    const ok = await setMessageStatus(id, status);
    if (!ok) {
      setMessages(previous); // roll back an optimistic update that failed
      setLoadError("Couldn't update that message's status.");
    }
  };

  const visible = useMemo(
    () => (filter === "all" ? messages : messages.filter((m) => m.status === filter)),
    [messages, filter]
  );

  const counts = useMemo(() => {
    const base = { all: messages.length, new: 0, read: 0, archived: 0 };
    for (const m of messages) base[m.status] += 1;
    return base;
  }, [messages]);

  // ---------- Loading auth state ----------
  if (checkingAuth) {
    return (
      <main className="min-h-screen grid place-items-center px-6">
        <p className="mono" style={{ color: "var(--text-subtle)" }}>
          Checking session…
        </p>
      </main>
    );
  }

  // ---------- Signed out: login ----------
  if (!user) {
    return (
      <main className="min-h-screen grid place-items-center px-6 py-16">
        <div className="w-full" style={{ maxWidth: 400 }}>
          <div className="mb-6">
            <p
              className="mono mb-2"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-2)",
              }}
            >
              {"// restricted"}
            </p>
            <h1
              className="font-bold gradient-text-accent"
              style={{ fontSize: "var(--step-2)", letterSpacing: "-0.02em" }}
            >
              Overseer
            </h1>
            <p
              className="mt-2"
              style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}
            >
              Sign in to read messages sent through the contact form.
            </p>
          </div>

          <form
            onSubmit={handleSignIn}
            className="card card-bracket p-6 flex flex-col gap-4"
            noValidate
          >
            <div aria-live="polite" className="sr-only">
              {signingIn ? "Signing in" : (authError ?? "")}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-email" className="field-label">
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={signingIn}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="admin-password" className="field-label">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={signingIn}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={signingIn}
            >
              {signingIn ? "Signing in…" : "Sign In"}
            </button>

            {authError && (
              <p
                className="text-center px-3 py-2"
                style={{
                  color: "var(--danger)",
                  background: "var(--danger-bg)",
                  border: "1px solid var(--danger)",
                  fontSize: "0.8rem",
                }}
              >
                {authError}
              </p>
            )}
          </form>

          <Link
            href="/"
            className="mono inline-block mt-6"
            style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}
          >
            ← Back to site
          </Link>
        </div>
      </main>
    );
  }

  // ---------- Signed in: inbox ----------
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full" style={{ maxWidth: 900 }}>
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p
              className="mono mb-1"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--accent-2)",
              }}
            >
              {"// inbox"}
            </p>
            <h1
              className="font-bold gradient-text-accent"
              style={{ fontSize: "var(--step-2)", letterSpacing: "-0.02em" }}
            >
              Overseer
            </h1>
            <p
              className="mono mt-1"
              style={{ fontSize: "0.72rem", color: "var(--text-subtle)" }}
            >
              {user.email}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => load(user)}
              className="btn btn-ghost"
              disabled={loading}
              style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}
            >
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-ghost"
              style={{ padding: "0.6rem 1.1rem", fontSize: "0.85rem" }}
            >
              Sign out
            </button>
          </div>
        </header>

        {loadError && (
          <p
            className="px-4 py-3 mb-6"
            style={{
              color: "var(--danger)",
              background: "var(--danger-bg)",
              border: "1px solid var(--danger)",
              fontSize: "0.85rem",
              lineHeight: 1.6,
            }}
          >
            {loadError}
          </p>
        )}

        {admin && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className="mono cursor-pointer"
                  aria-pressed={filter === f}
                  style={{
                    padding: "0.4rem 0.9rem",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: `1px solid ${filter === f ? "var(--accent-1)" : "var(--border)"}`,
                    background: filter === f ? "var(--accent-1)" : "var(--surface)",
                    color: filter === f ? "#fff" : "var(--text-muted)",
                    transition: "all var(--dur) var(--ease-out)",
                  }}
                >
                  {f} ({counts[f]})
                </button>
              ))}
            </div>

            {visible.length === 0 && !loading ? (
              <p
                className="card p-8 text-center"
                style={{ color: "var(--text-subtle)", fontSize: "0.9rem" }}
              >
                {messages.length === 0
                  ? "No messages yet."
                  : `No ${filter} messages.`}
              </p>
            ) : (
              <ul className="flex flex-col gap-3 list-none">
                {visible.map((m) => {
                  const open = openId === m.id;
                  return (
                    <li
                      key={m.id}
                      className="card"
                      style={{
                        borderLeft: `3px solid ${
                          m.status === "new"
                            ? "var(--accent-1)"
                            : m.status === "read"
                              ? "var(--border-strong)"
                              : "var(--border)"
                        }`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setOpenId(open ? null : m.id);
                          if (!open && m.status === "new") {
                            updateStatus(m.id, "read");
                          }
                        }}
                        aria-expanded={open}
                        className="w-full text-left p-5 cursor-pointer"
                        style={{ background: "none", border: "none" }}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <span
                            className="font-semibold"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {m.name}
                          </span>
                          <span
                            className="mono"
                            style={{
                              fontSize: "0.68rem",
                              color: "var(--text-subtle)",
                            }}
                          >
                            {formatDate(m.createdAt)}
                          </span>
                        </div>
                        <p
                          className="mono mt-1"
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--accent-2)",
                          }}
                        >
                          {m.email}
                        </p>
                        {!open && (
                          <p
                            className="mt-2"
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "0.85rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {m.message}
                          </p>
                        )}
                      </button>

                      {open && (
                        <div
                          className="px-5 pb-5"
                          style={{ marginTop: "-0.25rem" }}
                        >
                          <p
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "0.9rem",
                              lineHeight: 1.7,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {m.message}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-4">
                            <a
                              href={`mailto:${m.email}?subject=${encodeURIComponent(
                                "Re: your message"
                              )}`}
                              className="btn btn-primary"
                              style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                            >
                              Reply by email
                            </a>
                            {(["new", "read", "archived"] as MessageStatus[])
                              .filter((s) => s !== m.status)
                              .map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => updateStatus(m.id, s)}
                                  className="btn btn-ghost mono"
                                  style={{
                                    padding: "0.5rem 1rem",
                                    fontSize: "0.72rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                  }}
                                >
                                  Mark {s}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        <Link
          href="/"
          className="mono inline-block mt-8"
          style={{ fontSize: "0.75rem", color: "var(--text-subtle)" }}
        >
          ← Back to site
        </Link>
      </div>
    </main>
  );
}
