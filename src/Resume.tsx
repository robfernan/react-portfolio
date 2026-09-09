import React from 'react';
import { Link } from 'react-router-dom';

const skills = [
  ['Product engineering', 'React, TypeScript, JavaScript, Go, Wails, Capacitor'],
  ['Creative technology', 'Love2D, Lua, C++, SFML, OpenGL, GLSL'],
  ['Embedded and retro', 'ESP32-S3, Adafruit Qualia, PS1 MIPS, PSP SDK, PS2 tooling'],
  ['Design systems', 'UI/UX, responsive interfaces, automotive graphics, print and visual identity'],
];

const projects = [
  'AviationPro — multi-platform pilot utility suite for desktop, web, Android, and Wear OS.',
  'PaperWorks Pro — document automation and business tooling for invoices, resumes, and proposals.',
  'Hopeless Catch — published pixel-art fishing horror game built with Love2D and Lua.',
  'PSP Digital Comics — cross-platform CBZ reader inspired by the PSP Digital Comics experience.',
  'Qualia S3 Speedometer — reactive automotive instrument interface on a 480×480 round TFT.',
  'Client websites and business tools for Florida Window & Door Maintenance Inc., M&G Gutters, and local restaurants.',
];

export default function Resume() {
  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark">
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
        <header className="border-b border-theme-accent/25 dark:border-theme-accent-dark pb-8 mb-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-4">Résumé · 2026</p>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black leading-none text-theme-primary dark:text-theme-secondary-dark">Robert Fernandez</h1>
              <p className="mt-4 text-lg text-theme-secondary dark:text-theme-secondary-dark">Cross-platform software engineer · digital artist · pilot</p>
            </div>
            <Link to="/works" className="inline-flex border border-theme-accent/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark">View portfolio</Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <main>
            <section className="mb-12">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3">Profile</p>
              <p className="text-base sm:text-lg leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                Designer-engineer building practical, visually considered software across web, desktop, mobile, Wear OS, embedded displays, and retro consoles. My work combines aviation discipline, automotive visual design, and a preference for local-first tools that feel clear under pressure.
              </p>
            </section>

            <section className="mb-12">
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3">Selected Projects</p>
              <ul className="space-y-4">
                {projects.map((project) => <li key={project} className="border-l-2 border-theme-accent/40 pl-4 text-sm leading-relaxed text-theme-secondary dark:border-theme-accent-dark dark:text-theme-secondary-dark">{project}</li>)}
              </ul>
            </section>
          </main>

          <aside className="space-y-10">
            <section>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3">Education & Development</p>
              <p className="text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">Self-directed software, embedded, and console development supported by aviation training, production client work, open-source tutorials, and continuous project-based study.</p>
            </section>
            <section>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-4">Skills</p>
              <div className="space-y-4">
                {skills.map(([label, detail]) => <div key={label}><h2 className="text-sm font-bold text-theme-primary dark:text-theme-secondary-dark">{label}</h2><p className="mt-1 text-xs leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">{detail}</p></div>)}
              </div>
            </section>
            <section>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3">Platforms</p>
              <p className="text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">Web · Windows · Android · Wear OS · ESP32-S3 · PlayStation 1 · PSP · PlayStation 2</p>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
