<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SensorTelemetry;
use Illuminate\Http\Request;

class TelemetryController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'block_id' => 'required|exists:farm_blocks,id',
            'from' => 'nullable|date',
            'to' => 'nullable|date',
            'per_page' => 'nullable|integer|max:100'
        ]);

        $query = SensorTelemetry::where('farm_block_id', $validated['block_id'])
            ->orderBy('timestamp', 'asc');

        if (!empty($validated['from'])) {
            $query->where('timestamp', '>=', $validated['from']);
        }

        if (!empty($validated['to'])) {
            $query->where('timestamp', '<=', $validated['to']);
        }

        $telemetry = $query->paginate($validated['per_page'] ?? 30);

        return response()->json([
            'success' => true,
            'data' => $telemetry
        ]);
    }

    public function latest(Request $request)
    {
        $validated = $request->validate([
            'block_id' => 'required|exists:farm_blocks,id',
        ]);

        $latest = SensorTelemetry::where('farm_block_id', $validated['block_id'])
            ->orderBy('timestamp', 'desc')
            ->first();

        return response()->json([
            'success' => true,
            'data' => $latest
        ]);
    }
}
