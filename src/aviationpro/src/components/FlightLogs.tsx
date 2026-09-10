import { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock, Download, Edit2, FileText, Plane, Plus, Search, Trash2 } from 'lucide-react';
import { db } from '../services/PersistenceService';
import { FlightLog } from '../types/aviation';

const FlightLogs: React.FC = () => {
  const [flightLogs, setFlightLogs] = useState<FlightLog[]>([]);
  const [loading, setLoading] = useState(true);

  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    aircraftNNumber: '',
    flightTime: '',
    night: false,
    crossCountry: false,
    solo: false,
    dual: false,
    notes: ''
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editLog, setEditLog] = useState<FlightLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'time-desc' | 'time-asc'>('date-desc');

  // Load and Migrate Data
  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Check for legacy data in localStorage
        const legacyData = localStorage.getItem('flightLogs');
        if (legacyData) {
          const logs = JSON.parse(legacyData);
          if (Array.isArray(logs) && logs.length > 0) {
            // Import legacy logs to Dexie
            for (const log of logs) {
              const { id, ...cleanLog } = log; // Remove string ID to let Dexie assign number
              await db.flights.add({
                ...cleanLog,
                timestamp: cleanLog.timestamp || Date.now()
              });
            }
          }
          // 2. Clear legacy data once migrated
          localStorage.removeItem('flightLogs');
        }

        // 3. Load from Dexie
        const items = await db.flights.toArray();
        setFlightLogs(items);
      } catch (error) {
        console.error("Logbook Migration Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  const refreshLogs = async () => {
    const items = await db.flights.toArray();
    setFlightLogs(items);
  };

  const addFlightLog = async () => {
    if (!newLog.aircraftNNumber.trim() || !newLog.flightTime.trim()) {
      alert('Please fill in aircraft N-number and flight time');
      return;
    }

    try {
      const log: FlightLog = {
        date: newLog.date,
        aircraftNNumber: newLog.aircraftNNumber.toUpperCase(),
        flightTime: newLog.flightTime,
        night: newLog.night,
        crossCountry: newLog.crossCountry,
        solo: newLog.solo,
        dual: newLog.dual,
        notes: newLog.notes,
        timestamp: Date.now()
      };

      await db.flights.add(log);
      await refreshLogs();

      setNewLog({
        date: new Date().toISOString().split('T')[0],
        aircraftNNumber: '',
        flightTime: '',
        night: false,
        crossCountry: false,
        solo: false,
        dual: false,
        notes: ''
      });
      setIsAdding(false);
    } catch (err) {
      console.error("Failed to add flight log:", err);
    }
  };

  const startEditingLog = (log: FlightLog) => {
    if (log.id) {
      setEditingId(log.id);
      setEditLog({ ...log });
    }
  };

  const updateFlightLog = async () => {
    if (!editLog || !editingId) return;
    if (!editLog.aircraftNNumber.trim() || !editLog.flightTime.trim()) {
      alert('Please fill in aircraft N-number and flight time');
      return;
    }

    try {
      await db.flights.update(editingId, {
        ...editLog,
        aircraftNNumber: editLog.aircraftNNumber.toUpperCase()
      });
      await refreshLogs();
      setEditingId(null);
      setEditLog(null);
    } catch (err) {
      console.error("Failed to update log:", err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditLog(null);
  };

  const deleteFlightLog = async (id: number | undefined) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this flight log?')) {
      await db.flights.delete(id);
      await refreshLogs();
    }
  };

  const filteredLogs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const now = Date.now();

    return flightLogs
      .filter((log) => {
        const matchesSearch =
          !term ||
          log.aircraftNNumber.toLowerCase().includes(term) ||
          log.notes.toLowerCase().includes(term) ||
          log.date.includes(term);

        const matchesDate =
          dateFilter === 'all' ||
          (dateFilter === 'today' && log.date === new Date().toISOString().split('T')[0]) ||
          (dateFilter === 'week' && now - log.timestamp <= 7 * 24 * 60 * 60 * 1000) ||
          (dateFilter === 'month' && now - log.timestamp <= 30 * 24 * 60 * 60 * 1000);

        return matchesSearch && matchesDate;
      })
      .sort((a, b) => {
        const dateDelta = new Date(a.date).getTime() - new Date(b.date).getTime();
        const timeDelta = (parseFloat(a.flightTime) || 0) - (parseFloat(b.flightTime) || 0);

        switch (sortBy) {
          case 'date-asc':
            return dateDelta;
          case 'date-desc':
            return -dateDelta;
          case 'time-asc':
            return timeDelta;
          case 'time-desc':
            return -timeDelta;
          default:
            return -dateDelta;
        }
      });
  }, [dateFilter, flightLogs, searchTerm, sortBy]);

  const totalFlightTime = flightLogs.reduce((total, log) => total + (parseFloat(log.flightTime) || 0), 0);
  const averageFlightTime = flightLogs.length > 0 ? totalFlightTime / flightLogs.length : 0;
  const uniqueAircraftCount = new Set(flightLogs.map((log) => log.aircraftNNumber)).size;
  const nightFlightCount = flightLogs.filter((log) => log.night).length;
  const crossCountryCount = flightLogs.filter((log) => log.crossCountry).length;
  const soloFlightCount = flightLogs.filter((log) => log.solo).length;
  const dualFlightCount = flightLogs.filter((log) => log.dual).length;

  const formatFlightTime = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}:${minutes.toString().padStart(2, '0')}`;
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Aircraft N-Number', 'Flight Time (hrs)', 'Night', 'Cross Country', 'Solo', 'Dual', 'Notes'];
    const rows = filteredLogs.map((log) => [
      log.date,
      log.aircraftNNumber,
      log.flightTime,
      log.night ? 'Yes' : 'No',
      log.crossCountry ? 'Yes' : 'No',
      log.solo ? 'Yes' : 'No',
      log.dual ? 'Yes' : 'No',
      `"${log.notes.replace(/"/g, '""')}"`
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flight-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-6 text-theme-secondary dark:text-theme-secondary-dark font-mono">INITIALIZING LOGBOOK...</div>;

  return (
    <div className="rounded-lg shadow-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark">
      <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-theme-accent dark:text-theme-accent-dark" />
            <h2 className="text-2xl font-bold text-theme-primary dark:text-theme-primary-dark">Flight Logs</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Total Flight Time</div>
            <div className="text-xl font-bold text-theme-accent dark:text-theme-accent-dark">
              {formatFlightTime(totalFlightTime)} hrs
            </div>
          </div>
        </div>
        <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark mt-2">Log and track your flight hours with detailed records.</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
          <h3 className="text-lg font-semibold text-theme-primary dark:text-theme-primary-dark">Flight Records</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 bg-theme-header dark:bg-theme-header-dark hover:opacity-80 text-theme-primary dark:text-theme-primary-dark"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Cancel' : 'Add Flight'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6 lg:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-secondary dark:text-theme-secondary-dark" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search aircraft, notes, or date"
              className="w-full pl-10 pr-3 py-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
            className="w-full px-3 py-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark"
          >
            <option value="all">All dates</option>
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full px-3 py-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark"
          >
            <option value="date-desc">Newest first</option>
            <option value="date-asc">Oldest first</option>
            <option value="time-desc">Longest flights</option>
            <option value="time-asc">Shortest flights</option>
          </select>
        </div>

        {isAdding && (
          <div className="mb-6 p-4 rounded-lg bg-theme-header dark:bg-theme-header-dark border border-theme-accent/30 dark:border-theme-accent-dark/30">
            <h4 className="font-black uppercase tracking-widest text-xs mb-4 text-theme-secondary dark:text-theme-secondary-dark">Add New Flight Log</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  value={newLog.date}
                  onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  <Plane className="w-3 h-3 inline mr-1" />
                  Aircraft N-Number
                </label>
                <input
                  type="text"
                  placeholder="N12345"
                  value={newLog.aircraftNNumber}
                  onChange={(e) => setNewLog({ ...newLog, aircraftNNumber: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Flight Time (hours)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="1.5"
                  value={newLog.flightTime}
                  onChange={(e) => setNewLog({ ...newLog, flightTime: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">Flight Type</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { key: 'night', label: 'Night' },
                    { key: 'crossCountry', label: 'Cross Country' },
                    { key: 'solo', label: 'Solo' },
                    { key: 'dual', label: 'Dual' }
                  ].map((option) => (
                    <label key={option.key} className="flex items-center gap-2 rounded-md border border-theme-accent/30 dark:border-theme-accent-dark/30 p-3 text-[10px] font-black uppercase tracking-tighter cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newLog[option.key as keyof typeof newLog] as boolean}
                        onChange={(e) => setNewLog({ ...newLog, [option.key]: e.target.checked })}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  <FileText className="w-3 h-3 inline mr-1" />
                  Notes
                </label>
                <textarea
                  placeholder="Flight details, route, conditions..."
                  value={newLog.notes}
                  onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                  rows={3}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-md text-xs font-black uppercase tracking-widest transition-colors bg-theme-header dark:bg-theme-header-dark hover:opacity-80 text-theme-primary dark:text-theme-primary-dark"
              >
                Cancel
              </button>
              <button
                onClick={addFlightLog}
                className="px-4 py-2 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white rounded-md text-xs font-black uppercase tracking-widest transition-colors"
              >
                Save Flight Log
              </button>
            </div>
          </div>
        )}

        {editingId && editLog && (
          <div className="mb-6 p-4 rounded-lg border-2 border-theme-accent/50 dark:border-theme-accent-dark/50 bg-theme-header dark:bg-theme-header-dark">
            <h4 className="font-black uppercase tracking-widest text-xs mb-4 text-theme-accent dark:text-theme-accent-dark">Edit Flight Log</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  Date
                </label>
                <input
                  type="date"
                  value={editLog.date}
                  onChange={(e) => setEditLog({ ...editLog, date: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  Aircraft N-Number
                </label>
                <input
                  type="text"
                  placeholder="N12345"
                  value={editLog.aircraftNNumber}
                  onChange={(e) => setEditLog({ ...editLog, aircraftNNumber: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  Flight Time (hours)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="1.5"
                  value={editLog.flightTime}
                  onChange={(e) => setEditLog({ ...editLog, flightTime: e.target.value })}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">Flight Type</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { key: 'night', label: 'Night' },
                    { key: 'crossCountry', label: 'Cross Country' },
                    { key: 'solo', label: 'Solo' },
                    { key: 'dual', label: 'Dual' }
                  ].map((option) => (
                    <label key={option.key} className="flex items-center gap-2 rounded-md border border-theme-accent/30 dark:border-theme-accent-dark/30 p-3 text-[10px] font-black uppercase tracking-tighter cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editLog[option.key as keyof FlightLog])}
                        onChange={(e) => setEditLog({ ...editLog, [option.key]: e.target.checked })}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-theme-secondary dark:text-theme-secondary-dark">
                  Notes
                </label>
                <textarea
                  placeholder="Flight details, route, conditions..."
                  value={editLog.notes}
                  onChange={(e) => setEditLog({ ...editLog, notes: e.target.value })}
                  rows={3}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded-md text-xs font-black uppercase tracking-widest transition-colors bg-theme-header dark:bg-theme-header-dark hover:opacity-80 text-theme-primary dark:text-theme-primary-dark"
              >
                Cancel
              </button>
              <button
                onClick={updateFlightLog}
                className="px-4 py-2 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white rounded-md text-xs font-black uppercase tracking-widest transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-bg/50 dark:bg-theme-bg-dark/50 overflow-hidden">
          {filteredLogs.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-theme-header dark:bg-theme-header-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 mb-6">
                <FileText className="w-10 h-10 text-theme-secondary/50 dark:text-theme-secondary-dark/50" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-widest text-theme-primary dark:text-theme-primary-dark mb-2">No Records Found</h4>
              <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark max-w-[200px] mx-auto uppercase tracking-tighter leading-relaxed">
                Sync failed or no entries exist. Initialize logbook via the <span className="text-theme-accent dark:text-theme-accent-dark">+ Add Flight</span> action.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-theme-header dark:bg-theme-header-dark text-[10px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30">
                  <tr>
                    <th className="px-4 py-4 text-left">Date</th>
                    <th className="px-4 py-4 text-left">Aircraft</th>
                    <th className="px-4 py-4 text-left">Time</th>
                    <th className="px-4 py-4 text-left">Type</th>
                    <th className="px-4 py-4 text-left">Notes</th>
                    <th className="px-4 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr
                      key={log.id}
                      className={`border-t border-theme-accent/20 dark:border-theme-accent-dark/20 hover:bg-theme-header/40 dark:hover:bg-theme-header-dark/40 transition-colors ${
                        editingId === log.id ? 'bg-theme-accent/10 dark:bg-theme-accent-dark/10' : ''
                      }`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap text-theme-secondary dark:text-theme-secondary-dark font-mono">
                        {new Date(log.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-black text-theme-primary dark:text-theme-primary-dark tracking-widest">{log.aircraftNNumber}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-bold text-theme-accent dark:text-theme-accent-dark">{log.flightTime} HR</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {log.night && <span className="text-[8px] font-black uppercase tracking-tighter bg-theme-header dark:bg-theme-header-dark px-1.5 py-0.5 rounded text-theme-secondary dark:text-theme-secondary-dark">Night</span>}
                          {log.crossCountry && <span className="text-[8px] font-black uppercase tracking-tighter bg-theme-accent/15 dark:bg-theme-accent-dark/15 px-1.5 py-0.5 rounded text-theme-accent dark:text-theme-accent-dark">XC</span>}
                          {log.solo && <span className="text-[8px] font-black uppercase tracking-tighter bg-green-500/15 px-1.5 py-0.5 rounded text-green-600 dark:text-green-400">Solo</span>}
                          {log.dual && <span className="text-[8px] font-black uppercase tracking-tighter bg-blue-500/15 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">Dual</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 max-w-[120px]">
                        <p className="truncate text-theme-secondary/70 dark:text-theme-secondary-dark/70 text-xs italic">{log.notes || '---'}</p>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEditingLog(log)} className="text-theme-secondary/60 dark:text-theme-secondary-dark/60 hover:text-theme-primary dark:hover:text-theme-primary-dark"><Edit2 size={14}/></button>
                          <button onClick={() => deleteFlightLog(log.id)} className="text-theme-secondary/60 dark:text-theme-secondary-dark/60 hover:text-red-500"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {flightLogs.length > 0 && (
          <div className="mt-6 p-4 bg-theme-header dark:bg-theme-header-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-lg">
            <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 text-theme-secondary dark:text-theme-secondary-dark">Logbook Statistics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark rounded border border-theme-accent/30 dark:border-theme-accent-dark/30">
                <div className="text-[9px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Total Flights</div>
                <div className="font-bold text-xl text-theme-primary dark:text-theme-primary-dark">{flightLogs.length}</div>
              </div>
              <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark rounded border border-theme-accent/30 dark:border-theme-accent-dark/30">
                <div className="text-[9px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Total Hours</div>
                <div className="font-bold text-xl text-theme-accent dark:text-theme-accent-dark">{formatFlightTime(totalFlightTime)}</div>
              </div>
              <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark rounded border border-theme-accent/30 dark:border-theme-accent-dark/30">
                <div className="text-[9px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Average Duration</div>
                <div className="font-bold text-xl text-theme-primary dark:text-theme-primary-dark">{formatFlightTime(averageFlightTime)}</div>
              </div>
              <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark rounded border border-theme-accent/30 dark:border-theme-accent-dark/30">
                <div className="text-[9px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-1">Aircraft Count</div>
                <div className="font-bold text-xl text-theme-primary dark:text-theme-primary-dark">{uniqueAircraftCount}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
               {[
                { label: 'Night', val: nightFlightCount, color: 'text-theme-secondary dark:text-theme-secondary-dark' },
                { label: 'Cross Country', val: crossCountryCount, color: 'text-theme-accent dark:text-theme-accent-dark' },
                { label: 'Solo', val: soloFlightCount, color: 'text-green-600 dark:text-green-400' },
                { label: 'Dual Instruction', val: dualFlightCount, color: 'text-blue-600 dark:text-blue-400' }
               ].map(stat => (
                 <div key={stat.label} className="flex justify-between items-center p-2 border-b border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <span className="text-[8px] font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark">{stat.label}</span>
                    <span className={`font-bold ${stat.color}`}>{stat.val}</span>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightLogs;
