<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function summary(Request $request)
    {
        $user = $request->user();
        
        $totalScans = $user->diagnoses()->count();
        $recentDiagnoses = $user->diagnoses()
            ->with('image')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        $verifiedDiagnoses = $user->diagnoses()
            ->has('verifications')
            ->count();

        // In a real app, this risk summary would be aggregated from telemetry and diagnoses
        $riskSummary = [
            'level' => 'moderate',
            'trend' => 'increasing',
            'message' => 'Risiko bercak daun meningkat akibat kelembapan tinggi.'
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'total_scans' => $totalScans,
                'verified_diagnoses' => $verifiedDiagnoses,
                'recent_diagnoses' => $recentDiagnoses,
                'risk_summary' => $riskSummary,
            ]
        ]);
    }
}
