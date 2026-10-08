/** One captured screen of a project, shown in its case file. */
export interface Screen {
  src: string;
  /** What the screen shows, for screen readers. */
  alt: string;
  caption: string;
  device: "desktop" | "mobile";
  /** Which part of the product it belongs to; screens are grouped by this. */
  surface: string;
  /** Address shown above a desktop capture. */
  url?: string;
  width: number;
  height: number;
}

const DESKTOP = { device: "desktop", width: 1440, height: 900 } as const;
const MOBILE = { device: "mobile", width: 780, height: 1688 } as const;
/** Android design snapshots render at 393dp × 852dp, 2x. */
const PHONE = { device: "mobile", width: 786, height: 1704 } as const;

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
  /** Captures for the case file, in reading order. The first is the cover. */
  screens?: Screen[];
}

export const projects: Project[] = [
  {
    id: "meedo",
    title: "MEEDO",
    tagline: "Water Utility Billing Platform: Android and Web",
    description:
      "Offline-first field app for meter readers paired with a web admin console. Readings are recorded anywhere on route with no signal, an itemized bill prints on the spot over a Bluetooth thermal printer, and everything syncs once back in coverage.",
    tags: ["Kotlin", "Jetpack Compose", "Next.js", "React", "TypeScript", "Firebase"],
    color: "gold",
    client: true,
    highlights: [
      "Background sync via WorkManager with exponential back-off, 30s rising to a 5min cap",
      "Per-reading PENDING/SYNCED/FAILED state, so a flaky signal degrades throughput instead of losing data",
      "Board-approved rate card encoded as a pure, unit-testable billing engine",
    ],
    // Console pages are limited to ones that show no resident or staff
    // record. The field app screens are its own Roborazzi design snapshots,
    // rendered from test fixtures, so no resident's record appears there.
    screens: [
      {
        ...DESKTOP,
        src: "/projects/meedo/console-01-dashboard.webp",
        caption: "Admin dashboard",
        surface: "Web admin console",
        alt: "MEEDO admin console overview: total collections, active accounts, delinquency rate and outstanding balance, above a monthly chart of water consumption against revenue billed.",
      },
      {
        ...DESKTOP,
        src: "/projects/meedo/console-02-collections-report.webp",
        caption: "Collection summary",
        surface: "Web admin console",
        alt: "Reports and analytics: monthly water sales by rate tier as stacked bars, a donut of all-time sales by tier, and a collection performance table of accounts, billed, collected and collection rate per tier.",
      },
      {
        ...DESKTOP,
        src: "/projects/meedo/console-03-consumption.webp",
        caption: "Consumption analysis",
        surface: "Web admin console",
        alt: "Consumption analysis: accounts bucketed by their latest month's usage as an area chart, with a bar breakdown of each consumption bracket.",
      },
      {
        ...DESKTOP,
        src: "/projects/meedo/console-04-water-rates.webp",
        caption: "Water rates",
        surface: "Web admin console",
        alt: "Settings page with per-PC options and the water rates in force: the charge per cubic metre past the first ten, and the minimum charge for residential, government, and two commercial classes.",
      },
      {
        ...DESKTOP,
        src: "/projects/meedo/console-05-import.webp",
        caption: "Spreadsheet import",
        surface: "Web admin console",
        alt: "Import page with a drop zone for an XLSX workbook, a template download, and the expected format of its three sheets: concessionaires, billing history, and connection payments.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/01-sign-in.webp",
        caption: "Reader sign-in",
        surface: "Android field app",
        alt: "MEEDO Field sign-in screen with the South Wao Water System seal, a username and password form, and a note that the office creates reader accounts.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/02-pick-route.webp",
        caption: "Pick today's route",
        surface: "Android field app",
        alt: "Home screen for the September 2026 billing cycle: a sync button with everything uploaded, then the three barangays assigned to this reader, each with its billing due date.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/03-route-ready.webp",
        caption: "Route synced, ready offline",
        surface: "Android field app",
        alt: "Home screen with Bo-ot as the route being read, three readings waiting to upload, and a confirmation that 142 households were synced to the phone for offline use.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/04-find-household.webp",
        caption: "Find a household",
        surface: "Android field app",
        alt: "Route progress at 57 of 142 read, and a search for dela cruz listing matching households by name, account, meter number and purok, with the ones already read marked.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/05-meter-reading.webp",
        caption: "Meter reading and live bill",
        surface: "Android field app",
        alt: "Meter reading form for one household: previous reading, the current reading entered, consumption for the cycle, and the bill computed on the spot with its charges, above Save and Save and print buttons.",
      },
      {
        ...PHONE,
        height: 3000,
        src: "/projects/meedo/06-bill.webp",
        caption: "Itemized bill, before printing",
        surface: "Android field app",
        alt: "The full water bill as it prints on the thermal printer: office header, amount due and due date, account and meter details, readings and consumption, each charge, and the total, with a Print receipt button.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/07-read-twice.webp",
        caption: "Guard against double billing",
        surface: "Android field app",
        alt: "A warning that another reader already billed this household this cycle, explaining that the office will decide which reading stands.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/08-printer-error.webp",
        caption: "Printer error, reading kept",
        surface: "Android field app",
        alt: "Meter reading screen showing a printer error badge while the reading and bill stay saved, with buttons to move to the next household or view the bill.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/09-reading-dark.webp",
        caption: "Dark theme",
        surface: "Android field app",
        alt: "The meter reading and bill screen in the dark theme.",
      },
      {
        ...PHONE,
        src: "/projects/meedo/10-nothing-assigned.webp",
        caption: "Empty state",
        surface: "Android field app",
        alt: "Home screen when the office has not assigned a barangay yet, explaining that assignments appear here automatically.",
      },
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
    screens: [
      {
        ...DESKTOP,
        src: "/projects/inventrack/01-dashboard.webp",
        caption: "Dashboard and demand forecast",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/dashboard",
        alt: "InvenTrack dashboard: total revenue, a stock-health bar split into in stock, low and out, pending restock requests, a weekly sales chart, a quick overview of stock alerts, and a predictive analytics table with velocity, lead time, reorder point and suggested order quantity per product.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/02-pos.webp",
        caption: "POS checkout",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/pos",
        alt: "Point-of-sale screen: a barcode and product search field over a grid of product cards with price and stock, and a current-order panel with subtotal, total, cash or GCash payment, and a checkout and print receipt button.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/03-inventory.webp",
        caption: "Inventory",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/inventory",
        alt: "Inventory grid of product cards with photo, category, price, and a stock badge coloured by level, beside an add-product tile, discount rates, and a grid or list toggle.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/04-procurement.webp",
        caption: "Procurement and deliveries",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/procurement",
        alt: "Procurement page: a restock request builder with supplier and delivery type, auto-restock, and generate purchase order; a pending request list; and a deliveries table of quantity ordered against quantity received per supplier, with the receiving details.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/05-stock-log.webp",
        caption: "Stock log audit trail",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/stock-log",
        alt: "Stock log audit trail listing every stock movement with product, quantity, an in, out or customer return badge, timestamp, remarks, who processed it, and a return action, under running totals in and out.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/06-sales-history.webp",
        caption: "Sales history",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/sales-history",
        alt: "Sales history table of sales and returns with cashier, products and quantities, total in pesos, and date, with returns shown struck through in red.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/07-offline-sync.webp",
        caption: "Offline Excel sync",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/offline-sync",
        alt: "Offline Excel sync: download a blank sales log template before an outage, then upload the filled spreadsheet to sync offline sales back into the database.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/08-users.webp",
        caption: "Staff and roles",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/users",
        alt: "Users page splitting staff into administrators and cashiers, each with email, role badge, active status, and edit controls.",
      },
      {
        ...DESKTOP,
        src: "/projects/inventrack/09-login.webp",
        caption: "Sign in",
        surface: "Web app",
        url: "inventrack-jade.vercel.app/login",
        alt: "InvenTrack sign-in card with email and password fields and a legend of the two access levels: admin with full access, cashier with POS checkout only.",
      },
    ],
  },
  {
    id: "licensure",
    title: "LiCEnSURE",
    tagline: "ML Decision-Support System: USTP",
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
    tagline: "Booking and Point-of-Sale Platform: Capstone",
    description:
      "Booking and POS platform for NVA Printing Services, delivered as a full engagement: proposal, functional validation, testing, and technical documentation, for a client originally served as a print designer.",
    tags: ["React Native", "Expo", "React", "PostgreSQL", "Supabase"],
    color: "gold",
    client: true,
    github: "https://github.com/kroue/nva-go",
    screens: [
      {
        ...DESKTOP,
        height: 7237,
        src: "/projects/nva-go/01-website.webp",
        caption: "Public website, full page",
        surface: "Public website",
        url: "nva-go-website.vercel.app",
        alt: "The full NVA Printing Services website: a hero reading One stop shop for your printing needs, four product categories, corporate giveaways, a four-step ordering guide, rush orders, a photo gallery, store location with map, and an FAQ.",
      },
      {
        ...MOBILE,
        src: "/projects/nva-go/02-website-mobile.webp",
        caption: "Public website on a phone",
        surface: "Public website",
        alt: "The NVA Printing Services website on a phone, with the hero stacked above full-width Get a Quote and Messenger buttons and a fixed bottom bar for Call, Messenger, and Get a Quote.",
      },
      {
        ...DESKTOP,
        src: "/projects/nva-go/03-console-home.webp",
        caption: "Staff dashboard",
        surface: "Booking & POS console",
        url: "nva-go.vercel.app/homepage",
        alt: "NVAGo staff dashboard: a welcome banner over panels for orders waiting for pickup, recent transactions, unread messages, sales today, and payments waiting for validation, beside a sidebar for home, orders, products and customers.",
      },
      {
        ...DESKTOP,
        src: "/projects/nva-go/04-catalog.webp",
        caption: "Product catalog",
        surface: "Booking & POS console",
        url: "nva-go.vercel.app/products",
        alt: "Product catalog of printing products as photo cards, including acrylic medals and plaques, calling cards, ceramic mugs, DTF prints, glass plaques, PVC ID cards and lanyards, with counts of available and unavailable products.",
      },
      {
        ...DESKTOP,
        src: "/projects/nva-go/05-login.webp",
        caption: "Staff sign in",
        surface: "Booking & POS console",
        url: "nva-go.vercel.app",
        alt: "NVAGo console sign-in: the NVAGo wordmark and a one-line pitch on the left, a username and password form on the right, and a separate admin login button.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    tagline: "Personal Site: 3D and Terminal UI",
    description:
      "This site. Built with Next.js and React Three Fiber, featuring an interactive 3D scene and a terminal-style interface.",
    tags: ["Next.js", "React", "TypeScript", "Firebase", "Tailwind CSS"],
    color: "cyan",
    github: "https://github.com/kroue",
    live: "https://kroue-dev.vercel.app",
    screens: [
      {
        ...DESKTOP,
        src: "/projects/portfolio/01-hero.webp",
        caption: "Hero",
        surface: "Site",
        url: "kroue-dev.vercel.app",
        alt: "Portfolio hero: the name kuroe in a violet gradient over a field of floating wireframe shapes, a typed role line, a one-paragraph pitch, and buttons to see the projects or start a conversation.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/02-about.webp",
        caption: "About, with the working terminal",
        surface: "Site",
        url: "kroue-dev.vercel.app/#about",
        alt: "About section: a bio and pull quote on the left, an interactive terminal on the right, and a rule-separated row of three stats.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/03-stack.webp",
        caption: "Stack and skill orb",
        surface: "Site",
        url: "kroue-dev.vercel.app/#stack",
        alt: "Stack section: skills listed in four numbered tiers, beside a 3D orb ringed with skill labels that runs to the edge of the screen.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/04-experience.webp",
        caption: "Experience",
        surface: "Site",
        url: "kroue-dev.vercel.app/#experience",
        alt: "Experience section: a vertical tab list of client projects with the selected one's role summary and bullet points, over a strip for internship, earlier roles and education.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/05-projects.webp",
        caption: "Projects carousel",
        surface: "Site",
        url: "kroue-dev.vercel.app/#projects",
        alt: "Projects section: a carousel card with the project write-up and an open case file button beside a cover built from the project's own screens.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/07-case-file.webp",
        caption: "Case file view",
        surface: "Site",
        url: "kroue-dev.vercel.app/?project=lantaw",
        alt: "A full-screen case file: the project write-up pinned on the left and its captured screens grouped by product surface on the right.",
      },
      {
        ...DESKTOP,
        src: "/projects/portfolio/06-contact.webp",
        caption: "Contact",
        surface: "Site",
        url: "kroue-dev.vercel.app/#contact",
        alt: "Contact section: availability notes and social links on the left, and a name, email and message form on the right.",
      },
      {
        ...MOBILE,
        src: "/projects/portfolio/08-hero-mobile.webp",
        caption: "Hero on a phone",
        surface: "Site",
        alt: "The portfolio hero on a phone, with the name, role, pitch and stacked buttons.",
      },
      {
        ...MOBILE,
        src: "/projects/portfolio/09-about-mobile.webp",
        caption: "About on a phone",
        surface: "Site",
        alt: "The About section on a phone, with the bio and pull quote stacked above the terminal.",
      },
    ],
  },
  {
    id: "lantaw",
    title: "Lantaw",
    tagline: "Rewarded-Ads Platform: Mobile App and Admin Console",
    description:
      "Viewers earn points for watching brand campaigns in a cross-platform mobile app, then redeem them for rewards. A web admin console runs the other side: advertisers, campaign moderation, the rewards catalog and its stock, redemption approvals, and the points ledger.",
    tags: ["React Native", "Expo", "TypeScript", "React", "TanStack Router", "Recharts", "Tailwind CSS"],
    color: "purple",
    github: "https://github.com/kroue/lantaw-mobile",
    live: "https://lantaw-admin.vercel.app",
    screens: [
      {
        ...DESKTOP,
        src: "/projects/lantaw/01-overview.webp",
        caption: "Overview",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app",
        alt: "Lantaw admin overview: four KPI cards for active users, live ads, points awarded and rewards claimed, a seven-day revenue and views area chart, an ad plan mix donut, and tables for pending moderation and latest redemptions.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/04-ads.webp",
        caption: "Ads & campaigns moderation",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/ads",
        alt: "Ads and campaigns table listing each campaign with its thumbnail, advertiser, plan, budget, points per view, views and status, with approve, pause and reject controls per row.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/05-rewards.webp",
        caption: "Rewards catalog",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/rewards",
        alt: "Rewards catalog as product cards with photos, points cost, stock count and an active toggle; the out-of-stock card shows its stock in red with the toggle off.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/02-users.webp",
        caption: "Users",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/users",
        alt: "Users table with avatar, email, points balance, referrals, join date and an active, pending or suspended status badge.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/03-advertisers.webp",
        caption: "Advertisers",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/advertisers",
        alt: "Advertisers table with brand, category, active ads, spend and verification status, plus verify and block actions.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/06-redemptions.webp",
        caption: "Redemption requests",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/redemptions",
        alt: "Redemption requests table with request ID, user, reward, points, request date and status, and fulfill or cancel actions.",
      },
      {
        ...DESKTOP,
        src: "/projects/lantaw/07-transactions.webp",
        caption: "Wallet & transactions",
        surface: "Admin console",
        url: "lantaw-admin.vercel.app/transactions",
        alt: "Points ledger listing earn, redeem, payout and top-up entries with signed amounts in green or red, a note, and a date.",
      },
    ],
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
