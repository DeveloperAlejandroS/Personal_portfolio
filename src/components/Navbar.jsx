// components/Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = ["About", "Experience", "Technologies", "Projects"];

export default function Navbar({ active, onNavigate, githubUser, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const drawerRef = useRef(null);

  const handleNavigate = (link) => {
    onNavigate(link);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) {
      hamburgerRef.current?.focus();
      return;
    }

    const focusables = drawerRef.current?.querySelectorAll('button, a') || [];
    focusables[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.pill}>
        {/* Left section - Logo */}
        <div className={styles.section}>
          <span className={styles.logo} title="Portfolio">
            <span className={styles.bracket}>&lt;</span>
            Alejandro <span className={styles.lastName}>Sierra</span>
            <span className={styles.bracket}>/&gt;</span>
          </span>
        </div>

        {/* Center section - Desktop nav links */}
        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`${styles.link} ${active === link ? styles.active : ""}`}
              onClick={() => handleNavigate(link)}
              type="button"
              aria-current={active === link ? "page" : undefined}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right section - Controls */}
        <div className={styles.rightControls}>
          {/* Theme toggle */}
          <button
            className={styles.themeBtn}
            onClick={onToggleTheme}
            type="button"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            ref={hamburgerRef}
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile drawer - appears below pill */}
      {menuOpen && (
        <div ref={drawerRef} className={styles.drawer} id="mobile-nav-drawer" aria-label="Mobile navigation">
          <div className={styles.drawerContent}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`${styles.drawerLink} ${active === link ? styles.drawerActive : ""}`}
                onClick={() => handleNavigate(link)}
                type="button"
                aria-current={active === link ? "page" : undefined}
              >
                {link}
              </button>
            ))}
            <a
              href={`https://github.com/${githubUser}`}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.drawerGh}
              aria-label={`Visit GitHub profile (opens in new window)`}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
