import { useState } from 'react';
import { MapPin, Navigation, Ruler, Globe, Clock, ExternalLink } from 'lucide-react';
import React from 'react';

// Shared input class for consistent theming
const inputCls = "w-full p-3 border rounded-md bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark placeholder:text-theme-secondary/50 dark:placeholder:text-theme-secondary-dark/50 focus:border-theme-accent dark:focus:border-theme-accent-dark outline-none transition-colors";
const labelCls = "block text-sm font-medium mb-2 text-theme-secondary dark:text-theme-secondary-dark";
const headingCls = "text-xl font-bold text-theme-primary dark:text-theme-primary-dark";
const subHeadingCls = "font-semibold text-theme-primary dark:text-theme-primary-dark";

const NavigationTools: React.FC = () => {
  const [activetool, setActiveTool] = useState('distance');

  // Distance Calculator State
  const [distanceCalc, setDistanceCalc] = useState({
    lat1: '', lon1: '', lat2: '', lon2: '', result: null as number | null
  });

  // Bearing Calculator State
  const [bearingCalc, setBearingCalc] = useState({
    lat1: '', lon1: '', lat2: '', lon2: '', result: null as number | null
  });

  // Unit Conversions State
  const [conversions, setConversions] = useState({
    nauticalMiles: '', statuteMiles: '', kilometers: '', feet: '',
    gallons: '', pounds: '', celsius: '', fahrenheit: '', meters: '', altitudeFeet: ''
  });

  const convertFuel = (val: number, from: 'gal' | 'lbs') => {
    const ratio = 6.0;
    setConversions(prev => ({
      ...prev,
      gallons: from === 'gal' ? val.toString() : (val / ratio).toFixed(1),
      pounds: from === 'lbs' ? val.toString() : (val * ratio).toFixed(1)
    }));
  };

  const convertTemp = (val: number, from: 'c' | 'f') => {
    setConversions(prev => ({
      ...prev,
      celsius: from === 'c' ? val.toString() : ((val - 32) * 5 / 9).toFixed(1),
      fahrenheit: from === 'f' ? val.toString() : (val * 9 / 5 + 32).toFixed(1)
    }));
  };

  const convertAlt = (val: number, from: 'm' | 'ft') => {
    setConversions(prev => ({
      ...prev,
      meters: from === 'm' ? val.toString() : (val / 3.28084).toFixed(1),
      altitudeFeet: from === 'ft' ? val.toString() : (val * 3.28084).toFixed(1)
    }));
  };

  const weatherServices = [
    { name: 'Aviation Weather Center (NOAA)', url: 'https://aviationweather.gov', description: 'Official US aviation weather - METARs, TAFs, NOTAMs' },
    { name: 'National Weather Service Aviation', url: 'https://weather.gov/aviation', description: 'Aviation-specific forecasts and weather graphics' },
    { name: 'Garmin Pilot Web', url: 'https://pilotweb.garmin.com/', description: 'Garmin flight planning, charts, and weather in the browser' },
    { name: 'ForeFlight Web', url: 'https://plan.foreflight.com/map', description: 'ForeFlight route planning and weather maps online' },
    { name: 'SkyVector', url: 'https://skyvector.com', description: 'Free aviation charts and planning tools' },
    { name: 'AirNav', url: 'https://airnav.com', description: 'Airport and FBO information database' },
    { name: 'FlightAware', url: 'https://flightaware.com', description: 'Flight tracking and delay information' },
    { name: '1800WXBrief', url: 'https://1800wxbrief.com', description: 'FAA weather briefing service' }
  ];

  const [timeConverter, setTimeConverter] = useState({ utcTime: '', localOffset: '', convertedTime: '' });

  const tools = [
    { id: 'distance', label: 'Distance', icon: Ruler },
    { id: 'bearing', label: 'Bearing', icon: Navigation },
    { id: 'conversions', label: 'Conversions', icon: MapPin },
    { id: 'aviation-weather', label: 'Weather Links', icon: Globe },
    { id: 'time-zones', label: 'Time Zones', icon: Clock }
  ];

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const calculateDistance = () => {
    const lat1 = parseFloat(distanceCalc.lat1), lon1 = parseFloat(distanceCalc.lon1);
    const lat2 = parseFloat(distanceCalc.lat2), lon2 = parseFloat(distanceCalc.lon2);
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;
    const R = 3440.065;
    const dLat = toRadians(lat2 - lat1), dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    setDistanceCalc(prev => ({ ...prev, result: R * c }));
  };

  const calculateBearing = () => {
    const lat1 = parseFloat(bearingCalc.lat1), lon1 = parseFloat(bearingCalc.lon1);
    const lat2 = parseFloat(bearingCalc.lat2), lon2 = parseFloat(bearingCalc.lon2);
    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;
    const dLon = toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRadians(lat2));
    const x = Math.cos(toRadians(lat1)) * Math.sin(toRadians(lat2)) - Math.sin(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.cos(dLon);
    setBearingCalc(prev => ({ ...prev, result: (toDegrees(Math.atan2(y, x)) + 360) % 360 }));
  };

  const convertTimeZone = () => {
    if (!timeConverter.utcTime || isNaN(parseFloat(timeConverter.localOffset))) return;
    const [hours, minutes] = timeConverter.utcTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return;
    const offset = parseFloat(timeConverter.localOffset);
    const localMinutes = ((hours * 60 + minutes + offset * 60) % 1440 + 1440) % 1440;
    const lh = Math.floor(localMinutes / 60), lm = Math.floor(localMinutes % 60);
    setTimeConverter(prev => ({ ...prev, convertedTime: `${lh.toString().padStart(2, '0')}:${lm.toString().padStart(2, '0')}` }));
  };

  const convertUnits = (value: number, fromUnit: string) => {
    let nm: number;
    switch (fromUnit) {
      case 'nm': nm = value; break;
      case 'sm': nm = value / 1.15078; break;
      case 'km': nm = value / 1.852; break;
      case 'ft': nm = value / 6076.12; break;
      default: return;
    }
    setConversions(prev => ({
      ...prev,
      nauticalMiles: nm.toFixed(3), statuteMiles: (nm * 1.15078).toFixed(3),
      kilometers: (nm * 1.852).toFixed(3), feet: (nm * 6076.12).toFixed(0)
    }));
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full bg-theme-card dark:bg-theme-card-dark rounded-lg shadow-lg border border-theme-accent/30 dark:border-theme-accent-dark/30">
      {/* Header + Tab Bar */}
      <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 p-4 sm:p-6">
        <h2 className={`text-xl sm:text-2xl font-bold mb-4 ${headingCls}`}>Navigation Tools</h2>
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/25 dark:border-theme-accent-dark/30 rounded-lg">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold tracking-wide transition-all border ${
                  activetool === tool.id
                    ? 'bg-theme-action dark:bg-theme-action-dark text-white border-theme-action dark:border-theme-action-dark shadow-sm'
                    : 'bg-theme-card dark:bg-theme-card-dark text-theme-secondary dark:text-theme-secondary-dark border-theme-accent/20 dark:border-theme-accent-dark/20 hover:border-theme-accent/40 dark:hover:border-theme-accent-dark/40 hover:text-theme-primary dark:hover:text-theme-primary-dark'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">

        {/* Distance Calculator */}
        {activetool === 'distance' && (
          <div className="space-y-6">
            <h3 className={headingCls}>Distance Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className={`mb-3 ${subHeadingCls}`}>From Coordinates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Latitude</label>
                      <input type="number" step="any" value={distanceCalc.lat1} onChange={(e) => setDistanceCalc({ ...distanceCalc, lat1: e.target.value })} className={inputCls} placeholder="40.7128" />
                    </div>
                    <div>
                      <label className={labelCls}>Longitude</label>
                      <input type="number" step="any" value={distanceCalc.lon1} onChange={(e) => setDistanceCalc({ ...distanceCalc, lon1: e.target.value })} className={inputCls} placeholder="-74.0060" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className={`mb-3 ${subHeadingCls}`}>To Coordinates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Latitude</label>
                      <input type="number" step="any" value={distanceCalc.lat2} onChange={(e) => setDistanceCalc({ ...distanceCalc, lat2: e.target.value })} className={inputCls} placeholder="34.0522" />
                    </div>
                    <div>
                      <label className={labelCls}>Longitude</label>
                      <input type="number" step="any" value={distanceCalc.lon2} onChange={(e) => setDistanceCalc({ ...distanceCalc, lon2: e.target.value })} className={inputCls} placeholder="-118.2437" />
                    </div>
                  </div>
                </div>
                <button onClick={calculateDistance} className="w-full py-3 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white rounded-md font-semibold transition-opacity">Calculate Distance</button>
              </div>
              <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                <h4 className={`text-lg font-bold mb-4 ${subHeadingCls}`}>Result</h4>
                {distanceCalc.result !== null ? (
                  <div className="text-center">
                    <div className="text-3xl font-black mb-2 text-theme-accent dark:text-theme-accent-dark">{distanceCalc.result.toFixed(1)} nm</div>
                    <div className="text-sm space-y-1 text-theme-secondary dark:text-theme-secondary-dark">
                      <div>{(distanceCalc.result * 1.15078).toFixed(1)} statute miles</div>
                      <div>{(distanceCalc.result * 1.852).toFixed(1)} kilometers</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-theme-secondary/60 dark:text-theme-secondary-dark/60">
                    <Ruler className="w-16 h-16 mx-auto mb-4" />
                    <p>Enter coordinates to calculate distance</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bearing Calculator */}
        {activetool === 'bearing' && (
          <div className="space-y-6">
            <h3 className={headingCls}>Bearing Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className={`mb-3 ${subHeadingCls}`}>From Coordinates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Latitude</label><input type="number" step="any" value={bearingCalc.lat1} onChange={(e) => setBearingCalc({ ...bearingCalc, lat1: e.target.value })} className={inputCls} /></div>
                    <div><label className={labelCls}>Longitude</label><input type="number" step="any" value={bearingCalc.lon1} onChange={(e) => setBearingCalc({ ...bearingCalc, lon1: e.target.value })} className={inputCls} /></div>
                  </div>
                </div>
                <div>
                  <h4 className={`mb-3 ${subHeadingCls}`}>To Coordinates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Latitude</label><input type="number" step="any" value={bearingCalc.lat2} onChange={(e) => setBearingCalc({ ...bearingCalc, lat2: e.target.value })} className={inputCls} /></div>
                    <div><label className={labelCls}>Longitude</label><input type="number" step="any" value={bearingCalc.lon2} onChange={(e) => setBearingCalc({ ...bearingCalc, lon2: e.target.value })} className={inputCls} /></div>
                  </div>
                </div>
                <button onClick={calculateBearing} className="w-full py-3 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white rounded-md font-semibold transition-opacity">Calculate Bearing</button>
              </div>
              <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 dark:border-theme-accent-dark/20 flex flex-col items-center justify-center">
                <h4 className={`text-lg font-bold mb-4 ${subHeadingCls} self-start`}>Result & Heading Dial</h4>
                {bearingCalc.result !== null ? (
                  <div className="flex flex-col items-center">
                    {/* Compass Rose Visualizer */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-4 flex items-center justify-center">
                      {/* Compass Rose Outer Bezel */}
                      <div className="absolute inset-0 rounded-full border border-theme-accent/40 dark:border-theme-accent-dark/40 bg-theme-card/60 dark:bg-theme-card-dark/60 shadow-inner" />

                      {/* Fixed Compass Rose Card */}
                      <img
                        src="/assets/aviation/compass-2024.svg"
                        alt="Compass Rose"
                        className="w-full h-full object-contain p-2 select-none pointer-events-none opacity-90 dark:opacity-95"
                      />

                      {/* Rotating Pointer / Arrow (points directly towards calculated bearing) */}
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
                        style={{ transform: `rotate(${bearingCalc.result}deg)` }}
                      >
                        <img
                          src="/assets/aviation/compass-arrow.svg"
                          alt="Bearing Pointer"
                          className="w-full h-full object-contain select-none pointer-events-none drop-shadow-md"
                        />
                      </div>

                      {/* Central Center Cap */}
                      <div className="absolute w-5 h-5 rounded-full bg-theme-accent dark:bg-theme-accent-dark border-2 border-theme-card dark:border-theme-card-dark shadow z-10" />
                    </div>

                    <div className="text-3xl font-black mb-1 text-theme-accent dark:text-theme-accent-dark tracking-wider">
                      {bearingCalc.result.toFixed(1)}°
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold text-theme-secondary dark:text-theme-secondary-dark">
                      True Bearing
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-theme-secondary/60 dark:text-theme-secondary-dark/60">
                    <div className="relative w-32 h-32 mx-auto mb-4 opacity-40">
                      <img
                        src="/assets/aviation/compass-2024.svg"
                        alt="Compass Preview"
                        className="w-full h-full object-contain grayscale"
                      />
                    </div>
                    <p className="text-sm">Enter coordinates to calculate bearing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Unit Conversions */}
        {activetool === 'conversions' && (
          <div className="space-y-6">
            <h3 className={headingCls}>Unit Conversions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Nautical Miles</label>
                  <input type="number" step="any" value={conversions.nauticalMiles} onChange={(e) => { setConversions({ ...conversions, nauticalMiles: e.target.value }); const v = parseFloat(e.target.value); if (!isNaN(v)) convertUnits(v, 'nm'); }} className={inputCls} placeholder="100" />
                </div>
                <div>
                  <label className={labelCls}>Statute Miles</label>
                  <input type="number" step="any" value={conversions.statuteMiles} onChange={(e) => { setConversions({ ...conversions, statuteMiles: e.target.value }); const v = parseFloat(e.target.value); if (!isNaN(v)) convertUnits(v, 'sm'); }} className={inputCls} placeholder="115.078" />
                </div>
                <div>
                  <label className={labelCls}>Kilometers</label>
                  <input type="number" step="any" value={conversions.kilometers} onChange={(e) => { setConversions({ ...conversions, kilometers: e.target.value }); const v = parseFloat(e.target.value); if (!isNaN(v)) convertUnits(v, 'km'); }} className={inputCls} placeholder="185.2" />
                </div>
                <div>
                  <label className={`mb-2 text-sm font-medium ${subHeadingCls}`}>Fuel (Avgas 6lb/gal)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Gal" value={conversions.gallons} onChange={(e) => convertFuel(parseFloat(e.target.value), 'gal')} className={inputCls} />
                    <input type="number" placeholder="Lbs" value={conversions.pounds} onChange={(e) => convertFuel(parseFloat(e.target.value), 'lbs')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={`mb-2 text-sm font-medium ${subHeadingCls}`}>Temperature</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="°C" value={conversions.celsius} onChange={(e) => convertTemp(parseFloat(e.target.value), 'c')} className={inputCls} />
                    <input type="number" placeholder="°F" value={conversions.fahrenheit} onChange={(e) => convertTemp(parseFloat(e.target.value), 'f')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={`mb-2 text-sm font-medium ${subHeadingCls}`}>Altitude / Distance</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="number" placeholder="Meters" value={conversions.meters} onChange={(e) => convertAlt(parseFloat(e.target.value), 'm')} className={inputCls} />
                    <input type="number" placeholder="Feet" value={conversions.altitudeFeet} onChange={(e) => convertAlt(parseFloat(e.target.value), 'ft')} className={inputCls} />
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                <h4 className={`text-lg font-bold mb-4 ${subHeadingCls}`}>Aviation Distance Reference</h4>
                <div className="space-y-3 text-sm text-theme-secondary dark:text-theme-secondary-dark">
                  <div><strong className={subHeadingCls}>1 nautical mile =</strong></div>
                  <div>• 1.15078 statute miles</div>
                  <div>• 1.852 kilometers</div>
                  <div>• 6,076.12 feet</div>
                  <div>• 1 minute of latitude</div>
                  <div className="mt-4"><strong className={subHeadingCls}>Quick References:</strong></div>
                  <div>• 60 nm = 1° latitude</div>
                  <div>• 1 nm ≈ 2,000 yards</div>
                  <div>• Standard rate turn: 3°/second</div>
                  <div>• 1 knot = 1 nm/hour</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aviation Weather Services */}
        {activetool === 'aviation-weather' && (
          <div className="space-y-6">
            <h3 className={headingCls}>Official Aviation Weather Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weatherServices.map((service, index) => (
                <div key={index} className="p-4 rounded-lg border bg-theme-bg dark:bg-theme-bg-dark border-theme-accent/30 dark:border-theme-accent-dark/30">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-semibold text-sm ${subHeadingCls}`}>{service.name}</h4>
                    <ExternalLink className="w-4 h-4 text-theme-secondary/50 dark:text-theme-secondary-dark/50" />
                  </div>
                  <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark mb-3">{service.description}</p>
                  <a href={service.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white px-3 py-1.5 rounded-md transition-opacity">
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
              <h4 className={`font-semibold mb-2 ${subHeadingCls}`}>Weather Briefing Tips</h4>
              <ul className="text-sm space-y-1 text-theme-secondary dark:text-theme-secondary-dark">
                <li>• Always get an official briefing before flight</li>
                <li>• Check NOTAMs for airspace changes</li>
                <li>• Monitor for convective SIGMETs</li>
                <li>• Review TAFs for destination and alternates</li>
                <li>• Check winds aloft for route planning</li>
              </ul>
            </div>
          </div>
        )}

        {/* Time Zone Converter */}
        {activetool === 'time-zones' && (
          <div className="space-y-6">
            <h3 className={headingCls}>Time Zone Converter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>UTC Time (HH:MM)</label>
                  <input type="time" value={timeConverter.utcTime} onChange={(e) => setTimeConverter({ ...timeConverter, utcTime: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Local Time Offset (hours)</label>
                  <input type="number" step="0.5" value={timeConverter.localOffset} onChange={(e) => setTimeConverter({ ...timeConverter, localOffset: e.target.value })} className={inputCls} placeholder="-5" min="-12" max="14" />
                </div>
                <button onClick={convertTimeZone} className="w-full py-3 bg-theme-accent dark:bg-theme-accent-dark hover:opacity-90 text-white rounded-md font-semibold transition-opacity">Convert Time</button>
              </div>
              <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/20 dark:border-theme-accent-dark/20">
                <h4 className={`text-lg font-bold mb-4 ${subHeadingCls}`}>Converted Time</h4>
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-theme-accent dark:text-theme-accent-dark">{timeConverter.convertedTime || '--:--'}</div>
                  <div className="text-sm text-theme-secondary dark:text-theme-secondary-dark mt-1">Local Time</div>
                </div>
                <div className="space-y-2 text-sm">
                  <h5 className={`font-semibold ${subHeadingCls}`}>Common UTC Offsets:</h5>
                  <div className="grid grid-cols-2 gap-2 text-xs text-theme-secondary dark:text-theme-secondary-dark">
                    <div>EST (UTC-5)</div><div>CST (UTC-6)</div>
                    <div>MST (UTC-7)</div><div>PST (UTC-8)</div>
                    <div>GMT (UTC+0)</div><div>CET (UTC+1)</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-theme-accent/10 dark:bg-theme-accent-dark/10 border border-theme-accent/20 dark:border-theme-accent-dark/20 rounded-md">
                  <h6 className={`font-medium text-xs mb-1 ${subHeadingCls}`}>Aviation Time Reference:</h6>
                  <p className="text-xs text-theme-secondary dark:text-theme-secondary-dark">All aviation times are in UTC (Zulu time) unless specified otherwise</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NavigationTools;
