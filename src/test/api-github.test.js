// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GITHUB_USER } from '../data/portfolio';

vi.mock('../lib/github.js', () => ({ fetchGithubData: vi.fn() }));

const PAYLOAD = { profile: { public_repos: 1 }, repos: [], languages: [] };

function createResponse() {
  return {
    statusCode: 0,
    headers: {},
    body: undefined,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    end(body) { this.body = body; },
  };
}

describe('/api/github handler', () => {
  let handler;
  let fetchGithubData;

  beforeEach(async () => {
    vi.resetModules();
    ({ fetchGithubData } = await import('../lib/github.js'));
    ({ default: handler } = await import('../../api/github.js'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.GITHUB_TOKEN;
  });

  it('serves GitHub data with an edge-cache header and reuses it across requests', async () => {
    fetchGithubData.mockResolvedValue(PAYLOAD);

    const first = createResponse();
    const second = createResponse();
    await handler({}, first);
    await handler({}, second);

    expect(first.statusCode).toBe(200);
    expect(first.headers['cache-control']).toContain('s-maxage=3600');
    expect(JSON.parse(first.body)).toEqual(PAYLOAD);
    expect(second.statusCode).toBe(200);
    expect(fetchGithubData).toHaveBeenCalledTimes(1);
  });

  it('uses the server-only token', async () => {
    process.env.GITHUB_TOKEN = 'server-secret';
    fetchGithubData.mockResolvedValue(PAYLOAD);

    await handler({}, createResponse());

    expect(fetchGithubData).toHaveBeenCalledWith(GITHUB_USER, expect.objectContaining({ token: 'server-secret' }));
  });

  it('answers 502 without caching when GitHub fails, and retries on the next request', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    fetchGithubData
      .mockRejectedValueOnce(new Error('GitHub API error 403'))
      .mockResolvedValueOnce(PAYLOAD);

    const failed = createResponse();
    await handler({}, failed);
    const retried = createResponse();
    await handler({}, retried);

    expect(failed.statusCode).toBe(502);
    expect(failed.headers['cache-control']).toBe('no-store');
    expect(retried.statusCode).toBe(200);
    expect(fetchGithubData).toHaveBeenCalledTimes(2);
  });
});
