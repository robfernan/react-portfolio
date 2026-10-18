import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextScramble from '@/components/ui/TextScramble';
import LiveTelemetryBadge from '@/components/ui/LiveTelemetryBadge';

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
    name: 'Project Mercury',
    description:
      'Open-source, zero-trust real-time chat platform in Flutter. Fully interactive cross-platform UI shell with collaborative Wacom vector canvas, audio rooms, and custom themes.',
    language: 'Flutter · Dart · Zero-Trust',
    updated: 'Active Build',
    image: '/assets/projects/mercury_screenshot.png',
    href: 'https://github.com/robfernan/Mercury',
  },
  {
    name: 'PSP Digital Comics Reborn',
    description:
      'Faithful cross-platform recreation of the iconic PSP Digital Comics reader for CBZ archives with smooth page turns, authentic navigation, and responsive scaling.',
    language: 'React · TypeScript · Vite',
    updated: 'Active Build',
    image: '/assets/projects/psp_digital_comics.gif',
    href: 'https://github.com/robfernan/psp-comics-reborn',
  },
  {
    name: 'Love2D Xbox Launcher',
    description:
      'Xbox-inspired desktop launcher built with Love2D (LÖVE) — a custom frameless draggable window, gamepad support, and smooth XMB-style navigation.',
    language: 'Lua · Love2D',
    updated: 'Active Build',
    image: '/assets/projects/love2d_xboxlauncher.webp',
    href: 'https://github.com/robfernan/Love2D_XboxLauncher',
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
      <h2 className="font-bold text-theme-primary dark:text-theme-secondary-dark font-display text-3xl sm:text-4xl">
        <TextScramble text={title} />
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

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        {/* ============================ HERO ============================ */}
        <section className="mb-16 sm:mb-24">
          {/* Top Live Telemetry bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <LiveTelemetryBadge />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-theme-secondary dark:text-theme-secondary-dark">
              <span>LAT 28.5383° N</span>
              <span className="opacity-40">/</span>
              <span>LON 81.3792° W</span>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-theme-accent/25 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark shadow-xl ring-1 ring-black/5">
            <img
              src="/assets/home/banner.webp"
              alt="Robert Fernandez — Developer, Designer, Pilot"
              fetchPriority="high"
              decoding="async"
              width={1280}
              height={320}
              className="block h-auto w-full transition-transform duration-700 hover:scale-[1.01]"
            />
          </figure>

          <div className="grid grid-cols-1 gap-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-10 pt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark flex items-center gap-3 font-mono-tech">
                  <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
                  Cross-Platform Engineer · Digital Artist · Pilot
                </p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Roles &amp; Projects
                </span>
              </div>

              <h1 className="mb-5 text-4xl font-black leading-tight text-theme-primary dark:text-theme-secondary-dark sm:text-6xl font-display tracking-tight">
                <TextScramble text="Robert Fernandez" />
              </h1>

              <p className="max-w-3xl text-lg leading-relaxed text-theme-secondary dark:text-theme-secondary-dark sm:text-2xl font-light">
                Software engineer and digital artist crafting{' '}
                <span className="text-theme-primary dark:text-theme-primary-dark font-medium underline decoration-theme-accent/40 underline-offset-4">cross-platform tools</span>{' '}
                for web, desktop, mobile, Wear OS, embedded displays, and retro consoles — blending aviation precision with editorial design.
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
                Resume
              </Link>
              <div className="basis-full flex flex-wrap gap-2 pt-2 lg:justify-end">
                {CAPABILITIES.map((c) => (
                  <span key={c} className="text-xs font-medium px-3 py-1.5 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* At-a-Glance Credibility Metrics — Clickable to Evidence */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
            <Link
              to="/aviation"
              className="group border-l-2 border-theme-accent dark:border-theme-accent-dark pl-4 hover:border-theme-action transition-colors block"
              title="Explore AviationPro EFB suite"
            >
              <span className="block text-2xl sm:text-3xl font-black text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-action transition-colors">129+</span>
              <span className="text-xs text-theme-secondary dark:text-theme-secondary-dark font-medium flex items-center gap-1">
                Flight Hours · Student Pilot
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
              </span>
            </Link>
            <Link
              to="/works"
              className="group border-l-2 border-theme-accent dark:border-theme-accent-dark pl-4 hover:border-theme-action transition-colors block"
              title="View commercial & independent studio works"
            >
              <span className="block text-2xl sm:text-3xl font-black text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-action transition-colors">5+ Yrs</span>
              <span className="text-xs text-theme-secondary dark:text-theme-secondary-dark font-medium flex items-center gap-1">
                Commercial & Studio Work
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
              </span>
            </Link>
            <Link
              to="/resume"
              className="group border-l-2 border-theme-accent dark:border-theme-accent-dark pl-4 hover:border-theme-action transition-colors block"
              title="View certifications on Resume"
            >
              <span className="block text-2xl sm:text-3xl font-black text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-action transition-colors">4x</span>
              <span className="text-xs text-theme-secondary dark:text-theme-secondary-dark font-medium flex items-center gap-1">
                Adobe Certified Pro
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">→</span>
              </span>
            </Link>
            <a
              href="#now-building"
              className="group border-l-2 border-theme-accent dark:border-theme-accent-dark pl-4 hover:border-theme-action transition-colors block"
              title="Jump to active multi-platform projects"
            >
              <span className="block text-2xl sm:text-3xl font-black text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-action transition-colors">4</span>
              <span className="text-xs text-theme-secondary dark:text-theme-secondary-dark font-medium flex items-center gap-1">
                Web · Wails · Capacitor · Flutter
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">↓</span>
              </span>
            </a>
          </div>
        </section>

        {/* ======================= DISCIPLINES & PILLARS ======================= */}
        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="Disciplines &amp; Craft" title="The Three Pillars" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-theme-accent/25 dark:border-theme-accent-dark/40 bg-theme-card dark:bg-theme-card-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg mb-5 border border-purple-500/20">
                🎨
              </div>
              <h3 className="font-display text-xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">Digital Art &amp; Design</h3>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                4x Adobe Certified Professional specializing in brand systems, vector art, UI architecture, Figcraft/Figma design tokens, and tactile editorial aesthetics.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">Figcraft / Figma</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">Illustrator</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">UI/UX Systems</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-theme-accent/25 dark:border-theme-accent-dark/40 bg-theme-card dark:bg-theme-card-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg mb-5 border border-blue-500/20">
                💻
              </div>
              <h3 className="font-display text-xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">Systems &amp; Native Code</h3>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                Engineering cross-platform runtimes across React, TypeScript, Flutter, Go, C++, Lua, and custom homebrew retro engines (Sony PSP, Microsoft Xbox).
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">React / TypeScript</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">Flutter / Dart</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">C++ / Love2D</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-theme-accent/25 dark:border-theme-accent-dark/40 bg-theme-card dark:bg-theme-card-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-5 border border-emerald-500/20">
                ✈️
              </div>
              <h3 className="font-display text-xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">Aviation &amp; Telemetry</h3>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                Student Pilot bringing cockpit discipline to flight planning software, live NOAA METAR weather decoding, runway crosswind trigonometry, and weight &amp; balance.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">AviationPro EFB</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">NOAA Telemetry</span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-theme-bg dark:bg-theme-bg-dark text-theme-secondary dark:text-theme-secondary-dark">129+ Flight Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= NOW BUILDING ======================= */}
        <section id="now-building" className="mb-8 sm:mb-12 scroll-mt-8">
          <SectionHeading eyebrow="Active Work" title="Now Building" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {NOW_BUILDING.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-left hover:border-theme-accent/50 transition-colors"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => setPreview(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPreview(item); }}
                >
                  <div className="aspect-[16/9] overflow-hidden bg-theme-bg dark:bg-theme-bg-dark">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied) return;
                        img.dataset.fallbackApplied = '1';
                        img.src = '/assets/projects/xmbwavemenu.webp';
                      }}
                    />
                  </div>
                  <div className="p-6 sm:p-8 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-secondary-dark">In Progress</span>
                      {item.updated && (
                        <span className="text-[10px] font-medium uppercase tracking-wider text-theme-secondary/70 dark:text-theme-secondary-dark">{item.updated}</span>
                      )}
                    </div>
                    <h3 className="font-bold mb-3 text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-primary-dark transition-colors font-display text-xl sm:text-2xl">
                      <TextScramble text={item.name} />
                    </h3>
                    <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.language && (
                      <span className="inline-flex items-center gap-2 text-xs text-theme-secondary dark:text-theme-secondary-dark">
                        <span className="w-2.5 h-2.5 rounded-full bg-theme-accent dark:bg-theme-accent-dark" />
                        {item.language}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between border-t border-theme-accent/10 dark:border-theme-accent-dark/20 mt-auto">
                  <button
                    type="button"
                    onClick={() => setPreview(item)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-accent-dark hover:underline"
                  >
                    Quick preview
                  </button>
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-theme-secondary hover:text-theme-primary dark:text-theme-secondary-dark dark:hover:text-theme-primary-dark transition-colors"
                      title={`Open ${item.name} on GitHub`}
                    >
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                      </svg>
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-theme-accent/20 dark:border-theme-accent-dark pt-6">
          <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark">More work, watch faces, art, and systems live in the archive.</p>
          <Link to="/works" className="text-xs font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-secondary-dark">Open Works archive</Link>
        </div>

      </section>
      {preview && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 p-4 w-full h-full max-w-none max-h-none bg-black/75 backdrop-blur-sm flex items-center justify-center border-0 text-inherit"
          aria-modal="true"
          aria-label={`${preview.name} preview`}
          onKeyDown={(e) => { if (e.key === 'Escape') setPreview(null); }}
        >
          <button type="button" className="absolute inset-0 cursor-default bg-transparent border-0" aria-label="Close preview" onClick={() => setPreview(null)} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-auto border border-theme-accent/40 bg-theme-card p-4 dark:border-theme-accent-dark dark:bg-theme-card-dark sm:p-6 rounded-xl shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono-tech text-[10px] tracking-[0.2em] text-theme-accent dark:text-theme-accent-dark">NOW BUILDING</p>
                <h2 className="text-xl font-bold text-theme-primary dark:text-theme-secondary-dark">{preview.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="border border-theme-accent/30 px-3 py-1.5 text-xs font-semibold rounded text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors"
              >
                Close (Esc)
              </button>
            </div>
            <img src={preview.image} alt={`${preview.name} full preview`} className="max-h-[68vh] w-full object-contain rounded bg-theme-bg dark:bg-theme-bg-dark" />
            <p className="mt-4 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">{preview.description}</p>
            {preview.href?.startsWith('http') && (
              <a href={preview.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 border border-theme-accent/40 rounded px-4 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                View repository →
              </a>
            )}
            {(preview.href === '/aviation' || preview.href === '/aviationpro') && (
              <Link to="/aviation" onClick={() => setPreview(null)} className="mt-4 inline-flex items-center gap-2 border border-theme-accent/40 rounded px-4 py-2 text-xs font-semibold text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                Launch tool →
              </Link>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}
