// ─────────────────────────────────────────────────────────
//  data/portfolio.js
//  ✏️  Edit this file to update your portfolio content.
// ─────────────────────────────────────────────────────────

export const GITHUB_USER =
  (typeof import.meta.env.VITE_GITHUB_USER === 'string' && import.meta.env.VITE_GITHUB_USER.trim())
  || "DeveloperAlejandroS";

export const PROFILE = {
  name: "Alejandro Sierra Vargas",
  role: "Frontend Developer | React, Next.js & Tailwind CSS",
  bio: "Frontend developer focused on building modern, responsive, and scalable web applications using React, TypeScript, and Tailwind CSS. Passionate about UI design, smooth user experiences, and creating performant digital products with clean and maintainable architecture.",
  email: "a.sierravargas115@gmail.com",
  phone: "(315) 650-3336",
  location: "Bogotá, Colombia",
};

export const EDUCATION = [
  {
    school: "Politécnico Gran Colombiano",
    degree: "Software Engineering",
    period: "Mar 2026 – Present",
  },
  {
    school: "Universidad ECCI",
    degree: "Technology in Software Development",
    period: "Aug 2023 – Mar 2026",
  },
  {
    school: "Instituto Infantil y Juvenil",
    degree: "Academic High School Diploma",
    period: "Finished Dec 2020",
  },
];

export const EXPERIENCE = [
  {
    title: "Marketing Data Analyst Intern",
    company: "Colombia ESL / Open English",
    period: "Sep 2024 – Sep 2025",
    bullets: [
      {
        iconKey: "python",
        text: "Automated repetitive reporting and data-processing tasks with Python scripts, reducing manual workload and improving operational efficiency for the marketing team."
      },
      {
        iconKey: "analytics",
        text: "Analyzed digital campaign performance using KPIs such as ROI, engagement, and conversion to identify optimization opportunities and support data-driven decisions."
      },
      {
        iconKey: "excel",
        text: "Built and maintained performance tracking reports in Excel, helping monitor advertising investment, campaign results, and performance trends over time."
      },
      {
        iconKey: "team",
        text: "Collaborated with internal teams and media partners to streamline reporting workflows and communicate actionable insights more effectively."
      },
    ],
    tags: ["Python", "Power BI", "Excel", "Data Analysis", "KPIs", "Process Automation"],
  },
];

export const CERTIFICATIONS = [
  { name: "Scrum Foundation Professional (SFPC)", issuer: "CertiProf", date: "Aug 2024", iconKey: "award" },
  { name: "Networking Basics", issuer: "Cisco Networking Academy", date: "May 2025", iconKey: "network" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "Nov 2025", iconKey: "link" },
  { name: "PCEP: Python Essentials 1", issuer: "Cisco Networking Academy", date: "Dec 2025", iconKey: "python" },
  { name: "PCAP: Python Essentials 2", issuer: "Cisco Networking Academy", date: "Dec 2025", iconKey: "python" },
];

export const SKILLS = {
  "Programming Languages": [
    { name: "Python", iconKey: "python", level: 90 },
    { name: "JavaScript", iconKey: "javascript", level: 85 },
    { name: "TypeScript", iconKey: "typescript", level: 80 },
  ],
  "Frontend Development": [
    { name: "React", iconKey: "react", level: 85 },
    { name: "Next.js", iconKey: "nextjs", level: 78 },
    { name: "Tailwind CSS", iconKey: "tailwind", level: 85 },
    { name: "HTML5", iconKey: "html", level: 90 },
    { name: "CSS3", iconKey: "css", level: 88 },
    { name: "Responsive Design", iconKey: "responsive", level: 85 },
  ],
  "Backend & Tools": [
    { name: "Express.js", iconKey: "express", level: 75 },
    { name: "Flask", iconKey: "flask", level: 70 },
    { name: "SQL", iconKey: "sql", level: 80 },
    { name: "Git", iconKey: "git", level: 82 },
  ],
  "Additional Tools": [
    { name: "Power BI", iconKey: "analytics", level: 75 },
    { name: "Excel", iconKey: "excel", level: 85 },
    { name: "Git", iconKey: "git", level: 82 },
    { name: "Scrum", iconKey: "workflow", level: 80 },
  ],
};

export const LANG_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  "Tailwind CSS": "#38BDF8",
  SQL: "#336791",
  Git: "#F05032",
  Express: "#A3A3A3",
  Flask: "#E5E5E5",
  default: "#8B5CF6",
};
