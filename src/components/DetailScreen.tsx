import React, { useState } from 'react';
import { exportToCSV, exportToPDF } from '../utils/exportReport';
import { ActiveTab, DiagnosticRecord, SensorTelemetry, UserProfile } from '../types';

interface Props {
  diagnosis: DiagnosticRecord;
  setActiveTab: (tab: ActiveTab) => void;
  telemetries: SensorTelemetry[];
  user: UserProfile;
}

export const DetailScreen: React.FC<Props> = ({ diagnosis, setActiveTab, telemetries, user }) => {
  const [heatmapVisible, setHeatmapVisible] = useState(true);
  const [feedback, setFeedback] = useState<'Sesuai' | 'Ragu' | 'Beda' | null>(diagnosis.feedback || null);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFarmerVote = (type: 'Sesuai' | 'Ragu' | 'Beda') => {
    setFeedback(type);
    setToastMessage(`Terima kasih! Verifikasi ${type} berhasil dicatat.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    setIsSaved(true);
    setToastMessage('Catatan diagnosa berhasil disimpan ke Riwayat Kebun!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-10">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 max-w-md mx-auto z-50 bg-[#14532d] text-white p-3.5 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">task_alt</span>
          <span className="text-xs sm:text-sm font-semibold flex-1">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Screen Header Bar */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={() => setActiveTab('beranda')}
          className="w-10 h-10 -ml-1 flex items-center justify-center text-[#003b1b] rounded-full hover:bg-slate-100 transition-colors"
          title="Kembali ke Beranda"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-base sm:text-lg font-bold text-[#003b1b] flex-1 text-center truncate pr-8">
          Hasil Diagnosa Detail
        </h1>
      </div>

      {/* Dynamic Session Bar */}
      <div className="bg-[#f1f3ff] rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-xs border border-indigo-50 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#006e2d] text-[20px] flex-shrink-0 material-symbols-filled">
            verified
          </span>
          <p className="text-xs sm:text-sm text-[#141b2b] truncate">
            Sesi Analisis: <span className="font-bold text-[#003b1b]">{diagnosis.sessionTitle}</span>
          </p>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] font-bold flex-shrink-0">
          {diagnosis.timeAgo}
        </span>
      </div>

      {/* Hero Photo with AI Heatmap Inspection */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-slate-900 border border-slate-200">
        <img
          alt="Foto daun cabai teranalisis"
          className="w-full h-72 sm:h-80 object-cover block"
          src={diagnosis.image}
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none"></div>

        {/* Top Overlay Tags */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#003b1b]/80 backdrop-blur-md text-white shadow-xs">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Deteksi Lesi AI</span>
          </div>

          <button
            onClick={() => setHeatmapVisible(!heatmapVisible)}
            className="h-8 px-3 rounded-full bg-white/90 backdrop-blur-md text-[#003b1b] text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]">
              {heatmapVisible ? 'layers' : 'layers_clear'}
            </span>
            <span>{heatmapVisible ? 'Sorotan Aktif' : 'Foto Polos'}</span>
          </button>
        </div>

        {/* Bounding Box / Lesion Heatmap Simulation */}
        {heatmapVisible && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
            {/* Main Symptom Target Circle */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-rose-500/20 flex items-center justify-center animate-pulse"
              style={{ top: diagnosis.heatmapCoords.top, left: diagnosis.heatmapCoords.left }}
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/30 shadow-[0_0_24px_rgba(220,38,38,0.6)] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px] drop-shadow">
                  filter_center_focus
                </span>
              </div>
            </div>

            {/* Coordinate Badge */}
            <div
              className="absolute bg-white/95 text-[#141b2b] px-2 py-1 rounded-lg shadow-md flex items-center gap-1.5 border border-rose-200"
              style={{ top: '48%', left: '56%' }}
            >
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
              <span className="text-[11px] font-bold text-rose-600">{diagnosis.heatmapCoords.label}</span>
            </div>
          </div>
        )}

        {/* Bottom Overlay Note */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <p className="opacity-90 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">photo_camera</span>
            Kamera Lapangan 12MP • Jarak 18cm
          </p>
          <span className="bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
            Fokus Jelas
          </span>
        </div>
      </div>

      {/* Primary AI Result Header Card */}
      <div className="mt-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col gap-3">
        {/* Cautionary Humility Chip */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e1e8fd] text-[#404941]">
            <span className="material-symbols-outlined text-[16px] text-amber-700">psychology</span>
            <span className="text-[11px] font-semibold">Indikasi Awal AI (Bukan Vonis Mutlak)</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#7ffc97] text-[#002109]">
            <span className="material-symbols-outlined text-[16px] material-symbols-filled">
              check_circle
            </span>
            <span className="text-[11px] font-bold">{diagnosis.confidence}% Keyakinan</span>
          </div>
        </div>

        {/* Disease Name */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#003b1b] tracking-tight">
            {diagnosis.diseaseName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 italic mt-0.5">{diagnosis.latinName}</p>
        </div>

        {/* Confidence Explainability Accordion */}
        <div className="bg-[#e9edff] rounded-xl p-3 flex items-start gap-3 border border-indigo-100">
          <div className="w-8 h-8 rounded-full bg-[#006e2d] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-[#003b1b]">
              Apa arti {diagnosis.confidence}% Keyakinan?
            </h4>
            <p className="text-xs text-[#404941] leading-relaxed">
              AI mencocokkan kemiripan bentuk bercak bundar dan lingkaran tepi pada foto daun ini dengan ribuan riwayat kasus terverifikasi. Kondisi cuaca dan kebun Anda tetap menjadi faktor penentu utama.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Why Did AI Give This Result? */}
      <div className="mt-5">
        <div className="flex items-center justify-between pb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-5 rounded-full bg-[#003b1b]"></div>
            <h3 className="text-base font-bold text-[#141b2b]">Kenapa AI Mendeteksi Ini?</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">3 Ciri Ditemukan</span>
        </div>

        <div className="flex flex-col gap-2 mt-1.5">
          {diagnosis.symptoms.map((symp) => (
            <div
              key={symp.number}
              className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#003b1b] font-bold text-sm flex-shrink-0">
                {symp.number}
              </div>
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm font-semibold text-[#141b2b]">{symp.title}</p>
                <p className="text-xs text-[#404941] mt-0.5 leading-relaxed">{symp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Limitations of AI */}
      <div className="mt-4 bg-[#e1e8fd] rounded-2xl p-4 flex flex-col gap-1 border border-indigo-100">
        <div className="flex items-center gap-2 text-amber-800">
          <span className="material-symbols-outlined text-[20px]">info</span>
          <h4 className="text-xs sm:text-sm font-bold text-[#141b2b]">Batasan Analisis AI Hari Ini</h4>
        </div>
        <p className="text-xs text-[#404941] leading-relaxed mt-0.5">{diagnosis.limitations}</p>
      </div>

      {/* Section: Recommended Immediate Action Steps */}
      <div className="mt-5">
        <div className="flex items-center gap-2 pb-1.5">
          <div className="w-2.5 h-5 rounded-full bg-[#006e2d]"></div>
          <h3 className="text-base font-bold text-[#141b2b]">Langkah Mandiri di Kebun</h3>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mt-1.5 flex flex-col gap-3.5">
          {diagnosis.steps.map((step) => (
            <div key={step.letter} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#b1f2be] text-[#00210d] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                {step.letter}
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-[#141b2b]">{step.title}</span>
                <span className="text-xs text-[#404941] leading-relaxed mt-0.5">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Feedback / Farmer Crowdsourced Validation */}
      <div className="mt-5 bg-[#e9edff] rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-xs text-center flex flex-col items-center gap-2.5">
        <div className="w-11 h-11 rounded-full bg-[#96d5a3] text-[#12512c] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[24px]">rate_review</span>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="text-sm sm:text-base font-bold text-[#003b1b]">
            Verifikasi Anda Sangat Berharga
          </h4>
          <p className="text-xs text-[#404941] mt-1 max-w-xs leading-relaxed">
            Apakah indikasi bercak Cercospora ini sesuai dengan pengamatan mata Anda di bedengan?
          </p>
        </div>

        {/* 3 Friendly Big Touch Buttons */}
        <div className="grid grid-cols-3 gap-2 w-full pt-1">
          <button
            onClick={() => handleFarmerVote('Sesuai')}
            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all flex flex-col items-center gap-1 ${
              feedback === 'Sesuai'
                ? 'bg-[#006e2d] text-white ring-2 ring-emerald-300'
                : 'bg-white text-[#141b2b] hover:bg-emerald-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">thumb_up</span>
            <span>Sesuai</span>
          </button>

          <button
            onClick={() => handleFarmerVote('Ragu')}
            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all flex flex-col items-center gap-1 ${
              feedback === 'Ragu'
                ? 'bg-amber-600 text-white ring-2 ring-amber-300'
                : 'bg-white text-[#141b2b] hover:bg-amber-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Ragu</span>
          </button>

          <button
            onClick={() => handleFarmerVote('Beda')}
            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-all flex flex-col items-center gap-1 ${
              feedback === 'Beda'
                ? 'bg-[#ba1a1a] text-white ring-2 ring-rose-300'
                : 'bg-white text-[#141b2b] hover:bg-rose-50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
            <span>Beda</span>
          </button>
        </div>

        {feedback && (
          <div className="py-2 px-3 rounded-xl bg-[#7ffc97] text-[#002109] w-full flex items-center justify-center gap-2 mt-1">
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span className="text-xs font-bold">Status: Diverifikasi {feedback} oleh Petani</span>
          </div>
        )}
      </div>

      {/* Primary Call To Actions (Bottom Stack) */}
      <div className="mt-5 flex flex-col gap-2.5">
        {/* Action 1: Call PPL / Field Officer */}
        <a
          href="tel:08123456789"
          className="w-full h-13 rounded-2xl bg-[#003b1b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#002b14] active:scale-[0.99] transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">support_agent</span>
          <span>Konsultasi Petugas Lapangan (PPL)</span>
        </a>

        {/* Action 2: Save to Plant Journal */}
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full h-13 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            isSaved
              ? 'bg-[#7ffc97] text-[#002109]'
              : 'bg-[#dce2f7] text-[#003b1b] hover:bg-[#cfd7f5] active:scale-[0.99]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {isSaved ? 'task_alt' : 'bookmark_add'}
          </span>
          <span>{isSaved ? 'Tersimpan di Riwayat Kebun' : 'Simpan ke Catatan Kebun'}</span>
        </button>

        {/* Action 3: Direct Export PDF & CSV */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => exportToPDF([diagnosis], telemetries, user)}
            className="h-11 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-rose-600">picture_as_pdf</span>
            <span>Ekspor PDF</span>
          </button>
          <button
            onClick={() => exportToCSV([diagnosis], telemetries, user)}
            className="h-11 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-600">table_chart</span>
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
