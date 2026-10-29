# Robert Fernandez — Portfolio

A React, TypeScript, and Tailwind portfolio: a curated catalogue of work across web, desktop, mobile, Wear OS, embedded displays, games, and retro consoles; a résumé with a US Letter print stylesheet; an in-browser flight-planning suite; and live NOAA aviation telemetry.

[![Robert Fernandez — Developer, Designer, Pilot](public/assets/home/banner.webp)](https://robertfernandez.dev)

**Canonical personal site:** [https://robertfernandez.dev](https://robertfernandez.dev)

This repository is the source of that site. A push to `main` builds the app in GitHub Actions and publishes the production files to the `deploy` branch, which Hostinger serves.

Robert Fernandez · [robfernan](https://github.com/robfernan)

## Run it locally

Node.js 22, the version CI uses. Vite 8 also accepts Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

The dev server is [http://localhost:5173](http://localhost:5173). Requests under `/aviationweather` are proxied to aviationweather.gov so the live METAR telemetry and weather tools work on your machine without CORS errors. In production, Hostinger serves a same-origin PHP proxy (`/api/proxy.php`) for the same data.

```bash
npm run typecheck
npm run build
npm run preview
```

| Script | Command |
| --- | --- |
| `dev` | `vite` |
| `typecheck` | `tsc --noEmit` |
| `build` | `tsc --noEmit && vite build` |
| `preview` | `vite preview` |

## On the site

| Route | Page |
| --- | --- |
| `/` | Home — hero, disciplines & pillars, live NOAA telemetry ribbon, and a "Now Building" showcase with quick-preview modals |
| `/works` | Works catalogue. `/work` and `/projects` open the same page. |
| `/aviation` | AviationPro (tailored in-site preview): nav log, CX-6 computer, weather, weight and balance, navigation, and flight logs |
| `/resume` | Résumé. Print styles target a US Letter page. |
| `/streaming` | Streaming |

**AviationPro — two versions.** The route above is the tailored in-site preview. The full product (web, desktop, Android EFB, Wear OS) lives at [https://robfernan.github.io/AviationPro](https://robfernan.github.io/AviationPro). Both are linked from the home page and the Works catalogue.

**Games.** Sportsman's Quest (Godot 4) is featured on the home page and in the Works catalogue, with a "Play now" link to [itch.io](https://mungdaal321.itch.io/sportsman-quest) and source at [robfernan/sportsmans-quest](https://github.com/robfernan/sportsmans-quest).

The header switches four themes — Minimal, Slate, Midnight, and 90s — plus light and dark mode. The active theme and color scheme are applied before first paint (no flash of the wrong theme) and persisted to `localStorage`.

## Stack

React 19, TypeScript, Tailwind CSS 4, Vite 8, and React Router 6. Route-level code splitting keeps the initial bundle lean; a dedicated error boundary isolates the AviationPro suite. The flight logbook is stored with Dexie. Playfair Display and Font Awesome are self-hosted. Lucide supplies additional icons.

## Star

If this is a useful reference for a Vite and React portfolio, a star helps other people find it.

## License

[MIT](LICENSE) © 2026 Robert Fernandez