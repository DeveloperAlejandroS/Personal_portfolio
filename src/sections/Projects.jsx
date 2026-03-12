// sections/Projects.jsx
import { useState, useEffect } from 'react';
import { GITHUB_USER, LANG_COLORS } from '../data/portfolio';

// Keywords that suggest a project has a live website
const WEB_TOPICS = ['website','web','portfolio','frontend','landing','app','react','vue','nextjs','html','css','blog'];

function looksLikeWebProject(repo) {
  if (repo.homepage && repo.homepage.startsWith('http')) return true;
  const topics = repo.topics || [];
  return topics.some((t) => WEB_TOPICS.includes(t.toLowerCase()));
}

export default function Projects({ githubProfile }) {
  const [repos, setRepos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data.filter((r) => !r.fork));
        else setError(true);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <div className="section-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 }}>
          GitHub <span className="gradient-text">Projects</span>
        </h2>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-mid)', textDecoration: 'none' }}>
          View all ↗
        </a>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        // fetched live from github.com/{GITHUB_USER}
      </p>

      {loading && <Loader />}
      {error   && <ErrorState user={GITHUB_USER} />}
      {!loading && !error && repos.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>No public repositories found.</p>
        </div>
      )}
      {!loading && !error && repos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}
    </div>
  );
}

/* ── Repo card with optional link preview ─────────────── */
function RepoCard({ repo }) {
  const [hovered, setHovered] = useState(false);
  const [preview, setPreview] = useState(null); // 'loading' | 'ready' | 'error'
  const langColor = LANG_COLORS[repo.language] ?? LANG_COLORS.default;
  const hasWeb    = looksLikeWebProject(repo);
  const liveUrl   = repo.homepage || null;

  // Build an Open Graph / screenshot preview URL
  // We use a free og-image proxy so no API key needed
  const screenshotUrl = liveUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--tag-bg)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.2)' : 'none',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Link preview thumbnail */}
      {liveUrl && (
        <div style={{ position: 'relative', height: 150, overflow: 'hidden', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
          <img
            src={screenshotUrl}
            alt={`${repo.name} preview`}
            onLoad={() => setPreview('ready')}
            onError={() => setPreview('error')}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: preview === 'ready' ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
          {/* Fallback placeholder */}
          {preview !== 'ready' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 8,
              background: 'linear-gradient(135deg, var(--bg-card), var(--tag-bg))',
            }}>
              <span style={{ fontSize: '2rem' }}>🌐</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {preview === 'error' ? 'Preview unavailable' : 'Loading preview...'}
              </span>
            </div>
          )}
          {/* Live badge */}
          <span style={{
            position: 'absolute', top: 8, right: 8,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
            color: '#4ade80', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            padding: '3px 8px', borderRadius: 20,
            border: '1px solid rgba(74,222,128,0.3)',
          }}>
            ● LIVE
          </span>
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <span style={{ fontSize: '1rem' }}>📦</span>
          <div style={{ display: 'flex', gap: 10, color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
          </div>
        </div>

        <h3 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, fontSize: '0.92rem' }}>
          {repo.name}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 14, flex: 1, minHeight: 36 }}>
          {repo.description || 'No description provided.'}
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
          {repo.language && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, display: 'inline-block' }} />
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href={repo.html_url} target="_blank" rel="noreferrer"
            style={{ flex: 1, minWidth: 80, padding: '7px 0', textAlign: 'center', background: 'var(--btn-ghost-bg)', border: '1px solid var(--btn-ghost-border)', borderRadius: 6, color: 'var(--btn-ghost-color)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none' }}>
            &lt;/&gt; Code
          </a>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer"
              style={{ flex: 1, minWidth: 80, padding: '7px 0', textAlign: 'center', background: 'var(--gradient-btn)', borderRadius: 6, color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none' }}>
              ↗ Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <div style={{ width: 48, height: 48, border: '3px solid var(--border)', borderTop: '3px solid var(--accent-mid)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Loading repositories...</p>
    </div>
  );
}

function ErrorState({ user }) {
  return (
    <div className="glass-card" style={{ padding: 40, textAlign: 'center', borderColor: 'rgba(239,68,68,0.3)' }}>
      <p style={{ color: '#f87171', marginBottom: 12 }}>⚠️ Could not load repositories</p>
      <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer"
        style={{ color: 'var(--accent-bright)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        Visit GitHub profile directly ↗
      </a>
    </div>
  );
}
