// sections/Technologies.jsx
// Real language data fetched from GitHub
import { useState, useEffect } from 'react';
import { LANG_COLORS } from '../data/portfolio';

const LANG_ICONS = {
  Python: '🐍', JavaScript: '⚡', TypeScript: '🔷', HTML: '🌐', CSS: '🎨',
  'C#': '🔷', 'C++': '⚙️', Java: '☕', Shell: '🖥️', Vue: '💚',
  Jupyter: '📓', Dockerfile: '🐳', Ruby: '💎', Go: '🐹', Rust: '🦀',
  Swift: '🍎', Kotlin: '🟣', Dart: '🎯', PHP: '🐘', default: '💻',
};

export default function Technologies({ githubLangs }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Build skill list from real GitHub data
  const displaySkills = githubLangs
    ? githubLangs.map(({ lang, pct }) => ({
        name: lang,
        icon: LANG_ICONS[lang] || LANG_ICONS.default,
        level: pct,
        color: LANG_COLORS[lang] || LANG_COLORS.default,
      }))
    : null;

  return (
    <div className="section-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
          Tech <span className="gradient-text">Stack</span>
        </h2>
        {githubLangs && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--tag-bg)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 20 }}>
            📊 Live from GitHub
          </span>
        )}
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        // {githubLangs ? 'aggregated from real repository data' : 'tools & technologies'}
      </p>

      {/* ── Language bars ── */}
      {displaySkills && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div className="glass-card" style={{ padding: 28, gridColumn: '1 / -1' }}>
            <h3 style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: 24 }}>
              LANGUAGES BY CODE VOLUME
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px 32px' }}>
              {displaySkills.map((s) => (
                <SkillBar key={s.name} skill={s} animated={animated} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Stacked language bar ── */}
      {githubLangs && (
        <>
          <h3 style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: 14 }}>
            LANGUAGE DISTRIBUTION
          </h3>
          <div style={{ height: 14, borderRadius: 8, overflow: 'hidden', display: 'flex', marginBottom: 12 }}>
            {displaySkills.map((s) => (
              <div key={s.name}
                title={`${s.name}: ${s.level}%`}
                style={{
                  width: animated ? `${s.level}%` : '0%',
                  background: s.color || 'var(--accent-mid)',
                  transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                  height: '100%',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {displaySkills.map((s) => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color || 'var(--accent-mid)', display: 'inline-block' }} />
                {s.name} {s.level}%
              </span>
            ))}
          </div>
        </>
      )}

      {/* ── Tools grid ── */}
      <h3 style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: 16 }}>
        ALL TECHNOLOGIES
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {['Python','JavaScript','C#','C++','Java','HTML5','CSS3','React','Express.js','Flask','SQL','Power BI','Excel','Git','Scrum'].map((t) => (
          <div key={t} className="glass-card" style={{ padding: '8px 16px', borderRadius: 30 }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-light)' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillBar({ skill, animated }) {
  const barColor = skill.color
    ? skill.color
    : 'linear-gradient(90deg, var(--accent-deep), var(--accent-bright))';
  const isSolid = !!skill.color;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ display: 'flex', gap: 7, alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
          <span>{skill.icon}</span> {skill.name}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-mid)' }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: animated ? `${skill.level}%` : '0%',
          background: isSolid ? barColor : 'linear-gradient(90deg, var(--accent-deep), var(--accent-bright))',
          borderRadius: 4,
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </div>
  );
}
