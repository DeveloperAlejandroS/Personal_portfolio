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
    title: "Junior Developer",
    company: "Quark.i By Legalnova",
    period: "Jul 2026 – Present",
    bullets: [
      {
        iconKey: "javascript",
        text: "Built and maintain a suite of Google Apps Script market-intelligence agents that research four business areas (Smart Tech, Experience Design, Business Model Strategy, and Comms) and consolidate findings into a weekly strategic briefing."
      },
      {
        iconKey: "python",
        text: "Integrated the Gemini API into the agent pipeline to automate research analysis and generate structured, consolidated reports without manual intervention."
      },
      {
        iconKey: "workflow",
        text: "Designed the end-to-end workflow, from raw research retrieval and Drive storage to the automated generation of the final Google Docs report, improving turnaround time for market-intelligence deliverables."
      },
      {
        iconKey: "automation",
        text: "Developed internal automation tools with Power Automate and JavaScript to streamline recurring business processes across the company."
      },
    ],
    tags: ["Python", "JavaScript", "Google Apps Script", "Power Automate", "Automation Development", "Process Automation"],
  },
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
  "Jupyter Notebook": "#FF6F00", // warm orange
  JavaScript: "#F7DF1E", // yellow (classic)
  TypeScript: "#2F74C0", // deep cerulean
  React: "#61DAFB", // cyan
  "Next.js": "#111827", // near-black
  HTML5: "#E34F26", // orange-red
  CSS3: "#2965F1", // vivid blue
  "Tailwind CSS": "#38BDF8",
  SQL: "#336791",
  Git: "#F05032",
  Express: "#8A8A8A",
  Flask: "#ECEFF1",
  Python: "#3776AB",
  default: "#9F7AEA",
};
