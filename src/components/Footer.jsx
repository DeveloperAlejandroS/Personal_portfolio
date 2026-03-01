// components/Footer.jsx

export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid rgba(139,92,246,0.1)",
      textAlign: "center",
      padding: "24px",
      color: "var(--text-dim)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
    }}>
      <span style={{ color: "var(--purple-deep)" }}>&lt;</span>
      built with React · Alejandro Sierra Vargas · 2026
      <span style={{ color: "var(--purple-deep)" }}>/&gt;</span>
    </footer>
  );
}
