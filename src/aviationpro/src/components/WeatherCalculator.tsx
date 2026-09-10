import { useState } from 'react';
import { AlertCircle, Cloud, CloudRain, Gauge, Loader2, Thermometer } from 'lucide-react';
import React from 'react';
import { fetchAirportWeather } from '../utils/weatherService';

const WeatherCalculator: React.FC = () => {
  const [icaoCode, setIcaoCode] = useState<string>('');
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [metar, setMetar] = useState<string>('');
  const [taf, setTaf] = useState<string>('');
  const [flightCategory, setFlightCategory] = useState<'VFR' | 'MVFR' | 'IFR' | 'LIFR' | null>(null);
  const [airportElevation, setAirportElevation] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [altimeterSetting, setAltimeterSetting] = useState<string>('29.92');
  const [dewPoint, setDewPoint] = useState<string>('');
  const [activeTool, setActiveTool] = useState<'density' | 'cloudbase'>('density');

  const fetchWeather = async () => {
    const code = icaoCode.trim().toUpperCase();

    if (!code) {
      setWeatherError('Enter a 4-letter ICAO code first');
      return;
    }

    setWeatherLoading(true);
    setWeatherError(null);

    try {
      const weather = await fetchAirportWeather(code);

      if (weather.error) {
        setWeatherError(weather.error);
        return;
      }

      setMetar(weather.metar?.metar || 'No METAR returned for this airport');
      setTaf(weather.taf?.taf || 'No TAF returned for this airport');
      setFlightCategory(weather.metar?.flightCategory || null);
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

    if (isNaN(elevation) || isNaN(tempCelsius) || isNaN(altimeter)) {
      return null;
    }

    // Input validation for Celsius
    if (elevation < -1000 || elevation > 20000) {
      return { error: 'Airport elevation must be between -1,000 and 20,000 feet' };
    }
    if (tempCelsius < -60 || tempCelsius > 60) {
      return { error: 'Temperature must be between -60°C and 60°C' };
    }
    if (altimeter < 28.00 || altimeter > 32.00) {
      return { error: 'Altimeter setting must be between 28.00 and 32.00 inHg' };
    }

    // Pressure altitude calculation
    const pressureAltitude = elevation + (29.92 - altimeter) * 1000;

    // Density altitude calculation using Celsius
    // DA = PA + (120 * (OAT - ISA))
    // ISA temperature at pressure altitude = 15°C - (2°C per 1000 ft)
    const isaTempCelsius = 15 - (pressureAltitude / 1000) * 2;
    const densityAltitude = pressureAltitude + (120 * (tempCelsius - isaTempCelsius));

    return {
      pressureAltitude: Math.round(pressureAltitude),
      densityAltitude: Math.round(densityAltitude),
      isaDeviation: tempCelsius - isaTempCelsius
    };
  };

  const calculateCloudBase = () => {
    const temp = parseFloat(temperature);
    const dew = parseFloat(dewPoint);

    if (isNaN(temp) || isNaN(dew)) {
      return null;
    }

    // Cloud base formula: (Temperature - Dew Point) / 2.5 * 1000 feet
    const cloudBase = ((temp - dew) / 2.5) * 1000;
    return Math.round(cloudBase);
  };

  const clearInputs = () => {
    setAirportElevation('');
    setTemperature('');
    setAltimeterSetting('29.92');
    setDewPoint('');
  };

  const densityResults = calculateDensityAltitude();
  const cloudBaseResult = calculateCloudBase();

  return (
    <div className="rounded-lg shadow-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark">
      <div className="bg-theme-header dark:bg-theme-header-dark border-b border-theme-accent/30 dark:border-theme-accent-dark/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Cloud className="w-6 h-6 text-theme-accent dark:text-theme-accent-dark" />
          <h2 className="text-2xl font-bold text-theme-primary dark:text-theme-primary-dark">Weather Calculator</h2>
        </div>
        <p className="text-sm opacity-75 text-theme-secondary dark:text-theme-secondary-dark">
          Calculate pressure/density altitude and cloud base for accurate flight planning.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6 rounded-lg border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-bg dark:bg-theme-bg-dark p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">ICAO Airport Code</label>
              <input
                type="text"
                maxLength={4}
                placeholder="KPHX"
                value={icaoCode}
                onChange={(e) => setIcaoCode(e.target.value.toUpperCase())}
                className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark uppercase tracking-widest"
              />
            </div>
            <button
              onClick={fetchWeather}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-theme-accent hover:bg-theme-accent/80 dark:bg-theme-accent-dark dark:hover:bg-theme-accent-dark/80 text-white text-sm font-black uppercase tracking-widest transition-colors"
            >
              {weatherLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Cloud className="w-4 h-4" />}
              Fetch Weather
            </button>
          </div>

          {weatherError && (
            <div className="flex items-start gap-3 rounded-md border border-theme-accent/50 dark:border-theme-accent-dark/50 bg-theme-header dark:bg-theme-header-dark p-3 text-sm text-theme-primary dark:text-theme-primary-dark">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-theme-accent dark:text-theme-accent-dark" />
              <span>{weatherError}</span>
            </div>
          )}

          {(metar || taf) && !weatherError && (
            <div className="space-y-3">
              {flightCategory && (
                <div className="flex items-center gap-3 p-3 bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-secondary dark:text-theme-secondary-dark">Flight Category:</div>
                  <div className={`text-xl font-black tracking-widest ${
                    flightCategory === 'VFR' ? 'text-green-600 dark:text-green-400' :
                    flightCategory === 'MVFR' ? 'text-blue-600 dark:text-blue-400' :
                    flightCategory === 'IFR' ? 'text-theme-accent dark:text-theme-accent-dark' :
                    'text-purple-600 dark:text-purple-400'
                  }`}>
                    {flightCategory}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="rounded-md border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-bg dark:bg-theme-bg-dark p-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-secondary dark:text-theme-secondary-dark mb-2">METAR</div>
                  <p className="text-sm text-theme-primary dark:text-theme-primary-dark break-words whitespace-pre-wrap">{metar}</p>
                </div>
                <div className="rounded-md border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-bg dark:bg-theme-bg-dark p-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-secondary dark:text-theme-secondary-dark mb-2">TAF</div>
                  <p className="text-sm text-theme-primary dark:text-theme-primary-dark break-words whitespace-pre-wrap">{taf}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tool Selector */}
        <div className="flex flex-wrap bg-theme-bg dark:bg-theme-bg-dark border border-theme-accent/30 dark:border-theme-accent-dark/30 rounded-sm overflow-hidden mb-6">
          <button
            onClick={() => setActiveTool('density')}
            className={`flex-1 min-w-[120px] py-4 px-4 text-[9px] font-black tracking-widest border-r border-theme-accent/30 dark:border-theme-accent-dark/30 transition-all ${
              activeTool === 'density'
                ? 'bg-theme-accent dark:bg-theme-accent-dark text-white shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]'
                : 'text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary dark:hover:text-theme-primary-dark hover:bg-theme-card/50 dark:hover:bg-theme-card-dark/50'
            }`}
          >
            <Gauge className="w-4 h-4 inline mr-2" />
            Density Altitude
          </button>
          <button
            onClick={() => setActiveTool('cloudbase')}
            className={`flex-1 min-w-[120px] py-4 px-4 text-[9px] font-black tracking-widest transition-all ${
              activeTool === 'cloudbase'
                ? 'bg-theme-accent dark:bg-theme-accent-dark text-white shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]'
                : 'text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary dark:hover:text-theme-primary-dark hover:bg-theme-card/50 dark:hover:bg-theme-card-dark/50'
            }`}
          >
            <Cloud className="w-4 h-4 inline mr-2" />
            Cloud Base
          </button>
        </div>

        {activeTool === 'density' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">
                  <Gauge className="w-4 h-4 inline mr-2" />
                  Airport Elevation (ft)
                </label>
                <input
                  type="number"
                  placeholder="Enter airport elevation"
                  value={airportElevation}
                  onChange={(e) => setAirportElevation(e.target.value)}
                  className={`w-full p-3 border rounded-md ${'bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark'}`}
                  min="-1000"
                  max="20000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">
                  <Thermometer className="w-4 h-4 inline mr-2" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className={`w-full p-3 border rounded-md ${'bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark'}`}
                  min="-60"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">
                  <Gauge className="w-4 h-4 inline mr-2" />
                  Altimeter Setting (inHg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="29.92"
                  value={altimeterSetting}
                  onChange={(e) => setAltimeterSetting(e.target.value)}
                  className={`w-full p-3 border rounded-md ${'bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark'}`}
                  min="28.00"
                  max="32.00"
                />
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={clearInputs}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${'bg-theme-header dark:bg-theme-header-dark hover:bg-theme-accent/10 dark:hover:bg-theme-accent-dark/10 text-theme-primary dark:text-theme-primary-dark'}`}
              >
                Clear All Inputs
              </button>
            </div>

            <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark">
              <h4 className="text-lg font-semibold mb-4 text-theme-primary dark:text-theme-primary-dark">Density Altitude Results</h4>
              {densityResults && !('error' in densityResults) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm opacity-75 mb-1 text-theme-secondary dark:text-theme-secondary-dark">Pressure Altitude</div>
                      <div className="text-2xl font-bold text-theme-accent dark:text-theme-accent-dark">
                        {densityResults.pressureAltitude.toLocaleString()} ft
                      </div>
                    </div>

                    <div>
                      <div className="text-sm opacity-75 mb-1 text-theme-secondary dark:text-theme-secondary-dark">ISA Temperature Deviation</div>
                      <div className={`text-lg font-semibold ${densityResults.isaDeviation > 0 ? 'text-theme-accent dark:text-theme-accent-dark' : 'text-theme-secondary dark:text-theme-secondary-dark'}`}>
                        {densityResults.isaDeviation > 0 ? '+' : ''}{densityResults.isaDeviation.toFixed(1)}°C
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm opacity-75 mb-1 text-theme-secondary dark:text-theme-secondary-dark">Density Altitude</div>
                      <div className="text-3xl font-bold text-theme-accent dark:text-theme-accent-dark">
                        {densityResults.densityAltitude.toLocaleString()} ft
                      </div>
                    </div>

                    <div className="text-sm opacity-75">
                      <div className={`p-3 rounded-lg ${
                        densityResults.densityAltitude > 5000 ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' :
                        densityResults.densityAltitude > 3000 ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200' :
                        'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
                      }`}>
                        {densityResults.densityAltitude > 5000 ? '⚠️ High density altitude - significant performance degradation' :
                         densityResults.densityAltitude > 3000 ? '⚠️ Moderate density altitude - monitor performance' :
                         '✓ Normal density altitude conditions'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : densityResults && 'error' in densityResults ? (
                <div className="text-center py-8">
                  <div className="text-theme-accent dark:text-theme-accent-dark mb-2">⚠️ Input Error</div>
                  <div className="text-sm opacity-75 text-theme-secondary dark:text-theme-secondary-dark">{densityResults.error}</div>
                </div>
              ) : (
                <div className="text-center py-8 opacity-50">
                  <Cloud className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-theme-secondary dark:text-theme-secondary-dark">Enter airport elevation, temperature, and altimeter setting</p>
                </div>
              )}

              {densityResults && !('error' in densityResults) && (
                <div className="mt-6 p-4 bg-theme-header dark:bg-theme-header-dark rounded-lg">
                  <h5 className="font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">Performance Impact:</h5>
                  <div className="text-sm space-y-1 text-theme-secondary dark:text-theme-secondary-dark">
                    <div>• Higher density altitude reduces engine power and propeller efficiency</div>
                    <div>• Takeoff distance increases, climb rate decreases</div>
                    <div>• Cruise speed may be lower than expected</div>
                    <div>• Landing distance may increase</div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">Formulas Used:</h4>
                <div className="text-sm p-3 rounded bg-theme-bg dark:bg-theme-bg-dark font-mono space-y-2 text-theme-secondary dark:text-theme-secondary-dark">
                  <div>PA = Elevation + (29.92 - Altimeter) × 1000</div>
                  <div>DA = PA + (120 × (OAT - ISA))</div>
                  <div>ISA = 15°C - (PA ÷ 1000) × 2°C</div>
                </div>
                <div className="text-xs mt-2 opacity-75 text-theme-secondary dark:text-theme-secondary-dark">
                  PA = Pressure Altitude, DA = Density Altitude, OAT = Outside Air Temperature (°C), ISA = International Standard Atmosphere
                </div>
              </div>
            </div>
          </>
        )}

        {activeTool === 'cloudbase' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">
                  <Thermometer className="w-4 h-4 inline mr-2" />
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">
                  <CloudRain className="w-4 h-4 inline mr-2" />
                  Dew Point (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter dew point"
                  value={dewPoint}
                  onChange={(e) => setDewPoint(e.target.value)}
                  className="w-full p-3 border rounded-md bg-theme-card dark:bg-theme-card-dark border-theme-accent/30 dark:border-theme-accent-dark/30 text-theme-primary dark:text-theme-primary-dark focus:border-theme-accent dark:focus:border-theme-accent-dark"
                />
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={clearInputs}
                className="px-6 py-2 rounded-md text-sm font-medium transition-colors bg-theme-header dark:bg-theme-header-dark hover:bg-theme-accent/10 dark:hover:bg-theme-accent-dark/10 text-theme-primary dark:text-theme-primary-dark"
              >
                Clear Inputs
              </button>
            </div>

            <div className="p-6 rounded-lg bg-theme-bg dark:bg-theme-bg-dark">
              <h4 className="text-lg font-semibold mb-4 text-theme-primary dark:text-theme-primary-dark">Cloud Base Result</h4>
              {cloudBaseResult !== null ? (
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-theme-accent dark:text-theme-accent-dark">
                    {cloudBaseResult.toLocaleString()} ft
                  </div>
                  <div className="text-sm opacity-75 text-theme-secondary dark:text-theme-secondary-dark">AGL Cloud Base</div>
                  <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Note:</strong> This is an approximation. Always check current METAR/TAF reports for official ceiling information.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 opacity-50">
                  <Cloud className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-theme-secondary dark:text-theme-secondary-dark">Enter temperature and dew point to calculate cloud base</p>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-medium mb-2 text-theme-primary dark:text-theme-primary-dark">Formula Used:</h4>
                <div className="text-sm p-3 rounded bg-theme-bg dark:bg-theme-bg-dark font-mono text-theme-secondary dark:text-theme-secondary-dark">
                  Cloud Base = (Temp - Dew Point) / 2.5 × 1000 ft
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherCalculator;
