import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ISSUES, ART_PLATFORMS } from './data';
import { FlipControls, MagazineEntry } from './MagazineUI';

/* ------------------------------------------------------------------ */
/*  The Works — a two-page magazine you flip through.                  */
/*                                                                     */
/*  Page 1 · "The Build"   (Software & Tools)                          */
/*  Page 2 · "Playground"  (Games & Experiments + Studio)              */
/*                                                                     */
/*  Flip with the arrows, ← / → keys, or swipe.                        */
/* ------------------------------------------------------------------ */

const TOTAL_PAGES = 2;

export default function Magazine() {
  const [page, setPage] = useState(0); // 0-indexed: 0 = The Build, 1 = Playground
  const [flipDir, setFlipDir] = useState<1 | -1>(1);
  const [animKey, setAnimKey] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback((target: number) => {
    setPage((current) => {
      if (target === current || target < 0 || target >= TOTAL_PAGES) return current;
      setFlipDir(target > current ? 1 : -1);
      setAnimKey((k) => k + 1); // retrigger the flip animation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return target;
    });
  }, []);

  const goPrev = useCallback(() => goTo(page - 1), [goTo, page]);
  const goNext = useCallback(() => goTo(page + 1), [goTo, page]);

  // Keyboard navigation (arrow keys) — only when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Swipe navigation.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // Require a mostly-horizontal, decisive swipe.
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const issue = ISSUES[page];

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <section className="max-w-5xl mx-auto px-4 py-8 sm:py-12" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {/* Masthead */}
        <header className="mb-6 sm:mb-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-5">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
            The Works · 2026
          </p>
          <h1 className="font-black leading-[1.05] text-theme-primary dark:text-theme-secondary-dark mb-3">
            A magazine of everything I build
          </h1>
          <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl">
            Two pages, one catalogue — software and games. Flip through it like a real magazine: use the arrows, your keyboard (← →), or swipe.
          </p>
        </header>

        {/* Navigation */}
        <div className="mb-6 sm:mb-8">
          <FlipControls
            canPrev={page > 0}
            canNext={page < TOTAL_PAGES - 1}
            onPrev={goPrev}
            onNext={goNext}
            centerLabel={`Page ${page + 1} of ${TOTAL_PAGES}`}
          />
        </div>

        {/* The flipping page */}
        <div className="magazine-stage">
          <article
            key={animKey}
            className="magazine-flip-in rounded-2xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden"
            style={{ ['--flip-dir' as string]: flipDir }}
          >
            {/* Page header — kicker + editorial lede (no big issue title) */}
            <div className="relative px-5 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-theme-accent/15 dark:border-theme-accent-dark">
              <div className="flex items-center justify-between gap-4 mb-3">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark">
                  {String(page + 1).padStart(2, '0')} · {issue.kicker}
                </p>
                {/* Page number, like a real magazine folio */}
                <span className="flex-shrink-0 font-mono-tech text-xs tracking-widest text-theme-secondary/60 dark:text-theme-secondary-dark/60">
                  {String(page + 1).padStart(2, '0')} / {String(TOTAL_PAGES).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-3xl">
                {issue.intro}
              </p>
            </div>

            {/* Entries */}
            <div className="px-4 sm:px-8 py-5 sm:py-7 space-y-3 sm:space-y-4">
              {issue.entries.map((entry) => (
                <MagazineEntry key={entry.title} entry={entry} />
              ))}
            </div>

            {/* Studio / art platforms — icon row at the bottom of every page */}
            <div className="px-4 sm:px-8 pb-6 sm:pb-7">
              <div className="rounded-xl border border-theme-accent/15 dark:border-theme-accent-dark bg-theme-bg dark:bg-theme-bg-dark px-3 py-3.5">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 px-1">
                  Studio · Visual Craft
                </p>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:justify-around">
                  {ART_PLATFORMS.map((a) => (
                    <a
                      key={a.name}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${a.name} — ${a.note}`}
                      aria-label={`${a.name}: ${a.note}`}
                      className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-theme-accent/10 transition-colors"
                    >
                      <i className={`fab ${a.icon} text-xl sm:text-2xl text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-action dark:group-hover:text-theme-action-dark transition-colors`} />
                      <span className="hidden md:block">
                        <span className="block text-xs font-semibold leading-tight text-theme-primary dark:text-theme-secondary-dark">{a.name}</span>
                        <span className="block text-[10px] leading-tight text-theme-secondary/80 dark:text-theme-secondary-dark/70">{a.note}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Hint */}
        <p className="mt-5 text-center text-[11px] tracking-wide text-theme-secondary/70 dark:text-theme-secondary-dark/60">
          Tip: use ← → keys or swipe to flip pages.
        </p>
      </section>
    </div>
  );
}
