// components/MeshBackground.jsx
// Decorative ambient orbs — tweak colors/sizes here if needed.

export default function MeshBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}>
      <Orb size={600} color="#6d28d9" top="-200px" left="-200px" />
      <Orb size={400} color="#9333ea" bottom="0"   right="-100px" />
      <Orb size={300} color="#7c3aed" top="40%"    left="50%" />
    </div>
  );
}

function Orb({ size, color, ...pos }) {
  return (
    <div style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(80px)",
      opacity: 0.12,
      ...pos,
    }} />
  );
}
