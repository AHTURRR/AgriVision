import React, { useEffect, useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { BottomNav } from './components/BottomNav';
import { DataVisualizationScreen } from './components/DataVisualizationScreen';
import { DetailScreen } from './components/DetailScreen';
import { EducationScreen } from './components/EducationScreen';
import { HomeScreen } from './components/HomeScreen';
import { Navbar } from './components/Navbar';
import { ScanScreen } from './components/ScanScreen';
import { INITIAL_TELEMETRIES, INITIAL_USER, MOCK_DIAGNOSTICS } from './data/mockData';
import { ActiveTab, DiagnosticRecord, SensorTelemetry, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [diagnostics, setDiagnostics] = useState<DiagnosticRecord[]>(MOCK_DIAGNOSTICS);
  const [telemetries, setTelemetries] = useState<SensorTelemetry[]>(INITIAL_TELEMETRIES);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [streamSpeed, setStreamSpeed] = useState<number>(2000);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Real-time sensor telemetry stream simulator
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setTelemetries((prev) => {
        const last = prev[prev.length - 1];
        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        // Dynamic fluctuations around real environmental patterns
        const dMoisture = (Math.random() - 0.48) * 3.5;
        const newMoisture = Math.min(96, Math.max(55, Math.round((last?.leafMoisture || 75) + dMoisture)));

        const dTemp = (Math.random() - 0.5) * 0.4;
        const newTemp = +(Math.min(34, Math.max(24, (last?.ambientTemp || 28.5) + dTemp)).toFixed(1));

        const dLight = (Math.random() - 0.5) * 4;
        const newLight = Math.min(105, Math.max(45, Math.round((last?.lightIndexLux || 80) + dLight)));

        const dHumidity = (Math.random() - 0.5) * 2;
        const newHumidity = Math.min(95, Math.max(50, Math.round((last?.airHumidity || 75) + dHumidity)));

        // Risk is higher if leaf moisture and air humidity are high
        const moistureFactor = (newMoisture - 50) * 0.8;
        const riskCalc = Math.min(95, Math.max(30, Math.round(moistureFactor + Math.random() * 10)));

        const blocks = ['Blok B', 'Blok A', 'Blok C'];
        const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];

        const newPoint: SensorTelemetry = {
          timestamp: timeStr,
          timeVal: Date.now(),
          leafMoisture: newMoisture,
          ambientTemp: newTemp,
          lightIndexLux: newLight,
          airHumidity: newHumidity,
          lesionRiskScore: riskCalc,
          activeBlock: randomBlock,
        };

        // Keep rolling buffer of 24 points for clean chart rendering
        const updated = [...prev, newPoint];
        if (updated.length > 24) {
          return updated.slice(updated.length - 24);
        }
        return updated;
      });
    }, streamSpeed);

    return () => clearInterval(interval);
  }, [isStreaming, streamSpeed]);

  const handleNewScan = (record: DiagnosticRecord) => {
    setDiagnostics((prev) => [record, ...prev]);
  };

  const handleUploadData = (newPoints: SensorTelemetry[]) => {
    setTelemetries((prev) => [...prev, ...newPoints].slice(-30));
  };

  const latestDiagnosis = diagnostics[0] || MOCK_DIAGNOSTICS[0];

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] flex flex-col font-sans selection:bg-[#7cf994] selection:text-[#003b1b]">
      {/* Top Universal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        isStreaming={isStreaming}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-20 sm:pb-12 px-3 sm:px-6">
        {isMobileFrame ? (
          /* Mobile Device Frame Simulation on Desktop */
          <div className="flex justify-center items-start py-4">
            <div className="w-full max-w-[420px] bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[8px] border-slate-900 overflow-hidden relative min-h-[780px] flex flex-col">
              {/* Phone Speaker Notch */}
              <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-xl flex items-center justify-center mb-1">
                <div className="w-12 h-1 rounded-full bg-slate-700"></div>
              </div>

              {/* Mobile Screen Body */}
              <div className="flex-1 overflow-y-auto px-3 pt-2 pb-20">
                {activeTab === 'beranda' && (
                  <HomeScreen
                    setActiveTab={setActiveTab}
                    latestDiagnosis={latestDiagnosis}
                    user={user}
                  />
                )}
                {activeTab === 'scan' && (
                  <ScanScreen setActiveTab={setActiveTab} onNewScan={handleNewScan} />
                )}
                {activeTab === 'detail' && (
                  <DetailScreen
                    diagnosis={latestDiagnosis}
                    setActiveTab={setActiveTab}
                    telemetries={telemetries}
                    user={user}
                  />
                )}
                {activeTab === 'visualisasi' && (
                  <DataVisualizationScreen
                    telemetries={telemetries}
                    diagnostics={diagnostics}
                    user={user}
                    isStreaming={isStreaming}
                    setIsStreaming={setIsStreaming}
                    streamSpeed={streamSpeed}
                    setStreamSpeed={setStreamSpeed}
                    onUploadData={handleUploadData}
                  />
                )}
                {activeTab === 'edukasi' && <EducationScreen />}
                {activeTab === 'akun' && <AuthScreen user={user} setUser={setUser} />}
              </div>

              {/* Bottom Phone Bar inside simulator */}
              <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        ) : (
          /* Full Responsive View (Fits Mobile through Desktop) */
          <div className="max-w-7xl mx-auto w-full">
            {activeTab === 'beranda' && (
              <HomeScreen
                setActiveTab={setActiveTab}
                latestDiagnosis={latestDiagnosis}
                user={user}
              />
            )}
            {activeTab === 'scan' && (
              <ScanScreen setActiveTab={setActiveTab} onNewScan={handleNewScan} />
            )}
            {activeTab === 'detail' && (
              <DetailScreen
                diagnosis={latestDiagnosis}
                setActiveTab={setActiveTab}
                telemetries={telemetries}
                user={user}
              />
            )}
            {activeTab === 'visualisasi' && (
              <DataVisualizationScreen
                telemetries={telemetries}
                diagnostics={diagnostics}
                user={user}
                isStreaming={isStreaming}
                setIsStreaming={setIsStreaming}
                streamSpeed={streamSpeed}
                setStreamSpeed={setStreamSpeed}
                onUploadData={handleUploadData}
              />
            )}
            {activeTab === 'edukasi' && <EducationScreen />}
            {activeTab === 'akun' && <AuthScreen user={user} setUser={setUser} />}
          </div>
        )}
      </main>

      {/* Bottom Floating Navigation for Mobile screens */}
      {!isMobileFrame && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
}
