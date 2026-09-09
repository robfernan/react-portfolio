/* ------------------------------------------------------------------ */
/*  Shared magazine data — single source of truth for the Works pages. */
/* ------------------------------------------------------------------ */

export type Entry = {
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

export type Issue = {
  id: string;
  kicker: string; // small label, e.g. "Software & Tools"
  intro: string; // editorial lede
  entries: Entry[];
};

export const ISSUES: Issue[] = [
  {
    id: 'build',
    kicker: 'Software & Tools',
    intro:
      'Production software and cross-platform tools — the engineering side of the catalogue. Flight planning, document suites, launchers, and IDEs.',
    entries: [
      {
        title: 'AviationPro',
        cover: '/assets/projects/aviationpro.png',
        blurb:
          'Professional-grade flight planning suite for pilots — advanced route planning, CX-6 flight computer, weather analysis, performance calculations, navigation tools, and flight logs.',
        tech: ['Go', 'Wails', 'React', 'Capacitor'],
        status: 'Beta v1.0',
        impact: 'Desktop • Android EFB • Wear OS — used by pilots for pre-flight ops',
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

export const ART_PLATFORMS = [
  { name: 'Pinterest', icon: 'fa-pinterest-p', href: 'https://www.pinterest.com/fernandez7466/_profile/', note: 'Moodboards & inspiration' },
  { name: 'ArtStation', icon: 'fa-artstation', href: 'https://www.artstation.com/robfernan', note: '3D & digital art' },
  { name: 'Behance', icon: 'fa-behance', href: 'https://www.behance.net/robertfern5088', note: 'UI/UX design' },
  { name: 'Itch.io', icon: 'fa-gamepad', href: 'https://mungdaal321.itch.io/', note: 'Game assets & demos' },
  { name: 'DeviantArt', icon: 'fa-deviantart', href: 'https://www.deviantart.com/rober321', note: 'Sketches & concepts' },
  { name: 'Blog', icon: 'fa-wordpress', href: 'https://robfernan.wordpress.com/', note: 'WordPress blog' },
];
