<?php

namespace App\Services\AI;

use Illuminate\Http\UploadedFile;

interface AiDiagnosisServiceInterface
{
    /**
     * Analyze an uploaded image to predict plant disease.
     *
     * @param UploadedFile $image
     * @param array $context Additional context like crop type, etc.
     * @return AiDiagnosisResult
     */
    public function analyze(UploadedFile $image, array $context = []): AiDiagnosisResult;
}
