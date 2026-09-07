export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  color: "cyan" | "gold" | "purple";
  /** Headline result, shown as a mono metric strip on the card. */
  highlights?: string[];
  /** Shipped for a paying client rather than coursework. */
  client?: boolean;
}

export const projects: Project[] = [
  {
    id: "meedo",
    title: "MEEDO",
    tagline: "Water Utility Billing Platform — Android + Web",
    description:
      "Offline-first field app for meter readers paired with a web admin console. Readings are recorded anywhere on route with no signal, an itemized bill prints on the spot over a Bluetooth thermal printer, and everything syncs once back in coverage.",
    tags: ["Kotlin", "Jetpack Compose", "Next.js", "React", "TypeScript", "Firebase"],
    color: "gold",
    client: true,
    highlights: [
      "Background sync via WorkManager with exponential back-off (30s → 5min cap)",
      "Per-reading PENDING/SYNCED/FAILED state — flaky signal degrades throughput, never loses data",
      "Board-approved rate card encoded as a pure, unit-testable billing engine",
    ],
  },
  {
    id: "inventrack",
    title: "InvenTrack",
    tagline: "Point-of-Sale & Inventory Platform",
    description:
      "Batch and expiry tracking with automated reorder-point forecasting from sales velocity, plus a procurement workflow spanning restock requests through purchase orders to delivery receipt.",
    tags: ["Angular", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    color: "cyan",
    client: true,
    github: "https://github.com/kroue/inventrack",
    highlights: [
      "Service workers and a client-side sync queue keep cashiers selling through outages",
      "Role-based access enforced with row-level security policies",
      "Automated low-stock and near-expiry alerts replaced manual daily stock checks",
    ],
  },
  {
    id: "licensure",
    title: "LiCEnSURE",
    tagline: "ML Decision-Support System — USTP",
    description:
      "Forecasts Civil Engineering licensure exam outcomes so staff can intervene early. Random Forest with SMOTE for class imbalance, tuned via RandomizedSearchCV, with SHAP surfacing per-student feature contributions so results are explainable rather than a black box.",
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "Firebase"],
    color: "purple",
    github: "https://github.com/kroue/licensure",
    highlights: [
      "86.12% accuracy · 88.91% recall · 0.9213 ROC AUC",
      "SHAP TreeExplainer shows why each prediction was made",
    ],
  },
  {
    id: "nva-go",
    title: "NVAGo",
    tagline: "Booking & Point-of-Sale Platform — Capstone",
    description:
      "Booking and POS platform for NVA Printing Services, delivered as a full engagement: proposal, functional validation, testing, and technical documentation — for a client originally served as a print designer.",
    tags: ["React Native", "Expo", "React", "PostgreSQL", "Supabase"],
    color: "gold",
    client: true,
    github: "https://github.com/kroue/nva-go",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    tagline: "Personal Site — 3D & Terminal UI",
    description:
      "This site. Built with Next.js and React Three Fiber, featuring an interactive 3D scene and a terminal-style interface.",
    tags: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    color: "cyan",
    github: "https://github.com/kroue",
    live: "https://kroue-dev.vercel.app",
  },
  {
    id: "lantaw-mobile",
    title: "Lantaw Mobile",
    tagline: "Mobile App — Client Experience",
    description:
      "Cross-platform mobile companion for the Lantaw platform, engineered for responsive user experience, touch interactions, and mobile accessibility.",
    tags: ["React Native", "Expo", "TypeScript", "Firebase"],
    color: "purple",
    github: "https://github.com/kroue/lantaw-mobile",
  },
  {
    id: "vitalsense",
    title: "VitalSense App",
    tagline: "Health & Vital Monitoring System",
    description:
      "Smart health telemetry and vital monitoring application designed to capture, visualize, and provide real-time diagnostic health insights.",
    tags: ["Android", "Flutter", "Python", "Firebase"],
    color: "cyan",
    github: "https://github.com/kaizmer/VitalSense-App",
  },
];
