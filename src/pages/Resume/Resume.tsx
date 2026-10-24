
import { Link } from 'react-router-dom';

type SkillGroup = { label: string; items: string[] };

const skillGroups: SkillGroup[] = [
  {
    label: 'Languages & Frameworks',
    items: ['Go (Wails)', 'C++ (SDL, SFML)', 'Python (CircuitPython)', 'C#', 'Lua (LÖVE2D)', 'Monkey C (Garmin CIQ)', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Flutter', 'Dart', 'Tailwind CSS', 'HTML5', 'CSS3', 'PHP'],
  },
  {
    label: 'Web & Development',
    items: ['Responsive Layouts', 'Content Management', 'Cross-Platform Apps', 'CI/CD Pipelines', 'GitHub Actions', 'REST APIs', 'Vite', 'shadcn/ui'],
  },
  {
    label: 'Desktop, Mobile & Wearables',
    items: ['Garmin Connect IQ (Smartwatches)', 'Wear OS', 'Samsung Watch Face Studio', 'Android Studio', 'Wails (Desktop)', 'NW.js (Desktop)', 'Capacitor (Android/iOS)'],
  },
  {
    label: 'Design & Creative',
    items: ['Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Animate)', 'UI/UX Design', 'Brand Identity', 'Character Design', 'Canva', 'Aseprite', 'Inkscape', 'GIMP'],
  },
  {
    label: 'SEO & Analytics',
    items: ['Google Search Console', 'Keyword Research', 'Meta Title & Description Optimization', 'On-Page SEO', 'Core Web Vitals'],
  },
  {
    label: 'Tools & Platforms',
    items: ['Git / GitHub', 'Visual Studio Code', 'Visual Studio Community', 'Linux (Debian)', 'Windows', 'macOS'],
  },
];

type Role = { company: string; title: string; period: string; tag?: string; bullets: string[] };

const roles: Role[] = [
  {
    company: 'Florida Window & Door Maintenance, Inc.',
    title: 'Software Developer & UI/UX Designer',
    period: 'Jan 2021 – Present · Full-Time',
    tag: 'Primary role',
    bullets: [
      'Architected and shipped a cross-platform proposal and invoicing system across desktop and mobile using TypeScript, Capacitor, and Flutter, cutting manual billing entry by 40% and accelerating proposal turnaround by 35%.',
      'Re-engineered core financial calculation engines in Flutter/Dart, optimizing native mobile memory usage, reactive UI state management, and real-time offline document generation.',
      'Engineered the company\'s primary commercial web platform (floridawindowndoormaintenance.com) with semantic HTML5, modern CSS, and performance-focused architecture, significantly boosting organic local acquisition via Google Search Console.',
      'Automated company workflows from legacy physical records and spreadsheets into an integrated digital document pipeline with 100% data integrity.',
      'Designed commercial price sheets, architectural client packets, and branded digital assets ensuring high visual appeal and ADA/WCAG accessibility compliance.',
      'Conducted daily bilingual technical consultations with commercial clients and property managers in English and Spanish, translating complex structural repair scopes into digital contracts.',
    ],
  },
];

type School = { name: string; credentials: string[]; activities?: string };

const education: School[] = [
  {
    name: 'Florida Atlantic University',
    credentials: ['Bachelor of Arts (B.A.) — Computer Science Concentration (Minor in History) | Dec 2022', 'Associate of Arts (A.A.) — Computer Science | May 2021'],
    activities: 'FAU Aerospace Experimental Association · Google Developer Student Club',
  },
  {
    name: 'Forest Hill Community High School',
    credentials: ['High School Diploma — Digital Design Program | May 2019'],
    activities: 'Prepress, Typography, Vector Imaging · SECME · Coding Club · ACE Mentorship Program',
  },
];

type Certification = { issuer: string; icon: string; detail: string };

const certifications: Certification[] = [
  { issuer: 'Federal Aviation Administration (FAA)', icon: 'fas fa-plane', detail: 'Student Pilot Certificate' },
  { issuer: 'Adobe Certified Professional', icon: 'fas fa-pen-nib', detail: 'Photoshop CC · Illustrator CC · InDesign CC · Dreamweaver CC · Animate CC' },
  { issuer: 'Microsoft Office Specialist', icon: 'fab fa-microsoft', detail: 'Word · Excel · PowerPoint · Access' },
  { issuer: 'Technical Certifications', icon: 'fas fa-code', detail: 'Microsoft Foundational C# · Responsive Web Design (freeCodeCamp) · CIW Internet Business Associate' },
];

const selectedProjects = [
  'ChronoGT Tachometer — motorsport-inspired watch face live on Garmin Connect IQ Store across 94 round smartwatch models (Monkey C).',
  'AviationPro — multi-platform pilot utility suite for desktop, web, Android, and Wear OS (129.2 flight hours).',
  'PaperWorks Pro — document automation suite for invoices, resumes, and commercial client proposals (React, TypeScript).',
  'Florida Window & Door Maintenance — commercial responsive web platform and mobile invoicing automation tool.',
  'Gladys\' Cantina — gourmet catering web ordering portal, custom gastronomy menu, and mascot brand identity suite.',
  'JT Marine & SoFlo Marine Detailing — commercial web presences and high-DPI marine service print collateral.',
  'Yoanny Wellness & Style — commercial booking portal and bilingual Palm Beach County service price sheets.',
  'Project Mercury — open-source, zero-trust real-time chat platform built with Flutter and Wacom stylus canvas.',
  'PSP Digital Comics Reborn — cross-platform CBZ comic reader recreation with React, TypeScript & Vite.',
  'Hopeless Catch — published pixel-art fishing horror game built with Love2D and Lua (Game Jam winner).',
];

// At-a-glance differentiators for a skimming recruiter.
type Highlight = { value: string; label: string };
const highlights: Highlight[] = [
  { value: 'Bilingual', label: 'English · Spanish' },
  { value: '7+', label: 'Programming languages' },
  { value: 'Web → Wearables', label: 'Cross-platform delivery' },
  { value: 'Published', label: 'Garmin & Itch.io Shipped' },
];

// Skills worth surfacing as scannable chips (the rest stay in the grouped list above).
const featuredSkills = [
  'React', 'TypeScript', 'JavaScript (ES6+)', 'Garmin Connect IQ', 'Monkey C', 'Flutter', 'Dart', 'Go', 'C++', 'Python', 'C#', 'Lua', 'PHP',
  'Tailwind CSS', 'HTML5', 'CSS3', 'Capacitor', 'Wails', 'NW.js', 'Android Studio',
  'Adobe Creative Cloud', 'Illustrator', 'Photoshop', 'InDesign', 'UI/UX Design', 'Brand Identity',
  'Pre-Press (CMYK)', 'ADA / WCAG Compliance', 'Canva', 'Git / GitHub', 'CI/CD Pipelines', 'Linux', 'Windows', 'macOS',
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
              <p className="mt-3 text-base text-theme-secondary dark:text-theme-secondary-dark">Software Developer & UI/UX Designer · Bilingual (English / Spanish)</p>
              <p id="contact-links" className="mt-4 text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
                <span className="font-medium text-theme-accent dark:text-theme-secondary-dark">West Palm Beach, FL</span>
                <span aria-hidden> · </span>
                <a href="https://robertfernandez.dev" target="_blank" rel="noopener noreferrer" className="hover:underline">robertfernandez.dev</a>
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
          <p className={`${eyebrow} mb-3`}>Professional Summary</p>
          <p className="text-base sm:text-lg leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">
            Full-Stack Software Engineer & UI/UX Designer with 5+ years of experience engineering cross-platform business automation tools, commercial web applications, and published wearable software on the official Garmin Connect IQ Store. B.A. in Computer Science from Florida Atlantic University with deep production experience in TypeScript, React, Go, and embedded/desktop runtimes. Bridges robust technical systems architecture with accessible, conversion-driven UI/UX design.
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
          <p className="text-sm leading-relaxed text-theme-secondary dark:text-theme-secondary-dark">Web · Windows · macOS · Linux · Android · Garmin Connect IQ · Wear OS · ESP32-S3 · PlayStation 1 · PSP · PlayStation 2</p>
        </section>
      </section>
    </div>
  );
}
