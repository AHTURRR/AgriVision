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
        Schema::create('sensor_telemetries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('farm_block_id')->constrained()->cascadeOnDelete();
            $table->timestamp('timestamp');
            $table->integer('leaf_moisture')->nullable();
            $table->decimal('ambient_temp', 5, 2)->nullable();
            $table->integer('light_index_lux')->nullable();
            $table->integer('air_humidity')->nullable();
            $table->integer('lesion_risk_score')->nullable();
            $table->index(['farm_block_id', 'timestamp']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensor_telemetries');
    }
};
