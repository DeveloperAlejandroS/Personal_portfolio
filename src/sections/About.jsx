// sections/About.jsx
import { useState, useEffect } from 'react';
import { PROFILE, EDUCATION, CERTIFICATIONS, GITHUB_USER } from '../data/portfolio';

export default function About({ githubProfile }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const avatarUrl = githubProfile?.avatar_url
    || `https://avatars.githubusercontent.com/${GITHUB_USER}`;

  return (
    <div className="section-enter" style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? 32 : 40,
      alignItems: 'center',
      minHeight: isMobile ? 'auto' : '60vh',
    }}>

      {/* ── LEFT: hero ── */}
      <div>
        {/* Avatar + name row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Glowing ring */}
            <div style={{
              position: 'absolute', inset: -4,
              borderRadius: '50%',
              background: 'var(--gradient-btn)',
              opacity: 0.7,
              filter: 'blur(8px)',
            }} />
            <img
              src={avatarUrl}
              alt="Alejandro Sierra"
              style={{
                width: isMobile ? 80 : 100,
                height: isMobile ? 80 : 100,
                borderRadius: '50%',
                border: '3px solid var(--accent-mid)',
                objectFit: 'cover',
                position: 'relative',
                display: 'block',
              }}
            />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-mid)', fontSize: '0.8rem', marginBottom: 4 }}>
              // hello world
            </p>
            <h1 style={{ fontSize: isMobile ? '2rem' : '2.8rem', fontWeight: 800, lineHeight: 1.1 }}>
              {PROFILE.name.split(' ')[0]}{' '}
              <span className="scream-gradient">
                {PROFILE.name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>
        </div>

        <p style={{ color: 'var(--accent-bright)', fontSize: '1rem', fontWeight: 500, marginBottom: 16 }}>
          {PROFILE.role}
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.93rem', marginBottom: 28 }}>
          {PROFILE.bio}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
            style={{ padding: '11px 24px', background: 'var(--gradient-btn)', borderRadius: 8, color: 'white', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem' }}>
            View GitHub →
          </a>
          <a href={`mailto:${PROFILE.email}`}
            style={{ padding: '11px 24px', background: 'var(--btn-ghost-bg)', border: '1px solid var(--btn-ghost-border)', borderRadius: 8, color: 'var(--btn-ghost-color)', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem' }}>
            Contact Me
          </a>
          {/* CV Download */}
          <a href="/cv-alejandro-sierra.pdf" download
            style={{ padding: '11px 24px', background: 'var(--btn-ghost-bg)', border: '1px solid var(--btn-ghost-border)', borderRadius: 8, color: 'var(--btn-ghost-color)', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            ⬇ Download CV
          </a>
        </div>

        {/* GitHub stats strip */}
        {githubProfile && (
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Repos',     value: githubProfile.public_repos },
              { label: 'Followers', value: githubProfile.followers },
              { label: 'Following', value: githubProfile.following },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card" style={{ padding: '10px 18px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-bright)' }}>{value}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT: cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass-card" style={{ padding: 22 }}>
          <Label>CONTACT</Label>
          {[
            { icon: '📧', value: PROFILE.email },
            { icon: '📱', value: PROFILE.phone },
            { icon: '📍', value: PROFILE.location },
          ].map(({ icon, value }) => (
            <div key={value} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.87rem', marginBottom: 8 }}>
              <span>{icon}</span><span style={{ wordBreak: 'break-all' }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 22 }}>
          <Label>EDUCATION</Label>
          {EDUCATION.map((e) => (
            <div key={e.school} style={{ marginBottom: 12 }}>
              <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.87rem' }}>{e.degree}</p>
              <p style={{ color: 'var(--accent-mid)', fontSize: '0.78rem' }}>{e.school}</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.73rem' }}>{e.period}</p>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: 22 }}>
          <Label>CERTIFICATIONS</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CERTIFICATIONS.map((c) => (
              <span key={c.name} className="tag">{c.icon} {c.name.split(':')[0].split('(')[0].trim()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <h3 style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: 14 }}>
      {children}
    </h3>
  );
}
