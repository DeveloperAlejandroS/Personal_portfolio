import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { fetchGithubData } from './lib/github';
import { GITHUB_USER } from './data/portfolio';

vi.mock('./components/AnimatedBackground', () => ({ default: () => null }));
vi.mock('./lib/github', () => ({ fetchGithubData: vi.fn() }));

const PAYLOAD = { profile: { public_repos: 7, followers: 3, following: 1 }, repos: [], languages: [] };
const apiUnavailable = { ok: false, status: 404, json: async () => ({}) };

describe('App', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.mocked(fetchGithubData).mockReset();
    window.history.replaceState(null, '', '/');
  });

  it('loads GitHub data from /api/github without calling GitHub directly', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => PAYLOAD }));
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    expect(await screen.findByText('7')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/github', expect.anything());
    expect(fetchGithubData).not.toHaveBeenCalled();
  });

  it('falls back to direct GitHub requests when /api/github is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => apiUnavailable));
    vi.mocked(fetchGithubData).mockResolvedValue(PAYLOAD);

    render(<App />);

    expect(await screen.findByText('7')).toBeInTheDocument();
    expect(fetchGithubData).toHaveBeenCalledWith(GITHUB_USER, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });

  it('shows the error state when both sources fail', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => apiUnavailable));
    vi.mocked(fetchGithubData).mockRejectedValue(new Error('rate limited'));
    window.history.replaceState(null, '', '/#projects');

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load repositories');
  });

  it('keeps the active section in the URL hash', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => PAYLOAD })));

    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Experience' }));

    expect(window.location.hash).toBe('#experience');
    expect(await screen.findByRole('heading', { level: 2, name: 'Work Experience' })).toBeInTheDocument();
  });
});
