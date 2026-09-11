import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Shared magazine chrome: flip controls, page indicator, entry card. */
/* ------------------------------------------------------------------ */

type FlipControlsProps = {
  canPrev?: boolean;
  canNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  /** Optional label shown in the center (e.g. "Page 1 of 2"). */
  centerLabel?: string;
};

/**
 * The magazine navigation bar: prev / next arrows with a page indicator.
 * Arrows are large, touch-friendly targets and sit at the edges so they read
 * like the corners of a real magazine spread.
 */
export function FlipControls({ canPrev = false, canNext = false, onPrev, onNext, centerLabel }: FlipControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3 select-none">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous page"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${
          canPrev
            ? 'border-theme-accent/40 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-action hover:text-white dark:hover:bg-theme-action-dark'
            : 'border-transparent text-theme-secondary/40 dark:text-theme-secondary-dark/40 cursor-not-allowed'
        }`}
      >
        <i className="fas fa-arrow-left" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {centerLabel && (
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-theme-secondary dark:text-theme-secondary-dark">
          <span className="w-6 h-px bg-theme-accent/40 dark:bg-theme-accent-dark" />
          {centerLabel}
          <span className="w-6 h-px bg-theme-accent/40 dark:bg-theme-accent-dark" />
        </div>
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next page"
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${
          canNext
            ? 'border-theme-accent/40 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-action hover:text-white dark:hover:bg-theme-action-dark'
            : 'border-transparent text-theme-secondary/40 dark:text-theme-secondary-dark/40 cursor-not-allowed'
        }`}
      >
        <span className="hidden sm:inline">Next</span>
        <i className="fas fa-arrow-right" />
      </button>
    </div>
  );
}

/** A single project rendered as a compact magazine entry (used on both pages). */
export function MagazineEntry({ entry, onOpenImage }: { entry: import('./data').Entry; onOpenImage?: (entry: import('./data').Entry) => void }) {
  return (
    <article className="group flex gap-3 rounded-xl border border-theme-accent/15 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-3 hover-lift-premium">
      {/* Cover thumbnail */}
      <button
        type="button"
        onClick={() => onOpenImage?.(entry)}
        className="relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden bg-theme-bg dark:bg-theme-bg-dark deboss-frame text-left focus-ring"
        aria-label={`Open larger preview for ${entry.title}`}
      >
        {entry.cover ? (
          <img
            loading="lazy"
            decoding="async"
            src={entry.cover}
            alt={entry.title}
            className="w-full h-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = '/assets/projects/xmbwavemenu.webp';
            }}
          />
        ) : (
          <span className="flex h-full w-full items-end p-2 text-[10px] font-semibold uppercase tracking-wider text-theme-secondary dark:text-theme-secondary-dark">
            {entry.title}
          </span>
        )}
        <span className="absolute right-1.5 bottom-1.5 rounded bg-black/60 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
          View
        </span>
      </button>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            {entry.format && (
              <p className="font-mono-tech text-[9px] tracking-[0.15em] text-theme-accent dark:text-theme-accent-dark mb-1">{entry.format}</p>
            )}
            <h3 className="text-sm sm:text-base font-bold leading-tight text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-primary-dark">
              {entry.title}
            </h3>
          </div>
          {entry.status && (
            <span className="flex-shrink-0 text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">
              {entry.status}
            </span>
          )}
        </div>

        <p className="text-[11px] sm:text-xs lg:text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed line-clamp-3 mb-2">
          {entry.blurb}
        </p>

        {entry.impact && (
          <p className="text-[11px] font-medium text-theme-accent dark:text-theme-secondary-dark mb-2">{entry.impact}</p>
        )}

        {(entry.tryNow || entry.link || entry.github || entry.youtube) && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {entry.tryNow && (
              <Link to={entry.tryNow} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-theme-action dark:bg-theme-action-dark text-white text-[11px] font-semibold hover:opacity-90 transition-opacity">
                Try it
              </Link>
            )}
            {entry.link && (
              <a href={entry.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-theme-accent/40 dark:border-theme-accent-dark text-[11px] font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                Visit
              </a>
            )}
            {entry.github && (
              <a href={entry.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-theme-accent/40 dark:border-theme-accent-dark text-[11px] font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                <i className="fab fa-github" /> Code
              </a>
            )}
            {entry.youtube && (
              <a href={entry.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-theme-accent/40 dark:border-theme-accent-dark text-[11px] font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                <i className="fab fa-youtube" /> Watch
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
