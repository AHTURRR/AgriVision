import React from 'react';
import { ActiveTab } from '../types';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#f9f9ff]/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] lg:hidden">
      <div className="relative flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {/* Beranda */}
        <button
          onClick={() => setActiveTab('beranda')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
            activeTab === 'beranda' ? 'text-[#003b1b] font-bold' : 'text-[#404941] hover:text-[#003b1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              activeTab === 'beranda' ? 'material-symbols-filled' : ''
            }`}
          >
            home
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Beranda</span>
        </button>

        {/* Riwayat / Visualisasi Real-Time */}
        <button
          onClick={() => setActiveTab('visualisasi')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
            activeTab === 'visualisasi' ? 'text-[#003b1b] font-bold' : 'text-[#404941] hover:text-[#003b1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              activeTab === 'visualisasi' ? 'material-symbols-filled' : ''
            }`}
          >
            insights
          </span>
          <span className="text-[11px] mt-0.5 font-medium">D3 Grafik</span>
        </button>

        {/* Center Floating Shutter: Pindai AI */}
        <div className="relative -top-5 flex flex-col items-center justify-center">
          <button
            onClick={() => setActiveTab('scan')}
            className={`w-14 h-14 rounded-full bg-[#14532d] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(20,83,45,0.35)] active:scale-95 transition-transform ${
              activeTab === 'scan' ? 'ring-4 ring-[#7cf994]' : ''
            }`}
            title="Mulai Pindai Tanaman"
          >
            <span className="material-symbols-outlined text-[28px]">photo_camera</span>
          </button>
          <span className="text-[11px] text-[#003b1b] font-bold mt-1">Pindai AI</span>
        </div>

        {/* Edukasi */}
        <button
          onClick={() => setActiveTab('edukasi')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
            activeTab === 'edukasi' ? 'text-[#003b1b] font-bold' : 'text-[#404941] hover:text-[#003b1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              activeTab === 'edukasi' ? 'material-symbols-filled' : ''
            }`}
          >
            menu_book
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Edukasi</span>
        </button>

        {/* Akun */}
        <button
          onClick={() => setActiveTab('akun')}
          className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
            activeTab === 'akun' ? 'text-[#003b1b] font-bold' : 'text-[#404941] hover:text-[#003b1b]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[24px] ${
              activeTab === 'akun' ? 'material-symbols-filled' : ''
            }`}
          >
            person
          </span>
          <span className="text-[11px] mt-0.5 font-medium">Akun</span>
        </button>
      </div>
    </nav>
  );
};
