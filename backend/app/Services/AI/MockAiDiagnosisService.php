<?php

namespace App\Services\AI;

use Illuminate\Http\UploadedFile;

class MockAiDiagnosisService implements AiDiagnosisServiceInterface
{
    public function analyze(UploadedFile $image, array $context = []): AiDiagnosisResult
    {
        // Simulate processing delay
        sleep(2);

        // We return the default mock data structure from the frontend
        return new AiDiagnosisResult(
            provider: 'mock',
            modelVersion: 'mock-v1',
            status: 'completed',
            confidenceScore: 0.8750,
            diseaseName: 'Bercak Daun Cercospora',
            latinName: 'Cercospora capsici',
            category: 'Jamur Patogenik Lapangan',
            limitations: 'AI baru menganalisis satu sisi permukaan daun yang terfoto. Pemeriksaan belum mencakup batang bawah, kelembapan tanah, atau gejala layu akar.',
            treatmentNotes: 'Pemangkasan daun bawah & aplikasi fungisida hayati Trichoderma sp.',
            symptoms: [
                [
                    'number' => 1,
                    'title' => 'Pusat Bercak Memucat (Abu-abu)',
                    'description' => 'Jaringan tengah daun mulai kering dan membentuk mata katak berdiameter 3–5mm.',
                ],
                [
                    'number' => 2,
                    'title' => 'Lingkaran Halo Kekuningan',
                    'description' => 'Ditemukan gradasi warna kuning terang mengelilingi tepian luka bercak luar.',
                ],
                [
                    'number' => 3,
                    'title' => 'Urat Daun Sekitar Tetap Utuh',
                    'description' => 'Penyebaran belum menembus tulang daun utama, menandakan fase awal serangan.',
                ],
            ],
            actions: [
                [
                    'letter' => 'A',
                    'title' => 'Cek Tanaman Tetangga',
                    'description' => 'Periksa 3–5 tanaman di bedengan samping untuk memastikan apakah jamur sudah berpencar ditiup angin.',
                ],
                [
                    'letter' => 'B',
                    'title' => 'Petik & Bersihkan Daun Bergejala',
                    'description' => 'Buang daun terinfeksi ke wadah tertutup, jangan dibiarkan jatuh menumpuk di atas mulsa.',
                ],
                [
                    'letter' => 'C',
                    'title' => 'Tunda Semprot Kimia Terburu-buru',
                    'description' => 'Gunakan fungisida nabati atau hubungi petugas lapangan sebelum membeli obat kimia berdosis tinggi.',
                ],
            ],
            heatmapCoords: [
                'top' => '38%',
                'left' => '42%',
                'width' => '112px',
                'height' => '112px',
                'label' => 'Bercak #01',
            ]
        );
    }
}
