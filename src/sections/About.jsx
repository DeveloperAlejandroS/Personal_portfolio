// sections/About.jsx
import { PROFILE, EDUCATION, CERTIFICATIONS, GITHUB_USER } from '../data/portfolio';

export default function About() {
  return (
    <div className="section-enter" style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 40,
      alignItems: "center",
      minHeight: "60vh",
    }}>
      {/* ── Left: hero text ── */}
      <div>
        <p style={{
          fontFamily: "var(--font-mono)",
          color: "var(--purple-mid)",
          fontSize: "0.85rem",
          marginBottom: 12,
        }}>
          // hello world
        </p>

        <h1 style={{ fontSize: "3.5rem", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          {PROFILE.name.split(" ")[0]}<br />
          <span className="gradient-text">
            {PROFILE.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p style={{ color: "var(--purple-bright)", fontSize: "1.1rem", fontWeight: 500, marginBottom: 20 }}>
          {PROFILE.role}
        </p>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: 32 }}>
          {PROFILE.bio}
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #6d28d9, #9333ea)",
              borderRadius: 8,
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            View GitHub →
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            style={{
              padding: "12px 28px",
              background: "rgba(109,40,217,0.15)",
              border: "1px solid rgba(139,92,246,0.4)",
              borderRadius: 8,
              color: "var(--purple-light)",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* ── Right: cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Contact */}
        <div className="glass-card" style={{ padding: 24 }}>
          <SectionLabel>CONTACT</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "📧", value: PROFILE.email },
              { icon: "📱", value: PROFILE.phone },
              { icon: "📍", value: PROFILE.location },
            ].map(({ icon, value }) => (
              <Row key={value} icon={icon} value={value} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="glass-card" style={{ padding: 24 }}>
          <SectionLabel>EDUCATION</SectionLabel>
          {EDUCATION.map((e) => (
            <div key={e.school} style={{ marginBottom: 12 }}>
              <p style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.88rem" }}>{e.degree}</p>
              <p style={{ color: "var(--purple-mid)", fontSize: "0.8rem" }}>{e.school}</p>
              <p style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>{e.period}</p>
            </div>
          ))}
        </div>

        {/* Certs preview */}
        <div className="glass-card" style={{ padding: 24 }}>
          <SectionLabel>CERTIFICATIONS</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CERTIFICATIONS.map((c) => (
              <span key={c.name} className="tag">
                {c.icon} {c.name.split(":")[0].split("(")[0].trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Small helpers ────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <h3 style={{
      color: "var(--purple-bright)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.8rem",
      letterSpacing: "0.1em",
      marginBottom: 16,
    }}>
      {children}
    </h3>
  );
}

function Row({ icon, value }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--text-secondary)", fontSize: "0.88rem" }}>
      <span>{icon}</span>
      <span>{value}</span>
    </div>
  );
}
