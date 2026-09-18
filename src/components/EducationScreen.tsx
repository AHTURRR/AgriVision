import React, { useState } from 'react';
import { EDUCATION_MODULES, QUIZ_DATA } from '../data/mockData';
import { EducationModule } from '../types';

export const EducationScreen: React.FC = () => {
  const [activeModule, setActiveModule] = useState<EducationModule | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | null>(null);
  const [quizScore, setQuizScore] = useState<number>(78);
  const [toast, setToast] = useState<{ title: string; msg: string; isCorrect: boolean } | null>(null);

  const handleSelectOption = (optId: 'A' | 'B' | 'C') => {
    setSelectedAnswer(optId);
    if (optId === 'B') {
      setQuizScore((prev) => Math.min(100, prev + 10));
      setToast({
        title: 'Jawaban Tepat! 🎉',
        msg: 'AI adalah alat bantu, kroscek fisik di lahan adalah kunci keputusan tani yang bijak.',
        isCorrect: true,
      });
    } else {
      setToast({
        title: 'Belum Tepat, Coba Lagi!',
        msg: 'Ingat, jangan bergantung 100% pada hasil prediksi sebelum memeriksa fisik tanaman.',
        isCorrect: false,
      });
    }
    setTimeout(() => setToast(null), 4000);
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setToast(null);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-10">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 inset-x-4 max-w-md mx-auto z-50 p-3.5 rounded-xl bg-[#003b1b] text-white shadow-xl flex items-start gap-3 border border-emerald-400/30 animate-in fade-in slide-in-from-top-4">
          <span
            className={`material-symbols-outlined text-[24px] ${
              toast.isCorrect ? 'text-[#7cf994]' : 'text-amber-300'
            }`}
          >
            {toast.isCorrect ? 'verified' : 'info'}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-bold leading-tight">{toast.title}</p>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{toast.msg}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <section className="pt-2 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003b1b] via-[#14532d] to-[#2e6a41] p-5 sm:p-6 text-white shadow-md">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#006e2d]/30 blur-2xl pointer-events-none"></div>
          <div className="absolute right-2 bottom-1 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[110px] sm:text-[130px] leading-none text-white">
              psychology_alt
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md w-fit text-[#b1f2be]">
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Pusat Belajar Mandiri Petani
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight mt-1">
              Literasi Inovasi Teknologi Tani
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200 font-medium flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[18px] text-[#7ffc97]">visibility</span>
              Melihat Cerdas, Bertindak Bijak
            </p>

            <p className="text-xs text-slate-200 mt-1 leading-relaxed max-w-md">
              Kecerdasan Buatan (AI) adalah kacamata pembantu Anda di sawah dan ladang, bukan pengganti kearifan mata dan tangan petani.
            </p>
          </div>
        </div>
      </section>

      {/* Card Progress Literasi */}
      <section className="py-2.5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#7cf994]/40 text-[#007230] flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">psychology</span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase text-[#006e2d] font-bold tracking-wide">
                  Status Pembelajaran
                </span>
                <h2 className="text-sm sm:text-base font-bold text-[#141b2b] truncate">
                  Tingkat Pemahaman AI Anda
                </h2>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-[#006e2d]">{quizScore}%</span>
            </div>
          </div>

          {/* Segmented Bar Meter */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-[#e9edff] rounded-full h-3 p-0.5 overflow-hidden flex">
              <div
                className="bg-[#006e2d] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${quizScore}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#404941]">
              <span className="flex items-center gap-1 text-[#003b1b]">
                <span className="material-symbols-outlined text-[15px] text-[#006e2d]">
                  verified_user
                </span>
                Tingkat: <span className="font-bold text-[#141b2b]">Pengamat Kritis</span>
              </span>
              <span className="font-semibold text-slate-500">2 Modul Lagi ke Ahli AI</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 bg-[#f1f3ff] rounded-xl px-3 py-2 flex items-center gap-2 text-[#404941]">
            <span className="material-symbols-outlined text-[#006e2d] text-[20px] flex-shrink-0">
              lightbulb
            </span>
            <p className="text-xs leading-snug">
              Petani kritis tidak langsung menelan hasil pindaian, melainkan selalu memvalidasi fisik di lahan.
            </p>
          </div>
        </div>
      </section>

      {/* Modul Mikro-Belajar Unggulan */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#141b2b]">Modul Mikro Unggulan</h2>
            <p className="text-xs text-[#404941]">Ringkas, praktis, langsung dapat diterapkan di kebun</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#dce2f7] text-[#003b1b] text-xs font-bold">
            {EDUCATION_MODULES.length} Modul
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {EDUCATION_MODULES.map((mod) => (
            <article
              key={mod.id}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    mod.badgeColor === 'secondary'
                      ? 'bg-[#7cf994]/40 text-[#007230]'
                      : mod.badgeColor === 'error'
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#e9edff] text-[#003b1b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  {mod.badge}
                </span>
                <span className="w-7 h-7 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#003b1b]">
                  <span className="material-symbols-outlined text-[16px]">{mod.icon}</span>
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                  {mod.image ? (
                    <img
                      className="w-full h-full object-cover"
                      alt={mod.title}
                      src={mod.image}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#003b1b] to-[#2e6a41] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[30px]">encrypted</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[#003b1b] leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[#404941] mt-1 line-clamp-2 leading-relaxed">
                    {mod.summary}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="material-symbols-outlined text-[16px] text-amber-700">
                    {mod.tagIcon}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">{mod.tag}</span>
                </div>
                <button
                  onClick={() => setActiveModule(mod)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#14532d] text-white text-xs font-bold hover:bg-[#003b1b] active:scale-95 transition-all"
                >
                  <span>Mulai Baca</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Kuis Interaktif Literasi AI */}
      <section className="py-2.5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden">
          {/* Top Indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#003b1b] text-white flex items-center justify-center font-bold text-xs">
                ?
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#003b1b]">Uji Pemahaman Kilat</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-[#f1f3ff] text-[#404941] font-semibold">
              1 Pertanyaan
            </span>
          </div>

          {/* Question */}
          <div className="bg-[#f1f3ff] p-3.5 rounded-xl mb-3.5 border border-indigo-50">
            <p className="text-[11px] text-[#006e2d] uppercase font-bold tracking-wider mb-0.5">
              {QUIZ_DATA.caseStudy}
            </p>
            <p className="text-xs sm:text-sm text-[#141b2b] font-semibold leading-relaxed">
              {QUIZ_DATA.question}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {QUIZ_DATA.options.map((opt) => {
              const isChosen = selectedAnswer === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  type="button"
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 border ${
                    isChosen
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-[#f1f3ff] border-transparent text-[#141b2b] hover:bg-[#e9edff]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                      isChosen
                        ? opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-[#dce2f7] text-[#141b2b]'
                    }`}
                  >
                    {opt.id}
                  </span>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <span className="text-xs sm:text-sm font-medium block leading-snug">{opt.text}</span>
                    {isChosen && (
                      <span
                        className={`text-[11px] font-semibold block mt-1 ${
                          opt.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {opt.explanation}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quiz Summary Footer */}
          {selectedAnswer && (
            <div className="mt-3 pt-2">
              <div className="p-3 rounded-xl bg-[#7cf994]/40 text-[#002109] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  <span>
                    {selectedAnswer === 'B'
                      ? '+10 Poin Literasi Telah Ditambahkan!'
                      : 'Coba pilih jawaban yang mengedepankan kroscek lapangan'}
                  </span>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-[#003b1b] underline font-bold"
                >
                  Ulangi
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Card Bantuan Penyuluh Lapangan */}
      <section className="pt-2">
        <div className="rounded-2xl bg-gradient-to-r from-[#e9edff] to-[#e1e8fd] p-4 sm:p-5 border border-indigo-100 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#14532d] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[26px]">support_agent</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1 text-[#006e2d] text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006e2d]"></span>
                Siap Mendampingi
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#141b2b] leading-snug">
                Masih Ragu dengan Hasil AI?
              </h3>
              <p className="text-xs text-[#404941] mt-0.5 leading-relaxed">
                Petugas Penyuluh Lapangan (PPL) dan mantri tani siap memverifikasi kondisi tanaman Anda langsung di petak lahan.
              </p>
            </div>
          </div>

          <div className="mt-3.5 flex flex-col gap-2">
            <a
              href="tel:08001234567"
              className="w-full h-12 rounded-xl bg-[#003b1b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#002b14] active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>Hubungi Kontak Petugas Penyuluh Terdekat</span>
            </a>

            <div className="flex items-center justify-center gap-4 pt-1 text-[#404941] text-[11px]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006e2d]">schedule</span>
                Respon Cepat: 07.00 – 16.00 WIB
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006e2d]">location_on</span>
                Posko Kecamatan Aktif
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Module Reader Modal */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 border border-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {activeModule.badge}
              </span>
              <button
                onClick={() => setActiveModule(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#003b1b]">{activeModule.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Waktu Baca: {activeModule.readingTime}</p>
            </div>

            {activeModule.image && (
              <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={activeModule.image}
                  alt={activeModule.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeModule.content.map((p, i) => (
                <p key={i} className="bg-[#f9f9ff] p-3 rounded-xl border border-slate-100">
                  {p}
                </p>
              ))}
            </div>

            <button
              onClick={() => setActiveModule(null)}
              className="w-full h-11 rounded-xl bg-[#003b1b] text-white text-xs sm:text-sm font-bold flex items-center justify-center hover:bg-[#002b14]"
            >
              Selesai Membaca & Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
