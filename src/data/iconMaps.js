import {
  Award,
  ChartColumnIncreasing,
  ClipboardList,
  Code2,
  Globe,
  Link2,
  Users2,
} from 'lucide-react';
import { SiPython } from 'react-icons/si';

export const EXPERIENCE_ICON_MAP = {
  python: { kind: 'devicon', className: 'devicon-python-plain colored' },
  analytics: { kind: 'fallback', icon: ChartColumnIncreasing, color: 'var(--accent-mid)' },
  excel: { kind: 'fallback', icon: ClipboardList, color: 'var(--accent-bright)' },
  team: { kind: 'fallback', icon: Users2, color: 'var(--accent-light)' },
  default: { kind: 'fallback', icon: Code2, color: 'var(--accent-bright)' },
};

export const CERTIFICATION_ICON_MAP = {
  award: { kind: 'fallback', icon: Award, color: '#fbbf24' },
  network: { kind: 'fallback', icon: Globe, color: '#38bdf8' },
  link: { kind: 'fallback', icon: Link2, color: '#8b5cf6' },
  python: { kind: 'devicon', className: 'devicon-python-plain colored' },
  default: { kind: 'fallback', icon: Award, color: '#fbbf24' },
};
