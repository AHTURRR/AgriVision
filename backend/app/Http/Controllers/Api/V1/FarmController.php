<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Farm;
use Illuminate\Http\Request;

class FarmController extends Controller
{
    public function index(Request $request)
    {
        $farms = $request->user()->farms()->with('blocks')->get();

        return response()->json([
            'success' => true,
            'data' => $farms
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'metadata' => 'nullable|array',
        ]);

        $farm = $request->user()->farms()->firstOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        $farm->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Farm updated successfully',
            'data' => $farm
        ]);
    }
}
