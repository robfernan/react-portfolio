import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import PortfolioHome from '@/pages/Home/PortfolioHome';
import Magazine from '@/pages/Works/Magazine';
import Streaming from '@/pages/Streaming/Streaming';
import Resume from '@/pages/Resume/Resume';
import Header from '@/components/layout/Header';
// Lazy-load AviationPro — it's a heavy sub-app (calculators, weather, flight planning)
// that only 1-2% of visitors need. Keeps the main bundle lean for everyone else.
const AviationProApp = React.lazy(() => import('@/pages/Aviation/AviationProApp'));

/** Error boundary — if AviationPro crashes, show a clean fallback instead of white-screening the whole site. */
class AviationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <p className="font-mono-tech text-sm tracking-widest uppercase text-theme-accent">AviationPro</p>
          <h2 className="mt-3 text-2xl font-bold text-theme-primary dark:text-theme-secondary-dark">Something went wrong</h2>
          <p className="mt-2 max-w-md text-sm text-theme-secondary dark:text-theme-secondary-dark">
            The flight planning suite hit an unexpected error. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 rounded-lg bg-theme-action dark:bg-theme-action-dark text-white font-semibold"
          >
            Reload AviationPro
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import Footer from '@/components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import { ThemeProvider, type ThemeKey } from './context/ThemeContext';

/** Styled 404 for unknown routes (e.g. /resum) so typos don't hit a blank screen. */
function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="font-mono-tech text-sm tracking-[0.3em] uppercase text-theme-accent dark:text-theme-secondary-dark">Error 404</p>
            <h1 className="mt-4 text-5xl sm:text-7xl font-black leading-none text-theme-primary dark:text-theme-secondary-dark">Lost in the clouds</h1>
            <p className="mt-4 max-w-md text-base text-theme-secondary dark:text-theme-secondary-dark">
                That page doesn't exist. Let's get you back to base.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-theme-action dark:bg-theme-action-dark text-white font-semibold hover:opacity-90 transition-opacity">Back home</Link>
                <Link to="/works" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-theme-primary dark:text-theme-secondary-dark font-medium hover:bg-theme-accent/10 transition-colors">See the work</Link>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const isStreaming = location.pathname.startsWith('/streaming');
    const displayName = isStreaming ? 'MungDaal321' : 'Robert Fernandez';

    // Theme and dark mode state
    const [darkMode, setDarkMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('themeMode') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // Per-page document titles — clearer browser tabs + better SEO per route.
    const pageTitles: Record<string, string> = {
        '': 'Robert Fernandez — Cross-Platform Software Engineer & Digital Artist',
        'works': 'Works · Robert Fernandez Portfolio',
        'aviation': 'AviationPro — Electronic Flight Bag · Robert Fernandez',
        'aviationpro': 'AviationPro — Electronic Flight Bag · Robert Fernandez',
        'streaming': 'Streaming · MungDaal321',
        'resume': 'Resume · Robert Fernandez',
    };
    
    React.useEffect(() => {
        const base = location.pathname.split('/')[1] || '';
        document.title = pageTitles[base] ?? 'Robert Fernandez — Portfolio';
    }, [location.pathname]);

    React.useEffect(() => {
        document.documentElement.classList.add('theme-minimal');
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('themeMode', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('themeMode', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(dm => !dm);

    // Theme switching logic
    const themes: { key: ThemeKey; icon: string; label: string }[] = [
        { key: 'minimal', icon: 'fa-circle', label: 'Minimal' },
        { key: 'slate', icon: 'fa-square', label: 'Slate' },
        { key: 'midnight', icon: 'fa-moon', label: 'Midnight' },
        { key: '90s', icon: 'fa-compact-disc', label: '90s' },
    ];

    const [theme, setThemeState] = React.useState<ThemeKey>(() => {
        const htmlClass = document.documentElement.className.match(/theme-([a-z]+)/)?.[1];
        return (htmlClass as ThemeKey) || 'minimal';
    });

    const setTheme = (themeKey: ThemeKey) => {
        document.documentElement.classList.remove(...themes.map(t => `theme-${t.key}`));
        document.documentElement.classList.add(`theme-${themeKey}`);
        setThemeState(themeKey);
    };

    React.useEffect(() => {
        // ensure at least the current theme class exists on load
        if (!document.documentElement.className.includes(`theme-${theme}`)) {
            document.documentElement.classList.add(`theme-${theme}`);
        }
    }, []);

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <ThemeProvider value={{ theme, darkMode, setTheme, toggleDarkMode }}>
            <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300 flex flex-col">
                {/* Scroll-driven reading progress bar */}
                <div id="scroll-progress-bar" aria-hidden="true" />

                {/* Skip link: first focusable element for keyboard / screen-reader users */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-theme-action focus:text-white focus:font-semibold">
                    Skip to content
                </a>
                <Header
                    displayName={displayName}
                    theme={theme}
                    darkMode={darkMode}
                    themes={themes}
                    setTheme={setTheme}
                    toggleDarkMode={toggleDarkMode}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <main id="main-content" tabIndex={-1} className="flex-1 pb-24 focus:outline-none">
                    <Routes>
                        <Route path="/" element={<PortfolioHome />} />
                        <Route path="/works" element={<Magazine />} />
                        <Route path="/work" element={<Magazine />} />
                        {/* Legacy routes now render the unified catalogue */}
                        <Route path="/projects" element={<Magazine />} />
                        <Route path="/aviation/*" element={
                            <AviationErrorBoundary>
                                <React.Suspense fallback={
                                    <div className="flex min-h-[50vh] items-center justify-center">
                                        <p className="font-mono-tech text-sm tracking-widest uppercase text-theme-accent">Loading AviationPro…</p>
                                    </div>
                                }>
                                    <AviationProApp />
                                </React.Suspense>
                            </AviationErrorBoundary>
                        } />
                        <Route path="/aviationpro/*" element={<Navigate to="/aviation" replace />} />
                        <Route path="/streaming" element={<Streaming />} />
                        <Route path="/resume" element={<Resume />} />
                        {/* Catch-all: styled 404 for any unknown route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer theme={theme} />
                <BackToTop />
            </div>
        </ThemeProvider>
    );
}