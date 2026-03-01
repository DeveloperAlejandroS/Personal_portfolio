// App.jsx — root component, wires everything together.
// To add a new section: import it, add to SECTIONS, done.

import { useState, useEffect } from 'react';
import { GITHUB_USER } from './data/portfolio';

import MeshBackground from './components/MeshBackground';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';

import About          from './sections/About';
import Experience     from './sections/Experience';
import Technologies   from './sections/Technologies';
import Projects       from './sections/Projects';

const SECTIONS = {
  About,
  Experience,
  Technologies,
  Projects,
};

export default function App() {
  const [active, setActive] = useState("About");
  const [theme, setTheme]   = useState("dark");

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const ActiveSection = SECTIONS[active];

  return (
    <>
      <MeshBackground theme={theme} />

      <Navbar
        active={active}
        onNavigate={setActive}
        githubUser={GITHUB_USER}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 24px",
      }}>
        <ActiveSection key={active} />
      </main>

      <Footer />
    </>
  );
}
