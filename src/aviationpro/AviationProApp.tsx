import React, { useState, useEffect } from 'react';
import { Calculator, Plane, Wind, MapPin, Navigation, FileText } from 'lucide-react';
// Code-split each tab so only the active tool's code downloads on first visit.
const FlightPlanForm = React.lazy(() => import('./src/components/FlightPlanForm'));
const WeatherCalculator = React.lazy(() => import('./src/components/WeatherCalculator'));
const WeightBalanceCalculator = React.lazy(() => import('./src/components/WeightBalanceCalculator'));
const CX6Calculator = React.lazy(() => import('./src/components/CX6Calculator'));
const NavigationTools = React.lazy(() => import('./src/components/NavigationTools'));
const FlightLogs = React.lazy(() => import('./src/components/FlightLogs'));

/** Small spinner shown while a tab's code-split chunk streams in. */
function TabFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-theme-accent/40 dark:border-theme-accent-dark border-t-theme-action dark:border-t-theme-action-dark" />
    </div>
  );
}

function AviationProApp() {
  // Restore the last active tab from localStorage so a refresh (or returning to the site)
  // lands you on the exact tool you were using — not always back at Flight Planner.
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window === 'undefined') return 'planner';
    const saved = localStorage.getItem('avpro-active-tab');
    const valid = ['planner', 'cx6', 'weather', 'performance', 'navigation', 'logs'];
    return saved && valid.includes(saved) ? saved : 'planner';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('avpro-active-tab', activeTab);
    }
  }, [activeTab]);

  const tabs = [
    { id: 'planner', label: 'NavLog', icon: Navigation },
    { id: 'cx6', label: 'CX-6 Computer', icon: Calculator },
    { id: 'weather', label: 'Weather Tools', icon: Wind },
    { id: 'performance', label: 'W&B', icon: Plane },
    { id: 'navigation', label: 'Navigation', icon: MapPin },
    { id: 'logs', label: 'Flight Logs', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark text-theme-primary dark:text-theme-primary-dark">
      <header className="border-b border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-header dark:bg-theme-header-dark">
        <div className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-1 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-lg sm:text-2xl font-bold text-theme-primary dark:text-theme-primary-dark flex-shrink-0"><span className="lg:hidden">AVPRO</span><span className="hidden lg:inline">AviationPro</span></h1>
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark text-theme-secondary dark:text-theme-secondary-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              129.2 Flight Hours · Student Pilot EFB
            </span>
          </div>
          <nav className="flex gap-0.5 flex-1 justify-center overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center justify-center p-1 sm:p-2 lg:px-4 lg:py-2 rounded text-xs sm:text-sm lg:text-base font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-theme-accent dark:bg-theme-accent-dark text-white' 
                    : 'bg-theme-card dark:bg-theme-card-dark text-theme-secondary dark:text-theme-secondary-dark hover:bg-theme-accent/10 dark:hover:bg-theme-accent-dark/10'
                }`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        <React.Suspense fallback={<TabFallback />}>
          {activeTab === 'planner' && <FlightPlanForm />}
          {activeTab === 'cx6' && <CX6Calculator />}
          {activeTab === 'weather' && <WeatherCalculator />}
          {activeTab === 'performance' && <WeightBalanceCalculator />}
          {activeTab === 'navigation' && <NavigationTools />}
          {activeTab === 'logs' && <FlightLogs />}
        </React.Suspense>
      </main>
      <aside className="w-full py-5 bg-theme-header dark:bg-theme-header-dark border-t border-theme-accent/30 dark:border-theme-accent-dark/30 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-theme-secondary dark:text-theme-secondary-dark">
            This in-browser suite is a tailored preview for this portfolio. For the complete, standalone open-source suite with offline PWA support and full feature set, explore the repository:
          </p>
          <a
            href="https://github.com/robfernan/AviationPro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-theme-accent/40 dark:border-theme-accent-dark text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10 dark:hover:bg-theme-card-dark transition-colors text-xs sm:text-sm font-semibold flex-shrink-0"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 015.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span>robfernan/AviationPro on GitHub</span>
          </a>
        </div>
      </aside>
    </div>
  );
}

export default AviationProApp;
