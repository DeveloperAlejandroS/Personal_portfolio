// MeshBackground.jsx — kept for soft gradient orbs behind the canvas
export default function MeshBackground({ theme }) {
  const isDark = theme === 'dark';
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: isDark ? '#6d28d9' : '#0d9488', filter: 'blur(120px)', opacity: isDark ? 0.07 : 0.05, top: -300, left: -200 }} />
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: isDark ? '#9333ea' : '#06b6d4', filter: 'blur(120px)', opacity: isDark ? 0.07 : 0.04, bottom: -100, right: -100 }} />
    </div>
  );
}
