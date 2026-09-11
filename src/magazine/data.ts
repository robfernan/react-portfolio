/* ------------------------------------------------------------------ */
/*  Shared magazine data — single source of truth for the Works pages. */
/* ------------------------------------------------------------------ */

export type Entry = {
  title: string;
  format?: string;
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
  title: string;
  intro: string; // editorial lede
  entries: Entry[];
};

export const ISSUES: Issue[] = [
  {
    id: 'build',
    kicker: 'Products, Client Work & Tools',
    title: 'Products & Client Work',
    intro:
      'Production software and cross-platform tools — the engineering side of the catalogue. Flight planning, document suites, launchers, and IDEs.',
    entries: [
      {
        title: 'AviationPro',
        cover: '/assets/projects/aviationpro.webp',
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
        cover: '/assets/projects/paperworkspro.webp',
        blurb:
          'All-in-one document creation suite combining invoice generator, resume builder, business card designer, and PDF editor for creators and entrepreneurs.',
        tech: ['React', 'TypeScript', 'shadcn-ui', 'Vite'],
        status: 'Production',
        impact: 'Complete web version • Desktop & Mobile coming soon',
        github: 'https://github.com/robfernan/paperworks-pro',
      },
      {
        title: 'XMB Wave Menu',
        cover: '/assets/projects/xmbwavemenu.webp',
        blurb:
          'Cross-platform XMB launcher with animated wave effects and dynamic theming. One codebase deployed to web, desktop (NW.js), and native Android (Capacitor).',
        tech: ['HTML/CSS/JS', 'NW.js', 'Capacitor'],
        status: 'Complete',
        impact: 'Web • Desktop • Mobile — one codebase',
        youtube: 'https://youtu.be/fo8T0u4NwW8?si=zUnyPA0dVR7eGI4L',
      },
      {
        title: 'Restaurant Website',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/restaurantmenu.webp',
        blurb:
          'Restaurant ordering experience with a browsable menu, cart flow, and receipt option — a small business site treated as a real product rather than a static brochure.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Production',
        impact: 'Menu • Cart • Receipt flow',
      },
      {
        title: 'Florida Window & Door Maintenance Inc.',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/FLWindowndoormaintenanceLandingPage.webp',
        blurb:
          'Service-focused landing page for a Florida maintenance company — clear offerings, contact pathways, and a practical conversion-first layout built from the ground up.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Client Website',
        impact: 'Live business presence • floridawindowndoormaintenance.com',
        link: 'https://floridawindowndoormaintenance.com',
      },
      {
        title: 'M&G Gutters',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/MnGGuttersLandingPage.webp',
        blurb:
          'A focused local-service landing page for gutter work, designed around trust, readable service information, and direct customer contact.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Client Website',
        impact: 'Local service landing page',
      },
      {
        title: 'Florida Window & Door Invoicing / Proposal App',
        format: 'CLIENT / CAPACITOR',
        cover: '/assets/projects/FloridaInvoiceApp.webp',
        blurb:
          'A lightweight business tool for creating invoices and proposals for Florida Window & Door Maintenance Inc., built as a browser-first app with a Capacitor path to mobile.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Capacitor'],
        status: 'Business Tool',
        impact: 'Proposals • Invoices • Mobile-ready workflow',
      },
      {
        title: 'NeroGPUI',
        cover: '/assets/projects/nerogpui.webp',
        blurb:
          'Lightning-fast IDE built with Rust and GPUI (the rendering engine behind Zed Editor). Focused on performance, responsiveness, and a minimalist interface.',
        tech: ['Rust', 'GPUI'],
        status: 'In Development',
        impact: 'Next-gen IDE • sub-millisecond rendering',
      },
      {
        title: 'NeroWails',
        cover: '/assets/projects/nerowails.webp',
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
    kicker: 'Games, Hardware & Open Source',
    title: 'Games & Systems',
    intro:
      'Interactive experiences, retro-console homebrew, and the fun stuff — from published games to baremetal PS1 MIPS.',
    entries: [
      {
        title: 'Hopeless Catch',
        cover: '/assets/projects/hopelesscatch.webp',
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
        cover: '/assets/projects/comicreader_sfml.webp',
        blurb:
          'Fully functional comic reader with page navigation, zoom, and drag support — advanced graphics programming, UI/UX design, and file management in C++.',
        tech: ['C++', 'SFML', 'OpenGL'],
        status: 'Complete',
        impact: 'Desktop application • advanced graphics',
        github: 'https://github.com/robfernan/Comic_Reader',
      },
      {
        title: 'Music Player (Vinyl / Cassette / MiniDisc)',
        cover: '/assets/projects/musicplayer_react.webp',
        blurb:
          'Retro-styled music player with multiple device themes. Cross-platform implementation showing design consistency across web, desktop, and mobile.',
        tech: ['React', 'TypeScript', 'NW.js', 'Capacitor'],
        status: 'In Development',
        impact: 'Cross-platform • retro UI design',
      },
      {
        title: 'Dreamcast PS3 Theme → HTML5 XMB',
        format: 'VIDEO / INTERFACE RECREATION',
        cover: '/assets/projects/dreamcastps3html.webp',
        blurb:
          'A custom cross-platform web interface created by extracting an original SEGA Dreamcast PS3 theme (.p3t) and rebuilding it as an interactive XMB browser homepage with authentic layouts, icons, gamepad support, and menu navigation.',
        tech: ['HTML5', 'CSS', 'JavaScript', 'Gamepad API'],
        status: 'Video Feature',
        impact: 'Converting a Real PS3 Dreamcast Theme (.P3T) to HTML5',
        youtube: 'https://www.youtube.com/watch?v=YagOy0VBs-Q',
      },
      {
        title: 'Qualia S3 Speedometer',
        format: 'EMBEDDED / HARDWARE',
        blurb:
          'Embedded dashboard experiment for the Adafruit Qualia S3 RGB 666 TFT round display — a 480×480 bitmap speedometer with a responsive needle that behaves like a car instrument.',
        tech: ['ESP32-S3', 'Adafruit Qualia', 'Embedded C/C++', 'Bitmap UI'],
        status: 'Embedded Experiment',
        impact: 'Round TFT • reactive needle • automotive interface',
      },
      {
        title: 'PSP Digital Comics',
        format: 'CROSS-PLATFORM / READER',
        cover: '/assets/projects/psp.webp',
        blurb:
          'A faithful PSP Digital Comics-style reader where users bring their own CBZ files. This is the modern cross-platform successor to the SFML Comic Reader.',
        tech: ['Wails', 'Capacitor', 'React', 'TypeScript', 'Tailwind CSS'],
        status: 'Cross-Platform',
        impact: 'CBZ reader • Desktop • Mobile',
        github: 'https://github.com/robfernan#psp-digital-comics',
      },
      {
        title: 'Love2D Xbox-Inspired Launcher',
        format: 'RETRO-TECH / DESKTOP',
        cover: '/assets/projects/love2d_xboxlauncher.webp',
        blurb:
          'A retro-futuristic Xbox-inspired desktop launcher in Lua/LÖVE with a frameless draggable window, procedural glowing sphere, orbital wireframe rings, bloom shader, radar grid, category menus, theme switching, shortcut management, and app launching.',
        tech: ['Lua', 'Love2D', 'GLSL', 'Desktop UI'],
        status: 'Active Build',
        impact: 'Launcher • Shortcut Manager • App Launcher',
        github: 'https://github.com/robfernan/Love2D_XboxLauncher',
      },
      {
        title: 'PS1-Mips-Programming',
        cover: '/assets/projects/ps1project.webp',
        blurb:
          'PlayStation 1 MIPS assembly programming guides and baremetal demos — an educational resource for low-level systems programming and retro console development.',
        tech: ['MIPS Assembly', 'C', 'Baremetal'],
        status: 'Open Source',
        impact: 'Rare skill • assembly programming',
        github: 'https://github.com/robfernan/PS1-Mips-Programming',
      },
    ],
  },
  {
    id: 'studio',
    kicker: 'Watch Faces, Graphic Design & UI/UX',
    title: 'Studio Craft',
    intro:
      'The visual systems behind the software: wearable interfaces, automotive graphics, editorial layouts, and design work built with the same care as the code.',
    entries: [
      {
        title: 'Wear OS Watch Face',
        format: 'WATCH FACE / AVIATION',
        cover: '/assets/projects/watch_face_android_avpro.webp',
        blurb: 'Aviation-minded wearable interface work with compact readouts, high-contrast data, and a visual language designed for a glance.',
        tech: ['Wear OS', 'Android', 'UI Design'],
        status: 'Visual System',
        impact: 'Small-screen clarity • aviation data',
      },
      {
        title: 'Fish Watch Face',
        format: 'WATCH FACE / VISUAL SYSTEM',
        cover: '/assets/home/watchfacefish.webp',
        blurb: 'A playful Wear OS face exploring character, color, and readable time presentation on a small circular display.',
        tech: ['Wear OS', 'Illustration', 'Visual Design'],
        status: 'Wearable',
        impact: 'Character-driven interface design',
      },

    ],
  },
];

export const ART_PLATFORMS = [
  { name: 'Pinterest', icon: 'fa-pinterest-p', href: 'https://www.pinterest.com/fernandez7466/_profile/', note: 'Moodboards & inspiration' },
  { name: 'ArtStation', icon: 'fa-artstation', href: 'https://www.artstation.com/robfernan', note: '3D & digital art' },
  { name: 'Behance', icon: 'fa-behance', href: 'https://www.behance.net/robertfern5088', note: 'UI/UX design' },
  { name: 'Itch.io', logo: '/images/itchio-textless-black.svg', href: 'https://mungdaal321.itch.io/', note: 'Game assets & demos' },
  { name: 'DeviantArt', icon: 'fa-deviantart', href: 'https://www.deviantart.com/rober321', note: 'Sketches & concepts' },
  { name: 'Blog', icon: 'fa-wordpress', href: 'https://robfernan.wordpress.com/', note: 'WordPress blog' },
];
