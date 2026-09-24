// ─────────────────────────────────────────────────────────
//  data/portfolio.js
//  ✏️  Edit this file to update your portfolio content.
// ─────────────────────────────────────────────────────────

// Also read by the /api/github serverless function, so keep this file free of browser-only APIs.
export const GITHUB_USER = "DeveloperAlejandroS";

export const PROFILE = {
  name: "Alejandro Sierra Vargas",
  role: "Frontend Developer | React, Next.js & Tailwind CSS",
  bio: "Frontend developer focused on building modern, responsive, and scalable web applications using React, TypeScript, and Tailwind CSS. Passionate about UI design, smooth user experiences, and creating performant digital products with clean and maintainable architecture.",
  email: "a.sierravargas115@gmail.com",
  phone: "+57 315 650 3336",
  location: "Bogotá, Colombia",
  linkedin: "https://www.linkedin.com/in/alejandro-s-vargas-ab0766262/",
};

export const EDUCATION = [
  {
    school: "Politécnico Grancolombiano",
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
        iconKey: "ai",
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

// `shortName` is shown on the compact chips in the About section.
export const CERTIFICATIONS = [
  { name: "Scrum Foundation Professional Certificate (SFPC)", shortName: "Scrum SFPC", issuer: "CertiProf", date: "Aug 2024", iconKey: "award" },
  { name: "Networking Basics", shortName: "Networking Basics", issuer: "Cisco Networking Academy", date: "May 2025", iconKey: "network" },
  { name: "CCNA: Introduction to Networks", shortName: "CCNA: Intro to Networks", issuer: "Cisco Networking Academy", date: "Nov 2025", iconKey: "link" },
  { name: "PCEP – Certified Entry-Level Python Programmer", shortName: "PCEP", issuer: "Python Institute", note: "Python Essentials 1 · Cisco Networking Academy", date: "Dec 2025", iconKey: "python" },
  { name: "PCAP – Certified Associate Python Programmer", shortName: "PCAP", issuer: "Python Institute", note: "Python Essentials 2 · Cisco Networking Academy", date: "Dec 2025", iconKey: "python" },
];

// Rendered by category in the Technologies section.
export const SKILLS = {
  "Programming Languages": [
    { name: "Python", iconKey: "python" },
    { name: "JavaScript", iconKey: "javascript" },
    { name: "TypeScript", iconKey: "typescript" },
  ],
  "Frontend Development": [
    { name: "React", iconKey: "react" },
    { name: "Next.js", iconKey: "nextjs" },
    { name: "Tailwind CSS", iconKey: "tailwind" },
    { name: "HTML5", iconKey: "html" },
    { name: "CSS3", iconKey: "css" },
    { name: "Responsive Design", iconKey: "responsive" },
  ],
  "Backend & Tools": [
    { name: "Express.js", iconKey: "express" },
    { name: "Flask", iconKey: "flask" },
    { name: "SQL", iconKey: "sql" },
    { name: "Git", iconKey: "git" },
  ],
  "Additional Tools": [
    { name: "Google Apps Script", iconKey: "appsscript" },
    { name: "Power Automate", iconKey: "powerautomate" },
    { name: "Power BI", iconKey: "analytics" },
    { name: "Excel", iconKey: "excel" },
    { name: "Scrum", iconKey: "workflow" },
  ],
};

// GitHub repo names (case-insensitive) pinned to the top of the Projects section, in this order.
export const FEATURED_REPOS = ["split-it", "alter-design-studio", "quick-dash", "expense-tracker-api"];

// Left out of the Tech Stack totals: notebooks store outputs in the file, so their byte counts dwarf real code.
export const EXCLUDED_LANGUAGES = ["Jupyter Notebook"];

// GitHub repo names (case-insensitive) never shown in the Projects section.
export const HIDDEN_REPOS = ["Personal_portfolio", "DeveloperAlejandroS", "prueba-tecnica", "ParcialAppsMoviles"];

// Keyed by GitHub's language names; anything missing uses `default`.
export const LANG_COLORS = {
  "Jupyter Notebook": "#FF6F00",
  JavaScript: "#F7DF1E",
  TypeScript: "#2F74C0",
  HTML: "#E34F26",
  CSS: "#2965F1",
  Kotlin: "#A97BFF",
  Python: "#3776AB",
  default: "#9F7AEA",
};
