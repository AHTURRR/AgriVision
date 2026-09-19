<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AI\AiDiagnosisServiceInterface;
use App\Services\AI\MockAiDiagnosisService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AiDiagnosisServiceInterface::class, function ($app) {
            // Can be configured to load HttpAiDiagnosisService based on config('services.ai.driver')
            return new MockAiDiagnosisService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
