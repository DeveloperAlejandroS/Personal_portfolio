import { EXCLUDED_LANGUAGES } from '../data/portfolio.js';

const API_BASE = 'https://api.github.com';
const TOP_LANGUAGES = 10;

async function fetchJson(url, { token, signal }) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal,
  });
  if (!response.ok) throw new Error(`GitHub API error ${response.status} for ${url}`);
  return response.json();
}

export function summarizeLanguages(languageMaps) {
  const totals = {};
  languageMaps.forEach((languages) => {
    Object.entries(languages).forEach(([language, bytes]) => {
      if (EXCLUDED_LANGUAGES.includes(language)) return;
      totals[language] = (totals[language] || 0) + bytes;
    });
  });

  const total = Object.values(totals).reduce((sum, bytes) => sum + bytes, 0);
  if (!total) return [];

  return Object.entries(totals)
    .map(([lang, bytes]) => ({ lang, pct: Math.round((bytes / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, TOP_LANGUAGES);
}

export async function fetchGithubData(user, { token, signal } = {}) {
  const options = { token, signal };
  const [profile, repos] = await Promise.all([
    fetchJson(`${API_BASE}/users/${user}`, options),
    fetchJson(`${API_BASE}/users/${user}/repos?per_page=100`, options),
  ]);

  const ownRepos = repos.filter((repo) => !repo.fork);
  const languagesByRepo = await Promise.all(
    ownRepos.map((repo) => (
      repo.language ? fetchJson(repo.languages_url, options).catch(() => ({})) : {}
    ))
  );

  return {
    profile: {
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
    },
    repos: ownRepos.map((repo, index) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics ?? [],
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      archived: repo.archived,
      updated_at: repo.updated_at,
      languages: languagesByRepo[index],
    })),
    languages: summarizeLanguages(languagesByRepo),
  };
}
