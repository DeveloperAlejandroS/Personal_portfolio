import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { GITHUB_USER } from './data/portfolio';
import { fetchGithubData } from './lib/github';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar             from './components/Navbar';
import Footer             from './components/Footer';

import About          from './sections/About';
import Experience     from './sections/Experience';
import Technologies   from './sections/Technologies';
import Projects       from './sections/Projects';

const SECTIONS = { About, Experience, Technologies, Projects };
const SECTION_ORDER = ['About', 'Experience', 'Technologies', 'Projects'];
const THEME_COLORS = { dark: '#09080f', light: '#faf7ff' };

// Sections live at #about, #experience, ... so they can be linked and the back button works.
// Returns undefined for unrelated hashes such as the skip link's #main-content.
function sectionFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return 'About';
  return SECTION_ORDER.find((name) => name.toLowerCase() === hash);
}

export default function App() {
  const [active, setActive] = useState(() => sectionFromHash() ?? 'About');
  // index.html applies the saved theme before first paint.
  const [theme, setTheme] = useState(() => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'));
  const [transitionDirection, setTransitionDirection] = useState('forward');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const previousSectionRef = useRef(active);

  // Github data shared across sections
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubRepos, setGithubRepos] = useState(null);
  const [githubReposError, setGithubReposError] = useState(false);
  const [githubLangs,   setGithubLangs]   = useState(null); // { Python: 42, JS: 33, ... } (%)

  useEffect(() => {
    const onHashChange = () => {
      const section = sectionFromHash();
      if (section) setActive(section);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Reliable viewport height on mobile: expose --vh CSS var (1% of innerHeight)
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh, { passive: true });
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  

  useEffect(() => {
    const previousSection = previousSectionRef.current;
    if (previousSection !== active) {
      const previousIndex = SECTION_ORDER.indexOf(previousSection);
      const currentIndex = SECTION_ORDER.indexOf(active);
      setTransitionDirection(currentIndex >= previousIndex ? 'forward' : 'backward');
      previousSectionRef.current = active;
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [active]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── GitHub profile, repos and language totals ──────────
  // Served by /api/github (token stays server-side, response is edge-cached);
  // falls back to unauthenticated browser requests if the function is unavailable.
  useEffect(() => {
    const controller = new AbortController();

    const loadFromApi = async () => {
      const response = await fetch('/api/github', { signal: controller.signal });
      if (!response.ok) throw new Error(`GitHub proxy error: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data?.repos)) throw new Error('Unexpected GitHub proxy payload');
      return data;
    };

    loadFromApi()
      .catch((error) => {
        if (controller.signal.aborted) throw error;
        return fetchGithubData(GITHUB_USER, { signal: controller.signal });
      })
      .then((data) => {
        setGithubProfile(data.profile);
        setGithubRepos(data.repos);
        setGithubLangs(data.languages.length ? data.languages : null);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setGithubReposError(true);
        setGithubRepos([]);
      });

    return () => controller.abort();
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next]);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked (private mode, disabled cookies); the theme just won't persist.
    }
  };

  const navigate = (section) => {
    window.location.hash = section.toLowerCase();
  };

  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ActiveSection = SECTIONS[active];
  const sectionProps =
    active === 'About' ? { githubProfile } :
    active === 'Technologies' ? { githubLangs } :
    active === 'Projects' ? { githubRepos, githubReposError } :
    {};

  return (
    <>
      <a href="#main-content" className="skip-link" onClick={skipToContent}>
        Skip to main content
      </a>

      <AnimatedBackground theme={theme} />

      <Navbar
        active={active}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main
        id="main-content"
        tabIndex={-1}
        style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--content-max-width)', margin: '0 auto', padding: 'var(--page-top-padding) var(--page-x-padding) var(--page-bottom-padding)' }}
      >
        <div key={active} className={`section-enter section-slide section-slide-${transitionDirection}`}>
            <ActiveSection {...sectionProps} />
        </div>
      </main>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        style={{
          position: 'fixed',
          right: 'clamp(14px, 2.2vw, 20px)',
          bottom: 'calc(16px + var(--bottom-nav-clearance) + env(safe-area-inset-bottom))',
          zIndex: 12,
          width: 'clamp(44px, 4.2vw, 48px)',
          height: 'clamp(44px, 4.2vw, 48px)',
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--gradient-btn)',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '1.15rem',
          lineHeight: 1,
          display: 'grid',
          placeItems: 'center',
          boxShadow: showScrollTop ? '0 12px 24px rgba(0,0,0,0.28)' : 'none',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(8px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transition: 'opacity 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
        }}
      >
        <ArrowUp size={18} strokeWidth={2.4} />
      </button>

      <Footer />
    </>
  );
}
