import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Entry = {
  title: string;
  cover?: string;
  blurb: string;
  tech?: string[];
  status?: string;
  impact?: string;
  github?: string;
  link?: string;
  youtube?: string;
  tryNow?: string;
};

type Issue = {
  id: string;
  kicker: string;      // small label, e.g. "Software"
  title: string;       // issue name, e.g. "The Build"
  intro: string;       // editorial lede
  entries: Entry[];
};

const ISSUES: Issue[] = [
  {
    id: 'build',
    kicker: 'Software & Tools',
    title: 'The Build',
    intro:
      'Production software and cross-platform tools — the engineering side of the catalogue. Flight planning, document suites, launchers, and IDEs.',
    entries: [
      {
        title: 'AviationPro',
        cover: '/assets/projects/aviationpro.png',
        blurb:
          'Professional-grade flight planning suite for pilots — advanced route planning, CX-6 flight computer, weather analysis, performance calculations, navigation tools, and flight logs.',
        tech: ['React', 'TypeScript', 'Tailwind CSS'],
        status: 'Production',
        impact: 'Used by pilots for pre-flight operations',
        github: 'https://github.com/robfernan/AviationPro',
        tryNow: '/aviationpro',
      },
      {
        title: 'PaperWorks Pro',
        cover: '/assets/projects/paperworkspro.png',
        blurb:
          'All-in-one document creation suite combining invoice generator, resume builder, business card designer, and PDF editor for creators and entrepreneurs.',
        tech: ['React', 'TypeScript', 'shadcn-ui', 'Vite'],
        status: 'Production',
        impact: 'Complete web version • Desktop & Mobile coming soon',
        github: 'https://github.com/robfernan/paperworks-pro',
      },
      {
        title: 'XMB Wave Menu',
        cover: '/assets/projects/xmbwavemenu.png',
        blurb:
          'Cross-platform XMB launcher with animated wave effects and dynamic theming. One codebase deployed to web, desktop (NW.js), and native Android (Capacitor).',
        tech: ['HTML/CSS/JS', 'NW.js', 'Capacitor'],
        status: 'Complete',
        impact: 'Web • Desktop • Mobile — one codebase',
        youtube: 'https://youtu.be/fo8T0u4NwW8?si=zUnyPA0dVR7eGI4L',
      },
      {
        title: 'Restaurant Website',
        cover: '/assets/projects/restaurantmenu.png',
        blurb:
          'Service landing page for a South Florida restaurant — menu showcase, booking system, and customer engagement optimization.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Production',
        impact: 'Live production site',
      },
      {
        title: 'NeroGPUI',
        cover: '/assets/projects/nerogpui.png',
        blurb:
          'Lightning-fast IDE built with Rust and GPUI (the rendering engine behind Zed Editor). Focused on performance, responsiveness, and a minimalist interface.',
        tech: ['Rust', 'GPUI'],
        status: 'In Development',
        impact: 'Next-gen IDE • sub-millisecond rendering',
      },
      {
        title: 'NeroWails',
        cover: '/assets/projects/nerowails.png',
        blurb:
          'Cross-platform IDE bringing the Nero experience to Windows, macOS, and Linux — Go + Wails for native performance with feature parity across platforms.',
        tech: ['Go', 'Wails'],
        status: 'In Development',
        impact: 'Cross-platform • native performance',
      },
    ],
  },
  {
    id: 'play',
    kicker: 'Games & Experiments',
    title: 'Playground',
    intro:
      'Interactive experiences, retro-console homebrew, and the fun stuff — from published games to baremetal PS1 MIPS.',
    entries: [
      {
        title: 'Hopeless Catch',
        cover: '/assets/projects/hopelesscatch.png',
        blurb:
          'Atmospheric pixel-art fishing game with procedurally generated landscapes and a subtle narrative twist. A peaceful adventure that hides something deeper.',
        tech: ['Love2D / LÖVE', 'Lua', 'Pixel Art'],
        status: 'Published',
        impact: 'Winner of Fishing Horror Game Jam • Web + Desktop on itch.io',
        link: 'https://mungdaal321.itch.io/hopeless-catch',
        github: 'https://github.com/robfernan/Hopeless-Catch-Fishing-Horror-Game',
      },
      {
        title: 'Comic Reader (SFML)',
        cover: '/assets/projects/comicreader_sfml.png',
        blurb:
          'Fully functional comic reader with page navigation, zoom, and drag support — advanced graphics programming, UI/UX design, and file management in C++.',
        tech: ['C++', 'SFML', 'OpenGL'],
        status: 'Complete',
        impact: 'Desktop application • advanced graphics',
        github: 'https://github.com/robfernan/Comic_Reader',
      },
      {
        title: 'Music Player (Vinyl / Cassette / MiniDisc)',
        cover: '/assets/projects/musicplayer_react.png',
        blurb:
          'Retro-styled music player with multiple device themes. Cross-platform implementation showing design consistency across web, desktop, and mobile.',
        tech: ['React', 'TypeScript', 'NW.js', 'Capacitor'],
        status: 'In Development',
        impact: 'Cross-platform • retro UI design',
      },
      {
        title: 'PSP-Programming',
        cover: '/assets/projects/psp.png',
        blurb:
          'Modern PSP homebrew tutorials and step-by-step examples — a comprehensive guide for aspiring console developers covering graphics, audio, input, and cross-platform dev.',
        tech: ['C', 'SDL2', 'PSPSDK'],
        status: 'Open Source',
        impact: 'Open-source education • community resource',
        github: 'https://github.com/robfernan/PSP-Programming',
      },
      {
        title: 'PS1-Mips-Programming',
        cover: '/assets/projects/ps1project.png',
        blurb:
          'PlayStation 1 MIPS assembly programming guides and baremetal demos — an educational resource for low-level systems programming and retro console development.',
        tech: ['MIPS Assembly', 'C', 'Baremetal'],
        status: 'Open Source',
        impact: 'Rare skill • assembly programming',
        github: 'https://github.com/robfernan/PS1-Mips-Programming',
      },
    ],
  },
];

type ArtPlatform = { name: string; icon?: string; logo?: string; href: string; note: string };

const ART_PLATFORMS: ArtPlatform[] = [
  { name: 'Pinterest', icon: 'fa-pinterest', href: 'https://www.pinterest.com/fernandez7466/_profile/', note: 'Moodboards & inspiration' },
  { name: 'ArtStation', icon: 'fa-artstation', href: 'https://www.artstation.com/robfernan', note: '3D & digital art' },
  { name: 'Behance', icon: 'fa-behance', href: 'https://www.behance.net/robertfern5088', note: 'UI/UX design' },
  { name: 'Itch.io', logo: '/images/itchio-textless-black.svg', href: 'https://mungdaal321.itch.io/', note: 'Game assets & demos' },
  { name: 'DeviantArt', icon: 'fa-deviantart', href: 'https://www.deviantart.com/rober321', note: 'Sketches & concepts' },
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
      <h2 className="font-bold text-theme-primary dark:text-theme-secondary-dark">{title}</h2>
    </div>
  );
}

function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="group rounded-xl border border-theme-accent/15 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover-lift-premium">
      {entry.cover && (
        <div className="aspect-video w-full overflow-hidden bg-theme-bg dark:bg-theme-bg-dark">
          <img
            loading="lazy"
            decoding="async"
            src={entry.cover}
            alt={entry.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-primary-dark transition-colors">
            {entry.title}
          </h3>
          {entry.status && (
            <span className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">
              {entry.status}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed mb-4">
          {entry.blurb}
        </p>

        {entry.impact && (
          <p className="text-xs font-medium text-theme-accent dark:text-theme-secondary-dark mb-3">{entry.impact}</p>
        )}

        {entry.tech && entry.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {entry.tech.map((t) => (
              <span key={t} className="text-[10px] font-medium px-2 py-1 rounded bg-theme-bg dark:bg-theme-card-dark border border-theme-accent/15 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">
                {t}
              </span>
            ))}
          </div>
        )}

        {(entry.tryNow || entry.link || entry.github || entry.youtube) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {entry.tryNow && (
              <Link to={entry.tryNow} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme-action dark:bg-theme-action-dark text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                Try it
              </Link>
            )}
            {entry.link && (
              <a href={entry.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-xs font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                Visit site
              </a>
            )}
            {entry.github && (
              <a href={entry.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-xs font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                <i className="fab fa-github" /> Code
              </a>
            )}
            {entry.youtube && (
              <a href={entry.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-xs font-medium text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                <i className="fab fa-youtube" /> Watch
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Catalogue() {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        {/* Masthead */}
        <header className="mb-10 sm:mb-14 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-8">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 flex items-center gap-3">
            <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
            Catalogue · 2026
          </p>
          <h1 className="font-black leading-[1.05] text-theme-primary dark:text-theme-secondary-dark mb-4">
            The Work
          </h1>
          <p className="text-base sm:text-lg text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl">
            A single catalogue of everything I build — software, games, retro consoles, and design.
            Browse by issue below.
          </p>

          {/* Filter tabs */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[{ id: 'all', label: 'All' }, ...ISSUES.map((i) => ({ id: i.id, label: i.title }))].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  filter === f.id
                    ? 'bg-theme-action dark:bg-theme-action-dark text-white'
                    : 'border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark hover:bg-theme-accent/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        {/* Issues */}
        <div className="space-y-16 sm:space-y-24">
          {ISSUES.filter((i) => filter === 'all' || i.id === filter).map((issue, idx) => (
            <section key={issue.id}>
              <SectionHeading eyebrow={`${String(idx + 1).padStart(2, '0')} · ${issue.kicker}`} title={issue.title} />
              <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl mb-8">
                {issue.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {issue.entries.map((e) => (
                  <EntryCard key={e.title} entry={e} />
                ))}
              </div>
            </section>
          ))}

          {/* Art & Design */}
          {(filter === 'all' || filter === 'art') && (
            <section id="art">
              <SectionHeading eyebrow={`${String(ISSUES.length + 1).padStart(2, '0')} · Visual Craft`} title="Studio" />
              <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl mb-8">
                The design side of every build — automotive illustration, UI/UX, and print. Full galleries live on my art platforms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {ART_PLATFORMS.map((a) => (
                  <a
                    key={a.name}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-theme-accent/15 dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-5 hover-lift-premium"
                  >
                    {a.logo ? (
                      <img src={a.logo} alt={`${a.name} logo`} className="h-6 w-auto mb-2 dark:invert" />
                    ) : a.icon ? (
                      <i aria-hidden="true" className={`fab ${a.icon} text-xl mb-2 block`} />
                    ) : null}
                    <h3 className="font-bold text-theme-primary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-primary-dark transition-colors mb-1">
                      {a.name}
                    </h3>
                    <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark">{a.note}</p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
