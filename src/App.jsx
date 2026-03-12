import { useState, useEffect } from 'react';
import { GITHUB_USER } from './data/portfolio';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar             from './components/Navbar';
import Footer             from './components/Footer';

import About          from './sections/About';
import Experience     from './sections/Experience';
import Technologies   from './sections/Technologies';
import Projects       from './sections/Projects';

const SECTIONS = { About, Experience, Technologies, Projects };

export default function App() {
  const [active, setActive] = useState('About');
  const [theme,  setTheme]  = useState('dark');

  // Github data shared across sections
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubLangs,   setGithubLangs]   = useState(null); // { Python: 42, JS: 33, ... } (%)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  // ── Fetch GitHub profile + aggregate languages ─────────
  useEffect(() => {
    const base = 'https://api.github.com';

    // 1. User profile (avatar, name, bio, etc.)
    fetch(`${base}/users/${GITHUB_USER}`)
      .then((r) => r.json())
      .then((u) => setGithubProfile(u))
      .catch(() => {});

    // 2. All repos → fetch each repo's language breakdown → sum bytes
    fetch(`${base}/users/${GITHUB_USER}/repos?per_page=100`)
      .then((r) => r.json())
      .then(async (repos) => {
        if (!Array.isArray(repos)) return;
        const totals = {};
        await Promise.all(
          repos
            .filter((r) => !r.fork && r.language)
            .map((r) =>
              fetch(r.languages_url)
                .then((res) => res.json())
                .then((langs) => {
                  Object.entries(langs).forEach(([lang, bytes]) => {
                    totals[lang] = (totals[lang] || 0) + bytes;
                  });
                })
                .catch(() => {})
            )
        );
        // Convert to percentages, keep top 10
        const total = Object.values(totals).reduce((a, b) => a + b, 0);
        if (!total) return;
        const pct = Object.entries(totals)
          .map(([lang, bytes]) => ({ lang, pct: Math.round((bytes / total) * 100) }))
          .sort((a, b) => b.pct - a.pct)
          .slice(0, 10);
        setGithubLangs(pct);
      })
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const ActiveSection = SECTIONS[active];

  return (
    <>
      <AnimatedBackground theme={theme} />

      <Navbar
        active={active}
        onNavigate={setActive}
        githubUser={GITHUB_USER}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <ActiveSection
          key={active}
          githubProfile={githubProfile}
          githubLangs={githubLangs}
        />
      </main>

      <Footer />
    </>
  );
}
