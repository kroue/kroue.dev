# Portfolio — Aljohn Arranguez

Personal portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4,
Framer Motion, React Three Fiber, and Firebase.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the values from your
Firebase project settings (Project settings → General → Your apps → SDK setup):

```bash
cp .env.local.example .env.local
```

| Variable | Required |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | no |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | no |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | no (Analytics only) |

These are `NEXT_PUBLIC_*`, so they are inlined into the client bundle and are
visible to anyone who loads the site. That is expected for a Firebase web app —
the Firestore security rules, not the config, are what protect the data.

Remember to add the same variables to your hosting provider (e.g. Vercel →
Project → Settings → Environment Variables). If any required one is missing, the
contact form degrades gracefully and tells the visitor to use the direct links
instead of failing silently.

## Firestore — contact form

The contact form writes one document per submission to the `messages`
collection:

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | 2–80 characters |
| `email` | string | validated, max 254 characters |
| `message` | string | 10–2000 characters |
| `createdAt` | timestamp | `serverTimestamp()` — set by the server |
| `status` | string | always `"new"`, handy for triage |
| `source` | string | always `"portfolio-contact-form"` |

### Deploying the security rules

**The form cannot write until the rules in `firestore.rules` are deployed.**
A project left on default production rules rejects every write with
`permission-denied`.

```bash
firebase deploy --only firestore:rules
```

The rules allow exactly one operation — creating a well-formed message — and
deny all client reads, updates, and deletes. Read your messages in the Firebase
console, or server-side with the Admin SDK (which bypasses rules).

Because size and shape limits are enforced in the rules as well as in the
client, a bot posting straight to the REST API cannot fill the collection with
oversized documents.

### Spam handling

Submissions are filtered client-side by a hidden honeypot field, a minimum
fill-time check, and a 60-second per-browser cooldown. These stop casual bots;
they are not a substitute for the rules above.

## Project structure

```
app/                  Root layout, page, and global styles / design tokens
components/sections/  Hero, About, Stack, Projects, Contact
components/ui/        Navbar, cards, text effects, scroll progress
components/three/     React Three Fiber scenes
lib/firebase.ts       Lazy Firebase app + Firestore handle
lib/contact.ts        Contact form validation, spam traps, and the write
lib/projects.ts       Project data
firestore.rules       Firestore security rules
```

## Design tokens

Colours, spacing, radii, type scale, and motion easings are defined as CSS
custom properties at the top of `app/globals.css`, and re-exported to Tailwind
via `@theme inline`. Prefer the token-backed helper classes (`.card`, `.btn`,
`.field`, `.chip`, `.icon-btn`, `.section-label`, `.mono`) over new inline
styles.

The site is motion-heavy, so `prefers-reduced-motion` is honoured throughout:
CSS animations are disabled, Framer Motion runs under
`<MotionConfig reducedMotion="user">`, and Lenis smooth scrolling plus section
snapping collapse to native scrolling.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
