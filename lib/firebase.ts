import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { isSupported, getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * `NEXT_PUBLIC_*` vars are inlined at build time. If the deploy target is
 * missing them the values come through as `undefined`, and `initializeApp`
 * then fails deep inside the SDK with an opaque error. Checking up front lets
 * the UI show a real message instead of a silent failure.
 */
const REQUIRED_KEYS = ["apiKey", "authDomain", "projectId", "appId"] as const;

export const missingFirebaseConfig = REQUIRED_KEYS.filter(
  (key) => !firebaseConfig[key]
);

export const isFirebaseConfigured = missingFirebaseConfig.length === 0;

let app: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let auth: Auth | undefined;

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error(
      `Firebase is not configured. Missing env vars: ${missingFirebaseConfig
        .map((key) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`)
        .join(", ")}`
    );
  }
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

/**
 * Firestore handle, created on first use. Initialising lazily keeps a missing
 * or malformed config from throwing at module-import time, which would take
 * down every component that imports this file.
 */
export function getDb(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp());
  }
  return firestore;
}

/** Firebase Auth handle, created on first use. Browser only. */
export function getAuthClient(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export let analytics: Analytics | undefined;

if (typeof window !== "undefined" && isFirebaseConfigured) {
  isSupported()
    .then((supported) => {
      if (supported) analytics = getAnalytics(getFirebaseApp());
    })
    .catch(() => {
      /* Analytics is optional; never let it break the page. */
    });
}
