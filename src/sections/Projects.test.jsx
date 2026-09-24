import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';
import { FEATURED_REPOS, HIDDEN_REPOS } from '../data/portfolio';

const repo = (name, overrides = {}) => ({
  id: name,
  name,
  description: `${name} description`,
  html_url: `https://github.com/octo/${name}`,
  homepage: null,
  language: 'JavaScript',
  topics: [],
  stargazers_count: 0,
  forks_count: 0,
  archived: false,
  updated_at: '2026-01-01T00:00:00Z',
  languages: {},
  ...overrides,
});

const cardNames = (container) => within(container)
  .getAllByRole('article')
  .map((card) => card.getAttribute('aria-label').split(' - ')[0]);

describe('Projects', () => {
  it('pins featured repos first, in order, without repeating them below', () => {
    const repos = [
      repo('newest-side-project', { updated_at: '2026-09-01T00:00:00Z' }),
      ...[...FEATURED_REPOS].reverse().map((name) => repo(name)),
    ];

    render(<Projects githubRepos={repos} githubReposError={false} />);

    const featured = screen.getByRole('region', { name: 'Featured projects' });
    expect(cardNames(featured)).toEqual(FEATURED_REPOS);
    FEATURED_REPOS.forEach((name) => {
      expect(cardNames(document.body).filter((cardName) => cardName === name)).toHaveLength(1);
    });
    expect(cardNames(document.body)).toContain('newest-side-project');
  });

  it('never renders hidden or archived repos', () => {
    const repos = [repo(HIDDEN_REPOS[0]), repo('old-thing', { archived: true }), repo('visible')];

    render(<Projects githubRepos={repos} githubReposError={false} />);

    expect(cardNames(document.body)).toEqual(['visible']);
  });
});
