import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { 
  Plus, 
  Printer,
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Database, 
  ChevronDown,
  Trash2,
  Lock,
  Unlock,
  FileText,
  Save,
  Clipboard,
  Layers,
  Gauge,
  Send
} from 'lucide-react';
import { db } from '../services/PersistenceService';
import { Aircraft } from '../types/aviation';
import sampleAircrafts from '../data/sampleAircrafts.json';
import cgEnvelopeImage from '../../assets/centerofgravitycessna172.png';

// --- 1. ARCHITECTURAL TYPE DEFINITIONS ---

interface WeightItem {
  id: string;
  name: string;
  weight: string;
  arm: string;
  isLocked?: boolean;
  category: 'fixed' | 'payload' | 'fuel' | 'deduction';
  timestamp?: number;
}

interface AircraftLimits {
  maxWeight: number;
  forwardCG: number;
  aftCG: number;
  utilityMaxWeight?: number;
  utilityFwdCG?: number;
  utilityAftCG?: number;
}

interface AircraftConfiguration {
  emptyWeight: string;
  emptyArm: string;
  fuelWeight: string;
  fuelArm: string;
  rampArm: string;
  takeoffArm: string;
  landingArm: string;
  startupDeduction: string;
  burnedDeduction: string;
  fuelCapacityGal: number;
}

interface TelemetryResults {
  rampW: number;
  rampM: number;
  rampCG: number;
  takeoffW: number;
  takeoffM: number;
  takeoffCG: number;
  landingW: number;
  landingM: number;
  landingCG: number;
  isWeightSafe: boolean;
  isCGSafe: boolean;
  fuelLbs: number;
  remainingFuelLbs: number;
  payloadW: number;
  momentArm: number;
}

// --- 2. REUSABLE ATOMIC COMPONENTS (theme-token based) ---

const HUDLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-2">
    {children}
  </label>
);

const CockpitInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props} 
    className="w-full p-3 sm:p-4 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-none text-theme-primary dark:text-theme-primary-dark font-mono text-sm sm:text-base focus:border-theme-accent dark:focus:border-theme-accent-dark focus:ring-1 focus:ring-theme-accent dark:focus:ring-theme-accent-dark outline-none transition-all placeholder:text-theme-secondary/50 dark:placeholder:text-theme-secondary-dark/50 tabular-nums" 
  />
);

const TelemetryCard = ({ label, value, subValue, status }: { label: string; value: string; subValue?: string; status?: 'nominal' | 'alert' | 'critical' }) => (
  <div className={`p-5 sm:p-6 bg-theme-card dark:bg-theme-card-dark border ${
    status === 'critical' ? `border-red-500/70 bg-red-500/5` : 
    status === 'alert' ? 'border-yellow-500/50 bg-yellow-500/5' : 
    `border-theme-accent/30 dark:border-theme-accent-dark/30`
  } transition-all duration-500 relative group`}>
    <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${status === 'critical' ? `text-red-500` : `text-theme-secondary dark:text-theme-secondary-dark`} mb-3`}>
      {label}
    </div>
    <div className="flex flex-col">
      <span className={`text-xl sm:text-2xl lg:text-3xl font-black ${status === 'critical' ? `text-red-500` : `text-theme-primary dark:text-theme-primary-dark`}`}>{value}</span>
      {subValue && <span className="text-[10px] sm:text-xs font-bold text-theme-secondary dark:text-theme-secondary-dark mt-2 uppercase tracking-widest tabular-nums">{subValue}</span>}
    </div>
    <div className={`absolute top-0 right-0 w-1 h-full ${status === 'critical' ? `bg-red-500` : 'bg-transparent'}`}></div>
  </div>
);

// --- 3. MAIN MODULE: WEIGHT AND BALANCE CALCULATOR ---

const WeightBalanceCalculator: React.FC = () => {
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [profileId, setProfileId] = useState<string>('c172');
  const [hangarPlanes, setHangarPlanes] = useState<Aircraft[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'NORMAL' | 'UTILITY'>('NORMAL');
  const [weightItems, setWeightItems] = useState<WeightItem[]>([]);

  // Load Hangar
  useEffect(() => {
    const loadHangar = async () => {
      const planes = await db.getAllAircraft();
      setHangarPlanes(planes);
    };
    loadHangar();
  }, []);

  const [limits, setLimits] = useState<AircraftLimits>({
    maxWeight: 2550,
    forwardCG: 35.0,
    aftCG: 47.3,
    utilityMaxWeight: 2200
  });

  const [config, setConfig] = useState<AircraftConfiguration>({
    emptyWeight: '1642.5',
    emptyArm: '38.42',
    fuelWeight: '318',
    fuelArm: '48',
    rampArm: '38.5',
    takeoffArm: '38.5',
    landingArm: '38.2',
    startupDeduction: '8',
    burnedDeduction: '120',
    fuelCapacityGal: 53
  });

  useEffect(() => {
    // Check Hangar first
    const hangarPlane = hangarPlanes.find(p => String(p.id) === profileId);
    const samplePlane = (sampleAircrafts as any[]).find(a => a.id === profileId);

    const profile = hangarPlane || samplePlane;

    if (profile) {
      setLimits({
        maxWeight: profile.maxGrossWeight || profile.maxWeight || 2550,
        forwardCG: profile.forwardCG || 35.0,
        aftCG: profile.aftCG || 47.3,
        utilityMaxWeight: profile.utilityMaxWeight || 2200
      });

      setConfig({
        emptyWeight: String(profile.emptyWeight),
        emptyArm: String(profile.emptyArm),
        fuelWeight: String(profile.fuelWeightLbs || 318),
        fuelArm: String(profile.fuelArm || 48),
        rampArm: String(profile.rampArm || profile.emptyArm),
        takeoffArm: String(profile.takeoffArm || profile.emptyArm),
        landingArm: String(profile.landingArm || profile.emptyArm),
        startupDeduction: String(profile.startupDeductionLbs || 8),
        burnedDeduction: String(profile.burnedDeductionLbs || 120),
        fuelCapacityGal: profile.fuelCapacityGal || 53
      });

      setWeightItems([
        { id: '1', name: 'BASIC EMPTY WEIGHT', weight: String(profile.emptyWeight), arm: String(profile.emptyArm), isLocked: true, category: 'fixed' },
        { id: '2', name: 'PILOT & FRONT PASSENGER', weight: '190', arm: '37', category: 'payload' },
        { id: '3', name: 'REAR PASSENGERS', weight: '0', arm: '73', category: 'payload' },
        { id: '4', name: 'BAGGAGE AREA 1', weight: '0', arm: '95', category: 'payload' },
        { id: '5', name: 'BAGGAGE AREA 2', weight: '0', arm: '123', category: 'payload' },
        { id: '6', name: 'FUEL LOAD (TOTAL LBS)', weight: String(profile.fuelWeightLbs || 318), arm: String(profile.fuelArm || 48), isLocked: true, category: 'fuel' }
      ]);
    }
  }, [profileId, hangarPlanes]);

  const handleSendToBriefing = () => {
    // Phase 1 Integration: Save current calculation to temporary storage for Briefing module
    const snapshot = {
      rampWeight: results.rampW.toFixed(1),
      takeoffWeight: results.takeoffW.toFixed(1),
      cg: results.rampCG.toFixed(2),
      timestamp: Date.now()
    };
    localStorage.setItem('latest_wb_result', JSON.stringify(snapshot));
    alert("Weight & Balance data saved. You can now pull it into a flight briefing PDF.");
  };

  const handleAddItem = useCallback(() => {
    const newItem: WeightItem = {
      id: Date.now().toString(),
      name: 'ADDITIONAL LOAD ITEM',
      weight: '',
      arm: '',
      category: 'payload',
      timestamp: Date.now()
    };
    setWeightItems(prev => [...prev, newItem]);
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setWeightItems(prev => prev.filter(item => item.id !== id || item.isLocked));
  }, []);

  const handleUpdateItem = useCallback((id: string, field: keyof WeightItem, value: string) => {
    setWeightItems(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  const results = useMemo((): TelemetryResults => {
    let payloadW = 0;
    let payloadM = 0;
    let currentFuelW = 0;
    const fArm = parseFloat(config.fuelArm) || 48;

    weightItems.forEach(item => {
      const w = parseFloat(item.weight) || 0;
      const a = parseFloat(item.arm) || 0;
      if (item.category === 'fuel') {
        currentFuelW = w;
      } else {
        payloadW += w;
        payloadM += (w * a);
      }
    });

    const startD = parseFloat(config.startupDeduction) || 0;
    const burnD = parseFloat(config.burnedDeduction) || 0;
    const rampW = payloadW + currentFuelW;
    const rampM = payloadM + (currentFuelW * fArm);
    const rampCG = rampW > 0 ? rampM / rampW : 0;
    const takeoffW = rampW - startD;
    const takeoffM = rampM - (startD * fArm);
    const takeoffCG = takeoffW > 0 ? takeoffM / takeoffW : 0;
    const landingW = takeoffW - burnD;
    const landingM = takeoffM - (burnD * fArm);
    const landingCG = landingW > 0 ? landingM / landingW : 0;
    const currentMax = activeCategory === 'NORMAL' ? limits.maxWeight : (limits.utilityMaxWeight || limits.maxWeight);

    return {
      rampW, rampM, rampCG,
      takeoffW, takeoffM, takeoffCG,
      landingW, landingM, landingCG,
      isWeightSafe: rampW <= currentMax,
      isCGSafe: rampCG >= limits.forwardCG && rampCG <= limits.aftCG,
      fuelLbs: currentFuelW,
      remainingFuelLbs: currentFuelW - startD - burnD,
      payloadW,
      momentArm: rampCG
    };
  }, [weightItems, config, limits, activeCategory]);

  return (
    <div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark text-theme-primary dark:text-theme-primary-dark font-mono tracking-tighter p-4 sm:p-6 lg:p-8 xl:p-10 selection:bg-theme-accent/30 dark:selection:bg-theme-accent-dark/30 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="flex border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark p-1">
              {['NORMAL', 'UTILITY'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-theme-accent dark:bg-theme-accent-dark text-white' : 'text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary dark:hover:text-theme-primary-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={handleSendToBriefing}
              title="Saves the current W&B results (ramp weight, takeoff weight, CG) to local storage so they can be pulled into a flight briefing PDF."
              className="flex items-center space-x-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all group"
            >
              <Send className="w-4 h-4 text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-accent dark:group-hover:text-theme-accent-dark" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Push to Briefing</span>
            </button>
            <button title="Saves the current manifest to local storage for later retrieval."
              className="flex items-center space-x-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 hover:bg-theme-header dark:hover:bg-theme-header-dark transition-all group">
              <Save className="w-4 h-4 text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-primary dark:group-hover:text-theme-primary-dark" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Store Manifest</span>
            </button>
            <button onClick={() => window.print()} title="Print this page"
              className="p-2.5 sm:p-3 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 hover:bg-theme-header dark:hover:bg-theme-header-dark transition-all group">
              <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-primary dark:group-hover:text-theme-primary-dark" />
            </button>
          </div>

        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-10">
          
          <aside className="2xl:col-span-4 space-y-8">
            <section className="bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 p-8 relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity">
                <Database size={120} />
              </div>
              
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div className="flex items-center space-x-3">
                  <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-theme-accent dark:text-theme-accent-dark" />
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-theme-accent dark:text-theme-accent-dark">Airframe Parameters</h3>
                </div>
                <button 
                  onClick={() => setIsLocked(!isLocked)}
                  className={`p-2 border ${isLocked ? 'border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-secondary dark:text-theme-secondary-dark' : 'border-theme-accent dark:border-theme-accent-dark text-theme-accent dark:text-theme-accent-dark bg-theme-accent/5 dark:bg-theme-accent-dark/5'} transition-all active:scale-95`}
                >
                  {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <HUDLabel>Active Fleet Profile</HUDLabel>
                  <div className="relative">
                    <select 
                      disabled={isLocked}
                      value={profileId} 
                      onChange={(e) => setProfileId(e.target.value)}
                      className="w-full p-4 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-none text-theme-primary dark:text-theme-primary-dark font-mono text-xs appearance-none focus:border-theme-accent dark:focus:border-theme-accent-dark outline-none disabled:opacity-40 transition-all cursor-pointer"
                    >
                      <optgroup label="Standard Templates">
                        {(sampleAircrafts as any[]).map(a => (
                          <option key={a.id} value={a.id}>{a.name.toUpperCase()}</option>
                        ))}
                      </optgroup>
                      {hangarPlanes.length > 0 && (
                        <optgroup label="My Hangar">
                          {hangarPlanes.map(p => (
                            <option key={p.id} value={String(p.id)}>{p.tailNumber} ({p.model})</option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-secondary dark:text-theme-secondary-dark pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <HUDLabel>MTOW (LBS)</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      value={activeCategory === 'NORMAL' ? limits.maxWeight : (limits.utilityMaxWeight || limits.maxWeight)} 
                      onChange={(e) => setLimits({...limits, maxWeight: Number(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <HUDLabel>Empty Weight</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      value={config.emptyWeight} 
                      onChange={(e) => setConfig({...config, emptyWeight: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <HUDLabel>Fwd CG Limit</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      step="0.1" 
                      value={limits.forwardCG} 
                      onChange={(e) => setLimits({...limits, forwardCG: Number(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <HUDLabel>Aft CG Limit</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      step="0.1" 
                      value={limits.aftCG} 
                      onChange={(e) => setLimits({...limits, aftCG: Number(e.target.value)})} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <HUDLabel>Taxi Deduction</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      value={config.startupDeduction} 
                      onChange={(e) => setConfig({...config, startupDeduction: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <HUDLabel>En-Route Burn</HUDLabel>
                    <CockpitInput 
                      disabled={isLocked}
                      type="number" 
                      value={config.burnedDeduction} 
                      onChange={(e) => setConfig({...config, burnedDeduction: e.target.value})} 
                    />
                  </div>
                </div>
              </div>
            </section>



            <section className="bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 p-6 sm:p-8">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark mb-5 sm:mb-6 flex items-center">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 mr-3" /> Fuel Density
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Avgas (100LL)', weight: '6.00 lb/gal' },
                  { label: 'Jet A-1 Fuel', weight: '6.70 lb/gal' },
                  { label: 'Engine Oil', weight: '7.50 lb/gal' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm sm:text-base border-b border-theme-accent/20 dark:border-theme-accent-dark/20 pb-3 group">
                    <span className="text-theme-secondary dark:text-theme-secondary-dark group-hover:text-theme-primary dark:group-hover:text-theme-primary-dark transition-colors font-medium">{item.label}</span>
                    <span className="font-bold text-theme-primary dark:text-theme-primary-dark tabular-nums">{item.weight}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <main className="2xl:col-span-8 space-y-8">
            <div className="bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 shadow-lg relative">
              <div className="p-4 sm:p-6 bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                   <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-theme-accent dark:bg-theme-accent-dark rounded-full animate-pulse"></div>
                   <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark">Payload Manifest</h3>
                </div>
                <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setWeightItems(prev => prev.filter(it => it.isLocked))}
                    title="Remove all non-locked items"
                    className="p-2.5 sm:p-3 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={handleAddItem}
                    className="flex-1 sm:flex-none bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-black uppercase tracking-widest rounded-none transition-all flex items-center justify-center active:scale-95"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" /> Add Item
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto" ref={scrollRef}>
                <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-xs sm:text-sm uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark bg-theme-header/80 dark:bg-theme-header-dark/80 sticky top-0 z-10">
                        <th className="p-4 sm:p-6 text-left font-black border-b border-theme-accent/20 dark:border-theme-accent-dark/20">Component</th>
                        <th className="p-4 sm:p-6 text-center font-black border-b border-theme-accent/20 dark:border-theme-accent-dark/20 w-32 sm:w-48">Mass (LBS)</th>
                        <th className="p-4 sm:p-6 text-center font-black border-b border-theme-accent/20 dark:border-theme-accent-dark/20 w-32 sm:w-48">Arm (IN)</th>
                        <th className="p-4 sm:p-6 text-right font-black border-b border-theme-accent/20 dark:border-theme-accent-dark/20 w-40 sm:w-56">Moment</th>
                        <th className="p-4 sm:p-6 text-center border-b border-theme-accent/20 dark:border-theme-accent-dark/20 w-16 sm:w-20"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {weightItems.map((item, idx) => (
                        <tr key={item.id} className="border-b border-theme-accent/15 dark:border-theme-accent-dark/15 group hover:bg-theme-header/40 dark:hover:bg-theme-header-dark/40 transition-colors">
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center space-x-3 sm:space-x-5">
                              <span className="text-[10px] sm:text-xs font-black text-theme-secondary/50 dark:text-theme-secondary-dark/50 tabular-nums">{(idx + 1).toString().padStart(2, '0')}</span>
                              <input 
                                type="text" 
                                disabled={item.isLocked}
                                value={item.name} 
                                className={`w-full bg-transparent p-3 sm:p-4 outline-none uppercase font-bold text-sm sm:text-base tracking-tight ${item.isLocked ? 'text-theme-secondary dark:text-theme-secondary-dark' : 'text-theme-primary dark:text-theme-primary-dark'}`}
                                onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                              />
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 border-l border-theme-accent/15 dark:border-theme-accent-dark/15">
                            <input 
                              type="number" 
                              value={item.weight} 
                              placeholder="0.0"
                              className="w-full bg-transparent p-3 sm:p-4 text-center outline-none focus:text-theme-accent dark:focus:text-theme-accent-dark font-mono text-base sm:text-lg tabular-nums text-theme-primary dark:text-theme-primary-dark"
                              onChange={(e) => handleUpdateItem(item.id, 'weight', e.target.value)}
                            />
                          </td>
                          <td className="p-3 sm:p-4 border-l border-theme-accent/15 dark:border-theme-accent-dark/15">
                            <input 
                              type="number" 
                              disabled={item.isLocked && item.name.includes('EMPTY')}
                              value={item.arm} 
                              placeholder="0.00"
                              className={`w-full bg-transparent p-3 sm:p-4 text-center outline-none font-mono text-base sm:text-lg tabular-nums ${item.isLocked && item.name.includes('EMPTY') ? 'text-theme-secondary dark:text-theme-secondary-dark' : 'text-theme-primary dark:text-theme-primary-dark'}`}
                              onChange={(e) => handleUpdateItem(item.id, 'arm', e.target.value)}
                            />
                          </td>
                          <td className="p-3 sm:p-4 border-l border-theme-accent/15 dark:border-theme-accent-dark/15 text-right font-black text-theme-primary dark:text-theme-primary-dark pr-6 sm:pr-10 text-base sm:text-lg tabular-nums italic">
                            <span>{((parseFloat(item.weight) || 0) * (parseFloat(item.arm) || 0)).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                          </td>
                          <td className="p-3 sm:p-4 border-l border-theme-accent/15 dark:border-theme-accent-dark/15 text-center">
                            {!item.isLocked && (
                              <button onClick={() => handleRemoveItem(item.id)} className="text-theme-secondary/50 dark:text-theme-secondary-dark/50 hover:text-red-500 transition-colors p-2 sm:p-3 active:scale-90" aria-label={`Remove ${item.name}`}>
                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="sticky bottom-0 bg-theme-bg dark:bg-theme-bg-dark">
                      <tr className="bg-theme-header/60 dark:bg-theme-header-dark/60 text-theme-primary dark:text-theme-primary-dark">
                        <td className="p-4 sm:p-6 font-black text-sm sm:text-base uppercase tracking-widest text-theme-secondary dark:text-theme-secondary-dark">Ramp Gross</td>
                        <td className="p-4 sm:p-6 text-center font-black text-lg sm:text-xl tabular-nums border-l border-theme-accent/20 dark:border-theme-accent-dark/20 bg-theme-accent/5 dark:bg-theme-accent-dark/5 italic">{results.rampW.toFixed(1)}</td>
                        <td className="p-4 sm:p-6 text-center font-black text-theme-secondary dark:text-theme-secondary-dark text-base sm:text-lg tabular-nums border-l border-theme-accent/20 dark:border-theme-accent-dark/20">—</td>
                        <td className="p-4 sm:p-6 text-right font-black text-lg sm:text-xl tabular-nums border-l border-theme-accent/20 dark:border-theme-accent-dark/20 pr-6 sm:pr-10">{results.rampM.toLocaleString(undefined, {maximumFractionDigits: 1})}</td>
                        <td className="p-4 sm:p-6 border-l border-theme-accent/20 dark:border-theme-accent-dark/20"></td>
                      </tr>
                    </tfoot>
                  </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <TelemetryCard 
                label="Ramp Telemetry" 
                value={`${results.rampW.toFixed(1)} LBS`} 
                subValue={`Arm: ${results.rampCG.toFixed(2)}"`}
                status={!results.isWeightSafe ? 'critical' : 'nominal'}
              />
              <TelemetryCard 
                label="Takeoff Telemetry" 
                value={`${results.takeoffW.toFixed(1)} LBS`} 
                subValue={`Arm: ${results.takeoffCG.toFixed(2)}"`}
              />
              <TelemetryCard 
                label="Landing Telemetry" 
                value={`${results.landingW.toFixed(1)} LBS`} 
                subValue={`Arm: ${results.landingCG.toFixed(2)}"`}
              />
              <div className={`p-6 sm:p-8 border-2 flex flex-col justify-between transition-all duration-1000 ${results.isWeightSafe && results.isCGSafe ? 'bg-theme-accent/10 dark:bg-theme-accent-dark/10 border-theme-accent/40 dark:border-theme-accent-dark/40' : 'bg-red-500/10 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.15)]'}`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-2 sm:space-y-3">
                    <div className={`text-xs sm:text-sm font-black uppercase tracking-widest ${results.isWeightSafe && results.isCGSafe ? 'text-theme-accent dark:text-theme-accent-dark' : 'text-red-500'}`}>Go / No-Go</div>
                    <div className={`text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tighter ${results.isWeightSafe && results.isCGSafe ? 'text-theme-accent dark:text-theme-accent-dark' : 'text-red-500'}`}>
                      {results.isWeightSafe && results.isCGSafe ? 'Nominal' : 'Critical'}
                    </div>
                  </div>
                  {results.isWeightSafe && results.isCGSafe ? (
                    <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-theme-accent/30 dark:text-theme-accent-dark/30" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 sm:w-14 sm:h-14 text-red-500 animate-pulse" />
                  )}
                </div>
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-theme-accent/20 dark:border-theme-accent-dark/20">
                   <span className="text-xs sm:text-sm font-black text-theme-secondary dark:text-theme-secondary-dark uppercase tracking-widest flex items-center">
                     <Clipboard className="w-4 h-4 mr-2" /> {results.isCGSafe ? 'Envelope Secure' : 'CG Violation'}
                   </span>
                </div>
              </div>
            </div>

            <footer className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pt-8 sm:pt-10 pb-16 sm:pb-24">
              <div className="lg:col-span-8 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 p-6 sm:p-10 space-y-6 sm:space-y-8 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-8 opacity-[0.04] pointer-events-none">
                  <FileText size={200} />
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                   <Info className="w-5 h-5 sm:w-6 sm:h-6 text-theme-accent dark:text-theme-accent-dark" />
                   <h4 className="text-xs sm:text-sm font-black uppercase tracking-widest text-theme-primary dark:text-theme-primary-dark">Safety Planning Advisory</h4>
                </div>
                <div className="space-y-5 sm:space-y-6 text-sm sm:text-base leading-relaxed text-theme-secondary dark:text-theme-secondary-dark font-medium">
                  <p className="border-l-2 border-theme-accent/30 dark:border-theme-accent-dark/30 pl-6 transition-colors hover:border-theme-accent dark:hover:border-theme-accent-dark">
                    Current total payload (excluding BEW and Fuel) is <span className="text-theme-primary dark:text-theme-primary-dark font-black italic tabular-nums">{(results.rampW - parseFloat(config.emptyWeight) - results.fuelLbs).toFixed(1)} LBS</span>. 
                    This represents <span className="text-theme-primary dark:text-theme-primary-dark font-black">{( ((results.rampW - parseFloat(config.emptyWeight) - results.fuelLbs) / (limits.maxWeight - parseFloat(config.emptyWeight))) * 100).toFixed(1)}%</span> of total useful load capacity.
                  </p>
                  <p className="border-l-2 border-theme-accent/30 dark:border-theme-accent-dark/30 pl-6 transition-colors hover:border-theme-accent dark:hover:border-theme-accent-dark">
                    Estimated fuel state at destination: <span className={`font-black italic tabular-nums ${results.remainingFuelLbs < 60 ? 'text-red-500' : 'text-theme-primary dark:text-theme-primary-dark'}`}>
                      {results.remainingFuelLbs.toFixed(1)} LBS ({(results.remainingFuelLbs / 6).toFixed(1)} GAL)
                    </span>. 
                    Warning: Ensure this meets FAA Part 91.151 minimum reserves for Day/Night VFR flight.
                  </p>
                  <div className="p-4 sm:p-6 bg-theme-bg/50 dark:bg-theme-bg-dark/50 border border-red-500/30 text-xs sm:text-sm font-bold tracking-tight text-theme-secondary dark:text-theme-secondary-dark flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3 sm:mr-4 shrink-0" />
                    <span>Calculations derived from POH standards. Pilots must verify current weight/balance data via actual aircraft equipment lists before flight. Final responsibility for airworthiness rests with the PIC.</span>
                  </div>
                </div>
              </div>

                <a href={cgEnvelopeImage} target="_blank" rel="noopener noreferrer" className="lg:col-span-4 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 p-4 sm:p-6 flex flex-col justify-end group relative overflow-hidden min-h-[320px] sm:min-h-[420px] block">
                  <img
                   src={cgEnvelopeImage}
                   alt="Cessna 172 center of gravity envelope"
                   className="w-full h-auto object-contain p-3 sm:p-6 opacity-95 z-0 hover:opacity-100 transition-opacity cursor-zoom-in"
                 />
                  <div className="relative z-10 flex flex-col items-center justify-end gap-2 sm:gap-3">
                    <div className="w-full max-w-[560px] rounded-md border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-bg/80 dark:bg-theme-bg-dark/80 px-3 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm">
                     <div className="flex justify-between w-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-theme-primary dark:text-theme-primary-dark">
                      <span>FWD: {limits.forwardCG}"</span>
                      <span>CURR: {results.rampCG.toFixed(2)}"</span>
                      <span>AFT: {limits.aftCG}"</span>
                     </div>
                    </div>
                  </div>
                </a>
            </footer>

          </main>
        </div>

      </div>
    </div>
  );
};

export default WeightBalanceCalculator;
