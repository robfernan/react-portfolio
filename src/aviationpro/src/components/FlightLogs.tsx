import { CheckCircle2, Circle, Clock, FileText, Moon, Plane, Route, User, Users } from 'lucide-react';

// --- PPL Requirements Data (FAA 14 CFR §61.87) ---
interface RequirementItem {
  id: string;
  label: string;
  requirement: string;
  current: number;
  minimum: number;
  unit: string;
  met: boolean;
  note?: string;
}

const PPL_REQUIREMENTS: RequirementItem[] = [
  {
    id: 'total-time',
    label: 'Total Flight Time',
    requirement: '40 hrs minimum total time',
    current: 126.7,
    minimum: 40,
    unit: 'hrs',
    met: true,
    note: 'Well above the 40-hour minimum'
  },
  {
    id: 'dual-time',
    label: 'Dual Instruction',
    requirement: '20 hrs dual instruction',
    current: 116.7,
    minimum: 20,
    unit: 'hrs',
    met: true,
    note: 'Includes all instructor-supervised flights'
  },
  {
    id: 'solo-time',
    label: 'Solo Flight Time',
    requirement: '10 hrs solo flight time',
    current: 10.0,
    minimum: 10,
    unit: 'hrs',
    met: true,
    note: 'Meets the 10-hour solo minimum exactly'
  },
  {
    id: 'xc-time',
    label: 'Cross Country Time',
    requirement: '20 hrs cross country (incl. dual XC)',
    current: 22.7,
    minimum: 20,
    unit: 'hrs',
    met: true,
    note: 'Includes both solo and dual cross-country'
  },
  {
    id: 'solo-xc-time',
    label: 'Solo Cross Country Time',
    requirement: '5 hrs solo XC (incl. one 150nm flight)',
    current: 4.7,
    minimum: 5,
    unit: 'hrs',
    met: false,
    note: 'Need 0.3 more hours to meet the 5-hour minimum'
  },
  {
    id: 'night-time',
    label: 'Night Flight Training',
    requirement: '3 hrs night flight training (after sunset / before sunrise)',
    current: 3.7,
    minimum: 3,
    unit: 'hrs',
    met: true,
    note: 'Completed — exceeds the 3-hour night minimum'
  },
  {
    id: 'night-landings',
    label: 'Night Takeoffs & Landings',
    requirement: '10 takeoffs and full-stop landings at night',
    current: 10,
    minimum: 10,
    unit: '',
    met: true,
    note: 'Completed'
  },
  {
    id: 'sim-instruments',
    label: 'Simulated Instruments',
    requirement: '3 hrs simulated instrument time (dual)',
    current: 3.0,
    minimum: 3,
    unit: 'hrs',
    met: true,
    note: 'Completed'
  },
  {
    id: 'tower-ops',
    label: 'Tower Operations',
    requirement: 'Solo takeoffs and full-stop landings at a towered airport',
    current: 3,
    minimum: 1,
    unit: '',
    met: true,
    note: 'Completed 7/30/2026 — F45 → KFPR → F45'
  }
];

const FlightLogs: React.FC = () => {
  const asOfDate = '8/4/2026';

  // Summary stats
  const totalHours = 126.7;
  const soloHours = 10.0;
  const xcHours = 22.7;
  const soloXcHours = 4.7;
  const simInstrHours = 3.0;

  // Calculate progress for each requirement
  const getProgress = (item: RequirementItem) => {
    if (item.met) return 100;
    return Math.min(99, Math.round((item.current / item.minimum) * 100));
  };

  const remainingFor = (item: RequirementItem) => {
    if (item.met) return null;
    return Math.max(0, item.minimum - item.current);
  };

  // Count met vs not met
  const metCount = PPL_REQUIREMENTS.filter(r => r.met).length;
  const totalCount = PPL_REQUIREMENTS.length;

  return (
    <div className="max-w-[1200px] mx-auto w-full space-y-6">
      {/* Header */}
      <div className="bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-theme-accent dark:text-theme-accent-dark" />
              <h2 className="text-xl sm:text-2xl font-bold text-theme-primary dark:text-theme-primary-dark">Flight Log Preview</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-theme-accent/15 dark:bg-theme-accent-dark/20 border border-theme-accent/40 dark:border-theme-accent-dark/40">
              <CheckCircle2 className="w-4 h-4 text-theme-accent dark:text-theme-accent-dark" />
              <span className="text-xs font-black uppercase tracking-widest text-theme-primary dark:text-theme-primary-dark">{metCount}/{totalCount} Requirements Met</span>
            </div>
          </div>
          <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark mt-2">
            Read-only preview of your current flight hours and PPL progress. As of {asOfDate}.
          </p>
        </div>

        {/* Hour Summary Cards */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-theme-bg dark:bg-theme-bg-dark rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 text-center">
              <Clock className="w-5 h-5 mx-auto mb-2 text-theme-accent dark:text-theme-accent-dark" />
              <div className="text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Total Flight Hours</div>
              <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark tabular-nums">{totalHours}</div>
            </div>
            <div className="p-4 bg-theme-bg dark:bg-theme-bg-dark rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 text-center">
              <User className="w-5 h-5 mx-auto mb-2 text-theme-accent dark:text-theme-accent-dark" />
              <div className="text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Solo Hours</div>
              <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark tabular-nums">{soloHours}</div>
            </div>
            <div className="p-4 bg-theme-bg dark:bg-theme-bg-dark rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 text-center">
              <Route className="w-5 h-5 mx-auto mb-2 text-theme-accent dark:text-theme-accent-dark" />
              <div className="text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Cross Country</div>
              <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark tabular-nums">{xcHours}</div>
            </div>
            <div className="p-4 bg-theme-bg dark:bg-theme-bg-dark rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 text-center">
              <Users className="w-5 h-5 mx-auto mb-2 text-theme-accent dark:text-theme-accent-dark" />
              <div className="text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Sim Instruments</div>
              <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark tabular-nums">{simInstrHours}</div>
            </div>
            <div className="p-4 bg-theme-bg dark:bg-theme-bg-dark rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 text-center">
              <Moon className="w-5 h-5 mx-auto mb-2 text-theme-accent dark:text-theme-accent-dark" />
              <div className="text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Night Hours</div>
              <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark tabular-nums">{PPL_REQUIREMENTS.find(r => r.id === 'night-time')?.current}</div>
            </div>
          </div>

          {/* Solo Cross Country detail */}
          <div className="p-4 bg-theme-bg/50 dark:bg-theme-bg-dark/50 rounded-lg border border-theme-accent/20 dark:border-theme-accent-dark/20">
            <div className="flex items-center gap-3 text-sm text-theme-secondary dark:text-theme-secondary-dark">
              <Route className="w-4 h-4 text-theme-accent dark:text-theme-accent-dark shrink-0" />
              <span>
                Solo Cross Country: <strong className="text-theme-primary dark:text-theme-primary-dark">{soloXcHours} hrs</strong> of {xcHours} total cross-country hours. Need <strong className="text-theme-accent dark:text-theme-accent-dark">0.3 more hrs</strong> to meet the 5-hour solo XC minimum.
              </span>
            </div>
          </div>

          {/* Tower Operations note */}
          <div className="p-4 bg-theme-bg/50 dark:bg-theme-bg-dark/50 rounded-lg border border-theme-accent/20 dark:border-theme-accent-dark/20">
            <div className="flex items-center gap-3 text-sm text-theme-secondary dark:text-theme-secondary-dark">
              <CheckCircle2 className="w-4 h-4 text-theme-accent dark:text-theme-accent-dark shrink-0" />
              <span>
                Tower Operations: <strong className="text-theme-primary dark:text-theme-primary-dark">3 solo takeoffs & full-stop landings</strong> completed on 7/30/2026 (F45 → KFPR → F45). ✓ Requirement met.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PPL Requirements Checklist */}
      <div className="bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 p-6">
          <div className="flex items-center space-x-3">
            <Plane className="w-5 h-5 text-theme-accent dark:text-theme-accent-dark" />
            <h3 className="text-lg font-bold text-theme-primary dark:text-theme-primary-dark">Private Pilot License — Hour Requirements</h3>
          </div>
          <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark mt-1">FAA 14 CFR §61.87(a) — Minimum flight time for PPL (2026)</p>
        </div>

        <div className="p-6 space-y-3">
          {PPL_REQUIREMENTS.map((item) => {
            const progress = getProgress(item);
            const remaining = remainingFor(item);
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-header dark:bg-theme-header-dark transition-all"
              >
                {/* Status Icon */}
                <div className="shrink-0">
                  {item.met ? (
                    <CheckCircle2 className="w-6 h-6 text-theme-accent dark:text-theme-accent-dark" />
                  ) : (
                    <Circle className="w-6 h-6 text-theme-secondary dark:text-theme-secondary-dark" />
                  )}
                </div>

                {/* Label & Requirement */}
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm uppercase tracking-wide text-theme-primary dark:text-theme-primary-dark">{item.label}</div>
                  <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark mt-0.5">{item.requirement}</div>
                  {item.note && (
                    <div className="text-[11px] mt-1 italic text-theme-secondary dark:text-theme-secondary-dark">
                      {item.note}
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-28 sm:w-36">
                    <div className="h-2 bg-theme-bg dark:bg-theme-bg-dark rounded-full overflow-hidden border border-theme-accent/20 dark:border-theme-accent-dark/20">
                      <div
                        className="h-full rounded-full transition-all duration-700 bg-theme-accent dark:bg-theme-accent-dark"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <span className="font-black tabular-nums text-sm text-theme-primary dark:text-theme-primary-dark">
                      {item.current}{item.unit && ` ${item.unit}`}
                    </span>
                    <span className="text-[10px] text-theme-secondary dark:text-theme-secondary-dark ml-1">/ {item.minimum}{item.unit}</span>
                  </div>
                </div>

                {/* Remaining */}
                {!item.met && remaining !== null && (
                  <div className="shrink-0 px-3 py-1 rounded-md bg-theme-accent/15 dark:bg-theme-accent-dark/20 border border-theme-accent/40 dark:border-theme-accent-dark/40">
                    <span className="text-[10px] font-black uppercase tracking-widest text-theme-accent dark:text-theme-accent-dark">
                      {remaining.toFixed(1)} {item.unit} remaining
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="p-6 border-t border-theme-accent/20 dark:border-theme-accent-dark/20 bg-theme-bg/30 dark:bg-theme-bg-dark/30">
          <h4 className="text-xs font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-4 flex items-center">
            <Plane className="w-4 h-4 mr-2" /> Recommendations to Complete PPL Requirements
          </h4>
          <div className="space-y-3 text-sm text-theme-secondary dark:text-theme-secondary-dark">
            <div className="flex items-start gap-3 p-3 rounded-md bg-theme-accent/10 dark:bg-theme-accent-dark/15 border border-theme-accent/25 dark:border-theme-accent-dark/25">
              <span className="font-black text-theme-accent dark:text-theme-accent-dark shrink-0">1.</span>
              <span><strong>Solo Cross Country:</strong> You need 0.3 more hours of solo XC time. Plan a short solo cross-country flight (even 25–50 nm) to close this gap. This is the quickest requirement to complete.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-md bg-theme-accent/10 dark:bg-theme-accent-dark/15 border border-theme-accent/25 dark:border-theme-accent-dark/25">
              <span className="font-black text-theme-accent dark:text-theme-accent-dark shrink-0">✓</span>
              <span><strong>Night Training:</strong> You have 3.7 of the required 3 night hours — already met. Keep building night experience for proficiency, but no further action is needed to satisfy this PPL minimum.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-md bg-theme-accent/10 dark:bg-theme-accent-dark/15 border border-theme-accent/25 dark:border-theme-accent-dark/25">
              <span className="font-black text-theme-accent dark:text-theme-accent-dark shrink-0">✓</span>
              <span><strong>Tower Ops:</strong> Already completed (F45 → KFPR → F45 on 7/30/2026). No further action needed.</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-md bg-theme-accent/10 dark:bg-theme-accent-dark/15 border border-theme-accent/25 dark:border-theme-accent-dark/25">
              <span className="font-black text-theme-accent dark:text-theme-accent-dark shrink-0">✓</span>
              <span><strong>Simulated Instruments:</strong> 3.0 hrs completed. No further action needed.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-[10px] font-black uppercase tracking-widest text-theme-secondary/50 dark:text-theme-secondary-dark/50 py-4">
        Flight hours as of {asOfDate} · FAA Part 61.87(a) PPL Requirements · Read-only preview
      </p>
    </div>
  );
};

export default FlightLogs;
