import { fetchGithubData } from '../src/lib/github.js';
import { GITHUB_USER } from '../src/data/portfolio.js';

const MEMORY_CACHE_MS = 10 * 60 * 1000;
const GITHUB_TIMEOUT_MS = 8000;
let cached = null;

// Shares one in-flight/recent GitHub fetch across requests hitting the same instance.
function getGithubData() {
  if (!cached || cached.expiresAt < Date.now()) {
    const promise = fetchGithubData(GITHUB_USER, {
      token: process.env.GITHUB_TOKEN,
      signal: AbortSignal.timeout(GITHUB_TIMEOUT_MS),
    });
    cached = { promise, expiresAt: Date.now() + MEMORY_CACHE_MS };
    promise.catch(() => {
      if (cached?.promise === promise) cached = null;
    });
  }
  return cached.promise;
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  try {
    const data = await getGithubData();
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error('GitHub data request failed:', error.message);
    res.setHeader('Cache-Control', 'no-store');
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'Could not load GitHub data' }));
  }
}
