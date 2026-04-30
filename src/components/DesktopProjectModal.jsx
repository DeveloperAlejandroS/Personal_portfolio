import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LANG_COLORS } from '../data/portfolio';

const MODAL_ANIMATION_MS = 260;

export default function DesktopProjectModal({ repo, isOpen, onClose }) {
  const [repoLanguages, setRepoLanguages] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState('closed');
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closeRequestedRef = useRef(false);

  const liveUrl = useMemo(() => {
    const homepage = typeof repo?.homepage === 'string' ? repo.homepage.trim() : '';
    if (!homepage) return null;
    return /^https?:\/\//i.test(homepage) ? homepage : `https://${homepage}`;
  }, [repo]);

  useEffect(() => {
    if (!isOpen || !repo?.languages_url) {
      setRepoLanguages([]);
      return;
    }

    const base =
      (typeof import.meta.env.VITE_GITHUB_API_BASE === 'string' && import.meta.env.VITE_GITHUB_API_BASE.trim())
      || 'https://api.github.com';
    const token =
      (typeof import.meta.env.VITE_GITHUB_TOKEN === 'string' && import.meta.env.VITE_GITHUB_TOKEN.trim())
      || '';
    const headers = {
      Accept: 'application/vnd.github+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const controller = new AbortController();

    fetch(repo.languages_url.replace('https://api.github.com', base), { headers, signal: controller.signal })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        const entries = Object.entries(data || {});
        const total = entries.reduce((sum, [, bytes]) => sum + Number(bytes || 0), 0);
        if (!total) {
          setRepoLanguages([]);
          return;
        }

        const distribution = entries
          .map(([name, bytes]) => ({
            name,
            pct: Math.round((Number(bytes || 0) / total) * 100),
          }))
          .filter((item) => item.pct > 0)
          .sort((a, b) => b.pct - a.pct);

        setRepoLanguages(distribution);
      })
      .catch(() => setRepoLanguages([]));

    return () => controller.abort();
  }, [isOpen, repo]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (isOpen) {
      closeRequestedRef.current = false;
      setMounted(true);
      setPhase('opening');
      requestAnimationFrame(() => setPhase('open'));
      return;
    }

    if (mounted && !closeRequestedRef.current) {
      setPhase('closing');
      closeTimerRef.current = window.setTimeout(() => {
        setMounted(false);
        setPhase('closed');
      }, MODAL_ANIMATION_MS);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!mounted) return;
    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = modalRef.current?.querySelectorAll(
        'button, a, iframe, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusables || focusables.length === 0) return;

      const focusableElements = Array.from(focusables).filter((element) => !element.hasAttribute('disabled'));
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mounted]);

  const requestClose = () => {
    if (closeRequestedRef.current) return;
    closeRequestedRef.current = true;
    setPhase('closing');

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setMounted(false);
      setPhase('closed');
      closeRequestedRef.current = false;
      onClose();
    }, MODAL_ANIMATION_MS);
  };

  useEffect(() => {
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;
    const root = document.getElementById('root');
    document.body.style.overflow = 'hidden';
    if (root) {
      root.setAttribute('aria-hidden', 'true');
      root.setAttribute('inert', '');
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      if (root) {
        root.removeAttribute('aria-hidden');
        root.removeAttribute('inert');
      }
      previouslyFocusedRef.current?.focus?.();
    };
  }, [mounted]);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  if ((!mounted && !isOpen) || !repo) return null;

  const isClosing = phase === 'closing';
  const isStacked = viewportWidth < 1180;
  const modalPadding = viewportWidth < 768 ? 16 : 24;
  const modalInnerGap = viewportWidth < 768 ? 12 : 16;
  const sidePadding = viewportWidth < 768 ? 18 : 24;
  const titleSize = viewportWidth < 768 ? '1.28rem' : viewportWidth < 1180 ? '1.38rem' : '1.45rem';

  return createPortal((
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
      onClick={requestClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        background: isClosing ? 'rgba(4, 3, 12, 0)' : 'rgba(4, 3, 12, 0.78)',
        backdropFilter: isClosing ? 'blur(0px)' : 'blur(6px)',
        display: 'grid',
        placeItems: 'center',
          padding: modalPadding,
        opacity: isClosing ? 0 : 1,
        transition: `opacity ${MODAL_ANIMATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter ${MODAL_ANIMATION_MS}ms ease, background-color ${MODAL_ANIMATION_MS}ms ease`,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(1120px, calc(100vw - 32px))',
          maxHeight: 'calc(100vh - 32px)',
          background: 'linear-gradient(180deg, rgba(24, 18, 40, 0.96), rgba(14, 10, 24, 0.96))',
          border: '1px solid var(--border)',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
          display: 'grid',
          gridTemplateColumns: isStacked ? '1fr' : 'minmax(0, 1.6fr) minmax(320px, 1fr)',
          gridTemplateRows: isStacked ? 'minmax(220px, 42vh) auto' : '1fr',
          transform: isClosing ? 'translateY(16px) scale(0.965)' : 'translateY(0) scale(1)',
          opacity: isClosing ? 0 : 1,
          filter: isClosing ? 'blur(1px)' : 'blur(0px)',
          transition: `transform ${MODAL_ANIMATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${MODAL_ANIMATION_MS}ms ease, filter ${MODAL_ANIMATION_MS}ms ease`,
        }}
      >
        <div style={{ position: 'relative', background: 'var(--bg-base-2)', minHeight: isStacked ? 220 : 'auto' }}>
          {liveUrl ? (
            <iframe
              src={liveUrl}
              title={`${repo.name} live site`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                textAlign: 'center',
                padding: 24,
              }}
            >
              Este proyecto no tiene sitio en vivo.
            </div>
          )}

        </div>

        <aside style={{ padding: sidePadding, display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: modalInnerGap, overflowY: 'auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: isStacked ? 6 : 8 }}>
              <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                PROJECT DETAIL
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={requestClose}
                aria-label="Cerrar modal"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.28)',
                  background: 'rgba(0,0,0,0.28)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                X
              </button>
            </div>
            <h3 id="project-modal-title" style={{ fontSize: titleSize, lineHeight: 1.18, marginBottom: 8 }}>{repo.name}</h3>
            <p id="project-modal-description" style={{ color: 'var(--text-muted)', fontSize: viewportWidth < 768 ? '0.84rem' : '0.88rem', lineHeight: 1.62 }}>
              {repo.description || 'No description provided.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignContent: 'start' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Stars: {repo.stargazers_count}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              Forks: {repo.forks_count}
            </span>
            {repo.language && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Main: {repo.language}
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
            <p style={{ color: 'var(--accent-bright)', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', letterSpacing: '0.08em' }}>
              LANGUAGES
            </p>
            {repoLanguages.length === 0 && (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                No language breakdown available.
              </p>
            )}
            {repoLanguages.map((language) => (
              <div key={language.name} style={{ display: 'grid', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>{language.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{language.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 4, overflow: 'hidden', background: 'var(--border)' }}>
                  <div
                    style={{
                      width: `${language.pct}%`,
                      height: '100%',
                      background: LANG_COLORS[language.name] || LANG_COLORS.default,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                flex: 1,
                minWidth: 120,
                textAlign: 'center',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid var(--btn-ghost-border)',
                textDecoration: 'none',
                color: 'var(--btn-ghost-color)',
                background: 'var(--btn-ghost-bg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
              }}
            >
              Ver codigo
            </a>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  flex: 1,
                  minWidth: 120,
                  textAlign: 'center',
                  padding: '10px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: '#fff',
                  background: 'var(--gradient-btn)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                }}
              >
                Abrir sitio
              </a>
            )}
          </div>
        </aside>
      </div>
    </div>
  ), document.body);
}
