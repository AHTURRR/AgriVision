<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\FarmController;
use App\Http\Controllers\Api\V1\FarmBlockController;
use App\Http\Controllers\Api\V1\DiagnosisController;
use App\Http\Controllers\Api\V1\EducationController;
use App\Http\Controllers\Api\V1\TelemetryController;
use App\Http\Controllers\Api\V1\DashboardController;

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    // Farm & Blocks
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/farm', [FarmController::class, 'index']);
        Route::put('/farm', [FarmController::class, 'update']);
        Route::apiResource('farm/blocks', FarmBlockController::class);
        
        // Diagnoses
        Route::get('/diagnoses', [DiagnosisController::class, 'index']);
        Route::post('/diagnoses', [DiagnosisController::class, 'store']);
        Route::get('/diagnoses/{diagnosis}', [DiagnosisController::class, 'show']);
        Route::get('/diagnoses/{diagnosis}/status', [DiagnosisController::class, 'status']);
        Route::post('/diagnoses/{diagnosis}/verify', [DiagnosisController::class, 'verify']);

        // Telemetry
        Route::get('/telemetry', [TelemetryController::class, 'index']);
        Route::get('/telemetry/latest', [TelemetryController::class, 'latest']);

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'summary']);
    });

    // Education (Public for now, or under auth)
    Route::get('/education', [EducationController::class, 'index']);
    Route::get('/education/{module}', [EducationController::class, 'show']);

    // We will add more routes here
});
