# Robert Fernandez — Portfolio

A React, TypeScript, and Tailwind portfolio: selected work, a résumé with a US Letter print stylesheet, and an in-browser flight-planning suite.

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

The dev server is [http://localhost:5173](http://localhost:5173). Requests under `/aviationweather` are proxied to aviationweather.gov so the weather tools work on your machine.

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
| `/` | Home |
| `/works` | Works catalogue. `/work` and `/projects` open the same page. |
| `/aviation` | AviationPro: nav log, CX-6 computer, weather, weight and balance, navigation, and flight logs |
| `/resume` | Résumé. Print styles target a US Letter page. |
| `/streaming` | Streaming |

The header switches four themes — Minimal, Slate, Midnight, and 90s — plus light and dark mode.

## Stack

React 19, TypeScript, Tailwind CSS 4, Vite 8, and React Router 6. The flight logbook is stored with Dexie. Playfair Display and Font Awesome are self-hosted. Lucide supplies additional icons.

## Star

If this is a useful reference for a Vite and React portfolio, a star helps other people find it.

## License

[MIT](LICENSE) © 2026 Robert Fernandez
