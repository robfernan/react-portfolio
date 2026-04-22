import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProjectItem = {
  title: string;
  tech: string;
  status: 'Production' | 'Published' | 'Complete' | 'Finished' | 'In Development' | 'Open Source';
  description: string;
  impact?: string;
  github?: string;
  link?: string;
  youtube?: string;
  image?: string;
  tryNow?: string;
};

type ProjectGroup = {
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
};

const projectGroups: ProjectGroup[] = [
  {
    title: 'Featured',
    subtitle: 'Production-grade software and published games',
    projects: [
      {
        title: 'AviationPro',
        tech: 'React, TypeScript, Tailwind CSS',
        status: 'Production',
        description: 'Professional-grade flight planning suite for pilots. Features advanced route planning, CX-6 flight computer, weather analysis, performance calculations, navigation tools, and flight logs.',
        impact: 'Used by pilots for pre-flight operations',
        github: 'https://github.com/robfernan/AviationPro',
        tryNow: '/aviationpro',
        image: '/assets/projects/aviationpro.png'
      },
      {
        title: 'Hopeless Catch',
        tech: 'Love2D, Lua, Pixel Art',
        status: 'Published',
        description: 'Atmospheric pixel art fishing game with procedurally generated landscapes and a subtle narrative twist. A peaceful adventure that hides something deeper.',
        impact: 'Winner of Fishing Horror Game Jam • Web + Desktop on itch.io',
        link: 'https://mungdaal321.itch.io/hopeless-catch',
        github: 'https://github.com/robfernan/Hopeless-Catch-Fishing-Horror-Game',
        image: '/assets/projects/hopelesscatch.png'
      },
      {
        title: 'Android Watch Face',
        tech: 'Android Watch Face Studio',
        status: 'Finished',
        description: 'Custom minimalist watch face designed for readability and low distraction. Demonstrates wearable UI/UX design principles and platform-specific optimization.',
        image: '/assets/projects/watch_face_android.png'
      }
    ]
  },
  {
    title: 'Web & Tools',
    subtitle: 'Full-stack applications and cross-platform utilities',
    projects: [
      {
        title: 'PaperWorks Pro',
        tech: 'React, TypeScript, Tailwind CSS, shadcn-ui, Vite',
        status: 'Production',
        description: 'All-in-one document creation suite combining invoice generator, resume builder, business card designer, and PDF editor. Professional tool for creators and entrepreneurs.',
        impact: 'Complete web version • Desktop & Mobile coming soon',
        github: 'https://github.com/robfernan/paperworks-pro',
        image: '/assets/projects/paperworkspro.png'
      },
      {
        title: 'XMB Wave Menu',
        tech: 'HTML, CSS, JavaScript, NW.js, Capacitor',
        status: 'Complete',
        description: 'Cross-platform XMB launcher with animated wave effects and dynamic theming. Single codebase deployed to web browsers, desktop (NW.js), and native Android (Capacitor).',
        impact: 'Web • Desktop • Mobile — One codebase',
        youtube: 'https://youtu.be/fo8T0u4NwW8?si=zUnyPA0dVR7eGI4L',
        image: '/assets/projects/xmbwavemenu.png'
      },
      {
        title: 'Restaurant Website',
        tech: 'HTML, CSS, JavaScript',
        status: 'Production',
        description: 'Professional service landing page for a South Florida restaurant. Features menu showcase, booking system, and customer engagement optimization.',
        impact: 'Live production site',
        image: '/assets/projects/restaurantmenu.png'
      },
      {
        title: 'Personal Portfolio (React)',
        tech: 'React, TypeScript, Tailwind CSS',
        status: 'Production',
        description: 'Modern portfolio showcasing projects across web, game development, and console programming. Multiple theme support (Minimal, Slate, 90s) with integrated AviationPro application.',
        impact: 'This site • 4 themes • Responsive design',
        github: 'https://github.com/robfernan/react-typescript-tailwindcss-portfolio',
        link: 'https://robertfernandez.dev',
        image: '/assets/projects/personalportfolioreact.png'
      }
    ]
  },
  {
    title: 'Creative & Games',
    subtitle: 'Graphics programming and interactive experiences',
    projects: [
      {
        title: 'Comic Reader (SFML)',
        tech: 'C++, SFML, OpenGL',
        status: 'Complete',
        description: 'Fully functional comic reader with page navigation, zoom, and drag support. Demonstrates advanced graphics programming, UI/UX design, and file management in C++.',
        impact: 'Desktop application • Advanced graphics',
        github: 'https://github.com/robfernan/Comic_Reader',
        image: '/assets/projects/comicreader_sfml.png'
      },
      {
        title: 'Music Player (Vinyl/Cassette/MiniDisc)',
        tech: 'React, TypeScript, Tailwind CSS | NW.js | Capacitor',
        status: 'In Development',
        description: 'Retro-styled music player with multiple device themes (Vinyl record player, Cassette deck, MiniDisc player). Cross-platform implementation showing design consistency across web, desktop, and mobile.',
        impact: 'Cross-platform • Retro UI design',
        image: '/assets/projects/musicplayer_react.png'
      }
    ]
  },
  {
    title: 'Systems & Education',
    subtitle: 'Embedded systems and open-source learning resources',
    projects: [
      {
        title: 'PSP-Programming',
        tech: 'C, SDL2, PSPSDK',
        status: 'Open Source',
        description: 'Modern PSP homebrew tutorials and step-by-step examples. Comprehensive guide for aspiring console developers covering graphics, audio, input, and cross-platform development.',
        impact: 'Open source education • Community resource',
        github: 'https://github.com/robfernan/PSP-Programming',
        image: '/assets/projects/psp.png'
      },
      {
        title: 'PS1-Mips-Programming',
        tech: 'MIPS Assembly, C, Baremetal',
        status: 'Open Source',
        description: 'PlayStation 1 MIPS assembly programming guides and baremetal demos. Educational resource for low-level systems programming and retro console development.',
        impact: 'Rare skill • Assembly programming',
        github: 'https://github.com/robfernan/PS1-Mips-Programming',
        image: '/assets/projects/ps1project.png'
      }
    ]
  },
  {
    title: 'Tools in Progress',
    subtitle: 'Ambitious projects pushing the boundaries',
    projects: [
      {
        title: 'NeroGPUI',
        tech: 'Rust + GPUI',
        status: 'In Development',
        description: 'Lightning-fast IDE built with Rust and GPUI (the rendering engine behind Zed Editor). Focuses on performance and responsiveness with a modern, minimalist interface designed for developers who demand speed.',
        impact: 'Next-gen IDE • Sub-millisecond rendering',
        image: '/assets/projects/nerogpui.png'
      },
      {
        title: 'NeroWails',
        tech: 'Go + Wails',
        status: 'In Development',
        description: 'Cross-platform IDE bringing the Nero experience to Windows, macOS, and Linux. Built with Go and Wails for native performance and seamless integration with your operating system while maintaining feature parity across platforms.',
        impact: 'Cross-platform • Native performance',
        image: '/assets/projects/nerowails.png'
      }
    ]
  }
];

const statusColors: Record<string, string> = {
  'Production': 'bg-emerald-600 text-emerald-100 border border-emerald-700',
  'Published': 'bg-blue-600 text-blue-100 border border-blue-700',
  'Complete': 'bg-purple-600 text-purple-100 border border-purple-700',
  'Finished': 'bg-amber-600 text-amber-100 border border-amber-700',
  'In Development': 'bg-orange-600 text-orange-100 border border-orange-700',
  'Open Source': 'bg-indigo-600 text-indigo-100 border border-indigo-700'
};

function ProjectCard({ project }: { project: ProjectItem }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative rounded-xl overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Content */}
      <div className="relative p-6 sm:p-8 h-full flex flex-col">
        {/* Image with gradient overlay */}
        <div className="relative overflow-hidden rounded-lg mb-6 h-48 sm:h-56">
          <img
            loading="lazy"
            decoding="async"
            src={project.image || '/assets/car-art.jpg'}
            alt={project.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/car-art.jpg';
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Status badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
            {project.status}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-theme-primary dark:text-theme-primary-dark mb-2 group-hover:text-theme-accent dark:group-hover:text-theme-accent-dark transition-colors">
          {project.title}
        </h3>

        {/* Tech stack */}
        <p className="text-xs sm:text-sm text-theme-accent dark:text-theme-accent-dark font-semibold mb-3 uppercase tracking-wide">
          {project.tech}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Impact */}
        {project.impact && (
          <p className="text-xs sm:text-sm text-theme-primary dark:text-theme-primary-dark font-medium mb-6">
            {project.impact}
          </p>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.tryNow && (
            <button
              onClick={() => project.tryNow && navigate(project.tryNow)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-action/10 dark:bg-theme-action-dark/10 text-theme-action dark:text-theme-action-dark hover:bg-theme-action hover:text-white dark:hover:bg-theme-action-dark dark:hover:text-black transition-all duration-300 font-medium text-sm"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Try it Now
            </button>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-accent/10 dark:bg-theme-accent-dark/10 text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-black transition-all duration-300 font-medium text-sm"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-theme-action/10 dark:bg-theme-action-dark/10 text-theme-action dark:text-theme-action-dark hover:bg-theme-action hover:text-white dark:hover:bg-theme-action-dark dark:hover:text-black transition-all duration-300 font-medium text-sm"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              {project.title === 'Hopeless Catch' ? 'Play Now' : 'Visit'}
            </a>
          )}
          {project.youtube && (
            <a
              href={project.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 font-medium text-sm"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-12 sm:py-20 px-4">
        {/* Hero Section */}
        <header className="mb-16 sm:mb-24">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-theme-primary dark:text-theme-primary-dark mb-3">
                Projects
              </h1>
              <p className="text-lg sm:text-xl text-theme-secondary dark:text-theme-secondary-dark max-w-2xl">
                12 Polished Projects
              </p>
            </div>
            <a href="https://github.com/robfernan" target="_blank" rel="noopener noreferrer" title="View on GitHub" className="hidden sm:flex items-center justify-center w-16 h-16 rounded-full bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20 hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all">
              <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark transition-colors">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </header>

        {/* Projects Grid */}
        {projectGroups.map((group, groupIdx) => (
          <section key={group.title} className={`mb-16 sm:mb-24 ${groupIdx > 0 ? 'pt-12 sm:pt-16 border-t border-theme-accent/10 dark:border-theme-accent-dark/10' : ''}`}>
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-theme-primary dark:text-theme-primary-dark mb-2">
                {group.title}
              </h2>
              {group.subtitle && (
                <p className="text-base sm:text-lg text-theme-secondary dark:text-theme-secondary-dark">
                  {group.subtitle}
                </p>
              )}
            </div>

            <div className={`grid grid-cols-1 ${group.title === 'Featured' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6 sm:gap-8`}>
              {group.projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
