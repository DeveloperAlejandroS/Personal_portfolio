// components/Navbar.jsx
import { useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = ["About", "Experience", "Technologies", "Projects"];

export default function Navbar({ active, onNavigate, githubUser, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (link) => {
    onNavigate(link);
    setMenuOpen(false);
  };

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
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile drawer - appears below pill */}
      {menuOpen && (
        <div className={styles.drawer}>
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
