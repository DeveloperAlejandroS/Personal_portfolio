// sections/Projects.jsx
import { useState, useEffect } from 'react';
import { GITHUB_USER, LANG_COLORS } from '../data/portfolio';

export default function Projects() {
  const [repos, setRepos]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data.filter((r) => !r.fork));
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="section-enter">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
          GitHub <span className="gradient-text">Projects</span>
        </h2>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noreferrer"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--purple-mid)", textDecoration: "none" }}
        >
          View all ↗
        </a>
      </div>

      <p style={{ color: "var(--text-muted)", marginBottom: 48, fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
        // fetched live from github.com/{GITHUB_USER}
      </p>

      {loading && <Loader />}

      {error && <ErrorState user={GITHUB_USER} />}

      {!loading && !error && repos.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)" }}>No public repositories found.</p>
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Repo card ────────────────────────────────────────── */
function RepoCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] ?? LANG_COLORS.default;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(139,92,246,0.15)",
        borderRadius: 12,
        padding: 20,
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
        e.currentTarget.style.background  = "rgba(109,40,217,0.1)";
        e.currentTarget.style.transform   = "translateY(-3px)";
        e.currentTarget.style.boxShadow   = "0 8px 30px rgba(109,40,217,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.03)";
        e.currentTarget.style.transform   = "translateY(0)";
        e.currentTarget.style.boxShadow   = "none";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: "1.2rem" }}>📦</span>
        <div style={{ display: "flex", gap: 12, color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
        </div>
      </div>

      <h3 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontSize: "0.95rem" }}>
        {repo.name}
      </h3>

      <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: 14, minHeight: 40 }}>
        {repo.description || "No description provided."}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {repo.language && (
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-secondary)",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: langColor, display: "inline-block" }} />
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 3).map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}

/* ── Loading spinner ──────────────────────────────────── */
function Loader() {
  return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{
        width: 48, height: 48,
        border: "3px solid rgba(139,92,246,0.2)",
        borderTop: "3px solid #7c3aed",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto 16px",
      }} />
      <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
        Loading repositories...
      </p>
    </div>
  );
}

/* ── Error state ──────────────────────────────────────── */
function ErrorState({ user }) {
  return (
    <div className="glass-card" style={{ padding: 40, textAlign: "center", borderColor: "rgba(239,68,68,0.3)" }}>
      <p style={{ color: "#f87171", marginBottom: 12 }}>⚠️ Could not load repositories</p>
      <a
        href={`https://github.com/${user}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: "var(--purple-bright)", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
      >
        Visit GitHub profile directly ↗
      </a>
    </div>
  );
}
