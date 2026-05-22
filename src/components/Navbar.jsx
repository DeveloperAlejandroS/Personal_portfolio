// components/Navbar.jsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Briefcase, Cpu, FolderOpen, MoonStar, SunMedium, User } from 'lucide-react';
import styles from './Navbar.module.css';

const NAV_LINKS = ["About", "Experience", "Technologies", "Projects"];
const MOBILE_ICONS = {
  About: User,
  Experience: Briefcase,
  Technologies: Cpu,
  Projects: FolderOpen,
};

export default function Navbar({ active, onNavigate, theme, onToggleTheme }) {
  const linksRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ transform: 'translateX(0px)', width: '0px', opacity: 0 });

  const handleNavigate = (link) => {
    onNavigate(link);
  };

  const syncIndicator = () => {
    const container = linksRef.current;
    const activeButton = linkRefs.current[active];

    if (!container || !activeButton) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setIndicatorStyle({
      transform: `translateX(${buttonRect.left - containerRect.left}px)`,
      width: `${buttonRect.width}px`,
      opacity: 1,
    });
  };

  useLayoutEffect(() => {
    syncIndicator();
  }, [active]);

  useEffect(() => {
    const onResize = () => syncIndicator();

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active]);

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
        <div className={styles.links} ref={linksRef}>
          <span className={styles.activeIndicator} style={indicatorStyle} aria-hidden="true" />
          {NAV_LINKS.map((link) => {
            const Icon = MOBILE_ICONS[link];

            return (
              <button
                key={link}
                className={`${styles.link} ${active === link ? styles.active : ""}`}
                ref={(node) => {
                  if (node) {
                    linkRefs.current[link] = node;
                  }
                }}
                onClick={() => handleNavigate(link)}
                type="button"
                aria-current={active === link ? "page" : undefined}
                aria-label={link}
                title={link}
              >
                <span className={styles.linkLabel}>{link}</span>
                <span className={styles.linkIcon} aria-hidden="true">
                  <Icon size={16} strokeWidth={2.4} />
                </span>
              </button>
            );
          })}
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
            {theme === "dark" ? <SunMedium size={16} strokeWidth={2.4} /> : <MoonStar size={16} strokeWidth={2.4} />}
          </button>

        </div>
      </div>
    </nav>
  );
}
