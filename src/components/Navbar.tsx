import React from 'react';
import { ASSETS } from '../data/mockData';
import { ActiveTab, UserProfile } from '../types';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  isStreaming: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  user,
  isMobileFrame,
  setIsMobileFrame,
  isStreaming,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f9f9ff]/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3 min-w-0 cursor-pointer" onClick={() => setActiveTab('beranda')}>
          <img
            alt="AgriVision Brand Logo"
            className="h-8 sm:h-9 w-auto object-contain flex-shrink-0"
            src={ASSETS.logo}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#003b1b] text-lg tracking-tight truncate">
                AgriVision
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#7cf994]/40 text-[#007230] text-[11px] font-bold whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006e2d] animate-pulse"></span>
                Online
              </span>
              {isStreaming && (
                <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold animate-pulse">
                  <span className="material-symbols-outlined text-[12px]">sensors</span>
                  IoT Live D3
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#404941] truncate hidden xs:block">
              Melihat dengan AI, Memahami dengan Teknologi
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#e9edff]/70 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('beranda')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'beranda'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Beranda
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'scan'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            Pindai AI
          </button>
          <button
            onClick={() => setActiveTab('detail')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'detail'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            Diagnosa Detail
          </button>
          <button
            onClick={() => setActiveTab('visualisasi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'visualisasi'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">insights</span>
            Visualisasi D3.js
          </button>
          <button
            onClick={() => setActiveTab('edukasi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'edukasi'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Edukasi
          </button>
          <button
            onClick={() => setActiveTab('akun')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'akun'
                ? 'bg-[#14532d] text-white shadow-sm'
                : 'text-[#404941] hover:text-[#003b1b] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lock_person</span>
            OAuth2 Akun
          </button>
        </nav>

        {/* Right Tools & Profile */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile frame simulator toggle for large screens */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Beralih ke Tampilan Layar Penuh Desktop' : 'Beralih ke Simulasi Layar HP Mobile'}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isMobileFrame ? 'desktop_windows' : 'smartphone'}
            </span>
            <span className="hidden md:inline">
              {isMobileFrame ? 'Layar Penuh' : 'Mode HP'}
            </span>
          </button>

          {/* Sync Status Icon */}
          <div
            className="w-9 h-9 rounded-full bg-[#e9edff] flex items-center justify-center text-[#006e2d] cursor-pointer hover:bg-[#dce2f7] transition-colors"
            title="Sinkronisasi Cloud & OAuth2 Aktif"
            onClick={() => setActiveTab('akun')}
          >
            <span className="material-symbols-outlined text-[18px]">cloud_done</span>
          </div>

          {/* User Profile Avatar with OAuth indicator */}
          <button
            onClick={() => setActiveTab('akun')}
            className="relative w-8 h-8 rounded-full bg-[#003b1b] flex items-center justify-center text-white ring-2 ring-emerald-500/40 overflow-hidden hover:opacity-90 transition-opacity"
            title={`Akun: ${user.name} (${user.oauthProvider || 'OAuth2'})`}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">person</span>
            )}
            {user.isAuthenticated && (
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-white"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
