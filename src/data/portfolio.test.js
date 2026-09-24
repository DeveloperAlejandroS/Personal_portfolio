import { describe, expect, it } from 'vitest';
import { CERTIFICATIONS, EXPERIENCE, FEATURED_REPOS, HIDDEN_REPOS, PROFILE, SKILLS } from './portfolio';
import { CERTIFICATION_ICON_MAP, EXPERIENCE_ICON_MAP } from './iconMaps';
import { SKILL_ICON_MAP } from './techIcons';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function startMonthIndex(period) {
  const [, month, year] = period.match(/^(\w{3}) (\d{4})/) ?? [];
  expect(MONTHS, `unexpected period "${period}"`).toContain(month);
  return Number(year) * 12 + MONTHS.indexOf(month);
}

describe('portfolio data', () => {
  it('lists experience from most recent to oldest', () => {
    const starts = EXPERIENCE.map((job) => startMonthIndex(job.period));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it('gives every experience bullet text and a known icon', () => {
    EXPERIENCE.forEach((job) => {
      expect(job.bullets.length, job.company).toBeGreaterThan(0);
      job.bullets.forEach(({ text, iconKey }) => {
        expect(text.trim(), job.company).not.toBe('');
        expect(Object.keys(EXPERIENCE_ICON_MAP)).toContain(iconKey);
      });
    });
  });

  it('gives every certification a short name, issuer, date and known icon', () => {
    CERTIFICATIONS.forEach((cert) => {
      expect(cert.shortName, cert.name).toBeTruthy();
      expect(cert.issuer, cert.name).toBeTruthy();
      startMonthIndex(cert.date);
      expect(Object.keys(CERTIFICATION_ICON_MAP)).toContain(cert.iconKey);
    });
  });

  it('lists each skill once with a known icon', () => {
    const skills = Object.values(SKILLS).flat();
    const names = skills.map((skill) => skill.name);
    expect(new Set(names).size).toBe(names.length);
    skills.forEach((skill) => expect(Object.keys(SKILL_ICON_MAP)).toContain(skill.iconKey));
  });

  it('never features a hidden repo', () => {
    const hidden = HIDDEN_REPOS.map((name) => name.toLowerCase());
    const featured = FEATURED_REPOS.map((name) => name.toLowerCase());
    expect(new Set(featured).size).toBe(featured.length);
    featured.forEach((name) => expect(hidden).not.toContain(name));
  });

  it('points contact links at real profiles', () => {
    expect(PROFILE.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/);
    expect(PROFILE.email).toMatch(/^[^@\s]+@[^@\s]+\.\w+$/);
    expect(PROFILE.phone).toMatch(/^\+\d/);
  });
});
