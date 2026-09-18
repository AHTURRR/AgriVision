export type ActiveTab = 'beranda' | 'scan' | 'detail' | 'visualisasi' | 'edukasi' | 'akun';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Petani Lapangan' | 'Agronomis' | 'Petugas PPL';
  location: string;
  farmName: string;
  isAuthenticated: boolean;
  oauthProvider?: 'Google OAuth2' | 'AgriCloud OAuth2';
  accessToken?: string;
  tokenExpiresAt?: number;
  scopes?: string[];
}

export interface DiagnosticRecord {
  id: string;
  sessionTitle: string;
  block: string;
  crop: string;
  dateStr: string;
  timeAgo: string;
  diseaseName: string;
  latinName: string;
  category: string;
  confidence: number;
  accuracyLabel: string;
  isVerified: boolean;
  image: string;
  heatmapCoords: {
    top: string;
    left: string;
    width: string;
    height: string;
    label: string;
  };
  symptoms: {
    number: number;
    title: string;
    description: string;
  }[];
  limitations: string;
  steps: {
    letter: string;
    title: string;
    description: string;
  }[];
  treatmentNotes: string;
  feedback?: 'Sesuai' | 'Ragu' | 'Beda';
}

export interface SensorTelemetry {
  timestamp: string; // HH:mm:ss
  timeVal: number; // Unix ms
  leafMoisture: number; // % (0-100)
  ambientTemp: number; // °C (20-38)
  lightIndexLux: number; // klux (10-120)
  airHumidity: number; // % (40-98)
  lesionRiskScore: number; // % (0-100)
  activeBlock: string;
}

export interface EducationModule {
  id: string;
  badge: string;
  badgeColor: 'secondary' | 'error' | 'surface' | 'tertiary';
  icon: string;
  title: string;
  summary: string;
  readingTime: string;
  image: string;
  tag: string;
  tagIcon: string;
  content: string[];
}

export interface QuizQuestion {
  caseStudy: string;
  question: string;
  options: {
    id: 'A' | 'B' | 'C';
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
