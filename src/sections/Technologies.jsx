// sections/Technologies.jsx
import { useState, useEffect } from 'react';
import { SKILLS } from '../data/portfolio';

export default function Technologies() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const allTechs = Object.values(SKILLS).flat().map((s) => s.name);

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.5rem)", fontWeight: 800, marginBottom: 8 }}>
        Tech <span className="gradient-text">Stack</span>
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 48, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        // tools & technologies
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24,
        marginBottom: 40,
      }}>
        {Object.entries(SKILLS).map(([category, skills]) => (
          <SkillCard key={category} category={category} skills={skills} animated={animated} />
        ))}
      </div>

      <h3 style={{
        color: "var(--accent-bright)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.8rem",
        letterSpacing: "0.1em",
        marginBottom: 20,
      }}>
        ALL TECHNOLOGIES
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {allTechs.map((t) => (
          <div key={t} className="glass-card" style={{ padding: "8px 16px", borderRadius: 30 }}>
            <span style={{ fontSize: "0.83rem", color: "var(--accent-light)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ category, skills, animated }) {
  return (
    <div className="glass-card" style={{ padding: 24 }}>
      <h3 style={{
        color: "var(--accent-bright)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        marginBottom: 20,
      }}>
        {category.toUpperCase()}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} animated={animated} />
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, animated }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ display: "flex", gap: 8, alignItems: "center", fontSize: "0.86rem", color: "var(--text-primary)" }}>
          <span>{skill.icon}</span> {skill.name}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.73rem", color: "var(--accent-mid)" }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: 6, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: animated ? `${skill.level}%` : "0%",
          background: "linear-gradient(90deg, var(--accent-deep), var(--accent-bright))",
          borderRadius: 4,
          transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
        }} />
      </div>
    </div>
  );
}
