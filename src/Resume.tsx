import React from 'react';
import { Link } from 'react-router-dom';

type SkillGroup = { label: string; items: string[] };

const skillGroups: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    items: ['Go (Wails)', 'C++ (SDL, SFML)', 'Python (CircuitPython)', 'C#', 'Lua (LÖVE2D)', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Tailwind CSS', 'HTML5', 'CSS3', 'PHP'],
  },
  {
    label: 'Web & Development',
    items: ['Responsive Layouts', 'Content Management', 'Cross-Platform Apps', 'CI/CD Pipelines', 'GitHub Actions'],
  },
  {
    label: 'Desktop & Mobile',
    items: ['Wails (Desktop)', 'NW.js (Desktop)', 'Capacitor (Android)', 'Samsung Watch Face Studio', 'Android Studio'],
  },
  {
    label: 'Design & Creative',
    items: ['Adobe Creative Cloud (Photoshop, Illustrator, Animate, Dreamweaver, Acrobat)', 'UI/UX Design', 'Brand Identity', 'Canva', 'Aesprite', 'Inkscape', 'GIMP'],
  },
  {
    label: 'SEO & Analytics',
    items: ['Google Search Console', 'Keyword Research', 'Meta Title & Description Optimization', 'On-Page SEO'],
  },
  {
    label: 'Tools & Platforms',
    items: ['Git / GitHub', 'Visual Studio Code', 'Visual Studio Community', 'Linux', 'Windows', 'macOS'],
  },
];

type Role = { company: string; title: string; period: string; tag?: string; bullets: string[] };

const roles: Role[] = [
  {
    company: 'Florida Window & Door Maintenance, Inc.',
    title: 'Software Developer & Designer',
    period: 'Jan 2021 – Present',
    tag: 'Primary role',
    bullets: [
      'Designed company branding, logos, marketing materials, and digital assets using Adobe Creative Cloud and Canva.',
      'Built and optimized a fully responsive company landing page with HTML, CSS, JavaScript, and AI tools, integrating SEO best practices to improve search visibility.',
      'Built a custom invoice & proposal generator (HTML, CSS, JavaScript, Capacitor) as a single cross-platform web + mobile app — completely eliminating the need for paper or custom-printed layout invoices. Invoices no longer have to be rebuilt from scratch in Excel, Word, Google Docs, or Sheets; repeat layouts are automated and generated on desktop or mobile.',
      'Used Google Search Console and keyword research tools to track web performance and refine search terms.',
      'Maintained day-to-day bilingual communication in English and Spanish, explaining technical project details and service specifications to clients.',
    ],
  },
  {
    company: 'Robert Fernandez Software Solutions',
    title: 'Software Developer & Designer · Independent / Freelance',
    period: 'Jan 2021 – Present',
    tag: 'Independent studio — various clients',
    bullets: [
      'Architected low-latency desktop applications (Go/Wails, C++/SFML) and scalable web/desktop/mobile platforms (React, TypeScript, Tailwind CSS, Capacitor, NW.js / Wails).',
      'Designed complete visual identities — logos, business cards, promotional materials, invoices, price sheets — for clients, ensuring brand consistency across digital and print media using Canva, GIMP, Inkscape, Aesprite, and Adobe Suite.',
      'Developed modern, user-friendly digital interfaces and interactive engines (Lua/LÖVE2D) with a focus on accessibility, performance, and aesthetic quality.',
      'Built and optimized fully responsive landing pages using HTML, CSS, JavaScript, and AI tools, integrating SEO best practices to improve search visibility.',
    ],
  },
];

type School = { name: string; credentials: string[]; activities?: string };

const education: School[] = [
  {
    name: 'Florida Atlantic University',
    credentials: ['B.A. General Studies (Computer Science Concentration) — Dec 2022', 'Associate of Arts in Computer Science — May 2021'],
    activities: 'FAU Aerospace Experimental Association · Google Developer Student Club',
  },
  {
    name: 'Forest Hill Community High School',
    credentials: ['High School Diploma (Digital Design Program) — May 2019'],
    activities: 'SECME · ACE Mentorship Program · Coding Club',
  },
];

type Certification = { issuer: string; icon: string; detail: string };

const certifications: Certification[] = [
  { issuer: 'Microsoft', icon: 'fab fa-microsoft', detail: 'Foundational C# · Microsoft Office Specialist (Access, PowerPoint, Excel, Word)' },
  { issuer: 'Adobe', icon: 'fas fa-pen-nib', detail: 'Certified Professional — Animate, Dreamweaver, Illustrator, Photoshop CC' },
  { issuer: 'Web / Dev', icon: 'fas fa-code', detail: 'Responsive Web Design (freeCodeCamp) · Game Development (Sololearn) · CIW IBA' },
];

const selectedProjects = [
  'AviationPro — multi-platform pilot utility suite for desktop, web, Android, and Wear OS.',
  'PaperWorks Pro — document automation and business tooling for invoices, resumes, and proposals.',
  'Hopeless Catch — published pixel-art fishing horror game built with Love2D and Lua.',
  'PSP Digital Comics — cross-platform CBZ reader inspired by the PSP Digital Comics experience.',
  'Qualia S3 Speedometer — reactive automotive instrument interface on a 480×480 round TFT.',
];

const focusAreas = ['Cross-Platform Apps', 'Brand & UI Design', 'Responsive Web + SEO'];

// At-a-glance differentiators for a skimming recruiter.
type Highlight = { value: string; label: string };
const highlights: Highlight[] = [
  { value: 'Bilingual', label: 'English · Spanish' },
  { value: '6+', label: 'Programming languages' },
  { value: 'Web → Wear OS', label: 'Cross-platform delivery' },
  { value: 'Published', label: 'Game shipped (LÖVE2D)' },
];

// Skills worth surfacing as scannable chips (the rest stay in the grouped list above).
const featuredSkills = [
  'React', 'TypeScript', 'JavaScript (ES6+)', 'Go', 'C++', 'Python', 'C#', 'Lua', 'PHP',
  'Tailwind CSS', 'HTML5', 'CSS3', 'Capacitor', 'Wails', 'NW.js', 'Android Studio',
  'Adobe Creative Cloud', 'UI/UX Design', 'Brand Identity', 'Canva', 'Inkscape', 'GIMP',
  'SEO & Analytics', 'Google Search Console', 'Git / GitHub', 'CI/CD Pipelines', 'Linux', 'Windows', 'macOS',
];

const eyebrow = 'text-[10px] font-semibold tracking-[0.2em] uppercase text-theme-accent dark:text-theme-secondary-dark';

export default function Resume() {
  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark">
      <section className="max-w-5xl mx-auto px-4 py-10 sm:py-16">
        <header id="resume-header" className="border-b border-theme-accent/25 dark:border-theme-accent-dark pb-8 mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black leading-none text-theme-primary dark:text-theme-secondary-dark">Robert Fernandez</h1>
              <p className="mt-3 text-base text-theme-secondary dark:text-theme-secondary-dark">Cross-platform software engineer · digital artist · pilot</p>
              <p id="contact-links" className="mt-4 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                <a href="https://robertfernandez.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio: robertfernandez.dev</a>
                <span aria-hidden> · </span>
                <a href="https://github.com/robfernan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline"><i aria-hidden className="fab fa-github" /> github.com/robfernan</a>
                <span aria-hidden> · </span>
                <a href="https://linkedin.com/in/robfernan" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline"><i aria-hidden className="fab fa-linkedin" /> linkedin.com/in/robfernan</a>
              </p>
            </div>
            <div className="no-print flex flex-wrap gap-2">
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 border border-theme-accent/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark hover:bg-theme-accent/10 transition-colors">
                <i aria-hidden className="fas fa-print" /> Print / PDF
              </button>
              <Link to="/works" className="inline-flex border border-theme-accent/40 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-theme-primary dark:border-theme-accent-dark dark:text-theme-secondary-dark">View portfolio</Link>
            </div>
          </div>
        </header>

        {/* Highlights (decorative — hidden in print to save vertical space) */}
        <section id="highlights" className="mb-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-theme-accent/25 dark:border-theme-accent-dark bg-theme-accent/20 dark:bg-theme-accent-dark sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="bg-theme-bg dark:bg-theme-bg-dark px-3 py-4 text-center">
                <p className="text-base sm:text-lg font-black leading-tight text-theme-primary dark:text-theme-secondary-dark">{h.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-theme-secondary dark:text-theme-secondary-dark">{h.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Profile */}
        <section className="mb-12">
          <p className={`${eyebrow} mb-3`}>Profile</p>
          <p className="text-base sm:text-lg leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
            Bilingual (English/Spanish) designer-engineer building practical, visually considered software across web, desktop, mobile, Wear OS, embedded displays, and retro consoles. I combine aviation discipline, automotive visual design, and a preference for local-first tools that feel clear under pressure — from responsive landing pages and SEO to cross-platform apps and complete brand identities.
          </p>
        </section>

        {/* Professional Experience */}
        <section className="mb-12">
          <p className={`${eyebrow} mb-5`}>Professional Experience</p>
          <div className="space-y-8">
            {roles.map((role) => (
              <article key={role.company} className="border-l-2 border-theme-accent/40 dark:border-theme-accent-dark pl-4 sm:pl-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-theme-primary dark:text-theme-secondary-dark">{role.company}</h2>
                  <span className="text-xs font-medium tracking-wide text-theme-accent dark:text-theme-secondary-dark whitespace-nowrap">{role.period}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-theme-secondary dark:text-theme-secondary-dark">
                  {role.title}
                  {role.tag && (
                    <span className="ml-2 inline-flex align-middle border border-theme-accent/30 dark:border-theme-accent-dark px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-theme-secondary dark:text-theme-secondary-dark">{role.tag}</span>
                  )}
                </p>
                <ul className="mt-3 space-y-2">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-theme-accent dark:bg-theme-secondary-dark" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Core Technical Skills */}
        <section className="mb-12">
          <p className={`${eyebrow} mb-5`}>Core Technical Skills</p>
          <div id="skill-chips" className="flex flex-wrap gap-2 mb-6">
            {featuredSkills.map((skill) => (
              <span key={skill} className="inline-flex border border-theme-accent/30 dark:border-theme-accent-dark bg-theme-card/40 dark:bg-theme-card-dark/40 px-2.5 py-1 text-xs font-medium text-theme-primary dark:text-theme-secondary-dark">{skill}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-bold text-theme-primary dark:text-theme-secondary-dark">{group.label}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">{group.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education, Certifications & Selected Projects — two columns to save vertical space */}
        <section className="mb-12">
          <div id="edu-projects" className="grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-8">
            <div>
              <p className={`${eyebrow} mb-5`}>Education &amp; Certifications</p>
          <div className="space-y-6">
            {education.map((school) => (
              <article key={school.name} className="border-l-2 border-theme-accent/40 dark:border-theme-accent-dark pl-4 sm:pl-5">
                <h3 className="text-base font-bold text-theme-primary dark:text-theme-secondary-dark">{school.name}</h3>
                <ul className="mt-2 space-y-1.5">
                  {school.credentials.map((credential) => (
                    <li key={credential} className="flex gap-2.5 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-theme-accent dark:bg-theme-secondary-dark" />
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
                {school.activities && (
                  <p className="mt-2 text-xs leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                    <span className="font-semibold text-theme-primary dark:text-theme-secondary-dark">Activities: </span>{school.activities}
                  </p>
                )}
              </article>
            ))}

            <div>
              <h3 className="text-sm font-bold text-theme-primary dark:text-theme-secondary-dark mb-2.5">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.issuer} className="flex items-start gap-2.5 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                    <i aria-hidden className={`${cert.icon} mt-0.5 shrink-0 text-base text-theme-accent dark:text-theme-secondary-dark`} />
                    <span><span className="font-semibold text-theme-primary dark:text-theme-secondary-dark">{cert.issuer}: </span>{cert.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            </div>

            <div id="selected-projects">
              <p className={`${eyebrow} mb-5`}>Selected Projects</p>
              <ul id="projects-list" className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
                {selectedProjects.map((project) => (
                  <li key={project} className="border-l-2 border-theme-accent/40 dark:border-theme-accent-dark pl-3 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">{project}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section id="platforms">
          <p className={`${eyebrow} mb-3`}>Platforms</p>
          <p className="text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">Web · Windows · macOS · Linux · Android · Wear OS · ESP32-S3 · PlayStation 1 · PSP · PlayStation 2</p>
        </section>
      </section>
    </div>
  );
}
