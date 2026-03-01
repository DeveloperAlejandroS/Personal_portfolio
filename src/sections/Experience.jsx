// sections/Experience.jsx
import { EXPERIENCE, CERTIFICATIONS } from '../data/portfolio';

export default function Experience() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: 8 }}>
        Laboral <span className="gradient-text">Experience</span>
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 48, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        // professional journey
      </p>

      {EXPERIENCE.map((job, i) => (
        <TimelineItem key={i} job={job} />
      ))}

      <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 24, marginTop: 16 }}>
        <span className="gradient-text">Certifications</span>
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
      }}>
        {CERTIFICATIONS.map((c) => (
          <CertCard key={c.name} cert={c} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ job }) {
  return (
    <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
      {/* Dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
        <div style={{
          width: 12, height: 12, flexShrink: 0,
          background: "var(--accent-mid)",
          borderRadius: "50%",
          border: "2px solid var(--accent-bright)",
          boxShadow: "0 0 10px var(--accent-mid)",
        }} />
        <div style={{
          width: 2, flex: 1,
          background: "linear-gradient(180deg, var(--accent-mid), transparent)",
        }} />
      </div>

      {/* Card */}
      <div className="glass-card" style={{ flex: 1, padding: "28px 24px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 16,
        }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>{job.title}</h3>
            <p style={{ color: "var(--accent-bright)", fontWeight: 600, marginTop: 4 }}>{job.company}</p>
          </div>
          <span className="tag">{job.period}</span>
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {job.bullets.map(({ icon, text }) => (
            <li key={text} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7,
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

function CertCard({ cert }) {
  return (
    <div className="glass-card" style={{ padding: 20 }}>
      <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{cert.icon}</div>
      <p style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.88rem", marginBottom: 4 }}>{cert.name}</p>
      <p style={{ color: "var(--accent-mid)", fontSize: "0.78rem" }}>{cert.issuer}</p>
      <p style={{ color: "var(--text-dim)", fontSize: "0.74rem", marginTop: 4 }}>{cert.date}</p>
    </div>
  );
}
