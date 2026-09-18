import jsPDF from 'jspdf';
import { DiagnosticRecord, SensorTelemetry, UserProfile } from '../types';

export function exportToCSV(
  records: DiagnosticRecord[],
  telemetries: SensorTelemetry[],
  user: UserProfile
) {
  const headers = [
    'ID Diagnosa',
    'Tanggal & Waktu',
    'Blok Lahan',
    'Komoditas Tanaman',
    'Penyakit Terdeteksi',
    'Nama Latin / Patogen',
    'Akurasi AI (%)',
    'Status Verifikasi',
    'Umpan Balik Petani',
    'Catatan Tindakan',
    'Petani Penanggung Jawab',
  ];

  const rows = records.map((r) => [
    `"${r.id}"`,
    `"${r.dateStr}"`,
    `"${r.block}"`,
    `"${r.crop}"`,
    `"${r.diseaseName}"`,
    `"${r.latinName}"`,
    r.confidence,
    `"${r.isVerified ? 'Telah Diverifikasi' : 'Perlu Verifikasi'}"`,
    `"${r.feedback || 'Belum Dinilai'}"`,
    `"${r.treatmentNotes.replace(/"/g, '""')}"`,
    `"${user.name}"`,
  ]);

  // Append recent sensor readings if any
  const sensorHeaders = [
    '',
    '',
    'LOG SENSOR LAPANGAN REAL-TIME',
    'Waktu',
    'Blok',
    'Kelembaban Daun (%)',
    'Suhu (°C)',
    'Indeks Cahaya (klux)',
    'Kelembaban Udara (%)',
    'Skor Risiko Infeksi (%)',
    '',
  ];

  const sensorRows = telemetries.map((t) => [
    '',
    '',
    '',
    `"${t.timestamp}"`,
    `"${t.activeBlock}"`,
    t.leafMoisture,
    t.ambientTemp.toFixed(1),
    t.lightIndexLux,
    t.airHumidity,
    t.lesionRiskScore,
    '',
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(','), ...rows.map((e) => e.join(',')), '', sensorHeaders.join(','), ...sensorRows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `AgriVision_Laporan_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(
  records: DiagnosticRecord[],
  telemetries: SensorTelemetry[],
  user: UserProfile
) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header Background
    doc.setFillColor(20, 83, 45); // Forest green
    doc.rect(0, 0, 210, 32, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('AGRIVISION — LAPORAN DIAGNOSIS & TELEMETRI TANI', 14, 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistem Pendamping Pengawasan Gejala Daun & Kesehatan Tanaman Berbasis AI & IoT', 14, 22);
    doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })} | Operator: ${user.name}`, 14, 27);

    // Section 1: User & Farm Info
    doc.setTextColor(20, 27, 43);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Identitas Lahan & Profil Pengguna (OAuth2 Verified)', 14, 42);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setFillColor(241, 243, 255);
    doc.roundedRect(14, 46, 182, 22, 2, 2, 'F');

    doc.text(`Nama Petani : ${user.name}`, 18, 52);
    doc.text(`Lokasi Lahan: ${user.location}`, 18, 58);
    doc.text(`Kebun : ${user.farmName}`, 18, 64);

    doc.text(`Email OAuth2 : ${user.email}`, 105, 52);
    doc.text(`Peran Akun   : ${user.role}`, 105, 58);
    doc.text(`Status Data  : Terenkripsi & Terotentikasi OAuth2`, 105, 64);

    // Section 2: Diagnosa Utama
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Riwayat Diagnosa Penyakit Daun Terkini', 14, 78);

    let y = 84;
    records.slice(0, 3).forEach((rec, idx) => {
      doc.setFillColor(idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 250, 255);
      doc.setDrawColor(209, 213, 219);
      doc.roundedRect(14, y, 182, 34, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20, 83, 45);
      doc.text(`${rec.diseaseName} (${rec.block})`, 18, y + 7);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`${rec.latinName} — ${rec.crop}`, 18, y + 12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(22, 163, 74);
      doc.text(`Keyakinan AI: ${rec.confidence}% [${rec.isVerified ? 'Telah Diverifikasi Lapangan' : 'Perlu Kroscek'}]`, 120, y + 7);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(20, 27, 43);
      doc.text(`Waktu Sesi: ${rec.dateStr}`, 120, y + 12);

      doc.text(`Ciri Visual Terdeteksi:`, 18, y + 18);
      const sympText = rec.symptoms.map((s) => `• ${s.title}`).join('  |  ');
      doc.text(sympText.slice(0, 100), 18, y + 23);

      doc.setFont('helvetica', 'bold');
      doc.text(`Rekomendasi Tindakan: ${rec.treatmentNotes}`, 18, y + 29);

      y += 38;
    });

    // Section 3: Telemetri Sensor Lapangan
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 27, 43);
    doc.text('3. Rangkuman Sensor Lingkungan Real-Time (D3.js Data Stream)', 14, y + 6);

    y += 11;
    doc.setFillColor(20, 83, 45);
    doc.rect(14, y, 182, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Waktu', 18, y + 5);
    doc.text('Blok', 48, y + 5);
    doc.text('Kelembaban Daun', 75, y + 5);
    doc.text('Suhu Udara', 115, y + 5);
    doc.text('Indeks Cahaya', 145, y + 5);
    doc.text('Indeks Risiko', 175, y + 5);

    y += 7;
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');

    telemetries.slice(-6).forEach((t, i) => {
      doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, 252);
      doc.rect(14, y, 182, 6, 'F');
      doc.text(t.timestamp, 18, y + 4.5);
      doc.text(t.activeBlock, 48, y + 4.5);
      doc.text(`${t.leafMoisture}%`, 75, y + 4.5);
      doc.text(`${t.ambientTemp.toFixed(1)}°C`, 115, y + 4.5);
      doc.text(`${t.lightIndexLux} klux`, 145, y + 4.5);
      doc.text(`${t.lesionRiskScore}%`, 175, y + 4.5);
      y += 6;
    });

    // Section 4: Signature / Validation
    y += 12;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Divalidasi oleh Petani:', 24, y);
    doc.text('Petugas Penyuluh Lapangan (PPL):', 130, y);

    y += 18;
    doc.line(24, y, 75, y);
    doc.line(130, y, 185, y);

    doc.setFont('helvetica', 'bold');
    doc.text(user.name, 24, y + 5);
    doc.text('Ir. Bambang Santoso, M.Agr (NIP: 19780415)', 130, y + 5);

    // Footer notice
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('Dokumen ini dihasilkan secara otomatis melalui aplikasi web AgriVision dengan perlindungan data OAuth2.', 14, 287);

    doc.save(`AgriVision_Laporan_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (err) {
    console.error('PDF generation error, fallback to print:', err);
    window.print();
  }
}
