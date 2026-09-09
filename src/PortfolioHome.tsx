import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  'Product software',
  'Cross-platform UI',
  'Games & engines',
  'Embedded displays',
  'Aviation tools',
  'Retro systems',
  'Wear OS',
  'Local-first',
];

type Featured = {
  name: string;
  description: string;
  language?: string;
  updated?: string;
  image: string;
  href?: string;
};

/* Static, curated "Now Building" — no live GitHub fetch for now. */
const NOW_BUILDING: Featured[] = [
  {
    name: 'Sony 2002 Recreation',
    description:
      'Recreating the iconic 2002 Sony website as a modern interactive experience — authentic layouts, motion, and detail.',
    language: 'TypeScript',
    updated: 'Recently',
    image: 'https://raw.githubusercontent.com/robfernan/sony2002-recreationsite/main/screenshot.png',
    href: 'https://github.com/robfernan/sony2002-recreationsite',
  },
  {
    name: 'Love2D Xbox Launcher',
    description:
      'Xbox-inspired desktop launcher built with Love2D (LÖVE) — a custom frameless draggable window, gamepad support, and smooth XMB-style navigation.',
    language: 'Lua',
    updated: 'Active build',
    image: '/assets/projects/love2d_xboxlauncher.png',
    href: 'https://github.com/robfernan/Love2D_XboxLauncher',
  },
  {
    name: 'Dreamcast PS3 Theme → HTML5 XMB',
    description:
      'A custom cross-platform web interface recreated from an original SEGA Dreamcast PS3 theme, with authentic XMB layouts, gamepad support, and menu navigation.',
    language: 'HTML5 · CSS · JavaScript',
    updated: 'Video feature',
    image: 'https://i.ytimg.com/an_webp/YagOy0VBs-Q/mqdefault_6s.webp?du=3000&sqp=CMDVg9UG&rs=AOn4CLAax-CtdHLIfjGOFtZGHDlNbI8XTg',
    href: 'https://www.youtube.com/watch?v=YagOy0VBs-Q',
  },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3">
        {eyebrow}
      </p>
      <h2 className="font-bold text-theme-primary dark:text-theme-secondary-dark">
        {title}
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioHome() {
  const [preview, setPreview] = useState<Featured | null>(null);

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">

      <section className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 sm:py-20 lg:px-10">
        {/* ============================ HERO ============================ */}
        <section className="mb-16 sm:mb-24">
          <figure className="overflow-hidden border border-theme-accent/25 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark shadow-lg">
            <img
              src="/assets/home/banner.png"
              alt="Robert Fernandez — Developer, Designer, Pilot"
              className="block h-auto w-full"
            />
          </figure>

          <div className="grid grid-cols-1 gap-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-10 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
              Cross-Platform Engineer · Digital Artist · Pilot
            </p>

            <h1 className="mb-5 text-4xl font-black leading-none text-theme-primary dark:text-theme-secondary-dark sm:text-6xl">
              Robert Fernandez
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed text-theme-secondary dark:text-theme-secondary-dark sm:text-2xl">
              Software engineer and digital artist building{' '}
              <span className="text-theme-primary dark:text-theme-secondary-dark font-medium">cross-platform tools</span>{' '}
              for web, desktop, mobile, Wear OS, embedded displays, and retro consoles — blending aviation discipline with design-first interfaces.
            </p>

            </div>

            <div className="flex flex-wrap content-start gap-3 lg:justify-end">
              <Link
                to="/works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-theme-action dark:bg-theme-action-dark text-white font-semibold hover:opacity-90 transition-opacity"
              >
                See the work
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://github.com/robfernan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 dark:hover:bg-theme-card-dark transition-colors font-medium"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
                GitHub
              </a>
              <Link to="/resume" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 font-medium">
                Résumé
              </Link>
              <div className="basis-full flex flex-wrap gap-2 pt-2 lg:justify-end">
                {CAPABILITIES.map((c) => (
                  <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================= NOW BUILDING ======================= */}
        <section className="mb-8 sm:mb-12">
          <SectionHeading eyebrow="Active Work" title="Now Building" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {NOW_BUILDING.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setPreview(item)}
                className="group overflow-hidden rounded-xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-left"
              >
                <div className="aspect-[16/9] overflow-hidden bg-theme-bg dark:bg-theme-bg-dark">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-secondary-dark">In Progress</span>
                  {item.updated && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-theme-secondary/70 dark:text-theme-secondary-dark">{item.updated}</span>
                  )}
                </div>
                <h3 className="font-bold mb-3 text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-primary-dark transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-5">
                  {item.description}
                </p>
                {item.language && (
                  <span className="inline-flex items-center gap-2 text-xs text-theme-secondary dark:text-theme-secondary-dark">
                    <span className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-theme-accent-dark" />
                    {item.language}
                  </span>
                )}
                <span className="mt-5 block text-[10px] font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-accent-dark">Open full preview</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-theme-accent/20 dark:border-theme-accent-dark pt-6">
          <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark">More work, watch faces, art, and systems live in the archive.</p>
          <Link to="/works" className="text-xs font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-secondary-dark">Open Works archive</Link>
        </div>

      </section>
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-label={`${preview.name} preview`}>
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Close preview" onClick={() => setPreview(null)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-auto border border-theme-accent/40 bg-theme-card p-4 dark:border-theme-accent-dark dark:bg-theme-card-dark sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div><p className="font-mono-tech text-[10px] tracking-[0.2em] text-theme-accent dark:text-theme-accent-dark">NOW BUILDING</p><h2 className="text-xl font-bold text-theme-primary dark:text-theme-secondary-dark">{preview.name}</h2></div>
              <button type="button" onClick={() => setPreview(null)} className="border border-theme-accent/30 px-3 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark">Close</button>
            </div>
            <img src={preview.image} alt={`${preview.name} full preview`} className="max-h-[68vh] w-full object-contain bg-theme-bg dark:bg-theme-bg-dark" />
            <p className="mt-4 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">{preview.description}</p>
            {preview.href?.startsWith('http') && <a href={preview.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex border border-theme-accent/30 px-4 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark">Open project</a>}
            {preview.href === '/aviationpro' && <Link to={preview.href} onClick={() => setPreview(null)} className="mt-4 inline-flex border border-theme-accent/30 px-4 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark">Open project</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
