// components/Footer.jsx
import { GITHUB_USER, PROFILE } from "../data/portfolio";

const LINKS = [
  { label: "GitHub", href: `https://github.com/${GITHUB_USER}`, external: true },
  { label: "LinkedIn", href: PROFILE.linkedin, external: true },
  { label: "Email", href: `mailto:${PROFILE.email}` },
];

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border)",
      textAlign: "center",
      padding: "24px var(--footer-x-padding) calc(24px + var(--bottom-nav-clearance) + env(safe-area-inset-bottom))",
      color: "var(--text-dim)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
    }}>
      <nav aria-label="Social links" style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 10 }}>
        {LINKS.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            style={{ color: "var(--text-muted)", textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </nav>
      <span style={{ color: "var(--accent-deep)" }}>&lt;</span>
      built with React · {PROFILE.name} · {new Date().getFullYear()}
      <span style={{ color: "var(--accent-deep)" }}>/&gt;</span>
    </footer>
  );
}
