# Personal Portfolio Website — React / TypeScript / Tailwind CSS

A multi-page personal portfolio built with **React 19**, **TypeScript**, and **Tailwind CSS v4**. It showcases my work as a cross-platform software engineer, digital artist, pilot, and content creator — including an embedded professional flight-planning suite (AviationPro) and a print-ready résumé.

**Live:** [robertfernandez.dev](https://robertfernandez.dev) · **Repo:** [robfernan/react-portfolio](https://github.com/robfernan/react-portfolio)
**Original version:** [HTML/CSS/JS Portfolio](https://github.com/robfernan/html-css-js-portfolio)

## 🎯 About

This is a **modern, component-based rebuild** of my foundational HTML/CSS/JavaScript portfolio. It demonstrates progression to professional-grade web development using industry-standard tooling:

- **React 19** — component architecture for reusability and maintainability
- **TypeScript** — full type safety across components and utilities
- **Tailwind CSS v4** — utility-first styling with a custom theme-token system
- **Vite** — fast dev server (HMR) and optimized production builds
- **React Router v6** — client-side routing for seamless SPA navigation

The site spans:

- **Software development** — web, desktop (Go/Wails, C++/SFML), mobile (Capacitor), Wear OS, embedded displays, retro consoles
- **Digital art & design** — brand identity, UI/UX, Adobe Creative Cloud
- **Aviation** — student pilot with an integrated flight-planning suite
- **Content creation** — streaming and game development

## ✨ Features

### 🎨 Design & UX
- **Component-based architecture** — reusable React components for consistency across all sub-apps
- **Responsive design** — mobile-first, verified from iPhone SE (375px) up to 4K ultra-wide displays (3840px)
- **Unified container rhythm** — standardized `max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8` layout across header, hero, works, aviation, and footer
- **Theme system** — CSS custom properties (`theme-*` tokens) with 4 switchable themes + light/dark mode
  - **90s theme dark mode** uses an authentic **Amber CRT Phosphor** palette (`#f59e0b` / `#d97706` over deep black `#0c0a09` canvas) with zero blue cast
- **ADA / Section 508 / WCAG 2.1 AA compliant** — minimum $\ge 44 \times 44\text{px}$ touch targets, visible focus-rings, ARIA roles/labels, contrast ratios $\ge 4.5:1$, and full `prefers-reduced-motion` support
- **Zero-CDN, 100% self-hosted typography** — Playfair Display and FontAwesome icons bundled directly from local WOFF2 subsets with preloads for instant, tracker-proof first paints

### 🛠️ Technical
- **TypeScript** — strict typing across all components, calculators, and utilities
- **Route-level Code Splitting** — `React.lazy` and `React.Suspense` for secondary pages (`/works`, `/aviation`, `/streaming`, `/resume`) reducing initial gzipped entry bundle to ~75 kB
- **React hooks & context** — centralized state management via `useState`, `useEffect`, `ThemeProvider`
- **Tailwind CSS v4** — utility-first styling with `@theme` custom properties and responsive variants
- **Vite 8** — instant HMR and optimized tree-shaken production builds

### 🧮 Interactive Tools (AviationPro EFB Suite)
- **VFR NavLog (Dead Reckoning Chart)**: True Course, Wind Correction Angle (WCA), True/Magnetic/Compass Heading, Groundspeed, Leg ETE/ETA, Fuel Burn, VOR navigation data, print stylesheet & JSON export
- **CX-6 Electronic Flight Computer**: Wind Triangle (WCA/GS/HDG), True Airspeed (TAS), Time-Speed-Distance (TSD), Fuel, and Crosswind components
- **Live Weather Tools & Hazard Analysis**: Live METAR/TAF weather fetcher (via server-side PHP proxy for aviationweather.gov) with VFR/MVFR/IFR/LIFR categorization, plus an **interactive Runway vs. Wind Rose compass visualizer**
- **Weight & Balance Calculator**: C172 Center of Gravity envelope visualization, fuel burn shift tracking, and Go/No-Go envelope validation
- **Navigation Tools**: Distance & bearing calculator with an **animated 360° directional gyro / compass rose dial**, unit conversions, time-zone converters, and direct aeronautical briefing links
- **Persistent Flight Logbook**: Track flight hours, dual/solo cross-country requirements under 14 CFR §61.87 with Dexie/localStorage persistence and CSV export

## 📄 Pages Overview

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `PortfolioHome.tsx` | Home — headline capabilities, active featured builds, quick links |
| `/works`, `/work`, `/projects` | `Magazine.tsx` | Works — curated editorial catalogue & showcase spanning software, tools, client work, retro systems, wearable UI, and digital art |
| `/aviation/*` | `AviationProApp.tsx` | Aviation — in-browser Electronic Flight Bag (EFB) suite with calculators, weather, and weight & balance tools |
| `/streaming` | `Streaming.tsx` | Streaming — live coding, automotive sketching, retro tech, and gaming channels across YouTube & Twitch |
| `/resume` | `Resume.tsx` | Resume — executive recruiter-ready CV with a strict one-page PDF/print stylesheet |

### 📝 Resume (`/resume`)
A **general-overview resume** designed for recruiters who land on the site after an application. It opens with a name heading, tagline, and contact links, then covers professional experience (primary role + independent/freelance studio), core technical skills, education & certifications, and selected projects — with bilingual (English/Spanish) noted throughout.

- **Print / PDF export** — a "Print / PDF" button triggers `window.print()`, and a dedicated `@media print` block in `src/index.css` produces a clean, high-contrast **single-page** document: it hides site chrome and decorative elements, forces a light palette, equalizes the Education + Selected Projects columns, and compacts spacing so everything fits on one US Letter page at 100% scale.
- Contact links (portfolio / GitHub / LinkedIn) render in the header for both screen and print.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| UI framework | React 19, React DOM 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, custom CSS variables |
| Build tool | Vite 8 (`@vitejs/plugin-react`) |
| Routing | React Router v7 (`startTransition` enabled) |
| Icons | FontAwesome Free (bundled WOFF2), Lucide React |
| Data / persistence | Dexie (+ `dexie-react-hooks`) for the Aviation logbook |
| PDF export | Browser print stylesheet (Resume) + canvas / JSON export |
| Typography | Playfair Display (self-hosted WOFF2 with Latin preloads) |

## 📁 Project Structure

```
├── index.html                 # Vite entry HTML (JSON-LD Person/Org schemas + WOFF2 preloads)
├── public/                    # Static assets: images, screenshots, fonts/
├── src/
│   ├── main.tsx               # React entry point & SW registration
│   ├── App.tsx                # Router, lazy route Suspense, theme provider, global header & nav
│   ├── index.css              # Global styles, Tailwind v4 @theme, @media print block
│   ├── theme-vars.css         # CSS custom properties for 4 themes (Minimal, Slate, Midnight, 90s)
│   ├── context/               # ThemeContext (theme + dark-mode state)
│   ├── components/            # Header, Footer, BackToTop, layout shells
│   └── pages/
│       ├── Home/              # PortfolioHome.tsx
│       ├── Works/             # Magazine.tsx, MagazineUI.tsx, data.ts
│       ├── Aviation/          # AviationProApp.tsx, CX-6, Weight & Balance, Nav Tools, Weather
│       ├── Streaming/         # Streaming.tsx
│       └── Resume/            # Resume.tsx (one-page print optimized)
├── package.json
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts
```

## 🎯 Featured Projects
 
### Active & Featured Builds
- **[Project Mercury](https://github.com/robfernan/Mercury)** — Open-source, zero-trust real-time chat platform in Flutter with collaborative vector canvas and audio rooms
- **[PSP Digital Comics Reborn](https://github.com/robfernan/psp-comics-reborn)** — Faithful cross-platform recreation of the iconic PSP Digital Comics reader for CBZ archives (React, TypeScript, Vite)
- **[Love2D Xbox Launcher](https://github.com/robfernan/Love2D_XboxLauncher)** — Xbox-inspired desktop launcher built with Love2D (LÖVE) featuring frameless draggable window and gamepad support
- **[AviationPro](https://github.com/robfernan/AviationPro)** — Professional cross-platform Electronic Flight Bag suite (Go, Wails, React, Capacitor, Wear OS)
- **[PaperWorks Pro](https://github.com/robfernan/paperworks-pro)** — All-in-one document creation suite for invoices, resumes, and PDF tools (React, TypeScript, shadcn-ui)
- **[Hopeless Catch](https://mungdaal321.itch.io/hopeless-catch)** — Atmospheric pixel-art fishing game (Love2D, Lua)

### Client & Commercial Work
- **SoFlo Marine Detailing** — Commercial vessel detailing landing page & package selector
- **Florida Window & Door Maintenance Inc.** — Service landing page and custom Capacitor invoicing/proposal tool
- **M&G Gutters** — Local-service landing page designed for conversion and clarity
- **Restaurant Website** — Interactive digital ordering, cart, and receipt flow

### Systems & Creative Engineering
- **XMB Wave Menu** — Cross-platform desktop launcher with authentic wave shader effects (HTML5/CSS3/JS, NW.js, Capacitor)
- **Qualia S3 ESP32 Speedometer** — Custom embedded automotive dashboard gauge built with ESP-IDF and LVGL
- **Wear OS Aviation & Minimalist Watch Faces** — Digital & analog wearable interfaces built with Samsung Watch Face Studio
- **PSP & PS1 Homebrew** — Modern MIPS assembly and C homebrew development projects

## 🚀 Development (local)

Requires Node.js and npm. From the repository root:

```bash
# Install dependencies
npm install

# Start the dev server with hot reload
npm run dev          # typically http://localhost:5173

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Key npm scripts
- `dev` — start Vite dev server with HMR
- `build` — build the optimized production bundle
- `preview` — serve the production build locally

### Development tips
- **Components** — edit `.tsx` files in `src/`; changes apply instantly via HMR.
- **Styling** — use Tailwind utilities inline, or add custom rules to `src/index.css`.
- **Theming** — theme palettes live in `src/theme-vars.css`; token→utility mapping is in `tailwind.config.js` and the `@theme` block in `src/index.css`.
- **Print styles** — the résumé's one-page PDF output is controlled by the `@media print` block at the bottom of `src/index.css`.

## 🎓 Key Learnings & Best Practices

- **Component architecture** — reusable, composable components with a shared UI kit (`components/ui`)
- **Type safety** — interfaces and generics across data models (magazine entries, AviationPro state)
- **Theming at scale** — CSS custom properties + Tailwind tokens for consistent light/dark theming across an embedded sub-app
- **Responsive design** — mobile-first with iPhone SE as the minimum target; verified print layout via headless Chrome
- **Performance** — code splitting, lazy-loaded routes, optimized bundles
- **Accessibility** — semantic HTML, ARIA labels on icon-only controls, keyboard-navigable UI

## 🌟 React vs. Original HTML/CSS/JS Version

| Aspect | This repo (React/TS/Tailwind) | Original (HTML/CSS/JS) |
|--------|-------------------------------|------------------------|
| Architecture | Component-based, reusable | Monolithic pages with inline scripts |
| Styling | Tailwind utilities + theme tokens | Custom CSS files |
| Type safety | Full TypeScript | Vanilla JavaScript |
| State | React hooks & context | DOM manipulation / globals |
| Routing | React Router (SPA) | Multi-page / hash routing |
| Build | Vite (HMR, optimized bundles) | Static serving |

Together they show progression from foundational web development to modern, scalable application architecture.

---

## 🚀 CI/CD & Deployment — The 4-Hour Battle (Sept 2026)

> **TL;DR:** We spent ~4 hours and **20 GitHub Actions runs** getting auto-deploy from GitHub → Hostinger working. Here's the full story so future-me (or anyone else) doesn't have to repeat it.

### The Goal

Push to `main` on GitHub → CI builds the project → clean production files get pushed to a `deploy` branch → Hostinger Git auto-pulls into `public_html/`. Zero manual uploads.

### What Worked (The Final Architecture)

```
git push origin main
  │
  ▼
GitHub Actions (ci.yml)
  ├── Build job: npm ci + vite build → dist/
  └── Deploy job:
        ├── Fresh `git init` in /tmp/deploy-repo  ← KEY FIX
        ├── Copy dist/* into it
        ├── Commit
        └── Push to 'deploy' branch using PAT (DEPLOY_TOKEN secret)
              │
              ▼
         Hostinger Git → pulls 'deploy' branch → public_html/ ✅
```

### The 20 Failures & What They Taught Us

| # | Attempt | Why It Failed |
|---|---------|---------------|
| 1–3 | `mod_proxy` in `.htaccess` for API CORS | Hostinger shared hosting doesn't reliably support `mod_proxy`; also had a separate hardcoded URL bypassing the proxy |
| 4 | `npm ci` peer dep conflict | `typescript@^7.0.2` vs `typescript-eslint@8.x` requiring `<6.1.0` → fixed with `.npmrc` (`legacy-peer-deps=true`) + pinned TS version |
| 5–6 | `package-lock.json` out of sync | Changed `package.json` without regenerating lock file → `npm ci` rejected it |
| 7–8 | Deploy job: no `.git` directory | Missing `actions/checkout` in deploy job → `fatal: not in a git directory` (exit 128) |
| 9–10 | `dist/` deleted before copy | `find . -maxdepth 1 ! -name '.git' -exec rm -rf {} +` wiped **everything** including `dist/`, then tried to copy from it. Fixed by excluding `dist` from the wipe, or saving to `/tmp` first |
| 11–14 | `GITHUB_TOKEN` → 403 Forbidden | Hostinger's GitHub App installation restricted the built-in token's write access. Error: `Permission denied to github-actions[bot]` |
| 15–16 | Token in URL → "Malformed input" | Git's URL parser choked on the PAT (likely special chars or hidden whitespace) |
| 17 | `git push -H` (header auth) | `unknown switch 'H'` — not supported in the runner's git version |
| 18–19 | Credential helper + remote set-url | Git kept falling back to cached `GITHUB_TOKEN` from `actions/checkout` instead of using our PAT |
| **20** | **Fresh `git init` in `/tmp`** ✅ | **No cached state, no prior remotes, PAT is the ONLY auth method. Finally worked.** |

### Key Fixes (Checklist for Reproduction)

- [x] **`.npmrc`** with `legacy-peer-deps=true` — permanent fix for typescript-eslint peer dep conflict
- [x] **Pinned `typescript: "7.0.2"`** (exact, not `^`) in `package.json`
- [x] **`package-lock.json` regenerated** after any `package.json` change
- [x] **PHP API proxy** (`public/api/proxy.php`) — server-side cURL fetch for aviationweather.gov (CORS bypass)
- [x] **`.htaccess`** routes `/aviationweather/*` → `/api/proxy.php` via rewrite
- [x] **Repo settings**: `GITHUB_TOKEN` set to **Read and write** permissions (Settings → Secrets → Actions)
- [x] **PAT** (`DEPLOY_TOKEN` secret) with `repo` scope — used as the push auth method
- [x] **Deploy job creates fresh git repo** in `/tmp/deploy-repo` — avoids all cached credentials from `actions/checkout`
- [x] **Hostinger Git** connected to `deploy` branch → `public_html/`

### What's Next

- [ ] **Monitor first few auto-deploys** — confirm Hostinger pulls reliably on every push
- [ ] **Set PAT expiration reminder** — regenerate `DEPLOY_TOKEN` before it expires (update repo secret)
- [ ] **Add a deploy status badge** to README (optional: use shields.io with GitHub Actions status)
- [ ] **Consider migrating to a VPS or edge host** (Cloudflare Pages, Vercel, Railway) for faster global delivery + built-in CI/CD without the git-branch dance
- [ ] **Add preview deployments** for PRs (push to a `preview` branch, Hostinger subdomain)
- [ ] **Clean up**: remove the 20 failed workflow runs from GitHub Actions history (optional, cosmetic)
