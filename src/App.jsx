import { useState, useEffect, useRef } from 'react';
import { GITHUB_USER } from './data/portfolio';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar             from './components/Navbar';
import Footer             from './components/Footer';

import About          from './sections/About';
import Experience     from './sections/Experience';
import Technologies   from './sections/Technologies';
import Projects       from './sections/Projects';

const SECTIONS = { About, Experience, Technologies, Projects };
const SECTION_ORDER = ['About', 'Experience', 'Technologies', 'Projects'];

export default function App() {
  const [active, setActive] = useState('About');
  const [theme,  setTheme]  = useState('dark');
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const previousSectionRef = useRef(active);

  // Github data shared across sections
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubRepos, setGithubRepos] = useState(null);
  const [githubReposError, setGithubReposError] = useState(false);
  const [githubLangs,   setGithubLangs]   = useState(null); // { Python: 42, JS: 33, ... } (%)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const previousSection = previousSectionRef.current;
    if (previousSection !== active) {
      const previousIndex = SECTION_ORDER.indexOf(previousSection);
      const currentIndex = SECTION_ORDER.indexOf(active);
      setTransitionDirection(currentIndex >= previousIndex ? 'forward' : 'backward');
      previousSectionRef.current = active;
    }
  }, [active]);

  // ── Fetch GitHub profile + aggregate languages ─────────
  useEffect(() => {
    const base =
      (typeof import.meta.env.VITE_GITHUB_API_BASE === 'string' && import.meta.env.VITE_GITHUB_API_BASE.trim())
      || 'https://api.github.com';
    const token =
      (typeof import.meta.env.VITE_GITHUB_TOKEN === 'string' && import.meta.env.VITE_GITHUB_TOKEN.trim())
      || '';
    const headers = {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const controller = new AbortController();

    const fetchJson = async (url) => {
      const response = await fetch(url, { headers, signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
      return response.json();
    };

    // 1. User profile (avatar, name, bio, etc.)
    fetchJson(`${base}/users/${GITHUB_USER}`)
      .then((u) => setGithubProfile(u))
      .catch(() => {});

    // 2. All repos → fetch each repo's language breakdown → sum bytes
    fetchJson(`${base}/users/${GITHUB_USER}/repos?per_page=100`)
      .then(async (repos) => {
        if (!Array.isArray(repos)) {
          setGithubReposError(true);
          setGithubRepos([]);
          return;
        }
        setGithubReposError(false);
        setGithubRepos(repos.filter((r) => !r.fork));
        const totals = {};
        await Promise.all(
          repos
            .filter((r) => !r.fork && r.language)
            .map((r) =>
              fetchJson(r.languages_url)
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
      .catch(() => {
        setGithubReposError(true);
        setGithubRepos([]);
      });

    return () => controller.abort();
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const ActiveSection = SECTIONS[active];
  const sectionProps =
    active === 'About' ? { githubProfile } :
    active === 'Technologies' ? { githubLangs } :
    active === 'Projects' ? { githubRepos, githubReposError } :
    {};

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

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '100px 24px 40px' }}>
        <div key={active} className={`section-enter section-slide section-slide-${transitionDirection}`}>
            <ActiveSection {...sectionProps} />
        </div>
      </main>

      <Footer />
    </>
  );
}
