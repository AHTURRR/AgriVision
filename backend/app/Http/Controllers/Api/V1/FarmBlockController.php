<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FarmBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class FarmBlockController extends Controller
{
    public function index(Request $request)
    {
        $farm = $request->user()->farms()->first();
        
        if (!$farm) {
            return response()->json(['success' => true, 'data' => []]);
        }

        return response()->json([
            'success' => true,
            'data' => $farm->blocks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'area' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $farm = $request->user()->farms()->first();
        if (!$farm) {
            return response()->json(['success' => false, 'message' => 'User has no farm configured'], 400);
        }

        $block = $farm->blocks()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Block created successfully',
            'data' => $block
        ], 201);
    }

    public function show(Request $request, FarmBlock $block)
    {
        if ($block->farm->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $block
        ]);
    }

    public function update(Request $request, FarmBlock $block)
    {
        if ($block->farm->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'area' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $block->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Block updated successfully',
            'data' => $block
        ]);
    }

    public function destroy(Request $request, FarmBlock $block)
    {
        if ($block->farm->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $block->delete();

        return response()->json([
            'success' => true,
            'message' => 'Block deleted successfully'
        ]);
    }
}
