import React, { useRef, useState } from 'react';
import { D3BlockComparison } from './D3BlockComparison';
import { D3DiseaseDonut, DiseaseStat } from './D3DiseaseDonut';
import { D3RealTimeChart } from './D3RealTimeChart';
import { exportToCSV, exportToPDF } from '../utils/exportReport';
import { DiagnosticRecord, SensorTelemetry, UserProfile } from '../types';

interface Props {
  telemetries: SensorTelemetry[];
  diagnostics: DiagnosticRecord[];
  user: UserProfile;
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
  streamSpeed: number;
  setStreamSpeed: (speed: number) => void;
  onUploadData: (newTelemetries: SensorTelemetry[]) => void;
}

export const DataVisualizationScreen: React.FC<Props> = ({
  telemetries,
  diagnostics,
  user,
  isStreaming,
  setIsStreaming,
  streamSpeed,
  setStreamSpeed,
  onUploadData,
}) => {
  const [selectedBlock, setSelectedBlock] = useState<string>('Semua');
  const [activeMetrics, setActiveMetrics] = useState({
    leafMoisture: true,
    lesionRisk: true,
    temp: true,
    light: true,
  });
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter telemetries by block
  const filteredData = telemetries.filter((t) =>
    selectedBlock === 'Semua' ? true : t.activeBlock === selectedBlock
  );

  // Latest readings
  const latest = telemetries[telemetries.length - 1] || {
    leafMoisture: 72,
    lesionRiskScore: 65,
    ambientTemp: 28.5,
    lightIndexLux: 85,
    airHumidity: 75,
  };

  // Aggregated disease stats for D3 Donut
  const diseaseStats: DiseaseStat[] = [
    { name: 'Bercak Daun Cercospora', count: 28, percentage: 54, color: '#dc2626', category: 'Jamur' },
    { name: 'Antraknosa Buah/Daun', count: 12, percentage: 23, color: '#d97706', category: 'Jamur' },
    { name: 'Virus Kuning (Gemini)', count: 7, percentage: 13, color: '#eab308', category: 'Virus' },
    { name: 'Daun Sehat Tanpa Gejala', count: 5, percentage: 10, color: '#16a34a', category: 'Sehat' },
  ];

  // Block comparison data for D3 Bar chart
  const blockData = [
    { blockName: 'Blok A (Utara)', healthScore: 88, infectedPercent: 12, treatedPercent: 90 },
    { blockName: 'Blok B (Tengah)', healthScore: 64, infectedPercent: 36, treatedPercent: 65 },
    { blockName: 'Blok C (Selatan)', healthScore: 78, infectedPercent: 22, treatedPercent: 80 },
    { blockName: 'Blok D (Barat)', healthScore: 92, infectedPercent: 8, treatedPercent: 95 },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseDataFile(file);
  };

  const parseDataFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        // Parse CSV or JSON
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            onUploadData(parsed);
            setUploadSuccessMsg(`Berhasil mengunggah ${parsed.length} titik data sensor JSON!`);
          }
        } else {
          // Simple CSV parser
          const lines = text.split('\n').filter((l) => l.trim().length > 0);
          const newRows: SensorTelemetry[] = [];
          lines.slice(1).forEach((line, idx) => {
            const cols = line.split(',').map((c) => c.replace(/"/g, '').trim());
            if (cols.length >= 4) {
              newRows.push({
                timestamp: cols[0] || `Upload-${idx + 1}`,
                timeVal: Date.now() + idx * 1000,
                leafMoisture: parseFloat(cols[2]) || Math.floor(Math.random() * 30 + 60),
                ambientTemp: parseFloat(cols[3]) || 28.0,
                lightIndexLux: parseFloat(cols[4]) || 75,
                airHumidity: parseFloat(cols[5]) || 70,
                lesionRiskScore: parseFloat(cols[6]) || 65,
                activeBlock: cols[1] || 'Blok B',
              });
            }
          });
          if (newRows.length > 0) {
            onUploadData(newRows);
            setUploadSuccessMsg(`Berhasil memuat ${newRows.length} baris data CSV ke D3.js!`);
          } else {
            setUploadSuccessMsg('File dimuat, format baris ditambahkan ke stream visualisasi.');
          }
        }
        setTimeout(() => setUploadSuccessMsg(null), 4000);
      } catch (err) {
        console.error('File parsing error:', err);
        setUploadSuccessMsg('Gagal membaca file data. Pastikan format CSV/JSON valid.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto gap-4 pb-12">
      {/* Upload Notification Toast */}
      {uploadSuccessMsg && (
        <div className="bg-[#14532d] text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between border border-emerald-400/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">check_circle</span>
            <span className="text-xs sm:text-sm font-semibold">{uploadSuccessMsg}</span>
          </div>
          <button onClick={() => setUploadSuccessMsg(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Header & Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006e2d] text-[24px]">insights</span>
            <h1 className="text-lg sm:text-xl font-bold text-[#003b1b]">
              Visualisasi Data Lapangan Real-Time (D3.js)
            </h1>
          </div>
          <p className="text-xs text-[#404941] mt-0.5">
            Streaming telemetri sensor iklim mikro, indeks kelembaban daun, & analisis risiko lesi jamur
          </p>
        </div>

        {/* Action Buttons: Export PDF & CSV */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportToCSV(diagnostics, telemetries, user)}
            className="h-10 px-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs"
            title="Unduh data dalam format CSV"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-600">table_chart</span>
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={() => exportToPDF(diagnostics, telemetries, user)}
            className="h-10 px-3.5 rounded-xl bg-[#003b1b] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#002b14] transition-colors shadow-xs"
            title="Cetak Laporan PDF Resmi"
          >
            <span className="material-symbols-outlined text-[18px] text-[#7ffc97]">picture_as_pdf</span>
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Real-time KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Kelembaban Daun */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Kelembaban Daun
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-[#14532d]">{latest.leafMoisture}%</span>
              <span className="text-[10px] text-slate-400">Sensor WL-1</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Basah • Spora Aktif</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">water_drop</span>
          </div>
        </div>

        {/* Card 2: Skor Risiko Jamur */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Risiko Cercospora
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-rose-600">{latest.lesionRiskScore}%</span>
              <span className="text-[10px] text-slate-400">Tinggi</span>
            </div>
            <span className="text-[10px] text-rose-600 font-semibold">Perlu Pemantauan</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
        </div>

        {/* Card 3: Suhu Lingkungan */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Suhu Mikro Lahan
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-amber-700">
                {latest.ambientTemp.toFixed(1)}°C
              </span>
              <span className="text-[10px] text-slate-400">RH {latest.airHumidity}%</span>
            </div>
            <span className="text-[10px] text-amber-700 font-semibold">Cerah Optimal</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">thermostat</span>
          </div>
        </div>

        {/* Card 4: Indeks Cahaya */}
        <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Radiasi Cahaya
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-sky-700">{latest.lightIndexLux}</span>
              <span className="text-[10px] text-slate-400">kLux</span>
            </div>
            <span className="text-[10px] text-sky-700 font-semibold">Optimal Fotosintesis</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
          </div>
        </div>
      </div>

      {/* Real-time Stream Control Deck */}
      <div className="bg-[#e9edff] rounded-2xl p-3.5 sm:p-4 border border-indigo-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Play/Pause streaming */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              isStreaming
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-[#14532d] text-white hover:bg-[#003b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isStreaming ? 'pause' : 'play_arrow'}
            </span>
            <span>{isStreaming ? 'Jeda Streaming Real-Time' : 'Mulai Streaming Sensor'}</span>
          </button>

          {/* Speed picker */}
          <div className="flex items-center bg-white rounded-xl border border-slate-200 p-0.5 text-xs">
            <button
              onClick={() => setStreamSpeed(1000)}
              className={`px-2 py-1 rounded-lg font-bold ${
                streamSpeed === 1000 ? 'bg-[#14532d] text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              1d
            </button>
            <button
              onClick={() => setStreamSpeed(2000)}
              className={`px-2 py-1 rounded-lg font-bold ${
                streamSpeed === 2000 ? 'bg-[#14532d] text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              2d
            </button>
            <button
              onClick={() => setStreamSpeed(5000)}
              className={`px-2 py-1 rounded-lg font-bold ${
                streamSpeed === 5000 ? 'bg-[#14532d] text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              5d
            </button>
          </div>
        </div>

        {/* Filter Blok */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[#14532d]">Filter Blok:</span>
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Semua">Semua Blok Lahan</option>
            <option value="Blok A">Blok A (Utara)</option>
            <option value="Blok B">Blok B (Tengah - Terinfeksi)</option>
            <option value="Blok C">Blok C (Selatan)</option>
          </select>
        </div>

        {/* Metric Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-semibold">
          <button
            onClick={() =>
              setActiveMetrics((p) => ({ ...p, leafMoisture: !p.leafMoisture }))
            }
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              activeMetrics.leafMoisture
                ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Kelembaban
          </button>

          <button
            onClick={() =>
              setActiveMetrics((p) => ({ ...p, lesionRisk: !p.lesionRisk }))
            }
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              activeMetrics.lesionRisk
                ? 'bg-rose-100 border-rose-400 text-rose-800'
                : 'bg-white border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            Risiko Lesi
          </button>

          <button
            onClick={() => setActiveMetrics((p) => ({ ...p, temp: !p.temp }))}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              activeMetrics.temp
                ? 'bg-amber-100 border-amber-400 text-amber-800'
                : 'bg-white border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Suhu
          </button>

          <button
            onClick={() => setActiveMetrics((p) => ({ ...p, light: !p.light }))}
            className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              activeMetrics.light
                ? 'bg-sky-100 border-sky-400 text-sky-800'
                : 'bg-white border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500"></span>
            Cahaya
          </button>
        </div>
      </div>

      {/* Main D3 Real-Time Chart Card */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-[#141b2b] flex items-center gap-1.5">
            <span>Grafik Multi-Sensor Time-Series D3.js</span>
            <span className="text-[11px] font-normal text-slate-500">({filteredData.length} data point aktif)</span>
          </h2>
          <span className="text-[11px] text-slate-500">Arahkan kursor / sentuh grafik untuk inspeksi nilai</span>
        </div>

        <D3RealTimeChart data={filteredData} activeMetrics={activeMetrics} />
      </div>

      {/* Sub-Charts Layout: Donut & Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <D3DiseaseDonut stats={diseaseStats} />
        <D3BlockComparison data={blockData} />
      </div>

      {/* File Upload Dropzone (for CSV / JSON datasets) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.[0]) parseDataFile(e.dataTransfer.files[0]);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-[#006e2d] bg-emerald-50'
            : 'border-slate-300 bg-white hover:border-[#006e2d] hover:bg-[#f9f9ff]'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv,.json,text/csv"
          className="hidden"
        />
        <div className="w-12 h-12 rounded-2xl bg-[#e9edff] text-[#003b1b] flex items-center justify-center mb-2 shadow-xs">
          <span className="material-symbols-outlined text-[28px]">upload_file</span>
        </div>
        <h3 className="text-sm font-bold text-[#141b2b]">
          Unggah File Dataset Baru (CSV / JSON)
        </h3>
        <p className="text-xs text-[#404941] mt-0.5 max-w-md leading-relaxed">
          Tarik & lepas file data sensor perkebunan Anda ke sini, atau klik untuk memilih file dari komputer / ponsel. D3.js akan memetakan data secara instan.
        </p>
        <span className="text-[11px] font-bold text-[#006e2d] mt-2 underline">
          Pilih Dokumen CSV / JSON
        </span>
      </div>

      {/* Raw Data Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#141b2b]">Tabel Log Pembacaan Sensor Terkini</h3>
            <p className="text-xs text-slate-500">Tercatat oleh modul stasiun cuaca & pemindai AI di lapangan</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {filteredData.length} Baris
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#f8fafc] text-slate-700 font-bold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Waktu</th>
                <th className="py-2.5 px-4">Blok</th>
                <th className="py-2.5 px-4">Kelembaban Daun</th>
                <th className="py-2.5 px-4">Risiko Spora</th>
                <th className="py-2.5 px-4">Suhu</th>
                <th className="py-2.5 px-4">Cahaya</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.slice(-8).reverse().map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-semibold text-slate-900">
                    {row.timestamp}
                  </td>
                  <td className="py-2.5 px-4">{row.activeBlock}</td>
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-emerald-700">{row.leafMoisture}%</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`font-bold ${
                        row.lesionRiskScore > 75 ? 'text-rose-600' : 'text-amber-600'
                      }`}
                    >
                      {row.lesionRiskScore}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4">{row.ambientTemp.toFixed(1)}°C</td>
                  <td className="py-2.5 px-4">{row.lightIndexLux} klux</td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.lesionRiskScore > 75
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {row.lesionRiskScore > 75 ? 'Perlu Waspada' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
