import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const AuthScreen: React.FC<Props> = ({ user, setUser }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Simulated OAuth2 login popup / provider connect
  const handleConnectOAuth = (provider: 'Google OAuth2' | 'AgriCloud OAuth2') => {
    setIsConnecting(true);

    // Simulate OAuth2 popup handshake
    setTimeout(() => {
      setIsConnecting(false);
      setUser({
        ...user,
        isAuthenticated: true,
        oauthProvider: provider,
        accessToken: `ya29.a0ARrdaM-${provider === 'Google OAuth2' ? 'google' : 'agricloud'}-${Math.random().toString(36).substring(2, 10)}`,
        tokenExpiresAt: Date.now() + 3600 * 1000,
        scopes: [
          'openid',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email',
          'agri.diagnosis:read',
          'agri.field_data:write',
        ],
      });
      setToastMsg(`Berhasil terhubung melalui ${provider}! Data kebun terotentikasi.`);
      setTimeout(() => setToastMsg(null), 4000);
    }, 1000);
  };

  const handleLogout = () => {
    setUser({
      ...user,
      isAuthenticated: false,
      accessToken: undefined,
      tokenExpiresAt: undefined,
    });
    setToastMsg('Sesi OAuth2 telah berakhir. Mode tamu aktif.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleRoleSwitch = (role: 'Petani Lapangan' | 'Agronomis' | 'Petugas PPL') => {
    setUser({ ...user, role });
    setToastMsg(`Peran pengguna diubah menjadi: ${role}`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto gap-4 pb-12">
      {/* Notification Toast */}
      {toastMsg && (
        <div className="bg-[#14532d] text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between border border-emerald-400/40 animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">verified</span>
            <span className="text-xs sm:text-sm font-semibold">{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#003b1b] text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="material-symbols-outlined text-[32px] text-[#7ffc97]">shield_lock</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg sm:text-xl font-bold text-[#003b1b]">Keamanan & Autentikasi OAuth2</h1>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                user.isAuthenticated
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {user.isAuthenticated ? 'Terotentikasi' : 'Belum Masuk'}
            </span>
          </div>
          <p className="text-xs text-[#404941] mt-1 leading-relaxed">
            Perlindungan akses catatan kebun, telemetri sensor lapang, dan riwayat diagnosis tanaman dengan protokol OAuth2 standar industri.
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Profil Petani Terdaftar
        </h2>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[#003b1b] flex items-center justify-center text-white ring-2 ring-emerald-500/30">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[32px]">person</span>
            )}
            {user.isAuthenticated && (
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold text-[#141b2b] truncate">{user.name}</h3>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-[#e9edff] text-[#003b1b] text-[11px] font-bold">
                {user.role}
              </span>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">home_pin</span>
                {user.location}
              </span>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex flex-col gap-1 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-600">Beralih Peran Pengguna:</span>
          <div className="grid grid-cols-3 gap-2">
            {(['Petani Lapangan', 'Agronomis', 'Petugas PPL'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  user.role === r
                    ? 'bg-[#14532d] text-white shadow-xs'
                    : 'bg-[#f1f3ff] text-slate-700 hover:bg-[#e9edff]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* OAuth2 Actions & Token Status */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col gap-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Koneksi Akun OAuth2
        </h2>

        {user.isAuthenticated ? (
          <div className="flex flex-col gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-600 text-[24px]">verified_user</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-emerald-950">
                  Tersambung via {user.oauthProvider}
                </p>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Token otentikasi aktif dengan masa berlaku 60 menit. Refresh token otomatis diperbarui.
                </p>
              </div>
            </div>

            {/* Token Inspector */}
            <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
                <span>OAuth2 Access Token (Bearer):</span>
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="text-emerald-400 hover:underline text-[11px]"
                >
                  {showToken ? 'Sembunyikan' : 'Lihat Token'}
                </button>
              </div>
              <p className="break-all text-[11px] text-emerald-300">
                {showToken
                  ? user.accessToken
                  : (user.accessToken?.substring(0, 16) || 'ya29.a0ARrdaM...') + '••••••••••••••••••••••••'}
              </p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>Algoritma: RS256 / SHA-256</span>
                <span>Kedaluwarsa: {new Date(user.tokenExpiresAt || Date.now() + 3600000).toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Granted Scopes */}
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-700">Izin Akses (Scopes):</span>
              <div className="flex flex-wrap gap-1.5">
                {user.scopes?.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#f1f3ff] text-slate-700 text-[11px] font-mono border border-slate-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-2 w-full h-11 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>Putuskan Hubungan OAuth2 (Keluar)</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Silakan pilih penyedia identitas OAuth2 untuk menyinkronkan data lapangan Anda dengan aman:
            </p>

            <button
              onClick={() => handleConnectOAuth('Google OAuth2')}
              disabled={isConnecting}
              className="w-full h-12 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isConnecting ? 'Menghubungkan...' : 'Masuk dengan Google OAuth2'}</span>
            </button>

            <button
              onClick={() => handleConnectOAuth('AgriCloud OAuth2')}
              disabled={isConnecting}
              className="w-full h-12 rounded-xl bg-[#003b1b] text-white hover:bg-[#002b14] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[#7ffc97] text-[20px]">agriculture</span>
              <span>{isConnecting ? 'Menghubungkan...' : 'Masuk dengan AgriCloud SSO'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Security Principles & Legal Notice */}
      <div className="bg-[#e1e8fd] rounded-2xl p-4 border border-indigo-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#003b1b]">
          <span className="material-symbols-outlined text-[20px]">policy</span>
          <h3 className="text-xs sm:text-sm font-bold">Kebijakan Privasi & Kedaulatan Data Petani</h3>
        </div>
        <p className="text-xs text-[#404941] leading-relaxed">
          Kredensial OAuth2 memastikan bahwa data foto tanaman, catatan bedengan, dan koordinat kebun Anda hanya dapat diakses oleh Anda dan PPL yang Anda tunjuk. Data tidak akan dialihkan ke pihak komersial tanpa persetujuan eksplisit Anda.
        </p>
      </div>
    </div>
  );
};
