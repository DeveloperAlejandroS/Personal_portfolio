// Renders an icon spec from src/data/iconMaps.js: a devicon font class or a lucide component.
export default function SpecIcon({ spec, size }) {
  if (spec.kind === 'devicon') {
    return <i className={spec.className} aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }} />;
  }

  const Icon = spec.icon;
  return <Icon size={size} strokeWidth={2.2} aria-hidden="true" />;
}
