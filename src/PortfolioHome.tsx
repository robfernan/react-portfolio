import React from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CAPABILITIES = [
  'Web',
  'Desktop',
  'Mobile',
  'WearOS',
  'Embedded',
  'Retro Consoles',
];

type Discipline = {
  title: string;
  blurb: string;
  tags: string[];
  to?: string;      // internal route (e.g. /works)
  href?: string;    // external link (e.g. ArtStation)
  featured?: boolean; // larger tile in the bento grid
};

const DISCIPLINES: Discipline[] = [
  {
    title: 'Software & Engines',
    blurb: 'Cross-platform apps and game tooling — from Love2D experiences to a custom OpenGL engine with Lua gameplay.',
    tags: ['Love2D / LÖVE', 'C++ / SFML', 'Go + Wails'],
    featured: true,
  },
  {
    title: 'Embedded Projects',
    blurb: 'Low-level and hardware work — microcontrollers, logic design, and baremetal systems programming.',
    tags: ['MSP430', 'Arduino', 'Logic Design'],
  },
  {
    title: 'Retro Consoles',
    blurb: 'Baremetal homebrew for the machines that stay exclusive — PS1, PS2, and PSP.',
    tags: ['PS1 MIPS', 'PS2 GS/VU1', 'PSP SDK'],
  },
  {
    title: 'Cross-Platform Tools',
    blurb: 'One codebase shipped to web, desktop, and mobile — from flight planning to document suites.',
    tags: ['AviationPro', 'PaperWorks Pro', 'XMB Launcher'],
    to: '/works',
  },
  {
    title: 'Art & Design',
    blurb: 'Automotive illustration, UI/UX, and print collateral — the design side of every build.',
    tags: ['Car Art', 'UI/UX', 'Print / Lookbook'],
    href: 'https://www.artstation.com/robfernan',
  },
  {
    title: 'Streaming & Content',
    blurb: 'Live coding, game dev, and car sketching on Twitch and YouTube as MungDaal321.',
    tags: ['Twitch', 'YouTube', 'Devlogs'],
    to: '/streaming',
  },
];

type Featured = {
  name: string;
  description: string;
  language?: string;
  updated?: string;
};

/* Static, curated "Now Building" — no live GitHub fetch for now. */
const NOW_BUILDING: Featured[] = [
  {
    name: 'Sony 2002 Recreation',
    description:
      'Recreating the iconic 2002 Sony website as a modern interactive experience — authentic layouts, motion, and detail.',
    language: 'TypeScript',
    updated: 'Recently',
  },
  {
    name: 'Love2D Xbox Launcher',
    description:
      'Xbox-inspired desktop launcher built with Love2D (LÖVE) — a custom frameless draggable window, gamepad support, and smooth XMB-style navigation.',
    language: 'Lua',
    updated: 'Updated 2 days ago',
  },
];

type MediaItem = {
  src: string;
  alt: string;
  caption: string;
  kind: 'image' | 'video';
};

const MEDIA: MediaItem[] = [
  { src: '/assets/home/car-art.jpg', alt: 'Automotive illustration', caption: 'Automotive Art', kind: 'image' },
  { src: '/assets/projects/xmbwavemenu.png', alt: 'XMB wave menu launcher', caption: 'XMB Launcher', kind: 'image' },
  { src: '/assets/home/sfmlavalamp.mp4', alt: 'Engine lava lamp demo', caption: 'Engine / SFML Demo', kind: 'video' },
  { src: '/assets/home/watchfacefish.png', alt: 'WearOS watch face', caption: 'WearOS Watch Face', kind: 'image' },
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
  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* ============================ HERO (SPLIT) ============================ */}
        <header className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center mb-16 sm:mb-24">
          {/* Left: identity + copy */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
              Portfolio · 2026
            </p>

            <h1 className="font-black leading-[1.05] text-theme-primary dark:text-theme-secondary-dark mb-5">
              Robert Fernandez
            </h1>

            <p className="text-base sm:text-lg text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-xl mb-7">
              Designer–Engineer building{' '}
              <span className="text-theme-primary dark:text-theme-secondary-dark font-medium">cross-platform tools</span>{' '}
              for web, desktop, mobile &amp; wearables — blending automotive art, aviation discipline, and UI/UX clarity.
            </p>

            {/* Capability chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CAPABILITIES.map((c) => (
                <span
                  key={c}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
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
            </div>
          </div>

          {/* Right: banner as a framed visual */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <figure className="deboss-frame rounded-xl overflow-hidden border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark shadow-lg">
              <img
                src="/assets/home/banner.png"
                alt="Robert Fernandez — Developer, Designer, Pilot"
                className="w-full h-auto object-cover block"
              />
            </figure>
          </div>
        </header>

        {/* ======================= NOW BUILDING (SPLIT ROW) ======================= */}
        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="In Progress" title="Now Building" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NOW_BUILDING.map((item) => (
              <a
                key={item.name}
                href="https://github.com/robfernan"
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-6 sm:p-7 hover-lift-premium"
              >
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
              </a>
            ))}
          </div>
        </section>

        {/* ========================= DISCIPLINES (BENTO) ========================= */}
        <section className="mb-16 sm:mb-24">
          <SectionHeading eyebrow="Capabilities" title="What I Do" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(0,auto)]">
            {DISCIPLINES.map((d) => {
              const inner = (
                <>
                  <h3 className={`font-bold mb-2 text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-primary-dark transition-colors ${d.featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    {d.title}
                  </h3>
                  <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
                    {d.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span key={t} className="text-[10px] font-medium px-2 py-1 rounded bg-theme-bg dark:bg-theme-card-dark border border-theme-accent/15 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              );
              const base = 'group block rounded-xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-5 sm:p-6 hover-lift-premium';
              // Featured tile spans 2 columns on md+ for a bento feel.
              const span = d.featured ? 'md:col-span-2' : '';
              if (d.to) {
                return (
                  <Link key={d.title} to={d.to} className={`${base} ${span}`}>
                    {inner}
                  </Link>
                );
              }
              if (d.href) {
                return (
                  <a key={d.title} href={d.href} target="_blank" rel="noopener noreferrer" className={`${base} ${span}`}>
                    {inner}
                  </a>
                );
              }
              return (
                <div key={d.title} className={`${base} ${span}`}>
                  {inner}
                </div>
              );
            })}

            {/* CTA tile */}
            <a
              href="https://github.com/robfernan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-xl border border-theme-accent/20 dark:border-theme-accent-dark bg-theme-action/10 dark:bg-theme-card-dark p-5 sm:p-6 hover-lift-premium md:col-span-3 lg:col-span-1"
            >
              <div>
                <h3 className="font-bold mb-2 text-theme-primary dark:text-theme-secondary-dark">Full archive</h3>
                <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed">
                  Every project, tutorial, and experiment — from PS1 MIPS to Love2D launchers.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-theme-accent dark:text-theme-secondary-dark">
                github.com/robfernan
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
                </svg>
              </span>
            </a>
          </div>
        </section>

        {/* ========================= MEDIA GALLERY (STACKED) ========================= */}
        <section className="mb-6">
          <SectionHeading eyebrow="Portfolio" title="Selected Work" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MEDIA.map((m) => (
              <figure
                key={m.src}
                className="deboss-frame rounded-xl overflow-hidden border border-theme-accent/15 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark"
              >
                <div className="aspect-video w-full">
                  {m.kind === 'video' ? (
                    <video className="w-full h-full object-cover" controls muted loop playsInline preload="metadata">
                      <source src={m.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img loading="lazy" decoding="async" src={m.src} alt={m.alt} className="w-full h-full object-cover" />
                  )}
                </div>
                <figcaption className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-theme-secondary dark:text-theme-secondary-dark">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ============================ FOOTER CTA ============================ */}
        <footer className="mt-12 pt-8 border-t border-theme-accent/15 dark:border-theme-accent-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-theme-secondary dark:text-theme-secondary-dark">
            Robert Fernandez · Developer · Designer · Pilot
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a href="https://github.com/robfernan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark transition-colors"><i className="fab fa-github text-lg" /></a>
            <a href="https://www.artstation.com/robfernan" target="_blank" rel="noopener noreferrer" aria-label="ArtStation" title="ArtStation" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark transition-colors"><i className="fab fa-artstation text-lg" /></a>
            <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noopener noreferrer" aria-label="Twitch" title="Twitch" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark transition-colors"><i className="fab fa-twitch text-lg" /></a>
          </div>
        </footer>
      </section>
    </div>
  );
}
