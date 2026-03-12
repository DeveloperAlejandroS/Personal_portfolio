// ─────────────────────────────────────────────────────────
//  data/portfolio.js
//  ✏️  Edit this file to update your portfolio content.
// ─────────────────────────────────────────────────────────

export const GITHUB_USER = "DeveloperAlejandroS";

export const PROFILE = {
  name: "Alejandro Sierra Vargas",
  role: "Software Engineering Student & Developer",
  bio: "Focused on process optimization, software development, and data analysis. Experienced in Python automation, KPI tracking with Power BI and Excel, OOP, web development, and SQL databases. Based in Bogotá, Colombia 🇨🇴",
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
    title: "Marketing Apprentice",
    company: "Colombia ESL / Open English",
    period: "Sep 2024 – Sep 2025",
    bullets: [
      { icon: "🐍", text: "Developed Python scripts to automate internal processes, improving area operational efficiency." },
      { icon: "📊", text: "Analyzed advertising campaign performance to identify and propose reach and budget optimizations." },
      { icon: "📋", text: "Created and tracked key KPIs with Excel to measure the impact of marketing strategies." },
      { icon: "📝", text: "Generated executive reports and managed insertion orders, streamlining communication and execution with media." },
    ],
    tags: ["Python", "Power BI", "Excel", "Data Analysis", "KPIs", "Process Automation"],
  },
];

export const CERTIFICATIONS = [
  { name: "Scrum Foundation Professional (SFPC)", issuer: "CertiProf", date: "Aug 2024", icon: "🏅" },
  { name: "Networking Basics", issuer: "Cisco Networking Academy", date: "May 2025", icon: "🌐" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "Nov 2025", icon: "🔗" },
  { name: "PCEP: Python Essentials 1", issuer: "Cisco Networking Academy", date: "Dec 2025", icon: "🐍" },
  { name: "PCAP: Python Essentials 2", issuer: "Cisco Networking Academy", date: "Dec 2025", icon: "🐍" },
];

export const SKILLS = {
  "Programming Languages": [
    { name: "Python",      icon: "🐍", level: 90 },
    { name: "JavaScript",  icon: "⚡", level: 85 },
    { name: "C#",          icon: "🔷", level: 70 },
    { name: "C++",         icon: "⚙️", level: 65 },
    { name: "Java",        icon: "☕", level: 70 },
  ],
  "Web & Databases": [
    { name: "HTML5 & CSS3", icon: "🌐", level: 90 },
    { name: "React",        icon: "⚛️", level: 80 },
    { name: "Express.js",   icon: "🚂", level: 75 },
    { name: "Flask",        icon: "🧪", level: 78 },
    { name: "SQL",          icon: "🗄️", level: 80 },
  ],
  "Tools & Methods": [
    { name: "Power BI", icon: "📊", level: 75 },
    { name: "Excel",    icon: "📋", level: 85 },
    { name: "Git",      icon: "🔀", level: 82 },
    { name: "Scrum",    icon: "🏃", level: 80 },
  ],
};

export const LANG_COLORS = {
  Python:     "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  "C#":       "#178600",
  "C++":      "#f34b7d",
  Java:       "#b07219",
  default:    "#8b5cf6",
};
