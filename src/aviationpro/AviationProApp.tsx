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
    { id: 'planner', label: 'Flight Planner', icon: Navigation },
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
          <h1 className="text-lg sm:text-2xl font-bold text-theme-primary dark:text-theme-primary-dark flex-shrink-0"><span className="lg:hidden">AVPRO</span><span className="hidden lg:inline">AviationPro</span></h1>
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
    </div>
  );
}

export default AviationProApp;
