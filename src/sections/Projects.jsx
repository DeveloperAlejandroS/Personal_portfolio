// sections/Projects.jsx
import { useState } from 'react';
import { GITHUB_USER, LANG_COLORS } from '../data/portfolio';

// ── Style Constants ────────────────────────────────────
const STYLES = {
  section: {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
    title: { fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 },
    subtitle: { color: 'var(--text-muted)', marginBottom: 48, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' },
  },
  card: {
    container: (hovered, focused) => ({
      background: hovered ? 'var(--tag-bg)' : 'var(--bg-card)',
      border: focused ? '2px solid var(--accent-bright)' : `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: hovered || focused ? 'translateY(-4px)' : 'none',
      boxShadow: focused ? '0 0 0 3px rgba(168, 85, 247, 0.2)' : hovered ? '0 12px 40px rgba(0,0,0,0.2)' : 'none',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
    }),
    preview: { position: 'relative', height: 150, overflow: 'hidden', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' },
    badge: { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', color: '#4ade80', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(74,222,128,0.4)', fontWeight: 600 },
    body: { padding: 18, flex: 1, display: 'flex', flexDirection: 'column' },
    title: { fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, fontSize: '0.92rem', lineHeight: 1.3 },
    description: { color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: 14, flex: 1, minHeight: 36 },
    meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    stats: { display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' },
    tags: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 },
    actions: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  },
  button: (variant = 'ghost') => ({
    ghost: { flex: 1, minWidth: 80, padding: '8px 12px', textAlign: 'center', background: 'var(--btn-ghost-bg)', border: '1px solid var(--btn-ghost-border)', borderRadius: 6, color: 'var(--btn-ghost-color)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease' },
    primary: { flex: 1, minWidth: 80, padding: '8px 12px', textAlign: 'center', background: 'var(--gradient-btn)', borderRadius: 6, color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 500 },
  }[variant] || {}),
  loader: {
    container: { textAlign: 'center', padding: 60 },
    spinner: { width: 48, height: 48, border: '3px solid var(--border)', borderTop: '3px solid var(--accent-mid)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' },
  },
  error: {
    container: { borderColor: 'rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.05)' },
    text: { color: '#ef4444', marginBottom: 12, fontWeight: 600 },
    subtext: { color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8, fontFamily: 'var(--font-mono)' },
  },
}

export default function Projects({ githubRepos = null, githubReposError = false }) {
  const repos = githubRepos
    ? githubRepos.filter((repo) => !repo.archived)
      .slice()
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 20)
    : [];
  const loading = githubRepos === null;
  const error = githubReposError;
  return (
    <div className="section-enter">
      <div style={STYLES.section.header}>
        <h2 style={STYLES.section.title}>
          GitHub <span className="gradient-text">Projects</span>
        </h2>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-mid)', textDecoration: 'none' }}>
          View all ↗
        </a>
      </div>
      <p style={STYLES.section.subtitle}>
        // fetched live from github.com/{GITHUB_USER}
      </p>

      {loading && <Loader />}
      {error   && <ErrorState user={GITHUB_USER} />}
      {!loading && !error && repos.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', border: '1px solid var(--border)' }} role="status" aria-label="No repositories found">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>📭 No public repositories found.</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 12, fontFamily: 'var(--font-mono)' }}>Check back soon or visit GitHub profile directly</p>
        </div>
      )}
      {!loading && !error && repos.length > 0 && (
        <div>
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Loaded {repos.length} repositories
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Repo card with optional link preview ─────────────── */
function RepoCard({ repo }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [thumbnailState, setThumbnailState] = useState('loading');
  const langColor = LANG_COLORS[repo.language] ?? LANG_COLORS.default;
  const liveUrl   = repo.homepage || null;
  const thumbnailUrl = liveUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(normalizeUrl(liveUrl))}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={STYLES.card.container(hovered, focused)}
      role="article"
      aria-label={`${repo.name} - ${repo.language || 'Multi-language'} project with ${repo.stargazers_count} stars`}
    >
      {/* ── Link preview thumbnail ── */}
      {liveUrl && (
        <PreviewSection
          repoName={repo.name}
          thumbnailUrl={thumbnailUrl}
          thumbnailState={thumbnailState}
          onThumbnailLoad={() => setThumbnailState('ready')}
          onThumbnailError={() => setThumbnailState('error')}
        />
      )}

      {/* ── Card body ── */}
      <div style={STYLES.card.body}>
        <div style={STYLES.card.meta}>
          <span style={{ fontSize: '1rem' }}>📦</span>
          <div style={STYLES.card.stats}>
            <span title={`${repo.stargazers_count} stars`}>⭐ {repo.stargazers_count}</span>
            <span title={`${repo.forks_count} forks`}>🍴 {repo.forks_count}</span>
          </div>
        </div>

        <h3 style={STYLES.card.title}>
          {repo.name}
        </h3>
        <p style={STYLES.card.description}>
          {repo.description || 'No description provided.'}
        </p>

        {/* ── Tags & Language ── */}
        <div style={STYLES.card.tags}>
          {repo.language && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)' }} aria-label={`Primary language: ${repo.language}`}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, display: 'inline-block' }} aria-hidden="true" />
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 3).map((t) => <span key={t} className="tag" role="listitem">{t}</span>)}
        </div>

        {/* ── Action buttons ── */}
        <div style={STYLES.card.actions}>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noreferrer noopener"
            className="repo-button"
            style={STYLES.button('ghost')}
            aria-label={`View ${repo.name} source code on GitHub (opens in new window)`}
            title={`View ${repo.name} on GitHub`}
          >
            &lt;/&gt; Code
          </a>
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              className="repo-button"
              style={STYLES.button('primary')}
              aria-label={`Visit ${repo.name} live website (opens in new window)`}
              title={`Visit ${repo.name} live site`}
            >
              ↗ Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function normalizeUrl(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/* ── Preview Section Component ── */
function PreviewSection({ repoName, thumbnailUrl, thumbnailState, onThumbnailLoad, onThumbnailError }) {
  return (
    <div style={STYLES.card.preview} role="img" aria-label={`${repoName} website preview`}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={`${repoName} preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={onThumbnailLoad}
          onError={onThumbnailError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: thumbnailState === 'ready' ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      )}

      {thumbnailState !== 'ready' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8,
          background: 'linear-gradient(135deg, var(--bg-card), var(--tag-bg))',
        }}>
          <span style={{ fontSize: '2rem' }}>🌐</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {thumbnailState === 'error' ? 'Preview unavailable' : 'Loading preview...'}
          </span>
        </div>
      )}
      
      {/* Live badge */}
      <span style={STYLES.card.badge}>
        ● LIVE
      </span>
    </div>
  );
}

function Loader() {
  return (
    <div style={STYLES.loader.container} role="status" aria-label="Loading repositories">
      <div style={STYLES.loader.spinner} aria-hidden="true" />
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>⏳ Loading repositories...</p>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: 8, fontFamily: 'var(--font-mono)' }}>This may take a moment</p>
    </div>
  );
}

function ErrorState({ user }) {
  return (
    <div className="glass-card" style={{ padding: 40, textAlign: 'center', ...STYLES.error.container }} role="alert" aria-label="Failed to load repositories">
      <p style={STYLES.error.text}>⚠️ Could not load repositories</p>
      <p style={STYLES.error.subtext}>There was an issue fetching your GitHub projects. This may be due to rate limiting or network issues.</p>
      <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer noopener"
        style={{ color: 'var(--accent-bright)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'inline-block', marginTop: 16 }} 
        aria-label={`Visit ${user}'s GitHub profile (opens in new window)`}
      >
        Visit GitHub profile ↗
      </a>
    </div>
  );
}
