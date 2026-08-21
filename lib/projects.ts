export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  color: "cyan" | "gold" | "purple";
}

export const projects: Project[] = [
  {
    id: "inventrack",
    title: "InvenTrack",
    tagline: "Inventory & Stock Tracking System",
    description:
      "A comprehensive inventory management system designed for tracking stock levels, product movements, and supply chain updates efficiently with real-time tracking.",
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    color: "cyan",
    github: "https://github.com/kroue/inventrack",
  },
  {
    id: "lantaw-mobile",
    title: "Lantaw Mobile",
    tagline: "Mobile App — Client Experience",
    description:
      "Cross-platform mobile application companion for the Lantaw platform, engineered for responsive user experience, touch interactions, and mobile accessibility.",
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
  {
    id: "nva-go",
    title: "NVAGo",
    tagline: "Online Ordering & Web POS System — Capstone",
    description:
      "A dual-platform printing service workflow solution featuring a React Native mobile ordering app for customers (design file uploads, GCash proof validation, tracking) and a React POS web dashboard for staff & admins.",
    tags: ["React Native", "Expo", "React", "PostgreSQL", "Supabase"],
    color: "gold",
    github: "https://github.com/kroue/nva-go",
  },
  {
    id: "licensure",
    title: "Licensure Reviewer",
    tagline: "Exam Preparation & Learning Platform",
    description:
      "Interactive licensure examination practice system featuring diagnostic quizzes, progress tracking analytics, and structured study modules.",
    tags: ["React", "TypeScript", "JavaScript", "HTML5"],
    color: "purple",
    github: "https://github.com/kroue/licensure",
  },
  {
    id: "multiplication-app",
    title: "Multiplication App",
    tagline: "Interactive Math Practice Tool",
    description:
      "Gamified educational web app engineered to build multiplication mastery through adaptive practice problems, instant score feedback, and interactive drills.",
    tags: ["JavaScript", "HTML5", "CSS3", "Vite"],
    color: "cyan",
    github: "https://github.com/kroue/multiplication-app",
  },
];
