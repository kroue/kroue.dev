import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  type User,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit,
  updateDoc,
  Timestamp,
  FirestoreError,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { getAuthClient, getDb, isFirebaseConfigured } from "@/lib/firebase";
import { CONTACT_COLLECTION } from "@/lib/contact";

export const ADMIN_COLLECTION = "admins";

export type MessageStatus = "new" | "read" | "archived";

export interface InboxMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date | null;
  status: MessageStatus;
}

/** Subscribe to auth state. Returns the unsubscribe function. */
export function watchAuth(cb: (user: User | null) => void): () => void {
  if (!isFirebaseConfigured) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(getAuthClient(), cb);
}

function describeAuthError(error: unknown): string {
  const code = error instanceof FirebaseError ? error.code : "";

  switch (code) {
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      // Deliberately identical for all three: distinguishing them tells an
      // attacker which emails have accounts.
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes and try again.";
    case "auth/user-disabled":
      return "That account has been disabled.";
    case "auth/network-request-failed":
      return "Couldn't reach Firebase. Check your connection.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in isn't enabled for this Firebase project. Enable it under Authentication → Sign-in method.";
    case "auth/configuration-not-found":
      // Returned when Authentication has never been switched on for the
      // project, as opposed to the provider merely being disabled.
      return "Firebase Authentication isn't set up for this project yet. Open the Firebase console → Authentication → Get started, then enable Email/Password.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

export type SignInResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

export async function signIn(
  email: string,
  password: string
): Promise<SignInResult> {
  if (!isFirebaseConfigured) {
    return { ok: false, error: "Firebase isn't configured on this deployment." };
  }

  try {
    const auth = getAuthClient();
    // Keep the session across reloads on this device.
    await setPersistence(auth, browserLocalPersistence);
    const cred = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    return { ok: true, user: cred.user };
  } catch (error) {
    console.error("[overseer] sign-in failed:", error);
    return { ok: false, error: describeAuthError(error) };
  }
}

export async function signOutAdmin(): Promise<void> {
  if (!isFirebaseConfigured) return;
  await signOut(getAuthClient());
}

/**
 * Whether this account is listed in `admins`. The security rules enforce the
 * same check, so this is only to render a clear message instead of letting the
 * inbox query fail with a raw permission error.
 */
export async function isAdmin(user: User): Promise<boolean> {
  try {
    const snap = await getDoc(doc(getDb(), ADMIN_COLLECTION, user.uid));
    return snap.exists();
  } catch {
    return false;
  }
}

export type InboxResult =
  | { ok: true; messages: InboxMessage[] }
  | { ok: false; error: string };

export async function fetchMessages(max = 200): Promise<InboxResult> {
  try {
    const snap = await getDocs(
      query(
        collection(getDb(), CONTACT_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(max)
      )
    );

    const messages: InboxMessage[] = snap.docs.map((d) => {
      const data = d.data();
      const created = data.createdAt;
      return {
        id: d.id,
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        message: String(data.message ?? ""),
        createdAt: created instanceof Timestamp ? created.toDate() : null,
        status: (data.status as MessageStatus) ?? "new",
      };
    });

    return { ok: true, messages };
  } catch (error) {
    console.error("[overseer] inbox read failed:", error);
    const code = error instanceof FirestoreError ? error.code : "";
    if (code === "permission-denied") {
      return {
        ok: false,
        error:
          "This account isn't an admin. Add a document with this account's UID as its ID to the `admins` collection, then reload.",
      };
    }
    if (code === "failed-precondition") {
      return {
        ok: false,
        error:
          "Firestore needs an index for this query. Open the console link in the browser error log to create it.",
      };
    }
    return { ok: false, error: "Couldn't load messages. Please try again." };
  }
}

export async function setMessageStatus(
  id: string,
  status: MessageStatus
): Promise<boolean> {
  try {
    await updateDoc(doc(getDb(), CONTACT_COLLECTION, id), { status });
    return true;
  } catch (error) {
    console.error("[overseer] status update failed:", error);
    return false;
  }
}
