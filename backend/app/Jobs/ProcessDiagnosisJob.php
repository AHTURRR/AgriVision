<?php

namespace App\Jobs;

use App\Models\Diagnosis;
use App\Models\DiagnosisImage;
use App\Services\AI\AiDiagnosisServiceInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProcessDiagnosisJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $diagnosis;

    /**
     * Create a new job instance.
     */
    public function __construct(Diagnosis $diagnosis)
    {
        $this->diagnosis = $diagnosis;
    }

    /**
     * Execute the job.
     */
    public function handle(AiDiagnosisServiceInterface $aiService): void
    {
        try {
            $this->diagnosis->update(['status' => 'processing']);

            // Get the image file (mocking a real file for the interface, normally you might pass a URL or stream)
            $imageModel = $this->diagnosis->image;
            $imagePath = storage_path('app/' . $imageModel->path);
            
            // Just for the sake of the interface typing (in real life, maybe pass path or stream)
            $file = new UploadedFile($imagePath, $imageModel->original_name);
            
            $startTime = microtime(true);
            $result = $aiService->analyze($file, ['crop_id' => $this->diagnosis->crop_id]);
            $processingTime = round((microtime(true) - $startTime) * 1000);

            // Update diagnosis with result
            $this->diagnosis->update([
                'status' => $result->status,
                'ai_model_version' => $result->modelVersion,
                'ai_provider' => $result->provider,
                'confidence_score' => $result->confidenceScore,
                'disease_name' => $result->diseaseName,
                'latin_name' => $result->latinName,
                'category' => $result->category,
                'limitations' => $result->limitations,
                'treatment_notes' => $result->treatmentNotes,
                'processing_time_ms' => $processingTime,
            ]);

            // Save symptoms
            foreach ($result->symptoms as $symptom) {
                $this->diagnosis->symptoms()->create($symptom);
            }

            // Save actions
            foreach ($result->actions as $action) {
                $this->diagnosis->actions()->create($action);
            }

            Log::info("Diagnosis {$this->diagnosis->id} processed successfully.");

        } catch (\Exception $e) {
            Log::error("Failed processing diagnosis {$this->diagnosis->id}: " . $e->getMessage());
            $this->diagnosis->update(['status' => 'failed']);
        }
    }
}
