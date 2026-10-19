import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ISSUES, ART_PLATFORMS, type Entry } from './data';
import { FlipControls, MagazineEntry } from './MagazineUI';

const TOTAL_PAGES = ISSUES.length;

/** Build an array of spreads: each spread is [left?, right?] */
type Spread = { left?: number; right?: number };

function buildSpreads(): Spread[] {
  const spreads: Spread[] = [];
  for (let i = 0; i < TOTAL_PAGES; i += 2) {
    const s: Spread = {};
    if (i < TOTAL_PAGES) s.left = i;
    if (i + 1 < TOTAL_PAGES) s.right = i + 1;
    spreads.push(s);
  }
  return spreads;
}

const SPREADS = buildSpreads();
const TOTAL_SPREADS = SPREADS.length;

type MagazineIssue = (typeof ISSUES)[number];

export default function Magazine() {
  // Persist current page across refreshes — read from localStorage on mount
  const [spread, setSpread] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = parseInt(localStorage.getItem('magazine-spread') || '0', 10);
      return isNaN(saved) ? 0 : Math.min(Math.max(saved, 0), TOTAL_SPREADS - 1);
    }
    return 0;
  });

  // Save current page whenever it changes
  useEffect(() => {
    localStorage.setItem('magazine-spread', String(spread));
  }, [spread]);
  const [previewEntry, setPreviewEntry] = useState<Entry | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    setSpread((current) => {
      if (target === current || target < 0 || target >= TOTAL_SPREADS) return current;
      window.scrollTo({ top: 0, behavior: 'auto' });
      return target;
    });
  }, []);

  const goPrev = useCallback(() => goTo(spread - 1), [goTo, spread]);
  const goNext = useCallback(() => goTo(spread + 1), [goTo, spread]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null;
      if (element && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable)) return;
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewEntry(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    const dy = event.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const currentSpread = SPREADS[spread];
  const isSinglePage = currentSpread.right === undefined;

  // Page range label for the controls
  let pageLabel: string;
  if (isSinglePage) {
    pageLabel = `Page ${(currentSpread.left! + 1)} of ${TOTAL_PAGES}`;
  } else {
    pageLabel = `Pages ${currentSpread.left! + 1}–${currentSpread.right! + 1} of ${TOTAL_PAGES}`;
  }

  // Persist view mode (spread vs grid)
  const [viewMode, setViewMode] = useState<'spread' | 'grid'>('spread');
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark">
      <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <header className="mb-5 sm:mb-7 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark flex items-center gap-3">
              <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
              The Works · 2026 Archive
            </p>
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/40 bg-theme-card/60 dark:bg-theme-card-dark/60 p-1 font-mono-tech text-xs">
              <button
                type="button"
                onClick={() => setViewMode('spread')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'spread'
                    ? 'bg-theme-action dark:bg-theme-action-dark text-white font-bold'
                    : 'text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary'
                }`}
              >
                📖 Magazine Spread
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-theme-action dark:bg-theme-action-dark text-white font-bold'
                    : 'text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary'
                }`}
              >
                ⊞ Studio Grid
              </button>
            </div>
          </div>

          <h1 className="font-black leading-[1.05] text-theme-primary dark:text-theme-secondary-dark mb-3 text-3xl sm:text-5xl font-display">
            A magazine of everything I build
          </h1>
          <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl font-light">
            {TOTAL_PAGES} issues, one unified catalogue — products, client work, retro consoles, systems engineering, and visual craft.
          </p>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap gap-2 pt-4">
            {['all', 'Products', 'Systems & Tools', 'Consoles & Retro', 'Art & Graphics'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`text-xs font-mono-tech px-3 py-1 rounded-full border transition-all ${
                  filter === cat
                    ? 'border-theme-action bg-theme-action/10 dark:bg-theme-action-dark/20 text-theme-action dark:text-theme-action-dark font-semibold'
                    : 'border-theme-accent/30 dark:border-theme-accent-dark/40 text-theme-secondary dark:text-theme-secondary-dark hover:border-theme-accent'
                }`}
              >
                {cat === 'all' ? '● Show All' : cat}
              </button>
            ))}
          </div>
        </header>

        {viewMode === 'spread' ? (
          <>
            <div className="mb-5 sm:mb-7">
              <FlipControls
                canPrev={spread > 0}
                canNext={spread < TOTAL_SPREADS - 1}
                onPrev={goPrev}
                onNext={goNext}
                centerLabel={pageLabel}
              />
            </div>

            {/* Book spread: two pages side by side, or single centered page */}
            <div className={`grid gap-4 sm:gap-6 ${isSinglePage ? 'grid-cols-1 max-w-[85%] mx-auto' : 'lg:grid-cols-2'}`}>
              {currentSpread.left !== undefined && (
                <MagazinePage issue={ISSUES[currentSpread.left]} pageIndex={currentSpread.left} onOpenImage={setPreviewEntry} />
              )}
              {currentSpread.right !== undefined && (
                <MagazinePage issue={ISSUES[currentSpread.right]} pageIndex={currentSpread.right} onOpenImage={setPreviewEntry} />
              )}
            </div>

            <p className="mt-5 text-center text-[11px] tracking-wide text-theme-secondary/70 dark:text-theme-secondary-dark/60 font-mono-tech">
              Tip: use the arrows, keyboard, or swipe to turn pages.
            </p>
          </>
        ) : (
          /* Studio Grid View: All issues and entries laid out in an expansive grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ISSUES.filter(issue => filter === 'all' || issue.kicker.toLowerCase().includes(filter.toLowerCase()) || issue.title.toLowerCase().includes(filter.toLowerCase())).flatMap((issue, issueIdx) =>
              issue.entries.map((entry) => (
                <article
                  key={entry.title}
                  className="rounded-2xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    {entry.cover && (
                      <div className="aspect-[16/9] overflow-hidden bg-theme-bg dark:bg-theme-bg-dark">
                        <img
                          src={entry.cover}
                          alt={entry.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                          onClick={() => setPreviewEntry(entry)}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-[10px] font-mono-tech uppercase tracking-wider text-theme-accent dark:text-theme-accent-dark mb-1">
                        Issue {String(issueIdx + 1).padStart(2, '0')} · {issue.kicker}
                      </p>
                      <h3 className="font-display text-xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">
                        {entry.title}
                      </h3>
                      <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                        {entry.blurb}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-theme-accent/15 dark:border-theme-accent-dark/20 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPreviewEntry(entry)}
                        className="text-xs font-semibold text-theme-action dark:text-theme-action-dark hover:underline font-mono-tech"
                      >
                        Inspect Spec →
                      </button>
                      {entry.github && (
                        <a
                          href={entry.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-theme-secondary hover:text-theme-primary dark:text-theme-secondary-dark dark:hover:text-theme-primary-dark transition-colors font-mono-tech"
                          title={`View ${entry.title} GitHub repository`}
                        >
                          <i className="fab fa-github text-sm" />
                          <span>Code ↗</span>
                        </a>
                      )}
                    </div>
                    {entry.tryNow && (
                      <a
                        href={entry.tryNow}
                        className="text-xs font-bold px-2.5 py-1 rounded bg-theme-action dark:bg-theme-action-dark text-white hover:opacity-90"
                      >
                        Run Live App
                      </a>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        <StudioFooter />
      </section>
      {previewEntry && <PreviewDialog entry={previewEntry} onClose={() => setPreviewEntry(null)} />}
    </div>
  );
}

function MagazinePage({ issue, pageIndex, onOpenImage }: { issue: MagazineIssue; pageIndex: number; onOpenImage: (entry: Entry) => void }) {
  return (
    <article className={`rounded-2xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden ${pageIndex === 0 ? 'border-t-4 border-t-theme-action dark:border-t-theme-action-dark' : 'border-t-4 border-t-theme-accent dark:border-t-theme-accent-dark'}`}>
      <div className="relative px-4 sm:px-6 pt-5 sm:pt-7 pb-4 border-b border-theme-accent/15 dark:border-theme-accent-dark">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark">
            {String(pageIndex + 1).padStart(2, '0')} · {issue.kicker}
          </p>
          <span className="flex-shrink-0 font-mono-tech text-xs tracking-widest text-theme-secondary/60 dark:text-theme-secondary-dark/60">
            {String(pageIndex + 1).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-theme-primary dark:text-theme-secondary-dark mb-2">{issue.title}</h2>
        <p className="text-xs sm:text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed">
          {issue.intro}
        </p>
      </div>

      <div className="px-3 sm:px-6 py-4 sm:py-5 space-y-2.5 sm:space-y-3">
        {issue.entries.map((entry) => (
          <MagazineEntry key={entry.title} entry={entry} onOpenImage={onOpenImage} />
        ))}
      </div>
    </article>
  );
}

function StudioFooter() {
  return (
    <footer className="mt-8 border-t border-theme-accent/20 dark:border-theme-accent-dark pt-6">
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-4">Studio · Visual Craft</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {ART_PLATFORMS.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`${platform.name} — ${platform.note}`}
            aria-label={`${platform.name}: ${platform.note}`}
            className="group border border-theme-accent/15 dark:border-theme-accent-dark px-3 py-3 hover:bg-theme-accent/10"
          >
            <div className="flex items-center gap-2 mb-2">
              {platform.logo ? (
                <span className="itchio-logo" aria-hidden="true" />
              ) : (
                <i className={`fab ${platform.icon} text-lg text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-action dark:group-hover:text-theme-action-dark`} aria-hidden="true" />
              )}
              <span className="text-xs font-semibold text-theme-primary dark:text-theme-secondary-dark">{platform.name}</span>
            </div>
            <span className="block text-[10px] leading-tight text-theme-secondary dark:text-theme-secondary-dark">{platform.note}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}

function PreviewDialog({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const images = entry.screenshots && entry.screenshots.length > 0
    ? entry.screenshots
    : entry.cover
    ? [entry.cover]
    : [];
  const [activeIdx, setActiveIdx] = useState(0);
  const currentImage = images[activeIdx] || entry.cover;
  const currentLabel = entry.screenshotLabels?.[activeIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-label={`${entry.title} preview`}>
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Close preview" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-auto border border-theme-accent/40 bg-theme-card p-3 dark:border-theme-accent-dark dark:bg-theme-card-dark sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.18em] text-theme-accent dark:text-theme-accent-dark">PROJECT PREVIEW</p>
            <h2 className="text-lg font-bold text-theme-primary dark:text-theme-secondary-dark">{entry.title}</h2>
          </div>
          <button type="button" onClick={onClose} className="border border-theme-accent/30 px-3 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark" aria-label="Close preview">
            Close
          </button>
        </div>

        {images.length > 1 && (
          <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-theme-accent/20 pb-3">
            {images.map((imgSrc, idx) => {
              const label = entry.screenshotLabels?.[idx] || `View ${idx + 1}`;
              const isActive = idx === activeIdx;
              return (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3 py-1 text-xs font-mono-tech rounded transition-all ${
                    isActive
                      ? 'bg-theme-action text-white font-bold'
                      : 'border border-theme-accent/40 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {currentImage ? (
          <div>
            <img
              src={currentImage}
              alt={`${entry.title} enlarged preview ${currentLabel ? `(${currentLabel})` : ''}`}
              className="max-h-[70vh] w-full object-contain bg-theme-bg dark:bg-theme-bg-dark"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = '/assets/projects/xmbwavemenu.webp';
              }}
            />
            {currentLabel && (
              <p className="mt-2 text-center text-xs font-mono-tech text-theme-secondary dark:text-theme-secondary-dark">
                {currentLabel}
              </p>
            )}
          </div>
        ) : (
          <div className="flex min-h-64 items-center justify-center border border-dashed border-theme-accent/30 bg-theme-bg p-8 text-center text-sm text-theme-secondary dark:border-theme-accent-dark dark:bg-theme-bg-dark dark:text-theme-secondary-dark">
            Screenshot coming soon for this project.
          </div>
        )}
      </div>
    </div>
  );
}
