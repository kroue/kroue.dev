/**
 * Single source of truth for résumé-derived content.
 * Mirrors Arranguez_Aljohn_Resume_2026.pdf. Keep the two in sync.
 */

export const PROFILE = {
  name: "Aljohn Arranguez",
  handle: "kuroe",
  title: "Full-Stack & Mobile Developer",
  stack: "TypeScript / React / Angular / Kotlin",
  location: "Cagayan de Oro City, Philippines",
  remote: "Open to remote",
  email: "arranguez.aljohn0130@gmail.com",
  phone: "+63 953 538 3369",
  site: "https://kroue-dev.vercel.app",
  github: "https://github.com/kroue",
  linkedin: "https://linkedin.com/in/aljohn-arranguez",
} as const;

/** Rotated by the hero typewriter. */
export const ROLES = [
  "Full-Stack Developer",
  "Mobile Developer",
  "Offline-First Architect",
  "TypeScript Engineer",
];

export const SUMMARY =
  "Full-stack developer shipping production systems for paying clients: a point-of-sale and inventory platform, a water utility billing system pairing an offline-first Android field app with a web admin console, and a booking and POS platform.";

export const SPECIALTY =
  "Recurring specialty in offline-first architecture: systems that keep working through the connectivity outages routine for clients outside major cities, then reconcile cleanly on reconnect.";

export interface Role {
  company: string;
  title: string;
  meta?: string;
  period: string;
  location: string;
  summary?: string;
  /** Named sub-projects delivered inside this role. */
  work?: { name: string; blurb: string; points: string[] }[];
  points?: string[];
}

export const EXPERIENCE: Role[] = [
  {
    company: "Independent",
    title: "Freelance Software Developer",
    meta: "Clients in water utilities, retail, and printing",
    period: "2024-Present",
    location: "Cagayan de Oro City / Remote",
    summary:
      "Delivered three production systems end to end: proposal, requirements gathering with non-technical stakeholders, development, testing, documentation, deployment, and staff training.",
    work: [
      {
        name: "MEEDO",
        blurb: "Water utility billing platform (Android + Web) for a local water district",
        points: [
          "Built an offline-first Android field app (Kotlin, Jetpack Compose, Hilt, Room, Firebase) letting meter readers record readings anywhere on route with no signal, print an itemized bill on the spot over a Bluetooth thermal printer, and sync automatically once back in coverage.",
          "Implemented background sync via WorkManager as a network-constrained CoroutineWorker with exponential back-off (30s rising to a 5min cap) and per-reading PENDING/SYNCED/FAILED state, so a flaky connection degrades throughput instead of losing field data.",
          "Encoded the district's board-approved rate card as a pure, unit-testable billing engine: per-classification minimum charges, a 10 cubic metre allowance with metered rate beyond it, a 15-day grace period, a recurring 3% delinquency surcharge, a once-per-delinquency fee, and projected overdue totals.",
          "Built the admin console in Next.js 16 / React 19 / TypeScript on Firestore with security rules: concessionaire and connection records, billing runs, collections, Recharts reporting, team management, an audit trail, and an Excel importer to migrate the district off its existing billing spreadsheet.",
        ],
      },
      {
        name: "InvenTrack",
        blurb: "Point-of-sale and inventory management platform",
        points: [
          "Angular, TypeScript, Supabase/PostgreSQL, Tailwind: batch and expiry tracking, automated reorder-point forecasting from sales velocity, a procurement workflow spanning restock requests through purchase orders to delivery receipt, and role-based access enforced with row-level security policies.",
          "Engineered offline operation with service workers and a client-side sync queue so cashiers keep processing transactions through internet outages, then reconcile on reconnect.",
          "Automated low-stock and near-expiry email alerts from reorder-point calculations, replacing the client's manual daily stock checks.",
        ],
      },
      {
        name: "NVAGo",
        blurb: "Booking and point-of-sale platform for NVA Printing Services",
        points: [
          "Delivered the full engagement including proposal, functional validation, testing, and technical documentation, for a client originally served as a print designer.",
        ],
      },
    ],
  },
  {
    company: "Lapasan Baptist Christian Academy",
    title: "Technical Support (OJT)",
    period: "2026",
    location: "Cagayan de Oro City",
    points: [
      "Resolved first-line hardware, software, and network issues; documented recurring problems into a reference that shortened repeat resolution times.",
    ],
  },
];

export const EARLIER_ROLES = [
  { title: "Layout Artist", company: "NVA Printing Services", period: "2023-2024" },
  { title: "Customer Service Representative", company: "Teleperformance", period: "2023" },
  { title: "Call Center Agent", company: "Celerity", period: "2021-2022" },
];

export const EARLIER_NOTE =
  "Three years client-facing, two of them supporting English-speaking international customers by phone, email, and chat. That is the communication grounding for remote, async engineering work.";

export const EDUCATION = [
  {
    school: "University of Science and Technology of Southern Philippines",
    credential: "BS Information Technology",
    period: "2022-2026",
    location: "Cagayan de Oro City",
  },
  {
    school: "STI College Tagum",
    credential: "ICT: Mobile, Application and Web Development",
    period: "2019-2021",
    location: "Tagum City",
  },
];

export const LANGUAGES = [
  { name: "English", level: "C2 Proficient" },
  { name: "Filipino", level: "Native" },
  { name: "Japanese", level: "JLPT N3" },
];

export const STATS = [
  { value: "3", label: "Production Systems Shipped" },
  { value: "2024", label: "Freelancing Since" },
  { value: "N3", label: "Japanese (JLPT)" },
];
