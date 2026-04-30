// sections/Projects.jsx
import { useEffect, useRef, useState } from 'react';
import { GITHUB_USER, LANG_COLORS } from '../data/portfolio';
import DesktopProjectModal from '../components/DesktopProjectModal';

const RESPONSIVE_CARD_WIDTH = 'var(--project-card-width)';
const LIVE_CARD_RATIO = '300 / 645';
const COMPACT_CARD_RATIO = '300 / 345';
const EXCLUDED_REPO_NAMES = new Set(['personal_portfolio', 'developeralejandros']);

// ── Style Constants ────────────────────────────────────
const STYLES = {
  section: {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
    title: { fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 800 },
    subtitle: { color: 'var(--text-muted)', marginBottom: 48, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' },
  },
  card: {
    container: (hovered, focused, hasLivePreview) => ({
      background: hovered ? 'var(--tag-bg)' : 'var(--bg-card)',
      border: focused ? '2px solid var(--accent-bright)' : `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: hovered || focused ? 'translateY(-4px)' : 'none',
      boxShadow: focused ? '0 0 0 3px rgba(168, 85, 247, 0.2)' : hovered ? '0 12px 40px rgba(0,0,0,0.2)' : 'none',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      flexDirection: 'column',
      width: RESPONSIVE_CARD_WIDTH,
      minWidth: RESPONSIVE_CARD_WIDTH,
      maxWidth: RESPONSIVE_CARD_WIDTH,
      aspectRatio: hasLivePreview ? LIVE_CARD_RATIO : COMPACT_CARD_RATIO,
      outline: 'none',
    }),
    preview: { position: 'relative', height: '32.56%', overflow: 'hidden', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' },
    badge: { position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', color: '#4ade80', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '4px 10px', borderRadius: 20, border: '1px solid rgba(74,222,128,0.4)', fontWeight: 600 },
    body: { padding: 18, flex: 1, display: 'flex', flexDirection: 'column' },
    title: { fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, fontSize: '0.92rem', lineHeight: 1.3 },
    description: {
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
      lineHeight: 1.6,
      marginBottom: 14,
      flex: 1,
      minHeight: 'clamp(72px, 14vw, 96px)',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 6,
      overflow: 'hidden',
    },
    meta: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    stats: { display: 'flex', gap: 10, color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' },
    tags: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 },
    actions: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  },
  button: (variant = 'ghost') => ({
    ghost: { flex: 1, minWidth: 80, padding: '8px 12px', textAlign: 'center', background: 'var(--btn-ghost-bg)', border: '1px solid var(--btn-ghost-border)', borderRadius: 6, color: 'var(--btn-ghost-color)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease' },
    primary: { flex: 1, minWidth: 80, padding: '8px 12px', textAlign: 'center', background: 'var(--gradient-btn)', borderRadius: 6, color: 'white', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s ease', fontWeight: 500 },
  }[variant] || {}),
  loader: {
    container: { textAlign: 'center', padding: 60 },
    spinner: { width: 48, height: 48, border: '3px solid var(--border)', borderTop: '3px solid var(--accent-mid)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' },
  },
  error: {
    container: { borderColor: 'rgba(239,68,68,0.4)', backgroundColor: 'rgba(239,68,68,0.05)' },
    text: { color: '#ef4444', marginBottom: 12, fontWeight: 600 },
    subtext: { color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 8, fontFamily: 'var(--font-mono)' },
  },
}

export default function Projects({ githubRepos = null, githubReposError = false }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();

    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) setSelectedRepo(null);
  }, [isDesktop]);

  const repos = githubRepos
    ? githubRepos.filter((repo) => !repo.archived && !EXCLUDED_REPO_NAMES.has(repo.name.toLowerCase()))
      .slice()
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    : [];
  const loading = githubRepos === null;
  const error = githubReposError;
  const liveRepos = repos
    .filter((repo) => hasLiveUrl(repo))
    .sort(sortByFeaturedScore);
  const groupedRepos = groupReposByTechnology(
    repos.filter((repo) => !hasLiveUrl(repo))
  );
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1180;
  const sectionTitleSize = isMobile ? 'clamp(1.45rem, 7vw, 2rem)' : 'clamp(1.8rem, 5vw, 2.5rem)';
  const sectionSubtitleMargin = isMobile ? 32 : 48;
  return (
    <div className="section-enter">
      <div style={{ ...STYLES.section.header, marginBottom: isMobile ? 6 : 8 }}>
        <h2 style={{ ...STYLES.section.title, fontSize: sectionTitleSize }}>
          GitHub <span className="gradient-text">Projects</span>
        </h2>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.72rem' : '0.8rem', color: 'var(--accent-mid)', textDecoration: 'none' }}>
          View all ↗
        </a>
      </div>
      <p style={{ ...STYLES.section.subtitle, marginBottom: sectionSubtitleMargin, fontSize: isMobile ? '0.74rem' : '0.8rem' }}>
        // fetched live from github.com/{GITHUB_USER}
      </p>

      {loading && <Loader />}
      {error   && <ErrorState user={GITHUB_USER} />}
      {!loading && !error && repos.length === 0 && (
        <div className="glass-card" style={{ padding: 40, textAlign: 'center', border: '1px solid var(--border)' }} role="status" aria-label="No repositories found">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>📭 No public repositories found.</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: 12, fontFamily: 'var(--font-mono)' }}>Check back soon or visit GitHub profile directly</p>
        </div>
      )}
      {!loading && !error && repos.length > 0 && (
        <div style={{ display: 'grid', gap: 28 }}>
          {liveRepos.length > 0 && (
            <ProjectSection
              title="Live websites"
              description="Projects that are already deployed and can be visited right away."
              repos={liveRepos}
              isDesktop={isDesktop}
              viewportWidth={viewportWidth}
              onSelectRepo={setSelectedRepo}
            />
          )}

          {groupedRepos.map((group) => (
            <ProjectSection
              key={group.label}
              title={group.label}
              description={group.description}
              repos={group.repos}
              isDesktop={isDesktop}
              viewportWidth={viewportWidth}
              onSelectRepo={setSelectedRepo}
            />
          ))}

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Loaded {repos.length} repositories
          </div>
        </div>
      )}

      {isDesktop && (
        <DesktopProjectModal
          repo={selectedRepo}
          isOpen={Boolean(selectedRepo)}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  );
}

function ProjectSection({ title, description, repos, isDesktop, viewportWidth, onSelectRepo }) {
  const carouselRef = useRef(null);
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1180;
  const carouselGap = isMobile ? 14 : isTablet ? 18 : 20;
  const sectionGap = isMobile ? 10 : 14;
  const sectionTitleSize = isMobile ? '1rem' : '1.1rem';
  const sectionDescriptionSize = isMobile ? '0.76rem' : '0.82rem';

  const scrollCarousel = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    const cardWidth = container.querySelector('[data-repo-card]')?.getBoundingClientRect().width || 320;
    container.scrollBy({
      left: direction * (cardWidth + carouselGap),
      behavior: 'smooth',
    });
  };

  return (
    <section style={{ display: 'grid', gap: sectionGap }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 8 }}>
        <div>
          <h3 style={{ fontSize: sectionTitleSize, fontWeight: 700, marginBottom: isMobile ? 4 : 6 }}>{title}</h3>
          {description && (
            <p style={{ color: 'var(--text-muted)', fontSize: sectionDescriptionSize, fontFamily: 'var(--font-mono)' }}>{description}</p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--text-dim)', fontSize: isMobile ? '0.7rem' : '0.75rem', fontFamily: 'var(--font-mono)' }}>{repos.length} repos</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label={`Scroll ${title} projects left`}
              style={CAROUSEL_STYLES.button}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label={`Scroll ${title} projects right`}
              style={CAROUSEL_STYLES.button}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="carousel-scrollbar-hide"
        style={{ ...CAROUSEL_STYLES.container, '--carousel-gap': `${carouselGap}px` }}
        aria-label={`${title} carousel`}
      >
        {repos.map((repo) => (
          <div key={repo.id} data-repo-card style={CAROUSEL_STYLES.slide}>
            <RepoCard repo={repo} canOpenModal={isDesktop} onOpenModal={onSelectRepo} />
          </div>
        ))}
      </div>
    </section>
  );
}

const CAROUSEL_STYLES = {
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: RESPONSIVE_CARD_WIDTH,
    gap: 'var(--carousel-gap, 20px)',
    overflowX: 'auto',
    overflowY: 'visible',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: -16,
    marginBottom: -16,
    scrollSnapType: 'x proximity',
    scrollPaddingInline: 8,
    overscrollBehaviorX: 'contain',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  slide: {
    scrollSnapAlign: 'start',
    minWidth: 0,
    width: RESPONSIVE_CARD_WIDTH,
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
};

/* ── Repo card with optional link preview ─────────────── */
function RepoCard({ repo, canOpenModal, onOpenModal }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [thumbnailState, setThumbnailState] = useState('loading');
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const langColor = LANG_COLORS[repo.language] ?? LANG_COLORS.default;
  const liveUrl   = repo.homepage || null;
  const thumbnailUrl = liveUrl
    ? `https://api.microlink.io/?url=${encodeURIComponent(normalizeUrl(liveUrl))}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

  const openDetails = () => {
    if (!canOpenModal || !onOpenModal) return;
    if (window.innerWidth < 1024) return;
    onOpenModal(repo);
  };

  const handleCardClick = (event) => {
    if (event.target.closest('a, button')) return;
    openDetails();
  };

  const handleCardKeyDown = (event) => {
    if (!canOpenModal) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetails();
    }
  };

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1180;
  const bodyPadding = isMobile ? 14 : isTablet ? 16 : 18;
  const titleSize = isMobile ? '0.88rem' : isTablet ? '0.9rem' : '0.92rem';
  const descriptionSize = isMobile ? '0.74rem' : isTablet ? '0.78rem' : '0.8rem';
  const descriptionClamp = isMobile ? 5 : isTablet ? 6 : 6;
  const tagsMarginBottom = isMobile ? 10 : 14;
  const actionButtonFont = isMobile ? '0.68rem' : '0.72rem';

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      data-repo-card
      style={STYLES.card.container(hovered, focused, Boolean(liveUrl))}
      role="article"
      tabIndex={canOpenModal ? 0 : -1}
      aria-label={`${repo.name} - ${repo.language || 'Multi-language'} project with ${repo.stargazers_count} stars`}
    >
      {/* ── Link preview thumbnail ── */}
      {liveUrl && (
        <PreviewSection
          repoName={repo.name}
          thumbnailUrl={thumbnailUrl}
          thumbnailState={thumbnailState}
          onThumbnailLoad={() => setThumbnailState('ready')}
          onThumbnailError={() => setThumbnailState('error')}
        />
      )}

      {/* ── Card body ── */}
      <div style={{ ...STYLES.card.body, padding: bodyPadding }}>
        <div style={STYLES.card.meta}>
          <span style={{ fontSize: '1rem' }}>📦</span>
        </div>

        <h3 style={{ ...STYLES.card.title, fontSize: titleSize }}>
          {repo.name}
        </h3>
        {canOpenModal && (
          <p style={{ color: 'var(--accent-mid)', fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.64rem' : '0.68rem', marginBottom: 8 }}>
            Click para abrir detalle
          </p>
        )}
        <p style={{
          ...STYLES.card.description,
          fontSize: descriptionSize,
          lineHeight: isMobile ? 1.5 : 1.6,
          WebkitLineClamp: descriptionClamp,
          minHeight: isMobile ? '58px' : 'clamp(72px, 14vw, 96px)',
        }}>
          {repo.description || 'No description provided.'}
        </p>

        {/* ── Tags & Language ── */}
        <div style={{ ...STYLES.card.tags, marginBottom: tagsMarginBottom }}>
          {repo.language && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.66rem' : '0.7rem', color: 'var(--text-secondary)' }} aria-label={`Primary language: ${repo.language}`}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: langColor, display: 'inline-block' }} aria-hidden="true" />
              {repo.language}
            </span>
          )}
          {repo.topics?.slice(0, 3).map((t) => <span key={t} className="tag" role="listitem">{t}</span>)}
        </div>

        {/* ── Action buttons ── */}
        <div style={STYLES.card.actions}>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noreferrer noopener"
            className="repo-button"
            style={{ ...STYLES.button('ghost'), fontSize: actionButtonFont, padding: isMobile ? '7px 10px' : '8px 12px' }}
            aria-label={`View ${repo.name} source code on GitHub (opens in new window)`}
            title={`View ${repo.name} on GitHub`}
          >
            &lt;/&gt; Code
          </a>
          {liveUrl && (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noreferrer noopener"
              className="repo-button"
              style={{ ...STYLES.button('primary'), fontSize: actionButtonFont, padding: isMobile ? '7px 10px' : '8px 12px' }}
              aria-label={`Visit ${repo.name} live website (opens in new window)`}
              title={`Visit ${repo.name} live site`}
            >
              ↗ Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function normalizeUrl(url) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function hasLiveUrl(repo) {
  const homepage = typeof repo.homepage === 'string' ? repo.homepage.trim() : '';
  const liveTag = Array.isArray(repo.topics) && repo.topics.some((topic) => topic.toLowerCase() === 'live');
  return Boolean(homepage || liveTag);
}

function sortByFeaturedScore(a, b) {
  const aScore = getFeaturedScore(a);
  const bScore = getFeaturedScore(b);
  if (bScore !== aScore) return bScore - aScore;
  return new Date(b.updated_at) - new Date(a.updated_at);
}

function getFeaturedScore(repo) {
  return [repo.homepage, repo.stargazers_count, repo.forks_count].reduce((score, value, index) => {
    if (index === 0 && value) return score + 3;
    if (index === 1) return score + Math.min(value || 0, 50) / 25;
    if (index === 2) return score + Math.min(value || 0, 20) / 20;
    return score;
  }, 0);
}

function groupReposByTechnology(repos) {
  const groups = new Map();

  repos.forEach((repo) => {
    const label = getTechnologyGroupLabel(repo);
    if (!groups.has(label)) {
      groups.set(label, {
        label,
        description: getTechnologyGroupDescription(label),
        repos: [],
      });
    }
    groups.get(label).repos.push(repo);
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      repos: group.repos.slice().sort(sortByFeaturedScore),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function getTechnologyGroupLabel(repo) {
  if (repo.language) return repo.language;
  if (Array.isArray(repo.topics) && repo.topics.length > 0) {
    return formatTopicLabel(repo.topics[0]);
  }
  return 'Other technologies';
}

function getTechnologyGroupDescription(label) {
  if (label === 'Other technologies') {
    return 'Repos without a single dominant language or topic tag.';
  }
  return `Projects built primarily with ${label}.`;
}

function formatTopicLabel(topic) {
  return topic
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* ── Preview Section Component ── */
function PreviewSection({ repoName, thumbnailUrl, thumbnailState, onThumbnailLoad, onThumbnailError }) {
  return (
    <div style={STYLES.card.preview} role="img" aria-label={`${repoName} website preview`}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt={`${repoName} preview`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={onThumbnailLoad}
          onError={onThumbnailError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: thumbnailState === 'ready' ? 1 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />
      )}

      {/* Live badge */}
      <span style={STYLES.card.badge}>
        ● LIVE
      </span>
    </div>
  );
}

function Loader() {
  return (
    <div style={STYLES.loader.container} role="status" aria-label="Loading repositories">
      <div style={STYLES.loader.spinner} aria-hidden="true" />
      <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>⏳ Loading repositories...</p>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: 8, fontFamily: 'var(--font-mono)' }}>This may take a moment</p>
    </div>
  );
}

function ErrorState({ user }) {
  return (
    <div className="glass-card" style={{ padding: 40, textAlign: 'center', ...STYLES.error.container }} role="alert" aria-label="Failed to load repositories">
      <p style={STYLES.error.text}>⚠️ Could not load repositories</p>
      <p style={STYLES.error.subtext}>There was an issue fetching your GitHub projects. This may be due to rate limiting or network issues.</p>
      <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer noopener"
        style={{ color: 'var(--accent-bright)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'inline-block', marginTop: 16 }} 
        aria-label={`Visit ${user}'s GitHub profile (opens in new window)`}
      >
        Visit GitHub profile ↗
      </a>
    </div>
  );
}
