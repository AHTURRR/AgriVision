<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('farm_block_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('crop_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('pending'); // pending, processing, completed, failed, low_confidence, unknown
            $table->string('ai_model_version')->nullable();
            $table->string('ai_provider')->nullable();
            $table->integer('processing_time_ms')->nullable();
            $table->decimal('confidence_score', 5, 4)->nullable(); // e.g. 0.8750
            $table->string('disease_name')->nullable();
            $table->string('latin_name')->nullable();
            $table->string('category')->nullable();
            $table->text('limitations')->nullable();
            $table->text('treatment_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnoses');
    }
};
