// App.jsx — root component, wires everything together.
// To add a new section: import it, add to SECTIONS, done.

import { useState } from 'react';
import { GITHUB_USER } from './data/portfolio';

import MeshBackground from './components/MeshBackground';
import Navbar         from './components/Navbar';
import Footer         from './components/Footer';

import About          from './sections/About';
import Experience     from './sections/Experience';
import Technologies   from './sections/Technologies';
import Projects       from './sections/Projects';

// ── Section registry ─────────────────────────────────────
// Add / remove / reorder sections here.
const SECTIONS = {
  About,
  Experience,
  Technologies,
  Projects,
};

export default function App() {
  const [active, setActive] = useState("About");

  const ActiveSection = SECTIONS[active];

  return (
    <>
      <MeshBackground />

      <Navbar
        active={active}
        onNavigate={setActive}
        githubUser={GITHUB_USER}
      />

      <main style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 24px",
      }}>
        {/* Re-mount section on tab change to re-trigger entrance animation */}
        <ActiveSection key={active} />
      </main>

      <Footer />
    </>
  );
}
