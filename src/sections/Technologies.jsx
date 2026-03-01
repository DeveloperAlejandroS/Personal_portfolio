// sections/Technologies.jsx
import { useState, useEffect } from 'react';
import { SKILLS } from '../data/portfolio';

export default function Technologies() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const allTechs = Object.values(SKILLS).flat().map((s) => s.name);

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 8 }}>
        Tech <span className="gradient-text">Stack</span>
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 48, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        // tools & technologies
      </p>

      {/* Skill categories */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 28,
        marginBottom: 40,
      }}>
        {Object.entries(SKILLS).map(([category, skills]) => (
          <SkillCard key={category} category={category} skills={skills} animated={animated} />
        ))}
      </div>

      {/* All tech pills */}
      <h3 style={{
        color: "var(--purple-bright)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
        marginBottom: 20,
      }}>
        ALL TECHNOLOGIES
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {allTechs.map((t) => (
          <div key={t} className="glass-card" style={{ padding: "10px 18px", borderRadius: 30 }}>
            <span style={{ fontSize: "0.85rem", color: "var(--purple-light)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Skill category card ─────────────────────────────── */
function SkillCard({ category, skills, animated }) {
  return (
    <div className="glass-card" style={{ padding: 28 }}>
      <h3 style={{
        color: "var(--purple-bright)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
        marginBottom: 20,
      }}>
        {category.toUpperCase()}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} animated={animated} />
        ))}
      </div>
    </div>
  );
}

/* ── Individual skill bar ────────────────────────────── */
function SkillBar({ skill, animated }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.88rem", color: "var(--text-primary)" }}>
          <span>{skill.icon}</span> {skill.name}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--purple-mid)" }}>
          {skill.level}%
        </span>
      </div>

      {/* Track */}
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        {/* Fill */}
        <div style={{
          height: "100%",
          width: animated ? `${skill.level}%` : "0%",
          background: "linear-gradient(90deg, #6d28d9, #a855f7)",
          borderRadius: 4,
          transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>
    </div>
  );
}
