<?php

namespace App\Services\AI;

class AiDiagnosisResult
{
    public string $provider;
    public string $modelVersion;
    public string $status;
    public float $confidenceScore;
    public ?string $diseaseName;
    public ?string $latinName;
    public ?string $category;
    public ?string $limitations;
    public ?string $treatmentNotes;
    public array $symptoms;
    public array $actions;
    public ?array $heatmapCoords; // Optional

    public function __construct(
        string $provider,
        string $modelVersion,
        string $status,
        float $confidenceScore,
        ?string $diseaseName = null,
        ?string $latinName = null,
        ?string $category = null,
        ?string $limitations = null,
        ?string $treatmentNotes = null,
        array $symptoms = [],
        array $actions = [],
        ?array $heatmapCoords = null
    ) {
        $this->provider = $provider;
        $this->modelVersion = $modelVersion;
        $this->status = $status;
        $this->confidenceScore = $confidenceScore;
        $this->diseaseName = $diseaseName;
        $this->latinName = $latinName;
        $this->category = $category;
        $this->limitations = $limitations;
        $this->treatmentNotes = $treatmentNotes;
        $this->symptoms = $symptoms;
        $this->actions = $actions;
        $this->heatmapCoords = $heatmapCoords;
    }
}
