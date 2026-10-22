/* ------------------------------------------------------------------ */
/*  Shared magazine data — single source of truth for the Works pages. */
/* ------------------------------------------------------------------ */

export type Entry = {
  title: string;
  format?: string;
  cover?: string;
  screenshots?: string[];
  screenshotLabels?: string[];
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
        tryNow: '/aviation',
      },
      {
        title: 'PaperWorks Pro',
        cover: '/assets/projects/paperworks_1.webp',
        screenshots: [
          '/assets/projects/paperworks_1.webp',
          '/assets/projects/paperworks_2.webp',
          '/assets/projects/paperworks_3.webp',
          '/assets/projects/paperworks_4.webp',
          '/assets/projects/paperworks_5.webp',
          '/assets/projects/paperworks_6.webp',
        ],
        screenshotLabels: [
          'Overview',
          'Document Vault',
          'Home Page',
          'Business Card Designer',
          'Resume Builder',
          'Invoice & Proposal Studio',
        ],
        blurb:
          'All-in-one document creation suite combining business card designer, resume builder, and PDF editor for creators and entrepreneurs.',
        tech: ['React', 'TypeScript', 'shadcn-ui', 'Vite'],
        status: 'Production',
        impact: 'Complete web version • Desktop & Mobile coming soon',
        github: 'https://github.com/robfernan/paperworks-pro',
      },
      {
        title: 'SoFlo Marine Detailing Landing Page',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/soflomarinedetailinglandingpage.webp',
        blurb:
          'Commercial service landing page for SoFlo Marine Detailing. Designed with responsive service galleries, detailing package selectors, and direct quote inquiry forms for vessel owners across South Florida.',
        tech: ['React', 'TypeScript', 'Responsive Web'],
        status: 'Client Website',
        impact: 'Vessel detailing presence • Multi-tier service showcases',
      },
      {
        title: "Gladys' Cantina",
        format: 'CLIENT / WEB',
        cover: '/assets/projects/gladysrestuaranthero_dark.webp',
        screenshots: [
          '/assets/projects/gladysrestuaranthero_dark.webp',
          '/assets/projects/gladysrestuaranthero_organic.webp',
        ],
        screenshotLabels: ['Dark Theme Edition', 'Organic Theme Edition'],
        blurb:
          'Gourmet Catering & Meal Prep: Artisan Gastronomy • Custom Bowls & Plates • Event Catering • Weekly Meal Prep. Serving West Palm Beach, Florida and surrounding Palm Beach with interactive ordering flow, menu selection, and digital receipt generation.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'Production',
        impact: 'Artisan Gastronomy • Custom Bowls & Plates • West Palm Beach, FL',
      },
      {
        title: 'Florida Window & Door Maintenance Inc.',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/flwindowlandingpage.webp',
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
        cover: '/assets/projects/floridainvoicingapp_1.webp',
        screenshots: [
          '/assets/projects/floridainvoicingapp_1.webp',
          '/assets/projects/floridainvoicingapp_2.webp',
          '/assets/projects/floridainvoicingapp_3.webp',
        ],
        screenshotLabels: [
          'Invoicing Screen',
          'Proposal Form',
          'Document Print & Preview',
        ],
        blurb:
          'A lightweight business tool for creating invoices and proposals for Florida Window & Door Maintenance Inc., built as a browser-first app with a Capacitor path to mobile.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Capacitor'],
        status: 'Business Tool',
        impact: 'Proposals • Invoices • Mobile-ready workflow',
      },
      {
        title: 'JT Marine Services',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/jtmarineservices.webp',
        blurb:
          'Service-focused commercial landing page for JT Marine Services. Features responsive service breakdowns for boat repair, marine mechanical maintenance, and direct quote inquiry workflows.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web'],
        status: 'Client Website',
        impact: 'Marine service presence • Mobile-first quote inquiry flow',
      },
      {
        title: 'Yoanny Wellness & Style Client Booking & Portfolio Site',
        format: 'CLIENT / WEB',
        cover: '/assets/projects/YoannyWellness_StyleLandingPage.webp',
        blurb:
          'Commercial website and booking inquiry portal for Yoanny Wellness & Style. Designed to showcase salon and licensed cosmetology services, client transformations, and direct appointment inquiry pathways.',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        status: 'Client Website',
        impact: 'Salon & wellness presence • Service booking pathways',
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
        title: 'Sony 2002 Website Recreation',
        format: 'RETRO-TECH / WEB RECREATION',
        cover: '/assets/home/sony2002recreation.webp',
        blurb:
          'Faithful interactive recreation of the iconic early-2000s Sony promotional website. Re-engineered using modern React and TypeScript with nostalgic layouts, authentic typography, and vintage web motion.',
        tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
        status: 'Active Build',
        impact: 'Interactive nostalgic showcase • 2000s web aesthetic',
        github: 'https://github.com/robfernan/sony2002-recreationsite',
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
        cover: '/assets/projects/qualia_s3_speedometer.webp',
        blurb:
          'Embedded dashboard experiment for the Adafruit Qualia S3 RGB 666 TFT round display — a 480×480 bitmap speedometer with a responsive needle that behaves like a car instrument.',
        tech: ['ESP32-S3', 'Adafruit Qualia', 'Embedded C/C++', 'Bitmap UI'],
        status: 'Embedded Experiment',
        impact: 'Round TFT • reactive needle • automotive interface',
      },
      {
        title: 'Project Mercury',
        format: 'CROSS-PLATFORM / FLUTTER',
        cover: '/assets/projects/mercury_screenshot.webp',
        blurb:
          'Open-source, zero-trust, real-time chat platform built with Flutter. Interactive UI shell across desktop and mobile with collaborative Wacom vector canvas, stylus pressure, custom themes, hardware enclave inspection, and audio rooms.',
        tech: ['Flutter', 'Dart', 'Zero-Trust', 'Wacom Stylus API'],
        status: 'Active Development',
        impact: 'Interactive Flutter shell • Desktop & Mobile • Collaborative Canvas',
        github: 'https://github.com/robfernan/Mercury',
      },
      {
        title: 'PSP Digital Comics Reborn',
        format: 'CROSS-PLATFORM / REACT + VITE',
        cover: '/assets/projects/psp_digital_comics.gif',
        blurb:
          'A faithful cross-platform recreation of the iconic PSP Digital Comics reader for CBZ comic archives. Features authentic page transitions, menu ergonomics, and responsive viewing built with React, TypeScript, and Vite.',
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'CBZ Parser'],
        status: 'Video Showcase',
        impact: 'CBZ reader • Desktop & Mobile • Faithful PSP UI',
        youtube: 'https://www.youtube.com/watch?v=PD-8Q7aSv90',
        github: 'https://github.com/robfernan/psp-comics-reborn',
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
        youtube: 'https://www.youtube.com/watch?v=KIvuYsxpoYs',
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
        title: 'Brand Identity & Commercial Collateral',
        format: 'BRAND IDENTITY / PRINT',
        cover: '/assets/projects/flwindowinvoiceprint.webp',
        blurb: 'Unified corporate brand system, logo suites, price sheets, and physical marketing collateral for Florida Window & Door. Pre-press configured with CMYK separations and bleed margins.',
        tech: ['Adobe Illustrator', 'Photoshop CC', 'Canva', 'Pre-Press CMYK'],
        status: 'Commercial Production',
        impact: 'Logos • Business Cards • Marketing Collateral • Print-Ready',
        link: 'https://floridawindowndoormaintenance.com',
      },
      {
        title: 'Yoanny Wellness & Style — Brand & Price Sheets',
        format: 'CLIENT / PRINT & IDENTITY',
        cover: '/assets/projects/yoannywellness_styleprint.webp',
        screenshots: [
          '/assets/projects/yoannywellness_styleprint.webp',
          '/assets/projects/yoannywellness_pricesheet.webp',
        ],
        screenshotLabels: [
          'Full Service & Care Price Sheet (High-DPI Flyer)',
          'Typographic Price Sheet Layout',
        ],
        blurb: 'Commercial business card design and structured service price sheets for Yoanny Wellness & Style. Engineered with clear typographic hierarchy, elegant wellness branding, and press-ready trim specifications.',
        tech: ['Adobe Illustrator', 'Typography', 'Print Layout', 'CMYK Specs'],
        status: 'Client Delivery',
        impact: 'Business Cards • Service Price Sheets • Print Production',
      },
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
      {
        title: 'JT Marine Services — Commercial Service Flyer',
        format: 'CLIENT / PRINT COLLATERAL',
        cover: '/assets/projects/jtmarineprint.webp',
        blurb: 'High-impact commercial promotional flyer and marketing collateral for JT Marine Services. Designed to showcase boat maintenance, and marine service offerings with crisp nautical visual hierarchy and print-ready CMYK specs.',
        tech: ['Adobe Illustrator', 'Photoshop CC', 'Indesign', 'Print Design', 'Pre-Press CMYK'],
        status: 'Client Delivery',
        impact: 'Service Flyer • Brand Consistency • High-DPI Print Output',
      },
      {
        title: "Gladys' Cantina — Brand Identity & Mascot Suite",
        format: 'BRAND IDENTITY / CHARACTER DESIGN',
        cover: '/assets/projects/gladyscatering_2.webp',
        screenshots: [
          '/assets/projects/gladyscatering_2.webp',
          '/assets/projects/gladyscatering_1.webp',
          '/assets/projects/gladyscatering_4.webp',
          '/assets/projects/gladyscatering_3.webp',
        ],
        screenshotLabels: [
          'Chef Mascot Illustration & Badge',
          'Primary Brand Wordmark & Sticker Decal',
          'Catering & Meal Prep Promotional Poster',
          'Create Your Plate / Bowl Menu Poster',
        ],
        blurb: 'Complete culinary brand identity suite, hand-rendered chef dachshund mascot illustration, and custom typography emblem for Gladys Cantina. Developed for packaging stickers, take-out bowls, signage, and marketing collateral.',
        tech: ['Adobe Illustrator', 'Photoshop CC', 'Character Design', 'Brand Identity', 'Vector Graphics'],
        status: 'Client Delivery',
        impact: 'Mascot Badge • Brand Wordmark • Decals & Merch • High-DPI Print',
      },
      {
        title: 'M&G Gutters — Corporate Identity & Brand Mark',
        format: 'BRAND IDENTITY / LOGO DESIGN',
        cover: '/assets/projects/mngguttersprint.webp',
        screenshots: [
          '/assets/projects/mngguttersprint.webp',
        ],
        screenshotLabels: [
          'Commercial Print Flyer & Fleet Specs'
        ],
        blurb: 'Complete visual brand identity, emblem logo suite, and print-ready business stationery for a South Florida gutter contractor. Built with clean vector lines, CMYK color profiles, and clear brand hierarchy.',
        tech: ['Adobe Illustrator', 'Logo Design', 'Vector Graphics', 'CMYK'],
        status: 'Client Delivery',
        impact: 'Emblem Logo • Business Cards • Brand Standards',
      },
      {
        title: 'SoFlo Marine Detailing — Care Packages & Marketing Collateral',
        format: 'CLIENT / BRAND & PRINT',
        cover: '/assets/projects/SoFloMarineDetailingPrint.webp',
        blurb: 'Commercial print marketing collateral and structured boat detailing service packages for SoFlo Marine Detailing. Highlights multi-stage ceramic coatings, gelcoat restoration, wash tiers, and scheduled vessel care with marine-grade visual polish.',
        tech: ['Adobe Illustrator', 'Photoshop CC', 'InDesign', 'Print Layout', 'CMYK Specs'],
        status: 'Client Delivery',
        impact: 'Service Tier Guides • Detailing Flyers • Print Production',
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
