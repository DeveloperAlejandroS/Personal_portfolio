// components/Navbar.jsx
import styles from './Navbar.module.css';

const NAV_LINKS = ["About", "Experience", "Technologies", "Projects"];

export default function Navbar({ active, onNavigate, githubUser }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>
        <span className={styles.bracket}>&lt;</span>
        AlejandroS
        <span className={styles.bracket}>/&gt;</span>
      </span>

      <div className={styles.links}>
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            className={`${styles.link} ${active === link ? styles.active : ""}`}
            onClick={() => onNavigate(link)}
          >
            {link}
          </button>
        ))}
      </div>

      <a
        href={`https://github.com/${githubUser}`}
        target="_blank"
        rel="noreferrer"
        className={styles.ghBtn}
      >
        GitHub ↗
      </a>
    </nav>
  );
}
