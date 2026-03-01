// components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      borderTop: "1px solid var(--border)",
      textAlign: "center",
      padding: "24px 16px",
      color: "var(--text-dim)",
      fontFamily: "var(--font-mono)",
      fontSize: "0.75rem",
    }}>
      <span style={{ color: "var(--accent-deep)" }}>&lt;</span>
      built with React · Alejandro Sierra Vargas · 2026
      <span style={{ color: "var(--accent-deep)" }}>/&gt;</span>
    </footer>
  );
}
