import { useState } from 'react';
import { AlertCircle, Cloud, Loader2, Info, Navigation } from 'lucide-react';
import React from 'react';
import { fetchAirportWeather } from '../utils/weatherService';

type FlightCategoryType = 'VFR' | 'MVFR' | 'IFR' | 'LIFR';

interface HazardEvaluation {
  category: FlightCategoryType | null;
  detectedHazard: string | null;
}

const sanitizeIcaoToken = (token: string): string => {
  if (!token) return "";
  return token.replace(/^(METAR|SPECI)/i, "").trim().toUpperCase();
};

const getAirportName = async (rawToken: string): Promise<string> => {
  const code = sanitizeIcaoToken(rawToken);
  if (!code || code.length < 3) return "";

  const faaCode = (code.length === 4 && code.startsWith("K")) ? code.slice(1) : code;
  const searchIds = Array.from(new Set([code, faaCode])).join(",");

  try {
    const res = await fetch(
      `https://aviationweather.gov/api/data/stationinfo?ids=${searchIds}&format=json`
    );

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const match = data.find(s => s.icaoId === code || s.faaId === faaCode || s.stationId === code) || data[0];
        if (match && match.name) {
          return match.name;
        }
      }
    }
  } catch (err) {
    console.warn("Station info fetch error:", err);
  }

  return 'Airport';
};

const formatZuluToEastern = (zuluToken: string): string => {
  if (!/^\d{6}Z$/.test(zuluToken)) return 'Invalid Timestamp';
  
  const zuluHour = parseInt(zuluToken.slice(2, 4), 10);
  const minute = zuluToken.slice(4, 6);
  
  const now = new Date();
  const utcDate = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), zuluHour, parseInt(minute, 10));
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  });
  
  return formatter.format(new Date(utcDate));
};

const evaluateWeatherHazards = (metarString: string, currentCategory: FlightCategoryType | null): HazardEvaluation => {
  if (!currentCategory || !metarString) {
    return { category: currentCategory, detectedHazard: null };
  }

  const hazardMap: Record<string, string> = {
    'TS': 'Thunderstorms',
    'VCTS': 'Thunderstorms in the Vicinity',
    'SQ': 'Squalls',
    'FC': 'Funnel Clouds',
    'GR': 'Hail',
    'VA': 'Volcanic Ash',
    'DS': 'Duststorms',
    'SS': 'Sandstorms',
    'FZRA': 'Freezing Rain',
    'FZDZ': 'Freezing Drizzle',
    'TSRA': 'Thunderstorm with Rain'
  };

  const words = metarString.toUpperCase().split(/\s+/);
  let foundHazardCode: string | null = null;

  for (const word of words) {
    for (const code of Object.keys(hazardMap)) {
      if (word === code || word.includes(code)) {
        foundHazardCode = code;
        break;
      }
    }
    if (foundHazardCode) break;
  }

  if (foundHazardCode && (currentCategory === 'VFR' || currentCategory === 'MVFR')) {
    return {
      category: 'IFR',
      detectedHazard: hazardMap[foundHazardCode]
    };
  }

  return {
    category: currentCategory,
    detectedHazard: foundHazardCode ? hazardMap[foundHazardCode] : null
  };
};

const WeatherCalculator: React.FC = () => {
  const [icaoCode, setIcaoCode] = useState<string>('');
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [metar, setMetar] = useState<string>('');
  const [taf, setTaf] = useState<string>('');
  const [flightCategory, setFlightCategory] = useState<FlightCategoryType | null>(null);
  const [activeHazard, setActiveHazard] = useState<string | null>(null);
  const [stationName, setStationName] = useState<string>('');
  
  const [airportElevation, setAirportElevation] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [altimeterSetting, setAltimeterSetting] = useState<string>('29.92');
  const [dewPoint, setDewPoint] = useState<string>('');
  
  const [runwayHeading, setRunwayHeading] = useState<string>('270');
  const [windDirection, setWindDirection] = useState<string>('360');
  const [windSpeed, setWindSpeed] = useState<string>('15');
  const [calibratedAirspeed, setCalibratedAirspeed] = useState<string>('110');

  const [activeTool, setActiveTool] = useState<'density' | 'cloudbase' | 'wind' | 'tas'>('density');

  const fetchWeather = async () => {
    const code = sanitizeIcaoToken(icaoCode);
    if (!code) {
      setWeatherError('Enter a 4-letter ICAO code first');
      return;
    }

    setWeatherLoading(true);
    setWeatherError(null);
    setActiveHazard(null);
    setStationName('');

    try {
      const [weather, resolvedName] = await Promise.all([
        fetchAirportWeather(code) as Promise<any>,
        getAirportName(code)
      ]);

      if (weather.error) {
        setWeatherError(weather.error);
        return;
      }

      const rawMetar = weather.metar?.metar || weather.metar || 'No METAR returned for this airport';
      const rawTaf = weather.taf?.taf || weather.taf || 'No TAF returned for this airport';
      
      setMetar(rawMetar);
      setTaf(rawTaf);
      setStationName(resolvedName);
      
      const baselineCategory = weather.metar?.flightCategory || weather.flightCategory || null;
      const evaluation = evaluateWeatherHazards(rawMetar, baselineCategory);
      
      setFlightCategory(evaluation.category);
      setActiveHazard(evaluation.detectedHazard);

      const tempMatch = rawMetar.match(/(M?\d{2})\/(M?\d{2})/);
      if (tempMatch) {
        const parseTemp = (val: string) => val.startsWith('M') ? -parseInt(val.slice(1), 10) : parseInt(val, 10);
        setTemperature(parseTemp(tempMatch[1]).toString());
        setDewPoint(parseTemp(tempMatch[2]).toString());
      }

      const altMatch = rawMetar.match(/A(\d{4})/);
      if (altMatch) {
        const altVal = `${altMatch[1].slice(0, 2)}.${altMatch[1].slice(2, 4)}`;
        setAltimeterSetting(altVal);
      }

      const windMatch = rawMetar.match(/\b(\d{3}|VRB)(\d{2,3})(G\d{2,3})?KT\b/);
      if (windMatch && windMatch[1] !== 'VRB') {
        setWindDirection(windMatch[1]);
        setWindSpeed(windMatch[2]);
      }

    } catch (error) {
      setWeatherError(error instanceof Error ? error.message : 'Failed to fetch weather');
    } finally {
      setWeatherLoading(false);
    }
  };

  const calculateDensityAltitude = () => {
    const elevation = parseFloat(airportElevation);
    const tempCelsius = parseFloat(temperature);
    const altimeter = parseFloat(altimeterSetting);

    if (isNaN(elevation) || isNaN(tempCelsius) || isNaN(altimeter)) return null;

    const pressureAltitude = elevation + (29.92 - altimeter) * 1000;
    const isaTempCelsius = 15 - (pressureAltitude / 1000) * 2;
    const densityAltitude = pressureAltitude + (120 * (tempCelsius - isaTempCelsius));
    const takeoffDistanceFactor = Math.max(1, 1 + ((densityAltitude / 1000) * 0.1));

    return {
      pressureAltitude: Math.round(pressureAltitude),
      densityAltitude: Math.round(densityAltitude),
      isaDeviation: tempCelsius - isaTempCelsius,
      takeoffFactor: takeoffDistanceFactor.toFixed(2)
    };
  };

  const calculateCloudBase = () => {
    const temp = parseFloat(temperature);
    const dew = parseFloat(dewPoint);
    if (isNaN(temp) || isNaN(dew)) return null;
    return Math.round(((temp - dew) / 2.5) * 1000);
  };

  const calculateWindComponents = () => {
    const rwy = parseFloat(runwayHeading);
    const wDir = parseFloat(windDirection);
    const wSpd = parseFloat(windSpeed);

    if (isNaN(rwy) || isNaN(wDir) || isNaN(wSpd)) return null;

    const windAngleRad = ((wDir - rwy) * Math.PI) / 180;
    const headwind = Math.round(wSpd * Math.cos(windAngleRad));
    const crosswind = Math.round(Math.abs(wSpd * Math.sin(windAngleRad)));
    const isTailwind = headwind < 0;

    return {
      headwind: Math.abs(headwind),
      crosswind,
      isTailwind
    };
  };

  const calculateTrueAirspeed = () => {
    const cas = parseFloat(calibratedAirspeed);
    const da = densityResults?.densityAltitude;
    if (isNaN(cas) || da === undefined || da === null) return null;

    const tas = cas * (1 + (0.02 * (da / 1000)));
    return Math.round(tas);
  };

  const generateFlightRecommendations = () => {
    if (!metar || metar.startsWith('No METAR')) return null;

    const insights: string[] = [];
    let hazardLevel: string = 'low';
    const cleanId = sanitizeIcaoToken(icaoCode);
    const displayIdentifier = stationName ? `${cleanId} (${stationName})` : (cleanId || 'Local Facility');

    if (flightCategory === 'LIFR' || flightCategory === 'IFR') {
      insights.push(`Instrument meteorological conditions (IMC) prevail at ${displayIdentifier}. Visual flight rules (VFR) are prohibited without an active flight plan and rating.`);
      hazardLevel = 'high';
    } else if (flightCategory === 'MVFR') {
      insights.push(`Marginal VFR conditions detected around ${displayIdentifier}. Expect lowered ceilings or restricted slant-range visibility.`);
      hazardLevel = 'med';
    }

    if (activeHazard) {
      insights.push(`Critical Weather Advisory: ${activeHazard} reported in vicinity. Exercise extreme caution or delay departure.`);
      hazardLevel = 'high';
    }

    const windComps = calculateWindComponents();
    if (windComps && windComps.crosswind > 15) {
      insights.push(`High Crosswind Alert: Evaluated crosswind component is ${windComps.crosswind} knots. Verify aircraft maximum demonstrated crosswind limitations.`);
      if (hazardLevel !== 'high') hazardLevel = 'med';
    }

    if (insights.length === 0 && flightCategory === 'VFR') {
      insights.push(`Favorable CAVOK / VFR flying conditions verified at ${displayIdentifier}. Excellent operating environment for standard cross-country routing.`);
    }

    return { insights, hazardLevel };
  };

  const parseMetarTokens = () => {
    if (!metar || metar.startsWith('No METAR')) return [];

    const tokens = metar.split(/\s+/);
    const elements: { code: string; explanation: string }[] = [];

    tokens.forEach((token) => {
      const cleanToken = sanitizeIcaoToken(token);
      if (!cleanToken) return;

      if (/^[A-Z]{4}$/.test(cleanToken)) {
        const displayName = (stationName && stationName !== 'Airport') ? stationName : 'Airport';
        elements.push({ code: cleanToken, explanation: `${cleanToken} ${displayName}` });
        return;
      }
      if (/^\d{6}Z$/.test(cleanToken)) {
        const localizedString = formatZuluToEastern(cleanToken);
        elements.push({ code: cleanToken, explanation: `Observation Timestamp: Issued at ${localizedString}` });
        return;
      }
      if (cleanToken === 'AUTO' || cleanToken === 'COR') {
        elements.push({ code: cleanToken, explanation: cleanToken === 'AUTO' ? 'Automated weather observation report' : 'Amended weather report' });
        return;
      }
      if (/^(\d{3}|VRB)\d{2,3}(G\d{2,3})?KT$/.test(cleanToken)) {
        elements.push({ code: cleanToken, explanation: `Surface Winds: Direction & velocity vector reported in knots` });
        return;
      }
      if (/^\d+SM$/.test(cleanToken)) {
        elements.push({ code: cleanToken, explanation: `Visibility: Horizontal visual range is ${cleanToken}` });
        return;
      }
      if (/^(RA|SN|DZ|TS|BR|FG|FU|HZ|SQ|VA|DS|SS|FC)/.test(cleanToken)) {
        elements.push({ code: cleanToken, explanation: `Weather Phenomena: Active obscuration or precipitation descriptor` });
        return;
      }
      if (/^(FEW|SCT|BKN|OVC)\d{3}$/.test(cleanToken)) {
        const typeMap: Record<string, string> = { OVC: 'Overcast', BKN: 'Broken', SCT: 'Scattered', FEW: 'Few' };
        const height = parseInt(cleanToken.slice(3, 6), 10) * 100;
        elements.push({ code: cleanToken, explanation: `Cloud Ceiling: ${typeMap[cleanToken.slice(0, 3)]} layer reported at ${height.toLocaleString()} ft AGL` });
        return;
      }
      if (/^(M?\d{2})\/(M?\d{2})$/.test(cleanToken)) {
        elements.push({ code: cleanToken, explanation: `Thermodynamics: Temperature / Dew Point spread configuration` });
        return;
      }
      if (/^A\d{4}$/.test(cleanToken)) {
        elements.push({ code: cleanToken, explanation: `Altimeter Setting: Barometric pressure reference ${cleanToken.slice(1,3)}.${cleanToken.slice(3,5)} inHg` });
        return;
      }
      elements.push({ code: cleanToken, explanation: stationName || 'Supplemental Station Remark or Metadata' });
    });
    return elements;
  };

  const clearInputs = () => {
    setAirportElevation('');
    setTemperature('');
    setAltimeterSetting('29.92');
    setDewPoint('');
  };

  const densityResults = calculateDensityAltitude();
  const cloudBaseResult = calculateCloudBase();
  const windResults = calculateWindComponents();
  const trueAirspeedResult = calculateTrueAirspeed();
  const recData = generateFlightRecommendations();
  const decodedTokens = parseMetarTokens();

  return (
    <div className="max-w-[1200px] mx-auto w-full rounded-lg shadow-lg border border-theme-accent/35 dark:border-theme-accent-dark/35 bg-theme-card dark:bg-theme-card-dark">
      <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/35 dark:border-theme-accent-dark/35 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Cloud className="w-6 h-6 text-theme-accent dark:text-theme-accent-dark" />
          <h2 className="text-2xl font-bold text-theme-primary dark:text-theme-primary-dark">Advanced Aviation Weather & Performance Calculator</h2>
        </div>
        <p className="text-sm opacity-75 text-theme-secondary dark:text-theme-secondary-dark">
          Comprehensive METAR/TAF parser, density altitude analyzer, crosswind calculator, and true airspeed utility.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 rounded-lg border border-theme-accent/35 dark:border-theme-accent-dark/35 bg-theme-bg dark:bg-theme-bg-dark p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">ICAO Station Lookup</label>
              <input 
                type="text" 
                maxLength={5} 
                placeholder="KPBI" 
                value={icaoCode} 
                onChange={(e) => setIcaoCode(e.target.value.toUpperCase())} 
                className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark uppercase tracking-widest font-mono" 
              />
            </div>
            <button 
              type="button"
              onClick={fetchWeather} 
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-theme-accent hover:bg-theme-accent/80 dark:bg-theme-accent-dark dark:hover:bg-theme-accent-dark/80 text-white text-sm font-black uppercase tracking-widest transition-colors"
            >
              {weatherLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />} Fetch METAR / TAF
            </button>
          </div>

          {weatherError && (
            <div className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 p-3 text-sm text-red-800 dark:text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
              <span>{weatherError}</span>
            </div>
          )}

          {(metar || taf) && !weatherError && (
            <div className="space-y-3">
              {flightCategory && (
                <div className="flex flex-col gap-2 p-3 bg-theme-card dark:bg-theme-card-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 rounded">
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-secondary dark:text-theme-secondary-dark">Flight Category:</div>
                    <div className={`text-xl font-black tracking-widest ${
                      flightCategory === 'VFR' ? 'text-green-600 dark:text-green-400' :
                      flightCategory === 'MVFR' ? 'text-blue-600 dark:text-blue-400' :
                      flightCategory === 'IFR' ? 'text-theme-accent dark:text-theme-accent-dark' : 'text-purple-600 dark:text-purple-400'
                    }`}>
                      {flightCategory}
                    </div>
                  </div>
                  
                  {activeHazard && (
                    <div className="mt-2 flex items-start gap-2 text-xs p-2.5 rounded bg-red-50 dark:bg-red-950/30 border border-red-200 text-red-800 dark:text-red-300">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-600" />
                      <div>
                        <span className="font-bold">Severe Weather Flag:</span> Active {activeHazard} verified in report string. Standard routing cautions recommended.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {decodedTokens.length > 0 && (
                <div className="p-4 rounded-lg bg-theme-card dark:bg-theme-card-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-theme-primary dark:text-theme-primary-dark">
                    Decoded METAR Token Glossary
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {decodedTokens.map((item, idx) => (
                      <div key={idx} className="p-2 rounded bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 text-xs">
                        <span className="font-mono font-bold text-theme-accent dark:text-theme-accent-dark mr-2">{item.code}</span>
                        <span className="text-theme-secondary dark:text-theme-secondary-dark">{item.explanation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recData && (
                <div className={`p-4 rounded-md border ${
                  recData.hazardLevel === 'high' ? 'bg-red-50/60 dark:bg-red-950/20 border-red-300/40 text-red-900 dark:text-red-200' :
                  recData.hazardLevel === 'med' ? 'bg-yellow-50/60 dark:bg-yellow-950/20 border-yellow-300/40 text-yellow-900 dark:text-yellow-200' :
                  'bg-green-50/60 dark:bg-green-950/20 border-green-300/40 text-green-900 dark:text-green-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider text-theme-primary dark:text-theme-primary-dark">
                    <Info className="w-4 h-4" />
                    Operational Recommendations & Risk Matrix
                  </div>
                  <div className="space-y-1 text-xs text-theme-secondary dark:text-theme-secondary-dark">
                    {recData.insights.map((insight, idx) => (
                      <p key={idx}>• {insight}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 rounded overflow-x-auto">
                  <div className="font-bold mb-1 text-theme-primary dark:text-theme-primary-dark">RAW METAR</div>
                  <div className="text-theme-secondary dark:text-theme-secondary-dark">{metar}</div>
                </div>
                <div className="p-3 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 rounded overflow-x-auto">
                  <div className="font-bold mb-1 text-theme-primary dark:text-theme-primary-dark">RAW TAF</div>
                  <div className="text-theme-secondary dark:text-theme-secondary-dark">{taf}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 border border-theme-accent/35 dark:border-theme-accent-dark/35 rounded-md overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => setActiveTool('density')}
            className={`py-3 px-2 text-[10px] sm:text-xs font-black tracking-wider border-r border-theme-accent/35 transition-all ${
              activeTool === 'density' ? 'bg-theme-accent text-white' : 'text-theme-secondary hover:bg-theme-card/50'
            }`}
          >
            Density Altitude
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('cloudbase')}
            className={`py-3 px-2 text-[10px] sm:text-xs font-black tracking-wider border-r border-theme-accent/35 transition-all ${
              activeTool === 'cloudbase' ? 'bg-theme-accent text-white' : 'text-theme-secondary hover:bg-theme-card/50'
            }`}
          >
            Cloud Base
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('wind')}
            className={`py-3 px-2 text-[10px] sm:text-xs font-black tracking-wider border-r border-theme-accent/35 transition-all ${
              activeTool === 'wind' ? 'bg-theme-accent text-white' : 'text-theme-secondary hover:bg-theme-card/50'
            }`}
          >
            Wind Components
          </button>
          <button
            type="button"
            onClick={() => setActiveTool('tas')}
            className={`py-3 px-2 text-[10px] sm:text-xs font-black tracking-wider transition-all ${
              activeTool === 'tas' ? 'bg-theme-accent text-white' : 'text-theme-secondary hover:bg-theme-card/50'
            }`}
          >
            True Airspeed
          </button>
        </div>

        {activeTool === 'density' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Airport Elevation (ft)</label>
                <input
                  type="number"
                  placeholder="Elevation"
                  value={airportElevation}
                  onChange={(e) => setAirportElevation(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Temp °C"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Altimeter Setting (inHg)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="29.92"
                  value={altimeterSetting}
                  onChange={(e) => setAltimeterSetting(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={clearInputs}
              className="px-4 py-2 text-xs font-semibold rounded bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary dark:hover:text-theme-primary-dark transition-colors"
            >
              Clear Inputs
            </button>

            <div className="mt-4 p-4 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 space-y-3">
              <h3 className="text-sm font-bold text-theme-primary dark:text-theme-primary-dark">Performance Results Summary</h3>
              {densityResults ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 rounded bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark">Pressure Altitude</div>
                    <div className="text-lg font-bold text-theme-primary dark:text-theme-primary-dark">{densityResults.pressureAltitude.toLocaleString()} ft</div>
                  </div>
                  <div className="p-3 rounded bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark">Density Altitude</div>
                    <div className="text-xl font-black text-theme-accent dark:text-theme-accent-dark">{densityResults.densityAltitude.toLocaleString()} ft</div>
                  </div>
                  <div className="p-3 rounded bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark">Takeoff Roll Factor</div>
                    <div className="text-lg font-bold text-theme-primary dark:text-theme-primary-dark">+{Math.round((parseFloat(densityResults.takeoffFactor) - 1) * 100)}%</div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark italic">Provide elevation, temperature, and altimeter values to calculate performance.</div>
              )}
            </div>
          </div>
        )}

        {activeTool === 'cloudbase' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Temperature (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Dew Point (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dewPoint}
                  onChange={(e) => setDewPoint(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 space-y-2">
              <h3 className="text-sm font-bold text-theme-primary dark:text-theme-primary-dark">Estimated Ceiling (AGL)</h3>
              {cloudBaseResult !== null ? (
                <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark">{cloudBaseResult.toLocaleString()} feet AGL</div>
              ) : (
                <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark italic">Enter temperature and dew point variables.</div>
              )}
            </div>
          </div>
        )}

        {activeTool === 'wind' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Runway Heading (°)</label>
                <input
                  type="number"
                  value={runwayHeading}
                  onChange={(e) => setRunwayHeading(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Wind Direction (°)</label>
                <input
                  type="number"
                  value={windDirection}
                  onChange={(e) => setWindDirection(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Wind Speed (kts)</label>
                <input
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 space-y-3">
              <h3 className="text-sm font-bold text-theme-primary dark:text-theme-primary-dark">Wind Component Breakdown</h3>
              {windResults ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark">{windResults.isTailwind ? 'Tailwind Component' : 'Headwind Component'}</div>
                    <div className="text-xl font-black text-theme-primary dark:text-theme-primary-dark">{windResults.headwind} kts</div>
                  </div>
                  <div className="p-3 rounded bg-theme-card dark:bg-theme-card-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                    <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark">Crosswind Component</div>
                    <div className="text-xl font-black text-theme-accent dark:text-theme-accent-dark">{windResults.crosswind} kts</div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark italic">Enter runway and wind vectors.</div>
              )}
            </div>
          </div>
        )}

        {activeTool === 'tas' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Calibrated Airspeed (CAS)</label>
                <input
                  type="number"
                  value={calibratedAirspeed}
                  onChange={(e) => setCalibratedAirspeed(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-primary dark:text-theme-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-theme-primary dark:text-theme-primary-dark">Calculated Density Altitude (ft)</label>
                <input
                  type="text"
                  disabled
                  value={densityResults ? densityResults.densityAltitude : 'Calculate DA first'}
                  className="w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/35 dark:border-theme-accent-dark/35 text-theme-secondary dark:text-theme-secondary-dark cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/35 dark:border-theme-accent-dark/35 space-y-2">
              <h3 className="text-sm font-bold text-theme-primary dark:text-theme-primary-dark">True Airspeed (TAS) Result</h3>
              {trueAirspeedResult !== null ? (
                <div className="text-2xl font-black text-theme-primary dark:text-theme-primary-dark">{trueAirspeedResult} Knots (KTAS)</div>
              ) : (
                <div className="text-xs text-theme-secondary dark:text-theme-secondary-dark italic">Ensure Density Altitude is computed and CAS is entered.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCalculator;