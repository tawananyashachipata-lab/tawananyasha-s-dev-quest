export const profile = {
  name: "Tawananyasha Chipata",
  title: "Aspiring Software Developer",
  location: "Zimbabwe",
  email: "tawananyashachipata@gmail.com",
  github: "https://github.com/tawananyashachipata-lab",
  linkedin: "https://www.linkedin.com/in/tawananyasha-chipata",
  about:
    "I'm Tawananyasha Chipata, an aspiring software developer from Zimbabwe. I'm currently studying software development at Uncommon, where I'm building practical programming skills by shipping real projects — from food ordering platforms to event management systems. I care about clean, responsive interfaces and learning something new with every build.",
};

export const skills: { name: string; level: number; group: string }[] = [
  { name: "HTML", level: 90, group: "Frontend" },
  { name: "CSS", level: 88, group: "Frontend" },
  { name: "JavaScript", level: 82, group: "Frontend" },
  { name: "React", level: 80, group: "Frontend" },
  { name: "Next.js", level: 65, group: "Frontend" },
  { name: "Responsive Design", level: 85, group: "Frontend" },
  { name: "Python", level: 70, group: "Backend" },
  { name: "Git & GitHub", level: 80, group: "Tools" },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Financeflow",
    description:
      "A modern event platform built to simplify registration, programme management, and event coordination.",
    tech: ["React", "TypeScript", "Supabase", "HTML", "CSS"],
    github: "https://github.com/tawananyashachipata-lab/financeflow-dashboard",
    live: "https://financeflow-dashboard-i2al.vercel.app/",
  },
  {
    title: "Tastehub Restaurant",
    description:
      "A food ordering platform that allows users to browse meals, add items to their cart and place orders easily.",
    tech: ["React"],
    github: "https://github.com/tawananyashachipata-lab/tastehub-order",
    live: "https://tastehub-order.vercel.app/",
  },
  {
    title: "OAK Foundation Event",
    description:
      "A digital event management platform for OAK Zimbabwe, streamlining attendee registration, QR check-in, event programmes, and partner management.",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Supabase"],
    github: "https://github.com/tawananyashachipata-lab/OAK",
    live: "https://oak-foundation-eta.vercel.app/",
  },
  {
    title: "Takeoff",
    description:
      "A driver onboarding platform that simplifies registration.",
    tech: ["React", "TypeScript", "Supabase"],
    github: "https://github.com/tawananyashachipata-lab/drive-earn-app",
    live: "https://your-typescript-journey-x6rv.vercel.app/",
  },
  {
    title: "Mercer Barber Booking Platform",
    description:
      "A modern barber booking platform designed to simplify appointment scheduling and enhance the client experience.",
    tech: ["React", "TypeScript", "Responsive Design", "Git & GitHub", "Vite"],
    github: "https://github.com/tawananyashachipata-lab/Barber-fade",
    live: "https://barber-fade.netlify.app/",
  },
  {
    title: "Staycey Glow",
    description:
      "An elegant beauty and skincare website featuring products and a modern shopping experience.",
    tech: ["React", "CSS", "JavaScript"],
    live: "https://staycey-glow-boutique.vercel.app/",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
};

const CERT_BASE = "https://magadaline.vercel.app/assets";

export const certificates: Certificate[] = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2026",
    description:
      "Learned HTML5, CSS3, Flexbox, Grid and responsive web design principles.",
    image: `${CERT_BASE}/responsive-C0CQWARq.png`,
  },
  {
    title: "Introduction to Software Engineering",
    issuer: "Coursera",
    year: "2026",
    description:
      "Software development fundamentals, the software development life cycle and problem solving.",
    image: `${CERT_BASE}/Screenshot%202026-07-16%20145619-DB-E2LS5.png`,
  },
  {
    title: "Python",
    issuer: "freeCodeCamp",
    year: "2026",
    description: "Core Python programming: data structures, functions and algorithms.",
    image: `${CERT_BASE}/python_free-SsRbcz7v.png`,
  },
  {
    title: "JavaScript Basics",
    issuer: "Coursera",
    year: "2026",
    description:
      "Covered JavaScript fundamentals, ES6, arrays, objects and algorithms.",
    image: `${CERT_BASE}/Screenshot%202026-07-27%20094926-zwSsV81r.png`,
  },
  {
    title: "Fundamentals of NestJS",
    issuer: "Coursera",
    year: "2026",
    description: "Basics of the Nest.js framework.",
    image: `${CERT_BASE}/nestjs-wX47mYuE.png`,
  },
  {
    title: "Nest.js Developer Lab",
    issuer: "Coursera",
    year: "2026",
    description:
      "Building scalable backend applications using modules, controllers, services and REST APIs with TypeScript.",
    image: `${CERT_BASE}/Screenshot%202026-08-05%20131124-CmcOV95R.png`,
  },
];

export type LocationId = "about" | "skills" | "projects" | "certificates" | "contact";

export const locations: { id: LocationId; name: string; tagline: string }[] = [
  { id: "about", name: "About Me", tagline: "Who is this adventurer?" },
  { id: "skills", name: "Skills Dojo", tagline: "Weapons of choice" },
  { id: "projects", name: "Project Village", tagline: "Quests completed" },
  { id: "certificates", name: "Hall of Certificates", tagline: "Proof of training" },
  { id: "contact", name: "Contact Portal", tagline: "Send a message" },
];

export type Achievement = {
  id: string;
  name: string;
  description: string;
  xp: number;
};

export const achievements: Achievement[] = [
  { id: "first-steps", name: "First Steps", description: "Started the adventure", xp: 10 },
  { id: "curious", name: "Curious Mind", description: "Visited your first location", xp: 20 },
  { id: "skill-seeker", name: "Skill Seeker", description: "Opened the Skills Dojo", xp: 25 },
  { id: "project-inspector", name: "Project Inspector", description: "Opened Project Village", xp: 25 },
  { id: "certified", name: "Certified", description: "Opened the Hall of Certificates", xp: 25 },
  { id: "networker", name: "Networker", description: "Opened the Contact Portal", xp: 25 },
  { id: "lore-master", name: "Lore Master", description: "Read the About Me story", xp: 25 },
  { id: "explorer", name: "World Explorer", description: "Visited every location", xp: 50 },
  { id: "resume-hunter", name: "Resume Hunter", description: "Viewed the resume", xp: 15 },
];

export const VISIT_XP = 30;
export const LEVEL_XP = 100;
