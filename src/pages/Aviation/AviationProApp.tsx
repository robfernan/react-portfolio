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
      <header className="border-b border-theme-accent/25 dark:border-theme-accent-dark/30 bg-theme-header dark:bg-theme-header-dark transition-colors duration-300">
        <div className="px-4 py-2.5 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-theme-primary dark:text-theme-primary-dark">
              AviationPro
            </h1>
          </div>
          <nav className="flex gap-1.5 flex-wrap justify-center sm:justify-end overflow-x-auto no-scrollbar py-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all border flex-shrink-0 ${
                  activeTab === tab.id 
                    ? 'bg-theme-action dark:bg-theme-action-dark text-white border-theme-action dark:border-theme-action-dark shadow-sm' 
                    : 'bg-theme-card dark:bg-theme-card-dark text-theme-secondary dark:text-theme-secondary-dark border-theme-accent/20 dark:border-theme-accent-dark/20 hover:border-theme-accent/50 dark:hover:border-theme-accent-dark/50 hover:text-theme-primary dark:hover:text-theme-primary-dark'
                }`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <React.Suspense fallback={<TabFallback />}>
          {activeTab === 'planner' && <FlightPlanForm />}
          {activeTab === 'cx6' && <CX6Calculator />}
          {activeTab === 'weather' && <WeatherCalculator />}
          {activeTab === 'performance' && <WeightBalanceCalculator />}
          {activeTab === 'navigation' && <NavigationTools />}
          {activeTab === 'logs' && <FlightLogs />}
        </React.Suspense>
      </main>
    </div>
  );
}

export default AviationProApp;
