// sections/Experience.jsx
import { EXPERIENCE, CERTIFICATIONS } from '../data/portfolio';

export default function Experience() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 8 }}>
        Laboral <span className="gradient-text">Experience</span>
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 48, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        // professional journey
      </p>

      {/* Timeline */}
      {EXPERIENCE.map((job, i) => (
        <TimelineItem key={i} job={job} />
      ))}

      {/* Certifications */}
      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 24, marginTop: 16 }}>
        <span className="gradient-text">Certifications</span>
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
      }}>
        {CERTIFICATIONS.map((c) => (
          <CertCard key={c.name} cert={c} />
        ))}
      </div>
    </div>
  );
}

/* ── Timeline item ─────────────────────────────────────── */
function TimelineItem({ job }) {
  return (
    <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
      {/* Dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <div style={{
          width: 12, height: 12,
          background: "var(--purple-mid)",
          borderRadius: "50%",
          border: "2px solid var(--purple-bright)",
          flexShrink: 0,
          boxShadow: "0 0 10px rgba(139,92,246,0.6)",
        }} />
        <div style={{
          width: 2,
          flex: 1,
          background: "linear-gradient(180deg, #7c3aed, transparent)",
        }} />
      </div>

      {/* Card */}
      <div className="glass-card" style={{ flex: 1, padding: 32 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</h3>
            <p style={{ color: "var(--purple-bright)", fontWeight: 600, marginTop: 4 }}>{job.company}</p>
          </div>
          <span className="tag">{job.period}</span>
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {job.bullets.map(({ icon, text }) => (
            <li key={text} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6,
            }}>
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {job.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ── Cert card ─────────────────────────────────────────── */
function CertCard({ cert }) {
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{cert.icon}</div>
      <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem", marginBottom: 4 }}>{cert.name}</p>
      <p style={{ color: "var(--purple-mid)", fontSize: "0.8rem" }}>{cert.issuer}</p>
      <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: 4 }}>{cert.date}</p>
    </div>
  );
}
