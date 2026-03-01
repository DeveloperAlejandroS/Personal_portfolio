// components/MeshBackground.jsx
export default function MeshBackground({ theme }) {
  const isDark = theme === "dark";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
    }}>
      {isDark ? (
        <>
          <Orb size={600} color="#6d28d9" opacity={0.12} top="-200px" left="-200px" />
          <Orb size={400} color="#9333ea" opacity={0.12} bottom="0"   right="-100px" />
          <Orb size={300} color="#7c3aed" opacity={0.10} top="40%"    left="50%" />
        </>
      ) : (
        <>
          <Orb size={600} color="#0d9488" opacity={0.08} top="-200px" left="-200px" />
          <Orb size={400} color="#06b6d4" opacity={0.07} bottom="0"   right="-100px" />
          <Orb size={300} color="#14b8a6" opacity={0.06} top="40%"    left="50%" />
        </>
      )}
    </div>
  );
}

function Orb({ size, color, opacity, ...pos }) {
  return (
    <div style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: "blur(80px)",
      opacity,
      ...pos,
    }} />
  );
}
