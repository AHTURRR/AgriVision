import React from 'react';
import { ASSETS } from '../data/mockData';
import { ActiveTab, DiagnosticRecord, UserProfile } from '../types';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
  latestDiagnosis: DiagnosticRecord;
  user: UserProfile;
}

export const HomeScreen: React.FC<Props> = ({ setActiveTab, latestDiagnosis, user }) => {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-4 pb-8">
      {/* Greeting & Environmental Status Bar */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs transition-all">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#141b2b]">
                Selamat Pagi, {user.name.split(' ')[0]}
              </h1>
              <span aria-hidden="true" className="text-[#006e2d] select-none text-xl">🌱</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-[#404941] text-xs sm:text-sm flex-wrap">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px] text-[#003b1b]">location_on</span>
                <span className="font-semibold text-slate-800">{user.farmName || 'Lahan Cabai Rawit'}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="inline-flex items-center gap-1 text-amber-700">
                <span className="material-symbols-outlined text-[18px]">sunny</span>
                <span>Cerah 29°C</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#f1f3ff] px-3.5 py-2 rounded-xl flex-shrink-0 border border-indigo-50">
            <span className="text-[11px] font-semibold text-[#404941]">Indeks Cahaya</span>
            <span className="text-base font-bold text-[#006e2d]">Optimal</span>
          </div>
        </div>
      </section>

      {/* Value Promise & AI Guidance Banner */}
      <section className="bg-[#e1e8fd] rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#14532d] text-[#87c695] flex items-center justify-center flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-[#006e2d] font-bold uppercase tracking-wider">
                Filosofi Pendampingan
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#b1f2be] text-[#00210d] text-[11px] font-bold">
                Bukan Pengganti Petani
              </span>
            </div>
            <h2 className="text-base sm:text-lg text-[#003b1b] font-bold mt-1 leading-snug">
              Melihat dengan AI, Memahami dengan Teknologi
            </h2>
            <p className="text-xs sm:text-sm text-[#404941] mt-1 leading-relaxed">
              AgriVision membantu memetakan pola visual daun secara objektif. Setiap diagnosis dirancang agar Anda dapat memverifikasi fakta lapangan sebelum menentukan tindakan proteksi.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Hero Action Card (Camera Launch) */}
      <section className="bg-gradient-to-br from-[#7ffc97] to-[#62df7d] text-[#002109] rounded-2xl p-5 sm:p-7 shadow-md relative overflow-hidden border border-emerald-300">
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Camera Lens Visual Accent */}
          <div className="relative w-20 h-20 rounded-full bg-[#003b1b] flex items-center justify-center text-white shadow-lg mb-3">
            <div className="w-16 h-16 rounded-full bg-[#14532d] flex items-center justify-center ring-2 ring-emerald-300/40">
              <span className="material-symbols-outlined text-[36px] text-[#7ffc97]">photo_camera</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#7cf994] text-[#007230] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#002109] tracking-tight">
            Periksa Gejala Daun Sekarang
          </h2>
          <p className="text-xs sm:text-sm text-[#005320] mt-1 max-w-sm font-medium leading-relaxed">
            Arahkan kamera ke daun bergejala. AI akan mengenali tanda bercak, layu, atau defisiensi nutrisi dalam hitungan detik.
          </p>

          {/* Full-Width High-Affordance Button */}
          <button
            onClick={() => setActiveTab('scan')}
            className="w-full mt-4 py-3.5 px-6 rounded-xl bg-[#003b1b] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:bg-[#002b14] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">center_focus_strong</span>
            <span>Mulai Pindai Tanaman</span>
          </button>

          <div className="flex items-center gap-1.5 mt-3 text-[#005320] text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">signal_wifi_4_bar</span>
            <span>Tersedia Mode Deteksi Offline di Lapangan</span>
          </div>
        </div>
      </section>

      {/* Educational Triad: 3 Alur Filosofi AgriVision */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-[#141b2b] font-bold">3 Langkah Solusi Cermat</h3>
          <span className="text-xs font-semibold text-[#404941]">Panduan Lapangan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Step 1 */}
          <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#e1e8fd] flex flex-col items-center justify-center text-[#003b1b] flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">filter_center_focus</span>
              <span className="text-[10px] font-bold">01</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#141b2b]">1. Lihat Gejala</span>
              <p className="text-xs text-[#404941] mt-0.5 leading-relaxed">
                Ambil foto daun yang jelas di bawah sinar matahari alami tanpa bayangan tangan.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#e1e8fd] flex flex-col items-center justify-center text-[#003b1b] flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">insights</span>
              <span className="text-[10px] font-bold">02</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#141b2b]">2. Pahami AI</span>
              <p className="text-xs text-[#404941] mt-0.5 leading-relaxed">
                Kenali ciri visual patogen dan tingkat keyakinan (confidence) tanpa langsung panik.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#e1e8fd] flex flex-col items-center justify-center text-[#003b1b] flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span className="text-[10px] font-bold">03</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#141b2b]">3. Verifikasi Petani</span>
              <p className="text-xs text-[#404941] mt-0.5 leading-relaxed">
                Cocokkan dengan kondisi tanaman sekitar dan panduan PPL sebelum menyemprot obat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Card Tips Hari Ini (Sunlight Optimization) */}
      <section className="flex items-start gap-3.5 bg-[#ffdcc3] text-[#2f1500] rounded-2xl p-4 border border-amber-200 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-[#703a00] text-[#ffa14e] flex items-center justify-center flex-shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[22px]">light_mode</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e3900]">
            Tips Pagi Ini
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#2f1500] mt-0.5 leading-snug">
            Cahaya alami pagi hari membantu kamera menangkap tekstur bercak dan urat daun dengan lebih tajam.
          </p>
          <span className="text-xs text-[#6e3900] mt-1">
            Hindari penggunaan lampu flash langsung pada permukaan daun yang basah.
          </span>
        </div>
      </section>

      {/* Recent Scan Summary */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-[#141b2b] font-bold">Pemeriksaan Terakhir</h3>
          <button
            onClick={() => setActiveTab('visualisasi')}
            className="text-xs font-bold text-[#006e2d] flex items-center gap-0.5 hover:underline"
          >
            Lihat Semua Telemetri D3
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Diagnostic Result Card */}
        <div className="flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-3.5 p-4">
            {/* Thumbnail daun terinfeksi */}
            <div className="w-full sm:w-24 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
              <img
                className="w-full h-full object-cover"
                alt="Foto makro daun cabai bercak Cercospora"
                src={ASSETS.chiliLeafThumbnail}
              />
              <span className="sm:hidden absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {latestDiagnosis.dateStr}
              </span>
            </div>

            <div className="flex flex-col min-w-0 justify-center flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Telah Diverifikasi
                </span>
                <span className="text-[11px] text-[#404941] hidden sm:inline">{latestDiagnosis.dateStr}</span>
              </div>

              <h4 className="text-base font-bold text-[#141b2b] mt-1 truncate">
                {latestDiagnosis.crop} — {latestDiagnosis.block}
              </h4>

              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs sm:text-sm text-[#ba1a1a] font-bold truncate">
                  Indikasi {latestDiagnosis.diseaseName}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="w-24 h-1.5 rounded-full bg-[#dce2f7] overflow-hidden">
                  <div
                    className="h-full bg-[#006e2d] rounded-full transition-all"
                    style={{ width: `${latestDiagnosis.confidence}%` }}
                  ></div>
                </div>
                <span className="text-[11px] font-bold text-[#006e2d]">
                  Akurasi AI {latestDiagnosis.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* Card Action Footer */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#f1f3ff] border-t border-slate-100">
            <span className="text-[11px] sm:text-xs text-[#404941] truncate max-w-[70%]">
              Tindakan: {latestDiagnosis.treatmentNotes}
            </span>
            <button
              onClick={() => setActiveTab('detail')}
              className="text-xs font-bold text-[#003b1b] flex items-center gap-1 hover:underline flex-shrink-0"
            >
              Detail
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Field Access Resources */}
      <section className="flex flex-col gap-2.5">
        <h3 className="text-base sm:text-lg text-[#141b2b] font-bold">Akses Pengetahuan Tani</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Card 1: Pelajari AI Petani */}
          <div
            onClick={() => setActiveTab('edukasi')}
            className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:bg-[#f1f3ff] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#b1f2be] text-[#00210d] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#141b2b] block">Pelajari AI Petani</span>
              <span className="text-xs text-[#404941] mt-0.5 block">
                Cara kerja mesin membaca daun & parameter keyakinan
              </span>
            </div>
            <span className="text-xs text-[#003b1b] font-bold mt-3 flex items-center gap-1">
              Buka Materi <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>

          {/* Card 2: Buku Panduan Gejala */}
          <div
            onClick={() => setActiveTab('visualisasi')}
            className="flex flex-col justify-between p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:bg-[#f1f3ff] transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e1e8fd] text-[#003b1b] flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[24px]">insights</span>
            </div>
            <div>
              <span className="text-sm font-bold text-[#141b2b] block">Visualisasi Real-Time D3</span>
              <span className="text-xs text-[#404941] mt-0.5 block">
                Pantau sensor lapangan & ekspor laporan PDF / CSV
              </span>
            </div>
            <span className="text-xs text-[#003b1b] font-bold mt-3 flex items-center gap-1">
              Buka Grafik D3 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
