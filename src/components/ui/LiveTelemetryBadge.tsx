import { useState, useEffect } from 'react';

/**
 * Editorial live telemetry pill (Local Time, Aviation status, Systems Online)
 * Implements the editorial telemetry pattern common in SOTD developer portfolios.
 */
export default function LiveTelemetryBadge() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-theme-accent/30 dark:border-theme-accent-dark/40 bg-theme-card/60 dark:bg-theme-card-dark/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-mono-tech text-theme-secondary dark:text-theme-secondary-dark shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-semibold tracking-wider text-theme-primary dark:text-theme-primary-dark">
        SYSTEMS ONLINE
      </span>
      <span className="opacity-40">|</span>
      <span>{timeStr || '00:00:00 UTC'}</span>
    </div>
  );
}
