import { Link } from 'react-router-dom';
import type { ThemeKey } from '@/context/ThemeContext';

interface ThemeOption {
  key: ThemeKey;
  label: string;
  icon: string;
}

interface HeaderProps {
  displayName: string;
  theme: ThemeKey;
  darkMode: boolean;
  themes: ThemeOption[];
  setTheme: (theme: ThemeKey) => void;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  displayName,
  theme,
  darkMode,
  themes,
  setTheme,
  toggleDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  return (
    <header className="border-b border-theme-accent/15 dark:border-theme-accent-dark bg-theme-header dark:bg-theme-header-dark shadow-sm transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-theme-primary dark:text-theme-primary-dark hover:underline"
          >
            {displayName}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/works" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-action font-medium transition-colors focus-visible:ring-2 focus-visible:ring-theme-action rounded-md px-1">
              Works
            </Link>
            <Link to="/aviation" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-action font-medium transition-colors focus-visible:ring-2 focus-visible:ring-theme-action rounded-md px-1">
              Aviation
            </Link>
            <Link to="/streaming" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-action font-medium transition-colors focus-visible:ring-2 focus-visible:ring-theme-action rounded-md px-1">
              Streaming
            </Link>
            <Link to="/resume" className="text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-action font-medium transition-colors focus-visible:ring-2 focus-visible:ring-theme-action rounded-md px-1">
              Resume
            </Link>
          </div>

          {/* Theme Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {themes.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTheme(t.key)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-theme-action ${
                  theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''
                }`}
                aria-label={`Switch to ${t.label} theme`}
                aria-pressed={theme === t.key}
                title={t.label}
              >
                <i className={`fas ${t.icon}`}></i>
              </button>
            ))}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="ml-2 w-9 h-9 flex items-center justify-center rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-theme-action"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-theme-primary dark:text-theme-primary-dark focus-visible:ring-2 focus-visible:ring-theme-action"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
          <div id="mobile-navigation" className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              to="/works"
              className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
              onClick={() => setMobileMenuOpen(false)}
            >
              Works
            </Link>
            <Link
              to="/aviation"
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
                  {themes.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTheme(t.key)}
                      className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-theme-action ${
                        theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''
                      }`}
                      aria-label={`Switch to ${t.label} theme`}
                      aria-pressed={theme === t.key}
                      title={t.label}
                    >
                      <i className={`fas ${t.icon} text-sm`}></i>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-theme-action"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
