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
    <nav className={styles.nav}>
      {/* Logo */}
      <span className={styles.logo}>
        <span className={styles.bracket}>&lt;</span>
        AlejandroS
        <span className={styles.bracket}>/&gt;</span>
      </span>

      {/* Desktop links */}
      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            className={`${styles.link} ${active === link ? styles.active : ""}`}
            onClick={() => handleNavigate(link)}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Right controls */}
      <div className={styles.rightControls}>
        {/* Theme toggle */}
        <button
          className={styles.themeBtn}
          onClick={onToggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* GitHub link (desktop only) */}
        <a
          href={`https://github.com/${githubUser}`}
          target="_blank"
          rel="noreferrer"
          className={styles.ghBtn}
        >
          GitHub ↗
        </a>

        {/* Hamburger (mobile only) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.drawer}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              className={`${styles.drawerLink} ${active === link ? styles.drawerActive : ""}`}
              onClick={() => handleNavigate(link)}
            >
              {link}
            </button>
          ))}
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className={styles.drawerGh}
          >
            GitHub ↗
          </a>
        </div>
      )}
    </nav>
  );
}
