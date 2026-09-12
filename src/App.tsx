import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PortfolioHome from './PortfolioHome';
import Magazine from './magazine/Magazine';
import Streaming from './Streaming';
import Resume from './Resume';
// Lazy-load AviationPro — it's a heavy sub-app (calculators, weather, flight planning)
// that only 1-2% of visitors need. Keeps the main bundle lean for everyone else.
const AviationProApp = React.lazy(() => import('./aviationpro/AviationProApp'));

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
import Footer from './Footer';
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
    const isAviationPro = location.pathname.startsWith('/aviationpro');
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
        '/works': 'Works · Robert Fernandez Portfolio',
        '/aviationpro': 'AviationPro — Flight Planning Suite · Robert Fernandez',
        '/streaming': 'Streaming · MungDaal321',
        '/resume': 'Résumé · Robert Fernandez',
    };
    
    React.useEffect(() => {
        const base = location.pathname.split('/')[1] || '';
        document.title = pageTitles[base] ?? (isAviationPro ? pageTitles['/aviationpro'] : 'Robert Fernandez — Portfolio');
    }, [location.pathname, isAviationPro]);

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
                {/* Skip link: first focusable element for keyboard / screen-reader users */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-theme-action focus:text-white focus:font-semibold">
                    Skip to content
                </a>
                <header className="border-b border-theme-accent/15 dark:border-theme-accent-dark bg-theme-header dark:bg-theme-header-dark shadow-sm transition-colors duration-300">
                    <nav className="max-w-7xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="text-xl font-bold text-theme-primary dark:text-theme-primary-dark hover:underline">{displayName}</Link>
                            
                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-6">
                                <Link to="/works" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Works</Link>
                                <Link to="/aviationpro" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Aviation</Link>
                                <Link to="/streaming" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Streaming</Link>
                                <Link to="/resume" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Resume</Link>
                            </div>

                            {/* Theme Controls */}
                            <div className="hidden md:flex items-center space-x-2">
                                {themes.map(t => (
                                    <button
                                        key={t.key}
                                        onClick={() => setTheme(t.key)}
                                        className={`p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300 ${theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''}`}
                                        aria-label={`Switch to ${t.label} theme`}
                                        title={t.label}
                                    >
                                        <i className={`fas ${t.icon}`}></i>
                                    </button>
                                ))}
                                <button
                                    onClick={toggleDarkMode}
                                    className="ml-2 p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300"
                                    aria-label="Toggle dark mode"
                                >
                                    {darkMode ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                                    )}
                                </button>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-theme-primary dark:text-theme-primary-dark"
                                aria-label="Toggle menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="md:hidden mt-4 pb-4 space-y-3">
                                <Link 
                                    to="/works" 
                                    className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Works
                                </Link>
                                <Link 
                                    to="/aviationpro" 
                                    className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Aviation
                                </Link>
                                <Link 
                                    to="/streaming" 
                                    className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Streaming
                                </Link>
                                <Link 
                                    to="/resume" 
                                    className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Resume
                                </Link>

                                {/* Mobile Theme Controls */}
                                <div className="pt-4 border-t border-theme-accent/20 dark:border-theme-accent-dark/20">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Theme</span>
                                        <div className="flex items-center space-x-2">
                                            {themes.map(t => (
                                                <button
                                                    key={t.key}
                                                    onClick={() => setTheme(t.key)}
                                                    className={`p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300 ${theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''}`}
                                                    aria-label={`Switch to ${t.label} theme`}
                                                    title={t.label}
                                                >
                                                    <i className={`fas ${t.icon} text-xs`}></i>
                                                </button>
                                            ))}
                                            <button
                                                onClick={toggleDarkMode}
                                                className="p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300"
                                                aria-label="Toggle dark mode"
                                            >
                                                {darkMode ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>
                <main id="main-content" tabIndex={-1} className="flex-1 pb-24 focus:outline-none">
                    <Routes>
                        <Route path="/" element={<PortfolioHome />} />
                        <Route path="/works" element={<Magazine />} />
                        <Route path="/work" element={<Magazine />} />
                        {/* Legacy routes now render the unified catalogue */}
                        <Route path="/projects" element={<Magazine />} />
                        <Route path="/aviationpro/*" element={
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
                        <Route path="/streaming" element={<Streaming />} />
                        <Route path="/resume" element={<Resume />} />
                        {/* Catch-all: styled 404 for any unknown route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                {!isAviationPro && <Footer theme={theme} />}
                {!isAviationPro && <BackToTop />}
            </div>
        </ThemeProvider>
    );
}