import React, { useRef, useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ActiveTab, DiagnosticRecord } from '../types';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
  onNewScan: (newRecord: DiagnosticRecord) => void;
}

export const ScanScreen: React.FC<Props> = ({ setActiveTab, onNewScan }) => {
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(true);
  const [isGuidelineOpen, setIsGuidelineOpen] = useState(true);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Trigger new diagnosis or route to detail screen
      const record: DiagnosticRecord = {
        id: `diag-${Date.now().toString().slice(-4)}`,
        sessionTitle: 'Blok B - Cabai Rawit Merah',
        block: 'Blok B',
        crop: 'Cabai Rawit Merah (Capsicum frutescens)',
        dateStr: 'Hari Ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        timeAgo: 'Baru Saja',
        diseaseName: 'Bercak Daun Cercospora',
        latinName: 'Cercospora capsici • Jamur Daun',
        category: 'Penyakit Jamur Lapangan',
        confidence: 87,
        accuracyLabel: 'Akurasi AI 87%',
        isVerified: true,
        image: customImage || ASSETS.chiliLeafInField,
        heatmapCoords: {
          top: '38%',
          left: '42%',
          width: '112px',
          height: '112px',
          label: 'Bercak #01',
        },
        symptoms: [
          {
            number: 1,
            title: 'Pusat Bercak Memucat (Abu-abu)',
            description: 'Jaringan tengah daun mulai kering dan membentuk mata katak berdiameter 3–5mm.',
          },
          {
            number: 2,
            title: 'Lingkaran Halo Kekuningan',
            description: 'Ditemukan gradasi warna kuning terang mengelilingi tepian luka bercak luar.',
          },
          {
            number: 3,
            title: 'Urat Daun Sekitar Tetap Utuh',
            description: 'Penyebaran belum menembus tulang daun utama, menandakan fase awal serangan.',
          },
        ],
        limitations:
          'AI baru menganalisis satu sisi permukaan daun yang terfoto. Pemeriksaan belum mencakup batang bawah, kelembapan tanah, atau gejala layu akar.',
        steps: [
          {
            letter: 'A',
            title: 'Cek Tanaman Tetangga',
            description: 'Periksa 3–5 tanaman di bedengan samping untuk memastikan apakah jamur sudah berpencar ditiup angin.',
          },
          {
            letter: 'B',
            title: 'Petik & Bersihkan Daun Bergejala',
            description: 'Buang daun terinfeksi ke wadah tertutup, jangan dibiarkan jatuh menumpuk di atas mulsa.',
          },
          {
            letter: 'C',
            title: 'Tunda Semprot Kimia Terburu-buru',
            description: 'Gunakan fungisida nabati atau hubungi petugas lapangan sebelum membeli obat kimia berdosis tinggi.',
          },
        ],
        treatmentNotes: 'Pemangkasan daun bawah & aplikasi fungisida hayati Trichoderma sp.',
      };

      onNewScan(record);
      setActiveTab('detail');
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-8">
      {/* Hidden file input for gallery upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Viewfinder Canvas Area */}
      <div className="relative w-full aspect-[4/5] sm:max-h-[500px] bg-slate-900 rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl border border-slate-700/50">
        {/* Camera Feed Image */}
        <img
          alt="Tampilan Bidikan Daun Tanaman"
          className="absolute inset-0 w-full h-full object-cover z-0 filter saturate-105"
          src={customImage || ASSETS.chiliLeafInField}
        />

        {/* Ambient Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10"></div>

        {/* Flash Simulation Overlay */}
        {flashOn && (
          <div className="absolute inset-0 bg-white/20 pointer-events-none z-15 animate-pulse"></div>
        )}

        {/* Grid overlay */}
        {gridOn && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-10 opacity-30">
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-r border-b border-white"></div>
            <div className="border-b border-white"></div>
            <div className="border-r border-white"></div>
            <div className="border-r border-white"></div>
            <div></div>
          </div>
        )}

        {/* Live Reticle Grid & Framing Box */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
          <div className="relative w-full max-w-[280px] aspect-square rounded-2xl">
            {/* Target Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl border-t-[3.5px] border-l-[3.5px] border-[#7ffc97]"></div>
            <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-xl border-t-[3.5px] border-r-[3.5px] border-[#7ffc97]"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-xl border-b-[3.5px] border-l-[3.5px] border-[#7ffc97]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-xl border-b-[3.5px] border-r-[3.5px] border-[#7ffc97]"></div>

            {/* Central Laser Target Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#7ffc97] shadow-[0_0_12px_rgba(127,252,151,0.9)] animate-ping"></span>
            </div>

            {/* Scanning Line Animation */}
            <div className="absolute inset-x-2 top-2 h-0.5 bg-gradient-to-r from-transparent via-[#7ffc97] to-transparent opacity-85 animate-[bounce_3s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Viewfinder Controls (Top Layer) */}
        <div className="relative z-20 flex items-center justify-between p-4 pt-3">
          {/* Flash Toggle Button */}
          <button
            onClick={() => setFlashOn(!flashOn)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/80 backdrop-blur-md text-white shadow-md active:scale-95 transition-all"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                flashOn ? 'text-amber-400' : 'text-[#7ffc97]'
              }`}
            >
              {flashOn ? 'flash_on' : 'flash_off'}
            </span>
            <span className="text-xs font-semibold tracking-wide">
              Flash: {flashOn ? 'Nyala' : 'Mati'}
            </span>
          </button>

          {/* Grid Toggle */}
          <button
            onClick={() => setGridOn(!gridOn)}
            className={`w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center shadow-md active:scale-95 transition-all ${
              gridOn ? 'text-[#7ffc97]' : 'text-slate-400'
            }`}
            title="Nyalakan/Matikan Kisi Grid"
          >
            <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
          </button>
        </div>

        {/* Instruction Floating Badge */}
        <div className="relative z-20 mx-4 mb-2 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md shadow-lg border border-white/10">
            <span className="material-symbols-outlined text-[#7ffc97] text-[18px] flex-shrink-0">
              center_focus_strong
            </span>
            <p className="text-xs text-white font-medium text-center">
              Posisikan <span className="text-[#7ffc97] font-bold">1 helai daun utama</span> di dalam kotak bidik
            </p>
          </div>
        </div>

        {/* Pre-Check Quality Metrics Overlay (Bottom of Camera View) */}
        <div className="relative z-20 px-4 pb-3">
          <div className="flex items-center justify-between gap-1.5 p-2 rounded-xl bg-black/65 backdrop-blur-md border border-white/10">
            {/* Cahaya Status */}
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-white/10">
              <span className="material-symbols-outlined text-[#7ffc97] text-[16px]">wb_sunny</span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-300">Cahaya</span>
                <span className="text-[11px] text-[#7ffc97] font-bold">Optimal</span>
              </div>
            </div>

            {/* Jarak Status */}
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-white/10">
              <span className="material-symbols-outlined text-[#7ffc97] text-[16px]">straighten</span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-300">Jarak</span>
                <span className="text-[11px] text-[#7ffc97] font-bold">15–20 cm</span>
              </div>
            </div>

            {/* Fokus Status */}
            <div className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-white/10">
              <span className="material-symbols-outlined text-[#7ffc97] text-[16px]">check_circle</span>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-slate-300">Fokus</span>
                <span className="text-[11px] text-[#7ffc97] font-bold">Tajam</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Action & Camera Control Deck */}
      <div className="w-full px-2 mt-4 flex flex-col gap-4">
        {/* Camera Triggers Deck */}
        <div className="flex items-center justify-between px-4 pt-1">
          {/* Gallery Input Trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-2xl bg-white border border-slate-200 text-[#003b1b] active:scale-95 transition-all shadow-xs hover:bg-slate-50"
            title="Unggah Foto dari Galeri"
          >
            <span className="material-symbols-outlined text-[24px]">photo_library</span>
            <span className="text-[11px] font-semibold">Galeri</span>
          </button>

          {/* Primary Tactical Shutter Trigger */}
          <button
            onClick={handleCapture}
            disabled={isAnalyzing}
            className="group relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-[#14532d] text-white shadow-xl shadow-[#14532d]/30 active:scale-95 transition-all disabled:opacity-50"
            id="shutter-btn"
          >
            {/* Outer Glowing Accent Ring */}
            <div className="absolute -inset-1.5 rounded-full bg-[#7ffc97]/40 opacity-70 group-hover:scale-105 transition-transform animate-pulse"></div>
            <div className="relative w-16 h-16 rounded-full bg-[#003b1b] flex flex-col items-center justify-center ring-2 ring-[#7ffc97]/60">
              {isAnalyzing ? (
                <span className="material-symbols-outlined text-[28px] text-[#7ffc97] animate-spin">
                  sync
                </span>
              ) : (
                <span className="material-symbols-outlined text-[28px] text-[#7ffc97]">
                  photo_camera
                </span>
              )}
            </div>
          </button>

          {/* Lens Switcher / Help Prompt */}
          <button
            onClick={() => setIsSampleModalOpen(true)}
            className="flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-2xl bg-white border border-slate-200 text-[#003b1b] active:scale-95 transition-all shadow-xs hover:bg-slate-50"
            title="Lihat Contoh Foto Bagus vs Salah"
          >
            <span className="material-symbols-outlined text-[24px]">help_outline</span>
            <span className="text-[11px] font-semibold">Panduan</span>
          </button>
        </div>

        {/* Quick Help & Shutter Instruction Pill */}
        <div className="flex items-center justify-center">
          <span className="text-xs text-[#404941] font-medium tracking-wide">
            {isAnalyzing
              ? 'Menganalisis lesi daun dengan AgriVision AI...'
              : 'Tekan tombol kamera hijau untuk diagnosa instan'}
          </span>
        </div>

        {/* Foldable Accordion: SOP Pengambilan Foto Lapangan */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 mt-1">
          <button
            onClick={() => setIsGuidelineOpen(!isGuidelineOpen)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7cf994]/40 text-[#007230] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base text-[#003b1b] font-bold">Pedoman Foto Akurat</h3>
                <p className="text-xs text-[#404941]">3 langkah diagnosa terpercaya</p>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[#003b1b] text-[24px] transition-transform duration-200 ${
                isGuidelineOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Expandable Checklist Content */}
          {isGuidelineOpen && (
            <div className="mt-3 flex flex-col gap-2 pt-2 border-t border-slate-100">
              {/* Point 1 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f1f3ff]">
                <div className="w-6 h-6 rounded-full bg-[#003b1b] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-[#141b2b] font-semibold">Tahan Goyangan Daun</span>
                  <span className="text-xs text-[#404941]">
                    Tahan perlahan tangkai daun bila angin kencang agar sensor AI dapat membaca tekstur urat daun.
                  </span>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f1f3ff]">
                <div className="w-6 h-6 rounded-full bg-[#003b1b] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-[#141b2b] font-semibold">Fokuskan Pada Area Bercak</span>
                  <span className="text-xs text-[#404941]">
                    Pastikan gejala kekuningan, bintik nekrosis, atau luka hama berada tepat di titik tengah bidikan.
                  </span>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f1f3ff]">
                <div className="w-6 h-6 rounded-full bg-[#003b1b] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-[#141b2b] font-semibold">Hindari Bayangan Tangan</span>
                  <span className="text-xs text-[#404941]">
                    Posisikan tubuh membelakangi atau menyamping dari matahari agar daun tersinari merata tanpa siluet.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Diagnostic Field Note Banner */}
        <div className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-[#e1e8fd] text-[#141b2b] border border-indigo-100">
          <span className="material-symbols-outlined text-[#003b1b] text-[22px] flex-shrink-0">
            psychology
          </span>
          <p className="text-xs text-[#404941] leading-snug">
            Model <span className="font-semibold text-[#003b1b]">AgriVision v4.2</span> dikalibrasi khusus untuk tanaman cabai, padi, jagung, dan bawang merah lokal.
          </p>
        </div>
      </div>

      {/* Interactive Good / Bad Photo Reference Modal */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 flex flex-col gap-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003b1b] text-[24px]">photo_camera_front</span>
                <h3 className="text-base sm:text-lg text-[#003b1b] font-bold">Contoh Foto Yang Baik</h3>
              </div>
              <button
                onClick={() => setIsSampleModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Comparison Visual Pair */}
            <div className="grid grid-cols-2 gap-3">
              {/* Benar */}
              <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover"
                    alt="Foto daun sehat benar"
                    src={ASSETS.goodPhoto}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#006e2d] text-white text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check</span> Benar
                  </span>
                </div>
                <span className="text-xs text-[#006e2d] font-semibold text-center mt-1">
                  Tunggal, Fokus & Terang
                </span>
              </div>

              {/* Salah */}
              <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover opacity-80"
                    alt="Foto daun buram salah"
                    src={ASSETS.badPhoto}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#ba1a1a] text-white text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">close</span> Salah
                  </span>
                </div>
                <span className="text-xs text-[#ba1a1a] font-semibold text-center mt-1">
                  Buram & Berbayang
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsSampleModalOpen(false)}
              className="w-full h-12 rounded-xl bg-[#003b1b] text-white text-sm font-bold flex items-center justify-center hover:bg-[#002b14] active:scale-98 transition-all"
            >
              Mengerti, Siap Memotret
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
