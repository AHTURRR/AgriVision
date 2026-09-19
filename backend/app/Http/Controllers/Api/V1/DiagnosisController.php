<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Diagnosis;
use App\Jobs\ProcessDiagnosisJob;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DiagnosisController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->diagnoses()->with(['image', 'symptoms', 'actions', 'verifications']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('block_id')) {
            $query->where('farm_block_id', $request->block_id);
        }

        $diagnoses = $query->latest()->paginate($request->get('per_page', 20));

        return response()->json([
            'success' => true,
            'data' => $diagnoses
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120', // max 5MB
            'farm_block_id' => 'nullable|exists:farm_blocks,id',
            'crop_id' => 'nullable|exists:crops,id',
        ]);

        $file = $request->file('image');
        $path = $file->store('diagnoses_images'); // Abstraction for storage

        $diagnosis = $request->user()->diagnoses()->create([
            'farm_block_id' => $request->farm_block_id,
            'crop_id' => $request->crop_id,
            'status' => 'pending',
        ]);

        $diagnosis->image()->create([
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);

        // Dispatch job for AI processing
        ProcessDiagnosisJob::dispatch($diagnosis);

        return response()->json([
            'success' => true,
            'message' => 'Image uploaded and diagnosis started.',
            'data' => $diagnosis->load('image')
        ], 202);
    }

    public function show(Request $request, Diagnosis $diagnosis)
    {
        if ($diagnosis->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $diagnosis->load(['image', 'symptoms', 'actions', 'verifications'])
        ]);
    }

    public function status(Request $request, Diagnosis $diagnosis)
    {
        if ($diagnosis->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $diagnosis->id,
                'status' => $diagnosis->status
            ]
        ]);
    }

    public function verify(Request $request, Diagnosis $diagnosis)
    {
        if ($diagnosis->user_id !== $request->user()->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:confirmed,uncertain,different',
            'note' => 'nullable|string'
        ]);

        $verification = $diagnosis->verifications()->create([
            'user_id' => $request->user()->id,
            'status' => $validated['status'],
            'note' => $validated['note'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Verification saved.',
            'data' => $verification
        ]);
    }
}
