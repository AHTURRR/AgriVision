import { DiagnosticRecord, EducationModule, QuizQuestion, SensorTelemetry, UserProfile } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UVIaceOwtkFA-5F0F2Elr--nvMKnVg7PIY5JDiuaNNuqS0lQhVbcYlrdeyo3JbdlpnPdhN95KyXPAgP55UUWuhi1MuGJByMcx4NgAulrW5yKyjIJc2y8L9z9zVd-tp8TOl3N7ETENoGhKyRwCFE8hQjzdU6B9jPMZUrut08VB9hG_tmNTf6uCb-t6dfOlVjnWgqqTjzWtupJNzcMoBcFYZNZp_D0Rtanw_OiAR7HAorWxkp2X6CmByy1A',
  chiliLeafInField: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9lCwNZbxUW7eIOOGkAJN-Ypv_Q_One1rSmDMyJjACW2wL92bEEGCy17-b4AH9MBdEnsYx65VVeaM6zcawAZTl-s2XwKHMDcB97bdBJbD9F5hT5lnQ3cLnLgidX8eIpsgHOnPcfNayhaGfavImARSSbNWNg_nhMDQsrGaNwdBaiXRJ2EiZO3yFwNEI5_QpBRh20PjnUWaJMTdbZrIE9laQhngFfQ_ueS0ijMEc76CwgcSOa3cKfyow',
  chiliLeafThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbmafSWHS2c2lzrlNPwb3aC_T9HSuQIdg6Dgv677DkbugeDlK1R1HlONrsz8fE7dev1K_wq8EFqHuc2tYViIpieQl81ESQh3dvQnwaYsHA4diKuxci4Bx9ko7iowLrTwQQ_AU6NetrZwhAGzdMvA0w-KkXJbrT1nIghHXirlP_-F1_6Yw1H3iTRHMTDjdCkFhfZhekYWi5wxrygLPZ_9HrctLyB4A6AMHhfMYQQ51s4MC5zIS92KUf',
  goodPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCskhSGucsd0JWnCFUEOhCMmQup4wj3jsDw3nTGRzLrwYjWLL9Rz2Xq9tQlKy1KphOsLPzQtocARdCE2GtkU-g12tR6uLcZDWlt4AljcU69gZ44SssoU6oSYnZX4xU7VqeHZeHCxK3kS7tH7opoWMhO948eh5iOhv4EbbKNxdu7QthBZAuk5Ts_sGdpkxa4FuNwsOiZ1sezniVd-jibkwbdAdMACXUwAPF2Vlw6iHRgj9MyWdQXK1F0',
  badPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaoVx255XT2KBRwbezjkTUBWTmuymCNLXDdil-QCFPExN3Xo_syd-nOpoiYi4NtpfdfXlrhSQ2IpTK-a9FMjxz9qAH8T2gJGyYoinSm5PfR3f_X7z-xQlZ7vQ6d5w5MDze900lreDuE5p9BDna7lngPbNlCgtB98yu72GrQHCVrPiR1XLWSHhAR7RvgM8P-AoEz2K1FnsNTa3jZ6GHMUTltgr3lMjMEes6zY72jTtkQ67T656IOSXU',
  farmerModule1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_-tD-v6tJDbT7MSQ80in2V6MXrzfeq5KHEs8R54t8W3PozJyo7vojI-Oi__yXVUATxbs547JNwkqjicL9bu5Db-Al40kD45PKm3_nygyaRN8cuQqo4QnKp6fl6RTpGcO7-00b2Fx3qcjpHGm1mUZTd-N13eEGLfp03pP4d3yCmr-wQ3NVkDY4zSGAzJuCJ1AV5gxxa3ifogGx3KUxrA7ONC74wfcI7vlkAdX950e4psqlZqmIzSNk',
  sprayerModule2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPAEIyr1rFFhJK-sZ9UfZhj2MtjzipbZfLCWATHIXK8BFxHmz1BUXX9mhGCq6s1J9HUT_SrXzZM3hEFx8I09id89l25uk2wuPMMMq6KXBOGmiywzejRGvzBtHoiHUlcrgxt9s8aj7iJsoOse0IxQ2Jmbb2RWwpjykmxbMPYHamp9ZRWXFHo9E2SqTjHRDVXyz6lZ1Z4124TPdIRgS-tiAMJpNlcLq5-HZ6jQ7mcNG4hsk6DefMH8Ws',
  handsModule3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0m-zFkfqfBG5HXuvi3K4wlUNeUoA65tq__ywY1P3t-6v6OPFtPcliyz74ZZ4mQQ_BG10LsXj9HhRCYaOQYjjBZtEaiPa2sDwIJw9Xs2MZ6ib01ZfSCRYBtyTjVWaYaVF59qH-ejlXpyJ3ZTYR9EBLejihHyZCv0OGEUxbKFyjx-0VYBCJSbQ4trzP4zOkF_loq5aQj2P05g9U8FOX_5y3dyupOSBDxC_my1OiilW6zA6M9h3ye2w6',
};

export const INITIAL_USER: UserProfile = {
  id: 'usr-petani-001',
  name: 'Pak Sugiono / Bu Tani',
  email: 'turmudia946@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Petani Lapangan',
  location: 'Kecamatan Temanggung, Jawa Tengah',
  farmName: 'Kebun Cabai Subur Makmur',
  isAuthenticated: true,
  oauthProvider: 'Google OAuth2',
  accessToken: 'ya29.a0ARrdaM-oauth2-agrivision-secure-token-8921x',
  tokenExpiresAt: Date.now() + 3600 * 1000,
  scopes: [
    'openid',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'agri.diagnosis:read',
    'agri.field_data:write',
  ],
};

export const DEFAULT_DIAGNOSIS: DiagnosticRecord = {
  id: 'diag-001',
  sessionTitle: 'Blok B - Cabai Rawit Merah',
  block: 'Blok B',
  crop: 'Cabai Rawit Merah (Capsicum frutescens)',
  dateStr: 'Kemarin, 08:40 WIB',
  timeAgo: 'Baru Saja',
  diseaseName: 'Bercak Daun Cercospora',
  latinName: 'Cercospora capsici • Penyakit Jamur Daun',
  category: 'Jamur Patogenik Lapangan',
  confidence: 87,
  accuracyLabel: 'Akurasi AI 87%',
  isVerified: true,
  image: ASSETS.chiliLeafInField,
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

export const MOCK_DIAGNOSTICS: DiagnosticRecord[] = [DEFAULT_DIAGNOSIS];

export const INITIAL_TELEMETRY: SensorTelemetry[] = [
  { timestamp: '08:00', timeVal: 1, leafMoisture: 84, ambientTemp: 26.2, lightIndexLux: 48, airHumidity: 88, lesionRiskScore: 68, activeBlock: 'Blok B' },
  { timestamp: '08:05', timeVal: 2, leafMoisture: 82, ambientTemp: 26.8, lightIndexLux: 55, airHumidity: 85, lesionRiskScore: 71, activeBlock: 'Blok B' },
  { timestamp: '08:10', timeVal: 3, leafMoisture: 79, ambientTemp: 27.4, lightIndexLux: 62, airHumidity: 81, lesionRiskScore: 75, activeBlock: 'Blok B' },
  { timestamp: '08:15', timeVal: 4, leafMoisture: 76, ambientTemp: 27.9, lightIndexLux: 71, airHumidity: 78, lesionRiskScore: 79, activeBlock: 'Blok B' },
  { timestamp: '08:20', timeVal: 5, leafMoisture: 74, ambientTemp: 28.3, lightIndexLux: 80, airHumidity: 75, lesionRiskScore: 82, activeBlock: 'Blok B' },
  { timestamp: '08:25', timeVal: 6, leafMoisture: 71, ambientTemp: 28.7, lightIndexLux: 89, airHumidity: 72, lesionRiskScore: 84, activeBlock: 'Blok B' },
  { timestamp: '08:30', timeVal: 7, leafMoisture: 69, ambientTemp: 29.1, lightIndexLux: 95, airHumidity: 70, lesionRiskScore: 86, activeBlock: 'Blok B' },
  { timestamp: '08:35', timeVal: 8, leafMoisture: 68, ambientTemp: 29.4, lightIndexLux: 98, airHumidity: 68, lesionRiskScore: 87, activeBlock: 'Blok B' },
];

export const INITIAL_TELEMETRIES = INITIAL_TELEMETRY;

export const EDUCATION_MODULES: EducationModule[] = [
  {
    id: 'mod-1',
    badge: 'Modul 3 Menit • Kuis Cepat',
    badgeColor: 'secondary',
    icon: 'percent',
    title: 'Memahami Nilai Keyakinan (Confidence AI)',
    summary: 'Kenapa AI 90% bukan berarti 100% benar? Kenali faktor bias cahaya, sudut kamera, dan kemiripan gejala penyakit.',
    readingTime: '3 Menit',
    image: ASSETS.farmerModule1,
    tag: 'Hindari Salah Diagnosis',
    tagIcon: 'warning',
    content: [
      'Tingkat keyakinan (confidence score) bukanlah jaminan vonis mutlak. Nilai ini dihitung oleh model kecerdasan buatan dengan membandingkan fitur visual piksel daun Anda terhadap puluhan ribu dataset latih.',
      'Jika foto diambil di bawah pantulan sinar matahari yang terlalu menyilaukan atau terdapat tetesan embun tebal, model dapat salah menduga warna pantulan sebagai bercak jamur.',
      'Oleh karena itu, jika AI memberi nilai 85-95%, langkah pertama Anda adalah memegang daun, melihat bagian bawah permukaan daun, dan memastikan ada atau tidaknya spora nyata di fisik daun.',
    ],
  },
  {
    id: 'mod-2',
    badge: 'Krusial untuk Petani',
    badgeColor: 'error',
    icon: 'sanitizer',
    title: 'Bahaya Asal Semprot Pestisida Berdasarkan AI',
    summary: 'Pentingnya verifikasi lapangan fisik dan konsultasi penyuluh sebelum membeli obat pertanian mahal.',
    readingTime: '4 Menit',
    image: ASSETS.sprayerModule2,
    tag: 'Hemat Biaya Operasional',
    tagIcon: 'eco',
    content: [
      'Penyemprotan pestisida atau fungisida kimia sintetis yang tergesa-gesa tanpa konfirmasi gejala di bedengan justru dapat membunuh musuh alami seperti kepik predator dan mikroba tanah bermanfaat.',
      'Biaya pembelian pestisida sintetis mencapai 30-40% total pengeluaran musim tanam. Verifikasi lapangan yang cermat menyelamatkan modal tani Anda dari belanja obat yang sebenarnya tidak dibutuhkan.',
      'Gunakan pendekatan Pengendalian Hama Terpadu (PHT): bersihkan daun bergejala, perbaiki sirkulasi angin, dan gunakan agen hayati (seperti Pseudomonas fluorescens) terlebih dahulu.',
    ],
  },
  {
    id: 'mod-3',
    badge: 'Keahlian Lapangan',
    badgeColor: 'surface',
    icon: 'center_focus_strong',
    title: 'Cara Mengambil Foto Daun yang Benar',
    summary: 'Kiat pencahayaan matahari, fokus daun sakit, dan jarak optimal 15–20cm untuk akurasi pindaian maksimal.',
    readingTime: '2 Menit',
    image: ASSETS.handsModule3,
    tag: 'Lengkap dengan Panduan Foto',
    tagIcon: 'photo_camera',
    content: [
      'Jarak ideal antara lensa kamera ponsel dengan permukaan daun adalah 15 hingga 20 sentimeter.',
      'Hindari bayangan tubuh Anda sendiri yang menutupi daun. Posisi pemotret terbaik adalah saat matahari menyinari daun dari sudut 45 derajat.',
      'Bila angin kencang membuat daun bergoyang, tahan tangkai daun dengan lembut di bagian pangkal tanpa menutup area luka atau bercak.',
    ],
  },
  {
    id: 'mod-4',
    badge: 'Keamanan & Hak Petani',
    badgeColor: 'surface',
    icon: 'lock',
    title: 'Etika & Privasi Data Lahan Anda',
    summary: 'Foto dan koordinat Anda hanya dipakai untuk membantu analisis tanaman Anda dan dijamin tidak diperjualbelikan.',
    readingTime: '3 Menit',
    image: '',
    tag: 'Privasi Terjamin',
    tagIcon: 'shield',
    content: [
      'Data lokasi petak, riwayat semprotan, dan foto daun yang Anda unggah dilindungi oleh protokol OAuth2 berstandar industri dengan enkripsi AES-256.',
      'AgriVision berkomitmen tidak menyerahkan data geolokasi lahan ke pihak spekulan pasar atau korporasi yang merugikan kedaulatan pangan petani.',
      'Anda memiliki hak penuh untuk mengekspor data catatan kebun Anda kapan saja dalam format CSV maupun dokumen cetak PDF.',
    ],
  },
];

export const QUIZ_DATA: QuizQuestion = {
  caseStudy: 'Studi Kasus Nyata',
  question: '“Jika AI menunjukkan tingkat keyakinan (Confidence) 92%, apa tindakan yang paling tepat untuk Anda lakukan?”',
  options: [
    {
      id: 'A',
      text: 'Langsung beli pestisida kimia termahal di kios tani.',
      isCorrect: false,
      explanation: 'Salah: Ini pemborosan biaya dan berisiko merusak tanaman jika salah sasaran.',
    },
    {
      id: 'B',
      text: 'Cocokkan ciri daun di kebun & periksa tanaman di sekitarnya.',
      isCorrect: true,
      explanation: 'Tepat Sekali! AI 92% tetap butuh mata tajam Anda untuk verifikasi kondisi sebenarnya di lapangan.',
    },
    {
      id: 'C',
      text: 'Pasrah 100% pada hasil mesin tanpa memeriksa apa pun lagi.',
      isCorrect: false,
      explanation: 'Kurang Tepat: AI dapat terkecoh oleh debu, embun pagi, atau bayangan matahari.',
    },
  ],
};
