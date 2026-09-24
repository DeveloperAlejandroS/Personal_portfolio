// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchGithubData } from './github';

const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), { status });

const githubRepo = (overrides) => ({
  id: 1,
  name: 'app',
  fork: false,
  archived: false,
  description: 'An app',
  html_url: 'https://github.com/octo/app',
  homepage: '',
  language: 'JavaScript',
  topics: ['react'],
  stargazers_count: 3,
  forks_count: 1,
  updated_at: '2026-01-01T00:00:00Z',
  languages_url: 'https://api.github.com/repos/octo/app/languages',
  owner: { login: 'octo' },
  ...overrides,
});

describe('fetchGithubData', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('skips forks, attaches per-repo languages and totals them without excluded languages', async () => {
    const fetchMock = vi.fn(async (url) => {
      if (url === 'https://api.github.com/users/octo') {
        return jsonResponse({ avatar_url: 'avatar.png', public_repos: 2, followers: 5, following: 1, email: 'x@y.z' });
      }
      if (url.startsWith('https://api.github.com/users/octo/repos')) {
        return jsonResponse([
          githubRepo(),
          githubRepo({ id: 2, name: 'docs', language: null, languages_url: 'unused' }),
          githubRepo({ id: 3, name: 'forked', fork: true }),
        ]);
      }
      if (url === 'https://api.github.com/repos/octo/app/languages') {
        return jsonResponse({ JavaScript: 300, CSS: 100, 'Jupyter Notebook': 5000 });
      }
      throw new Error(`Unexpected request: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const data = await fetchGithubData('octo', { token: 'server-token' });

    expect(data.profile).toEqual({ public_repos: 2, followers: 5, following: 1 });
    expect(data.repos.map((repo) => repo.name)).toEqual(['app', 'docs']);
    expect(data.repos[0]).not.toHaveProperty('owner');
    expect(data.repos[0].languages).toEqual({ JavaScript: 300, CSS: 100, 'Jupyter Notebook': 5000 });
    expect(data.repos[1].languages).toEqual({});
    expect(data.languages).toEqual([
      { lang: 'JavaScript', pct: 75 },
      { lang: 'CSS', pct: 25 },
    ]);
    expect(fetchMock.mock.calls.every(([, init]) => init.headers.Authorization === 'Bearer server-token')).toBe(true);
  });

  it('sends no Authorization header without a token', async () => {
    const fetchMock = vi.fn(async (url) => jsonResponse(url.includes('/repos') ? [] : {}));
    vi.stubGlobal('fetch', fetchMock);

    await fetchGithubData('octo');

    fetchMock.mock.calls.forEach(([, init]) => expect(init.headers).not.toHaveProperty('Authorization'));
  });

  it('rejects when GitHub returns an error status', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ message: 'API rate limit exceeded' }, 403)));

    await expect(fetchGithubData('octo')).rejects.toThrow('403');
  });
});
