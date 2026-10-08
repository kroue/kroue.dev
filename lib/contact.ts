import { addDoc, collection, serverTimestamp, FirestoreError } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase";

export const CONTACT_COLLECTION = "messages";

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactForm, string>>;

/**
 * Deliberately permissive. Strict RFC 5322 matching rejects addresses that
 * real mail servers accept, and the address gets a human reply anyway.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (name.length < LIMITS.name.min) {
    errors.name = "Please enter your name.";
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Keep this under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Please enter an email so I can reply.";
  } else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = `Tell me a little more, at least ${LIMITS.message.min} characters.`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Keep this under ${LIMITS.message.max} characters.`;
  }

  return errors;
}

/** Minimum seconds between two sends from the same browser. */
const COOLDOWN_SECONDS = 60;
const COOLDOWN_KEY = "contact:lastSentAt";

/** Bots post the instant the DOM is ready; humans cannot type 10 characters this fast. */
const MIN_FILL_MS = 1500;

function readLastSentAt(): number {
  try {
    return Number(window.localStorage.getItem(COOLDOWN_KEY)) || 0;
  } catch {
    return 0; // Private mode or storage disabled, so skip the check rather than fail.
  }
}

function writeLastSentAt(at: number): void {
  try {
    window.localStorage.setItem(COOLDOWN_KEY, String(at));
  } catch {
    /* Non-fatal. */
  }
}

export function cooldownRemaining(): number {
  if (typeof window === "undefined") return 0;
  const elapsed = Date.now() - readLastSentAt();
  return Math.max(0, Math.ceil((COOLDOWN_SECONDS * 1000 - elapsed) / 1000));
}

export interface SubmitOptions {
  /** Hidden field. Only a bot fills it in. */
  honeypot: string;
  /** Timestamp of when the form was first rendered. */
  startedAt: number;
}

export type SubmitResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

function describeFirestoreError(error: unknown): string {
  const code = error instanceof FirestoreError ? error.code : "";

  switch (code) {
    case "permission-denied":
      return "The message couldn't be saved. The database rejected the write. If you're the site owner, check the Firestore security rules.";
    case "unavailable":
    case "deadline-exceeded":
      return "Couldn't reach the server. Check your connection and try again.";
    case "resource-exhausted":
      return "The inbox is temporarily over quota. Please email me directly instead.";
    case "invalid-argument":
      return "That message couldn't be processed. Try shortening it.";
    default:
      return "Something went wrong. Please try again, or reach out directly with one of the links below.";
  }
}

export async function submitContact(
  form: ContactForm,
  { honeypot, startedAt }: SubmitOptions
): Promise<SubmitResult> {
  // Silently accept bot submissions. Telling them why they failed just helps
  // them adapt, and a real user can never hit either branch.
  if (honeypot.trim() !== "" || Date.now() - startedAt < MIN_FILL_MS) {
    return { ok: true, id: null };
  }

  const remaining = cooldownRemaining();
  if (remaining > 0) {
    return {
      ok: false,
      error: `You just sent a message. Try again in ${remaining}s.`,
    };
  }

  if (!isFirebaseConfigured) {
    return {
      ok: false,
      error:
        "The contact form isn't configured on this deployment. Please reach out with one of the links below.",
    };
  }

  try {
    const ref = await addDoc(collection(getDb(), CONTACT_COLLECTION), {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      createdAt: serverTimestamp(),
      status: "new",
      source: "portfolio-contact-form",
    });

    writeLastSentAt(Date.now());
    return { ok: true, id: ref.id };
  } catch (error) {
    console.error("[contact] Firestore write failed:", error);
    return { ok: false, error: describeFirestoreError(error) };
  }
}
